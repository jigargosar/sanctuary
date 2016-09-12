'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('indexOf', function() {

  utils.assertBinaryFunction(S.indexOf);

  it('type checks its arguments', function() {
    throws(function() { S.indexOf('x', null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'indexOf :: a -> List a -> Maybe Integer\n' +
                   '                ^^^^^^\n' +
                   '                  1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘List a’.\n'));
  });

  it('returns Nothing for an empty list', function() {
    eq(S.indexOf(10, []), S.Nothing);
  });

  it('returns Nothing if the element is not found', function() {
    eq(S.indexOf('x', ['b', 'a', 'n', 'a', 'n', 'a']), S.Nothing);
  });

  it('returns Just the index of the element found', function() {
    eq(S.indexOf('a', ['b', 'a', 'n', 'a', 'n', 'a']), S.Just(1));
  });

  it('can operate on strings', function() {
    eq(S.indexOf('an', 'banana'), S.Just(1));
    eq(S.indexOf('ax', 'banana'), S.Nothing);
  });

  it('is curried', function() {
    eq(S.indexOf('c').length, 1);
    eq(S.indexOf('c')(['a', 'b', 'c', 'd', 'e']), S.Just(2));
  });

});
