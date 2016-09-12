'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('either', function() {

  utils.assertTernaryFunction(S.either);

  it('type checks its arguments', function() {
    throws(function() { S.either([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '          ^^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.either(S.__, Math.sqrt)([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '          ^^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.either(S.prop('length'), [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '                      ^^^^^^^^\n' +
                   '                         1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.either(S.prop('length'))([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '                      ^^^^^^^^\n' +
                   '                         1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.either(S.prop('length'), Math.sqrt, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '                                  ^^^^^^^^^^\n' +
                   '                                      1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));

    throws(function() { S.either(S.prop('length'))(Math.sqrt)([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'either :: Function -> Function -> Either a b -> c\n' +
                   '                                  ^^^^^^^^^^\n' +
                   '                                      1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));
  });

  it('can be applied to a Left', function() {
    eq(S.either(S.prop('length'), Math.sqrt, S.Left('abc')), 3);
  });

  it('can be applied to a Right', function() {
    eq(S.either(S.prop('length'), Math.sqrt, S.Right(9)), 3);
  });

  it('is curried', function() {
    var f = S.prop('length');
    var g = function(x) { return x * x; };
    var x = S.Left('abc');
    var _ = S.__;

    eq(S.either(f).length, 2);
    eq(S.either(f)(g).length, 1);

    eq(S.either(f)(g)(x), 3);
    eq(S.either(f)(g, x), 3);
    eq(S.either(f, g)(x), 3);
    eq(S.either(f, g, x), 3);

    eq(S.either(_, g, x)(f), 3);
    eq(S.either(f, _, x)(g), 3);
    eq(S.either(f, g, _)(x), 3);

    eq(S.either(f, _, _)(g)(x), 3);
    eq(S.either(_, g, _)(f)(x), 3);
    eq(S.either(_, _, x)(f)(g), 3);

    eq(S.either(f, _, _)(g, x), 3);
    eq(S.either(_, g, _)(f, x), 3);
    eq(S.either(_, _, x)(f, g), 3);

    eq(S.either(f, _, _)(_, x)(g), 3);
    eq(S.either(_, g, _)(_, x)(f), 3);
    eq(S.either(_, _, x)(_, g)(f), 3);

    eq(S.either(_, _, _)(_, _)(_)(f, g, x), 3);
    eq(S.either(_, _, _)(f, _, _)(_, _)(g, _)(_)(x), 3);
  });

});
