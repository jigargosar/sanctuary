'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('negate', function() {

  utils.assertUnaryFunction(S.negate);

  it('type checks its arguments', function() {
    throws(function() { S.negate(NaN); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'negate :: ValidNumber -> ValidNumber\n' +
                   '          ^^^^^^^^^^^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  NaN :: Number\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘ValidNumber’.\n'));
  });

  it('negates its argument', function() {
    eq(S.negate(0.5), -0.5);
    eq(S.negate(-0.5), 0.5);
    eq(S.negate(0), -0);
    eq(S.negate(-0), 0);
    eq(S.negate(new Number(0.5)), -0.5);
    eq(S.negate(new Number(-0.5)), 0.5);
    eq(S.negate(new Number(0)), -0);
    eq(S.negate(new Number(-0)), 0);
  });

});
