'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('lift', function() {

  utils.assertBinaryFunction(S.lift);

  it('type checks its arguments', function() {
    throws(function() { S.lift('wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'lift :: (Functor a, Functor b) => Function -> a -> b\n' +
                   '                                  ^^^^^^^^\n' +
                   '                                     1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('lifts a function into the context of Functors', function() {
    eq(S.lift(S.mult(2), S.Just(3)), S.Just(6));
    eq(S.lift(S.mult(2), S.Nothing), S.Nothing);

    eq(S.lift(S.mult(2), S.Left(3)), S.Left(3));
    eq(S.lift(S.mult(2), S.Right(3)), S.Right(6));

    eq(S.lift(S.mult(2), [1, 2, 3]), [2, 4, 6]);
    eq(S.lift(S.mult(2), []), []);

    eq(S.lift(S.not, S.even)(42), false);
    eq(S.lift(S.not, S.even)(43), true);
  });

});
