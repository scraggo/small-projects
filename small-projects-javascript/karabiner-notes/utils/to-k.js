export const fromTo = (fromObj, toObj) => ({ from: fromObj, to: toObj });
export const keyCode = (key) => ({ key_code: key });
export const fromToSameCode = (key) => fromTo(key, key);

/**
 * @param {string[]} modsArr
 * @param {'mandatory'|'optional'} [type]
 */
export const mods = (modsArr, type) => {
  if (type) {
    return {
      modifiers: {
        [type]: modsArr,
      },
    };
  }

  return {
    modifiers: modsArr,
  };
};

export const withMandatoryModifiers = (keyObj, modsArr) => {
  return {
    ...keyObj,
    ...mods(modsArr, 'mandatory'),
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
    const keyObj = keyCode(key);
    return fromTo(keyObj, { ...keyObj, ...mods(['left_shift']) });
  });
};

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
