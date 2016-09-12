'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('isLeft', function() {

  utils.assertUnaryFunction(S.isLeft);

  it('type checks its arguments', function() {
    throws(function() { S.isLeft([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'isLeft :: Either a b -> Boolean\n' +
                   '          ^^^^^^^^^^\n' +
                   '              1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));
  });

  it('returns true when applied to a Left', function() {
    eq(S.isLeft(S.Left(42)), true);
  });

  it('returns false when applied to a Right', function() {
    eq(S.isLeft(S.Right(42)), false);
  });

});
