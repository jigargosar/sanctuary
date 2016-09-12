'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('toMaybe', function() {

  utils.assertUnaryFunction(S.toMaybe);

  it('returns Nothing when applied to null/undefined', function() {
    eq(S.toMaybe(null), S.Nothing);
    eq(S.toMaybe(undefined), S.Nothing);
  });

  it('returns a Just when applied to any other value', function() {
    eq(S.toMaybe(0), S.Just(0));
    eq(S.toMaybe(false), S.Just(false));
  });

});
