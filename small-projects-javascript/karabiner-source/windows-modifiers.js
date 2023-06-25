/**
 * returns object in this shape:
{
  "from": {
      "key_code": "KEY0"
  },
  "to": {
      "key_code": "KEY1"
  }
}
 * @param {string[][]} arr
 */
const shiftKeys = (arr) => {
  return arr.map(([keyFrom, keyTo]) => {
    return {
      from: {
        key_code: keyFrom,
      },
      to: {
        key_code: keyTo,
      },
    };
  });
};

const windowsToMacKeys = [
  ['left_command', 'left_option'],
  ['left_option', 'left_command'],
  ['right_option', 'right_command'],
  // ['right_command', 'right_option'],
];

const res = shiftKeys(windowsToMacKeys);

console.log(JSON.stringify(res, null, 2));
