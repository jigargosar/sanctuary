'use strict';

var Z           = require('sanctuary-type-classes');

var S           = require('../..');


//  Compose :: (Apply f, Apply g) => ({ of :: b -> f b }, { of :: c -> g c }) -> f (g a) -> Compose f g a
module.exports = function(F, G) {
  var _Compose = function _Compose(x) {
    return {
      'fantasy-land/equals': function(other) {
        return Z.equals(x, other.value);
      },
      'fantasy-land/map': function(f) {
        return _Compose(S.map(S.map(f), x));
      },
      'fantasy-land/ap': function(f) {
        return _Compose(S.ap(S.map(S.ap, f.value), x));
      },
      constructor: _Compose,
      value: x
    };
  };
  _Compose['fantasy-land/of'] = function(x) {
    return _Compose(F['fantasy-land/of'](G['fantasy-land/of'](x)));
  };
  return _Compose;
};
