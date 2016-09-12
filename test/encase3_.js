'use strict';

var S           = require('..');

var utils       = require('./utils');


var area        = utils.area;
var eq          = utils.eq;


describe('encase3_', function() {

  it('returns a Just on success', function() {
    eq(S.encase3_(function(x, y, z) { return area(x)(y)(z); }, 3, 4, 5), S.Just(6));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase3_(function(x, y, z) { return area(x)(y)(z); }, 2, 2, 5), S.Nothing);
  });

});
