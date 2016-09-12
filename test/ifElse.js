'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('ifElse', function() {

  var lt0 = function(x) { return x < 0; };

  utils.assertQuaternaryFunction(S.ifElse);

  it('type checks its arguments', function() {
    throws(function() { S.ifElse('wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'ifElse :: Function -> Function -> Function -> a -> b\n' +
                   '          ^^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.ifElse(lt0, 'wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'ifElse :: Function -> Function -> Function -> a -> b\n' +
                   '                      ^^^^^^^^\n' +
                   '                         1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));

    throws(function() { S.ifElse(lt0, Math.abs, 'wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'ifElse :: Function -> Function -> Function -> a -> b\n' +
                   '                                  ^^^^^^^^\n' +
                   '                                     1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('applies the first function when the predicate returns true', function() {
    eq(S.ifElse(lt0, Math.abs, Math.sqrt, -1), 1);
  });

  it('applies the second function when the predicate returns false', function() {
    eq(S.ifElse(lt0, Math.abs, Math.sqrt, 16), 4);
  });

  it('is curried', function() {
    eq(S.ifElse(lt0).length, 3);
    eq(S.ifElse(lt0)(Math.abs).length, 2);
    eq(S.ifElse(lt0)(Math.abs)(Math.sqrt).length, 1);
    eq(S.ifElse(lt0)(Math.abs)(Math.sqrt)(-1), 1);
  });

});
