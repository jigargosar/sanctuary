'use strict';

var Z           = require('sanctuary-type-classes');


//  Identity :: a -> Identity a
var Identity = module.exports = function Identity(x) {
  return {
    'fantasy-land/equals': function(other) { return Z.equals(x, other.value); },
    'fantasy-land/of': Identity,
    'fantasy-land/map': function(f) { return Identity(f(x)); },
    'fantasy-land/ap': function(y) { return Identity(x(y)); },
    toString: function() { return 'Identity(' + Z.toString(x) + ')'; },
    value: x
  };
};

Identity['fantasy-land/of'] = Identity;

//  Identity.Arb :: Arbitrary a -> Arbitrary (Identity a)
Identity.Arb = function(arb) {
  return arb.smap(Identity, function(i) { return i.value; });
};
