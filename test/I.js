'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('I', function() {

  utils.assertUnaryFunction(S.I);

  it('returns its argument', function() {
    eq(S.I([1, 2, 3]), [1, 2, 3]);
    eq(S.I(['foo', 42]), ['foo', 42]);
  });

});
