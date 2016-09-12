'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('T', function() {

  utils.assertBinaryFunction(S.T);

  it('T(x, f) is equivalent to f(x)', function() {
    eq(S.T(42, S.inc), 43);
    eq(S.map(S.T(100), [S.inc, Math.sqrt]), [101, 10]);
  });

  it('is curried', function() {
    eq(S.T(42).length, 1);
    eq(S.T(42)(S.inc), 43);
  });

});
