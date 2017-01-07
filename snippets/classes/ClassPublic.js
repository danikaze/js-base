const values = require('./values');

/*
 * Private data is actually public, but based on the classic convention that it's
 * prefixed with a underscore.
 *
 * Pros:
 *  + Cleanest code. Written following JavaScript conventions
 *  + Fastest execution.
 * Cons:
 *  - No real private methods nor properties
 */
class testClass {
  constructor(params) {
    this._params = params;
    this._privateProp = values.PRIVATE_PROP;

    this.publicProp = values.PUBLIC_PROP;
  }

  _privateMethod() {
    return values.PRIVATE_METHOD;
  }

  publicMethod() {
    return {
      parameter       : this._params,
      staticPublicProp: testClass.staticPublicProp,
      publicProp      : this.publicProp,
    };
  }

  privilegedMethod() {
    return {
        parameter        : this._params,
        staticPublicProp : testClass.staticPublicProp,
        staticPrivateProp: _staticPrivateProp,
        publicProp       : this.publicProp,
        privateProp      : this._privateProp,
        privateMethod    : this._privateMethod(),
      };
  }
}

/*
 * Static data
 */
testClass.staticPublicProp = values.STATIC_PUBLIC_PROP;
const _staticPrivateProp = values.STATIC_PRIVATE_PROP;

/*
 * Static public methods
 */
testClass.staticPublicMethod = function() {
  return {
    staticPublicProp: testClass.staticPublicProp
  };
}

testClass.staticPrivilegedMethod = function() {
  return {
    staticPublicProp   : testClass.staticPublicProp,
    staticPrivateProp  : _staticPrivateProp,
    staticPrivateMethod: _staticPrivateMethod(),
  };
}

function _staticPrivateMethod() {
  return values.STATIC_PRIVATE_METHOD;
}

module.exports = testClass;
