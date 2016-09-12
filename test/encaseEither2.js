'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;
var highArity   = utils.highArity;
var rem         = utils.rem;


describe('encaseEither2', function() {

  utils.assertQuaternaryFunction(S.encaseEither2);

  it('type checks its arguments', function() {
    throws(function() { S.encaseEither2(null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encaseEither2 :: Function -> Function -> a -> b -> Either l r\n' +
                   '                 ^^^^^^^^\n' +
                   '                    1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.encaseEither2(S.I, null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encaseEither2 :: Function -> Function -> a -> b -> Either l r\n' +
                   '                             ^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('returns a Right on success', function() {
    eq(S.encaseEither2(S.I, rem, 42, 5), S.Right(2));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither2(S.I, rem, 42, 0),
       S.Left(new Error('Cannot divide by zero')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither2(S.prop('message'), rem, 42, 0),
       S.Left('Cannot divide by zero'));
  });

  it('can be applied to a function of arbitrary arity', function() {
    eq(S.encaseEither2(S.I, highArity, 0, 42),
       S.Right(42));
  });

  it('is curried', function() {
    eq(S.encaseEither2(S.I).length, 3);
    eq(S.encaseEither2(S.I)(rem).length, 2);
    eq(S.encaseEither2(S.I)(rem)(42).length, 1);
    eq(S.encaseEither2(S.I)(rem)(42)(5), S.Right(2));
  });

});
