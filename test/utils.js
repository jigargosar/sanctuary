'use strict';

var assert      = require('assert');

var FantasyLand = require('fantasy-land');
var jsc         = require('jsverify');
var Z           = require('sanctuary-type-classes');

var S           = require('..');


//      area :: Number -> Number -> Number -> Number !
exports.area = function(a) {
  return function(b) {
    return function(c) {
      if (Math.max(a, b, c) < (a + b + c) / 2) {
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
      } else {
        throw new Error('Impossible triangle');
      }
    };
  };
};

['unary', 'binary', 'ternary', 'quaternary', 'quinary'].forEach(function(arity, idx) {
  exports['assert' + arity.charAt(0).toUpperCase() + arity.slice(1) + 'Function'] = function(x) {
    it('is a ' + arity + ' function', function() {
      eq(typeof x, 'function');
      eq(x.length, idx + 1);
    });
  };
});

var eq = exports.eq = function(actual, expected) {
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
};

//      errorEq :: (TypeRep a, String) -> Error -> Boolean
exports.errorEq = function(type, message) {
  return function(error) {
    return error.constructor === type && error.message === message;
  };
};

//      factorial :: Number -> Number !
var factorial = exports.factorial = function(n) {
  if (n < 0) {
    throw new Error('Cannot determine factorial of negative number');
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

exports.forall = function() {
  jsc.assert(jsc.forall.apply(jsc, arguments));
};

//      rem :: Number -> Number -> Number !
exports.rem = function(x) {
  return function(y) {
    if (y === 0) {
      throw new Error('Cannot divide by zero');
    } else {
      return x % y;
    }
  };
};

//      highArity :: a -> ((b, c, d) -> b)
exports.highArity = function(a) {
  return function(b, c, d) {
    return b;
  };
};

exports.runCompositionTests = function(compose) {

  exports.assertTernaryFunction(compose);

  it('composes two functions assumed to be unary', function() {
    eq(compose(S.map(Math.sqrt), JSON.parse, '[1, 4, 9]'), [1, 2, 3]);
  });

  it('is curried', function() {
    eq(compose(S.map(Math.sqrt)).length, 2);
    eq(compose(S.map(Math.sqrt))(JSON.parse).length, 1);
    eq(compose(S.map(Math.sqrt))(JSON.parse)('[1, 4, 9]'), [1, 2, 3]);
  });

};

exports.testFantasyLandMethods = function(exemplars, strMap) {
  var description = function(methodName) {
    var determiner = /^[aeiou]/i.test(methodName) ? 'an' : 'a';
    return 'provides ' + determiner + ' "' + methodName + '" method';
  };

  for (var methodName in strMap) {
    it(description(FantasyLand[methodName]), function() {
      strMap[methodName](FantasyLand[methodName]);
    });

    it(description(methodName), function() {
      exemplars.forEach(function(x) {
        eq(typeof x[methodName], 'function');
        eq(x[methodName], x[FantasyLand[methodName]]);
      });
    });
  }
};
