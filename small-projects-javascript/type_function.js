/**
 * adds 'array', 'null', 'set' to typeof function
 * @param {unknown} item
 */
function type(item) {
  if (item === null) {
    return 'null';
  }
  if (Array.isArray(item)) {
    return 'array';
  }
  if (item instanceof Set) {
    return 'set';
  }
  return typeof item;
}

console.log(type([1, 2, 3]));
console.log(type({ a: 2 }));
console.log(type(2));
console.log(type('a'));
console.log(
  typeof function () {
    return;
  }
);

let setTest = new Set([1, 2, 3]);
console.log(type(setTest));
