// import { printJSON } from '../utils/io.js';
import { createComplexRule } from '../utils/mods-complex.js';
import { charToKeyObject } from '../utils/mods-shared.js';

export const PROFILES = {
  Main: 'Main',
  Mouse: 'Mouse',
  Nav: 'Nav',
  Number: 'Number',
};

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
    from: charToKeyObject(fromKey),
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

// This profile goes into all the layers
export const selectLayerProfile = [
  {
    fromKey: 'f1',
    profileName: PROFILES.Nav,
  },
].map(createProfileSelector);

export const layerProfile = [
  // The rest go into the layer selection profile
  {
    fromKey: 'f1',
    profileName: PROFILES.Main,
  },
  {
    fromKey: 'f2',
    profileName: PROFILES.Mouse,
  },
  {
    fromKey: 'f3',
    profileName: PROFILES.Number,
  },
].map(createProfileSelector);

// printJSON(mapped);
