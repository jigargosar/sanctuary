'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('maybe', function() {

  utils.assertTernaryFunction(S.maybe);

  it('type checks its arguments', function() {
    throws(function() { S.maybe(0, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'maybe :: b -> Function -> Maybe a -> b\n' +
                   '              ^^^^^^^^\n' +
                   '                 1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.maybe(0, S.prop('length'), [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'maybe :: b -> Function -> Maybe a -> b\n' +
                   '                          ^^^^^^^\n' +
                   '                             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Maybe a’.\n'));
  });

  it('can be applied to Nothing', function() {
    eq(S.maybe(0, S.prop('length'), S.Nothing), 0);
  });

  it('can be applied to a Just', function() {
    eq(S.maybe(0, S.prop('length'), S.Just([1, 2, 3])), 3);
  });

  it('is curried', function() {
    eq(S.maybe(NaN).length, 2);
    eq(S.maybe(NaN)(Math.sqrt).length, 1);
    eq(S.maybe(NaN)(Math.sqrt)(S.Just(9)), 3);
  });

});
