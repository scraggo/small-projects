import { printJSON } from '../utils/io.js';
import { fromTo, keyCode } from '../utils/to-k.js';

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

const createMouseMovement = (fromKey, toDirection, toDistance) => {
  return fromTo(keyCode(fromKey), {
    mouse_key: {
      [toDirection]: toDistance,
    },
  });
};

const createMouseMovementConfig = (keys) => Object.values(keys);

const DISTANCES = {
  long: 2000,
  med: 1200,
  short: 600,
};

const UP = {
  fast: createMouseMovement('w', 'y', -DISTANCES.long),
  med: createMouseMovement('s', 'y', -DISTANCES.med),
  slow: createMouseMovement('x', 'y', -DISTANCES.short),
};
const DOWN = {
  fast: createMouseMovement('e', 'y', DISTANCES.long),
  med: createMouseMovement('d', 'y', DISTANCES.med),
  slow: createMouseMovement('c', 'y', DISTANCES.short),
};
const LEFT = {
  fast: createMouseMovement('q', 'x', -DISTANCES.long),
  med: createMouseMovement('a', 'x', -DISTANCES.med),
  slow: createMouseMovement('z', 'x', -DISTANCES.short),
};
const RIGHT = {
  fast: createMouseMovement('r', 'x', DISTANCES.long),
  med: createMouseMovement('f', 'x', DISTANCES.med),
  slow: createMouseMovement('v', 'x', DISTANCES.short),
};

const res = [
  Object.values(LEFT),
  Object.values(DOWN),
  Object.values(UP),
  Object.values(RIGHT),
  {
    from: {
      key_code: 'j',
    },
    to: {
      pointing_button: 'button2',
    },
  },
  {
    from: {
      key_code: 'k',
    },
    to: {
      pointing_button: 'button1',
    },
  },
  {
    from: {
      key_code: 'semicolon',
    },
    to: {
      mouse_key: {
        speed_multiplier: 0.5,
      },
    },
  },
].flat();

printJSON(res);
