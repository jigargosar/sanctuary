'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('max', function() {

  utils.assertBinaryFunction(S.max);

  it('type checks its arguments', function() {
    throws(function() { S.max(/x/); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'max :: Ord a => a -> a -> a\n' +
                   '       ^^^^^    ^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  /x/ :: RegExp\n' +
                   '\n' +
                   '‘max’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n'));

    throws(function() { S.max(NaN); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'max :: Ord a => a -> a -> a\n' +
                   '       ^^^^^    ^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  NaN :: Number\n' +
                   '\n' +
                   '‘max’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n'));

    throws(function() { S.max(new Date('XXX')); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'max :: Ord a => a -> a -> a\n' +
                   '       ^^^^^    ^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  new Date(NaN) :: Date\n' +
                   '\n' +
                   '‘max’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n'));
  });

  it('can be applied to (valid) numbers', function() {
    eq(S.max(10, 2), 10);
    eq(S.max(2, 10), 10);
    eq(S.max(0.1, 0.01), 0.1);
    eq(S.max(0.01, 0.1), 0.1);
    eq(S.max(Infinity, -Infinity), Infinity);
    eq(S.max(-Infinity, Infinity), Infinity);
  });

  it('can be applied to (valid) dates', function() {
    eq(S.max(new Date(10), new Date(2)), new Date(10));
    eq(S.max(new Date(2), new Date(10)), new Date(10));
  });

  it('can be applied to strings', function() {
    eq(S.max('abc', 'xyz'), 'xyz');
    eq(S.max('xyz', 'abc'), 'xyz');
    eq(S.max('10', '2'), '2');
    eq(S.max('2', '10'), '2');
    eq(S.max('A', 'a'), 'a');
    eq(S.max('a', 'A'), 'a');
  });

  it('is curried', function() {
    eq(S.max(10).length, 1);
    eq(S.max(10)(2), 10);
  });

});
