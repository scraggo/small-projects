import path from 'path';
import { Writer } from '../write/writer';

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
  [
    { from: { key_code: 'f1' }, to: { key_code: 'f1' } },
    { from: { key_code: 'f2' }, to: { key_code: 'f2' } },
    { from: { key_code: 'f3' }, to: { key_code: 'mission_control' } },
    { from: { key_code: 'f4' }, to: { key_code: 'f4' } },
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
);

writer.writeToFile(path.resolve('.'), 'z.json');
