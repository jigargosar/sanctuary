'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('parseDate', function() {

  utils.assertUnaryFunction(S.parseDate);

  it('type checks its arguments', function() {
    throws(function() { S.parseDate([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'parseDate :: String -> Maybe Date\n' +
                   '             ^^^^^^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns a Just when applied to a valid date string', function() {
    eq(S.parseDate('2001-02-03T04:05:06Z'),
       S.Just(new Date('2001-02-03T04:05:06Z')));
  });

  it('returns Nothing when applied to an invalid date string', function() {
    eq(S.parseDate('today'), S.Nothing);
  });

});
