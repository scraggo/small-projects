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

const DEVICES = {
  appleSmall: { product_id: 541, vendor_id: 1452 },
};

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
  modComplex: (profile) => profile.complex_modifications,
  /**
   * @param {KarabinerModsBase} profile
   */
  modFunctionKeys: (profile) => profile.fn_function_keys,
  /**
   * @param {KarabinerModsBase} profile
   */
  modSimple: (profile) => profile.simple_modifications,
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

class Writer {
  constructor(karabinerPath = ROOT_PATH) {
    const file = readFileSync(karabinerPath, { encoding: 'utf-8' });
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

  writeFunctionKeys({ profileName, deviceProps }, funcKeys) {
    const funcKeysPrev = deviceProps
      ? selectorsProfileDevice.modFunctionKeys(
          this.findDeviceProfileByNameAndDeviceInfo(profileName, deviceProps)
        )
      : selectorsProfile.modFunctionKeys(this.findProfileByName(profileName));

    // mutate funcKeysPrev
    // todo: get a path so I can do:
    // this.config[path] = funcKeys
    funcKeys.forEach((key, idx) => {
      funcKeysPrev[idx] = key;
    });

    return funcKeysPrev;
  }

  writeToFile(filepath, filename) {
    console.log(filepath, filename);
    writeFileSync(path.join(filepath, filename), JSON.stringify(this.config), {
      encoding: 'utf-8',
    });
  }
}

const writer = new Writer();
console.log(writer.findProfileByName('Mouse').name);
console.log(
  writer.findDeviceProfileByNameAndDeviceInfo('Mouse', DEVICES.appleSmall)
    .identifiers
);
console.log(
  writer.writeFunctionKeys(
    {
      profileName: 'Mouse',
      deviceProps: DEVICES.appleSmall,
    },
    [
      { from: { key_code: 'f1' }, to: { key_code: 'f1' } },
      { from: { key_code: 'f2' }, to: { key_code: 'f2' } },
      { from: { key_code: 'f3' }, to: { key_code: 'mission_control' } },
      { from: { key_code: 'f4' }, to: { key_code: 'mission_control' } },
      { from: { key_code: 'f5' }, to: { key_code: 'f5' } },
      { from: { key_code: 'f6' }, to: { key_code: 'f6' } },
      { from: { key_code: 'f7' }, to: { key_code: 'f7' } },
      { from: { key_code: 'f8' }, to: { key_code: 'f8' } },
      { from: { key_code: 'f9' }, to: { key_code: 'f9' } },
      { from: { key_code: 'f10' }, to: { consumer_key_code: 'mute' } },
      {
        from: { key_code: 'f11' },
        to: { consumer_key_code: 'volume_decrement' },
      },
      {
        from: { key_code: 'f12' },
        to: { consumer_key_code: 'volume_increment' },
      },
    ]
  )
);

writer.writeToFile(path.resolve('.'), 'z.json');
