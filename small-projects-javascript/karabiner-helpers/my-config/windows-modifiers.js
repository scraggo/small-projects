// import { printJSON } from '../utils/io.js';
import { fromTo, keyNameToKeyObject } from '../utils/mods-shared.js';

/**
 * returns object in this shape:
{
  "from": {
      "key_code": "KEY0"
  },
  "to": {
      "key_code": "KEY1"
  }
}
 * @param {string[][]} arr
 */
const simpleKeyAssignment = (arr) => {
  return arr.map(([keyFrom, keyTo]) => {
    return fromTo(keyNameToKeyObject(keyFrom), keyNameToKeyObject(keyTo));
  });
};

const windowsToMacKeys = [
  ['left_command', 'left_option'],
  ['left_option', 'left_command'],
  ['right_option', 'right_command'],
  // ['right_command', 'right_option'],
];

const res = simpleKeyAssignment(windowsToMacKeys);

// printJSON(res);
export default res;
