'use strict';

var S           = require('..');

var utils       = require('./utils');


var area        = utils.area;
var eq          = utils.eq;


describe('encaseEither3_', function() {

  it('returns a Right on success', function() {
    eq(S.encaseEither3_(S.I, function(x, y, z) { return area(x)(y)(z); }, 3, 4, 5), S.Right(6));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither3_(S.I, function(x, y, z) { return area(x)(y)(z); }, 2, 2, 5),
       S.Left(new Error('Impossible triangle')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither3_(S.prop('message'), function(x, y, z) { return area(x)(y)(z); }, 2, 2, 5),
       S.Left('Impossible triangle'));
  });

});
