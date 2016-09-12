'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('unlines', function() {

  utils.assertUnaryFunction(S.unlines);

  it('type checks its arguments', function() {
    throws(function() { S.unlines(null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'unlines :: Array String -> String\n' +
                   '           ^^^^^^^^^^^^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array String’.\n'));
  });

  it('joins a list of lines after appending "\n" to each', function() {
    eq(S.unlines([]), '');
    eq(S.unlines(['']), '\n');
    eq(S.unlines(['', '']), '\n\n');
    eq(S.unlines(['\n']), '\n\n');
    eq(S.unlines(['\n', '\n']), '\n\n\n\n');
    eq(S.unlines(['foo', 'bar', 'baz']), 'foo\nbar\nbaz\n');
  });

});
