import chai from 'chai';
const { assert, AssertionError, expect } = chai;

const foo = 'bar';
const beverages = { tea: ['chai', 'matcha', 'oolong'] };

assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.strictEqual(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

// This is annoying:
// @ts-expect-error
assert.equal('1', 1, 'loose equality');

// wow. chain them all!
expect(foo, 'foo message').to.have.length(3).to.equal('bar').to.be.ok;

try {
  // expect seems better. It throws if there's an error, just like assert:
  expect(1, 'foo equality').to.equal('1');
} catch (error) {
  Object.entries(error).forEach(([k, v]) => {
    console.log(`${k}: ${v}`);
  });
  console.log(
    'error instanceof AssertionError',
    error instanceof AssertionError
  );
}
