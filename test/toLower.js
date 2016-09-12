'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('toLower', function() {

  utils.assertUnaryFunction(S.toLower);

  it('type checks its arguments', function() {
    throws(function() { S.toLower(true); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'toLower :: String -> String\n' +
                   '           ^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  true :: Boolean\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns the lower-case equivalent of its argument', function() {
    eq(S.toLower(''), '');
    eq(S.toLower('ABC def 123'), 'abc def 123');
    eq(S.toLower(new String('')), '');
    eq(S.toLower(new String('ABC def 123')), 'abc def 123');
  });

});
