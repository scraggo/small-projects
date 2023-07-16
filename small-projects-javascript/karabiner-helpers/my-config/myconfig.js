// import path from 'path';
import { Writer } from '../utils/writer.js';
import func from './func.js';
import mouse from './mouse.js';

const DEVICES = {
  appleSmall: { product_id: 541, vendor_id: 1452 },
};

const writer = new Writer();

// quick tests
console.log(writer.findProfileByName('Mouse').name);
console.log(
  writer.findDeviceProfileByNameAndDeviceInfo('Mouse', DEVICES.appleSmall)
    .identifiers
);

writer.makeFunctionMods(
  {
    profileName: 'Mouse',
    deviceProps: DEVICES.appleSmall,
  },
  func
);

writer.makeSimpleMods(
  {
    profileName: 'Mouse',
    deviceProps: DEVICES.appleSmall,
  },
  mouse
);

// writer.writeToFile(path.resolve('.', 'my-config', 'test-output', 'z.json'));
writer.overwriteRootConfig();
