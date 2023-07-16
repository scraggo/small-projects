/**
 * @typedef { import("./types").KeyObject } KeyObject
 * @typedef { import("./types").ConsumerKeyObject } ConsumerKeyObject
 */

/**
 * @param {string} key
 * @returns {KeyObject}
 */
export const keyNameToKeyObject = (key) => ({ key_code: key });

/**
 * @param {*} fromObj
 * @param {*} toObj
 */
export const fromTo = (fromObj, toObj) => ({ from: fromObj, to: toObj });
export const fromToSameCode = (keyObj) => fromTo(keyObj, keyObj);

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
    const keyObj = keyNameToKeyObject(key);
    const keyObjClone = keyNameToKeyObject(key);
    return fromTo(keyObj, toWithModifiers(keyObjClone, ['left_shift']));
  });
};
