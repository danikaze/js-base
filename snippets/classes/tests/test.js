const assert = require('assert');
const values = require('../values');

/*
 * Class tester
 */
function tester(Klass) {
  const instance = new Klass(values.PARAMETER);

  /*
   * Check visibility
   */

  // static properties
  assert.ok(Klass.staticPublicProp !== undefined);
  assert.ok(Klass.staticPrivateProp === undefined);
  // instance properties
  assert.ok(instance.publicProp !== undefined);
  assert.ok(instance.privateProp === undefined);

  // static methods
  assert.ok(Klass.staticPublicMethod !== undefined);
  assert.ok(Klass.staticPrivilegedMethod !== undefined);
  assert.ok(Klass.staticPrivateMethod == undefined);
  // instance methods
  assert.ok(instance.publicMethod !== undefined);
  assert.ok(instance.privilegedMethod !== undefined);
  assert.ok(instance.privateMethod == undefined);

  /*
   * Check property values
   */
  assert.equal(Klass.staticPublicProp, values.STATIC_PUBLIC_PROP);
  assert.equal(instance.publicProp, values.PUBLIC_PROP);

  /*
   * Check call values
   */
  assert.deepEqual(Klass.staticPublicMethod(), {
    staticPublicProp: values.STATIC_PUBLIC_PROP,
  });
  assert.deepEqual(Klass.staticPrivilegedMethod(), {
    staticPublicProp   : values.STATIC_PUBLIC_PROP,
    staticPrivateProp  : values.STATIC_PRIVATE_PROP,
    staticPrivateMethod: values.STATIC_PRIVATE_METHOD,
  });

  assert.deepEqual(instance.publicMethod(), {
    parameter       : values.PARAMETER,
    staticPublicProp: values.STATIC_PUBLIC_PROP,
    publicProp      : values.PUBLIC_PROP,
  });
  assert.deepEqual(instance.privilegedMethod(), {
    parameter        : values.PARAMETER,
    staticPublicProp : values.STATIC_PUBLIC_PROP,
    staticPrivateProp: values.STATIC_PRIVATE_PROP,
    publicProp       : values.PUBLIC_PROP,
    privateProp      : values.PRIVATE_PROP,
    privateMethod    : values.PRIVATE_METHOD,
  });
};

module.exports = tester;
