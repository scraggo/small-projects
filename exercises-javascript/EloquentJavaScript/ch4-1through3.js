/* === ELOQUENT JAVASCRIPT

CHAPTER 4 EXERCISES

1. The sum of a range

The introduction of this book alluded to the following as a nice way to compute
the sum of a range of numbers:

console.log(sum(range(1, 10)));

Write a range
function that takes two arguments, start and end, and returns an array
containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and 
returns the sum of these numbers. 
Run the previous program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional
third argument that indicates the “step” value used to build up the array.
If no step is given, the array elements go up by increments of one,
corresponding to the old behavior. The function call range(1, 10, 2) should
return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so
that range(5, 2, -1) produces [5, 4, 3, 2].
*/

// Your code here.

function range(start, end, step=1) {
    var rangeList = []
    if (end > start && step < 1) {
      //throw "start must be higher than end";
      return "start must be higher than end";
    }
    
    if (end < start) {
        if (step >= 1) {step = -1}
        for (var x = start; x >= end; x += step) {
            rangeList.push(x);
        }
    } else {
        for (var x = start; x <= end; x += step) {
            rangeList.push(x);
        }
    }
    return rangeList;
}

function sum(numArray) {
    var numSum = 0;
    for (var i = 0; i < numArray.length; i++) {
        numSum += numArray[i];
    }
    return numSum
}


// Tests
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sum(range(1, 10)));
// → 55

console.log(range(1,10, -1)); //Error raised.

console.log(range(11, 3));

console.log(range(15,10, -1));

console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

console.log('===LINE-BREAK'.repeat(4) + '===');




/*
2. Reversing an array

Arrays have a method reverse, which changes the array
by inverting the order in which its elements appear. For this exercise, write
two functions, reverseArray and reverseArrayInPlace. The first, reverseArray,
takes an array as argument and produces a new array that has the same elements
in the inverse order. The second, reverseArrayInPlace, does what the reverse
method does: it modifies the array given as argument in order to reverse its
elements. Neither may use the standard reverse method.

Thinking back to the
notes about side effects and pure functions in the previous chapter, which
variant do you expect to be useful in more situations? Which one is more
efficient?
*/

// Your code here.

function reverseArray(array) {
    reversedArray = [];
    for (var x = array.length - 1; x >= 0; x--){
        reversedArray.push(array[x]);
    }
    return reversedArray;
}

function reverseArrayInPlace(array) {
//unshift - prepends element
//shift - remove first element and return it
/*
This function is likely to be less useful and less efficient.
There is significantly more computation, and it was necessary
to create a temporary variable to not lose array values. 
(If we're going to create variables, why not just create a new array, like above?)
*/
    var negStep = array.length - 1;
    for (var x = 0; x <= Math.floor(array.length/2); x++) {
        var toEnd = array[x]; //put 1 in a temp var
        array[x] = array[negStep]; //put 5 at index 0
        array[negStep] = toEnd; //replace last element with 1
        negStep--;
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

console.log('===LINE-BREAK'.repeat(4) + '===');
/*
3. A list

Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data structure is the list (not to be confused with the array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
The resulting objects form a chain, like this:

A linked list
A nice thing about lists is that they can share parts of their structure. For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the variable defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. In addition, the original list is also still a valid three-element list.

a. Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument, 

b. and write a listToArray function that produces an array from a list. 

c. Also write the helper functions prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, 

d. and nth, which takes a list and a number and returns the element at the given position in the list, or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.
*/

// Your code here.

// === 3a. creation of {nested} list structure
function arrayToList(myArray) {
    let list = {value: myArray[myArray.length - 1], rest: null};
    
    for (let a = myArray.length - 2; a >= 0; a -= 1) {
        list = {value: myArray[a], rest: list};
    }
    
    return list;
}

// === 3b. and write a listToArray function that produces an array from a list. 
// looked at the hint...not sure how the for loop works
function listToArray(myList) {
  let myArray = [];
  
  for (var node = myList; node; node = node.rest) {
    myArray.push(node.value);
  }
  return myArray;
}


// === 3c. Also write the helper functions prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, 

function prepend(val, restVal) {
  return {value: val, rest: restVal};
}

// === 3d. and nth, which takes a list and a number and returns the element at the given position in the list, or undefined when there is no such element.

function nth(myList, index) {
  if (index === 0) {
    return myList.value;
  } else {
    return nth(myList.rest, index-1);
  }
}


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

console.log('===LINE-BREAK'.repeat(4) + '===');

/*
4. DEEP EQUALS - use recursion to compare properties of objects. 
if typeof is 'object', then take null = Object into account.
*/ 

function deepEqual(item1, item2) {
  //test type of objects:
  if (typeof item1 !== typeof item2) return false;
  if (typeof item1 === 'object') {
    if (item1 === null) return false;//do something else
    if (compareObj(item1, item2) === false) return false;
    }
  return true;
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

var obj1 = {here: {is: "an"}, object: 2};
var obj2 = {here: 1, object: 2};

function compareObj(obj1, obj2) {
  for (let item in obj1) {
    if (item in obj2 ===false || obj1[item] !== obj2[item]) {
      return false;
    } else return true;
  }
}

console.log(compareObj(obj1, obj1));