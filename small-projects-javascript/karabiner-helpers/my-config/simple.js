// import { printJSON } from '../utils/io.js';
import { simpleKeyAssignment } from '../utils/mods-shared.js';

export const windowsToMacKeys = [
  ['left_command', 'left_option'],
  ['left_option', 'left_command'],
  ['right_option', 'right_command'],
  // ['right_command', 'right_option'],
].map(simpleKeyAssignment);

export const capsToEscape = [['caps_lock', 'escape']].map(simpleKeyAssignment);

// printJSON(res);
