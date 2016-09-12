'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;


describe('C', function() {

  utils.assertTernaryFunction(S.C);

  it('C(f, x, y) is equivalent to f(y)(x)', function() {
    eq(S.C(S.concat, 'foo', 'bar'), 'barfoo');
    eq(S.map(S.C(S.concat, '!'), ['BAM', 'POW', 'KA-POW']), ['BAM!', 'POW!', 'KA-POW!']);
  });

  it('is curried', function() {
    eq(S.C(S.concat).length, 2);
    eq(S.C(S.concat)('foo').length, 1);
    eq(S.C(S.concat)('foo')('bar'), 'barfoo');
  });

});
