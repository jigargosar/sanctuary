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
var equals      = FantasyLand.equals;
var extend      = FantasyLand.extend;
var map         = FantasyLand.map;
var of          = FantasyLand.of;
var reduce      = FantasyLand.reduce;
var traverse    = FantasyLand.traverse;

var eq          = utils.eq;
var errorEq     = utils.errorEq;
var forall      = utils.forall;


//  EitherArb :: (Arbitrary a, Arbitrary b) -> Arbitrary (Either a b)
var EitherArb = function(lArb, rArb) {
  var f = function(either) { return either.value; };
  return jsc.oneof(lArb.smap(S.Left, f, Z.toString),
                   rArb.smap(S.Right, f, Z.toString));
};


describe('Either', function() {

  it('throws if called', function() {
    throws(function() { S.Either(); },
           errorEq(Error, 'Cannot instantiate Either'));
  });

  it('has a unary data constructor named Left', function() {
    eq(typeof S.Left, 'function');
    eq(S.Left.length, 1);
    eq(S.Left(42)['@@type'], 'sanctuary/Either');
    eq(S.Left(42).isLeft, true);
    eq(S.Left(42).isRight, false);
  });

  it('has a unary data constructor named Right', function() {
    eq(typeof S.Right, 'function');
    eq(S.Right.length, 1);
    eq(S.Right(42)['@@type'], 'sanctuary/Either');
    eq(S.Right(42).isLeft, false);
    eq(S.Right(42).isRight, true);
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Left('abc').toBoolean.length, 0);
    eq(S.Left('abc').toBoolean(), false);

    eq(S.Right(42).toBoolean.length, 0);
    eq(S.Right(42).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Left('abc').toString.length, 0);
    eq(S.Left('abc').toString(), 'Left("abc")');

    eq(S.Right([1, 2, 3]).toString.length, 0);
    eq(S.Right([1, 2, 3]).toString(), 'Right([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Left('abc').inspect.length, 0);
    eq(S.Left('abc').inspect(), 'Left("abc")');

    eq(S.Right([1, 2, 3]).inspect.length, 0);
    eq(S.Right([1, 2, 3]).inspect(), 'Right([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Left('abc').inspect.length, 0);
    eq(S.Left('abc').inspect(), 'Left("abc")');

    eq(S.Right([1, 2, 3]).inspect.length, 0);
    eq(S.Right([1, 2, 3]).inspect(), 'Right([1, 2, 3])');
  });

  utils.testFantasyLandMethods([S.Left(null), S.Right(null)], {

    equals: function(equals) {
      eq(S.Left(42)[equals].length, 1);
      eq(S.Left(42)[equals](S.Left(42)), true);
      eq(S.Left(42)[equals](S.Left('42')), false);
      eq(S.Left(42)[equals](S.Right(42)), false);

      eq(S.Right(42)[equals].length, 1);
      eq(S.Right(42)[equals](S.Right(42)), true);
      eq(S.Right(42)[equals](S.Right('42')), false);
      eq(S.Right(42)[equals](S.Left(42)), false);

      // Value-based equality:
      eq(S.Left(0)[equals](S.Left(-0)), false);
      eq(S.Left(-0)[equals](S.Left(0)), false);
      eq(S.Left(NaN)[equals](S.Left(NaN)), true);
      eq(S.Left([1, 2, 3])[equals](S.Left([1, 2, 3])), true);
      eq(S.Left(new Number(42))[equals](S.Left(new Number(42))), true);

      eq(S.Right(0)[equals](S.Right(-0)), false);
      eq(S.Right(-0)[equals](S.Right(0)), false);
      eq(S.Right(NaN)[equals](S.Right(NaN)), true);
      eq(S.Right([1, 2, 3])[equals](S.Right([1, 2, 3])), true);
      eq(S.Right(new Number(42))[equals](S.Right(new Number(42))), true);
    },

    concat: function(concat) {
      eq(S.Left('abc')[concat].length, 1);
      eq(S.Left('abc')[concat](S.Left('def')), S.Left('abcdef'));
      eq(S.Left('abc')[concat](S.Right('xyz')), S.Right('xyz'));

      eq(S.Right('abc')[concat].length, 1);
      eq(S.Right('abc')[concat](S.Left('xyz')), S.Right('abc'));
      eq(S.Right('abc')[concat](S.Right('def')), S.Right('abcdef'));
    },

    map: function(map) {
      eq(S.Left('abc')[map].length, 1);
      eq(S.Left('abc')[map](Math.sqrt), S.Left('abc'));

      eq(S.Right(9)[map].length, 1);
      eq(S.Right(9)[map](Math.sqrt), S.Right(3));
    },

    ap: function(ap) {
      eq(S.Left('abc')[ap].length, 1);
      eq(S.Left('abc')[ap](S.Left('xyz')), S.Left('xyz'));
      eq(S.Left('abc')[ap](S.Right(S.inc)), S.Left('abc'));

      eq(S.Right(42)[ap].length, 1);
      eq(S.Right(42)[ap](S.Left('abc')), S.Left('abc'));
      eq(S.Right(42)[ap](S.Right(S.inc)), S.Right(43));
    },

    of: function(of) {
      eq(S.Left('abc')[of].length, 1);
      eq(S.Left('abc')[of](42), S.Right(42));

      eq(S.Right(42)[of].length, 1);
      eq(S.Right(42)[of](99), S.Right(99));
    },

    chain: function(chain) {
      eq(S.Left('abc')[chain].length, 1);
      eq(S.Left('abc')[chain](function(x) { return x < 0 ? S.Left('!') : S.Right(Math.sqrt(x)); }), S.Left('abc'));

      eq(S.Right(25)[chain].length, 1);
      eq(S.Right(25)[chain](function(x) { return x < 0 ? S.Left('!') : S.Right(Math.sqrt(x)); }), S.Right(5));
    },

    reduce: function(reduce) {
      eq(S.Left('abc')[reduce].length, 2);
      eq(S.Left('abc')[reduce](function(xs, x) { return xs.concat([x]); }, [42]), [42]);

      eq(S.Right(5)[reduce].length, 2);
      eq(S.Right(5)[reduce](function(xs, x) { return xs.concat([x]); }, [42]), [42, 5]);
    },

    traverse: function(traverse) {
      eq(S.Left('abc')[traverse].length, 2);
      eq(S.Left('abc')[traverse](S.parseInt(16), S.Just), S.Just(S.Left('abc')));

      eq(S.Right('F')[traverse].length, 2);
      eq(S.Right('F')[traverse](S.parseInt(16), S.Just), S.Just(S.Right(15)));
      eq(S.Right('G')[traverse](S.parseInt(16), S.Just), S.Nothing);
    },

    extend: function(extend) {
      eq(S.Left('abc')[extend].length, 1);
      eq(S.Left('abc')[extend](function(x) { return x.value / 2; }), S.Left('abc'));

      eq(S.Right(42)[extend].length, 1);
      eq(S.Right(42)[extend](function(x) { return x.value / 2; }), S.Right(21));
    }

  });

  describe('Setoid', function() {

    it('satisfies reflexivity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             function(a) {
               return a[equals](a) === true;
             });
    });

    it('satisfies symmetry', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             EitherArb(jsc.string, jsc.integer),
             function(a, b) {
               return a[equals](b) === b[equals](a);
             });
    });

    it('satisfies transitivity', function() {
      forall(EitherArb(jsc.string, jsc.integer(1)),
             EitherArb(jsc.string, jsc.integer(1)),
             EitherArb(jsc.string, jsc.integer(1)),
             function(a, b, c) {
               return !a[equals](b) || !b[equals](c) || a[equals](c);
             });
    });

  });

  describe('Semigroup', function() {

    it('satisfies associativity', function() {
      forall(EitherArb(jsc.string, jsc.string),
             EitherArb(jsc.string, jsc.string),
             EitherArb(jsc.string, jsc.string),
             function(a, b, c) {
               var lhs = a[concat](b)[concat](c);
               var rhs = a[concat](b[concat](c));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Functor', function() {

    it('satisfies identity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             function(u) {
               var lhs = u[map](S.I);
               var rhs = u;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var f = function(x) { return x + 1; };
      var g = function(x) { return x * 2; };
      forall(EitherArb(jsc.string, jsc.integer),
             function(u) {
               var lhs = u[map](S.compose(f)(g));
               var rhs = u[map](g)[map](f);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Apply', function() {

    it('satisfies composition', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             EitherArb(jsc.string, jsc.constant(function(x) { return x + 1; })),
             EitherArb(jsc.string, jsc.constant(function(x) { return x * 2; })),
             function(a, ef, eg) {
               var lhs = a[ap](eg[ap](ef[map](S.compose)));
               var rhs = a[ap](eg)[ap](ef);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Applicative', function() {

    it('satisfies identity', function() {
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             EitherArb(jsc.string, jsc.integer),
             function(a, v) {
               var lhs = v[ap](a[of](S.I));
               var rhs = v;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies homomorphism', function() {
      var f = function(x) { return x + 1; };
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             jsc.integer,
             function(a, x) {
               var lhs = a[of](x)[ap](a[of](f));
               var rhs = a[of](f(x));
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies interchange', function() {
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             EitherArb(jsc.string, jsc.constant(function(x) { return x + 1; })),
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
      var f = function(x) { return x < 0 ? S.Left('Cannot represent square root of negative number') : S.Right(Math.sqrt(x)); };
      var g = function(x) { return S.Right(Math.abs(x)); };
      forall(EitherArb(jsc.string, jsc.integer),
             function(m) {
               var lhs = m[chain](f)[chain](g);
               var rhs = m[chain](function(x) { return f(x)[chain](g); });
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monad', function() {

    it('satisfies left identity', function() {
      var f = function(x) { return x < 0 ? S.Left('Cannot represent square root of negative number') : S.Right(Math.sqrt(x)); };
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             jsc.integer,
             function(m, x) {
               var lhs = m[of](x)[chain](f);
               var rhs = f(x);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
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
      forall(EitherArb(jsc.string, jsc.integer),
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
      var G = S.Either;
      var t = function(identity) { return S.Right(identity.value); };
      forall(EitherArb(jsc.integer, Identity.Arb(jsc.string)),
             function(u) {
               var lhs = t(u[traverse](S.I, F[of]));
               var rhs = u[traverse](t, G[of]);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies identity', function() {
      var Array$of = function(x) { return [x]; };
      forall(EitherArb(jsc.string, jsc.integer),
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
      forall(EitherArb(jsc.string, Identity.Arb(EitherArb(jsc.string, jsc.integer))),
             function(u) {
               var lhs = u[traverse](C, C[of]);
               var rhs = C(u[traverse](S.I, F[of])[map](function(x) { return x[traverse](S.I, G[of]); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Extend', function() {

    it('satisfies associativity', function() {
      var f = function(either) { return (either.isRight ? either.value : 0) + 1; };
      var g = function(either) { return (either.isRight ? either.value : 0) * 2; };
      forall(EitherArb(jsc.string, jsc.integer),
             function(w) {
               var lhs = w[extend](g)[extend](f);
               var rhs = w[extend](function(_w) { return f(_w[extend](g)); });
               return Z.equals(lhs, rhs);
             });
    });

  });

});
