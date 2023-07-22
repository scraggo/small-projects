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

export const ROOT_PATH = path.join(
  homedir(),
  '.config',
  'karabiner',
  'karabiner.json'
);

export const BACKUP_PATH = path.join(
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
    this.karabinerPath = karabinerPath;

    /** @type {string} Unmodified root config */
    this.configJSON = readFileSync(this.karabinerPath, { encoding: 'utf-8' });

    /** @type {KarabinerConfig} */
    this.config = JSON.parse(this.configJSON);
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
   * @param {string} [backupPath=BACKUP_PATH]
   */
  backupRootConfig(backupPath = BACKUP_PATH) {
    // this format is different from karabiner's YYYYMMDD format
    const dest = path.join(backupPath, `karabiner_${Date.now()}.json`);

    // fs.copyFile is broke
    writeFileSync(dest, this.configJSON, {
      encoding: 'utf-8',
    });

    console.log(`📃 Successful backup to ${dest}`);
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
   * Overwrites Karabiner config with your modifications.
   * @param {Object} [options={backupPath: BACKUP_PATH}] Provide { backupPath: 'my-path' } for an alternate backup path or { backupPath: null } if you'd rather not back up the file.
   */
  overwriteRootConfig({ backupPath } = { backupPath: BACKUP_PATH }) {
    if (typeof backupPath === 'string') {
      this.backupRootConfig(backupPath);
    }
    this.writeToFile(this.karabinerPath);
  }
}
