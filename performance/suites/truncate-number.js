const Benchmark = require('benchmark');
const assert = require('assert');

const N = 1234.567;

/*
 * testers
 */
function usingParseInt() {
  return parseInt(N, 10);
}

function usingBitwise() {
  return N | 0;
}

function usingFloor() {
  return Math.floor(N);
}

function usingFloorOrCeil() {
  return N > 0 ? Math.floor(N) : Math.ceil(N);
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Truncate number to integer');

suite.add('parseInt', usingParseInt)
     .add('bitWise', usingBitwise)
     .add('floor', usingFloor)
     .add('floor+ceil', usingFloorOrCeil);

module.exports = suite;
