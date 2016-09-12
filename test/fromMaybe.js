'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('fromMaybe', function() {

  utils.assertBinaryFunction(S.fromMaybe);

  it('type checks its arguments', function() {
    throws(function() { S.fromMaybe(0, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'fromMaybe :: a -> Maybe a -> a\n' +
                   '                  ^^^^^^^\n' +
                   '                     1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Maybe a’.\n'));
  });

  it('can be applied to Nothing', function() {
    eq(S.fromMaybe(0, S.Nothing), 0);
  });

  it('can be applied to a Just', function() {
    eq(S.fromMaybe(0, S.Just(42)), 42);
  });

  it('is curried', function() {
    eq(S.fromMaybe(0).length, 1);
    eq(S.fromMaybe(0)(S.Just(42)), 42);
  });

});
