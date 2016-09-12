'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('find', function() {

  utils.assertBinaryFunction(S.find);

  it('type checks its arguments', function() {
    throws(function() { S.find([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'find :: Function -> Array a -> Maybe a\n' +
                   '        ^^^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.find(S.K(true), null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'find :: Function -> Array a -> Maybe a\n' +
                   '                    ^^^^^^^\n' +
                   '                       1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array a’.\n'));
  });

  it('returns Just the first element satisfying the predicate', function() {
    eq(S.find(S.K(true), [null]), S.Just(null));
    eq(S.find(function(n) { return n >= 0; }, [-1, 0, 1]), S.Just(0));
  });

  it('returns Nothing if no element satisfies the predicate', function() {
    eq(S.find(S.K(true), []), S.Nothing);
    eq(S.find(S.K(false), [1, 2, 3]), S.Nothing);
  });

  it('is curried', function() {
    eq(S.find(S.K(true)).length, 1);
    eq(S.find(S.K(true))([null]), S.Just(null));
  });

});
