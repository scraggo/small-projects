// import { printJSON } from '../utils/io.js';
import {
  fromTo,
  charToKeyObject,
  // fromWithModifiers,
  toWithModifiers,
} from '../utils/mods-shared.js';

const res = [
  fromTo(charToKeyObject('j'), charToKeyObject('left_arrow')),
  fromTo(charToKeyObject('k'), charToKeyObject('down_arrow')),
  fromTo(charToKeyObject('l'), charToKeyObject('right_arrow')),
  fromTo(charToKeyObject('i'), charToKeyObject('up_arrow')),
  fromTo(charToKeyObject('p'), charToKeyObject('page_up')),
  fromTo(charToKeyObject('semicolon'), charToKeyObject('page_down')),
  fromTo(charToKeyObject('y'), charToKeyObject('home')),
  fromTo(charToKeyObject('h'), charToKeyObject('end')),

  // switch tabs
  fromTo(
    charToKeyObject('u'),
    toWithModifiers(charToKeyObject('left_arrow'), [
      'left_command',
      'left_option',
    ])
  ),
  fromTo(
    charToKeyObject('o'),
    toWithModifiers(charToKeyObject('right_arrow'), [
      'left_command',
      'left_option',
    ])
  ),
];

export default res;
// printJSON(res);
