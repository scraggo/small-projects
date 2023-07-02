// import { shiftKeys } from "./shift-layer";
import { printJSON } from '../utils/io.js';
import { fromTo, keyCode } from '../utils/to-k.js';

const keysToNums = [
  // array index = number
  '0',
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
