'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('words', function() {

  utils.assertUnaryFunction(S.words);

  it('type checks its arguments', function() {
    throws(function() { S.words(['foo']); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'words :: String -> Array String\n' +
                   '         ^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  ["foo"] :: Array String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('splits a string into a list of words', function() {
    eq(S.words(''), []);
    eq(S.words(' '), []);
    eq(S.words(' \t\r\n'), []);
    eq(S.words('foo bar baz'), ['foo', 'bar', 'baz']);
    eq(S.words(' foo bar baz '), ['foo', 'bar', 'baz']);
    eq(S.words('\tfoo\r\n\tbar\r\n\tbaz\r\n'), ['foo', 'bar', 'baz']);
  });

});
