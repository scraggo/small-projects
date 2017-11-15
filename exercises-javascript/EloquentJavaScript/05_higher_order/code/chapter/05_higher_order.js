var ancestry = JSON.parse(ANCESTRY_FILE);

// console.log(typeof ancestry);


var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Your code here.
/*
Flattening

Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the input arrays.
*/

var arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

function flatten(arr) {
  return arr.reduce( function(a, item) {
    return a.concat(item);
  }, []
  );
}

console.log('1. Flatten', flatten(arrays));

/*
Mother-child age difference

Using the example data set from this chapter, compute the average age difference between mothers and children (the age of the mother when the child is born). You can use the average function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in the array. The byName object, which makes it easy to find a person’s object from their name, might be useful here.
*/

// Your code here.
// → 31.2

// for person in data
// FILTER: if person[sex] = "f"
// female child: {born: date, mother: name}
// if byName[mother.name] - calculate child.born - mother.born
// append to array, motherAges

function averageMotherAge(data) {
  // computes average mother age at time of daughter's birth if data for mother is present.
  let females = data.filter( x => x['sex'] == 'f');
  let motherAges = [];
  let i = 0;
  let child;
  for (i; i < females.length; i++) {
    child = females[i];
    // byName is global
    if (byName[child.mother] !== undefined) {
      motherAges.push(child.born - byName[child.mother]['born']);
    }
  }
  return average(motherAges);
}

console.log('2. Mother Child Age Difference', averageMotherAge(ancestry));

// Historical Life Expectancy
function historicalLifeExpectancy(data) {
  // arrays: {16: [1,2,3,4,5], 17: [1,2,3,4,5]}
  let lifeExpectancy = {};
  data.forEach( x => {
    let age = x.died - x.born;
    let century = Math.ceil(x.died / 100);
    if (lifeExpectancy[century] === undefined) {
      lifeExpectancy[century] = [age];
    } else {
      lifeExpectancy[century].push(age);
    }
  });

  let sortedLife = Object.keys(lifeExpectancy).sort();
  sortedLife.forEach( x => {
    console.log(
      x + ': ' + average(lifeExpectancy[x]).toFixed(1)
    );
  })
}

console.log('3. Historical Life Expectancy');
historicalLifeExpectancy(ancestry);

// write your own every and some
function every(arr, test) {
  let result = true;
  let i = 0;
  for (i; i < arr.length; i++) {
      if (!test(arr[i])) {
        result = false;
      }
  }
  return result;
}

function some(arr, test) {
  let result = false;
  let i = 0;
  for (i; i < arr.length; i++) {
    if (test(arr[i])) {
      result = true;
    }
  }
  return result;
}

// Your code here.
console.log('4. write your own every and some');

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false