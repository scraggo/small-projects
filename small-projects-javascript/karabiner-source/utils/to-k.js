const fromTo = (fromObj,toObj) => ({ from: fromObj, to: toObj })
const keyCode = (key) => ({ key_code: key})
const mods = (modsArr) => ({ modifiers: modsArr})

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
    const keyObj = keyCode(key)
    return fromTo(keyObj, {...keyObj, ...mods(['left_shift'])})
  });
};

export const fromToSameCode = (key) => fromTo(key, key)

export const transformFunctionKeys = keyMap => {
  return keyMap.map((keyObj, idx) => {
    const keyCode = `f${idx + 1}`
    const mapped = fromToSameCode(keyCode)
    // const mapped = {
    //   from: {
    //     key_code: `f${idx + 1}`
    //   }
    // }

    // // copy by default
    // mapped.to = {...mapped.from}

    if (keyObj.key_code || keyObj.consumer_key_code) {
      mapped.to = keyObj
    }

    return mapped;
  })
}
