'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('maybeToEither', function() {

  utils.assertBinaryFunction(S.maybeToEither);

  it('type checks its arguments', function() {
    throws(function() { S.maybeToEither('left', 1); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'maybeToEither :: a -> Maybe b -> Either a b\n' +
                   '                      ^^^^^^^\n' +
                   '                         1\n' +
                   '\n' +
                   '1)  1 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Maybe b’.\n'));
  });

  it('returns a Left of its first argument when the second is Nothing', function() {
    eq(S.maybeToEither('error msg', S.Nothing), S.Left('error msg'));
  });

  it('returns a Right of the value contained in the Just when the second argument is a Just', function() {
    eq(S.maybeToEither('error msg', S.Just(42)), S.Right(42));
  });

  it('is curried', function() {
    eq(S.maybeToEither(0).length, 1);
    eq(S.maybeToEither(0)(S.Just(42)), S.Right(42));
  });

});
