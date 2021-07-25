import { strict as assert } from 'assert';

import { result } from './find-item';

// assert.ok(0); // fails, not truthy
// assert.equal(1, '1'); // fails as expected
assert.ok(result, `${result} is undefined.`); // is a type guard?

const resultPlusOne = result + 1;
console.log(resultPlusOne);
