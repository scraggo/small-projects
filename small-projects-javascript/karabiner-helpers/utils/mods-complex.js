/**
 * @typedef { import("./types").KarabinerComplexRule } KarabinerComplexRule
 */

/**
 * @param {string} description
 * @param {any[]} manipulators
 * @returns {KarabinerComplexRule}
 */
export const createComplexRule = (description, manipulators) => ({
  description,
  manipulators,
});
