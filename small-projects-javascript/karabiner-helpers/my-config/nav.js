// import { printJSON } from '../utils/io.js';
import {
  fromTo,
  keyNameToKeyObject,
  fromWithModifiers,
} from '../utils/mods-shared.js';

const res = [
  fromTo(keyNameToKeyObject('j'), keyNameToKeyObject('left_arrow')),
  fromTo(keyNameToKeyObject('k'), keyNameToKeyObject('down_arrow')),
  fromTo(keyNameToKeyObject('l'), keyNameToKeyObject('right_arrow')),
  fromTo(keyNameToKeyObject('i'), keyNameToKeyObject('up_arrow')),

  // pageUp
  fromTo(
    fromWithModifiers(keyNameToKeyObject('i'), ['left_control']),
    keyNameToKeyObject('page_up')
  ),
  // pageDown
  fromTo(
    fromWithModifiers(keyNameToKeyObject('k'), ['left_control']),
    keyNameToKeyObject('page_down')
  ),
];

export default res;
// printJSON(res);
