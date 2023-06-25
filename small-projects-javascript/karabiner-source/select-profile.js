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

const createProfileSelector = ({
  description,
  fromKey,
  karabiner_cli,
  profileName,
}) => {
  return {
    description,
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

const CLI =
  '/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli';
const FROM_KEY = 'insert';
const PROFILE_NAME1 = 'DEC1';

const profile1 = {
  description: `${FROM_KEY} -> select profile: ${PROFILE_NAME1}`,
  fromKey: FROM_KEY,
  karabiner_cli: CLI,
  profileName: PROFILE_NAME1,
};

// const PROFILE_NAME2 = 'Shift';
// const profile2 = {
//   description: `${FROM_KEY} -> select profile: ${PROFILE_NAME2}`,
//   fromKey: FROM_KEY,
//   karabiner_cli: CLI,
//   profileName: PROFILE_NAME2,
// };

const res = JSON.stringify(createProfileSelector(profile1), null, 2);
console.log(res);
