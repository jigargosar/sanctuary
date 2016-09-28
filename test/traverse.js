'use strict';

var S           = require('..');

var utils       = require('./utils');
var Identity    = require('./types/Identity');


var eq          = utils.eq;


describe('traverse', function() {

  utils.assertTernaryFunction(S.traverse);

  it('TK', function() {
    eq(S.traverse(S.Just, S.parseInt(16), ['A', 'B', 'C']), S.Just([10, 11, 12]));
    eq(S.traverse(S.Just, S.parseInt(16), ['A', 'B', 'C', 'X']), S.Nothing);

    eq(S.traverse(Identity, S.I, []), Identity([]));
    eq(S.traverse(Identity, S.I, [Identity(1), Identity(2), Identity(3)]), Identity([1, 2, 3]));

    //  TODO: Replace with S.of once available.
    var TK = function(x) { return [x]; };
    eq(S.traverse(TK, S.I, Identity([])), []);
    eq(S.traverse(TK, S.I, Identity([1, 2, 3])), [Identity(1), Identity(2), Identity(3)]);
  });

});
