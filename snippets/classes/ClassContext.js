const values = require('./values');
const assert = require('assert');

/*
 * Private data is defined in the constructor, executing all the
 * methods in that context.
 *
 * Pros:
 *  + Real private properties and methods
 * Cons:
 *  - Very slow for the creation of the instances, since the methods
 *    are created in the constructor every time
 */
class testClass {
  constructor(params) {
    this.publicProp = values.PUBLIC_PROP;
    const privateProp = values.PRIVATE_PROP;

    function privateMethod() {
      assert.equal(values.PARAMETER, params);

      return values.PRIVATE_METHOD;
    }

    this.publicMethod = function() {
      return {
        parameter       : params,
        staticPublicProp: testClass.staticPublicProp,
        publicProp      : this.publicProp,
      };
    };

    this.privilegedMethod = function() {
      return {
        parameter        : params,
        staticPublicProp : testClass.staticPublicProp,
        staticPrivateProp: staticPrivateProp,
        publicProp       : this.publicProp,
        privateProp      : privateProp,
        privateMethod    : privateMethod(),
      };
    }
  }
}

/*
 * Static public properties
 */
testClass.staticPublicProp = values.STATIC_PUBLIC_PROP;

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
    staticPrivateProp  : staticPrivateProp,
    staticPrivateMethod: staticPrivateMethod(),
  };
}

/*
 * Static private properties
 */
const staticPrivateProp = values.STATIC_PRIVATE_PROP;

/*
 * Static private methods
 */
function staticPrivateMethod() {
  return values.STATIC_PRIVATE_METHOD;
}

module.exports = testClass;
