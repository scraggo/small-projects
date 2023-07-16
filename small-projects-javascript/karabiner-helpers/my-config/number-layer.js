// import { shiftKeys } from "./shift-layer";
import { printJSON } from '../utils/io.js';
import { fromTo, keyCode } from '../utils/mods-shared.js';

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
  fromTo(keyCode(fromKey), keyCode(String(idx)))
);

printJSON(res);
