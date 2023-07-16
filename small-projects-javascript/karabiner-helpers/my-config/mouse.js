import { fromTo, keyNameToKeyObject } from '../utils/mods-shared.js';

// "simple_modifications": [
//   {
//       "from": {
//           "key_code": "a"
//       },
//       "to": {
//           "mouse_key": {
//               "x": -1536
//           }
//       }
//   },
//   {
//       "from": {
//           "key_code": "d"
//       },
//       "to": {
//           "mouse_key": {
//               "y": -1536
//           }
//       }
//   },
//   {
//       "from": {
//           "key_code": "f"
//       },
//       "to": {
//           "mouse_key": {
//               "x": 1536
//           }
//       }
//   },
//   {
//       "from": {
//           "key_code": "j"
//       },
//       "to": {
//           "pointing_button": "button2"
//       }
//   },
//   {
//       "from": {
//           "key_code": "k"
//       },
//       "to": {
//           "pointing_button": "button1"
//       }
//   },
//   {
//       "from": {
//           "key_code": "s"
//       },
//       "to": {
//           "mouse_key": {
//               "y": 1536
//           }
//       }
//   },
//   {
//       "from": {
//           "key_code": "semicolon"
//       },
//       "to": {
//           "mouse_key": {
//               "speed_multiplier": 0.5
//           }
//       }
//   }
// ]
// }

const createMouseMovement = (fromKey, x, y) => {
  const to = {
    mouse_key: {},
  };

  if (typeof x === 'number') {
    to.mouse_key.x = x;
  }
  if (typeof y === 'number') {
    to.mouse_key.y = y;
  }

  return fromTo(keyNameToKeyObject(fromKey), to);
};

// {
//   "from": {
//       "key_code": "h"
//   },
//   "to": {
//       "mouse_key": {
//           "horizontal_wheel": 32
//       }
//   }
// },
const createScroll = (fromKey, x, y) => {
  const to = {
    mouse_key: {},
  };

  /*
  x > 0 goes LEFT
  x < 0 goes RIGHT
  y > 0 goes DOWN
  y < 0 goes UP
  */
  if (typeof x === 'number') {
    to.mouse_key.horizontal_wheel = x;
  }
  if (typeof y === 'number') {
    to.mouse_key.vertical_wheel = y;
  }

  return fromTo(keyNameToKeyObject(fromKey), to);
};

const DISTANCES = {
  long: 2000,
  med: 1200,
  short: 600,
};

const UP = {
  fast: createMouseMovement('i', null, -DISTANCES.long),
  med: createMouseMovement('i', null, -DISTANCES.med),
  slow: createMouseMovement('i', null, -DISTANCES.short),
};
const UP_LEFT = {
  fast: createMouseMovement('u', -DISTANCES.long, -DISTANCES.long),
  med: createMouseMovement('u', -DISTANCES.med, -DISTANCES.med),
  slow: createMouseMovement('u', -DISTANCES.short, -DISTANCES.short),
};
const UP_RIGHT = {
  fast: createMouseMovement('o', DISTANCES.long, -DISTANCES.long),
  med: createMouseMovement('o', DISTANCES.med, -DISTANCES.med),
  slow: createMouseMovement('o', DISTANCES.short, -DISTANCES.short),
};
const DOWN = {
  fast: createMouseMovement('comma', null, DISTANCES.long),
  med: createMouseMovement('comma', null, DISTANCES.med),
  slow: createMouseMovement('comma', null, DISTANCES.short),
};
const DOWN_LEFT = {
  fast: createMouseMovement('m', -DISTANCES.long, DISTANCES.long),
  med: createMouseMovement('m', -DISTANCES.med, DISTANCES.med),
  slow: createMouseMovement('m', -DISTANCES.short, DISTANCES.short),
};
const DOWN_RIGHT = {
  fast: createMouseMovement('period', DISTANCES.long, DISTANCES.long),
  med: createMouseMovement('period', DISTANCES.med, DISTANCES.med),
  slow: createMouseMovement('period', DISTANCES.short, DISTANCES.short),
};
const LEFT = {
  fast: createMouseMovement('j', -DISTANCES.long),
  med: createMouseMovement('j', -DISTANCES.med),
  slow: createMouseMovement('j', -DISTANCES.short),
};
const RIGHT = {
  fast: createMouseMovement('l', DISTANCES.long),
  med: createMouseMovement('l', DISTANCES.med),
  slow: createMouseMovement('l', DISTANCES.short),
};

export default [
  UP.slow,
  UP_LEFT.slow,
  UP_RIGHT.slow,
  DOWN.slow,
  DOWN_LEFT.slow,
  DOWN_RIGHT.slow,
  LEFT.slow,
  RIGHT.slow,
  fromTo(keyNameToKeyObject('k'), {
    // this is the main button, it's switched in my mac settings
    pointing_button: 'button2',
  }),
  fromTo(
    {
      key_code: 'k',
      modifiers: {
        mandatory: ['left_control'],
      },
    },
    {
      pointing_button: 'button1',
    }
  ),
  fromTo(keyNameToKeyObject('left_shift'), {
    mouse_key: {
      speed_multiplier: 3.5,
    },
  }),
  fromTo(keyNameToKeyObject('left_option'), {
    mouse_key: {
      speed_multiplier: 0.5,
    },
  }),
  createScroll('h', 32), // left
  createScroll('semicolon', -32), // right
].flat();

// printJSON(res);
