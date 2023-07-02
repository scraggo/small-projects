/**
 * returns object in this shape:
{
  "from": {
      "key_code": "KEY"
  },
  "to": {
      "key_code": "KEY",
      "modifiers": [
          "left_shift"
      ]
  }
}
 * @param {string[]} arr
 */
export const shiftKeys = (arr) => {
  return arr.map((key) => {
    return {
      from: {
        key_code: key,
      },
      to: {
        key_code: key,
        modifiers: ['left_shift'],
      },
    };
  });
};

const keysToShift = [
  // row 1
  'grave_accent_and_tilde',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'hyphen',
  'equal_sign',
  // row 2
  'open_bracket',
  'close_bracket',
  'backslash',
  // row 3
  'semicolon',
  'quote',
  // row 4
  'comma',
  'period',
  'slash',
];

const res = shiftKeys(keysToShift);

const isScript = process.argv.find(arg => import.meta.url.endsWith(arg))
// const isScript = process.argv.includes(import.meta.url.slice('file://'.length))

if (isScript) {
  // console.log('im a script')
  console.log(JSON.stringify(res, null, 2));
}
