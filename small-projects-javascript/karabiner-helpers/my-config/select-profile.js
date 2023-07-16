import { printJSON } from '../utils/io.js';
import { createComplexRule } from '../utils/mods-complex.js';
import { keyNameToKeyObject } from '../utils/mods-shared.js';

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
  const manipulator = {
    from: keyNameToKeyObject(fromKey),
    to: [
      {
        shell_command: `'${karabiner_cli}' --select-profile '${profileName}'`,
      },
    ],
    type: 'basic',
  };

  return createComplexRule(createDescription(fromKey, profileName), [
    manipulator,
  ]);
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

// printJSON(mapped);
export default mapped;
