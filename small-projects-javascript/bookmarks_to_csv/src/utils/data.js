/**
 * @param {object} obj any non-nested object
 * @returns {object} with undefined properties removed
 */
export const getDefinedValues = obj => {
  return Object.entries(obj).reduce((acc, keyVal) => {
    const [key, value] = keyVal;
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
