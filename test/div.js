'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('div', function() {

  utils.assertBinaryFunction(S.div);

  it('type checks its arguments', function() {
    throws(function() { S.div('xxx', 1); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.div(1, 'xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘NonZeroFiniteNumber’.\n'));

    throws(function() { S.div(1, 0); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  0 :: Number, FiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘NonZeroFiniteNumber’.\n'));

    throws(function() { S.div(1, -0); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  -0 :: Number, FiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘NonZeroFiniteNumber’.\n'));
  });

  it('divides two numbers', function() {
    eq(S.div(8, 2), 4);
    eq(S.div(8, -2), -4);
    eq(S.div(-8, -2), 4);
    eq(S.div(1.5, 2), 0.75);
    eq(S.div(1.5, -2), -0.75);
    eq(S.div(-1.5, -2), 0.75);
  });

  it('is curried', function() {
    eq(S.div(4).length, 1);
    eq(S.div(8)(2), 4);
  });

});
