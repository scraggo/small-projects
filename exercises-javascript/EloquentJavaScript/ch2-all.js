/* === ELOQUENT JAVASCRIPT

CHAPTER 2 EXERCISES

1. Looping a triangle
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######

It may be useful to know that you can find the length of a string by writing .length after it.
var abc = "abc";
console.log(abc.length);
// → 3
*/

var hash = "#";
for (var x = 1; x <= 7; x++) {
    console.log(hash.repeat(x));
}

/*

2. FizzBuzz

Write a program that uses console.log to print all the numbers from 1 to 100, 
with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, 
and for numbers divisible by 5 (and not 3), print "Buzz" instead.
When you have that working, modify your program to print "FizzBuzz", 
for numbers that are divisible by both 3 and 5 (and still print "Fizz" or 
"Buzz" for numbers divisible by only one of those).
*/

for (var x = 1; x <= 100; x++) {
    if (x % 3 == 0 && x % 5 == 0) {
        console.log("FizzBuzz");
    } else if (x % 3 == 0) {
        console.log("Fizz");
    } else if (x % 5 == 0) {
        console.log("Buzz");
    } else {
        console.log(x)
    }
}

/*
chess board

use string addition according to length - not .repeat 
(which seems better for the odd numbers.)
*/

var WHITE = " "; var BLACK = "#";
var SIZE = 16;
for (var x = 0; x < SIZE; x++) {
    if (x % 2 === 0) {
        if (SIZE % 2 === 0) {
            console.log((WHITE + BLACK).repeat(SIZE/2))
        } else {
            console.log((WHITE + BLACK).repeat(SIZE/2) + WHITE)
        }
    } else {
        if (SIZE % 2 === 0) {
            console.log((BLACK + WHITE).repeat(SIZE/2))
        } else {
            console.log((BLACK + WHITE).repeat(SIZE/2) + BLACK)
        }
    }
}