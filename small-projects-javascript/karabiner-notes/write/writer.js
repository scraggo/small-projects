import { readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';

/**
 * @typedef { import("./types").KarabinerConfig } KarabinerConfig
 * @typedef { import("./types").KarabinerModsBase } KarabinerModsBase
 * @typedef { import("./types").KarabinerProfileDevice } KarabinerProfileDevice
 * @typedef { import("./types").KarabinerProfile } KarabinerProfile
 */

const ROOT_PATH = path.join(
  homedir(),
  '.config',
  'karabiner',
  'karabiner.json'
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
  modComplex: (profile) => profile[KEY_MOD_COMPLEX],
  /**
   * @param {KarabinerProfile|KarabinerProfileDevice} profile
   */
  modFunctionKeys: (profile) => profile[KEY_MOD_FN],
  /**
   * @param {KarabinerProfile|KarabinerProfileDevice} profile
   */
  modSimple: (profile) => profile[KEY_MOD_SIMPLE],
  /**
   * @param {KarabinerProfile} profile
   */
  devices: (profile) => profile.devices,
};

/**
 * Within each profile is the ability to customize per device
 *
 * "identifiers": {
 *   "product_id": 541,
 *   "vendor_id": 1452
 * }
 */
const selectorsProfileDevice = {
  /**
   * @param {KarabinerProfileDevice} profileDevice
   */
  modFunctionKeys: (profileDevice) =>
    selectorsProfile.modFunctionKeys(profileDevice),
  /**
   * @param {KarabinerProfileDevice} profileDevice
   */
  modSimple: (profileDevice) => selectorsProfile.modSimple(profileDevice),
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

  modifyProfile({ profileName, deviceProps = null }, keyType, keysToWrite) {
    const profile = deviceProps
      ? this.findDeviceProfileByNameAndDeviceInfo(profileName, deviceProps)
      : this.findProfileByName(profileName);

    profile[keyType] = keysToWrite;

    return true;
  }

  makeFunctionMods({ profileName, deviceProps }, funcKeys) {
    return this.modifyProfile(
      { profileName, deviceProps },
      KEY_MOD_FN,
      funcKeys
    );
  }

  makeComplexMods({ profileName }, complexKeys) {
    return this.modifyProfile({ profileName }, KEY_MOD_COMPLEX, complexKeys);
  }

  makeSimpleMods({ profileName, deviceProps }, simpleKeys) {
    return this.modifyProfile(
      { profileName, deviceProps },
      KEY_MOD_SIMPLE,
      simpleKeys
    );
  }

  writeToFile(filepath, filename) {
    const fullpath = path.join(filepath, filename);
    console.log('writing config to', fullpath);
    writeFileSync(fullpath, JSON.stringify(this.config), {
      encoding: 'utf-8',
    });
  }
}
