'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('lefts', function() {

  utils.assertUnaryFunction(S.lefts);

  it('type checks its arguments', function() {
    throws(function() { S.lefts([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'lefts :: Array (Either a b) -> Array a\n' +
                   '               ^^^^^^^^^^^^\n' +
                   '                    1\n' +
                   '\n' +
                   '1)  1 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));
  });

  it('returns a list containing the value of each Left', function() {
    eq(S.lefts([]), []);
    eq(S.lefts([S.Right(2), S.Right(1)]), []);
    eq(S.lefts([S.Right(2), S.Left('b')]), ['b']);
    eq(S.lefts([S.Left('a'), S.Right(1)]), ['a']);
    eq(S.lefts([S.Left('a'), S.Left('b')]), ['a', 'b']);
  });

});
