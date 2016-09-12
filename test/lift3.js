'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var area        = utils.area;
var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('lift3', function() {

  utils.assertQuaternaryFunction(S.lift3);

  it('type checks its arguments', function() {
    throws(function() { S.lift3('wrong'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'lift3 :: (Apply a, Apply b, Apply c, Apply d) => Function -> a -> b -> c -> d\n' +
                   '                                                 ^^^^^^^^\n' +
                   '                                                    1\n' +
                   '\n' +
                   '1)  "wrong" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Function’.\n'));
  });

  it('lifts a function into the context of Applys', function() {
    eq(S.lift3(S.reduce, S.Just(S.add), S.Just(0), S.Just([1, 2, 3])), S.Just(6));
    eq(S.lift3(S.reduce, S.Just(S.add), S.Just(0), S.Nothing), S.Nothing);

    eq(S.lift3(S.reduce, S.Right(S.add), S.Right(0), S.Right([1, 2, 3])), S.Right(6));
    eq(S.lift3(S.reduce, S.Right(S.add), S.Right(0), S.Left('WHOOPS')), S.Left('WHOOPS'));

    eq(S.lift3(S.reduce, [S.add], [0], [[1, 2, 3]]), [6]);
    eq(S.lift3(S.reduce, [S.add], [0], []), []);

    eq(S.lift3(area, S.dec, S.I, S.inc)(4), 6);
  });

});
