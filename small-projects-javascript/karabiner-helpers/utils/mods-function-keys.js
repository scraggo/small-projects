import { fromToSameCode } from './mods-shared';

/**
 * @param {any[]} keyMap - Array<KeyObject | ConsumerKeyObject>
 */
export const transformFunctionKeys = (keyMap) => {
  return keyMap.map((keyObj, idx) => {
    const keyCode = `f${idx + 1}`;
    const mapped = fromToSameCode(keyCode);

    if (keyObj.key_code || keyObj.consumer_key_code) {
      mapped.to = keyObj;
    }

    return mapped;
  });
};
