const Benchmark = require('benchmark');
const ClassContext = require('../../snippets/classes/ClassContext');
const ClassPublic = require('../../snippets/classes/ClassPublic');

/*
 * testers
 */
function createObjectContext() {
  const o = new ClassContext('testData');
}

function createObjectPublic() {
  const o = new ClassPublic('testData');
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Instance creation');

suite.add('ClassContext', createObjectContext)
     .add('ClassPublic', createObjectPublic);

module.exports = suite;
