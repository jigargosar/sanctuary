'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('unwords', function() {

  utils.assertUnaryFunction(S.unwords);

  it('type checks its arguments', function() {
    throws(function() { S.unwords(null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'unwords :: Array String -> String\n' +
                   '           ^^^^^^^^^^^^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array String’.\n'));
  });

  it('joins -- with separating spaces -- a list of words', function() {
    eq(S.unwords([]), '');
    eq(S.unwords(['']), '');
    eq(S.unwords(['', '']), ' ');
    eq(S.unwords([' ']), ' ');
    eq(S.unwords([' ', ' ']), '   ');
    eq(S.unwords(['foo', 'bar', 'baz']), 'foo bar baz');
    eq(S.unwords([' foo ', ' bar ', ' baz ']), ' foo   bar   baz ');
  });

});
