'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('reject', function() {

  utils.assertBinaryFunction(S.reject);

  it('type checks its arguments', function() {
    throws(function() { S.reject(S.even, S.Right(0)); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'reject :: (Monad m, Monoid m) => Function -> m -> m\n' +
                   '                    ^^^^^^^^                 ^\n' +
                   '                                             1\n' +
                   '\n' +
                   '1)  Right(0) :: Either ??? Number, Either ??? FiniteNumber, Either ??? Integer, Either ??? ValidNumber\n' +
                   '\n' +
                   '‘reject’ requires ‘m’ to satisfy the Monoid type-class constraint; the value at position 1 does not.\n'));
  });

  it('filters a value based on the given predicate', function() {
    eq(S.reject(S.even, []), []);
    eq(S.reject(S.even, [0, 2, 4, 6, 8]), []);
    eq(S.reject(S.even, [1, 3, 5, 7, 9]), [1, 3, 5, 7, 9]);
    eq(S.reject(S.even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    eq(S.reject(S.even, S.Nothing), S.Nothing);
    eq(S.reject(S.even, S.Just(4)), S.Nothing);
    eq(S.reject(S.even, S.Just(9)), S.Just(9));
  });

});
