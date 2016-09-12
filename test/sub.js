'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('sub', function() {

  utils.assertBinaryFunction(S.sub);

  it('type checks its arguments', function() {
    throws(function() { S.sub('xxx', 1); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'sub :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.sub(1, 'xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'sub :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^\n' +
                   '                            1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.sub(1, Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'sub :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^\n' +
                   '                            1\n' +
                   '\n' +
                   '1)  Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.sub(1, -Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'sub :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                       ^^^^^^^^^^^^\n' +
                   '                            1\n' +
                   '\n' +
                   '1)  -Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));
  });

  it('subtracts two numbers', function() {
    eq(S.sub(1, 1), 0);
    eq(S.sub(-1, -1), 0);
    eq(S.sub(7.5, 2), 5.5);
    eq(S.sub(-7.5, -2), -5.5);
  });

  it('is curried', function() {
    eq(S.sub(1).length, 1);
    eq(S.sub(1)(1), 0);
  });

});
