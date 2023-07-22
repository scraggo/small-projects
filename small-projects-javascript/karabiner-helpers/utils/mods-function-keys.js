import { fromToSameCode, charToKeyObject } from './mods-shared.js';

/**
 * @typedef { import("./types").KeyObject } KeyObject
 * @typedef { import("./types").ConsumerKeyObject } ConsumerKeyObject
 */

/**
 * 0th array index maps to f1, 1st index maps to f2, etc
 * @param {({} | KeyObject | ConsumerKeyObject)[]} keyMap
 */
export const transformFunctionKeys = (keyMap) => {
  return keyMap.map((keyObj, idx) => {
    const funcKeyCode = `f${idx + 1}`;
    const mapped = fromToSameCode(charToKeyObject(funcKeyCode));

    if ('key_code' in keyObj || 'consumer_key_code' in keyObj) {
      mapped.to = keyObj;
    }

    return mapped;
  });
};
