const Benchmark = require('benchmark');
const assert = require('assert');

const object = {};
const N = 1000;

/*
 * testers
 */
function setToNull() {
  for (let i = 0; i < N; i++) {
    object[i] = i;
  }
  for (let i = 0; i < N; i++) {
    object[i] = null;
  }
}

function setToUndefined() {
  for (let i = 0; i < N; i++) {
    object[i] = i;
  }
  for (let i = 0; i < N; i++) {
    object[i] = undefined;
  }
}

function deleteObject() {
  for (let i = 0; i < N; i++) {
    object[i] = i;
  }
  for (let i = 0; i < N; i++) {
    delete object[i];
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Delete objects vs set them to null');

suite.add('setToNull', setToNull)
     .add('setToUndefined', setToUndefined)
     .add('delete', deleteObject);

module.exports = suite;
