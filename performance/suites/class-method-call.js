const Benchmark = require('benchmark');
const ClassContext = require('../../snippets/classes/ClassContext');
const ClassPublic = require('../../snippets/classes/ClassPublic');

/*
 * data
 */
const context = new ClassContext('testData');
const public = new ClassPublic('testData');

/*
 * testers
 */
function callPublicMethod(instance) {
  instance.publicMethod();
}

function callStaticPublicMethod(proto) {
  proto.staticPublicMethod();
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Class method calls');

suite.add('context.publicMethod', callPublicMethod.bind(null, context))
     .add('public.publicMethod', callPublicMethod.bind(null, public))
     .add('context.staticPublicMethod', callStaticPublicMethod.bind(null, ClassContext))
     .add('public.staticPublicMethod', callStaticPublicMethod.bind(null, ClassPublic));

module.exports = suite;
