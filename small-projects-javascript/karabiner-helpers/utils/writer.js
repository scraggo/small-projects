import { readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';

/**
 * @typedef { import("./types").KarabinerConfig } KarabinerConfig
 * @typedef { import("./types").KarabinerModsBase } KarabinerModsBase
 * @typedef { import("./types").KarabinerProfileDevice } KarabinerProfileDevice
 * @typedef { import("./types").KarabinerProfile } KarabinerProfile
 * @typedef { import("./types").KarabinerComplexRule } KarabinerComplexRule
 */

const ROOT_PATH = path.join(
  homedir(),
  '.config',
  'karabiner',
  'karabiner.json'
);

const BACKUP_PATH = path.join(
  homedir(),
  '.config',
  'karabiner',
  'automatic_backups'
);

const KEY_MOD_FN = 'fn_function_keys';
const KEY_MOD_COMPLEX = 'complex_modifications';
const KEY_MOD_SIMPLE = 'simple_modifications';

const selectorsTop = {
  /**
   * @param {KarabinerConfig} config
   */
  global: (config) => config.global,
  /**
   * @param {KarabinerConfig} config
   */
  profiles: (config) => config.profiles,
};

const selectorsProfile = {
  /**
   * @param {KarabinerProfile} profile
   */
  name: (profile) => profile.name,
  /**
   * @param {KarabinerProfile} profile
   */
  devices: (profile) => profile.devices,
};

const modifyAt = {
  /**
   * @param {KarabinerProfile|KarabinerProfileDevice} profile
   * @param {*} keysToWrite
   */
  [KEY_MOD_SIMPLE]: (profile, keysToWrite) =>
    (profile[KEY_MOD_SIMPLE] = keysToWrite),
  /**
   * @param {KarabinerProfile|KarabinerProfileDevice} profile
   * @param {*} keysToWrite
   */
  [KEY_MOD_FN]: (profile, keysToWrite) => (profile[KEY_MOD_FN] = keysToWrite),
  /**
   * @param {KarabinerProfile|KarabinerProfileDevice} profile
   * @param {*} keysToWrite
   */
  [KEY_MOD_COMPLEX]: (profile, keysToWrite) =>
    (profile[KEY_MOD_COMPLEX].rules = keysToWrite),
};

export class Writer {
  constructor(karabinerPath = ROOT_PATH) {
    const file = readFileSync(karabinerPath, { encoding: 'utf-8' });
    /** @type {KarabinerConfig} */
    this.config = JSON.parse(file);
  }

  /**
   * @param {string} profileName
   */
  findProfileByName(profileName) {
    return selectorsTop
      .profiles(this.config)
      .find((p) => selectorsProfile.name(p) === profileName);
  }

  /**
   * @param {string} profileName
   * @param {KarabinerProfileDevice['identifiers']} deviceProps
   */
  findDeviceProfileByNameAndDeviceInfo(profileName, deviceProps) {
    const profile = this.findProfileByName(profileName);
    const devices = selectorsProfile.devices(profile);
    return devices.find(({ identifiers }) => {
      const { product_id, vendor_id } = identifiers;
      return (
        deviceProps.product_id === product_id &&
        deviceProps.vendor_id === vendor_id
      );
    });
  }

  /**
   * @param {Object} profileProps
   * @param {string} profileProps.profileName
   * @param {KarabinerProfileDevice['identifiers']} [profileProps.deviceProps]
   * @param {keyof typeof modifyAt} keyType
   * @param {*} keysToWrite
   */
  modifyProfile({ profileName, deviceProps = null }, keyType, keysToWrite) {
    const profile = deviceProps
      ? this.findDeviceProfileByNameAndDeviceInfo(profileName, deviceProps)
      : this.findProfileByName(profileName);

    modifyAt[keyType](profile, keysToWrite);
    // selectorsProfile[keyType](keysToWrite)
    // if (keyType === KEY_MOD_COMPLEX) {
    // }

    // profile[keyType] = keysToWrite;

    return true;
  }

  /**
   * @param {Object} profileProps
   * @param {string} profileProps.profileName
   * @param {KarabinerProfileDevice['identifiers']} [profileProps.deviceProps]
   * @param {KarabinerModsBase['fn_function_keys']} funcKeys
   */
  makeFunctionMods({ profileName, deviceProps }, funcKeys) {
    return this.modifyProfile(
      { profileName, deviceProps },
      KEY_MOD_FN,
      funcKeys
    );
  }

  /**
   * @param {Object} profileProps
   * @param {string} profileProps.profileName
   * @param {KarabinerComplexRule[]} complexKeys
   */
  makeComplexMods({ profileName }, complexKeys) {
    return this.modifyProfile({ profileName }, KEY_MOD_COMPLEX, complexKeys);
  }

  /**
   * @param {Object} profileProps
   * @param {string} profileProps.profileName
   * @param {KarabinerProfileDevice['identifiers']} [profileProps.deviceProps]
   * @param {KarabinerModsBase['simple_modifications']} simpleKeys
   */
  makeSimpleMods({ profileName, deviceProps }, simpleKeys) {
    return this.modifyProfile(
      { profileName, deviceProps },
      KEY_MOD_SIMPLE,
      simpleKeys
    );
  }

  /**
   * @param {string} fullFilepath
   */
  writeToFile(fullFilepath) {
    console.log('✏️  Writing config to', fullFilepath);
    writeFileSync(fullFilepath, JSON.stringify(this.config, null, 4), {
      encoding: 'utf-8',
    });
    console.log('🎉 Success!');
  }

  /**
   * @param {string|null} [backupPath=BACKUP_PATH] null if you don't want to backup
   */
  overwriteRootConfig(backupPath = BACKUP_PATH) {
    if (typeof backupPath === 'string') {
      // this format is different from karabiner's YYYYMMDD format
      this.writeToFile(path.join(backupPath, `karabiner_${Date.now()}.json`));
    }
    this.writeToFile(ROOT_PATH);
  }
}
