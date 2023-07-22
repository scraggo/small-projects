// import { printJSON } from '../utils/io.js';
import {
  fromTo,
  charToKeyObject,
  // fromWithModifiers,
} from '../utils/mods-shared.js';

const res = [
  fromTo(charToKeyObject('j'), charToKeyObject('left_arrow')),
  fromTo(charToKeyObject('k'), charToKeyObject('down_arrow')),
  fromTo(charToKeyObject('l'), charToKeyObject('right_arrow')),
  fromTo(charToKeyObject('i'), charToKeyObject('up_arrow')),
  fromTo(charToKeyObject('p'), charToKeyObject('page_up')),
  fromTo(charToKeyObject('semicolon'), charToKeyObject('page_down')),
  fromTo(charToKeyObject('u'), charToKeyObject('home')),
  fromTo(charToKeyObject('o'), charToKeyObject('end')),

  // // pageUp
  // fromTo(
  //   fromWithModifiers(charToKeyObject('i'), ['left_control']),
  //   charToKeyObject('page_up')
  // ),
  // // pageDown
  // fromTo(
  //   fromWithModifiers(charToKeyObject('k'), ['left_control']),
  //   charToKeyObject('page_down')
  // ),
];

export default res;
// printJSON(res);
