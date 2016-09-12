'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('K', function() {

  utils.assertBinaryFunction(S.K);

  it('returns its first argument', function() {
    eq(S.K(21, []), 21);
    eq(S.K(42, null), 42);
    eq(S.K(84, undefined), 84);
  });

  it('is curried', function() {
    eq(S.K(42).length, 1);
    eq(S.K(42)(null), 42);
  });

});
