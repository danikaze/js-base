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

function handler(key, value) {
  //
}

/*
 * test arrays
 */
const arr = createArray(100);

/*
 * testers
 */
function forEach(arr) {
  arr.forEach((value, key) => {
    handler(key, value);
  });
}

function classicFor(arr) {
  let i;
  for(i = 0; i < arr.length; i++) {
    handler(i, arr[i]);
  }
}

function classicForCached(arr) {
  let i, n;
  for(i = 0, n = arr.length; i < n; i++) {
    handler(i, arr[i]);
  }
}

function classicWhile(arr) {
  let i = 0;
  while(i < arr.length) {
    handler(i, arr[i]);
    i++;
  }
}

function classicWhileCached(arr) {
  let i = 0, n = arr.length;
  while(i < n) {
    handler(i, arr[i]);
    i++;
  }
}

function reverseWhile(arr) {
  let i = arr.length;
  while(--i) {
    handler(i, arr[i]);
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
