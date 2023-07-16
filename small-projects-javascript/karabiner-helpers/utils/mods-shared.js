/**
 * @typedef { import("./types").KeyObject } KeyObject
 * @typedef { import("./types").ConsumerKeyObject } ConsumerKeyObject
 */

/**
 * @param {string} key
 * @returns {KeyObject}
 */
export const keyCode = (key) => ({ key_code: key });
export const fromTo = (fromObj, toObj) => ({ from: fromObj, to: toObj });
export const fromToSameCode = (key) => fromTo(key, key);

/**
 * @param {KeyObject} keyObj
 * @param {string[]} [mandatory]
 * @param {string[]} [optional]
 */
export const fromWithModifiers = (keyObj, mandatory, optional) => {
  keyObj.modifiers = {};

  if (mandatory) {
    keyObj.modifiers.mandatory = mandatory;
  }
  if (optional) {
    keyObj.modifiers.optional = mandatory;
  }
  return keyObj;
};

/**
 * @param {KeyObject} keyObj
 * @param {string[]} modifiers
 */
export const toWithModifiers = (keyObj, modifiers) => {
  keyObj.modifiers = modifiers;
  return keyObj;
};

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
 * @param {string[]} arr keys
 */
export const shiftKeys = (arr) => {
  return arr.map((key) => {
    const keyObj = keyCode(key);
    return fromTo(keyObj, toWithModifiers(keyObj, ['left_shift']));
  });
};
