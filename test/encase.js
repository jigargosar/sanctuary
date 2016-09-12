'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;
var factorial   = utils.factorial;


describe('encase', function() {

  utils.assertBinaryFunction(S.encase);

  it('type checks its arguments', function() {
    throws(function() { S.encase([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encase :: Function -> a -> Maybe b\n' +
                   '          ^^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('returns a Just on success', function() {
    eq(S.encase(factorial, 5), S.Just(120));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase(factorial, -1), S.Nothing);
  });

  it('can be applied to a function of arbitrary arity', function() {
    eq(S.encase(function(a, b, c, d) { return a; }, 42), S.Just(42));
  });

  it('is curried', function() {
    eq(S.encase(factorial).length, 1);
    eq(S.encase(factorial)(5), S.Just(120));
  });

});
