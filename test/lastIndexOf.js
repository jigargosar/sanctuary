'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('lastIndexOf', function() {

  utils.assertBinaryFunction(S.lastIndexOf);

  it('type checks its arguments', function() {
    throws(function() { S.lastIndexOf('x', null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'lastIndexOf :: a -> List a -> Maybe Integer\n' +
                   '                    ^^^^^^\n' +
                   '                      1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘List a’.\n'));
  });

  it('returns Nothing for an empty list', function() {
    eq(S.lastIndexOf('a', []), S.Nothing);
  });

  it('returns Nothing if the element is not found', function() {
    eq(S.lastIndexOf('x', ['b', 'a', 'n', 'a', 'n', 'a']), S.Nothing);
  });

  it('returns Just the last index of the element found', function() {
    eq(S.lastIndexOf('a', ['b', 'a', 'n', 'a', 'n', 'a']), S.Just(5));
  });

  it('can operate on strings', function() {
    eq(S.lastIndexOf('an', 'banana'), S.Just(3));
    eq(S.lastIndexOf('ax', 'banana'), S.Nothing);
  });

  it('is curried', function() {
    eq(S.lastIndexOf('c').length, 1);
    eq(S.lastIndexOf('c')(['a', 'b', 'c', 'd', 'e']), S.Just(2));
  });

});
