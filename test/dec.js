'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('dec', function() {

  utils.assertUnaryFunction(S.dec);

  it('type checks its arguments', function() {
    throws(function() { S.dec('xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'dec :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.dec(Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'dec :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.dec(-Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'dec :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  -Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));
  });

  it('decrements a number by one', function() {
    eq(S.dec(2), 1);
    eq(S.dec(-1), -2);
    eq(S.dec(1.5), 0.5);
    eq(S.dec(-1.5), -2.5);
  });

});
