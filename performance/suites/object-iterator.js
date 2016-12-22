const Benchmark = require('benchmark');

/*
 * helpers
 */
function createObject(n) {
  const obj = {};

  while(n--) {
    obj[`prop${n+1}`] = String(Math.random()).split('.')[1];
  }

  return obj;
};

function handler(key, value) {
  //
}

/*
 * test objects
 */
const obj = createObject(100);

/*
 * testers
 */
function forInRaw(obj) {
  let i;
  for(i in obj) {
    handler(i, obj[i]);
  }
}

function forInCheck(obj) {
  let i;
  for(i in obj) {
    if(obj.hasOwnProperty(i)) {
      handler(i, obj[i]);
    }
  }
}

function keysForEach(obj) {
  Object.keys(obj).forEach((value, key) => {
    handler(key, value);
  });
}

function keysForClassic(obj) {
  let keys = Object.keys(obj);
  let key;
  for(let i = 0; i < keys.length; i++) {
    key = keys[i];
    handler(key, obj[key]);
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Object iterators');

suite.add('forInRaw', forInRaw.bind(null, obj))
     .add('forInCheck', forInCheck.bind(null, obj))
     .add('keysForEach', keysForEach.bind(null, obj))
     .add('keysForClassic', keysForClassic.bind(null, obj));

module.exports = suite;
