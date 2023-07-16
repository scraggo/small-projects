import { printJSON } from '../utils/io.js';
import { shiftKeys } from '../utils/mods-shared.js';

const keysToShift = [
  // row 1
  'grave_accent_and_tilde',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'hyphen',
  'equal_sign',
  // row 2
  'open_bracket',
  'close_bracket',
  'backslash',
  // row 3
  'semicolon',
  'quote',
  // row 4
  'comma',
  'period',
  'slash',
];

const res = shiftKeys(keysToShift);
printJSON(res);
