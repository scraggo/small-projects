import { printJSON } from '../utils/io.js';
import { transformFunctionKeys } from '../utils/mods-function-keys.js';

/**
 *
 * @param {any[]} keyMap
 * @returns
 */
const transform = (keyMap) => {
  return keyMap.map((keyObj, idx) => {
    const mapped = {
      from: {
        key_code: `f${idx + 1}`,
      },
    };

    // copy by default
    mapped.to = { ...mapped.from };

    if (keyObj.key_code || keyObj.consumer_key_code) {
      mapped.to = keyObj;
    }

    return mapped;
  });
};

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

const res = transformFunctionKeys(funcKeyMap);
printJSON(res);
