'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('flip', function() {

  utils.assertTernaryFunction(S.flip);

  it('throws if applied to values of different types', function() {
    throws(function() { S.flip('wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'flip :: Function -> b -> a -> c\n' +
                   '        ^^^^^^^^\n' +
                   '           1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it("flips a function's argument order", function() {
    eq(S.map(S.flip(Math.pow)(2), [1, 2, 3, 4, 5]), [1, 4, 9, 16, 25]);
    eq(S.flip(S.indexOf, ['a', 'b', 'c', 'd'], 'c'), S.Just(2));
  });

  it('is curried', function() {
    eq(S.flip(S.indexOf).length, 2);
    eq(S.flip(S.indexOf)(['a', 'b', 'c', 'd']).length, 1);
    eq(S.flip(S.indexOf)(['a', 'b', 'c', 'd'])('c'), S.Just(2));
  });

});
