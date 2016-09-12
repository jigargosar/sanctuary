'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('trim', function() {

  utils.assertUnaryFunction(S.trim);

  it('type checks its arguments', function() {
    throws(function() { S.trim(/XXX/); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'trim :: String -> String\n' +
                   '        ^^^^^^\n' +
                   '          1\n' +
                   '\n' +
                   '1)  /XXX/ :: RegExp\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('strips leading and trailing whitespace characters', function() {
    eq(S.trim(''), '');
    eq(S.trim(' '), '');
    eq(S.trim('x'), 'x');
    eq(S.trim(' x'), 'x');
    eq(S.trim('x '), 'x');
    eq(S.trim(' x '), 'x');
    eq(S.trim('\n\r\t x \n\r\t x \n\r\t'), 'x \n\r\t x');
  });

});
