const Benchmark = require('benchmark');
const assert = require('assert');

/*
 * Helpers
 */
function populateArray(arr, n) {
  for (var i = 0; i < n; i++) {
    arr.push(n);
  }
}

let array = [];

/*
 * testers
 */
function arrayReassign(n) {
  return function() {
    populateArray(array, n);
    array = [];
  }
}

function arraySplice(n) {
  return function() {
    populateArray(array, n);
    array.splice(0, array.length);
  }
}

function arrayPop(n) {
  return function() {
    populateArray(array, n);
    while(array.length) {
      array.pop();
    }
  }
}

function arrayShift(n) {
  return function() {
    populateArray(array, n);
    while(array.length) {
      array.shift();
    }
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Empty array');

suite.add('reassign-0', arrayReassign(0))
     .add('splice-0', arraySplice(0))
     .add('pop-0', arrayPop(0))
     .add('shift-0', arrayShift(0))
     .add('reassign-100', arrayReassign(100))
     .add('splice-100', arraySplice(100))
     .add('pop-100', arrayPop(100))
     .add('shift-100', arrayShift(100))
     .add('reassign-10000', arrayReassign(10000))
     .add('splice-10000', arraySplice(10000))
     .add('pop-10000', arrayPop(10000))
     .add('shift-10000', arrayShift(10000));

module.exports = suite;
