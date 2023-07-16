import { printJSON } from '../utils/io.js';
import { fromTo, keyCode, fromWithModifiers } from '../utils/mods-shared.js';

const res = [
  fromTo(keyCode('j'), keyCode('left_arrow')),
  fromTo(keyCode('k'), keyCode('down_arrow')),
  fromTo(keyCode('l'), keyCode('right_arrow')),
  fromTo(keyCode('i'), keyCode('up_arrow')),

  // pageUp
  fromTo(fromWithModifiers(keyCode('i'), ['left_control']), keyCode('page_up')),
  // pageDown
  fromTo(
    fromWithModifiers(keyCode('k'), ['left_control']),
    keyCode('page_down')
  ),
];

printJSON(res);
