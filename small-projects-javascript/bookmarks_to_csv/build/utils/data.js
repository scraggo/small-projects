"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefinedValues = void 0;

/**
 * @param {object} obj any non-nested object
 * @returns {object} with undefined properties removed
 */
const getDefinedValues = obj => {
  return Object.entries(obj).reduce((acc, keyVal) => {
    const [key, value] = keyVal;

    if (value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

exports.getDefinedValues = getDefinedValues;