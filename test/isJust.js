'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('isJust', function() {

  utils.assertUnaryFunction(S.isJust);

  it('type checks its arguments', function() {
    throws(function() { S.isJust([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'isJust :: Maybe a -> Boolean\n' +
                   '          ^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Maybe a’.\n'));
  });

  it('returns true when applied to a Just', function() {
    eq(S.isJust(S.Just(42)), true);
  });

  it('returns false when applied to Nothing', function() {
    eq(S.isJust(S.Nothing), false);
  });

});
