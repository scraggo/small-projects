// import { printJSON } from '../utils/io.js';
import { fromTo, keyNameToKeyObject } from '../utils/mods-shared.js';

const keysToNums = [
  // array index = number
  'm',
  // 'm',
  // 'comma',
  // 'period',
  'j',
  'k',
  'l',
  'u',
  'i',
  'o',
  // the rest are already mapped
];

const res = keysToNums.map((fromKey, idx) =>
  fromTo(keyNameToKeyObject(fromKey), keyNameToKeyObject(String(idx)))
);

// printJSON(res);
export default res;
