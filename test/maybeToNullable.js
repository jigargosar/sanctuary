'use strict';

var assert      = require('assert');

var S           = require('..');

var utils       = require('./utils');


var throws      = assert.throws;

var eq          = utils.eq;
var errorEq     = utils.errorEq;


describe('maybeToNullable', function() {

  utils.assertUnaryFunction(S.maybeToNullable);

  it('type checks its arguments', function() {
    throws(function() { S.maybeToNullable(/XXX/); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'maybeToNullable :: Maybe a -> Nullable a\n' +
                   '                   ^^^^^^^\n' +
                   '                      1\n' +
                   '\n' +
                   '1)  /XXX/ :: RegExp\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Maybe a’.\n'));
  });

  it('can be applied to Nothing', function() {
    eq(S.maybeToNullable(S.Nothing), null);
  });

  it('can be applied to a Just', function() {
    eq(S.maybeToNullable(S.Just(42)), 42);
  });

});
