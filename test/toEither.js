'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('toEither', function() {

  utils.assertBinaryFunction(S.toEither);

  it('returns Left of the first argument when second argument is `null`-y', function() {
    eq(S.toEither('a', null), S.Left('a'));
    eq(S.toEither('a', undefined), S.Left('a'));
  });

  it('returns a Right of the second argument when it is not `null`-y', function() {
    eq(S.toEither('a', 42), S.Right(42));
  });

});
