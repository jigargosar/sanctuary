'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('match', function() {

  utils.assertBinaryFunction(S.match);

  it('type checks its arguments', function() {
    throws(function() { S.match([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'match :: RegExp -> String -> Maybe (Array (Maybe String))\n' +
                   '         ^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘RegExp’.\n'));

    throws(function() { S.match(/(?:)/, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'match :: RegExp -> String -> Maybe (Array (Maybe String))\n' +
                   '                   ^^^^^^\n' +
                   '                     1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns a Just containing an array of Justs', function() {
    eq(S.match(/abcd/, 'abcdefg'), S.Just([S.Just('abcd')]));
  });

  it('supports global patterns', function() {
    eq(S.match(/[a-z]a/g, 'bananas'),
       S.Just([S.Just('ba'), S.Just('na'), S.Just('na')]));
  });

  it('supports (optional) capturing groups', function() {
    eq(S.match(/(good)?bye/, 'goodbye'),
       S.Just([S.Just('goodbye'), S.Just('good')]));
    eq(S.match(/(good)?bye/, 'bye'),
       S.Just([S.Just('bye'), S.Nothing]));
  });

  it('returns Nothing if no match', function() {
    eq(S.match(/zzz/, 'abcdefg'), S.Nothing);
  });

  it('is curried', function() {
    eq(S.match(/x/).length, 1);
    eq(S.match(/x/)('xyz'), S.Just([S.Just('x')]));
  });

});
