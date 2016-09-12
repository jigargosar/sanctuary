'use strict';

var S           = require('..');

var utils       = require('./utils');


var eq          = utils.eq;
var rem         = utils.rem;


describe('encase2_', function() {

  it('returns a Just on success', function() {
    eq(S.encase2_(function(x, y) { return rem(x)(y); }, 42, 5), S.Just(2));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase2_(function(x, y) { return rem(x)(y); }, 42, 0), S.Nothing);
  });

});
