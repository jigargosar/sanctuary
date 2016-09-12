'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('lines', function() {

  utils.assertUnaryFunction(S.lines);

  it('type checks its arguments', function() {
    throws(function() { S.lines(['foo']); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'lines :: String -> Array String\n' +
                   '         ^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  ["foo"] :: Array String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('splits a string into a list of lines', function() {
    eq(S.lines(''), []);
    eq(S.lines('\n'), ['']);
    eq(S.lines('\n\n'), ['', '']);
    eq(S.lines('foo\nbar\nbaz'), ['foo', 'bar', 'baz']);
    eq(S.lines('foo\nbar\nbaz\n'), ['foo', 'bar', 'baz']);
    eq(S.lines('\tfoo\r\n\tbar\r\n\tbaz\r\n'), ['\tfoo', '\tbar', '\tbaz']);
  });

});
