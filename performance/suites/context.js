const Benchmark = require('benchmark');
const assert = require('assert');

/*
 * Helpers
 */
function run(a, b, c) {
  assert.equal(a, 'a');
  assert.equal(b, 'b');
  assert.equal(c, 'c');
}

/*
 * testers
 */
function getContextFunction() {
  return function(b, c) {
    run('a', b, c);
  }
}

function getContextBind() {
  return run.bind(null, 'a');
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Function context');

suite.add('contextFunction', getContextFunction().bind(null, 'b', 'c'))
     .add('contextBind', getContextBind().bind(null, 'b', 'c'));

module.exports = suite;
