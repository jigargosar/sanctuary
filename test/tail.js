'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('tail', function() {

  utils.assertUnaryFunction(S.tail);

  it('type checks its arguments', function() {
    throws(function() { S.tail({length: -1}); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'tail :: List a -> Maybe (List a)\n' +
                   '        ^^^^^^\n' +
                   '          1\n' +
                   '\n' +
                   '1)  {"length": -1} :: Object, StrMap Number, StrMap FiniteNumber, StrMap NonZeroFiniteNumber, StrMap Integer, StrMap ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘List a’.\n'));
  });

  it('returns Nothing if applied to empty list', function() {
    eq(S.tail([]), S.Nothing);
  });

  it('returns Just the tail of a nonempty list', function() {
    eq(S.tail(['foo', 'bar', 'baz']), S.Just(['bar', 'baz']));
  });

});
