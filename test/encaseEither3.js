'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var area        = utils.area;
var eq          = utils.eq;
var errorEq     = utils.errorEq;
var highArity   = utils.highArity;


describe('encaseEither3', function() {

  utils.assertQuinaryFunction(S.encaseEither3);

  it('type checks its arguments', function() {
    throws(function() { S.encaseEither3(null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encaseEither3 :: Function -> Function -> a -> b -> c -> Either l r\n' +
                   '                 ^^^^^^^^\n' +
                   '                    1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.encaseEither3(S.I, null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encaseEither3 :: Function -> Function -> a -> b -> c -> Either l r\n' +
                   '                             ^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('returns a Right on success', function() {
    eq(S.encaseEither3(S.I, area, 3, 4, 5), S.Right(6));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither3(S.I, area, 2, 2, 5),
       S.Left(new Error('Impossible triangle')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither3(S.prop('message'), area, 2, 2, 5),
       S.Left('Impossible triangle'));
  });

  it('can be applied to a function of arbitrary arity', function() {
    eq(S.encaseEither3(S.I, S.K(highArity), 0, 0, 42),
       S.Right(42));
  });

  it('is curried', function() {
    eq(S.encaseEither3(S.I).length, 4);
    eq(S.encaseEither3(S.I)(area).length, 3);
    eq(S.encaseEither3(S.I)(area)(3).length, 2);
    eq(S.encaseEither3(S.I)(area)(3)(4).length, 1);
    eq(S.encaseEither3(S.I)(area)(3)(4)(5), S.Right(6));
  });

});
