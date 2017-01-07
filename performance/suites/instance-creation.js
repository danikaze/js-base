const Benchmark = require('benchmark');

/*
 * helpers
 */
function ObjectProto(data) {
  this.data = data;
}

ObjectProto.prototype.foo = function() {
  return this.data;
};

ObjectProto.prototype.bar = function(param) {
  return 'result: ' + param;
};

function ObjectInline(data) {
  this.foo = function() {
    return data;
  };

  this.bar = function(param) {
    return 'result: ' + param;
  };
}

class ObjectClass {
  constructor(data) {
    this.data = data;
  }

  foo() {
    return data;
  }

  bar(param) {
    return 'result: ' + param;
  }
}

/*
 * testers
 */
function createObjectProto() {
  const o = new ObjectProto('testData');
}

function createObjectInline() {
  const o = new ObjectInline('testData');
}

function createObjectClass() {
  const o = new ObjectClass('testData');
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Instance creation');

suite.add('ObjectProto', createObjectProto)
     .add('ObjectInline', createObjectInline)
     .add('ObjectClass', createObjectClass);

module.exports = suite;
