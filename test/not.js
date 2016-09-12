'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('not', function() {

  utils.assertUnaryFunction(S.not);

  it('can be applied to Booleans', function() {
    eq(S.not(false), true);
    eq(S.not(true), false);
    eq(S.not(new Boolean(false)), true);
    eq(S.not(new Boolean(true)), false);
  });

  it('throws when applied to a non-Boolean value', function() {
    throws(function() { S.not(0); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'not :: Boolean -> Boolean\n' +
                   '       ^^^^^^^\n' +
                   '          1\n' +
                   '\n' +
                   '1)  0 :: Number, FiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Boolean’.\n'));
  });

});
