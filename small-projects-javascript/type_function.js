
// adds 'array' and 'set' to typeof function
function type(item) {
  if (Array.isArray(item)) {
    return 'array';
  }
  if (item instanceof Set) {
    return 'set';
  }
  return typeof item; 
}

console.log(type([1,2,3]));
console.log(type({a: 2}));
console.log(type(2));
console.log(type('a'));
console.log(typeof function(){return;});

let setTest = new Set([1,2,3]);
console.log(type(setTest));