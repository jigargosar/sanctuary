'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('S', function() {

  utils.assertTernaryFunction(S.S);

  it('S(f, g, x) is equivalent to f(x)(g(x))', function() {
    eq(S.S(S.add, Math.sqrt, 100), 110);
  });

  it('is curried', function() {
    eq(S.S(S.add).length, 2);
    eq(S.S(S.add)(Math.sqrt).length, 1);
    eq(S.S(S.add)(Math.sqrt)(100), 110);
  });

});
