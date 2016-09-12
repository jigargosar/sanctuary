'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('test', function() {

  utils.assertBinaryFunction(S.test);

  it('type checks its arguments', function() {
    throws(function() { S.test('^a'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'test :: RegExp -> String -> Boolean\n' +
                   '        ^^^^^^\n' +
                   '          1\n' +
                   '\n' +
                   '1)  "^a" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘RegExp’.\n'));

    throws(function() { S.test(/^a/, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'test :: RegExp -> String -> Boolean\n' +
                   '                  ^^^^^^\n' +
                   '                    1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns true if pattern matches string', function() {
    eq(S.test(/^a/, 'abacus'), true);
  });

  it('returns false if pattern does not match string', function() {
    eq(S.test(/^a/, 'banana'), false);
  });

  it('is referentially transparent', function() {
    var pattern = /x/g;
    eq(pattern.lastIndex, 0);
    eq(S.test(pattern, 'xyz'), true);
    eq(pattern.lastIndex, 0);
    eq(S.test(pattern, 'xyz'), true);
  });

  it('is curried', function() {
    eq(S.test(/^a/).length, 1);
    eq(S.test(/^a/)('abacus'), true);
  });

});
