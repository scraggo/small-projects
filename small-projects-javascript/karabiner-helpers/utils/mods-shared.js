/**
 * @typedef { import("./types").KeyObject } KeyObject
 * @typedef { import("./types").ConsumerKeyObject } ConsumerKeyObject
 */

/**
 * @param {string} char ex. "semicolon"
 * @returns {KeyObject}
 */
export const charToKeyObject = (char) => ({ key_code: char });

/**
 * @param {*} fromObj
 * @param {*} toObj
 */
export const fromTo = (fromObj, toObj) => ({ from: fromObj, to: toObj });
export const fromToSameCode = (keyObj) => fromTo(keyObj, keyObj);

/**
 * returns object in this shape:
{
  "from": {
      "key_code": keyFrom
  },
  "to": {
      "key_code": keyTo
  }
}
 * @param {[string, string]} charPair
 */
export const simpleKeyAssignment = ([keyFrom, keyTo]) =>
  fromTo(charToKeyObject(keyFrom), charToKeyObject(keyTo));

/**
 * @param {KeyObject} keyObj
 * @param {string[]} [mandatory]
 * @param {string[]} [optional]
 */
export const fromWithModifiers = (keyObj, mandatory, optional) => {
  const returnObj = {
    ...keyObj,
    modifiers: {},
  };

  if (mandatory) {
    returnObj.modifiers.mandatory = mandatory;
  }
  if (optional) {
    returnObj.modifiers.optional = optional;
  }
  return returnObj;
};

/**
 * @param {KeyObject} keyObj
 * @param {string[]} modifiers
 */
export const toWithModifiers = (keyObj, modifiers) => {
  return {
    ...keyObj,
    modifiers,
  };
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
    const keyObj = charToKeyObject(key);
    const keyObjClone = charToKeyObject(key);
    return fromTo(keyObj, toWithModifiers(keyObjClone, ['left_shift']));
  });
};
