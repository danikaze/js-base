const Benchmark = require('benchmark');

/*
 * helpers
 */
function createArray(n) {
  const arr = [];

  while(n--) {
    arr.push(String(Math.random()).split('.')[1]);
  }

  return arr;
};

/*
 * test arrays
 */
const arr = createArray(100);

/*
 * testers
 */
function forEach(arr) {
  let item;
  arr.forEach((value, key) => {
    item = value;
  });
}

function classicFor(arr) {
  let item;
  let i;
  for(i = 0; i < arr.length; i++) {
    item = arr[i];
  }
}

function classicForCached(arr) {
  let item;
  let i, n;
  for(i = 0, n = arr.length; i < n; i++) {
    item = arr[i];
  }
}

function classicWhile(arr) {
  let item;
  let i = 0;
  while(i < arr.length) {
    item = arr[i];
    i++;
  }
}

function classicWhileCached(arr) {
  let item;
  let i = 0, n = arr.length;
  while(i < n) {
    item = arr[i];
    i++;
  }
}

function reverseWhile(arr) {
  let item;
  let i = arr.length;
  while(--i) {
    item = arr[i];
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Array iterators');

suite.add('forEach', forEach.bind(null, arr))
     .add('classicFor', classicFor.bind(null, arr))
     .add('classicForCached', classicForCached.bind(null, arr))
     .add('classicWhile', classicWhile.bind(null, arr))
     .add('classicWhileCached', classicWhileCached.bind(null, arr))
     .add('reverseWhile', reverseWhile.bind(null, arr));

module.exports = suite;
