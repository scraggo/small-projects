import { printJSON } from '../utils/io.js';
import { fromTo, keyCode, withMandatoryModifiers } from '../utils/to-k.js';

const res = [
  fromTo(keyCode('j'), keyCode('left_arrow')),
  fromTo(keyCode('k'), keyCode('down_arrow')),
  fromTo(keyCode('l'), keyCode('right_arrow')),
  fromTo(keyCode('i'), keyCode('up_arrow')),

  // pageUp
  fromTo(
    withMandatoryModifiers(keyCode('i'), ['left_control']),
    keyCode('page_up')
  ),
  // pageDown
  fromTo(
    withMandatoryModifiers(keyCode('k'), ['left_control']),
    keyCode('page_down')
  ),
];

printJSON(res);
