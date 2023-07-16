// import { printJSON } from '../utils/io.js';
import { transformFunctionKeys } from '../utils/mods-function-keys.js';

// one-indexed
const funcKeyMap = [
  {}, // blank: map to itself
  {},
  {
    key_code: 'mission_control',
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    consumer_key_code: 'mute',
  },
  {
    consumer_key_code: 'volume_decrement',
  },
  {
    consumer_key_code: 'volume_increment',
  },
];

export default transformFunctionKeys(funcKeyMap);
// printJSON(res);
