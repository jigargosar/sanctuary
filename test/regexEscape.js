'use strict';

var assert      = require('assert');

var jsc         = require('jsverify');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('regexEscape', function() {

  utils.assertUnaryFunction(S.regexEscape);

  it('type checks its arguments', function() {
    throws(function() { S.regexEscape(/(?:)/); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'regexEscape :: String -> String\n' +
                   '               ^^^^^^\n' +
                   '                 1\n' +
                   '\n' +
                   '1)  /(?:)/ :: RegExp\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('escapes regular expression metacharacters', function() {
    eq(S.regexEscape('-=*{XYZ}*=-'), '\\-=\\*\\{XYZ\\}\\*=\\-');
  });

  it('property: test(regex("", regexEscape(s)), s)', function() {
    jsc.assert(jsc.forall(jsc.string, function(s) {
      return S.test(S.regex('', S.regexEscape(s)), s);
    }), {tests: 1000});
  });

  it('property: test(regex("", "^" + regexEscape(s) + "$"), s)', function() {
    jsc.assert(jsc.forall(jsc.string, function(s) {
      return S.test(S.regex('', '^' + S.regexEscape(s) + '$'), s);
    }), {tests: 1000});
  });

});
