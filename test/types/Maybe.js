'use strict';

var assert      = require('assert');

var FantasyLand = require('fantasy-land');
var jsc         = require('jsverify');
var Z           = require('sanctuary-type-classes');

var S           = require('../..');

var utils       = require('../utils');
var Compose     = require('./Compose');
var Identity    = require('./Identity');


var throws      = assert.throws;

var ap          = FantasyLand.ap;
var chain       = FantasyLand.chain;
var concat      = FantasyLand.concat;
var empty       = FantasyLand.empty;
var equals      = FantasyLand.equals;
var extend      = FantasyLand.extend;
var map         = FantasyLand.map;
var of          = FantasyLand.of;
var reduce      = FantasyLand.reduce;
var traverse    = FantasyLand.traverse;

var eq          = utils.eq;
var errorEq     = utils.errorEq;
var forall      = utils.forall;


//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
var MaybeArb = function(arb) {
  var f = function(maybe) { return maybe.value; };
  return jsc.oneof(arb.smap(S.Just, f, Z.toString),
                   jsc.constant(S.Nothing));
};


describe('Maybe', function() {

  it('throws if called', function() {
    throws(function() { S.Maybe(); },
           errorEq(Error, 'Cannot instantiate Maybe'));
  });

  it('has a "nullary" data constructor named Nothing', function() {
    eq(S.Nothing['@@type'], 'sanctuary/Maybe');
    eq(S.Nothing.isNothing, true);
    eq(S.Nothing.isJust, false);
  });

  it('has a unary data constructor named Just', function() {
    eq(typeof S.Just, 'function');
    eq(S.Just.length, 1);
    eq(S.Just(9)['@@type'], 'sanctuary/Maybe');
    eq(S.Just(9).isNothing, false);
    eq(S.Just(9).isJust, true);
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Nothing.toBoolean.length, 0);
    eq(S.Nothing.toBoolean(), false);

    eq(S.Just(9).toBoolean.length, 0);
    eq(S.Just(9).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Nothing.toString.length, 0);
    eq(S.Nothing.toString(), 'Nothing');

    eq(S.Just([1, 2, 3]).toString.length, 0);
    eq(S.Just([1, 2, 3]).toString(), 'Just([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Nothing.inspect.length, 0);
    eq(S.Nothing.inspect(), 'Nothing');

    eq(S.Just([1, 2, 3]).inspect.length, 0);
    eq(S.Just([1, 2, 3]).inspect(), 'Just([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Nothing.inspect.length, 0);
    eq(S.Nothing.inspect(), 'Nothing');

    eq(S.Just([1, 2, 3]).inspect.length, 0);
    eq(S.Just([1, 2, 3]).inspect(), 'Just([1, 2, 3])');
  });

  utils.testFantasyLandMethods([S.Nothing, S.Just(null)], {

    equals: function(equals) {
      eq(S.Nothing[equals](S.Nothing), true);
      eq(S.Nothing[equals](S.Just(9)), false);

      eq(S.Just(9)[equals](S.Just(9)), true);
      eq(S.Just(9)[equals](S.Just(0)), false);
      eq(S.Just(9)[equals](S.Nothing), false);

      // Value-based equality:
      eq(S.Just(0)[equals](S.Just(-0)), false);
      eq(S.Just(-0)[equals](S.Just(0)), false);
      eq(S.Just(NaN)[equals](S.Just(NaN)), true);
      eq(S.Just([1, 2, 3])[equals](S.Just([1, 2, 3])), true);
      eq(S.Just(new Number(42))[equals](S.Just(new Number(42))), true);
    },

    concat: function(concat) {
      eq(S.Nothing[concat](S.Nothing), S.Nothing);
      eq(S.Nothing[concat](S.Just('foo')), S.Just('foo'));

      eq(S.Just('foo')[concat](S.Nothing), S.Just('foo'));
      eq(S.Just('foo')[concat](S.Just('bar')), S.Just('foobar'));
    },

    empty: function(empty) {
      eq(S.Nothing[empty](), S.Nothing);

      eq(S.Just(9)[empty](), S.Nothing);
    },

    map: function(map) {
      eq(S.Nothing[map](Math.sqrt), S.Nothing);

      eq(S.Just(9)[map](Math.sqrt), S.Just(3));
    },

    ap: function(ap) {
      eq(S.Nothing[ap](S.Nothing), S.Nothing);
      eq(S.Nothing[ap](S.Just(S.inc)), S.Nothing);

      eq(S.Just(42)[ap](S.Nothing), S.Nothing);
      eq(S.Just(42)[ap](S.Just(S.inc)), S.Just(43));
    },

    of: function(of) {
      eq(S.Nothing[of]('abc'), S.Just('abc'));

      eq(S.Just(9)[of]('xyz'), S.Just('xyz'));
    },

    chain: function(chain) {
      eq(S.Nothing[chain](S.head), S.Nothing);

      eq(S.Just([1, 2, 3])[chain](S.head), S.Just(1));
    },

    reduce: function(reduce) {
      var add = function(x, y) { return x + y; };

      eq(S.Nothing[reduce](add, 0), 0);

      eq(S.Just(9)[reduce](add, 0), 9);
    },

    traverse: function(traverse) {
      var Array$of = function(x) { return [x]; };
      var duplicate = function(x) { return [x, x]; };

      eq(S.Nothing[traverse](duplicate, Array$of), [S.Nothing]);

      eq(S.Just(9)[traverse](duplicate, Array$of), [S.Just(9), S.Just(9)]);
    },

    extend: function(extend) {
      var sqrt = function(maybe) { return Math.sqrt(maybe.value); };

      eq(S.Nothing[extend](sqrt), S.Nothing);

      eq(S.Just(9)[extend](sqrt), S.Just(3));
    }

  });

  describe('Setoid', function() {

    it('satisfies reflexivity', function() {
      forall(MaybeArb(jsc.integer),
             function(a) {
               return a[equals](a) === true;
             });
    });

    it('satisfies symmetry', function() {
      forall(MaybeArb(jsc.integer),
             MaybeArb(jsc.integer),
             function(a, b) {
               return a[equals](b) === b[equals](a);
             });
    });

    it('satisfies transitivity', function() {
      forall(MaybeArb(jsc.integer(1)),
             MaybeArb(jsc.integer(1)),
             MaybeArb(jsc.integer(1)),
             function(a, b, c) {
               return !a[equals](b) || !b[equals](c) || a[equals](c);
             });
    });

  });

  describe('Semigroup', function() {

    it('satisfies associativity', function() {
      forall(MaybeArb(jsc.string),
             MaybeArb(jsc.string),
             MaybeArb(jsc.string),
             function(a, b, c) {
               var lhs = a[concat](b)[concat](c);
               var rhs = a[concat](b[concat](c));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monoid', function() {

    it('satisfies left identity', function() {
      forall(MaybeArb(jsc.string),
             function(m) {
               var lhs = m[empty]()[concat](m);
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(MaybeArb(jsc.string),
             function(m) {
               var lhs = m[concat](m[empty]());
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Functor', function() {

    it('satisfies identity', function() {
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[map](S.I);
               var rhs = u;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var f = function(x) { return x + 1; };
      var g = function(x) { return x * 2; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[map](S.compose(f, g));
               var rhs = u[map](g)[map](f);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Apply', function() {

    it('satisfies composition', function() {
      forall(MaybeArb(jsc.integer),
             MaybeArb(jsc.constant(function(x) { return x + 1; })),
             MaybeArb(jsc.constant(function(x) { return x * 2; })),
             function(a, mf, mg) {
               var lhs = a[ap](mg[ap](mf[map](S.compose)));
               var rhs = a[ap](mg)[ap](mf);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Applicative', function() {

    it('satisfies identity', function() {
      forall(MaybeArb(jsc.constant(null)),
             MaybeArb(jsc.integer),
             function(a, v) {
               var lhs = v[ap](a[of](S.I));
               var rhs = v;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies homomorphism', function() {
      var f = function(x) { return x + 1; };
      forall(MaybeArb(jsc.constant(null)),
             jsc.integer,
             function(a, x) {
               var lhs = a[of](x)[ap](a[of](f));
               var rhs = a[of](f(x));
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies interchange', function() {
      forall(MaybeArb(jsc.constant(null)),
             MaybeArb(jsc.constant(function(x) { return x + 1; })),
             jsc.integer,
             function(a, u, x) {
               var lhs = a[of](x)[ap](u);
               var rhs = u[ap](a[of](function(f) { return f(x); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Chain', function() {

    it('satisfies associativity', function() {
      var f = function(x) { return x < 0 ? S.Nothing : S.Just(Math.sqrt(x)); };
      var g = function(x) { return S.Just(Math.abs(x)); };
      forall(MaybeArb(jsc.integer),
             function(m) {
               var lhs = m[chain](f)[chain](g);
               var rhs = m[chain](function(x) { return f(x)[chain](g); });
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monad', function() {

    it('satisfies left identity', function() {
      var f = function(x) { return x < 0 ? S.Nothing : S.Just(Math.sqrt(x)); };
      forall(MaybeArb(jsc.constant(null)),
             jsc.integer,
             function(m, x) {
               var lhs = m[of](x)[chain](f);
               var rhs = f(x);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(MaybeArb(jsc.integer),
             function(m) {
               var lhs = m[chain](m[of]);
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Foldable', function() {

    it('satisfies ???', function() {
      var f = function(x, y) { return x + y; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[reduce](f, 0);
               var rhs = u[reduce](function(acc, x) { return acc.concat([x]); }, []).reduce(f, 0);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Traversable', function() {

    it('satisfies naturality', function() {
      var F = Identity;
      var G = S.Maybe;
      var t = function(identity) { return S.Just(identity.value); };
      forall(MaybeArb(Identity.Arb(jsc.integer, jsc.string)),
             function(u) {
               var lhs = t(u[traverse](S.I, F[of]));
               var rhs = u[traverse](t, G[of]);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies identity', function() {
      var Array$of = function(x) { return [x]; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[traverse](Array$of, Array$of);
               var rhs = Array$of(u);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var F = Identity;
      var G = S.Maybe;
      var C = Compose(F, G);
      forall(MaybeArb(Identity.Arb(MaybeArb(jsc.integer))),
             function(u) {
               var lhs = u[traverse](C, C[of]);
               var rhs = C(u[traverse](S.I, F[of])[map](function(x) { return x[traverse](S.I, G[of]); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Extend', function() {

    it('satisfies associativity', function() {
      var f = function(maybe) { return (maybe.isJust ? maybe.value : 0) + 1; };
      var g = function(maybe) { return (maybe.isJust ? maybe.value : 0) * 2; };
      forall(MaybeArb(jsc.integer),
             function(w) {
               var lhs = w[extend](g)[extend](f);
               var rhs = w[extend](function(_w) { return f(_w[extend](g)); });
               return Z.equals(lhs, rhs);
             });
    });

  });

});
