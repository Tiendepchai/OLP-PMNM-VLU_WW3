!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(require("leaflet")))
    : "function" == typeof define && define.amd
    ? define(["leaflet"], t)
    : "object" == typeof exports
    ? (exports["LCDP-Map"] = t(require("leaflet")))
    : (e["LCDP-Map"] = t(e.L));
})(this, (e) =>
  (() => {
    "use strict";
    var t = {
        167: (t) => {
          t.exports = e;
        },
      },
      r = {};
    function o(e) {
      var n = r[e];
      if (void 0 !== n) return n.exports;
      var i = (r[e] = { exports: {} });
      return t[e](i, i.exports, o), i.exports;
    }
    (o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    }),
      (o.d = (e, t) => {
        for (var r in t)
          o.o(t, r) &&
            !o.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      }),
      (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
    var n = {};
    o.d(n, { default: () => l });
    var i = o(167),
      a = o.n(i);
    function u(e) {
      return (
        (u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        u(e)
      );
    }
    function f(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(e, p(o.key), o);
      }
    }
    function p(e) {
      var t = (function (e) {
        if ("object" != u(e) || !e) return e;
        var t = e[Symbol.toPrimitive];
        if (void 0 !== t) {
          var r = t.call(e, "string");
          if ("object" != u(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" == u(t) ? t : t + "";
    }
    const l = (function () {
      return (
        (e = function e(t) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.map = null),
            (this.markers = []),
            this.init(t, r);
        }),
        (t = [
          {
            key: "init",
            value: function (e, t) {
              (this.map = a().map(e, t)),
                a()
                  .tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    { attribution: "© OpenStreetMap DTU DZ" }
                  )
                  .addTo(this.map);
            },
          },
          {
            key: "addMarker",
            value: function (e, t) {
              var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                o = a().marker([e, t], r);
              return o.addTo(this.map), this.markers.push(o), o;
            },
          },
        ]),
        t && f(e.prototype, t),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      );
      var e, t;
    })();
    return n.default;
  })()
);