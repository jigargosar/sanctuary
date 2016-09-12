'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('A', function() {

  utils.assertBinaryFunction(S.A);

  it('A(f, x) is equivalent to f(x)', function() {
    eq(S.A(S.inc, 1), 2);
    eq(S.map(S.A(S.__, 100), [S.inc, Math.sqrt]), [101, 10]);
  });

  it('is curried', function() {
    eq(S.A(S.inc).length, 1);
    eq(S.A(S.inc)(1), 2);
  });

});
