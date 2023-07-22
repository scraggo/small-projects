import assert from 'assert';
import path from 'path';
import { Writer } from '../utils/writer.js';
import func from './func.js';
import mouse from './mouse.js';
import nav from './nav.js';
import number from './number-layer.js';
import {
  layerProfile,
  selectLayerProfile,
  PROFILES,
} from './select-profile.js';
import { capsToEscape } from './simple.js';

const DEVICES = {
  appleSmall: { product_id: 541, vendor_id: 1452 },
};

const writer = new Writer();

/**
 * @param {string} profileName
 * @param {*} deviceProps
 * @param {*} simpleMods
 * @param {*} funcMods
 * @param {*} complexMods
 */
export const writeProfile = (
  profileName,
  deviceProps,
  simpleMods,
  funcMods,
  complexMods
) => {
  if (simpleMods) {
    writer.makeSimpleMods(
      {
        profileName,
        deviceProps,
      },
      simpleMods
    );
  }

  if (funcMods) {
    writer.makeFunctionMods(
      {
        profileName,
        deviceProps,
      },
      funcMods
    );
  }

  if (complexMods) {
    writer.makeComplexMods(
      {
        profileName,
      },
      complexMods
    );
  }
};

// quick tests
Object.keys(PROFILES).map((profile) => {
  assert.ok(
    writer.findProfileByName(profile),
    `Profile not set in config: ${profile}`
  );
  assert.ok(
    writer.findDeviceProfileByNameAndDeviceInfo(profile, DEVICES.appleSmall),
    `Device not found in profile: ${DEVICES.appleSmall}`
  );
  console.log(`✅ Valid Profile: ${profile}`);
});
// console.log(writer.findProfileByName(PROFILES.Mouse).name);
// console.log(
//   writer.findDeviceProfileByNameAndDeviceInfo(
//     PROFILES.Mouse,
//     DEVICES.appleSmall
//   ).identifiers
// );

writeProfile(
  PROFILES.Main,
  DEVICES.appleSmall,
  capsToEscape,
  func,
  selectLayerProfile
);

writeProfile(
  PROFILES.Mouse,
  DEVICES.appleSmall,
  [capsToEscape, mouse].flat(),
  func,
  selectLayerProfile
);

writeProfile(
  PROFILES.Number,
  DEVICES.appleSmall,
  [capsToEscape, number].flat(),
  func,
  selectLayerProfile
);

writeProfile(
  PROFILES.Nav,
  DEVICES.appleSmall,
  [capsToEscape, nav].flat(),
  func,
  layerProfile
);

writer.writeToFile(path.resolve('.', 'my-config', 'test-output', '_root.json'));
// writer.overwriteRootConfig();
