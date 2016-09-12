'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var area        = utils.area;
var eq          = utils.eq;
var errorEq     = utils.errorEq;
var highArity   = utils.highArity;


describe('encase3', function() {

  utils.assertQuaternaryFunction(S.encase3);

  it('type checks its arguments', function() {
    throws(function() { S.encase3([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'encase3 :: Function -> a -> b -> c -> Maybe d\n' +
                   '           ^^^^^^^^\n' +
                   '              1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('returns a Just on success', function() {
    eq(S.encase3(area, 3, 4, 5), S.Just(6));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase3(area, 2, 2, 5), S.Nothing);
  });

  it('can be applied to a function of arbitrary arity', function() {
    eq(S.encase3(S.K(highArity), 0, 0, 42), S.Just(42));
  });

  it('is curried', function() {
    eq(S.encase3(area).length, 3);
    eq(S.encase3(area)(3).length, 2);
    eq(S.encase3(area)(3)(4).length, 1);
    eq(S.encase3(area)(3)(4)(5), S.Just(6));
  });

});
