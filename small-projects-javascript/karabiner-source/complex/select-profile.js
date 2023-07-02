import { printJSON } from '../utils/io.js';

const createDescription = (from, name) => `${from} -> select profile: ${name}`;

// {
//   "description": "insert -> select profile: DEC1",
//   "manipulators": [
//       {
//           "from": {
//               "key_code": "insert",
//               "modifiers": {
//                   "optional": [
//                       "any"
//                   ]
//               }
//           },
//           "to": [
//               {
//                   "shell_command": "'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'DEC1'"
//               }
//           ],
//           "type": "basic"
//       }
//   ]
// }

const CLI =
  '/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli';

const createProfileSelector = ({
  fromKey,
  karabiner_cli = CLI,
  profileName,
}) => {
  return {
    description: createDescription(fromKey, profileName),
    manipulators: [
      {
        from: {
          key_code: fromKey,
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            shell_command: `'${karabiner_cli}' --select-profile '${profileName}'`,
          },
        ],
        type: 'basic',
      },
    ],
  };
};

const mapped = [
  // This profile goes into all the layers
  {
    fromKey: 'f1',
    profileName: 'Layer',
  },

  // The rest go into the layer selection profile
  {
    fromKey: 'f1',
    profileName: 'DEC1',
  },
  {
    fromKey: 'f2',
    profileName: 'Shift',
  },
  {
    fromKey: 'f3',
    profileName: 'Mouse',
  },
  {
    fromKey: 'f4',
    profileName: 'Number',
  },
].map(createProfileSelector);

printJSON(mapped);
