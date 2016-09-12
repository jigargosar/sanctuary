'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('anyPass', function() {

  utils.assertBinaryFunction(S.anyPass);

  it('type checks its arguments', function() {
    throws(function() { S.anyPass('wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'anyPass :: Array Function -> a -> Boolean\n' +
                   '           ^^^^^^^^^^^^^^\n' +
                   '                 1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array Function’.\n'));
  });

  it('returns false when given an empty array of predicates', function() {
    eq(S.anyPass([], 'quiessence'), false);
  });

  it('returns true when all predicates pass', function() {
    eq(S.anyPass([S.test(/q/),
                   S.test(/u/),
                   S.test(/i/),
                   S.test(/c/)],
                 'quiessence'),
       true);
  });

  it('returns true when some predicates pass', function() {
    eq(S.anyPass([S.test(/q/),
                   S.test(/u/),
                   S.test(/i/),
                   S.test(/c/)],
                 'quintessential'),
       true);

    eq(S.anyPass([S.test(/q/),
                   S.test(/u/),
                   S.test(/i/),
                   S.test(/c/)],
                 'incandescent'),
       true);

    eq(S.anyPass([S.test(/q/),
                   S.test(/u/),
                   S.test(/i/),
                   S.test(/c/)],
                 'fissiparous'),
       true);
  });

  it('returns false when all predicates fail', function() {
    eq(S.anyPass([S.test(/q/),
                   S.test(/u/),
                   S.test(/i/),
                   S.test(/c/)],
                 'empathy'),
       false);
  });

  it('it short-circuits when one predicate passes', function() {
    var evaluated = false;
    var evaluate = function() { evaluated = true; };

    eq(S.anyPass([S.test(/q/),
                   evaluate,
                   S.test(/i/),
                   S.test(/c/)],
                 'quiessence'),
       true);
    eq(evaluated, false);
  });

  it('is curried', function() {
    eq(S.anyPass([S.test(/q/)]).length, 1);
    eq(S.anyPass([S.test(/q/)])('quiessence'), true);
  });

});
