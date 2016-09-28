'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('keys', function() {

  utils.assertUnaryFunction(S.keys);

  it('type checks its arguments', function() {
    throws(function() { S.keys('xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'keys :: StrMap a -> Array String\n' +
                   '        ^^^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘StrMap a’.\n'));

    throws(function() { S.keys({a: '1', b: 2, c: '3'}); },
           errorEq(TypeError,
                   'Type-variable constraint violation\n' +
                   '\n' +
                   'keys :: StrMap a -> Array String\n' +
                   '               ^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  "1" :: String\n' +
                   '    2 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '    "3" :: String\n' +
                   '\n' +
                   'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n'));
  });

  it("returns an array of the given object's own keys", function() {
    eq(S.keys({}), []);
    eq(S.keys({a: 1, b: 2, c: 3}).sort(), ['a', 'b', 'c']);
  });

  it('does not include prototype properties', function() {
    var proto = {a: 1, b: 2};
    var obj = Object.create(proto);
    obj.c = 3;
    obj.d = 4;

    eq(S.keys(obj).sort(), ['c', 'd']);
  });

});
