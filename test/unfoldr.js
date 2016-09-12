'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('unfoldr', function() {

  utils.assertBinaryFunction(S.unfoldr);

  it('type checks its arguments', function() {
    throws(function() { S.unfoldr(null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'unfoldr :: Function -> b -> Array a\n' +
                   '           ^^^^^^^^\n' +
                   '              1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('correctly unfolds a value into a list', function() {
    var f = function(n) {
      return n >= 5 ? S.Nothing : S.Just([n, n + 1]);
    };
    eq(S.unfoldr(f, 5), []);
    eq(S.unfoldr(f, 4), [4]);
    eq(S.unfoldr(f, 1), [1, 2, 3, 4]);
  });

});
