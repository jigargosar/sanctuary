'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('isRight', function() {

  utils.assertUnaryFunction(S.isRight);

  it('type checks its arguments', function() {
    throws(function() { S.isRight([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'isRight :: Either a b -> Boolean\n' +
                   '           ^^^^^^^^^^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));
  });

  it('returns true when applied to a Right', function() {
    eq(S.isRight(S.Right(42)), true);
  });

  it('returns false when applied to a Left', function() {
    eq(S.isRight(S.Left(42)), false);
  });

});
