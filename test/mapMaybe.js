'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('mapMaybe', function() {

  utils.assertBinaryFunction(S.mapMaybe);

  it('type checks its arguments', function() {
    throws(function() { S.mapMaybe([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mapMaybe :: Function -> Array a -> Array b\n' +
                   '            ^^^^^^^^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.mapMaybe(S.head, null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mapMaybe :: Function -> Array a -> Array b\n' +
                   '                        ^^^^^^^\n' +
                   '                           1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array a’.\n'));
  });

  it('maps over a list to produce a list of successful results', function() {
    eq(S.mapMaybe(S.head, []), []);
    eq(S.mapMaybe(S.head, [[], [], []]), []);
    eq(S.mapMaybe(S.head, [[1, 2], [3, 4], [5, 6]]), [1, 3, 5]);
    eq(S.mapMaybe(S.head, [[1], [], [3], [], [5], []]), [1, 3, 5]);
  });

  it('is curried', function() {
    eq(S.mapMaybe(S.head).length, 1);
    eq(S.mapMaybe(S.head)(['foo', '', 'bar', '', 'baz']), ['f', 'b', 'b']);
  });

});
