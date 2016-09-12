'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('rights', function() {

  utils.assertUnaryFunction(S.rights);

  it('type checks its arguments', function() {
    throws(function() { S.rights([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'rights :: Array (Either a b) -> Array b\n' +
                   '                ^^^^^^^^^^^^\n' +
                   '                     1\n' +
                   '\n' +
                   '1)  1 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Either a b’.\n'));
  });

  it('returns a list containing the value of each Right', function() {
    eq(S.rights([]), []);
    eq(S.rights([S.Left('a'), S.Left('b')]), []);
    eq(S.rights([S.Left('a'), S.Right(1)]), [1]);
    eq(S.rights([S.Right(2), S.Left('b')]), [2]);
    eq(S.rights([S.Right(2), S.Right(1)]), [2, 1]);
  });

});
