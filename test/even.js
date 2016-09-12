'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('even', function() {

  utils.assertUnaryFunction(S.even);

  it('type checks its arguments', function() {
    throws(function() { S.even(0.5); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'even :: Integer -> Boolean\n' +
                   '        ^^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  0.5 :: Number, FiniteNumber, NonZeroFiniteNumber, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Integer’.\n'));

    throws(function() { S.even(Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'even :: Integer -> Boolean\n' +
                   '        ^^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Integer’.\n'));
  });

  it('returns true for even integer', function() {
    eq(S.even(0), true);
    eq(S.even(-0), true);
    eq(S.even(2), true);
    eq(S.even(-2), true);
    eq(S.even(new Number(0)), true);
    eq(S.even(new Number(-0)), true);
    eq(S.even(new Number(2)), true);
    eq(S.even(new Number(-2)), true);
  });

  it('returns false for odd integer', function() {
    eq(S.even(1), false);
    eq(S.even(-1), false);
    eq(S.even(new Number(1)), false);
    eq(S.even(new Number(-1)), false);
  });

});
