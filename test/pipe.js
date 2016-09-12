'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('pipe', function() {

  utils.assertBinaryFunction(S.pipe);

  it('composes a list of functions assumed to be unary', function() {
    eq(S.pipe([], '99'), '99');
    eq(S.pipe([parseInt], '99'), 99);
    eq(S.pipe([parseInt, S.inc], '99'), 100);
    eq(S.pipe([parseInt, S.inc, Math.sqrt], '99'), 10);
    eq(S.pipe([parseInt, S.inc, Math.sqrt, S.dec], '99'), 9);
  });

  it('is curried', function() {
    eq(S.pipe([parseInt, S.inc, Math.sqrt, S.dec]).length, 1);
    eq(S.pipe([parseInt, S.inc, Math.sqrt, S.dec])('99'), 9);
  });

});
