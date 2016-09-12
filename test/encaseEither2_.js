'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;
var rem         = utils.rem;


describe('encaseEither2_', function() {

  it('returns a Right on success', function() {
    eq(S.encaseEither2_(S.I, function(x, y) { return rem(x)(y); }, 42, 5), S.Right(2));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither2_(S.I, function(x, y) { return rem(x)(y); }, 42, 0),
       S.Left(new Error('Cannot divide by zero')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither2_(S.prop('message'), function(x, y) { return rem(x)(y); }, 42, 0),
       S.Left('Cannot divide by zero'));
  });

});
