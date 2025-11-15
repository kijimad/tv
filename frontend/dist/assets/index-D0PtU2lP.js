function gw(e, n) {
  for (var i = 0; i < n.length; i++) {
    const r = n[i];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in e)) {
          const c = Object.getOwnPropertyDescriptor(r, s);
          c &&
            Object.defineProperty(
              e,
              s,
              c.get ? c : { enumerable: !0, get: () => r[s] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const c of s)
      if (c.type === "childList")
        for (const d of c.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(s) {
    const c = {};
    return (
      s.integrity && (c.integrity = s.integrity),
      s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const c = i(s);
    fetch(s.href, c);
  }
})();
function kx(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var wf = { exports: {} },
  No = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hb;
function hw() {
  if (hb) return No;
  hb = 1;
  var e = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.fragment");
  function i(r, s, c) {
    var d = null;
    if (
      (c !== void 0 && (d = "" + c),
      s.key !== void 0 && (d = "" + s.key),
      "key" in s)
    ) {
      c = {};
      for (var g in s) g !== "key" && (c[g] = s[g]);
    } else c = s;
    return (
      (s = c.ref),
      { $$typeof: e, type: r, key: d, ref: s !== void 0 ? s : null, props: c }
    );
  }
  return (No.Fragment = n), (No.jsx = i), (No.jsxs = i), No;
}
var mb;
function mw() {
  return mb || ((mb = 1), (wf.exports = hw())), wf.exports;
}
var V = mw(),
  kf = { exports: {} },
  be = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pb;
function pw() {
  if (pb) return be;
  pb = 1;
  var e = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    g = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    p = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function b(w) {
    return w === null || typeof w != "object"
      ? null
      : ((w = (y && w[y]) || w["@@iterator"]),
        typeof w == "function" ? w : null);
  }
  var x = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C = Object.assign,
    E = {};
  function R(w, G, te) {
    (this.props = w),
      (this.context = G),
      (this.refs = E),
      (this.updater = te || x);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (w, G) {
      if (typeof w != "object" && typeof w != "function" && w != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, w, G, "setState");
    }),
    (R.prototype.forceUpdate = function (w) {
      this.updater.enqueueForceUpdate(this, w, "forceUpdate");
    });
  function O() {}
  O.prototype = R.prototype;
  function A(w, G, te) {
    (this.props = w),
      (this.context = G),
      (this.refs = E),
      (this.updater = te || x);
  }
  var z = (A.prototype = new O());
  (z.constructor = A), C(z, R.prototype), (z.isPureReactComponent = !0);
  var B = Array.isArray,
    _ = { H: null, A: null, T: null, S: null, V: null },
    Y = Object.prototype.hasOwnProperty;
  function $(w, G, te, ae, le, xe) {
    return (
      (te = xe.ref),
      {
        $$typeof: e,
        type: w,
        key: G,
        ref: te !== void 0 ? te : null,
        props: xe,
      }
    );
  }
  function j(w, G) {
    return $(w.type, G, void 0, void 0, void 0, w.props);
  }
  function U(w) {
    return typeof w == "object" && w !== null && w.$$typeof === e;
  }
  function K(w) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      w.replace(/[=:]/g, function (te) {
        return G[te];
      })
    );
  }
  var re = /\/+/g;
  function ne(w, G) {
    return typeof w == "object" && w !== null && w.key != null
      ? K("" + w.key)
      : G.toString(36);
  }
  function pe() {}
  function he(w) {
    switch (w.status) {
      case "fulfilled":
        return w.value;
      case "rejected":
        throw w.reason;
      default:
        switch (
          (typeof w.status == "string"
            ? w.then(pe, pe)
            : ((w.status = "pending"),
              w.then(
                function (G) {
                  w.status === "pending" &&
                    ((w.status = "fulfilled"), (w.value = G));
                },
                function (G) {
                  w.status === "pending" &&
                    ((w.status = "rejected"), (w.reason = G));
                },
              )),
          w.status)
        ) {
          case "fulfilled":
            return w.value;
          case "rejected":
            throw w.reason;
        }
    }
    throw w;
  }
  function J(w, G, te, ae, le) {
    var xe = typeof w;
    (xe === "undefined" || xe === "boolean") && (w = null);
    var fe = !1;
    if (w === null) fe = !0;
    else
      switch (xe) {
        case "bigint":
        case "string":
        case "number":
          fe = !0;
          break;
        case "object":
          switch (w.$$typeof) {
            case e:
            case n:
              fe = !0;
              break;
            case p:
              return (fe = w._init), J(fe(w._payload), G, te, ae, le);
          }
      }
    if (fe)
      return (
        (le = le(w)),
        (fe = ae === "" ? "." + ne(w, 0) : ae),
        B(le)
          ? ((te = ""),
            fe != null && (te = fe.replace(re, "$&/") + "/"),
            J(le, G, te, "", function (ee) {
              return ee;
            }))
          : le != null &&
            (U(le) &&
              (le = j(
                le,
                te +
                  (le.key == null || (w && w.key === le.key)
                    ? ""
                    : ("" + le.key).replace(re, "$&/") + "/") +
                  fe,
              )),
            G.push(le)),
        1
      );
    fe = 0;
    var At = ae === "" ? "." : ae + ":";
    if (B(w))
      for (var Z = 0; Z < w.length; Z++)
        (ae = w[Z]), (xe = At + ne(ae, Z)), (fe += J(ae, G, te, xe, le));
    else if (((Z = b(w)), typeof Z == "function"))
      for (w = Z.call(w), Z = 0; !(ae = w.next()).done; )
        (ae = ae.value), (xe = At + ne(ae, Z++)), (fe += J(ae, G, te, xe, le));
    else if (xe === "object") {
      if (typeof w.then == "function") return J(he(w), G, te, ae, le);
      throw (
        ((G = String(w)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(w).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    }
    return fe;
  }
  function I(w, G, te) {
    if (w == null) return w;
    var ae = [],
      le = 0;
    return (
      J(w, ae, "", "", function (xe) {
        return G.call(te, xe, le++);
      }),
      ae
    );
  }
  function F(w) {
    if (w._status === -1) {
      var G = w._result;
      (G = G()),
        G.then(
          function (te) {
            (w._status === 0 || w._status === -1) &&
              ((w._status = 1), (w._result = te));
          },
          function (te) {
            (w._status === 0 || w._status === -1) &&
              ((w._status = 2), (w._result = te));
          },
        ),
        w._status === -1 && ((w._status = 0), (w._result = G));
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var W =
    typeof reportError == "function"
      ? reportError
      : function (w) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var G = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof w == "object" &&
                w !== null &&
                typeof w.message == "string"
                  ? String(w.message)
                  : String(w),
              error: w,
            });
            if (!window.dispatchEvent(G)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", w);
            return;
          }
          console.error(w);
        };
  function ie() {}
  return (
    (be.Children = {
      map: I,
      forEach: function (w, G, te) {
        I(
          w,
          function () {
            G.apply(this, arguments);
          },
          te,
        );
      },
      count: function (w) {
        var G = 0;
        return (
          I(w, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (w) {
        return (
          I(w, function (G) {
            return G;
          }) || []
        );
      },
      only: function (w) {
        if (!U(w))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return w;
      },
    }),
    (be.Component = R),
    (be.Fragment = i),
    (be.Profiler = s),
    (be.PureComponent = A),
    (be.StrictMode = r),
    (be.Suspense = h),
    (be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _),
    (be.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (w) {
        return _.H.useMemoCache(w);
      },
    }),
    (be.cache = function (w) {
      return function () {
        return w.apply(null, arguments);
      };
    }),
    (be.cloneElement = function (w, G, te) {
      if (w == null)
        throw Error(
          "The argument must be a React element, but you passed " + w + ".",
        );
      var ae = C({}, w.props),
        le = w.key,
        xe = void 0;
      if (G != null)
        for (fe in (G.ref !== void 0 && (xe = void 0),
        G.key !== void 0 && (le = "" + G.key),
        G))
          !Y.call(G, fe) ||
            fe === "key" ||
            fe === "__self" ||
            fe === "__source" ||
            (fe === "ref" && G.ref === void 0) ||
            (ae[fe] = G[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) ae.children = te;
      else if (1 < fe) {
        for (var At = Array(fe), Z = 0; Z < fe; Z++) At[Z] = arguments[Z + 2];
        ae.children = At;
      }
      return $(w.type, le, void 0, void 0, xe, ae);
    }),
    (be.createContext = function (w) {
      return (
        (w = {
          $$typeof: d,
          _currentValue: w,
          _currentValue2: w,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (w.Provider = w),
        (w.Consumer = { $$typeof: c, _context: w }),
        w
      );
    }),
    (be.createElement = function (w, G, te) {
      var ae,
        le = {},
        xe = null;
      if (G != null)
        for (ae in (G.key !== void 0 && (xe = "" + G.key), G))
          Y.call(G, ae) &&
            ae !== "key" &&
            ae !== "__self" &&
            ae !== "__source" &&
            (le[ae] = G[ae]);
      var fe = arguments.length - 2;
      if (fe === 1) le.children = te;
      else if (1 < fe) {
        for (var At = Array(fe), Z = 0; Z < fe; Z++) At[Z] = arguments[Z + 2];
        le.children = At;
      }
      if (w && w.defaultProps)
        for (ae in ((fe = w.defaultProps), fe))
          le[ae] === void 0 && (le[ae] = fe[ae]);
      return $(w, xe, void 0, void 0, null, le);
    }),
    (be.createRef = function () {
      return { current: null };
    }),
    (be.forwardRef = function (w) {
      return { $$typeof: g, render: w };
    }),
    (be.isValidElement = U),
    (be.lazy = function (w) {
      return { $$typeof: p, _payload: { _status: -1, _result: w }, _init: F };
    }),
    (be.memo = function (w, G) {
      return { $$typeof: m, type: w, compare: G === void 0 ? null : G };
    }),
    (be.startTransition = function (w) {
      var G = _.T,
        te = {};
      _.T = te;
      try {
        var ae = w(),
          le = _.S;
        le !== null && le(te, ae),
          typeof ae == "object" &&
            ae !== null &&
            typeof ae.then == "function" &&
            ae.then(ie, W);
      } catch (xe) {
        W(xe);
      } finally {
        _.T = G;
      }
    }),
    (be.unstable_useCacheRefresh = function () {
      return _.H.useCacheRefresh();
    }),
    (be.use = function (w) {
      return _.H.use(w);
    }),
    (be.useActionState = function (w, G, te) {
      return _.H.useActionState(w, G, te);
    }),
    (be.useCallback = function (w, G) {
      return _.H.useCallback(w, G);
    }),
    (be.useContext = function (w) {
      return _.H.useContext(w);
    }),
    (be.useDebugValue = function () {}),
    (be.useDeferredValue = function (w, G) {
      return _.H.useDeferredValue(w, G);
    }),
    (be.useEffect = function (w, G, te) {
      var ae = _.H;
      if (typeof te == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return ae.useEffect(w, G);
    }),
    (be.useId = function () {
      return _.H.useId();
    }),
    (be.useImperativeHandle = function (w, G, te) {
      return _.H.useImperativeHandle(w, G, te);
    }),
    (be.useInsertionEffect = function (w, G) {
      return _.H.useInsertionEffect(w, G);
    }),
    (be.useLayoutEffect = function (w, G) {
      return _.H.useLayoutEffect(w, G);
    }),
    (be.useMemo = function (w, G) {
      return _.H.useMemo(w, G);
    }),
    (be.useOptimistic = function (w, G) {
      return _.H.useOptimistic(w, G);
    }),
    (be.useReducer = function (w, G, te) {
      return _.H.useReducer(w, G, te);
    }),
    (be.useRef = function (w) {
      return _.H.useRef(w);
    }),
    (be.useState = function (w) {
      return _.H.useState(w);
    }),
    (be.useSyncExternalStore = function (w, G, te) {
      return _.H.useSyncExternalStore(w, G, te);
    }),
    (be.useTransition = function () {
      return _.H.useTransition();
    }),
    (be.version = "19.1.0"),
    be
  );
}
var vb;
function kg() {
  return vb || ((vb = 1), (kf.exports = pw())), kf.exports;
}
var k = kg();
const ja = kx(k),
  bb = gw({ __proto__: null, default: ja }, [k]);
var Rf = { exports: {} },
  Io = {},
  Tf = { exports: {} },
  Af = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yb;
function vw() {
  return (
    yb ||
      ((yb = 1),
      (function (e) {
        function n(I, F) {
          var W = I.length;
          I.push(F);
          e: for (; 0 < W; ) {
            var ie = (W - 1) >>> 1,
              w = I[ie];
            if (0 < s(w, F)) (I[ie] = F), (I[W] = w), (W = ie);
            else break e;
          }
        }
        function i(I) {
          return I.length === 0 ? null : I[0];
        }
        function r(I) {
          if (I.length === 0) return null;
          var F = I[0],
            W = I.pop();
          if (W !== F) {
            I[0] = W;
            e: for (var ie = 0, w = I.length, G = w >>> 1; ie < G; ) {
              var te = 2 * (ie + 1) - 1,
                ae = I[te],
                le = te + 1,
                xe = I[le];
              if (0 > s(ae, W))
                le < w && 0 > s(xe, ae)
                  ? ((I[ie] = xe), (I[le] = W), (ie = le))
                  : ((I[ie] = ae), (I[te] = W), (ie = te));
              else if (le < w && 0 > s(xe, W))
                (I[ie] = xe), (I[le] = W), (ie = le);
              else break e;
            }
          }
          return F;
        }
        function s(I, F) {
          var W = I.sortIndex - F.sortIndex;
          return W !== 0 ? W : I.id - F.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var c = performance;
          e.unstable_now = function () {
            return c.now();
          };
        } else {
          var d = Date,
            g = d.now();
          e.unstable_now = function () {
            return d.now() - g;
          };
        }
        var h = [],
          m = [],
          p = 1,
          y = null,
          b = 3,
          x = !1,
          C = !1,
          E = !1,
          R = !1,
          O = typeof setTimeout == "function" ? setTimeout : null,
          A = typeof clearTimeout == "function" ? clearTimeout : null,
          z = typeof setImmediate < "u" ? setImmediate : null;
        function B(I) {
          for (var F = i(m); F !== null; ) {
            if (F.callback === null) r(m);
            else if (F.startTime <= I)
              r(m), (F.sortIndex = F.expirationTime), n(h, F);
            else break;
            F = i(m);
          }
        }
        function _(I) {
          if (((E = !1), B(I), !C))
            if (i(h) !== null) (C = !0), Y || ((Y = !0), ne());
            else {
              var F = i(m);
              F !== null && J(_, F.startTime - I);
            }
        }
        var Y = !1,
          $ = -1,
          j = 5,
          U = -1;
        function K() {
          return R ? !0 : !(e.unstable_now() - U < j);
        }
        function re() {
          if (((R = !1), Y)) {
            var I = e.unstable_now();
            U = I;
            var F = !0;
            try {
              e: {
                (C = !1), E && ((E = !1), A($), ($ = -1)), (x = !0);
                var W = b;
                try {
                  t: {
                    for (
                      B(I), y = i(h);
                      y !== null && !(y.expirationTime > I && K());

                    ) {
                      var ie = y.callback;
                      if (typeof ie == "function") {
                        (y.callback = null), (b = y.priorityLevel);
                        var w = ie(y.expirationTime <= I);
                        if (((I = e.unstable_now()), typeof w == "function")) {
                          (y.callback = w), B(I), (F = !0);
                          break t;
                        }
                        y === i(h) && r(h), B(I);
                      } else r(h);
                      y = i(h);
                    }
                    if (y !== null) F = !0;
                    else {
                      var G = i(m);
                      G !== null && J(_, G.startTime - I), (F = !1);
                    }
                  }
                  break e;
                } finally {
                  (y = null), (b = W), (x = !1);
                }
                F = void 0;
              }
            } finally {
              F ? ne() : (Y = !1);
            }
          }
        }
        var ne;
        if (typeof z == "function")
          ne = function () {
            z(re);
          };
        else if (typeof MessageChannel < "u") {
          var pe = new MessageChannel(),
            he = pe.port2;
          (pe.port1.onmessage = re),
            (ne = function () {
              he.postMessage(null);
            });
        } else
          ne = function () {
            O(re, 0);
          };
        function J(I, F) {
          $ = O(function () {
            I(e.unstable_now());
          }, F);
        }
        (e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (I) {
            I.callback = null;
          }),
          (e.unstable_forceFrameRate = function (I) {
            0 > I || 125 < I
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (j = 0 < I ? Math.floor(1e3 / I) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return b;
          }),
          (e.unstable_next = function (I) {
            switch (b) {
              case 1:
              case 2:
              case 3:
                var F = 3;
                break;
              default:
                F = b;
            }
            var W = b;
            b = F;
            try {
              return I();
            } finally {
              b = W;
            }
          }),
          (e.unstable_requestPaint = function () {
            R = !0;
          }),
          (e.unstable_runWithPriority = function (I, F) {
            switch (I) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                I = 3;
            }
            var W = b;
            b = I;
            try {
              return F();
            } finally {
              b = W;
            }
          }),
          (e.unstable_scheduleCallback = function (I, F, W) {
            var ie = e.unstable_now();
            switch (
              (typeof W == "object" && W !== null
                ? ((W = W.delay),
                  (W = typeof W == "number" && 0 < W ? ie + W : ie))
                : (W = ie),
              I)
            ) {
              case 1:
                var w = -1;
                break;
              case 2:
                w = 250;
                break;
              case 5:
                w = 1073741823;
                break;
              case 4:
                w = 1e4;
                break;
              default:
                w = 5e3;
            }
            return (
              (w = W + w),
              (I = {
                id: p++,
                callback: F,
                priorityLevel: I,
                startTime: W,
                expirationTime: w,
                sortIndex: -1,
              }),
              W > ie
                ? ((I.sortIndex = W),
                  n(m, I),
                  i(h) === null &&
                    I === i(m) &&
                    (E ? (A($), ($ = -1)) : (E = !0), J(_, W - ie)))
                : ((I.sortIndex = w),
                  n(h, I),
                  C || x || ((C = !0), Y || ((Y = !0), ne()))),
              I
            );
          }),
          (e.unstable_shouldYield = K),
          (e.unstable_wrapCallback = function (I) {
            var F = b;
            return function () {
              var W = b;
              b = F;
              try {
                return I.apply(this, arguments);
              } finally {
                b = W;
              }
            };
          });
      })(Af)),
    Af
  );
}
var xb;
function bw() {
  return xb || ((xb = 1), (Tf.exports = vw())), Tf.exports;
}
var zf = { exports: {} },
  Rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sb;
function yw() {
  if (Sb) return Rt;
  Sb = 1;
  var e = kg();
  function n(h) {
    var m = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++)
        m += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return (
      "Minified React error #" +
      h +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var r = {
      d: {
        f: i,
        r: function () {
          throw Error(n(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function c(h, m, p) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: h,
      containerInfo: m,
      implementation: p,
    };
  }
  var d = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(h, m) {
    if (h === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Rt.createPortal = function (h, m) {
      var p =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(n(299));
      return c(h, m, null, p);
    }),
    (Rt.flushSync = function (h) {
      var m = d.T,
        p = r.p;
      try {
        if (((d.T = null), (r.p = 2), h)) return h();
      } finally {
        (d.T = m), (r.p = p), r.d.f();
      }
    }),
    (Rt.preconnect = function (h, m) {
      typeof h == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        r.d.C(h, m));
    }),
    (Rt.prefetchDNS = function (h) {
      typeof h == "string" && r.d.D(h);
    }),
    (Rt.preinit = function (h, m) {
      if (typeof h == "string" && m && typeof m.as == "string") {
        var p = m.as,
          y = g(p, m.crossOrigin),
          b = typeof m.integrity == "string" ? m.integrity : void 0,
          x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        p === "style"
          ? r.d.S(h, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: y,
              integrity: b,
              fetchPriority: x,
            })
          : p === "script" &&
            r.d.X(h, {
              crossOrigin: y,
              integrity: b,
              fetchPriority: x,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Rt.preinitModule = function (h, m) {
      if (typeof h == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var p = g(m.as, m.crossOrigin);
            r.d.M(h, {
              crossOrigin: p,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && r.d.M(h);
    }),
    (Rt.preload = function (h, m) {
      if (
        typeof h == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var p = m.as,
          y = g(p, m.crossOrigin);
        r.d.L(h, p, {
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Rt.preloadModule = function (h, m) {
      if (typeof h == "string")
        if (m) {
          var p = g(m.as, m.crossOrigin);
          r.d.m(h, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: p,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else r.d.m(h);
    }),
    (Rt.requestFormReset = function (h) {
      r.d.r(h);
    }),
    (Rt.unstable_batchedUpdates = function (h, m) {
      return h(m);
    }),
    (Rt.useFormState = function (h, m, p) {
      return d.H.useFormState(h, m, p);
    }),
    (Rt.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (Rt.version = "19.1.0"),
    Rt
  );
}
var Cb;
function Rx() {
  if (Cb) return zf.exports;
  Cb = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return e(), (zf.exports = yw()), zf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eb;
function xw() {
  if (Eb) return Io;
  Eb = 1;
  var e = bw(),
    n = kg(),
    i = Rx();
  function r(t) {
    var a = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var o = 2; o < arguments.length; o++)
        a += "&args[]=" + encodeURIComponent(arguments[o]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      a +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function c(t) {
    var a = t,
      o = t;
    if (t.alternate) for (; a.return; ) a = a.return;
    else {
      t = a;
      do (a = t), (a.flags & 4098) !== 0 && (o = a.return), (t = a.return);
      while (t);
    }
    return a.tag === 3 ? o : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (
        (a === null && ((t = t.alternate), t !== null && (a = t.memoizedState)),
        a !== null)
      )
        return a.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (c(t) !== t) throw Error(r(188));
  }
  function h(t) {
    var a = t.alternate;
    if (!a) {
      if (((a = c(t)), a === null)) throw Error(r(188));
      return a !== t ? null : t;
    }
    for (var o = t, l = a; ; ) {
      var u = o.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (((l = u.return), l !== null)) {
          o = l;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === o) return g(u), t;
          if (f === l) return g(u), a;
          f = f.sibling;
        }
        throw Error(r(188));
      }
      if (o.return !== l.return) (o = u), (l = f);
      else {
        for (var v = !1, S = u.child; S; ) {
          if (S === o) {
            (v = !0), (o = u), (l = f);
            break;
          }
          if (S === l) {
            (v = !0), (l = u), (o = f);
            break;
          }
          S = S.sibling;
        }
        if (!v) {
          for (S = f.child; S; ) {
            if (S === o) {
              (v = !0), (o = f), (l = u);
              break;
            }
            if (S === l) {
              (v = !0), (l = f), (o = u);
              break;
            }
            S = S.sibling;
          }
          if (!v) throw Error(r(189));
        }
      }
      if (o.alternate !== l) throw Error(r(190));
    }
    if (o.tag !== 3) throw Error(r(188));
    return o.stateNode.current === o ? t : a;
  }
  function m(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((a = m(t)), a !== null)) return a;
      t = t.sibling;
    }
    return null;
  }
  var p = Object.assign,
    y = Symbol.for("react.element"),
    b = Symbol.for("react.transitional.element"),
    x = Symbol.for("react.portal"),
    C = Symbol.for("react.fragment"),
    E = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    O = Symbol.for("react.provider"),
    A = Symbol.for("react.consumer"),
    z = Symbol.for("react.context"),
    B = Symbol.for("react.forward_ref"),
    _ = Symbol.for("react.suspense"),
    Y = Symbol.for("react.suspense_list"),
    $ = Symbol.for("react.memo"),
    j = Symbol.for("react.lazy"),
    U = Symbol.for("react.activity"),
    K = Symbol.for("react.memo_cache_sentinel"),
    re = Symbol.iterator;
  function ne(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (re && t[re]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var pe = Symbol.for("react.client.reference");
  function he(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === pe ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case R:
        return "Profiler";
      case E:
        return "StrictMode";
      case _:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case U:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case x:
          return "Portal";
        case z:
          return (t.displayName || "Context") + ".Provider";
        case A:
          return (t._context.displayName || "Context") + ".Consumer";
        case B:
          var a = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = a.displayName || a.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case $:
          return (
            (a = t.displayName || null), a !== null ? a : he(t.type) || "Memo"
          );
        case j:
          (a = t._payload), (t = t._init);
          try {
            return he(t(a));
          } catch {}
      }
    return null;
  }
  var J = Array.isArray,
    I = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    F = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    ie = [],
    w = -1;
  function G(t) {
    return { current: t };
  }
  function te(t) {
    0 > w || ((t.current = ie[w]), (ie[w] = null), w--);
  }
  function ae(t, a) {
    w++, (ie[w] = t.current), (t.current = a);
  }
  var le = G(null),
    xe = G(null),
    fe = G(null),
    At = G(null);
  function Z(t, a) {
    switch ((ae(fe, a), ae(xe, t), ae(le, null), a.nodeType)) {
      case 9:
      case 11:
        t = (t = a.documentElement) && (t = t.namespaceURI) ? Uv(t) : 0;
        break;
      default:
        if (((t = a.tagName), (a = a.namespaceURI)))
          (a = Uv(a)), (t = $v(a, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    te(le), ae(le, t);
  }
  function ee() {
    te(le), te(xe), te(fe);
  }
  function Ee(t) {
    t.memoizedState !== null && ae(At, t);
    var a = le.current,
      o = $v(a, t.type);
    a !== o && (ae(xe, t), ae(le, o));
  }
  function Ne(t) {
    xe.current === t && (te(le), te(xe)),
      At.current === t && (te(At), (Ro._currentValue = W));
  }
  var We = Object.prototype.hasOwnProperty,
    Ze = e.unstable_scheduleCallback,
    Bt = e.unstable_cancelCallback,
    Ei = e.unstable_shouldYield,
    ha = e.unstable_requestPaint,
    tn = e.unstable_now,
    El = e.unstable_getCurrentPriorityLevel,
    Ol = e.unstable_ImmediatePriority,
    _r = e.unstable_UserBlockingPriority,
    Oi = e.unstable_NormalPriority,
    wl = e.unstable_LowPriority,
    Nr = e.unstable_IdlePriority,
    Ir = e.log,
    KC = e.unstable_setDisableYieldValue,
    Pr = null,
    jt = null;
  function ma(t) {
    if (
      (typeof Ir == "function" && KC(t),
      jt && typeof jt.setStrictMode == "function")
    )
      try {
        jt.setStrictMode(Pr, t);
      } catch {}
  }
  var Ut = Math.clz32 ? Math.clz32 : JC,
    QC = Math.log,
    ZC = Math.LN2;
  function JC(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((QC(t) / ZC) | 0)) | 0;
  }
  var kl = 256,
    Rl = 4194304;
  function Wa(t) {
    var a = t & 42;
    if (a !== 0) return a;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Tl(t, a, o) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var u = 0,
      f = t.suspendedLanes,
      v = t.pingedLanes;
    t = t.warmLanes;
    var S = l & 134217727;
    return (
      S !== 0
        ? ((l = S & ~f),
          l !== 0
            ? (u = Wa(l))
            : ((v &= S),
              v !== 0
                ? (u = Wa(v))
                : o || ((o = S & ~t), o !== 0 && (u = Wa(o)))))
        : ((S = l & ~f),
          S !== 0
            ? (u = Wa(S))
            : v !== 0
              ? (u = Wa(v))
              : o || ((o = l & ~t), o !== 0 && (u = Wa(o)))),
      u === 0
        ? 0
        : a !== 0 &&
            a !== u &&
            (a & f) === 0 &&
            ((f = u & -u),
            (o = a & -a),
            f >= o || (f === 32 && (o & 4194048) !== 0))
          ? a
          : u
    );
  }
  function Vr(t, a) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & a) === 0;
  }
  function eE(t, a) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wh() {
    var t = kl;
    return (kl <<= 1), (kl & 4194048) === 0 && (kl = 256), t;
  }
  function kh() {
    var t = Rl;
    return (Rl <<= 1), (Rl & 62914560) === 0 && (Rl = 4194304), t;
  }
  function gu(t) {
    for (var a = [], o = 0; 31 > o; o++) a.push(t);
    return a;
  }
  function Dr(t, a) {
    (t.pendingLanes |= a),
      a !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function tE(t, a, o, l, u, f) {
    var v = t.pendingLanes;
    (t.pendingLanes = o),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= o),
      (t.entangledLanes &= o),
      (t.errorRecoveryDisabledLanes &= o),
      (t.shellSuspendCounter = 0);
    var S = t.entanglements,
      T = t.expirationTimes,
      M = t.hiddenUpdates;
    for (o = v & ~o; 0 < o; ) {
      var q = 31 - Ut(o),
        Q = 1 << q;
      (S[q] = 0), (T[q] = -1);
      var L = M[q];
      if (L !== null)
        for (M[q] = null, q = 0; q < L.length; q++) {
          var H = L[q];
          H !== null && (H.lane &= -536870913);
        }
      o &= ~Q;
    }
    l !== 0 && Rh(t, l, 0),
      f !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= f & ~(v & ~a));
  }
  function Rh(t, a, o) {
    (t.pendingLanes |= a), (t.suspendedLanes &= ~a);
    var l = 31 - Ut(a);
    (t.entangledLanes |= a),
      (t.entanglements[l] = t.entanglements[l] | 1073741824 | (o & 4194090));
  }
  function Th(t, a) {
    var o = (t.entangledLanes |= a);
    for (t = t.entanglements; o; ) {
      var l = 31 - Ut(o),
        u = 1 << l;
      (u & a) | (t[l] & a) && (t[l] |= a), (o &= ~u);
    }
  }
  function hu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function mu(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ah() {
    var t = F.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : sb(t.type));
  }
  function nE(t, a) {
    var o = F.p;
    try {
      return (F.p = t), a();
    } finally {
      F.p = o;
    }
  }
  var pa = Math.random().toString(36).slice(2),
    wt = "__reactFiber$" + pa,
    Nt = "__reactProps$" + pa,
    wi = "__reactContainer$" + pa,
    pu = "__reactEvents$" + pa,
    aE = "__reactListeners$" + pa,
    iE = "__reactHandles$" + pa,
    zh = "__reactResources$" + pa,
    Mr = "__reactMarker$" + pa;
  function vu(t) {
    delete t[wt], delete t[Nt], delete t[pu], delete t[aE], delete t[iE];
  }
  function ki(t) {
    var a = t[wt];
    if (a) return a;
    for (var o = t.parentNode; o; ) {
      if ((a = o[wi] || o[wt])) {
        if (
          ((o = a.alternate),
          a.child !== null || (o !== null && o.child !== null))
        )
          for (t = qv(t); t !== null; ) {
            if ((o = t[wt])) return o;
            t = qv(t);
          }
        return a;
      }
      (t = o), (o = t.parentNode);
    }
    return null;
  }
  function Ri(t) {
    if ((t = t[wt] || t[wi])) {
      var a = t.tag;
      if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
        return t;
    }
    return null;
  }
  function Lr(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Ti(t) {
    var a = t[zh];
    return (
      a ||
        (a = t[zh] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      a
    );
  }
  function ct(t) {
    t[Mr] = !0;
  }
  var _h = new Set(),
    Nh = {};
  function qa(t, a) {
    Ai(t, a), Ai(t + "Capture", a);
  }
  function Ai(t, a) {
    for (Nh[t] = a, t = 0; t < a.length; t++) _h.add(a[t]);
  }
  var rE = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Ih = {},
    Ph = {};
  function oE(t) {
    return We.call(Ph, t)
      ? !0
      : We.call(Ih, t)
        ? !1
        : rE.test(t)
          ? (Ph[t] = !0)
          : ((Ih[t] = !0), !1);
  }
  function Al(t, a, o) {
    if (oE(a))
      if (o === null) t.removeAttribute(a);
      else {
        switch (typeof o) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(a);
            return;
          case "boolean":
            var l = a.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(a);
              return;
            }
        }
        t.setAttribute(a, "" + o);
      }
  }
  function zl(t, a, o) {
    if (o === null) t.removeAttribute(a);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttribute(a, "" + o);
    }
  }
  function $n(t, a, o, l) {
    if (l === null) t.removeAttribute(o);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(o);
          return;
      }
      t.setAttributeNS(a, o, "" + l);
    }
  }
  var bu, Vh;
  function zi(t) {
    if (bu === void 0)
      try {
        throw Error();
      } catch (o) {
        var a = o.stack.trim().match(/\n( *(at )?)/);
        (bu = (a && a[1]) || ""),
          (Vh =
            -1 <
            o.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < o.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
      }
    return (
      `
` +
      bu +
      t +
      Vh
    );
  }
  var yu = !1;
  function xu(t, a) {
    if (!t || yu) return "";
    yu = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (a) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (H) {
                  var L = H;
                }
                Reflect.construct(t, [], Q);
              } else {
                try {
                  Q.call();
                } catch (H) {
                  L = H;
                }
                t.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                L = H;
              }
              (Q = t()) &&
                typeof Q.catch == "function" &&
                Q.catch(function () {});
            }
          } catch (H) {
            if (H && L && typeof H.stack == "string") return [H.stack, L.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var f = l.DetermineComponentFrameRoot(),
        v = f[0],
        S = f[1];
      if (v && S) {
        var T = v.split(`
`),
          M = S.split(`
`);
        for (
          u = l = 0;
          l < T.length && !T[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; u < M.length && !M[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (l === T.length || u === M.length)
          for (
            l = T.length - 1, u = M.length - 1;
            1 <= l && 0 <= u && T[l] !== M[u];

          )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (T[l] !== M[u]) {
            if (l !== 1 || u !== 1)
              do
                if ((l--, u--, 0 > u || T[l] !== M[u])) {
                  var q =
                    `
` + T[l].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      q.includes("<anonymous>") &&
                      (q = q.replace("<anonymous>", t.displayName)),
                    q
                  );
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      (yu = !1), (Error.prepareStackTrace = o);
    }
    return (o = t ? t.displayName || t.name : "") ? zi(o) : "";
  }
  function lE(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return zi(t.type);
      case 16:
        return zi("Lazy");
      case 13:
        return zi("Suspense");
      case 19:
        return zi("SuspenseList");
      case 0:
      case 15:
        return xu(t.type, !1);
      case 11:
        return xu(t.type.render, !1);
      case 1:
        return xu(t.type, !0);
      case 31:
        return zi("Activity");
      default:
        return "";
    }
  }
  function Dh(t) {
    try {
      var a = "";
      do (a += lE(t)), (t = t.return);
      while (t);
      return a;
    } catch (o) {
      return (
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack
      );
    }
  }
  function nn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Mh(t) {
    var a = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (a === "checkbox" || a === "radio")
    );
  }
  function sE(t) {
    var a = Mh(t) ? "checked" : "value",
      o = Object.getOwnPropertyDescriptor(t.constructor.prototype, a),
      l = "" + t[a];
    if (
      !t.hasOwnProperty(a) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var u = o.get,
        f = o.set;
      return (
        Object.defineProperty(t, a, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (v) {
            (l = "" + v), f.call(this, v);
          },
        }),
        Object.defineProperty(t, a, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (v) {
            l = "" + v;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[a];
          },
        }
      );
    }
  }
  function _l(t) {
    t._valueTracker || (t._valueTracker = sE(t));
  }
  function Lh(t) {
    if (!t) return !1;
    var a = t._valueTracker;
    if (!a) return !0;
    var o = a.getValue(),
      l = "";
    return (
      t && (l = Mh(t) ? (t.checked ? "true" : "false") : t.value),
      (t = l),
      t !== o ? (a.setValue(t), !0) : !1
    );
  }
  function Nl(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var cE = /[\n"\\]/g;
  function an(t) {
    return t.replace(cE, function (a) {
      return "\\" + a.charCodeAt(0).toString(16) + " ";
    });
  }
  function Su(t, a, o, l, u, f, v, S) {
    (t.name = ""),
      v != null &&
      typeof v != "function" &&
      typeof v != "symbol" &&
      typeof v != "boolean"
        ? (t.type = v)
        : t.removeAttribute("type"),
      a != null
        ? v === "number"
          ? ((a === 0 && t.value === "") || t.value != a) &&
            (t.value = "" + nn(a))
          : t.value !== "" + nn(a) && (t.value = "" + nn(a))
        : (v !== "submit" && v !== "reset") || t.removeAttribute("value"),
      a != null
        ? Cu(t, v, nn(a))
        : o != null
          ? Cu(t, v, nn(o))
          : l != null && t.removeAttribute("value"),
      u == null && f != null && (t.defaultChecked = !!f),
      u != null &&
        (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      S != null &&
      typeof S != "function" &&
      typeof S != "symbol" &&
      typeof S != "boolean"
        ? (t.name = "" + nn(S))
        : t.removeAttribute("name");
  }
  function Hh(t, a, o, l, u, f, v, S) {
    if (
      (f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (t.type = f),
      a != null || o != null)
    ) {
      if (!((f !== "submit" && f !== "reset") || a != null)) return;
      (o = o != null ? "" + nn(o) : ""),
        (a = a != null ? "" + nn(a) : o),
        S || a === t.value || (t.value = a),
        (t.defaultValue = a);
    }
    (l = l ?? u),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (t.checked = S ? t.checked : !!l),
      (t.defaultChecked = !!l),
      v != null &&
        typeof v != "function" &&
        typeof v != "symbol" &&
        typeof v != "boolean" &&
        (t.name = v);
  }
  function Cu(t, a, o) {
    (a === "number" && Nl(t.ownerDocument) === t) ||
      t.defaultValue === "" + o ||
      (t.defaultValue = "" + o);
  }
  function _i(t, a, o, l) {
    if (((t = t.options), a)) {
      a = {};
      for (var u = 0; u < o.length; u++) a["$" + o[u]] = !0;
      for (o = 0; o < t.length; o++)
        (u = a.hasOwnProperty("$" + t[o].value)),
          t[o].selected !== u && (t[o].selected = u),
          u && l && (t[o].defaultSelected = !0);
    } else {
      for (o = "" + nn(o), a = null, u = 0; u < t.length; u++) {
        if (t[u].value === o) {
          (t[u].selected = !0), l && (t[u].defaultSelected = !0);
          return;
        }
        a !== null || t[u].disabled || (a = t[u]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function Bh(t, a, o) {
    if (
      a != null &&
      ((a = "" + nn(a)), a !== t.value && (t.value = a), o == null)
    ) {
      t.defaultValue !== a && (t.defaultValue = a);
      return;
    }
    t.defaultValue = o != null ? "" + nn(o) : "";
  }
  function jh(t, a, o, l) {
    if (a == null) {
      if (l != null) {
        if (o != null) throw Error(r(92));
        if (J(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        o = l;
      }
      o == null && (o = ""), (a = o);
    }
    (o = nn(a)),
      (t.defaultValue = o),
      (l = t.textContent),
      l === o && l !== "" && l !== null && (t.value = l);
  }
  function Ni(t, a) {
    if (a) {
      var o = t.firstChild;
      if (o && o === t.lastChild && o.nodeType === 3) {
        o.nodeValue = a;
        return;
      }
    }
    t.textContent = a;
  }
  var uE = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Uh(t, a, o) {
    var l = a.indexOf("--") === 0;
    o == null || typeof o == "boolean" || o === ""
      ? l
        ? t.setProperty(a, "")
        : a === "float"
          ? (t.cssFloat = "")
          : (t[a] = "")
      : l
        ? t.setProperty(a, o)
        : typeof o != "number" || o === 0 || uE.has(a)
          ? a === "float"
            ? (t.cssFloat = o)
            : (t[a] = ("" + o).trim())
          : (t[a] = o + "px");
  }
  function $h(t, a, o) {
    if (a != null && typeof a != "object") throw Error(r(62));
    if (((t = t.style), o != null)) {
      for (var l in o)
        !o.hasOwnProperty(l) ||
          (a != null && a.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? t.setProperty(l, "")
            : l === "float"
              ? (t.cssFloat = "")
              : (t[l] = ""));
      for (var u in a)
        (l = a[u]), a.hasOwnProperty(u) && o[u] !== l && Uh(t, u, l);
    } else for (var f in a) a.hasOwnProperty(f) && Uh(t, f, a[f]);
  }
  function Eu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var dE = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    fE =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Il(t) {
    return fE.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  var Ou = null;
  function wu(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ii = null,
    Pi = null;
  function Fh(t) {
    var a = Ri(t);
    if (a && (t = a.stateNode)) {
      var o = t[Nt] || null;
      e: switch (((t = a.stateNode), a.type)) {
        case "input":
          if (
            (Su(
              t,
              o.value,
              o.defaultValue,
              o.defaultValue,
              o.checked,
              o.defaultChecked,
              o.type,
              o.name,
            ),
            (a = o.name),
            o.type === "radio" && a != null)
          ) {
            for (o = t; o.parentNode; ) o = o.parentNode;
            for (
              o = o.querySelectorAll(
                'input[name="' + an("" + a) + '"][type="radio"]',
              ),
                a = 0;
              a < o.length;
              a++
            ) {
              var l = o[a];
              if (l !== t && l.form === t.form) {
                var u = l[Nt] || null;
                if (!u) throw Error(r(90));
                Su(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (a = 0; a < o.length; a++)
              (l = o[a]), l.form === t.form && Lh(l);
          }
          break e;
        case "textarea":
          Bh(t, o.value, o.defaultValue);
          break e;
        case "select":
          (a = o.value), a != null && _i(t, !!o.multiple, a, !1);
      }
    }
  }
  var ku = !1;
  function Gh(t, a, o) {
    if (ku) return t(a, o);
    ku = !0;
    try {
      var l = t(a);
      return l;
    } finally {
      if (
        ((ku = !1),
        (Ii !== null || Pi !== null) &&
          (bs(), Ii && ((a = Ii), (t = Pi), (Pi = Ii = null), Fh(a), t)))
      )
        for (a = 0; a < t.length; a++) Fh(t[a]);
    }
  }
  function Hr(t, a) {
    var o = t.stateNode;
    if (o === null) return null;
    var l = o[Nt] || null;
    if (l === null) return null;
    o = l[a];
    e: switch (a) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) ||
          ((t = t.type),
          (l = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !l);
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (o && typeof o != "function") throw Error(r(231, a, typeof o));
    return o;
  }
  var Fn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Ru = !1;
  if (Fn)
    try {
      var Br = {};
      Object.defineProperty(Br, "passive", {
        get: function () {
          Ru = !0;
        },
      }),
        window.addEventListener("test", Br, Br),
        window.removeEventListener("test", Br, Br);
    } catch {
      Ru = !1;
    }
  var va = null,
    Tu = null,
    Pl = null;
  function Wh() {
    if (Pl) return Pl;
    var t,
      a = Tu,
      o = a.length,
      l,
      u = "value" in va ? va.value : va.textContent,
      f = u.length;
    for (t = 0; t < o && a[t] === u[t]; t++);
    var v = o - t;
    for (l = 1; l <= v && a[o - l] === u[f - l]; l++);
    return (Pl = u.slice(t, 1 < l ? 1 - l : void 0));
  }
  function Vl(t) {
    var a = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && a === 13 && (t = 13))
        : (t = a),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Dl() {
    return !0;
  }
  function qh() {
    return !1;
  }
  function It(t) {
    function a(o, l, u, f, v) {
      (this._reactName = o),
        (this._targetInst = u),
        (this.type = l),
        (this.nativeEvent = f),
        (this.target = v),
        (this.currentTarget = null);
      for (var S in t)
        t.hasOwnProperty(S) && ((o = t[S]), (this[S] = o ? o(f) : f[S]));
      return (
        (this.isDefaultPrevented = (
          f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1
        )
          ? Dl
          : qh),
        (this.isPropagationStopped = qh),
        this
      );
    }
    return (
      p(a.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var o = this.nativeEvent;
          o &&
            (o.preventDefault
              ? o.preventDefault()
              : typeof o.returnValue != "unknown" && (o.returnValue = !1),
            (this.isDefaultPrevented = Dl));
        },
        stopPropagation: function () {
          var o = this.nativeEvent;
          o &&
            (o.stopPropagation
              ? o.stopPropagation()
              : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0),
            (this.isPropagationStopped = Dl));
        },
        persist: function () {},
        isPersistent: Dl,
      }),
      a
    );
  }
  var Ya = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ml = It(Ya),
    jr = p({}, Ya, { view: 0, detail: 0 }),
    gE = It(jr),
    Au,
    zu,
    Ur,
    Ll = p({}, jr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Nu,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Ur &&
              (Ur && t.type === "mousemove"
                ? ((Au = t.screenX - Ur.screenX), (zu = t.screenY - Ur.screenY))
                : (zu = Au = 0),
              (Ur = t)),
            Au);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : zu;
      },
    }),
    Yh = It(Ll),
    hE = p({}, Ll, { dataTransfer: 0 }),
    mE = It(hE),
    pE = p({}, jr, { relatedTarget: 0 }),
    _u = It(pE),
    vE = p({}, Ya, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    bE = It(vE),
    yE = p({}, Ya, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    xE = It(yE),
    SE = p({}, Ya, { data: 0 }),
    Xh = It(SE),
    CE = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    EE = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    OE = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function wE(t) {
    var a = this.nativeEvent;
    return a.getModifierState
      ? a.getModifierState(t)
      : (t = OE[t])
        ? !!a[t]
        : !1;
  }
  function Nu() {
    return wE;
  }
  var kE = p({}, jr, {
      key: function (t) {
        if (t.key) {
          var a = CE[t.key] || t.key;
          if (a !== "Unidentified") return a;
        }
        return t.type === "keypress"
          ? ((t = Vl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? EE[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Nu,
      charCode: function (t) {
        return t.type === "keypress" ? Vl(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Vl(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    RE = It(kE),
    TE = p({}, Ll, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Kh = It(TE),
    AE = p({}, jr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Nu,
    }),
    zE = It(AE),
    _E = p({}, Ya, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    NE = It(_E),
    IE = p({}, Ll, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    PE = It(IE),
    VE = p({}, Ya, { newState: 0, oldState: 0 }),
    DE = It(VE),
    ME = [9, 13, 27, 32],
    Iu = Fn && "CompositionEvent" in window,
    $r = null;
  Fn && "documentMode" in document && ($r = document.documentMode);
  var LE = Fn && "TextEvent" in window && !$r,
    Qh = Fn && (!Iu || ($r && 8 < $r && 11 >= $r)),
    Zh = " ",
    Jh = !1;
  function em(t, a) {
    switch (t) {
      case "keyup":
        return ME.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function tm(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vi = !1;
  function HE(t, a) {
    switch (t) {
      case "compositionend":
        return tm(a);
      case "keypress":
        return a.which !== 32 ? null : ((Jh = !0), Zh);
      case "textInput":
        return (t = a.data), t === Zh && Jh ? null : t;
      default:
        return null;
    }
  }
  function BE(t, a) {
    if (Vi)
      return t === "compositionend" || (!Iu && em(t, a))
        ? ((t = Wh()), (Pl = Tu = va = null), (Vi = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || (a.ctrlKey && a.altKey)) {
          if (a.char && 1 < a.char.length) return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return Qh && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var jE = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function nm(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return a === "input" ? !!jE[t.type] : a === "textarea";
  }
  function am(t, a, o, l) {
    Ii ? (Pi ? Pi.push(l) : (Pi = [l])) : (Ii = l),
      (a = Os(a, "onChange")),
      0 < a.length &&
        ((o = new Ml("onChange", "change", null, o, l)),
        t.push({ event: o, listeners: a }));
  }
  var Fr = null,
    Gr = null;
  function UE(t) {
    Mv(t, 0);
  }
  function Hl(t) {
    var a = Lr(t);
    if (Lh(a)) return t;
  }
  function im(t, a) {
    if (t === "change") return a;
  }
  var rm = !1;
  if (Fn) {
    var Pu;
    if (Fn) {
      var Vu = "oninput" in document;
      if (!Vu) {
        var om = document.createElement("div");
        om.setAttribute("oninput", "return;"),
          (Vu = typeof om.oninput == "function");
      }
      Pu = Vu;
    } else Pu = !1;
    rm = Pu && (!document.documentMode || 9 < document.documentMode);
  }
  function lm() {
    Fr && (Fr.detachEvent("onpropertychange", sm), (Gr = Fr = null));
  }
  function sm(t) {
    if (t.propertyName === "value" && Hl(Gr)) {
      var a = [];
      am(a, Gr, t, wu(t)), Gh(UE, a);
    }
  }
  function $E(t, a, o) {
    t === "focusin"
      ? (lm(), (Fr = a), (Gr = o), Fr.attachEvent("onpropertychange", sm))
      : t === "focusout" && lm();
  }
  function FE(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Hl(Gr);
  }
  function GE(t, a) {
    if (t === "click") return Hl(a);
  }
  function WE(t, a) {
    if (t === "input" || t === "change") return Hl(a);
  }
  function qE(t, a) {
    return (t === a && (t !== 0 || 1 / t === 1 / a)) || (t !== t && a !== a);
  }
  var $t = typeof Object.is == "function" ? Object.is : qE;
  function Wr(t, a) {
    if ($t(t, a)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof a != "object" ||
      a === null
    )
      return !1;
    var o = Object.keys(t),
      l = Object.keys(a);
    if (o.length !== l.length) return !1;
    for (l = 0; l < o.length; l++) {
      var u = o[l];
      if (!We.call(a, u) || !$t(t[u], a[u])) return !1;
    }
    return !0;
  }
  function cm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function um(t, a) {
    var o = cm(t);
    t = 0;
    for (var l; o; ) {
      if (o.nodeType === 3) {
        if (((l = t + o.textContent.length), t <= a && l >= a))
          return { node: o, offset: a - t };
        t = l;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = cm(o);
    }
  }
  function dm(t, a) {
    return t && a
      ? t === a
        ? !0
        : t && t.nodeType === 3
          ? !1
          : a && a.nodeType === 3
            ? dm(t, a.parentNode)
            : "contains" in t
              ? t.contains(a)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(a) & 16)
                : !1
      : !1;
  }
  function fm(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var a = Nl(t.document); a instanceof t.HTMLIFrameElement; ) {
      try {
        var o = typeof a.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) t = a.contentWindow;
      else break;
      a = Nl(t.document);
    }
    return a;
  }
  function Du(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      a &&
      ((a === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        a === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var YE = Fn && "documentMode" in document && 11 >= document.documentMode,
    Di = null,
    Mu = null,
    qr = null,
    Lu = !1;
  function gm(t, a, o) {
    var l =
      o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    Lu ||
      Di == null ||
      Di !== Nl(l) ||
      ((l = Di),
      "selectionStart" in l && Du(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (qr && Wr(qr, l)) ||
        ((qr = l),
        (l = Os(Mu, "onSelect")),
        0 < l.length &&
          ((a = new Ml("onSelect", "select", null, a, o)),
          t.push({ event: a, listeners: l }),
          (a.target = Di))));
  }
  function Xa(t, a) {
    var o = {};
    return (
      (o[t.toLowerCase()] = a.toLowerCase()),
      (o["Webkit" + t] = "webkit" + a),
      (o["Moz" + t] = "moz" + a),
      o
    );
  }
  var Mi = {
      animationend: Xa("Animation", "AnimationEnd"),
      animationiteration: Xa("Animation", "AnimationIteration"),
      animationstart: Xa("Animation", "AnimationStart"),
      transitionrun: Xa("Transition", "TransitionRun"),
      transitionstart: Xa("Transition", "TransitionStart"),
      transitioncancel: Xa("Transition", "TransitionCancel"),
      transitionend: Xa("Transition", "TransitionEnd"),
    },
    Hu = {},
    hm = {};
  Fn &&
    ((hm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Mi.animationend.animation,
      delete Mi.animationiteration.animation,
      delete Mi.animationstart.animation),
    "TransitionEvent" in window || delete Mi.transitionend.transition);
  function Ka(t) {
    if (Hu[t]) return Hu[t];
    if (!Mi[t]) return t;
    var a = Mi[t],
      o;
    for (o in a) if (a.hasOwnProperty(o) && o in hm) return (Hu[t] = a[o]);
    return t;
  }
  var mm = Ka("animationend"),
    pm = Ka("animationiteration"),
    vm = Ka("animationstart"),
    XE = Ka("transitionrun"),
    KE = Ka("transitionstart"),
    QE = Ka("transitioncancel"),
    bm = Ka("transitionend"),
    ym = new Map(),
    Bu =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Bu.push("scrollEnd");
  function vn(t, a) {
    ym.set(t, a), qa(a, [t]);
  }
  var xm = new WeakMap();
  function rn(t, a) {
    if (typeof t == "object" && t !== null) {
      var o = xm.get(t);
      return o !== void 0
        ? o
        : ((a = { value: t, source: a, stack: Dh(a) }), xm.set(t, a), a);
    }
    return { value: t, source: a, stack: Dh(a) };
  }
  var on = [],
    Li = 0,
    ju = 0;
  function Bl() {
    for (var t = Li, a = (ju = Li = 0); a < t; ) {
      var o = on[a];
      on[a++] = null;
      var l = on[a];
      on[a++] = null;
      var u = on[a];
      on[a++] = null;
      var f = on[a];
      if (((on[a++] = null), l !== null && u !== null)) {
        var v = l.pending;
        v === null ? (u.next = u) : ((u.next = v.next), (v.next = u)),
          (l.pending = u);
      }
      f !== 0 && Sm(o, u, f);
    }
  }
  function jl(t, a, o, l) {
    (on[Li++] = t),
      (on[Li++] = a),
      (on[Li++] = o),
      (on[Li++] = l),
      (ju |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l);
  }
  function Uu(t, a, o, l) {
    return jl(t, a, o, l), Ul(t);
  }
  function Hi(t, a) {
    return jl(t, null, null, a), Ul(t);
  }
  function Sm(t, a, o) {
    t.lanes |= o;
    var l = t.alternate;
    l !== null && (l.lanes |= o);
    for (var u = !1, f = t.return; f !== null; )
      (f.childLanes |= o),
        (l = f.alternate),
        l !== null && (l.childLanes |= o),
        f.tag === 22 &&
          ((t = f.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = f),
        (f = f.return);
    return t.tag === 3
      ? ((f = t.stateNode),
        u &&
          a !== null &&
          ((u = 31 - Ut(o)),
          (t = f.hiddenUpdates),
          (l = t[u]),
          l === null ? (t[u] = [a]) : l.push(a),
          (a.lane = o | 536870912)),
        f)
      : null;
  }
  function Ul(t) {
    if (50 < yo) throw ((yo = 0), (Yd = null), Error(r(185)));
    for (var a = t.return; a !== null; ) (t = a), (a = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var Bi = {};
  function ZE(t, a, o, l) {
    (this.tag = t),
      (this.key = o),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = a),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Ft(t, a, o, l) {
    return new ZE(t, a, o, l);
  }
  function $u(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function Gn(t, a) {
    var o = t.alternate;
    return (
      o === null
        ? ((o = Ft(t.tag, a, t.key, t.mode)),
          (o.elementType = t.elementType),
          (o.type = t.type),
          (o.stateNode = t.stateNode),
          (o.alternate = t),
          (t.alternate = o))
        : ((o.pendingProps = a),
          (o.type = t.type),
          (o.flags = 0),
          (o.subtreeFlags = 0),
          (o.deletions = null)),
      (o.flags = t.flags & 65011712),
      (o.childLanes = t.childLanes),
      (o.lanes = t.lanes),
      (o.child = t.child),
      (o.memoizedProps = t.memoizedProps),
      (o.memoizedState = t.memoizedState),
      (o.updateQueue = t.updateQueue),
      (a = t.dependencies),
      (o.dependencies =
        a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }),
      (o.sibling = t.sibling),
      (o.index = t.index),
      (o.ref = t.ref),
      (o.refCleanup = t.refCleanup),
      o
    );
  }
  function Cm(t, a) {
    t.flags &= 65011714;
    var o = t.alternate;
    return (
      o === null
        ? ((t.childLanes = 0),
          (t.lanes = a),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = o.childLanes),
          (t.lanes = o.lanes),
          (t.child = o.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = o.memoizedProps),
          (t.memoizedState = o.memoizedState),
          (t.updateQueue = o.updateQueue),
          (t.type = o.type),
          (a = o.dependencies),
          (t.dependencies =
            a === null
              ? null
              : { lanes: a.lanes, firstContext: a.firstContext })),
      t
    );
  }
  function $l(t, a, o, l, u, f) {
    var v = 0;
    if (((l = t), typeof t == "function")) $u(t) && (v = 1);
    else if (typeof t == "string")
      v = ew(t, o, le.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      e: switch (t) {
        case U:
          return (t = Ft(31, o, a, u)), (t.elementType = U), (t.lanes = f), t;
        case C:
          return Qa(o.children, u, f, a);
        case E:
          (v = 8), (u |= 24);
          break;
        case R:
          return (
            (t = Ft(12, o, a, u | 2)), (t.elementType = R), (t.lanes = f), t
          );
        case _:
          return (t = Ft(13, o, a, u)), (t.elementType = _), (t.lanes = f), t;
        case Y:
          return (t = Ft(19, o, a, u)), (t.elementType = Y), (t.lanes = f), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case O:
              case z:
                v = 10;
                break e;
              case A:
                v = 9;
                break e;
              case B:
                v = 11;
                break e;
              case $:
                v = 14;
                break e;
              case j:
                (v = 16), (l = null);
                break e;
            }
          (v = 29),
            (o = Error(r(130, t === null ? "null" : typeof t, ""))),
            (l = null);
      }
    return (
      (a = Ft(v, o, a, u)), (a.elementType = t), (a.type = l), (a.lanes = f), a
    );
  }
  function Qa(t, a, o, l) {
    return (t = Ft(7, t, l, a)), (t.lanes = o), t;
  }
  function Fu(t, a, o) {
    return (t = Ft(6, t, null, a)), (t.lanes = o), t;
  }
  function Gu(t, a, o) {
    return (
      (a = Ft(4, t.children !== null ? t.children : [], t.key, a)),
      (a.lanes = o),
      (a.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      a
    );
  }
  var ji = [],
    Ui = 0,
    Fl = null,
    Gl = 0,
    ln = [],
    sn = 0,
    Za = null,
    Wn = 1,
    qn = "";
  function Ja(t, a) {
    (ji[Ui++] = Gl), (ji[Ui++] = Fl), (Fl = t), (Gl = a);
  }
  function Em(t, a, o) {
    (ln[sn++] = Wn), (ln[sn++] = qn), (ln[sn++] = Za), (Za = t);
    var l = Wn;
    t = qn;
    var u = 32 - Ut(l) - 1;
    (l &= ~(1 << u)), (o += 1);
    var f = 32 - Ut(a) + u;
    if (30 < f) {
      var v = u - (u % 5);
      (f = (l & ((1 << v) - 1)).toString(32)),
        (l >>= v),
        (u -= v),
        (Wn = (1 << (32 - Ut(a) + u)) | (o << u) | l),
        (qn = f + t);
    } else (Wn = (1 << f) | (o << u) | l), (qn = t);
  }
  function Wu(t) {
    t.return !== null && (Ja(t, 1), Em(t, 1, 0));
  }
  function qu(t) {
    for (; t === Fl; )
      (Fl = ji[--Ui]), (ji[Ui] = null), (Gl = ji[--Ui]), (ji[Ui] = null);
    for (; t === Za; )
      (Za = ln[--sn]),
        (ln[sn] = null),
        (qn = ln[--sn]),
        (ln[sn] = null),
        (Wn = ln[--sn]),
        (ln[sn] = null);
  }
  var zt = null,
    Xe = null,
    Ae = !1,
    ei = null,
    Rn = !1,
    Yu = Error(r(519));
  function ti(t) {
    var a = Error(r(418, ""));
    throw (Kr(rn(a, t)), Yu);
  }
  function Om(t) {
    var a = t.stateNode,
      o = t.type,
      l = t.memoizedProps;
    switch (((a[wt] = t), (a[Nt] = l), o)) {
      case "dialog":
        ke("cancel", a), ke("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        ke("load", a);
        break;
      case "video":
      case "audio":
        for (o = 0; o < So.length; o++) ke(So[o], a);
        break;
      case "source":
        ke("error", a);
        break;
      case "img":
      case "image":
      case "link":
        ke("error", a), ke("load", a);
        break;
      case "details":
        ke("toggle", a);
        break;
      case "input":
        ke("invalid", a),
          Hh(
            a,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ),
          _l(a);
        break;
      case "select":
        ke("invalid", a);
        break;
      case "textarea":
        ke("invalid", a), jh(a, l.value, l.defaultValue, l.children), _l(a);
    }
    (o = l.children),
      (typeof o != "string" && typeof o != "number" && typeof o != "bigint") ||
      a.textContent === "" + o ||
      l.suppressHydrationWarning === !0 ||
      jv(a.textContent, o)
        ? (l.popover != null && (ke("beforetoggle", a), ke("toggle", a)),
          l.onScroll != null && ke("scroll", a),
          l.onScrollEnd != null && ke("scrollend", a),
          l.onClick != null && (a.onclick = ws),
          (a = !0))
        : (a = !1),
      a || ti(t);
  }
  function wm(t) {
    for (zt = t.return; zt; )
      switch (zt.tag) {
        case 5:
        case 13:
          Rn = !1;
          return;
        case 27:
        case 3:
          Rn = !0;
          return;
        default:
          zt = zt.return;
      }
  }
  function Yr(t) {
    if (t !== zt) return !1;
    if (!Ae) return wm(t), (Ae = !0), !1;
    var a = t.tag,
      o;
    if (
      ((o = a !== 3 && a !== 27) &&
        ((o = a === 5) &&
          ((o = t.type),
          (o =
            !(o !== "form" && o !== "button") || df(t.type, t.memoizedProps))),
        (o = !o)),
      o && Xe && ti(t),
      wm(t),
      a === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(r(317));
      e: {
        for (t = t.nextSibling, a = 0; t; ) {
          if (t.nodeType === 8)
            if (((o = t.data), o === "/$")) {
              if (a === 0) {
                Xe = yn(t.nextSibling);
                break e;
              }
              a--;
            } else (o !== "$" && o !== "$!" && o !== "$?") || a++;
          t = t.nextSibling;
        }
        Xe = null;
      }
    } else
      a === 27
        ? ((a = Xe), Ia(t.type) ? ((t = mf), (mf = null), (Xe = t)) : (Xe = a))
        : (Xe = zt ? yn(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Xr() {
    (Xe = zt = null), (Ae = !1);
  }
  function km() {
    var t = ei;
    return (
      t !== null &&
        (Dt === null ? (Dt = t) : Dt.push.apply(Dt, t), (ei = null)),
      t
    );
  }
  function Kr(t) {
    ei === null ? (ei = [t]) : ei.push(t);
  }
  var Xu = G(null),
    ni = null,
    Yn = null;
  function ba(t, a, o) {
    ae(Xu, a._currentValue), (a._currentValue = o);
  }
  function Xn(t) {
    (t._currentValue = Xu.current), te(Xu);
  }
  function Ku(t, a, o) {
    for (; t !== null; ) {
      var l = t.alternate;
      if (
        ((t.childLanes & a) !== a
          ? ((t.childLanes |= a), l !== null && (l.childLanes |= a))
          : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a),
        t === o)
      )
        break;
      t = t.return;
    }
  }
  function Qu(t, a, o, l) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var v = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var S = f;
          f = u;
          for (var T = 0; T < a.length; T++)
            if (S.context === a[T]) {
              (f.lanes |= o),
                (S = f.alternate),
                S !== null && (S.lanes |= o),
                Ku(f.return, o, t),
                l || (v = null);
              break e;
            }
          f = S.next;
        }
      } else if (u.tag === 18) {
        if (((v = u.return), v === null)) throw Error(r(341));
        (v.lanes |= o),
          (f = v.alternate),
          f !== null && (f.lanes |= o),
          Ku(v, o, t),
          (v = null);
      } else v = u.child;
      if (v !== null) v.return = u;
      else
        for (v = u; v !== null; ) {
          if (v === t) {
            v = null;
            break;
          }
          if (((u = v.sibling), u !== null)) {
            (u.return = v.return), (v = u);
            break;
          }
          v = v.return;
        }
      u = v;
    }
  }
  function Qr(t, a, o, l) {
    t = null;
    for (var u = a, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var v = u.alternate;
        if (v === null) throw Error(r(387));
        if (((v = v.memoizedProps), v !== null)) {
          var S = u.type;
          $t(u.pendingProps.value, v.value) ||
            (t !== null ? t.push(S) : (t = [S]));
        }
      } else if (u === At.current) {
        if (((v = u.alternate), v === null)) throw Error(r(387));
        v.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Ro) : (t = [Ro]));
      }
      u = u.return;
    }
    t !== null && Qu(a, t, o, l), (a.flags |= 262144);
  }
  function Wl(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!$t(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function ai(t) {
    (ni = t),
      (Yn = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function kt(t) {
    return Rm(ni, t);
  }
  function ql(t, a) {
    return ni === null && ai(t), Rm(t, a);
  }
  function Rm(t, a) {
    var o = a._currentValue;
    if (((a = { context: a, memoizedValue: o, next: null }), Yn === null)) {
      if (t === null) throw Error(r(308));
      (Yn = a),
        (t.dependencies = { lanes: 0, firstContext: a }),
        (t.flags |= 524288);
    } else Yn = Yn.next = a;
    return o;
  }
  var JE =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              a = (this.signal = {
                aborted: !1,
                addEventListener: function (o, l) {
                  t.push(l);
                },
              });
            this.abort = function () {
              (a.aborted = !0),
                t.forEach(function (o) {
                  return o();
                });
            };
          },
    eO = e.unstable_scheduleCallback,
    tO = e.unstable_NormalPriority,
    ot = {
      $$typeof: z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Zu() {
    return { controller: new JE(), data: new Map(), refCount: 0 };
  }
  function Zr(t) {
    t.refCount--,
      t.refCount === 0 &&
        eO(tO, function () {
          t.controller.abort();
        });
  }
  var Jr = null,
    Ju = 0,
    $i = 0,
    Fi = null;
  function nO(t, a) {
    if (Jr === null) {
      var o = (Jr = []);
      (Ju = 0),
        ($i = tf()),
        (Fi = {
          status: "pending",
          value: void 0,
          then: function (l) {
            o.push(l);
          },
        });
    }
    return Ju++, a.then(Tm, Tm), a;
  }
  function Tm() {
    if (--Ju === 0 && Jr !== null) {
      Fi !== null && (Fi.status = "fulfilled");
      var t = Jr;
      (Jr = null), ($i = 0), (Fi = null);
      for (var a = 0; a < t.length; a++) (0, t[a])();
    }
  }
  function aO(t, a) {
    var o = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          o.push(u);
        },
      };
    return (
      t.then(
        function () {
          (l.status = "fulfilled"), (l.value = a);
          for (var u = 0; u < o.length; u++) (0, o[u])(a);
        },
        function (u) {
          for (l.status = "rejected", l.reason = u, u = 0; u < o.length; u++)
            (0, o[u])(void 0);
        },
      ),
      l
    );
  }
  var Am = I.S;
  I.S = function (t, a) {
    typeof a == "object" &&
      a !== null &&
      typeof a.then == "function" &&
      nO(t, a),
      Am !== null && Am(t, a);
  };
  var ii = G(null);
  function ed() {
    var t = ii.current;
    return t !== null ? t : Ue.pooledCache;
  }
  function Yl(t, a) {
    a === null ? ae(ii, ii.current) : ae(ii, a.pool);
  }
  function zm() {
    var t = ed();
    return t === null ? null : { parent: ot._currentValue, pool: t };
  }
  var eo = Error(r(460)),
    _m = Error(r(474)),
    Xl = Error(r(542)),
    td = { then: function () {} };
  function Nm(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function Kl() {}
  function Im(t, a, o) {
    switch (
      ((o = t[o]),
      o === void 0 ? t.push(a) : o !== a && (a.then(Kl, Kl), (a = o)),
      a.status)
    ) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw ((t = a.reason), Vm(t), t);
      default:
        if (typeof a.status == "string") a.then(Kl, Kl);
        else {
          if (((t = Ue), t !== null && 100 < t.shellSuspendCounter))
            throw Error(r(482));
          (t = a),
            (t.status = "pending"),
            t.then(
              function (l) {
                if (a.status === "pending") {
                  var u = a;
                  (u.status = "fulfilled"), (u.value = l);
                }
              },
              function (l) {
                if (a.status === "pending") {
                  var u = a;
                  (u.status = "rejected"), (u.reason = l);
                }
              },
            );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw ((t = a.reason), Vm(t), t);
        }
        throw ((to = a), eo);
    }
  }
  var to = null;
  function Pm() {
    if (to === null) throw Error(r(459));
    var t = to;
    return (to = null), t;
  }
  function Vm(t) {
    if (t === eo || t === Xl) throw Error(r(483));
  }
  var ya = !1;
  function nd(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ad(t, a) {
    (t = t.updateQueue),
      a.updateQueue === t &&
        (a.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function xa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Sa(t, a, o) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Pe & 2) !== 0)) {
      var u = l.pending;
      return (
        u === null ? (a.next = a) : ((a.next = u.next), (u.next = a)),
        (l.pending = a),
        (a = Ul(t)),
        Sm(t, null, o),
        a
      );
    }
    return jl(t, l, a, o), Ul(t);
  }
  function no(t, a, o) {
    if (
      ((a = a.updateQueue), a !== null && ((a = a.shared), (o & 4194048) !== 0))
    ) {
      var l = a.lanes;
      (l &= t.pendingLanes), (o |= l), (a.lanes = o), Th(t, o);
    }
  }
  function id(t, a) {
    var o = t.updateQueue,
      l = t.alternate;
    if (l !== null && ((l = l.updateQueue), o === l)) {
      var u = null,
        f = null;
      if (((o = o.firstBaseUpdate), o !== null)) {
        do {
          var v = {
            lane: o.lane,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null,
          };
          f === null ? (u = f = v) : (f = f.next = v), (o = o.next);
        } while (o !== null);
        f === null ? (u = f = a) : (f = f.next = a);
      } else u = f = a;
      (o = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (t.updateQueue = o);
      return;
    }
    (t = o.lastBaseUpdate),
      t === null ? (o.firstBaseUpdate = a) : (t.next = a),
      (o.lastBaseUpdate = a);
  }
  var rd = !1;
  function ao() {
    if (rd) {
      var t = Fi;
      if (t !== null) throw t;
    }
  }
  function io(t, a, o, l) {
    rd = !1;
    var u = t.updateQueue;
    ya = !1;
    var f = u.firstBaseUpdate,
      v = u.lastBaseUpdate,
      S = u.shared.pending;
    if (S !== null) {
      u.shared.pending = null;
      var T = S,
        M = T.next;
      (T.next = null), v === null ? (f = M) : (v.next = M), (v = T);
      var q = t.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (S = q.lastBaseUpdate),
        S !== v &&
          (S === null ? (q.firstBaseUpdate = M) : (S.next = M),
          (q.lastBaseUpdate = T)));
    }
    if (f !== null) {
      var Q = u.baseState;
      (v = 0), (q = M = T = null), (S = f);
      do {
        var L = S.lane & -536870913,
          H = L !== S.lane;
        if (H ? (Re & L) === L : (l & L) === L) {
          L !== 0 && L === $i && (rd = !0),
            q !== null &&
              (q = q.next =
                {
                  lane: 0,
                  tag: S.tag,
                  payload: S.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var de = t,
              ce = S;
            L = a;
            var Le = o;
            switch (ce.tag) {
              case 1:
                if (((de = ce.payload), typeof de == "function")) {
                  Q = de.call(Le, Q, L);
                  break e;
                }
                Q = de;
                break e;
              case 3:
                de.flags = (de.flags & -65537) | 128;
              case 0:
                if (
                  ((de = ce.payload),
                  (L = typeof de == "function" ? de.call(Le, Q, L) : de),
                  L == null)
                )
                  break e;
                Q = p({}, Q, L);
                break e;
              case 2:
                ya = !0;
            }
          }
          (L = S.callback),
            L !== null &&
              ((t.flags |= 64),
              H && (t.flags |= 8192),
              (H = u.callbacks),
              H === null ? (u.callbacks = [L]) : H.push(L));
        } else
          (H = {
            lane: L,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null,
          }),
            q === null ? ((M = q = H), (T = Q)) : (q = q.next = H),
            (v |= L);
        if (((S = S.next), S === null)) {
          if (((S = u.shared.pending), S === null)) break;
          (H = S),
            (S = H.next),
            (H.next = null),
            (u.lastBaseUpdate = H),
            (u.shared.pending = null);
        }
      } while (!0);
      q === null && (T = Q),
        (u.baseState = T),
        (u.firstBaseUpdate = M),
        (u.lastBaseUpdate = q),
        f === null && (u.shared.lanes = 0),
        (Aa |= v),
        (t.lanes = v),
        (t.memoizedState = Q);
    }
  }
  function Dm(t, a) {
    if (typeof t != "function") throw Error(r(191, t));
    t.call(a);
  }
  function Mm(t, a) {
    var o = t.callbacks;
    if (o !== null)
      for (t.callbacks = null, t = 0; t < o.length; t++) Dm(o[t], a);
  }
  var Gi = G(null),
    Ql = G(0);
  function Lm(t, a) {
    (t = na), ae(Ql, t), ae(Gi, a), (na = t | a.baseLanes);
  }
  function od() {
    ae(Ql, na), ae(Gi, Gi.current);
  }
  function ld() {
    (na = Ql.current), te(Gi), te(Ql);
  }
  var Ca = 0,
    Se = null,
    De = null,
    tt = null,
    Zl = !1,
    Wi = !1,
    ri = !1,
    Jl = 0,
    ro = 0,
    qi = null,
    iO = 0;
  function Je() {
    throw Error(r(321));
  }
  function sd(t, a) {
    if (a === null) return !1;
    for (var o = 0; o < a.length && o < t.length; o++)
      if (!$t(t[o], a[o])) return !1;
    return !0;
  }
  function cd(t, a, o, l, u, f) {
    return (
      (Ca = f),
      (Se = a),
      (a.memoizedState = null),
      (a.updateQueue = null),
      (a.lanes = 0),
      (I.H = t === null || t.memoizedState === null ? Sp : Cp),
      (ri = !1),
      (f = o(l, u)),
      (ri = !1),
      Wi && (f = Bm(a, o, l, u)),
      Hm(t),
      f
    );
  }
  function Hm(t) {
    I.H = rs;
    var a = De !== null && De.next !== null;
    if (((Ca = 0), (tt = De = Se = null), (Zl = !1), (ro = 0), (qi = null), a))
      throw Error(r(300));
    t === null ||
      ut ||
      ((t = t.dependencies), t !== null && Wl(t) && (ut = !0));
  }
  function Bm(t, a, o, l) {
    Se = t;
    var u = 0;
    do {
      if ((Wi && (qi = null), (ro = 0), (Wi = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (tt = De = null), t.updateQueue != null)) {
        var f = t.updateQueue;
        (f.lastEffect = null),
          (f.events = null),
          (f.stores = null),
          f.memoCache != null && (f.memoCache.index = 0);
      }
      (I.H = dO), (f = a(o, l));
    } while (Wi);
    return f;
  }
  function rO() {
    var t = I.H,
      a = t.useState()[0];
    return (
      (a = typeof a.then == "function" ? oo(a) : a),
      (t = t.useState()[0]),
      (De !== null ? De.memoizedState : null) !== t && (Se.flags |= 1024),
      a
    );
  }
  function ud() {
    var t = Jl !== 0;
    return (Jl = 0), t;
  }
  function dd(t, a, o) {
    (a.updateQueue = t.updateQueue), (a.flags &= -2053), (t.lanes &= ~o);
  }
  function fd(t) {
    if (Zl) {
      for (t = t.memoizedState; t !== null; ) {
        var a = t.queue;
        a !== null && (a.pending = null), (t = t.next);
      }
      Zl = !1;
    }
    (Ca = 0), (tt = De = Se = null), (Wi = !1), (ro = Jl = 0), (qi = null);
  }
  function Pt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return tt === null ? (Se.memoizedState = tt = t) : (tt = tt.next = t), tt;
  }
  function nt() {
    if (De === null) {
      var t = Se.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = De.next;
    var a = tt === null ? Se.memoizedState : tt.next;
    if (a !== null) (tt = a), (De = t);
    else {
      if (t === null)
        throw Se.alternate === null ? Error(r(467)) : Error(r(310));
      (De = t),
        (t = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        tt === null ? (Se.memoizedState = tt = t) : (tt = tt.next = t);
    }
    return tt;
  }
  function gd() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function oo(t) {
    var a = ro;
    return (
      (ro += 1),
      qi === null && (qi = []),
      (t = Im(qi, t, a)),
      (a = Se),
      (tt === null ? a.memoizedState : tt.next) === null &&
        ((a = a.alternate),
        (I.H = a === null || a.memoizedState === null ? Sp : Cp)),
      t
    );
  }
  function es(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return oo(t);
      if (t.$$typeof === z) return kt(t);
    }
    throw Error(r(438, String(t)));
  }
  function hd(t) {
    var a = null,
      o = Se.updateQueue;
    if ((o !== null && (a = o.memoCache), a == null)) {
      var l = Se.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (a = {
              data: l.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (a == null && (a = { data: [], index: 0 }),
      o === null && ((o = gd()), (Se.updateQueue = o)),
      (o.memoCache = a),
      (o = a.data[a.index]),
      o === void 0)
    )
      for (o = a.data[a.index] = Array(t), l = 0; l < t; l++) o[l] = K;
    return a.index++, o;
  }
  function Kn(t, a) {
    return typeof a == "function" ? a(t) : a;
  }
  function ts(t) {
    var a = nt();
    return md(a, De, t);
  }
  function md(t, a, o) {
    var l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = o;
    var u = t.baseQueue,
      f = l.pending;
    if (f !== null) {
      if (u !== null) {
        var v = u.next;
        (u.next = f.next), (f.next = v);
      }
      (a.baseQueue = u = f), (l.pending = null);
    }
    if (((f = t.baseState), u === null)) t.memoizedState = f;
    else {
      a = u.next;
      var S = (v = null),
        T = null,
        M = a,
        q = !1;
      do {
        var Q = M.lane & -536870913;
        if (Q !== M.lane ? (Re & Q) === Q : (Ca & Q) === Q) {
          var L = M.revertLane;
          if (L === 0)
            T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: M.action,
                  hasEagerState: M.hasEagerState,
                  eagerState: M.eagerState,
                  next: null,
                }),
              Q === $i && (q = !0);
          else if ((Ca & L) === L) {
            (M = M.next), L === $i && (q = !0);
            continue;
          } else
            (Q = {
              lane: 0,
              revertLane: M.revertLane,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null,
            }),
              T === null ? ((S = T = Q), (v = f)) : (T = T.next = Q),
              (Se.lanes |= L),
              (Aa |= L);
          (Q = M.action),
            ri && o(f, Q),
            (f = M.hasEagerState ? M.eagerState : o(f, Q));
        } else
          (L = {
            lane: Q,
            revertLane: M.revertLane,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null,
          }),
            T === null ? ((S = T = L), (v = f)) : (T = T.next = L),
            (Se.lanes |= Q),
            (Aa |= Q);
        M = M.next;
      } while (M !== null && M !== a);
      if (
        (T === null ? (v = f) : (T.next = S),
        !$t(f, t.memoizedState) && ((ut = !0), q && ((o = Fi), o !== null)))
      )
        throw o;
      (t.memoizedState = f),
        (t.baseState = v),
        (t.baseQueue = T),
        (l.lastRenderedState = f);
    }
    return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function pd(t) {
    var a = nt(),
      o = a.queue;
    if (o === null) throw Error(r(311));
    o.lastRenderedReducer = t;
    var l = o.dispatch,
      u = o.pending,
      f = a.memoizedState;
    if (u !== null) {
      o.pending = null;
      var v = (u = u.next);
      do (f = t(f, v.action)), (v = v.next);
      while (v !== u);
      $t(f, a.memoizedState) || (ut = !0),
        (a.memoizedState = f),
        a.baseQueue === null && (a.baseState = f),
        (o.lastRenderedState = f);
    }
    return [f, l];
  }
  function jm(t, a, o) {
    var l = Se,
      u = nt(),
      f = Ae;
    if (f) {
      if (o === void 0) throw Error(r(407));
      o = o();
    } else o = a();
    var v = !$t((De || u).memoizedState, o);
    v && ((u.memoizedState = o), (ut = !0)), (u = u.queue);
    var S = Fm.bind(null, l, u, t);
    if (
      (lo(2048, 8, S, [t]),
      u.getSnapshot !== a || v || (tt !== null && tt.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        Yi(9, ns(), $m.bind(null, l, u, o, a), null),
        Ue === null)
      )
        throw Error(r(349));
      f || (Ca & 124) !== 0 || Um(l, a, o);
    }
    return o;
  }
  function Um(t, a, o) {
    (t.flags |= 16384),
      (t = { getSnapshot: a, value: o }),
      (a = Se.updateQueue),
      a === null
        ? ((a = gd()), (Se.updateQueue = a), (a.stores = [t]))
        : ((o = a.stores), o === null ? (a.stores = [t]) : o.push(t));
  }
  function $m(t, a, o, l) {
    (a.value = o), (a.getSnapshot = l), Gm(a) && Wm(t);
  }
  function Fm(t, a, o) {
    return o(function () {
      Gm(a) && Wm(t);
    });
  }
  function Gm(t) {
    var a = t.getSnapshot;
    t = t.value;
    try {
      var o = a();
      return !$t(t, o);
    } catch {
      return !0;
    }
  }
  function Wm(t) {
    var a = Hi(t, 2);
    a !== null && Xt(a, t, 2);
  }
  function vd(t) {
    var a = Pt();
    if (typeof t == "function") {
      var o = t;
      if (((t = o()), ri)) {
        ma(!0);
        try {
          o();
        } finally {
          ma(!1);
        }
      }
    }
    return (
      (a.memoizedState = a.baseState = t),
      (a.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kn,
        lastRenderedState: t,
      }),
      a
    );
  }
  function qm(t, a, o, l) {
    return (t.baseState = o), md(t, De, typeof l == "function" ? l : Kn);
  }
  function oO(t, a, o, l, u) {
    if (is(t)) throw Error(r(485));
    if (((t = a.action), t !== null)) {
      var f = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (v) {
          f.listeners.push(v);
        },
      };
      I.T !== null ? o(!0) : (f.isTransition = !1),
        l(f),
        (o = a.pending),
        o === null
          ? ((f.next = a.pending = f), Ym(a, f))
          : ((f.next = o.next), (a.pending = o.next = f));
    }
  }
  function Ym(t, a) {
    var o = a.action,
      l = a.payload,
      u = t.state;
    if (a.isTransition) {
      var f = I.T,
        v = {};
      I.T = v;
      try {
        var S = o(u, l),
          T = I.S;
        T !== null && T(v, S), Xm(t, a, S);
      } catch (M) {
        bd(t, a, M);
      } finally {
        I.T = f;
      }
    } else
      try {
        (f = o(u, l)), Xm(t, a, f);
      } catch (M) {
        bd(t, a, M);
      }
  }
  function Xm(t, a, o) {
    o !== null && typeof o == "object" && typeof o.then == "function"
      ? o.then(
          function (l) {
            Km(t, a, l);
          },
          function (l) {
            return bd(t, a, l);
          },
        )
      : Km(t, a, o);
  }
  function Km(t, a, o) {
    (a.status = "fulfilled"),
      (a.value = o),
      Qm(a),
      (t.state = o),
      (a = t.pending),
      a !== null &&
        ((o = a.next),
        o === a ? (t.pending = null) : ((o = o.next), (a.next = o), Ym(t, o)));
  }
  function bd(t, a, o) {
    var l = t.pending;
    if (((t.pending = null), l !== null)) {
      l = l.next;
      do (a.status = "rejected"), (a.reason = o), Qm(a), (a = a.next);
      while (a !== l);
    }
    t.action = null;
  }
  function Qm(t) {
    t = t.listeners;
    for (var a = 0; a < t.length; a++) (0, t[a])();
  }
  function Zm(t, a) {
    return a;
  }
  function Jm(t, a) {
    if (Ae) {
      var o = Ue.formState;
      if (o !== null) {
        e: {
          var l = Se;
          if (Ae) {
            if (Xe) {
              t: {
                for (var u = Xe, f = Rn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (((u = yn(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (f = u.data), (u = f === "F!" || f === "F" ? u : null);
              }
              if (u) {
                (Xe = yn(u.nextSibling)), (l = u.data === "F!");
                break e;
              }
            }
            ti(l);
          }
          l = !1;
        }
        l && (a = o[0]);
      }
    }
    return (
      (o = Pt()),
      (o.memoizedState = o.baseState = a),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zm,
        lastRenderedState: a,
      }),
      (o.queue = l),
      (o = bp.bind(null, Se, l)),
      (l.dispatch = o),
      (l = vd(!1)),
      (f = Ed.bind(null, Se, !1, l.queue)),
      (l = Pt()),
      (u = { state: a, dispatch: null, action: t, pending: null }),
      (l.queue = u),
      (o = oO.bind(null, Se, u, f, o)),
      (u.dispatch = o),
      (l.memoizedState = t),
      [a, o, !1]
    );
  }
  function ep(t) {
    var a = nt();
    return tp(a, De, t);
  }
  function tp(t, a, o) {
    if (
      ((a = md(t, a, Zm)[0]),
      (t = ts(Kn)[0]),
      typeof a == "object" && a !== null && typeof a.then == "function")
    )
      try {
        var l = oo(a);
      } catch (v) {
        throw v === eo ? Xl : v;
      }
    else l = a;
    a = nt();
    var u = a.queue,
      f = u.dispatch;
    return (
      o !== a.memoizedState &&
        ((Se.flags |= 2048), Yi(9, ns(), lO.bind(null, u, o), null)),
      [l, f, t]
    );
  }
  function lO(t, a) {
    t.action = a;
  }
  function np(t) {
    var a = nt(),
      o = De;
    if (o !== null) return tp(a, o, t);
    nt(), (a = a.memoizedState), (o = nt());
    var l = o.queue.dispatch;
    return (o.memoizedState = t), [a, l, !1];
  }
  function Yi(t, a, o, l) {
    return (
      (t = { tag: t, create: o, deps: l, inst: a, next: null }),
      (a = Se.updateQueue),
      a === null && ((a = gd()), (Se.updateQueue = a)),
      (o = a.lastEffect),
      o === null
        ? (a.lastEffect = t.next = t)
        : ((l = o.next), (o.next = t), (t.next = l), (a.lastEffect = t)),
      t
    );
  }
  function ns() {
    return { destroy: void 0, resource: void 0 };
  }
  function ap() {
    return nt().memoizedState;
  }
  function as(t, a, o, l) {
    var u = Pt();
    (l = l === void 0 ? null : l),
      (Se.flags |= t),
      (u.memoizedState = Yi(1 | a, ns(), o, l));
  }
  function lo(t, a, o, l) {
    var u = nt();
    l = l === void 0 ? null : l;
    var f = u.memoizedState.inst;
    De !== null && l !== null && sd(l, De.memoizedState.deps)
      ? (u.memoizedState = Yi(a, f, o, l))
      : ((Se.flags |= t), (u.memoizedState = Yi(1 | a, f, o, l)));
  }
  function ip(t, a) {
    as(8390656, 8, t, a);
  }
  function rp(t, a) {
    lo(2048, 8, t, a);
  }
  function op(t, a) {
    return lo(4, 2, t, a);
  }
  function lp(t, a) {
    return lo(4, 4, t, a);
  }
  function sp(t, a) {
    if (typeof a == "function") {
      t = t();
      var o = a(t);
      return function () {
        typeof o == "function" ? o() : a(null);
      };
    }
    if (a != null)
      return (
        (t = t()),
        (a.current = t),
        function () {
          a.current = null;
        }
      );
  }
  function cp(t, a, o) {
    (o = o != null ? o.concat([t]) : null), lo(4, 4, sp.bind(null, a, t), o);
  }
  function yd() {}
  function up(t, a) {
    var o = nt();
    a = a === void 0 ? null : a;
    var l = o.memoizedState;
    return a !== null && sd(a, l[1]) ? l[0] : ((o.memoizedState = [t, a]), t);
  }
  function dp(t, a) {
    var o = nt();
    a = a === void 0 ? null : a;
    var l = o.memoizedState;
    if (a !== null && sd(a, l[1])) return l[0];
    if (((l = t()), ri)) {
      ma(!0);
      try {
        t();
      } finally {
        ma(!1);
      }
    }
    return (o.memoizedState = [l, a]), l;
  }
  function xd(t, a, o) {
    return o === void 0 || (Ca & 1073741824) !== 0
      ? (t.memoizedState = a)
      : ((t.memoizedState = o), (t = hv()), (Se.lanes |= t), (Aa |= t), o);
  }
  function fp(t, a, o, l) {
    return $t(o, a)
      ? o
      : Gi.current !== null
        ? ((t = xd(t, o, l)), $t(t, a) || (ut = !0), t)
        : (Ca & 42) === 0
          ? ((ut = !0), (t.memoizedState = o))
          : ((t = hv()), (Se.lanes |= t), (Aa |= t), a);
  }
  function gp(t, a, o, l, u) {
    var f = F.p;
    F.p = f !== 0 && 8 > f ? f : 8;
    var v = I.T,
      S = {};
    (I.T = S), Ed(t, !1, a, o);
    try {
      var T = u(),
        M = I.S;
      if (
        (M !== null && M(S, T),
        T !== null && typeof T == "object" && typeof T.then == "function")
      ) {
        var q = aO(T, l);
        so(t, a, q, Yt(t));
      } else so(t, a, l, Yt(t));
    } catch (Q) {
      so(t, a, { then: function () {}, status: "rejected", reason: Q }, Yt());
    } finally {
      (F.p = f), (I.T = v);
    }
  }
  function sO() {}
  function Sd(t, a, o, l) {
    if (t.tag !== 5) throw Error(r(476));
    var u = hp(t).queue;
    gp(
      t,
      u,
      a,
      W,
      o === null
        ? sO
        : function () {
            return mp(t), o(l);
          },
    );
  }
  function hp(t) {
    var a = t.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kn,
        lastRenderedState: W,
      },
      next: null,
    };
    var o = {};
    return (
      (a.next = {
        memoizedState: o,
        baseState: o,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Kn,
          lastRenderedState: o,
        },
        next: null,
      }),
      (t.memoizedState = a),
      (t = t.alternate),
      t !== null && (t.memoizedState = a),
      a
    );
  }
  function mp(t) {
    var a = hp(t).next.queue;
    so(t, a, {}, Yt());
  }
  function Cd() {
    return kt(Ro);
  }
  function pp() {
    return nt().memoizedState;
  }
  function vp() {
    return nt().memoizedState;
  }
  function cO(t) {
    for (var a = t.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var o = Yt();
          t = xa(o);
          var l = Sa(a, t, o);
          l !== null && (Xt(l, a, o), no(l, a, o)),
            (a = { cache: Zu() }),
            (t.payload = a);
          return;
      }
      a = a.return;
    }
  }
  function uO(t, a, o) {
    var l = Yt();
    (o = {
      lane: l,
      revertLane: 0,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      is(t)
        ? yp(a, o)
        : ((o = Uu(t, a, o, l)), o !== null && (Xt(o, t, l), xp(o, a, l)));
  }
  function bp(t, a, o) {
    var l = Yt();
    so(t, a, o, l);
  }
  function so(t, a, o, l) {
    var u = {
      lane: l,
      revertLane: 0,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (is(t)) yp(a, u);
    else {
      var f = t.alternate;
      if (
        t.lanes === 0 &&
        (f === null || f.lanes === 0) &&
        ((f = a.lastRenderedReducer), f !== null)
      )
        try {
          var v = a.lastRenderedState,
            S = f(v, o);
          if (((u.hasEagerState = !0), (u.eagerState = S), $t(S, v)))
            return jl(t, a, u, 0), Ue === null && Bl(), !1;
        } catch {
        } finally {
        }
      if (((o = Uu(t, a, u, l)), o !== null))
        return Xt(o, t, l), xp(o, a, l), !0;
    }
    return !1;
  }
  function Ed(t, a, o, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: tf(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      is(t))
    ) {
      if (a) throw Error(r(479));
    } else (a = Uu(t, o, l, 2)), a !== null && Xt(a, t, 2);
  }
  function is(t) {
    var a = t.alternate;
    return t === Se || (a !== null && a === Se);
  }
  function yp(t, a) {
    Wi = Zl = !0;
    var o = t.pending;
    o === null ? (a.next = a) : ((a.next = o.next), (o.next = a)),
      (t.pending = a);
  }
  function xp(t, a, o) {
    if ((o & 4194048) !== 0) {
      var l = a.lanes;
      (l &= t.pendingLanes), (o |= l), (a.lanes = o), Th(t, o);
    }
  }
  var rs = {
      readContext: kt,
      use: es,
      useCallback: Je,
      useContext: Je,
      useEffect: Je,
      useImperativeHandle: Je,
      useLayoutEffect: Je,
      useInsertionEffect: Je,
      useMemo: Je,
      useReducer: Je,
      useRef: Je,
      useState: Je,
      useDebugValue: Je,
      useDeferredValue: Je,
      useTransition: Je,
      useSyncExternalStore: Je,
      useId: Je,
      useHostTransitionStatus: Je,
      useFormState: Je,
      useActionState: Je,
      useOptimistic: Je,
      useMemoCache: Je,
      useCacheRefresh: Je,
    },
    Sp = {
      readContext: kt,
      use: es,
      useCallback: function (t, a) {
        return (Pt().memoizedState = [t, a === void 0 ? null : a]), t;
      },
      useContext: kt,
      useEffect: ip,
      useImperativeHandle: function (t, a, o) {
        (o = o != null ? o.concat([t]) : null),
          as(4194308, 4, sp.bind(null, a, t), o);
      },
      useLayoutEffect: function (t, a) {
        return as(4194308, 4, t, a);
      },
      useInsertionEffect: function (t, a) {
        as(4, 2, t, a);
      },
      useMemo: function (t, a) {
        var o = Pt();
        a = a === void 0 ? null : a;
        var l = t();
        if (ri) {
          ma(!0);
          try {
            t();
          } finally {
            ma(!1);
          }
        }
        return (o.memoizedState = [l, a]), l;
      },
      useReducer: function (t, a, o) {
        var l = Pt();
        if (o !== void 0) {
          var u = o(a);
          if (ri) {
            ma(!0);
            try {
              o(a);
            } finally {
              ma(!1);
            }
          }
        } else u = a;
        return (
          (l.memoizedState = l.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (l.queue = t),
          (t = t.dispatch = uO.bind(null, Se, t)),
          [l.memoizedState, t]
        );
      },
      useRef: function (t) {
        var a = Pt();
        return (t = { current: t }), (a.memoizedState = t);
      },
      useState: function (t) {
        t = vd(t);
        var a = t.queue,
          o = bp.bind(null, Se, a);
        return (a.dispatch = o), [t.memoizedState, o];
      },
      useDebugValue: yd,
      useDeferredValue: function (t, a) {
        var o = Pt();
        return xd(o, t, a);
      },
      useTransition: function () {
        var t = vd(!1);
        return (
          (t = gp.bind(null, Se, t.queue, !0, !1)),
          (Pt().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, a, o) {
        var l = Se,
          u = Pt();
        if (Ae) {
          if (o === void 0) throw Error(r(407));
          o = o();
        } else {
          if (((o = a()), Ue === null)) throw Error(r(349));
          (Re & 124) !== 0 || Um(l, a, o);
        }
        u.memoizedState = o;
        var f = { value: o, getSnapshot: a };
        return (
          (u.queue = f),
          ip(Fm.bind(null, l, f, t), [t]),
          (l.flags |= 2048),
          Yi(9, ns(), $m.bind(null, l, f, o, a), null),
          o
        );
      },
      useId: function () {
        var t = Pt(),
          a = Ue.identifierPrefix;
        if (Ae) {
          var o = qn,
            l = Wn;
          (o = (l & ~(1 << (32 - Ut(l) - 1))).toString(32) + o),
            (a = "«" + a + "R" + o),
            (o = Jl++),
            0 < o && (a += "H" + o.toString(32)),
            (a += "»");
        } else (o = iO++), (a = "«" + a + "r" + o.toString(32) + "»");
        return (t.memoizedState = a);
      },
      useHostTransitionStatus: Cd,
      useFormState: Jm,
      useActionState: Jm,
      useOptimistic: function (t) {
        var a = Pt();
        a.memoizedState = a.baseState = t;
        var o = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (a.queue = o),
          (a = Ed.bind(null, Se, !0, o)),
          (o.dispatch = a),
          [t, a]
        );
      },
      useMemoCache: hd,
      useCacheRefresh: function () {
        return (Pt().memoizedState = cO.bind(null, Se));
      },
    },
    Cp = {
      readContext: kt,
      use: es,
      useCallback: up,
      useContext: kt,
      useEffect: rp,
      useImperativeHandle: cp,
      useInsertionEffect: op,
      useLayoutEffect: lp,
      useMemo: dp,
      useReducer: ts,
      useRef: ap,
      useState: function () {
        return ts(Kn);
      },
      useDebugValue: yd,
      useDeferredValue: function (t, a) {
        var o = nt();
        return fp(o, De.memoizedState, t, a);
      },
      useTransition: function () {
        var t = ts(Kn)[0],
          a = nt().memoizedState;
        return [typeof t == "boolean" ? t : oo(t), a];
      },
      useSyncExternalStore: jm,
      useId: pp,
      useHostTransitionStatus: Cd,
      useFormState: ep,
      useActionState: ep,
      useOptimistic: function (t, a) {
        var o = nt();
        return qm(o, De, t, a);
      },
      useMemoCache: hd,
      useCacheRefresh: vp,
    },
    dO = {
      readContext: kt,
      use: es,
      useCallback: up,
      useContext: kt,
      useEffect: rp,
      useImperativeHandle: cp,
      useInsertionEffect: op,
      useLayoutEffect: lp,
      useMemo: dp,
      useReducer: pd,
      useRef: ap,
      useState: function () {
        return pd(Kn);
      },
      useDebugValue: yd,
      useDeferredValue: function (t, a) {
        var o = nt();
        return De === null ? xd(o, t, a) : fp(o, De.memoizedState, t, a);
      },
      useTransition: function () {
        var t = pd(Kn)[0],
          a = nt().memoizedState;
        return [typeof t == "boolean" ? t : oo(t), a];
      },
      useSyncExternalStore: jm,
      useId: pp,
      useHostTransitionStatus: Cd,
      useFormState: np,
      useActionState: np,
      useOptimistic: function (t, a) {
        var o = nt();
        return De !== null
          ? qm(o, De, t, a)
          : ((o.baseState = t), [t, o.queue.dispatch]);
      },
      useMemoCache: hd,
      useCacheRefresh: vp,
    },
    Xi = null,
    co = 0;
  function os(t) {
    var a = co;
    return (co += 1), Xi === null && (Xi = []), Im(Xi, t, a);
  }
  function uo(t, a) {
    (a = a.props.ref), (t.ref = a !== void 0 ? a : null);
  }
  function ls(t, a) {
    throw a.$$typeof === y
      ? Error(r(525))
      : ((t = Object.prototype.toString.call(a)),
        Error(
          r(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(a).join(", ") + "}"
              : t,
          ),
        ));
  }
  function Ep(t) {
    var a = t._init;
    return a(t._payload);
  }
  function Op(t) {
    function a(P, N) {
      if (t) {
        var D = P.deletions;
        D === null ? ((P.deletions = [N]), (P.flags |= 16)) : D.push(N);
      }
    }
    function o(P, N) {
      if (!t) return null;
      for (; N !== null; ) a(P, N), (N = N.sibling);
      return null;
    }
    function l(P) {
      for (var N = new Map(); P !== null; )
        P.key !== null ? N.set(P.key, P) : N.set(P.index, P), (P = P.sibling);
      return N;
    }
    function u(P, N) {
      return (P = Gn(P, N)), (P.index = 0), (P.sibling = null), P;
    }
    function f(P, N, D) {
      return (
        (P.index = D),
        t
          ? ((D = P.alternate),
            D !== null
              ? ((D = D.index), D < N ? ((P.flags |= 67108866), N) : D)
              : ((P.flags |= 67108866), N))
          : ((P.flags |= 1048576), N)
      );
    }
    function v(P) {
      return t && P.alternate === null && (P.flags |= 67108866), P;
    }
    function S(P, N, D, X) {
      return N === null || N.tag !== 6
        ? ((N = Fu(D, P.mode, X)), (N.return = P), N)
        : ((N = u(N, D)), (N.return = P), N);
    }
    function T(P, N, D, X) {
      var oe = D.type;
      return oe === C
        ? q(P, N, D.props.children, X, D.key)
        : N !== null &&
            (N.elementType === oe ||
              (typeof oe == "object" &&
                oe !== null &&
                oe.$$typeof === j &&
                Ep(oe) === N.type))
          ? ((N = u(N, D.props)), uo(N, D), (N.return = P), N)
          : ((N = $l(D.type, D.key, D.props, null, P.mode, X)),
            uo(N, D),
            (N.return = P),
            N);
    }
    function M(P, N, D, X) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== D.containerInfo ||
        N.stateNode.implementation !== D.implementation
        ? ((N = Gu(D, P.mode, X)), (N.return = P), N)
        : ((N = u(N, D.children || [])), (N.return = P), N);
    }
    function q(P, N, D, X, oe) {
      return N === null || N.tag !== 7
        ? ((N = Qa(D, P.mode, X, oe)), (N.return = P), N)
        : ((N = u(N, D)), (N.return = P), N);
    }
    function Q(P, N, D) {
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return (N = Fu("" + N, P.mode, D)), (N.return = P), N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case b:
            return (
              (D = $l(N.type, N.key, N.props, null, P.mode, D)),
              uo(D, N),
              (D.return = P),
              D
            );
          case x:
            return (N = Gu(N, P.mode, D)), (N.return = P), N;
          case j:
            var X = N._init;
            return (N = X(N._payload)), Q(P, N, D);
        }
        if (J(N) || ne(N))
          return (N = Qa(N, P.mode, D, null)), (N.return = P), N;
        if (typeof N.then == "function") return Q(P, os(N), D);
        if (N.$$typeof === z) return Q(P, ql(P, N), D);
        ls(P, N);
      }
      return null;
    }
    function L(P, N, D, X) {
      var oe = N !== null ? N.key : null;
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return oe !== null ? null : S(P, N, "" + D, X);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case b:
            return D.key === oe ? T(P, N, D, X) : null;
          case x:
            return D.key === oe ? M(P, N, D, X) : null;
          case j:
            return (oe = D._init), (D = oe(D._payload)), L(P, N, D, X);
        }
        if (J(D) || ne(D)) return oe !== null ? null : q(P, N, D, X, null);
        if (typeof D.then == "function") return L(P, N, os(D), X);
        if (D.$$typeof === z) return L(P, N, ql(P, D), X);
        ls(P, D);
      }
      return null;
    }
    function H(P, N, D, X, oe) {
      if (
        (typeof X == "string" && X !== "") ||
        typeof X == "number" ||
        typeof X == "bigint"
      )
        return (P = P.get(D) || null), S(N, P, "" + X, oe);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case b:
            return (
              (P = P.get(X.key === null ? D : X.key) || null), T(N, P, X, oe)
            );
          case x:
            return (
              (P = P.get(X.key === null ? D : X.key) || null), M(N, P, X, oe)
            );
          case j:
            var Oe = X._init;
            return (X = Oe(X._payload)), H(P, N, D, X, oe);
        }
        if (J(X) || ne(X)) return (P = P.get(D) || null), q(N, P, X, oe, null);
        if (typeof X.then == "function") return H(P, N, D, os(X), oe);
        if (X.$$typeof === z) return H(P, N, D, ql(N, X), oe);
        ls(N, X);
      }
      return null;
    }
    function de(P, N, D, X) {
      for (
        var oe = null, Oe = null, se = N, ue = (N = 0), ft = null;
        se !== null && ue < D.length;
        ue++
      ) {
        se.index > ue ? ((ft = se), (se = null)) : (ft = se.sibling);
        var Te = L(P, se, D[ue], X);
        if (Te === null) {
          se === null && (se = ft);
          break;
        }
        t && se && Te.alternate === null && a(P, se),
          (N = f(Te, N, ue)),
          Oe === null ? (oe = Te) : (Oe.sibling = Te),
          (Oe = Te),
          (se = ft);
      }
      if (ue === D.length) return o(P, se), Ae && Ja(P, ue), oe;
      if (se === null) {
        for (; ue < D.length; ue++)
          (se = Q(P, D[ue], X)),
            se !== null &&
              ((N = f(se, N, ue)),
              Oe === null ? (oe = se) : (Oe.sibling = se),
              (Oe = se));
        return Ae && Ja(P, ue), oe;
      }
      for (se = l(se); ue < D.length; ue++)
        (ft = H(se, P, ue, D[ue], X)),
          ft !== null &&
            (t &&
              ft.alternate !== null &&
              se.delete(ft.key === null ? ue : ft.key),
            (N = f(ft, N, ue)),
            Oe === null ? (oe = ft) : (Oe.sibling = ft),
            (Oe = ft));
      return (
        t &&
          se.forEach(function (La) {
            return a(P, La);
          }),
        Ae && Ja(P, ue),
        oe
      );
    }
    function ce(P, N, D, X) {
      if (D == null) throw Error(r(151));
      for (
        var oe = null,
          Oe = null,
          se = N,
          ue = (N = 0),
          ft = null,
          Te = D.next();
        se !== null && !Te.done;
        ue++, Te = D.next()
      ) {
        se.index > ue ? ((ft = se), (se = null)) : (ft = se.sibling);
        var La = L(P, se, Te.value, X);
        if (La === null) {
          se === null && (se = ft);
          break;
        }
        t && se && La.alternate === null && a(P, se),
          (N = f(La, N, ue)),
          Oe === null ? (oe = La) : (Oe.sibling = La),
          (Oe = La),
          (se = ft);
      }
      if (Te.done) return o(P, se), Ae && Ja(P, ue), oe;
      if (se === null) {
        for (; !Te.done; ue++, Te = D.next())
          (Te = Q(P, Te.value, X)),
            Te !== null &&
              ((N = f(Te, N, ue)),
              Oe === null ? (oe = Te) : (Oe.sibling = Te),
              (Oe = Te));
        return Ae && Ja(P, ue), oe;
      }
      for (se = l(se); !Te.done; ue++, Te = D.next())
        (Te = H(se, P, ue, Te.value, X)),
          Te !== null &&
            (t &&
              Te.alternate !== null &&
              se.delete(Te.key === null ? ue : Te.key),
            (N = f(Te, N, ue)),
            Oe === null ? (oe = Te) : (Oe.sibling = Te),
            (Oe = Te));
      return (
        t &&
          se.forEach(function (fw) {
            return a(P, fw);
          }),
        Ae && Ja(P, ue),
        oe
      );
    }
    function Le(P, N, D, X) {
      if (
        (typeof D == "object" &&
          D !== null &&
          D.type === C &&
          D.key === null &&
          (D = D.props.children),
        typeof D == "object" && D !== null)
      ) {
        switch (D.$$typeof) {
          case b:
            e: {
              for (var oe = D.key; N !== null; ) {
                if (N.key === oe) {
                  if (((oe = D.type), oe === C)) {
                    if (N.tag === 7) {
                      o(P, N.sibling),
                        (X = u(N, D.props.children)),
                        (X.return = P),
                        (P = X);
                      break e;
                    }
                  } else if (
                    N.elementType === oe ||
                    (typeof oe == "object" &&
                      oe !== null &&
                      oe.$$typeof === j &&
                      Ep(oe) === N.type)
                  ) {
                    o(P, N.sibling),
                      (X = u(N, D.props)),
                      uo(X, D),
                      (X.return = P),
                      (P = X);
                    break e;
                  }
                  o(P, N);
                  break;
                } else a(P, N);
                N = N.sibling;
              }
              D.type === C
                ? ((X = Qa(D.props.children, P.mode, X, D.key)),
                  (X.return = P),
                  (P = X))
                : ((X = $l(D.type, D.key, D.props, null, P.mode, X)),
                  uo(X, D),
                  (X.return = P),
                  (P = X));
            }
            return v(P);
          case x:
            e: {
              for (oe = D.key; N !== null; ) {
                if (N.key === oe)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === D.containerInfo &&
                    N.stateNode.implementation === D.implementation
                  ) {
                    o(P, N.sibling),
                      (X = u(N, D.children || [])),
                      (X.return = P),
                      (P = X);
                    break e;
                  } else {
                    o(P, N);
                    break;
                  }
                else a(P, N);
                N = N.sibling;
              }
              (X = Gu(D, P.mode, X)), (X.return = P), (P = X);
            }
            return v(P);
          case j:
            return (oe = D._init), (D = oe(D._payload)), Le(P, N, D, X);
        }
        if (J(D)) return de(P, N, D, X);
        if (ne(D)) {
          if (((oe = ne(D)), typeof oe != "function")) throw Error(r(150));
          return (D = oe.call(D)), ce(P, N, D, X);
        }
        if (typeof D.then == "function") return Le(P, N, os(D), X);
        if (D.$$typeof === z) return Le(P, N, ql(P, D), X);
        ls(P, D);
      }
      return (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
        ? ((D = "" + D),
          N !== null && N.tag === 6
            ? (o(P, N.sibling), (X = u(N, D)), (X.return = P), (P = X))
            : (o(P, N), (X = Fu(D, P.mode, X)), (X.return = P), (P = X)),
          v(P))
        : o(P, N);
    }
    return function (P, N, D, X) {
      try {
        co = 0;
        var oe = Le(P, N, D, X);
        return (Xi = null), oe;
      } catch (se) {
        if (se === eo || se === Xl) throw se;
        var Oe = Ft(29, se, null, P.mode);
        return (Oe.lanes = X), (Oe.return = P), Oe;
      } finally {
      }
    };
  }
  var Ki = Op(!0),
    wp = Op(!1),
    cn = G(null),
    Tn = null;
  function Ea(t) {
    var a = t.alternate;
    ae(lt, lt.current & 1),
      ae(cn, t),
      Tn === null &&
        (a === null || Gi.current !== null || a.memoizedState !== null) &&
        (Tn = t);
  }
  function kp(t) {
    if (t.tag === 22) {
      if ((ae(lt, lt.current), ae(cn, t), Tn === null)) {
        var a = t.alternate;
        a !== null && a.memoizedState !== null && (Tn = t);
      }
    } else Oa();
  }
  function Oa() {
    ae(lt, lt.current), ae(cn, cn.current);
  }
  function Qn(t) {
    te(cn), Tn === t && (Tn = null), te(lt);
  }
  var lt = G(0);
  function ss(t) {
    for (var a = t; a !== null; ) {
      if (a.tag === 13) {
        var o = a.memoizedState;
        if (
          o !== null &&
          ((o = o.dehydrated), o === null || o.data === "$?" || hf(o))
        )
          return a;
      } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        (a.child.return = a), (a = a.child);
        continue;
      }
      if (a === t) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === t) return null;
        a = a.return;
      }
      (a.sibling.return = a.return), (a = a.sibling);
    }
    return null;
  }
  function Od(t, a, o, l) {
    (a = t.memoizedState),
      (o = o(l, a)),
      (o = o == null ? a : p({}, a, o)),
      (t.memoizedState = o),
      t.lanes === 0 && (t.updateQueue.baseState = o);
  }
  var wd = {
    enqueueSetState: function (t, a, o) {
      t = t._reactInternals;
      var l = Yt(),
        u = xa(l);
      (u.payload = a),
        o != null && (u.callback = o),
        (a = Sa(t, u, l)),
        a !== null && (Xt(a, t, l), no(a, t, l));
    },
    enqueueReplaceState: function (t, a, o) {
      t = t._reactInternals;
      var l = Yt(),
        u = xa(l);
      (u.tag = 1),
        (u.payload = a),
        o != null && (u.callback = o),
        (a = Sa(t, u, l)),
        a !== null && (Xt(a, t, l), no(a, t, l));
    },
    enqueueForceUpdate: function (t, a) {
      t = t._reactInternals;
      var o = Yt(),
        l = xa(o);
      (l.tag = 2),
        a != null && (l.callback = a),
        (a = Sa(t, l, o)),
        a !== null && (Xt(a, t, o), no(a, t, o));
    },
  };
  function Rp(t, a, o, l, u, f, v) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(l, f, v)
        : a.prototype && a.prototype.isPureReactComponent
          ? !Wr(o, l) || !Wr(u, f)
          : !0
    );
  }
  function Tp(t, a, o, l) {
    (t = a.state),
      typeof a.componentWillReceiveProps == "function" &&
        a.componentWillReceiveProps(o, l),
      typeof a.UNSAFE_componentWillReceiveProps == "function" &&
        a.UNSAFE_componentWillReceiveProps(o, l),
      a.state !== t && wd.enqueueReplaceState(a, a.state, null);
  }
  function oi(t, a) {
    var o = a;
    if ("ref" in a) {
      o = {};
      for (var l in a) l !== "ref" && (o[l] = a[l]);
    }
    if ((t = t.defaultProps)) {
      o === a && (o = p({}, o));
      for (var u in t) o[u] === void 0 && (o[u] = t[u]);
    }
    return o;
  }
  var cs =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var a = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(a)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function Ap(t) {
    cs(t);
  }
  function zp(t) {
    console.error(t);
  }
  function _p(t) {
    cs(t);
  }
  function us(t, a) {
    try {
      var o = t.onUncaughtError;
      o(a.value, { componentStack: a.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Np(t, a, o) {
    try {
      var l = t.onCaughtError;
      l(o.value, {
        componentStack: o.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function kd(t, a, o) {
    return (
      (o = xa(o)),
      (o.tag = 3),
      (o.payload = { element: null }),
      (o.callback = function () {
        us(t, a);
      }),
      o
    );
  }
  function Ip(t) {
    return (t = xa(t)), (t.tag = 3), t;
  }
  function Pp(t, a, o, l) {
    var u = o.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = l.value;
      (t.payload = function () {
        return u(f);
      }),
        (t.callback = function () {
          Np(a, o, l);
        });
    }
    var v = o.stateNode;
    v !== null &&
      typeof v.componentDidCatch == "function" &&
      (t.callback = function () {
        Np(a, o, l),
          typeof u != "function" &&
            (za === null ? (za = new Set([this])) : za.add(this));
        var S = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: S !== null ? S : "",
        });
      });
  }
  function fO(t, a, o, l, u) {
    if (
      ((o.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((a = o.alternate),
        a !== null && Qr(a, o, u, !0),
        (o = cn.current),
        o !== null)
      ) {
        switch (o.tag) {
          case 13:
            return (
              Tn === null ? Kd() : o.alternate === null && Ke === 0 && (Ke = 3),
              (o.flags &= -257),
              (o.flags |= 65536),
              (o.lanes = u),
              l === td
                ? (o.flags |= 16384)
                : ((a = o.updateQueue),
                  a === null ? (o.updateQueue = new Set([l])) : a.add(l),
                  Zd(t, l, u)),
              !1
            );
          case 22:
            return (
              (o.flags |= 65536),
              l === td
                ? (o.flags |= 16384)
                : ((a = o.updateQueue),
                  a === null
                    ? ((a = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (o.updateQueue = a))
                    : ((o = a.retryQueue),
                      o === null ? (a.retryQueue = new Set([l])) : o.add(l)),
                  Zd(t, l, u)),
              !1
            );
        }
        throw Error(r(435, o.tag));
      }
      return Zd(t, l, u), Kd(), !1;
    }
    if (Ae)
      return (
        (a = cn.current),
        a !== null
          ? ((a.flags & 65536) === 0 && (a.flags |= 256),
            (a.flags |= 65536),
            (a.lanes = u),
            l !== Yu && ((t = Error(r(422), { cause: l })), Kr(rn(t, o))))
          : (l !== Yu && ((a = Error(r(423), { cause: l })), Kr(rn(a, o))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (l = rn(l, o)),
            (u = kd(t.stateNode, l, u)),
            id(t, u),
            Ke !== 4 && (Ke = 2)),
        !1
      );
    var f = Error(r(520), { cause: l });
    if (
      ((f = rn(f, o)),
      bo === null ? (bo = [f]) : bo.push(f),
      Ke !== 4 && (Ke = 2),
      a === null)
    )
      return !0;
    (l = rn(l, o)), (o = a);
    do {
      switch (o.tag) {
        case 3:
          return (
            (o.flags |= 65536),
            (t = u & -u),
            (o.lanes |= t),
            (t = kd(o.stateNode, l, t)),
            id(o, t),
            !1
          );
        case 1:
          if (
            ((a = o.type),
            (f = o.stateNode),
            (o.flags & 128) === 0 &&
              (typeof a.getDerivedStateFromError == "function" ||
                (f !== null &&
                  typeof f.componentDidCatch == "function" &&
                  (za === null || !za.has(f)))))
          )
            return (
              (o.flags |= 65536),
              (u &= -u),
              (o.lanes |= u),
              (u = Ip(u)),
              Pp(u, t, o, l),
              id(o, u),
              !1
            );
      }
      o = o.return;
    } while (o !== null);
    return !1;
  }
  var Vp = Error(r(461)),
    ut = !1;
  function pt(t, a, o, l) {
    a.child = t === null ? wp(a, null, o, l) : Ki(a, t.child, o, l);
  }
  function Dp(t, a, o, l, u) {
    o = o.render;
    var f = a.ref;
    if ("ref" in l) {
      var v = {};
      for (var S in l) S !== "ref" && (v[S] = l[S]);
    } else v = l;
    return (
      ai(a),
      (l = cd(t, a, o, v, f, u)),
      (S = ud()),
      t !== null && !ut
        ? (dd(t, a, u), Zn(t, a, u))
        : (Ae && S && Wu(a), (a.flags |= 1), pt(t, a, l, u), a.child)
    );
  }
  function Mp(t, a, o, l, u) {
    if (t === null) {
      var f = o.type;
      return typeof f == "function" &&
        !$u(f) &&
        f.defaultProps === void 0 &&
        o.compare === null
        ? ((a.tag = 15), (a.type = f), Lp(t, a, f, l, u))
        : ((t = $l(o.type, null, l, a, a.mode, u)),
          (t.ref = a.ref),
          (t.return = a),
          (a.child = t));
    }
    if (((f = t.child), !Pd(t, u))) {
      var v = f.memoizedProps;
      if (
        ((o = o.compare), (o = o !== null ? o : Wr), o(v, l) && t.ref === a.ref)
      )
        return Zn(t, a, u);
    }
    return (
      (a.flags |= 1),
      (t = Gn(f, l)),
      (t.ref = a.ref),
      (t.return = a),
      (a.child = t)
    );
  }
  function Lp(t, a, o, l, u) {
    if (t !== null) {
      var f = t.memoizedProps;
      if (Wr(f, l) && t.ref === a.ref)
        if (((ut = !1), (a.pendingProps = l = f), Pd(t, u)))
          (t.flags & 131072) !== 0 && (ut = !0);
        else return (a.lanes = t.lanes), Zn(t, a, u);
    }
    return Rd(t, a, o, l, u);
  }
  function Hp(t, a, o) {
    var l = a.pendingProps,
      u = l.children,
      f = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (((l = f !== null ? f.baseLanes | o : o), t !== null)) {
          for (u = a.child = t.child, f = 0; u !== null; )
            (f = f | u.lanes | u.childLanes), (u = u.sibling);
          a.childLanes = f & ~l;
        } else (a.childLanes = 0), (a.child = null);
        return Bp(t, a, l, o);
      }
      if ((o & 536870912) !== 0)
        (a.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Yl(a, f !== null ? f.cachePool : null),
          f !== null ? Lm(a, f) : od(),
          kp(a);
      else
        return (
          (a.lanes = a.childLanes = 536870912),
          Bp(t, a, f !== null ? f.baseLanes | o : o, o)
        );
    } else
      f !== null
        ? (Yl(a, f.cachePool), Lm(a, f), Oa(), (a.memoizedState = null))
        : (t !== null && Yl(a, null), od(), Oa());
    return pt(t, a, u, o), a.child;
  }
  function Bp(t, a, o, l) {
    var u = ed();
    return (
      (u = u === null ? null : { parent: ot._currentValue, pool: u }),
      (a.memoizedState = { baseLanes: o, cachePool: u }),
      t !== null && Yl(a, null),
      od(),
      kp(a),
      t !== null && Qr(t, a, l, !0),
      null
    );
  }
  function ds(t, a) {
    var o = a.ref;
    if (o === null) t !== null && t.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof o != "function" && typeof o != "object") throw Error(r(284));
      (t === null || t.ref !== o) && (a.flags |= 4194816);
    }
  }
  function Rd(t, a, o, l, u) {
    return (
      ai(a),
      (o = cd(t, a, o, l, void 0, u)),
      (l = ud()),
      t !== null && !ut
        ? (dd(t, a, u), Zn(t, a, u))
        : (Ae && l && Wu(a), (a.flags |= 1), pt(t, a, o, u), a.child)
    );
  }
  function jp(t, a, o, l, u, f) {
    return (
      ai(a),
      (a.updateQueue = null),
      (o = Bm(a, l, o, u)),
      Hm(t),
      (l = ud()),
      t !== null && !ut
        ? (dd(t, a, f), Zn(t, a, f))
        : (Ae && l && Wu(a), (a.flags |= 1), pt(t, a, o, f), a.child)
    );
  }
  function Up(t, a, o, l, u) {
    if ((ai(a), a.stateNode === null)) {
      var f = Bi,
        v = o.contextType;
      typeof v == "object" && v !== null && (f = kt(v)),
        (f = new o(l, f)),
        (a.memoizedState =
          f.state !== null && f.state !== void 0 ? f.state : null),
        (f.updater = wd),
        (a.stateNode = f),
        (f._reactInternals = a),
        (f = a.stateNode),
        (f.props = l),
        (f.state = a.memoizedState),
        (f.refs = {}),
        nd(a),
        (v = o.contextType),
        (f.context = typeof v == "object" && v !== null ? kt(v) : Bi),
        (f.state = a.memoizedState),
        (v = o.getDerivedStateFromProps),
        typeof v == "function" && (Od(a, o, v, l), (f.state = a.memoizedState)),
        typeof o.getDerivedStateFromProps == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function" ||
          (typeof f.UNSAFE_componentWillMount != "function" &&
            typeof f.componentWillMount != "function") ||
          ((v = f.state),
          typeof f.componentWillMount == "function" && f.componentWillMount(),
          typeof f.UNSAFE_componentWillMount == "function" &&
            f.UNSAFE_componentWillMount(),
          v !== f.state && wd.enqueueReplaceState(f, f.state, null),
          io(a, l, f, u),
          ao(),
          (f.state = a.memoizedState)),
        typeof f.componentDidMount == "function" && (a.flags |= 4194308),
        (l = !0);
    } else if (t === null) {
      f = a.stateNode;
      var S = a.memoizedProps,
        T = oi(o, S);
      f.props = T;
      var M = f.context,
        q = o.contextType;
      (v = Bi), typeof q == "object" && q !== null && (v = kt(q));
      var Q = o.getDerivedStateFromProps;
      (q =
        typeof Q == "function" ||
        typeof f.getSnapshotBeforeUpdate == "function"),
        (S = a.pendingProps !== S),
        q ||
          (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
            typeof f.componentWillReceiveProps != "function") ||
          ((S || M !== v) && Tp(a, f, l, v)),
        (ya = !1);
      var L = a.memoizedState;
      (f.state = L),
        io(a, l, f, u),
        ao(),
        (M = a.memoizedState),
        S || L !== M || ya
          ? (typeof Q == "function" && (Od(a, o, Q, l), (M = a.memoizedState)),
            (T = ya || Rp(a, o, T, l, L, M, v))
              ? (q ||
                  (typeof f.UNSAFE_componentWillMount != "function" &&
                    typeof f.componentWillMount != "function") ||
                  (typeof f.componentWillMount == "function" &&
                    f.componentWillMount(),
                  typeof f.UNSAFE_componentWillMount == "function" &&
                    f.UNSAFE_componentWillMount()),
                typeof f.componentDidMount == "function" &&
                  (a.flags |= 4194308))
              : (typeof f.componentDidMount == "function" &&
                  (a.flags |= 4194308),
                (a.memoizedProps = l),
                (a.memoizedState = M)),
            (f.props = l),
            (f.state = M),
            (f.context = v),
            (l = T))
          : (typeof f.componentDidMount == "function" && (a.flags |= 4194308),
            (l = !1));
    } else {
      (f = a.stateNode),
        ad(t, a),
        (v = a.memoizedProps),
        (q = oi(o, v)),
        (f.props = q),
        (Q = a.pendingProps),
        (L = f.context),
        (M = o.contextType),
        (T = Bi),
        typeof M == "object" && M !== null && (T = kt(M)),
        (S = o.getDerivedStateFromProps),
        (M =
          typeof S == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function") ||
          (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
            typeof f.componentWillReceiveProps != "function") ||
          ((v !== Q || L !== T) && Tp(a, f, l, T)),
        (ya = !1),
        (L = a.memoizedState),
        (f.state = L),
        io(a, l, f, u),
        ao();
      var H = a.memoizedState;
      v !== Q ||
      L !== H ||
      ya ||
      (t !== null && t.dependencies !== null && Wl(t.dependencies))
        ? (typeof S == "function" && (Od(a, o, S, l), (H = a.memoizedState)),
          (q =
            ya ||
            Rp(a, o, q, l, L, H, T) ||
            (t !== null && t.dependencies !== null && Wl(t.dependencies)))
            ? (M ||
                (typeof f.UNSAFE_componentWillUpdate != "function" &&
                  typeof f.componentWillUpdate != "function") ||
                (typeof f.componentWillUpdate == "function" &&
                  f.componentWillUpdate(l, H, T),
                typeof f.UNSAFE_componentWillUpdate == "function" &&
                  f.UNSAFE_componentWillUpdate(l, H, T)),
              typeof f.componentDidUpdate == "function" && (a.flags |= 4),
              typeof f.getSnapshotBeforeUpdate == "function" &&
                (a.flags |= 1024))
            : (typeof f.componentDidUpdate != "function" ||
                (v === t.memoizedProps && L === t.memoizedState) ||
                (a.flags |= 4),
              typeof f.getSnapshotBeforeUpdate != "function" ||
                (v === t.memoizedProps && L === t.memoizedState) ||
                (a.flags |= 1024),
              (a.memoizedProps = l),
              (a.memoizedState = H)),
          (f.props = l),
          (f.state = H),
          (f.context = T),
          (l = q))
        : (typeof f.componentDidUpdate != "function" ||
            (v === t.memoizedProps && L === t.memoizedState) ||
            (a.flags |= 4),
          typeof f.getSnapshotBeforeUpdate != "function" ||
            (v === t.memoizedProps && L === t.memoizedState) ||
            (a.flags |= 1024),
          (l = !1));
    }
    return (
      (f = l),
      ds(t, a),
      (l = (a.flags & 128) !== 0),
      f || l
        ? ((f = a.stateNode),
          (o =
            l && typeof o.getDerivedStateFromError != "function"
              ? null
              : f.render()),
          (a.flags |= 1),
          t !== null && l
            ? ((a.child = Ki(a, t.child, null, u)),
              (a.child = Ki(a, null, o, u)))
            : pt(t, a, o, u),
          (a.memoizedState = f.state),
          (t = a.child))
        : (t = Zn(t, a, u)),
      t
    );
  }
  function $p(t, a, o, l) {
    return Xr(), (a.flags |= 256), pt(t, a, o, l), a.child;
  }
  var Td = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Ad(t) {
    return { baseLanes: t, cachePool: zm() };
  }
  function zd(t, a, o) {
    return (t = t !== null ? t.childLanes & ~o : 0), a && (t |= un), t;
  }
  function Fp(t, a, o) {
    var l = a.pendingProps,
      u = !1,
      f = (a.flags & 128) !== 0,
      v;
    if (
      ((v = f) ||
        (v =
          t !== null && t.memoizedState === null ? !1 : (lt.current & 2) !== 0),
      v && ((u = !0), (a.flags &= -129)),
      (v = (a.flags & 32) !== 0),
      (a.flags &= -33),
      t === null)
    ) {
      if (Ae) {
        if ((u ? Ea(a) : Oa(), Ae)) {
          var S = Xe,
            T;
          if ((T = S)) {
            e: {
              for (T = S, S = Rn; T.nodeType !== 8; ) {
                if (!S) {
                  S = null;
                  break e;
                }
                if (((T = yn(T.nextSibling)), T === null)) {
                  S = null;
                  break e;
                }
              }
              S = T;
            }
            S !== null
              ? ((a.memoizedState = {
                  dehydrated: S,
                  treeContext: Za !== null ? { id: Wn, overflow: qn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (T = Ft(18, null, null, 0)),
                (T.stateNode = S),
                (T.return = a),
                (a.child = T),
                (zt = a),
                (Xe = null),
                (T = !0))
              : (T = !1);
          }
          T || ti(a);
        }
        if (
          ((S = a.memoizedState),
          S !== null && ((S = S.dehydrated), S !== null))
        )
          return hf(S) ? (a.lanes = 32) : (a.lanes = 536870912), null;
        Qn(a);
      }
      return (
        (S = l.children),
        (l = l.fallback),
        u
          ? (Oa(),
            (u = a.mode),
            (S = fs({ mode: "hidden", children: S }, u)),
            (l = Qa(l, u, o, null)),
            (S.return = a),
            (l.return = a),
            (S.sibling = l),
            (a.child = S),
            (u = a.child),
            (u.memoizedState = Ad(o)),
            (u.childLanes = zd(t, v, o)),
            (a.memoizedState = Td),
            l)
          : (Ea(a), _d(a, S))
      );
    }
    if (
      ((T = t.memoizedState), T !== null && ((S = T.dehydrated), S !== null))
    ) {
      if (f)
        a.flags & 256
          ? (Ea(a), (a.flags &= -257), (a = Nd(t, a, o)))
          : a.memoizedState !== null
            ? (Oa(), (a.child = t.child), (a.flags |= 128), (a = null))
            : (Oa(),
              (u = l.fallback),
              (S = a.mode),
              (l = fs({ mode: "visible", children: l.children }, S)),
              (u = Qa(u, S, o, null)),
              (u.flags |= 2),
              (l.return = a),
              (u.return = a),
              (l.sibling = u),
              (a.child = l),
              Ki(a, t.child, null, o),
              (l = a.child),
              (l.memoizedState = Ad(o)),
              (l.childLanes = zd(t, v, o)),
              (a.memoizedState = Td),
              (a = u));
      else if ((Ea(a), hf(S))) {
        if (((v = S.nextSibling && S.nextSibling.dataset), v)) var M = v.dgst;
        (v = M),
          (l = Error(r(419))),
          (l.stack = ""),
          (l.digest = v),
          Kr({ value: l, source: null, stack: null }),
          (a = Nd(t, a, o));
      } else if (
        (ut || Qr(t, a, o, !1), (v = (o & t.childLanes) !== 0), ut || v)
      ) {
        if (
          ((v = Ue),
          v !== null &&
            ((l = o & -o),
            (l = (l & 42) !== 0 ? 1 : hu(l)),
            (l = (l & (v.suspendedLanes | o)) !== 0 ? 0 : l),
            l !== 0 && l !== T.retryLane))
        )
          throw ((T.retryLane = l), Hi(t, l), Xt(v, t, l), Vp);
        S.data === "$?" || Kd(), (a = Nd(t, a, o));
      } else
        S.data === "$?"
          ? ((a.flags |= 192), (a.child = t.child), (a = null))
          : ((t = T.treeContext),
            (Xe = yn(S.nextSibling)),
            (zt = a),
            (Ae = !0),
            (ei = null),
            (Rn = !1),
            t !== null &&
              ((ln[sn++] = Wn),
              (ln[sn++] = qn),
              (ln[sn++] = Za),
              (Wn = t.id),
              (qn = t.overflow),
              (Za = a)),
            (a = _d(a, l.children)),
            (a.flags |= 4096));
      return a;
    }
    return u
      ? (Oa(),
        (u = l.fallback),
        (S = a.mode),
        (T = t.child),
        (M = T.sibling),
        (l = Gn(T, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = T.subtreeFlags & 65011712),
        M !== null ? (u = Gn(M, u)) : ((u = Qa(u, S, o, null)), (u.flags |= 2)),
        (u.return = a),
        (l.return = a),
        (l.sibling = u),
        (a.child = l),
        (l = u),
        (u = a.child),
        (S = t.child.memoizedState),
        S === null
          ? (S = Ad(o))
          : ((T = S.cachePool),
            T !== null
              ? ((M = ot._currentValue),
                (T = T.parent !== M ? { parent: M, pool: M } : T))
              : (T = zm()),
            (S = { baseLanes: S.baseLanes | o, cachePool: T })),
        (u.memoizedState = S),
        (u.childLanes = zd(t, v, o)),
        (a.memoizedState = Td),
        l)
      : (Ea(a),
        (o = t.child),
        (t = o.sibling),
        (o = Gn(o, { mode: "visible", children: l.children })),
        (o.return = a),
        (o.sibling = null),
        t !== null &&
          ((v = a.deletions),
          v === null ? ((a.deletions = [t]), (a.flags |= 16)) : v.push(t)),
        (a.child = o),
        (a.memoizedState = null),
        o);
  }
  function _d(t, a) {
    return (
      (a = fs({ mode: "visible", children: a }, t.mode)),
      (a.return = t),
      (t.child = a)
    );
  }
  function fs(t, a) {
    return (
      (t = Ft(22, t, null, a)),
      (t.lanes = 0),
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      t
    );
  }
  function Nd(t, a, o) {
    return (
      Ki(a, t.child, null, o),
      (t = _d(a, a.pendingProps.children)),
      (t.flags |= 2),
      (a.memoizedState = null),
      t
    );
  }
  function Gp(t, a, o) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a), Ku(t.return, a, o);
  }
  function Id(t, a, o, l, u) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: a,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: o,
          tailMode: u,
        })
      : ((f.isBackwards = a),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = l),
        (f.tail = o),
        (f.tailMode = u));
  }
  function Wp(t, a, o) {
    var l = a.pendingProps,
      u = l.revealOrder,
      f = l.tail;
    if ((pt(t, a, l.children, o), (l = lt.current), (l & 2) !== 0))
      (l = (l & 1) | 2), (a.flags |= 128);
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = a.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && Gp(t, o, a);
          else if (t.tag === 19) Gp(t, o, a);
          else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === a) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === a) break e;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      l &= 1;
    }
    switch ((ae(lt, l), u)) {
      case "forwards":
        for (o = a.child, u = null; o !== null; )
          (t = o.alternate),
            t !== null && ss(t) === null && (u = o),
            (o = o.sibling);
        (o = u),
          o === null
            ? ((u = a.child), (a.child = null))
            : ((u = o.sibling), (o.sibling = null)),
          Id(a, !1, u, o, f);
        break;
      case "backwards":
        for (o = null, u = a.child, a.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && ss(t) === null)) {
            a.child = u;
            break;
          }
          (t = u.sibling), (u.sibling = o), (o = u), (u = t);
        }
        Id(a, !0, o, null, f);
        break;
      case "together":
        Id(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function Zn(t, a, o) {
    if (
      (t !== null && (a.dependencies = t.dependencies),
      (Aa |= a.lanes),
      (o & a.childLanes) === 0)
    )
      if (t !== null) {
        if ((Qr(t, a, o, !1), (o & a.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && a.child !== t.child) throw Error(r(153));
    if (a.child !== null) {
      for (
        t = a.child, o = Gn(t, t.pendingProps), a.child = o, o.return = a;
        t.sibling !== null;

      )
        (t = t.sibling),
          (o = o.sibling = Gn(t, t.pendingProps)),
          (o.return = a);
      o.sibling = null;
    }
    return a.child;
  }
  function Pd(t, a) {
    return (t.lanes & a) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && Wl(t)));
  }
  function gO(t, a, o) {
    switch (a.tag) {
      case 3:
        Z(a, a.stateNode.containerInfo), ba(a, ot, t.memoizedState.cache), Xr();
        break;
      case 27:
      case 5:
        Ee(a);
        break;
      case 4:
        Z(a, a.stateNode.containerInfo);
        break;
      case 10:
        ba(a, a.type, a.memoizedProps.value);
        break;
      case 13:
        var l = a.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Ea(a), (a.flags |= 128), null)
            : (o & a.child.childLanes) !== 0
              ? Fp(t, a, o)
              : (Ea(a), (t = Zn(t, a, o)), t !== null ? t.sibling : null);
        Ea(a);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((l = (o & a.childLanes) !== 0),
          l || (Qr(t, a, o, !1), (l = (o & a.childLanes) !== 0)),
          u)
        ) {
          if (l) return Wp(t, a, o);
          a.flags |= 128;
        }
        if (
          ((u = a.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          ae(lt, lt.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return (a.lanes = 0), Hp(t, a, o);
      case 24:
        ba(a, ot, t.memoizedState.cache);
    }
    return Zn(t, a, o);
  }
  function qp(t, a, o) {
    if (t !== null)
      if (t.memoizedProps !== a.pendingProps) ut = !0;
      else {
        if (!Pd(t, o) && (a.flags & 128) === 0) return (ut = !1), gO(t, a, o);
        ut = (t.flags & 131072) !== 0;
      }
    else (ut = !1), Ae && (a.flags & 1048576) !== 0 && Em(a, Gl, a.index);
    switch (((a.lanes = 0), a.tag)) {
      case 16:
        e: {
          t = a.pendingProps;
          var l = a.elementType,
            u = l._init;
          if (((l = u(l._payload)), (a.type = l), typeof l == "function"))
            $u(l)
              ? ((t = oi(l, t)), (a.tag = 1), (a = Up(null, a, l, t, o)))
              : ((a.tag = 0), (a = Rd(null, a, l, t, o)));
          else {
            if (l != null) {
              if (((u = l.$$typeof), u === B)) {
                (a.tag = 11), (a = Dp(null, a, l, t, o));
                break e;
              } else if (u === $) {
                (a.tag = 14), (a = Mp(null, a, l, t, o));
                break e;
              }
            }
            throw ((a = he(l) || l), Error(r(306, a, "")));
          }
        }
        return a;
      case 0:
        return Rd(t, a, a.type, a.pendingProps, o);
      case 1:
        return (l = a.type), (u = oi(l, a.pendingProps)), Up(t, a, l, u, o);
      case 3:
        e: {
          if ((Z(a, a.stateNode.containerInfo), t === null))
            throw Error(r(387));
          l = a.pendingProps;
          var f = a.memoizedState;
          (u = f.element), ad(t, a), io(a, l, null, o);
          var v = a.memoizedState;
          if (
            ((l = v.cache),
            ba(a, ot, l),
            l !== f.cache && Qu(a, [ot], o, !0),
            ao(),
            (l = v.element),
            f.isDehydrated)
          )
            if (
              ((f = { element: l, isDehydrated: !1, cache: v.cache }),
              (a.updateQueue.baseState = f),
              (a.memoizedState = f),
              a.flags & 256)
            ) {
              a = $p(t, a, l, o);
              break e;
            } else if (l !== u) {
              (u = rn(Error(r(424)), a)), Kr(u), (a = $p(t, a, l, o));
              break e;
            } else {
              switch (((t = a.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                Xe = yn(t.firstChild),
                  zt = a,
                  Ae = !0,
                  ei = null,
                  Rn = !0,
                  o = wp(a, null, l, o),
                  a.child = o;
                o;

              )
                (o.flags = (o.flags & -3) | 4096), (o = o.sibling);
            }
          else {
            if ((Xr(), l === u)) {
              a = Zn(t, a, o);
              break e;
            }
            pt(t, a, l, o);
          }
          a = a.child;
        }
        return a;
      case 26:
        return (
          ds(t, a),
          t === null
            ? (o = Qv(a.type, null, a.pendingProps, null))
              ? (a.memoizedState = o)
              : Ae ||
                ((o = a.type),
                (t = a.pendingProps),
                (l = ks(fe.current).createElement(o)),
                (l[wt] = a),
                (l[Nt] = t),
                bt(l, o, t),
                ct(l),
                (a.stateNode = l))
            : (a.memoizedState = Qv(
                a.type,
                t.memoizedProps,
                a.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ee(a),
          t === null &&
            Ae &&
            ((l = a.stateNode = Yv(a.type, a.pendingProps, fe.current)),
            (zt = a),
            (Rn = !0),
            (u = Xe),
            Ia(a.type) ? ((mf = u), (Xe = yn(l.firstChild))) : (Xe = u)),
          pt(t, a, a.pendingProps.children, o),
          ds(t, a),
          t === null && (a.flags |= 4194304),
          a.child
        );
      case 5:
        return (
          t === null &&
            Ae &&
            ((u = l = Xe) &&
              ((l = jO(l, a.type, a.pendingProps, Rn)),
              l !== null
                ? ((a.stateNode = l),
                  (zt = a),
                  (Xe = yn(l.firstChild)),
                  (Rn = !1),
                  (u = !0))
                : (u = !1)),
            u || ti(a)),
          Ee(a),
          (u = a.type),
          (f = a.pendingProps),
          (v = t !== null ? t.memoizedProps : null),
          (l = f.children),
          df(u, f) ? (l = null) : v !== null && df(u, v) && (a.flags |= 32),
          a.memoizedState !== null &&
            ((u = cd(t, a, rO, null, null, o)), (Ro._currentValue = u)),
          ds(t, a),
          pt(t, a, l, o),
          a.child
        );
      case 6:
        return (
          t === null &&
            Ae &&
            ((t = o = Xe) &&
              ((o = UO(o, a.pendingProps, Rn)),
              o !== null
                ? ((a.stateNode = o), (zt = a), (Xe = null), (t = !0))
                : (t = !1)),
            t || ti(a)),
          null
        );
      case 13:
        return Fp(t, a, o);
      case 4:
        return (
          Z(a, a.stateNode.containerInfo),
          (l = a.pendingProps),
          t === null ? (a.child = Ki(a, null, l, o)) : pt(t, a, l, o),
          a.child
        );
      case 11:
        return Dp(t, a, a.type, a.pendingProps, o);
      case 7:
        return pt(t, a, a.pendingProps, o), a.child;
      case 8:
        return pt(t, a, a.pendingProps.children, o), a.child;
      case 12:
        return pt(t, a, a.pendingProps.children, o), a.child;
      case 10:
        return (
          (l = a.pendingProps),
          ba(a, a.type, l.value),
          pt(t, a, l.children, o),
          a.child
        );
      case 9:
        return (
          (u = a.type._context),
          (l = a.pendingProps.children),
          ai(a),
          (u = kt(u)),
          (l = l(u)),
          (a.flags |= 1),
          pt(t, a, l, o),
          a.child
        );
      case 14:
        return Mp(t, a, a.type, a.pendingProps, o);
      case 15:
        return Lp(t, a, a.type, a.pendingProps, o);
      case 19:
        return Wp(t, a, o);
      case 31:
        return (
          (l = a.pendingProps),
          (o = a.mode),
          (l = { mode: l.mode, children: l.children }),
          t === null
            ? ((o = fs(l, o)),
              (o.ref = a.ref),
              (a.child = o),
              (o.return = a),
              (a = o))
            : ((o = Gn(t.child, l)),
              (o.ref = a.ref),
              (a.child = o),
              (o.return = a),
              (a = o)),
          a
        );
      case 22:
        return Hp(t, a, o);
      case 24:
        return (
          ai(a),
          (l = kt(ot)),
          t === null
            ? ((u = ed()),
              u === null &&
                ((u = Ue),
                (f = Zu()),
                (u.pooledCache = f),
                f.refCount++,
                f !== null && (u.pooledCacheLanes |= o),
                (u = f)),
              (a.memoizedState = { parent: l, cache: u }),
              nd(a),
              ba(a, ot, u))
            : ((t.lanes & o) !== 0 && (ad(t, a), io(a, null, null, o), ao()),
              (u = t.memoizedState),
              (f = a.memoizedState),
              u.parent !== l
                ? ((u = { parent: l, cache: l }),
                  (a.memoizedState = u),
                  a.lanes === 0 &&
                    (a.memoizedState = a.updateQueue.baseState = u),
                  ba(a, ot, l))
                : ((l = f.cache),
                  ba(a, ot, l),
                  l !== u.cache && Qu(a, [ot], o, !0))),
          pt(t, a, a.pendingProps.children, o),
          a.child
        );
      case 29:
        throw a.pendingProps;
    }
    throw Error(r(156, a.tag));
  }
  function Jn(t) {
    t.flags |= 4;
  }
  function Yp(t, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !nb(a))) {
      if (
        ((a = cn.current),
        a !== null &&
          ((Re & 4194048) === Re
            ? Tn !== null
            : ((Re & 62914560) !== Re && (Re & 536870912) === 0) || a !== Tn))
      )
        throw ((to = td), _m);
      t.flags |= 8192;
    }
  }
  function gs(t, a) {
    a !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((a = t.tag !== 22 ? kh() : 536870912), (t.lanes |= a), (er |= a));
  }
  function fo(t, a) {
    if (!Ae)
      switch (t.tailMode) {
        case "hidden":
          a = t.tail;
          for (var o = null; a !== null; )
            a.alternate !== null && (o = a), (a = a.sibling);
          o === null ? (t.tail = null) : (o.sibling = null);
          break;
        case "collapsed":
          o = t.tail;
          for (var l = null; o !== null; )
            o.alternate !== null && (l = o), (o = o.sibling);
          l === null
            ? a || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function qe(t) {
    var a = t.alternate !== null && t.alternate.child === t.child,
      o = 0,
      l = 0;
    if (a)
      for (var u = t.child; u !== null; )
        (o |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags & 65011712),
          (l |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling);
    else
      for (u = t.child; u !== null; )
        (o |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags),
          (l |= u.flags),
          (u.return = t),
          (u = u.sibling);
    return (t.subtreeFlags |= l), (t.childLanes = o), a;
  }
  function hO(t, a, o) {
    var l = a.pendingProps;
    switch ((qu(a), a.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return qe(a), null;
      case 1:
        return qe(a), null;
      case 3:
        return (
          (o = a.stateNode),
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          a.memoizedState.cache !== l && (a.flags |= 2048),
          Xn(ot),
          ee(),
          o.pendingContext &&
            ((o.context = o.pendingContext), (o.pendingContext = null)),
          (t === null || t.child === null) &&
            (Yr(a)
              ? Jn(a)
              : t === null ||
                (t.memoizedState.isDehydrated && (a.flags & 256) === 0) ||
                ((a.flags |= 1024), km())),
          qe(a),
          null
        );
      case 26:
        return (
          (o = a.memoizedState),
          t === null
            ? (Jn(a),
              o !== null ? (qe(a), Yp(a, o)) : (qe(a), (a.flags &= -16777217)))
            : o
              ? o !== t.memoizedState
                ? (Jn(a), qe(a), Yp(a, o))
                : (qe(a), (a.flags &= -16777217))
              : (t.memoizedProps !== l && Jn(a), qe(a), (a.flags &= -16777217)),
          null
        );
      case 27:
        Ne(a), (o = fe.current);
        var u = a.type;
        if (t !== null && a.stateNode != null) t.memoizedProps !== l && Jn(a);
        else {
          if (!l) {
            if (a.stateNode === null) throw Error(r(166));
            return qe(a), null;
          }
          (t = le.current),
            Yr(a) ? Om(a) : ((t = Yv(u, l, o)), (a.stateNode = t), Jn(a));
        }
        return qe(a), null;
      case 5:
        if ((Ne(a), (o = a.type), t !== null && a.stateNode != null))
          t.memoizedProps !== l && Jn(a);
        else {
          if (!l) {
            if (a.stateNode === null) throw Error(r(166));
            return qe(a), null;
          }
          if (((t = le.current), Yr(a))) Om(a);
          else {
            switch (((u = ks(fe.current)), t)) {
              case 1:
                t = u.createElementNS("http://www.w3.org/2000/svg", o);
                break;
              case 2:
                t = u.createElementNS("http://www.w3.org/1998/Math/MathML", o);
                break;
              default:
                switch (o) {
                  case "svg":
                    t = u.createElementNS("http://www.w3.org/2000/svg", o);
                    break;
                  case "math":
                    t = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o,
                    );
                    break;
                  case "script":
                    (t = u.createElement("div")),
                      (t.innerHTML = "<script><\/script>"),
                      (t = t.removeChild(t.firstChild));
                    break;
                  case "select":
                    (t =
                      typeof l.is == "string"
                        ? u.createElement("select", { is: l.is })
                        : u.createElement("select")),
                      l.multiple
                        ? (t.multiple = !0)
                        : l.size && (t.size = l.size);
                    break;
                  default:
                    t =
                      typeof l.is == "string"
                        ? u.createElement(o, { is: l.is })
                        : u.createElement(o);
                }
            }
            (t[wt] = a), (t[Nt] = l);
            e: for (u = a.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) t.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === a) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === a) break e;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            a.stateNode = t;
            e: switch ((bt(t, o, l), o)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!l.autoFocus;
                break e;
              case "img":
                t = !0;
                break e;
              default:
                t = !1;
            }
            t && Jn(a);
          }
        }
        return qe(a), (a.flags &= -16777217), null;
      case 6:
        if (t && a.stateNode != null) t.memoizedProps !== l && Jn(a);
        else {
          if (typeof l != "string" && a.stateNode === null) throw Error(r(166));
          if (((t = fe.current), Yr(a))) {
            if (
              ((t = a.stateNode),
              (o = a.memoizedProps),
              (l = null),
              (u = zt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            (t[wt] = a),
              (t = !!(
                t.nodeValue === o ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                jv(t.nodeValue, o)
              )),
              t || ti(a);
          } else (t = ks(t).createTextNode(l)), (t[wt] = a), (a.stateNode = t);
        }
        return qe(a), null;
      case 13:
        if (
          ((l = a.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Yr(a)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = a.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[wt] = a;
            } else
              Xr(),
                (a.flags & 128) === 0 && (a.memoizedState = null),
                (a.flags |= 4);
            qe(a), (u = !1);
          } else
            (u = km()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return a.flags & 256 ? (Qn(a), a) : (Qn(a), null);
        }
        if ((Qn(a), (a.flags & 128) !== 0)) return (a.lanes = o), a;
        if (
          ((o = l !== null), (t = t !== null && t.memoizedState !== null), o)
        ) {
          (l = a.child),
            (u = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (u = l.alternate.memoizedState.cachePool.pool);
          var f = null;
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (f = l.memoizedState.cachePool.pool),
            f !== u && (l.flags |= 2048);
        }
        return (
          o !== t && o && (a.child.flags |= 8192),
          gs(a, a.updateQueue),
          qe(a),
          null
        );
      case 4:
        return ee(), t === null && of(a.stateNode.containerInfo), qe(a), null;
      case 10:
        return Xn(a.type), qe(a), null;
      case 19:
        if ((te(lt), (u = a.memoizedState), u === null)) return qe(a), null;
        if (((l = (a.flags & 128) !== 0), (f = u.rendering), f === null))
          if (l) fo(u, !1);
          else {
            if (Ke !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = a.child; t !== null; ) {
                if (((f = ss(t)), f !== null)) {
                  for (
                    a.flags |= 128,
                      fo(u, !1),
                      t = f.updateQueue,
                      a.updateQueue = t,
                      gs(a, t),
                      a.subtreeFlags = 0,
                      t = o,
                      o = a.child;
                    o !== null;

                  )
                    Cm(o, t), (o = o.sibling);
                  return ae(lt, (lt.current & 1) | 2), a.child;
                }
                t = t.sibling;
              }
            u.tail !== null &&
              tn() > ps &&
              ((a.flags |= 128), (l = !0), fo(u, !1), (a.lanes = 4194304));
          }
        else {
          if (!l)
            if (((t = ss(f)), t !== null)) {
              if (
                ((a.flags |= 128),
                (l = !0),
                (t = t.updateQueue),
                (a.updateQueue = t),
                gs(a, t),
                fo(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !f.alternate &&
                  !Ae)
              )
                return qe(a), null;
            } else
              2 * tn() - u.renderingStartTime > ps &&
                o !== 536870912 &&
                ((a.flags |= 128), (l = !0), fo(u, !1), (a.lanes = 4194304));
          u.isBackwards
            ? ((f.sibling = a.child), (a.child = f))
            : ((t = u.last),
              t !== null ? (t.sibling = f) : (a.child = f),
              (u.last = f));
        }
        return u.tail !== null
          ? ((a = u.tail),
            (u.rendering = a),
            (u.tail = a.sibling),
            (u.renderingStartTime = tn()),
            (a.sibling = null),
            (t = lt.current),
            ae(lt, l ? (t & 1) | 2 : t & 1),
            a)
          : (qe(a), null);
      case 22:
      case 23:
        return (
          Qn(a),
          ld(),
          (l = a.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== l && (a.flags |= 8192)
            : l && (a.flags |= 8192),
          l
            ? (o & 536870912) !== 0 &&
              (a.flags & 128) === 0 &&
              (qe(a), a.subtreeFlags & 6 && (a.flags |= 8192))
            : qe(a),
          (o = a.updateQueue),
          o !== null && gs(a, o.retryQueue),
          (o = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (o = t.memoizedState.cachePool.pool),
          (l = null),
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (l = a.memoizedState.cachePool.pool),
          l !== o && (a.flags |= 2048),
          t !== null && te(ii),
          null
        );
      case 24:
        return (
          (o = null),
          t !== null && (o = t.memoizedState.cache),
          a.memoizedState.cache !== o && (a.flags |= 2048),
          Xn(ot),
          qe(a),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, a.tag));
  }
  function mO(t, a) {
    switch ((qu(a), a.tag)) {
      case 1:
        return (
          (t = a.flags), t & 65536 ? ((a.flags = (t & -65537) | 128), a) : null
        );
      case 3:
        return (
          Xn(ot),
          ee(),
          (t = a.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((a.flags = (t & -65537) | 128), a)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Ne(a), null;
      case 13:
        if (
          (Qn(a), (t = a.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (a.alternate === null) throw Error(r(340));
          Xr();
        }
        return (
          (t = a.flags), t & 65536 ? ((a.flags = (t & -65537) | 128), a) : null
        );
      case 19:
        return te(lt), null;
      case 4:
        return ee(), null;
      case 10:
        return Xn(a.type), null;
      case 22:
      case 23:
        return (
          Qn(a),
          ld(),
          t !== null && te(ii),
          (t = a.flags),
          t & 65536 ? ((a.flags = (t & -65537) | 128), a) : null
        );
      case 24:
        return Xn(ot), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xp(t, a) {
    switch ((qu(a), a.tag)) {
      case 3:
        Xn(ot), ee();
        break;
      case 26:
      case 27:
      case 5:
        Ne(a);
        break;
      case 4:
        ee();
        break;
      case 13:
        Qn(a);
        break;
      case 19:
        te(lt);
        break;
      case 10:
        Xn(a.type);
        break;
      case 22:
      case 23:
        Qn(a), ld(), t !== null && te(ii);
        break;
      case 24:
        Xn(ot);
    }
  }
  function go(t, a) {
    try {
      var o = a.updateQueue,
        l = o !== null ? o.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        o = u;
        do {
          if ((o.tag & t) === t) {
            l = void 0;
            var f = o.create,
              v = o.inst;
            (l = f()), (v.destroy = l);
          }
          o = o.next;
        } while (o !== u);
      }
    } catch (S) {
      He(a, a.return, S);
    }
  }
  function wa(t, a, o) {
    try {
      var l = a.updateQueue,
        u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        l = f;
        do {
          if ((l.tag & t) === t) {
            var v = l.inst,
              S = v.destroy;
            if (S !== void 0) {
              (v.destroy = void 0), (u = a);
              var T = o,
                M = S;
              try {
                M();
              } catch (q) {
                He(u, T, q);
              }
            }
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (q) {
      He(a, a.return, q);
    }
  }
  function Kp(t) {
    var a = t.updateQueue;
    if (a !== null) {
      var o = t.stateNode;
      try {
        Mm(a, o);
      } catch (l) {
        He(t, t.return, l);
      }
    }
  }
  function Qp(t, a, o) {
    (o.props = oi(t.type, t.memoizedProps)), (o.state = t.memoizedState);
    try {
      o.componentWillUnmount();
    } catch (l) {
      He(t, a, l);
    }
  }
  function ho(t, a) {
    try {
      var o = t.ref;
      if (o !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof o == "function" ? (t.refCleanup = o(l)) : (o.current = l);
      }
    } catch (u) {
      He(t, a, u);
    }
  }
  function An(t, a) {
    var o = t.ref,
      l = t.refCleanup;
    if (o !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          He(t, a, u);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof o == "function")
        try {
          o(null);
        } catch (u) {
          He(t, a, u);
        }
      else o.current = null;
  }
  function Zp(t) {
    var a = t.type,
      o = t.memoizedProps,
      l = t.stateNode;
    try {
      e: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          o.autoFocus && l.focus();
          break e;
        case "img":
          o.src ? (l.src = o.src) : o.srcSet && (l.srcset = o.srcSet);
      }
    } catch (u) {
      He(t, t.return, u);
    }
  }
  function Vd(t, a, o) {
    try {
      var l = t.stateNode;
      DO(l, t.type, o, a), (l[Nt] = a);
    } catch (u) {
      He(t, t.return, u);
    }
  }
  function Jp(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && Ia(t.type)) ||
      t.tag === 4
    );
  }
  function Dd(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Jp(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && Ia(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue e;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Md(t, a, o) {
    var l = t.tag;
    if (l === 5 || l === 6)
      (t = t.stateNode),
        a
          ? (o.nodeType === 9
              ? o.body
              : o.nodeName === "HTML"
                ? o.ownerDocument.body
                : o
            ).insertBefore(t, a)
          : ((a =
              o.nodeType === 9
                ? o.body
                : o.nodeName === "HTML"
                  ? o.ownerDocument.body
                  : o),
            a.appendChild(t),
            (o = o._reactRootContainer),
            o != null || a.onclick !== null || (a.onclick = ws));
    else if (
      l !== 4 &&
      (l === 27 && Ia(t.type) && ((o = t.stateNode), (a = null)),
      (t = t.child),
      t !== null)
    )
      for (Md(t, a, o), t = t.sibling; t !== null; )
        Md(t, a, o), (t = t.sibling);
  }
  function hs(t, a, o) {
    var l = t.tag;
    if (l === 5 || l === 6)
      (t = t.stateNode), a ? o.insertBefore(t, a) : o.appendChild(t);
    else if (
      l !== 4 &&
      (l === 27 && Ia(t.type) && (o = t.stateNode), (t = t.child), t !== null)
    )
      for (hs(t, a, o), t = t.sibling; t !== null; )
        hs(t, a, o), (t = t.sibling);
  }
  function ev(t) {
    var a = t.stateNode,
      o = t.memoizedProps;
    try {
      for (var l = t.type, u = a.attributes; u.length; )
        a.removeAttributeNode(u[0]);
      bt(a, l, o), (a[wt] = t), (a[Nt] = o);
    } catch (f) {
      He(t, t.return, f);
    }
  }
  var ea = !1,
    et = !1,
    Ld = !1,
    tv = typeof WeakSet == "function" ? WeakSet : Set,
    dt = null;
  function pO(t, a) {
    if (((t = t.containerInfo), (cf = Ns), (t = fm(t)), Du(t))) {
      if ("selectionStart" in t)
        var o = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          o = ((o = t.ownerDocument) && o.defaultView) || window;
          var l = o.getSelection && o.getSelection();
          if (l && l.rangeCount !== 0) {
            o = l.anchorNode;
            var u = l.anchorOffset,
              f = l.focusNode;
            l = l.focusOffset;
            try {
              o.nodeType, f.nodeType;
            } catch {
              o = null;
              break e;
            }
            var v = 0,
              S = -1,
              T = -1,
              M = 0,
              q = 0,
              Q = t,
              L = null;
            t: for (;;) {
              for (
                var H;
                Q !== o || (u !== 0 && Q.nodeType !== 3) || (S = v + u),
                  Q !== f || (l !== 0 && Q.nodeType !== 3) || (T = v + l),
                  Q.nodeType === 3 && (v += Q.nodeValue.length),
                  (H = Q.firstChild) !== null;

              )
                (L = Q), (Q = H);
              for (;;) {
                if (Q === t) break t;
                if (
                  (L === o && ++M === u && (S = v),
                  L === f && ++q === l && (T = v),
                  (H = Q.nextSibling) !== null)
                )
                  break;
                (Q = L), (L = Q.parentNode);
              }
              Q = H;
            }
            o = S === -1 || T === -1 ? null : { start: S, end: T };
          } else o = null;
        }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (
      uf = { focusedElem: t, selectionRange: o }, Ns = !1, dt = a;
      dt !== null;

    )
      if (
        ((a = dt), (t = a.child), (a.subtreeFlags & 1024) !== 0 && t !== null)
      )
        (t.return = a), (dt = t);
      else
        for (; dt !== null; ) {
          switch (((a = dt), (f = a.alternate), (t = a.flags), a.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && f !== null) {
                (t = void 0),
                  (o = a),
                  (u = f.memoizedProps),
                  (f = f.memoizedState),
                  (l = o.stateNode);
                try {
                  var de = oi(o.type, u, o.elementType === o.type);
                  (t = l.getSnapshotBeforeUpdate(de, f)),
                    (l.__reactInternalSnapshotBeforeUpdate = t);
                } catch (ce) {
                  He(o, o.return, ce);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = a.stateNode.containerInfo), (o = t.nodeType), o === 9)
                )
                  gf(t);
                else if (o === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      gf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (((t = a.sibling), t !== null)) {
            (t.return = a.return), (dt = t);
            break;
          }
          dt = a.return;
        }
  }
  function nv(t, a, o) {
    var l = o.flags;
    switch (o.tag) {
      case 0:
      case 11:
      case 15:
        ka(t, o), l & 4 && go(5, o);
        break;
      case 1:
        if ((ka(t, o), l & 4))
          if (((t = o.stateNode), a === null))
            try {
              t.componentDidMount();
            } catch (v) {
              He(o, o.return, v);
            }
          else {
            var u = oi(o.type, a.memoizedProps);
            a = a.memoizedState;
            try {
              t.componentDidUpdate(u, a, t.__reactInternalSnapshotBeforeUpdate);
            } catch (v) {
              He(o, o.return, v);
            }
          }
        l & 64 && Kp(o), l & 512 && ho(o, o.return);
        break;
      case 3:
        if ((ka(t, o), l & 64 && ((t = o.updateQueue), t !== null))) {
          if (((a = null), o.child !== null))
            switch (o.child.tag) {
              case 27:
              case 5:
                a = o.child.stateNode;
                break;
              case 1:
                a = o.child.stateNode;
            }
          try {
            Mm(t, a);
          } catch (v) {
            He(o, o.return, v);
          }
        }
        break;
      case 27:
        a === null && l & 4 && ev(o);
      case 26:
      case 5:
        ka(t, o), a === null && l & 4 && Zp(o), l & 512 && ho(o, o.return);
        break;
      case 12:
        ka(t, o);
        break;
      case 13:
        ka(t, o),
          l & 4 && rv(t, o),
          l & 64 &&
            ((t = o.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((o = wO.bind(null, o)), $O(t, o))));
        break;
      case 22:
        if (((l = o.memoizedState !== null || ea), !l)) {
          (a = (a !== null && a.memoizedState !== null) || et), (u = ea);
          var f = et;
          (ea = l),
            (et = a) && !f ? Ra(t, o, (o.subtreeFlags & 8772) !== 0) : ka(t, o),
            (ea = u),
            (et = f);
        }
        break;
      case 30:
        break;
      default:
        ka(t, o);
    }
  }
  function av(t) {
    var a = t.alternate;
    a !== null && ((t.alternate = null), av(a)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((a = t.stateNode), a !== null && vu(a)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Fe = null,
    Vt = !1;
  function ta(t, a, o) {
    for (o = o.child; o !== null; ) iv(t, a, o), (o = o.sibling);
  }
  function iv(t, a, o) {
    if (jt && typeof jt.onCommitFiberUnmount == "function")
      try {
        jt.onCommitFiberUnmount(Pr, o);
      } catch {}
    switch (o.tag) {
      case 26:
        et || An(o, a),
          ta(t, a, o),
          o.memoizedState
            ? o.memoizedState.count--
            : o.stateNode && ((o = o.stateNode), o.parentNode.removeChild(o));
        break;
      case 27:
        et || An(o, a);
        var l = Fe,
          u = Vt;
        Ia(o.type) && ((Fe = o.stateNode), (Vt = !1)),
          ta(t, a, o),
          Eo(o.stateNode),
          (Fe = l),
          (Vt = u);
        break;
      case 5:
        et || An(o, a);
      case 6:
        if (
          ((l = Fe),
          (u = Vt),
          (Fe = null),
          ta(t, a, o),
          (Fe = l),
          (Vt = u),
          Fe !== null)
        )
          if (Vt)
            try {
              (Fe.nodeType === 9
                ? Fe.body
                : Fe.nodeName === "HTML"
                  ? Fe.ownerDocument.body
                  : Fe
              ).removeChild(o.stateNode);
            } catch (f) {
              He(o, a, f);
            }
          else
            try {
              Fe.removeChild(o.stateNode);
            } catch (f) {
              He(o, a, f);
            }
        break;
      case 18:
        Fe !== null &&
          (Vt
            ? ((t = Fe),
              Wv(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                o.stateNode,
              ),
              _o(t))
            : Wv(Fe, o.stateNode));
        break;
      case 4:
        (l = Fe),
          (u = Vt),
          (Fe = o.stateNode.containerInfo),
          (Vt = !0),
          ta(t, a, o),
          (Fe = l),
          (Vt = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        et || wa(2, o, a), et || wa(4, o, a), ta(t, a, o);
        break;
      case 1:
        et ||
          (An(o, a),
          (l = o.stateNode),
          typeof l.componentWillUnmount == "function" && Qp(o, a, l)),
          ta(t, a, o);
        break;
      case 21:
        ta(t, a, o);
        break;
      case 22:
        (et = (l = et) || o.memoizedState !== null), ta(t, a, o), (et = l);
        break;
      default:
        ta(t, a, o);
    }
  }
  function rv(t, a) {
    if (
      a.memoizedState === null &&
      ((t = a.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        _o(t);
      } catch (o) {
        He(a, a.return, o);
      }
  }
  function vO(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var a = t.stateNode;
        return a === null && (a = t.stateNode = new tv()), a;
      case 22:
        return (
          (t = t.stateNode),
          (a = t._retryCache),
          a === null && (a = t._retryCache = new tv()),
          a
        );
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Hd(t, a) {
    var o = vO(t);
    a.forEach(function (l) {
      var u = kO.bind(null, t, l);
      o.has(l) || (o.add(l), l.then(u, u));
    });
  }
  function Gt(t, a) {
    var o = a.deletions;
    if (o !== null)
      for (var l = 0; l < o.length; l++) {
        var u = o[l],
          f = t,
          v = a,
          S = v;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (Ia(S.type)) {
                (Fe = S.stateNode), (Vt = !1);
                break e;
              }
              break;
            case 5:
              (Fe = S.stateNode), (Vt = !1);
              break e;
            case 3:
            case 4:
              (Fe = S.stateNode.containerInfo), (Vt = !0);
              break e;
          }
          S = S.return;
        }
        if (Fe === null) throw Error(r(160));
        iv(f, v, u),
          (Fe = null),
          (Vt = !1),
          (f = u.alternate),
          f !== null && (f.return = null),
          (u.return = null);
      }
    if (a.subtreeFlags & 13878)
      for (a = a.child; a !== null; ) ov(a, t), (a = a.sibling);
  }
  var bn = null;
  function ov(t, a) {
    var o = t.alternate,
      l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Gt(a, t),
          Wt(t),
          l & 4 && (wa(3, t, t.return), go(3, t), wa(5, t, t.return));
        break;
      case 1:
        Gt(a, t),
          Wt(t),
          l & 512 && (et || o === null || An(o, o.return)),
          l & 64 &&
            ea &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((o = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = o === null ? l : o.concat(l)))));
        break;
      case 26:
        var u = bn;
        if (
          (Gt(a, t),
          Wt(t),
          l & 512 && (et || o === null || An(o, o.return)),
          l & 4)
        ) {
          var f = o !== null ? o.memoizedState : null;
          if (((l = t.memoizedState), o === null))
            if (l === null)
              if (t.stateNode === null) {
                e: {
                  (l = t.type),
                    (o = t.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (l) {
                    case "title":
                      (f = u.getElementsByTagName("title")[0]),
                        (!f ||
                          f[Mr] ||
                          f[wt] ||
                          f.namespaceURI === "http://www.w3.org/2000/svg" ||
                          f.hasAttribute("itemprop")) &&
                          ((f = u.createElement(l)),
                          u.head.insertBefore(
                            f,
                            u.querySelector("head > title"),
                          )),
                        bt(f, l, o),
                        (f[wt] = t),
                        ct(f),
                        (l = f);
                      break e;
                    case "link":
                      var v = eb("link", "href", u).get(l + (o.href || ""));
                      if (v) {
                        for (var S = 0; S < v.length; S++)
                          if (
                            ((f = v[S]),
                            f.getAttribute("href") ===
                              (o.href == null || o.href === ""
                                ? null
                                : o.href) &&
                              f.getAttribute("rel") ===
                                (o.rel == null ? null : o.rel) &&
                              f.getAttribute("title") ===
                                (o.title == null ? null : o.title) &&
                              f.getAttribute("crossorigin") ===
                                (o.crossOrigin == null ? null : o.crossOrigin))
                          ) {
                            v.splice(S, 1);
                            break t;
                          }
                      }
                      (f = u.createElement(l)),
                        bt(f, l, o),
                        u.head.appendChild(f);
                      break;
                    case "meta":
                      if (
                        (v = eb("meta", "content", u).get(
                          l + (o.content || ""),
                        ))
                      ) {
                        for (S = 0; S < v.length; S++)
                          if (
                            ((f = v[S]),
                            f.getAttribute("content") ===
                              (o.content == null ? null : "" + o.content) &&
                              f.getAttribute("name") ===
                                (o.name == null ? null : o.name) &&
                              f.getAttribute("property") ===
                                (o.property == null ? null : o.property) &&
                              f.getAttribute("http-equiv") ===
                                (o.httpEquiv == null ? null : o.httpEquiv) &&
                              f.getAttribute("charset") ===
                                (o.charSet == null ? null : o.charSet))
                          ) {
                            v.splice(S, 1);
                            break t;
                          }
                      }
                      (f = u.createElement(l)),
                        bt(f, l, o),
                        u.head.appendChild(f);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  (f[wt] = t), ct(f), (l = f);
                }
                t.stateNode = l;
              } else tb(u, t.type, t.stateNode);
            else t.stateNode = Jv(u, l, t.memoizedProps);
          else
            f !== l
              ? (f === null
                  ? o.stateNode !== null &&
                    ((o = o.stateNode), o.parentNode.removeChild(o))
                  : f.count--,
                l === null
                  ? tb(u, t.type, t.stateNode)
                  : Jv(u, l, t.memoizedProps))
              : l === null &&
                t.stateNode !== null &&
                Vd(t, t.memoizedProps, o.memoizedProps);
        }
        break;
      case 27:
        Gt(a, t),
          Wt(t),
          l & 512 && (et || o === null || An(o, o.return)),
          o !== null && l & 4 && Vd(t, t.memoizedProps, o.memoizedProps);
        break;
      case 5:
        if (
          (Gt(a, t),
          Wt(t),
          l & 512 && (et || o === null || An(o, o.return)),
          t.flags & 32)
        ) {
          u = t.stateNode;
          try {
            Ni(u, "");
          } catch (H) {
            He(t, t.return, H);
          }
        }
        l & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Vd(t, u, o !== null ? o.memoizedProps : u)),
          l & 1024 && (Ld = !0);
        break;
      case 6:
        if ((Gt(a, t), Wt(t), l & 4)) {
          if (t.stateNode === null) throw Error(r(162));
          (l = t.memoizedProps), (o = t.stateNode);
          try {
            o.nodeValue = l;
          } catch (H) {
            He(t, t.return, H);
          }
        }
        break;
      case 3:
        if (
          ((As = null),
          (u = bn),
          (bn = Rs(a.containerInfo)),
          Gt(a, t),
          (bn = u),
          Wt(t),
          l & 4 && o !== null && o.memoizedState.isDehydrated)
        )
          try {
            _o(a.containerInfo);
          } catch (H) {
            He(t, t.return, H);
          }
        Ld && ((Ld = !1), lv(t));
        break;
      case 4:
        (l = bn),
          (bn = Rs(t.stateNode.containerInfo)),
          Gt(a, t),
          Wt(t),
          (bn = l);
        break;
      case 12:
        Gt(a, t), Wt(t);
        break;
      case 13:
        Gt(a, t),
          Wt(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (o !== null && o.memoizedState !== null) &&
            (Gd = tn()),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), Hd(t, l)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var T = o !== null && o.memoizedState !== null,
          M = ea,
          q = et;
        if (
          ((ea = M || u),
          (et = q || T),
          Gt(a, t),
          (et = q),
          (ea = M),
          Wt(t),
          l & 8192)
        )
          e: for (
            a = t.stateNode,
              a._visibility = u ? a._visibility & -2 : a._visibility | 1,
              u && (o === null || T || ea || et || li(t)),
              o = null,
              a = t;
            ;

          ) {
            if (a.tag === 5 || a.tag === 26) {
              if (o === null) {
                T = o = a;
                try {
                  if (((f = T.stateNode), u))
                    (v = f.style),
                      typeof v.setProperty == "function"
                        ? v.setProperty("display", "none", "important")
                        : (v.display = "none");
                  else {
                    S = T.stateNode;
                    var Q = T.memoizedProps.style,
                      L =
                        Q != null && Q.hasOwnProperty("display")
                          ? Q.display
                          : null;
                    S.style.display =
                      L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (H) {
                  He(T, T.return, H);
                }
              }
            } else if (a.tag === 6) {
              if (o === null) {
                T = a;
                try {
                  T.stateNode.nodeValue = u ? "" : T.memoizedProps;
                } catch (H) {
                  He(T, T.return, H);
                }
              }
            } else if (
              ((a.tag !== 22 && a.tag !== 23) ||
                a.memoizedState === null ||
                a === t) &&
              a.child !== null
            ) {
              (a.child.return = a), (a = a.child);
              continue;
            }
            if (a === t) break e;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === t) break e;
              o === a && (o = null), (a = a.return);
            }
            o === a && (o = null),
              (a.sibling.return = a.return),
              (a = a.sibling);
          }
        l & 4 &&
          ((l = t.updateQueue),
          l !== null &&
            ((o = l.retryQueue),
            o !== null && ((l.retryQueue = null), Hd(t, o))));
        break;
      case 19:
        Gt(a, t),
          Wt(t),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), Hd(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Gt(a, t), Wt(t);
    }
  }
  function Wt(t) {
    var a = t.flags;
    if (a & 2) {
      try {
        for (var o, l = t.return; l !== null; ) {
          if (Jp(l)) {
            o = l;
            break;
          }
          l = l.return;
        }
        if (o == null) throw Error(r(160));
        switch (o.tag) {
          case 27:
            var u = o.stateNode,
              f = Dd(t);
            hs(t, f, u);
            break;
          case 5:
            var v = o.stateNode;
            o.flags & 32 && (Ni(v, ""), (o.flags &= -33));
            var S = Dd(t);
            hs(t, S, v);
            break;
          case 3:
          case 4:
            var T = o.stateNode.containerInfo,
              M = Dd(t);
            Md(t, M, T);
            break;
          default:
            throw Error(r(161));
        }
      } catch (q) {
        He(t, t.return, q);
      }
      t.flags &= -3;
    }
    a & 4096 && (t.flags &= -4097);
  }
  function lv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var a = t;
        lv(a),
          a.tag === 5 && a.flags & 1024 && a.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function ka(t, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; ) nv(t, a.alternate, a), (a = a.sibling);
  }
  function li(t) {
    for (t = t.child; t !== null; ) {
      var a = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          wa(4, a, a.return), li(a);
          break;
        case 1:
          An(a, a.return);
          var o = a.stateNode;
          typeof o.componentWillUnmount == "function" && Qp(a, a.return, o),
            li(a);
          break;
        case 27:
          Eo(a.stateNode);
        case 26:
        case 5:
          An(a, a.return), li(a);
          break;
        case 22:
          a.memoizedState === null && li(a);
          break;
        case 30:
          li(a);
          break;
        default:
          li(a);
      }
      t = t.sibling;
    }
  }
  function Ra(t, a, o) {
    for (o = o && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var l = a.alternate,
        u = t,
        f = a,
        v = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ra(u, f, o), go(4, f);
          break;
        case 1:
          if (
            (Ra(u, f, o),
            (l = f),
            (u = l.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (M) {
              He(l, l.return, M);
            }
          if (((l = f), (u = l.updateQueue), u !== null)) {
            var S = l.stateNode;
            try {
              var T = u.shared.hiddenCallbacks;
              if (T !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < T.length; u++)
                  Dm(T[u], S);
            } catch (M) {
              He(l, l.return, M);
            }
          }
          o && v & 64 && Kp(f), ho(f, f.return);
          break;
        case 27:
          ev(f);
        case 26:
        case 5:
          Ra(u, f, o), o && l === null && v & 4 && Zp(f), ho(f, f.return);
          break;
        case 12:
          Ra(u, f, o);
          break;
        case 13:
          Ra(u, f, o), o && v & 4 && rv(u, f);
          break;
        case 22:
          f.memoizedState === null && Ra(u, f, o), ho(f, f.return);
          break;
        case 30:
          break;
        default:
          Ra(u, f, o);
      }
      a = a.sibling;
    }
  }
  function Bd(t, a) {
    var o = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (o = t.memoizedState.cachePool.pool),
      (t = null),
      a.memoizedState !== null &&
        a.memoizedState.cachePool !== null &&
        (t = a.memoizedState.cachePool.pool),
      t !== o && (t != null && t.refCount++, o != null && Zr(o));
  }
  function jd(t, a) {
    (t = null),
      a.alternate !== null && (t = a.alternate.memoizedState.cache),
      (a = a.memoizedState.cache),
      a !== t && (a.refCount++, t != null && Zr(t));
  }
  function zn(t, a, o, l) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) sv(t, a, o, l), (a = a.sibling);
  }
  function sv(t, a, o, l) {
    var u = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        zn(t, a, o, l), u & 2048 && go(9, a);
        break;
      case 1:
        zn(t, a, o, l);
        break;
      case 3:
        zn(t, a, o, l),
          u & 2048 &&
            ((t = null),
            a.alternate !== null && (t = a.alternate.memoizedState.cache),
            (a = a.memoizedState.cache),
            a !== t && (a.refCount++, t != null && Zr(t)));
        break;
      case 12:
        if (u & 2048) {
          zn(t, a, o, l), (t = a.stateNode);
          try {
            var f = a.memoizedProps,
              v = f.id,
              S = f.onPostCommit;
            typeof S == "function" &&
              S(
                v,
                a.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (T) {
            He(a, a.return, T);
          }
        } else zn(t, a, o, l);
        break;
      case 13:
        zn(t, a, o, l);
        break;
      case 23:
        break;
      case 22:
        (f = a.stateNode),
          (v = a.alternate),
          a.memoizedState !== null
            ? f._visibility & 2
              ? zn(t, a, o, l)
              : mo(t, a)
            : f._visibility & 2
              ? zn(t, a, o, l)
              : ((f._visibility |= 2),
                Qi(t, a, o, l, (a.subtreeFlags & 10256) !== 0)),
          u & 2048 && Bd(v, a);
        break;
      case 24:
        zn(t, a, o, l), u & 2048 && jd(a.alternate, a);
        break;
      default:
        zn(t, a, o, l);
    }
  }
  function Qi(t, a, o, l, u) {
    for (u = u && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
      var f = t,
        v = a,
        S = o,
        T = l,
        M = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          Qi(f, v, S, T, u), go(8, v);
          break;
        case 23:
          break;
        case 22:
          var q = v.stateNode;
          v.memoizedState !== null
            ? q._visibility & 2
              ? Qi(f, v, S, T, u)
              : mo(f, v)
            : ((q._visibility |= 2), Qi(f, v, S, T, u)),
            u && M & 2048 && Bd(v.alternate, v);
          break;
        case 24:
          Qi(f, v, S, T, u), u && M & 2048 && jd(v.alternate, v);
          break;
        default:
          Qi(f, v, S, T, u);
      }
      a = a.sibling;
    }
  }
  function mo(t, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var o = t,
          l = a,
          u = l.flags;
        switch (l.tag) {
          case 22:
            mo(o, l), u & 2048 && Bd(l.alternate, l);
            break;
          case 24:
            mo(o, l), u & 2048 && jd(l.alternate, l);
            break;
          default:
            mo(o, l);
        }
        a = a.sibling;
      }
  }
  var po = 8192;
  function Zi(t) {
    if (t.subtreeFlags & po)
      for (t = t.child; t !== null; ) cv(t), (t = t.sibling);
  }
  function cv(t) {
    switch (t.tag) {
      case 26:
        Zi(t),
          t.flags & po &&
            t.memoizedState !== null &&
            nw(bn, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        Zi(t);
        break;
      case 3:
      case 4:
        var a = bn;
        (bn = Rs(t.stateNode.containerInfo)), Zi(t), (bn = a);
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = po), (po = 16777216), Zi(t), (po = a))
            : Zi(t));
        break;
      default:
        Zi(t);
    }
  }
  function uv(t) {
    var a = t.alternate;
    if (a !== null && ((t = a.child), t !== null)) {
      a.child = null;
      do (a = t.sibling), (t.sibling = null), (t = a);
      while (t !== null);
    }
  }
  function vo(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var o = 0; o < a.length; o++) {
          var l = a[o];
          (dt = l), fv(l, t);
        }
      uv(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) dv(t), (t = t.sibling);
  }
  function dv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vo(t), t.flags & 2048 && wa(9, t, t.return);
        break;
      case 3:
        vo(t);
        break;
      case 12:
        vo(t);
        break;
      case 22:
        var a = t.stateNode;
        t.memoizedState !== null &&
        a._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((a._visibility &= -3), ms(t))
          : vo(t);
        break;
      default:
        vo(t);
    }
  }
  function ms(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var o = 0; o < a.length; o++) {
          var l = a[o];
          (dt = l), fv(l, t);
        }
      uv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((a = t), a.tag)) {
        case 0:
        case 11:
        case 15:
          wa(8, a, a.return), ms(a);
          break;
        case 22:
          (o = a.stateNode),
            o._visibility & 2 && ((o._visibility &= -3), ms(a));
          break;
        default:
          ms(a);
      }
      t = t.sibling;
    }
  }
  function fv(t, a) {
    for (; dt !== null; ) {
      var o = dt;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          wa(8, o, a);
          break;
        case 23:
        case 22:
          if (o.memoizedState !== null && o.memoizedState.cachePool !== null) {
            var l = o.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Zr(o.memoizedState.cache);
      }
      if (((l = o.child), l !== null)) (l.return = o), (dt = l);
      else
        e: for (o = t; dt !== null; ) {
          l = dt;
          var u = l.sibling,
            f = l.return;
          if ((av(l), l === o)) {
            dt = null;
            break e;
          }
          if (u !== null) {
            (u.return = f), (dt = u);
            break e;
          }
          dt = f;
        }
    }
  }
  var bO = {
      getCacheForType: function (t) {
        var a = kt(ot),
          o = a.data.get(t);
        return o === void 0 && ((o = t()), a.data.set(t, o)), o;
      },
    },
    yO = typeof WeakMap == "function" ? WeakMap : Map,
    Pe = 0,
    Ue = null,
    we = null,
    Re = 0,
    Ve = 0,
    qt = null,
    Ta = !1,
    Ji = !1,
    Ud = !1,
    na = 0,
    Ke = 0,
    Aa = 0,
    si = 0,
    $d = 0,
    un = 0,
    er = 0,
    bo = null,
    Dt = null,
    Fd = !1,
    Gd = 0,
    ps = 1 / 0,
    vs = null,
    za = null,
    vt = 0,
    _a = null,
    tr = null,
    nr = 0,
    Wd = 0,
    qd = null,
    gv = null,
    yo = 0,
    Yd = null;
  function Yt() {
    if ((Pe & 2) !== 0 && Re !== 0) return Re & -Re;
    if (I.T !== null) {
      var t = $i;
      return t !== 0 ? t : tf();
    }
    return Ah();
  }
  function hv() {
    un === 0 && (un = (Re & 536870912) === 0 || Ae ? wh() : 536870912);
    var t = cn.current;
    return t !== null && (t.flags |= 32), un;
  }
  function Xt(t, a, o) {
    ((t === Ue && (Ve === 2 || Ve === 9)) || t.cancelPendingCommit !== null) &&
      (ar(t, 0), Na(t, Re, un, !1)),
      Dr(t, o),
      ((Pe & 2) === 0 || t !== Ue) &&
        (t === Ue &&
          ((Pe & 2) === 0 && (si |= o), Ke === 4 && Na(t, Re, un, !1)),
        _n(t));
  }
  function mv(t, a, o) {
    if ((Pe & 6) !== 0) throw Error(r(327));
    var l = (!o && (a & 124) === 0 && (a & t.expiredLanes) === 0) || Vr(t, a),
      u = l ? CO(t, a) : Qd(t, a, !0),
      f = l;
    do {
      if (u === 0) {
        Ji && !l && Na(t, a, 0, !1);
        break;
      } else {
        if (((o = t.current.alternate), f && !xO(o))) {
          (u = Qd(t, a, !1)), (f = !1);
          continue;
        }
        if (u === 2) {
          if (((f = a), t.errorRecoveryDisabledLanes & f)) var v = 0;
          else
            (v = t.pendingLanes & -536870913),
              (v = v !== 0 ? v : v & 536870912 ? 536870912 : 0);
          if (v !== 0) {
            a = v;
            e: {
              var S = t;
              u = bo;
              var T = S.current.memoizedState.isDehydrated;
              if ((T && (ar(S, v).flags |= 256), (v = Qd(S, v, !1)), v !== 2)) {
                if (Ud && !T) {
                  (S.errorRecoveryDisabledLanes |= f), (si |= f), (u = 4);
                  break e;
                }
                (f = Dt),
                  (Dt = u),
                  f !== null && (Dt === null ? (Dt = f) : Dt.push.apply(Dt, f));
              }
              u = v;
            }
            if (((f = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          ar(t, 0), Na(t, a, 0, !0);
          break;
        }
        e: {
          switch (((l = t), (f = u), f)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              Na(l, a, un, !Ta);
              break e;
            case 2:
              Dt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((a & 62914560) === a && ((u = Gd + 300 - tn()), 10 < u)) {
            if ((Na(l, a, un, !Ta), Tl(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = Fv(
              pv.bind(null, l, o, Dt, vs, Fd, a, un, si, er, Ta, f, 2, -0, 0),
              u,
            );
            break e;
          }
          pv(l, o, Dt, vs, Fd, a, un, si, er, Ta, f, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    _n(t);
  }
  function pv(t, a, o, l, u, f, v, S, T, M, q, Q, L, H) {
    if (
      ((t.timeoutHandle = -1),
      (Q = a.subtreeFlags),
      (Q & 8192 || (Q & 16785408) === 16785408) &&
        ((ko = { stylesheets: null, count: 0, unsuspend: tw }),
        cv(a),
        (Q = aw()),
        Q !== null))
    ) {
      (t.cancelPendingCommit = Q(
        Ev.bind(null, t, a, f, o, l, u, v, S, T, q, 1, L, H),
      )),
        Na(t, f, v, !M);
      return;
    }
    Ev(t, a, f, o, l, u, v, S, T);
  }
  function xO(t) {
    for (var a = t; ; ) {
      var o = a.tag;
      if (
        (o === 0 || o === 11 || o === 15) &&
        a.flags & 16384 &&
        ((o = a.updateQueue), o !== null && ((o = o.stores), o !== null))
      )
        for (var l = 0; l < o.length; l++) {
          var u = o[l],
            f = u.getSnapshot;
          u = u.value;
          try {
            if (!$t(f(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((o = a.child), a.subtreeFlags & 16384 && o !== null))
        (o.return = a), (a = o);
      else {
        if (a === t) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === t) return !0;
          a = a.return;
        }
        (a.sibling.return = a.return), (a = a.sibling);
      }
    }
    return !0;
  }
  function Na(t, a, o, l) {
    (a &= ~$d),
      (a &= ~si),
      (t.suspendedLanes |= a),
      (t.pingedLanes &= ~a),
      l && (t.warmLanes |= a),
      (l = t.expirationTimes);
    for (var u = a; 0 < u; ) {
      var f = 31 - Ut(u),
        v = 1 << f;
      (l[f] = -1), (u &= ~v);
    }
    o !== 0 && Rh(t, o, a);
  }
  function bs() {
    return (Pe & 6) === 0 ? (xo(0), !1) : !0;
  }
  function Xd() {
    if (we !== null) {
      if (Ve === 0) var t = we.return;
      else (t = we), (Yn = ni = null), fd(t), (Xi = null), (co = 0), (t = we);
      for (; t !== null; ) Xp(t.alternate, t), (t = t.return);
      we = null;
    }
  }
  function ar(t, a) {
    var o = t.timeoutHandle;
    o !== -1 && ((t.timeoutHandle = -1), LO(o)),
      (o = t.cancelPendingCommit),
      o !== null && ((t.cancelPendingCommit = null), o()),
      Xd(),
      (Ue = t),
      (we = o = Gn(t.current, null)),
      (Re = a),
      (Ve = 0),
      (qt = null),
      (Ta = !1),
      (Ji = Vr(t, a)),
      (Ud = !1),
      (er = un = $d = si = Aa = Ke = 0),
      (Dt = bo = null),
      (Fd = !1),
      (a & 8) !== 0 && (a |= a & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= a; 0 < l; ) {
        var u = 31 - Ut(l),
          f = 1 << u;
        (a |= t[u]), (l &= ~f);
      }
    return (na = a), Bl(), o;
  }
  function vv(t, a) {
    (Se = null),
      (I.H = rs),
      a === eo || a === Xl
        ? ((a = Pm()), (Ve = 3))
        : a === _m
          ? ((a = Pm()), (Ve = 4))
          : (Ve =
              a === Vp
                ? 8
                : a !== null &&
                    typeof a == "object" &&
                    typeof a.then == "function"
                  ? 6
                  : 1),
      (qt = a),
      we === null && ((Ke = 1), us(t, rn(a, t.current)));
  }
  function bv() {
    var t = I.H;
    return (I.H = rs), t === null ? rs : t;
  }
  function yv() {
    var t = I.A;
    return (I.A = bO), t;
  }
  function Kd() {
    (Ke = 4),
      Ta || ((Re & 4194048) !== Re && cn.current !== null) || (Ji = !0),
      ((Aa & 134217727) === 0 && (si & 134217727) === 0) ||
        Ue === null ||
        Na(Ue, Re, un, !1);
  }
  function Qd(t, a, o) {
    var l = Pe;
    Pe |= 2;
    var u = bv(),
      f = yv();
    (Ue !== t || Re !== a) && ((vs = null), ar(t, a)), (a = !1);
    var v = Ke;
    e: do
      try {
        if (Ve !== 0 && we !== null) {
          var S = we,
            T = qt;
          switch (Ve) {
            case 8:
              Xd(), (v = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              cn.current === null && (a = !0);
              var M = Ve;
              if (((Ve = 0), (qt = null), ir(t, S, T, M), o && Ji)) {
                v = 0;
                break e;
              }
              break;
            default:
              (M = Ve), (Ve = 0), (qt = null), ir(t, S, T, M);
          }
        }
        SO(), (v = Ke);
        break;
      } catch (q) {
        vv(t, q);
      }
    while (!0);
    return (
      a && t.shellSuspendCounter++,
      (Yn = ni = null),
      (Pe = l),
      (I.H = u),
      (I.A = f),
      we === null && ((Ue = null), (Re = 0), Bl()),
      v
    );
  }
  function SO() {
    for (; we !== null; ) xv(we);
  }
  function CO(t, a) {
    var o = Pe;
    Pe |= 2;
    var l = bv(),
      u = yv();
    Ue !== t || Re !== a
      ? ((vs = null), (ps = tn() + 500), ar(t, a))
      : (Ji = Vr(t, a));
    e: do
      try {
        if (Ve !== 0 && we !== null) {
          a = we;
          var f = qt;
          t: switch (Ve) {
            case 1:
              (Ve = 0), (qt = null), ir(t, a, f, 1);
              break;
            case 2:
            case 9:
              if (Nm(f)) {
                (Ve = 0), (qt = null), Sv(a);
                break;
              }
              (a = function () {
                (Ve !== 2 && Ve !== 9) || Ue !== t || (Ve = 7), _n(t);
              }),
                f.then(a, a);
              break e;
            case 3:
              Ve = 7;
              break e;
            case 4:
              Ve = 5;
              break e;
            case 7:
              Nm(f)
                ? ((Ve = 0), (qt = null), Sv(a))
                : ((Ve = 0), (qt = null), ir(t, a, f, 7));
              break;
            case 5:
              var v = null;
              switch (we.tag) {
                case 26:
                  v = we.memoizedState;
                case 5:
                case 27:
                  var S = we;
                  if (!v || nb(v)) {
                    (Ve = 0), (qt = null);
                    var T = S.sibling;
                    if (T !== null) we = T;
                    else {
                      var M = S.return;
                      M !== null ? ((we = M), ys(M)) : (we = null);
                    }
                    break t;
                  }
              }
              (Ve = 0), (qt = null), ir(t, a, f, 5);
              break;
            case 6:
              (Ve = 0), (qt = null), ir(t, a, f, 6);
              break;
            case 8:
              Xd(), (Ke = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        EO();
        break;
      } catch (q) {
        vv(t, q);
      }
    while (!0);
    return (
      (Yn = ni = null),
      (I.H = l),
      (I.A = u),
      (Pe = o),
      we !== null ? 0 : ((Ue = null), (Re = 0), Bl(), Ke)
    );
  }
  function EO() {
    for (; we !== null && !Ei(); ) xv(we);
  }
  function xv(t) {
    var a = qp(t.alternate, t, na);
    (t.memoizedProps = t.pendingProps), a === null ? ys(t) : (we = a);
  }
  function Sv(t) {
    var a = t,
      o = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = jp(o, a, a.pendingProps, a.type, void 0, Re);
        break;
      case 11:
        a = jp(o, a, a.pendingProps, a.type.render, a.ref, Re);
        break;
      case 5:
        fd(a);
      default:
        Xp(o, a), (a = we = Cm(a, na)), (a = qp(o, a, na));
    }
    (t.memoizedProps = t.pendingProps), a === null ? ys(t) : (we = a);
  }
  function ir(t, a, o, l) {
    (Yn = ni = null), fd(a), (Xi = null), (co = 0);
    var u = a.return;
    try {
      if (fO(t, u, a, o, Re)) {
        (Ke = 1), us(t, rn(o, t.current)), (we = null);
        return;
      }
    } catch (f) {
      if (u !== null) throw ((we = u), f);
      (Ke = 1), us(t, rn(o, t.current)), (we = null);
      return;
    }
    a.flags & 32768
      ? (Ae || l === 1
          ? (t = !0)
          : Ji || (Re & 536870912) !== 0
            ? (t = !1)
            : ((Ta = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = cn.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        Cv(a, t))
      : ys(a);
  }
  function ys(t) {
    var a = t;
    do {
      if ((a.flags & 32768) !== 0) {
        Cv(a, Ta);
        return;
      }
      t = a.return;
      var o = hO(a.alternate, a, na);
      if (o !== null) {
        we = o;
        return;
      }
      if (((a = a.sibling), a !== null)) {
        we = a;
        return;
      }
      we = a = t;
    } while (a !== null);
    Ke === 0 && (Ke = 5);
  }
  function Cv(t, a) {
    do {
      var o = mO(t.alternate, t);
      if (o !== null) {
        (o.flags &= 32767), (we = o);
        return;
      }
      if (
        ((o = t.return),
        o !== null &&
          ((o.flags |= 32768), (o.subtreeFlags = 0), (o.deletions = null)),
        !a && ((t = t.sibling), t !== null))
      ) {
        we = t;
        return;
      }
      we = t = o;
    } while (t !== null);
    (Ke = 6), (we = null);
  }
  function Ev(t, a, o, l, u, f, v, S, T) {
    t.cancelPendingCommit = null;
    do xs();
    while (vt !== 0);
    if ((Pe & 6) !== 0) throw Error(r(327));
    if (a !== null) {
      if (a === t.current) throw Error(r(177));
      if (
        ((f = a.lanes | a.childLanes),
        (f |= ju),
        tE(t, o, f, v, S, T),
        t === Ue && ((we = Ue = null), (Re = 0)),
        (tr = a),
        (_a = t),
        (nr = o),
        (Wd = f),
        (qd = u),
        (gv = l),
        (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            RO(Oi, function () {
              return Tv(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (a.flags & 13878) !== 0),
        (a.subtreeFlags & 13878) !== 0 || l)
      ) {
        (l = I.T), (I.T = null), (u = F.p), (F.p = 2), (v = Pe), (Pe |= 4);
        try {
          pO(t, a, o);
        } finally {
          (Pe = v), (F.p = u), (I.T = l);
        }
      }
      (vt = 1), Ov(), wv(), kv();
    }
  }
  function Ov() {
    if (vt === 1) {
      vt = 0;
      var t = _a,
        a = tr,
        o = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || o) {
        (o = I.T), (I.T = null);
        var l = F.p;
        F.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          ov(a, t);
          var f = uf,
            v = fm(t.containerInfo),
            S = f.focusedElem,
            T = f.selectionRange;
          if (
            v !== S &&
            S &&
            S.ownerDocument &&
            dm(S.ownerDocument.documentElement, S)
          ) {
            if (T !== null && Du(S)) {
              var M = T.start,
                q = T.end;
              if ((q === void 0 && (q = M), "selectionStart" in S))
                (S.selectionStart = M),
                  (S.selectionEnd = Math.min(q, S.value.length));
              else {
                var Q = S.ownerDocument || document,
                  L = (Q && Q.defaultView) || window;
                if (L.getSelection) {
                  var H = L.getSelection(),
                    de = S.textContent.length,
                    ce = Math.min(T.start, de),
                    Le = T.end === void 0 ? ce : Math.min(T.end, de);
                  !H.extend && ce > Le && ((v = Le), (Le = ce), (ce = v));
                  var P = um(S, ce),
                    N = um(S, Le);
                  if (
                    P &&
                    N &&
                    (H.rangeCount !== 1 ||
                      H.anchorNode !== P.node ||
                      H.anchorOffset !== P.offset ||
                      H.focusNode !== N.node ||
                      H.focusOffset !== N.offset)
                  ) {
                    var D = Q.createRange();
                    D.setStart(P.node, P.offset),
                      H.removeAllRanges(),
                      ce > Le
                        ? (H.addRange(D), H.extend(N.node, N.offset))
                        : (D.setEnd(N.node, N.offset), H.addRange(D));
                  }
                }
              }
            }
            for (Q = [], H = S; (H = H.parentNode); )
              H.nodeType === 1 &&
                Q.push({ element: H, left: H.scrollLeft, top: H.scrollTop });
            for (
              typeof S.focus == "function" && S.focus(), S = 0;
              S < Q.length;
              S++
            ) {
              var X = Q[S];
              (X.element.scrollLeft = X.left), (X.element.scrollTop = X.top);
            }
          }
          (Ns = !!cf), (uf = cf = null);
        } finally {
          (Pe = u), (F.p = l), (I.T = o);
        }
      }
      (t.current = a), (vt = 2);
    }
  }
  function wv() {
    if (vt === 2) {
      vt = 0;
      var t = _a,
        a = tr,
        o = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || o) {
        (o = I.T), (I.T = null);
        var l = F.p;
        F.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          nv(t, a.alternate, a);
        } finally {
          (Pe = u), (F.p = l), (I.T = o);
        }
      }
      vt = 3;
    }
  }
  function kv() {
    if (vt === 4 || vt === 3) {
      (vt = 0), ha();
      var t = _a,
        a = tr,
        o = nr,
        l = gv;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0
        ? (vt = 5)
        : ((vt = 0), (tr = _a = null), Rv(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (za = null),
        mu(o),
        (a = a.stateNode),
        jt && typeof jt.onCommitFiberRoot == "function")
      )
        try {
          jt.onCommitFiberRoot(Pr, a, void 0, (a.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        (a = I.T), (u = F.p), (F.p = 2), (I.T = null);
        try {
          for (var f = t.onRecoverableError, v = 0; v < l.length; v++) {
            var S = l[v];
            f(S.value, { componentStack: S.stack });
          }
        } finally {
          (I.T = a), (F.p = u);
        }
      }
      (nr & 3) !== 0 && xs(),
        _n(t),
        (u = t.pendingLanes),
        (o & 4194090) !== 0 && (u & 42) !== 0
          ? t === Yd
            ? yo++
            : ((yo = 0), (Yd = t))
          : (yo = 0),
        xo(0);
    }
  }
  function Rv(t, a) {
    (t.pooledCacheLanes &= a) === 0 &&
      ((a = t.pooledCache), a != null && ((t.pooledCache = null), Zr(a)));
  }
  function xs(t) {
    return Ov(), wv(), kv(), Tv();
  }
  function Tv() {
    if (vt !== 5) return !1;
    var t = _a,
      a = Wd;
    Wd = 0;
    var o = mu(nr),
      l = I.T,
      u = F.p;
    try {
      (F.p = 32 > o ? 32 : o), (I.T = null), (o = qd), (qd = null);
      var f = _a,
        v = nr;
      if (((vt = 0), (tr = _a = null), (nr = 0), (Pe & 6) !== 0))
        throw Error(r(331));
      var S = Pe;
      if (
        ((Pe |= 4),
        dv(f.current),
        sv(f, f.current, v, o),
        (Pe = S),
        xo(0, !1),
        jt && typeof jt.onPostCommitFiberRoot == "function")
      )
        try {
          jt.onPostCommitFiberRoot(Pr, f);
        } catch {}
      return !0;
    } finally {
      (F.p = u), (I.T = l), Rv(t, a);
    }
  }
  function Av(t, a, o) {
    (a = rn(o, a)),
      (a = kd(t.stateNode, a, 2)),
      (t = Sa(t, a, 2)),
      t !== null && (Dr(t, 2), _n(t));
  }
  function He(t, a, o) {
    if (t.tag === 3) Av(t, t, o);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          Av(a, t, o);
          break;
        } else if (a.tag === 1) {
          var l = a.stateNode;
          if (
            typeof a.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (za === null || !za.has(l)))
          ) {
            (t = rn(o, t)),
              (o = Ip(2)),
              (l = Sa(a, o, 2)),
              l !== null && (Pp(o, l, a, t), Dr(l, 2), _n(l));
            break;
          }
        }
        a = a.return;
      }
  }
  function Zd(t, a, o) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new yO();
      var u = new Set();
      l.set(a, u);
    } else (u = l.get(a)), u === void 0 && ((u = new Set()), l.set(a, u));
    u.has(o) ||
      ((Ud = !0), u.add(o), (t = OO.bind(null, t, a, o)), a.then(t, t));
  }
  function OO(t, a, o) {
    var l = t.pingCache;
    l !== null && l.delete(a),
      (t.pingedLanes |= t.suspendedLanes & o),
      (t.warmLanes &= ~o),
      Ue === t &&
        (Re & o) === o &&
        (Ke === 4 || (Ke === 3 && (Re & 62914560) === Re && 300 > tn() - Gd)
          ? (Pe & 2) === 0 && ar(t, 0)
          : ($d |= o),
        er === Re && (er = 0)),
      _n(t);
  }
  function zv(t, a) {
    a === 0 && (a = kh()), (t = Hi(t, a)), t !== null && (Dr(t, a), _n(t));
  }
  function wO(t) {
    var a = t.memoizedState,
      o = 0;
    a !== null && (o = a.retryLane), zv(t, o);
  }
  function kO(t, a) {
    var o = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode,
          u = t.memoizedState;
        u !== null && (o = u.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    l !== null && l.delete(a), zv(t, o);
  }
  function RO(t, a) {
    return Ze(t, a);
  }
  var Ss = null,
    rr = null,
    Jd = !1,
    Cs = !1,
    ef = !1,
    ci = 0;
  function _n(t) {
    t !== rr &&
      t.next === null &&
      (rr === null ? (Ss = rr = t) : (rr = rr.next = t)),
      (Cs = !0),
      Jd || ((Jd = !0), AO());
  }
  function xo(t, a) {
    if (!ef && Cs) {
      ef = !0;
      do
        for (var o = !1, l = Ss; l !== null; ) {
          if (t !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var v = l.suspendedLanes,
                S = l.pingedLanes;
              (f = (1 << (31 - Ut(42 | t) + 1)) - 1),
                (f &= u & ~(v & ~S)),
                (f = f & 201326741 ? (f & 201326741) | 1 : f ? f | 2 : 0);
            }
            f !== 0 && ((o = !0), Pv(l, f));
          } else
            (f = Re),
              (f = Tl(
                l,
                l === Ue ? f : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (f & 3) === 0 || Vr(l, f) || ((o = !0), Pv(l, f));
          l = l.next;
        }
      while (o);
      ef = !1;
    }
  }
  function TO() {
    _v();
  }
  function _v() {
    Cs = Jd = !1;
    var t = 0;
    ci !== 0 && (MO() && (t = ci), (ci = 0));
    for (var a = tn(), o = null, l = Ss; l !== null; ) {
      var u = l.next,
        f = Nv(l, a);
      f === 0
        ? ((l.next = null),
          o === null ? (Ss = u) : (o.next = u),
          u === null && (rr = o))
        : ((o = l), (t !== 0 || (f & 3) !== 0) && (Cs = !0)),
        (l = u);
    }
    xo(t);
  }
  function Nv(t, a) {
    for (
      var o = t.suspendedLanes,
        l = t.pingedLanes,
        u = t.expirationTimes,
        f = t.pendingLanes & -62914561;
      0 < f;

    ) {
      var v = 31 - Ut(f),
        S = 1 << v,
        T = u[v];
      T === -1
        ? ((S & o) === 0 || (S & l) !== 0) && (u[v] = eE(S, a))
        : T <= a && (t.expiredLanes |= S),
        (f &= ~S);
    }
    if (
      ((a = Ue),
      (o = Re),
      (o = Tl(
        t,
        t === a ? o : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (l = t.callbackNode),
      o === 0 ||
        (t === a && (Ve === 2 || Ve === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && Bt(l),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((o & 3) === 0 || Vr(t, o)) {
      if (((a = o & -o), a === t.callbackPriority)) return a;
      switch ((l !== null && Bt(l), mu(o))) {
        case 2:
        case 8:
          o = _r;
          break;
        case 32:
          o = Oi;
          break;
        case 268435456:
          o = Nr;
          break;
        default:
          o = Oi;
      }
      return (
        (l = Iv.bind(null, t)),
        (o = Ze(o, l)),
        (t.callbackPriority = a),
        (t.callbackNode = o),
        a
      );
    }
    return (
      l !== null && l !== null && Bt(l),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Iv(t, a) {
    if (vt !== 0 && vt !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var o = t.callbackNode;
    if (xs() && t.callbackNode !== o) return null;
    var l = Re;
    return (
      (l = Tl(
        t,
        t === Ue ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (mv(t, l, a),
          Nv(t, tn()),
          t.callbackNode != null && t.callbackNode === o
            ? Iv.bind(null, t)
            : null)
    );
  }
  function Pv(t, a) {
    if (xs()) return null;
    mv(t, a, !0);
  }
  function AO() {
    HO(function () {
      (Pe & 6) !== 0 ? Ze(Ol, TO) : _v();
    });
  }
  function tf() {
    return ci === 0 && (ci = wh()), ci;
  }
  function Vv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Il("" + t);
  }
  function Dv(t, a) {
    var o = a.ownerDocument.createElement("input");
    return (
      (o.name = a.name),
      (o.value = a.value),
      t.id && o.setAttribute("form", t.id),
      a.parentNode.insertBefore(o, a),
      (t = new FormData(t)),
      o.parentNode.removeChild(o),
      t
    );
  }
  function zO(t, a, o, l, u) {
    if (a === "submit" && o && o.stateNode === u) {
      var f = Vv((u[Nt] || null).action),
        v = l.submitter;
      v &&
        ((a = (a = v[Nt] || null)
          ? Vv(a.formAction)
          : v.getAttribute("formAction")),
        a !== null && ((f = a), (v = null)));
      var S = new Ml("action", "action", null, l, u);
      t.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (ci !== 0) {
                  var T = v ? Dv(u, v) : new FormData(u);
                  Sd(
                    o,
                    { pending: !0, data: T, method: u.method, action: f },
                    null,
                    T,
                  );
                }
              } else
                typeof f == "function" &&
                  (S.preventDefault(),
                  (T = v ? Dv(u, v) : new FormData(u)),
                  Sd(
                    o,
                    { pending: !0, data: T, method: u.method, action: f },
                    f,
                    T,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var nf = 0; nf < Bu.length; nf++) {
    var af = Bu[nf],
      _O = af.toLowerCase(),
      NO = af[0].toUpperCase() + af.slice(1);
    vn(_O, "on" + NO);
  }
  vn(mm, "onAnimationEnd"),
    vn(pm, "onAnimationIteration"),
    vn(vm, "onAnimationStart"),
    vn("dblclick", "onDoubleClick"),
    vn("focusin", "onFocus"),
    vn("focusout", "onBlur"),
    vn(XE, "onTransitionRun"),
    vn(KE, "onTransitionStart"),
    vn(QE, "onTransitionCancel"),
    vn(bm, "onTransitionEnd"),
    Ai("onMouseEnter", ["mouseout", "mouseover"]),
    Ai("onMouseLeave", ["mouseout", "mouseover"]),
    Ai("onPointerEnter", ["pointerout", "pointerover"]),
    Ai("onPointerLeave", ["pointerout", "pointerover"]),
    qa(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    qa(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    qa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    qa(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    qa(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    qa(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var So =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    IO = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(So),
    );
  function Mv(t, a) {
    a = (a & 4) !== 0;
    for (var o = 0; o < t.length; o++) {
      var l = t[o],
        u = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (a)
          for (var v = l.length - 1; 0 <= v; v--) {
            var S = l[v],
              T = S.instance,
              M = S.currentTarget;
            if (((S = S.listener), T !== f && u.isPropagationStopped()))
              break e;
            (f = S), (u.currentTarget = M);
            try {
              f(u);
            } catch (q) {
              cs(q);
            }
            (u.currentTarget = null), (f = T);
          }
        else
          for (v = 0; v < l.length; v++) {
            if (
              ((S = l[v]),
              (T = S.instance),
              (M = S.currentTarget),
              (S = S.listener),
              T !== f && u.isPropagationStopped())
            )
              break e;
            (f = S), (u.currentTarget = M);
            try {
              f(u);
            } catch (q) {
              cs(q);
            }
            (u.currentTarget = null), (f = T);
          }
      }
    }
  }
  function ke(t, a) {
    var o = a[pu];
    o === void 0 && (o = a[pu] = new Set());
    var l = t + "__bubble";
    o.has(l) || (Lv(a, t, 2, !1), o.add(l));
  }
  function rf(t, a, o) {
    var l = 0;
    a && (l |= 4), Lv(o, t, l, a);
  }
  var Es = "_reactListening" + Math.random().toString(36).slice(2);
  function of(t) {
    if (!t[Es]) {
      (t[Es] = !0),
        _h.forEach(function (o) {
          o !== "selectionchange" && (IO.has(o) || rf(o, !1, t), rf(o, !0, t));
        });
      var a = t.nodeType === 9 ? t : t.ownerDocument;
      a === null || a[Es] || ((a[Es] = !0), rf("selectionchange", !1, a));
    }
  }
  function Lv(t, a, o, l) {
    switch (sb(a)) {
      case 2:
        var u = ow;
        break;
      case 8:
        u = lw;
        break;
      default:
        u = xf;
    }
    (o = u.bind(null, a, o, t)),
      (u = void 0),
      !Ru ||
        (a !== "touchstart" && a !== "touchmove" && a !== "wheel") ||
        (u = !0),
      l
        ? u !== void 0
          ? t.addEventListener(a, o, { capture: !0, passive: u })
          : t.addEventListener(a, o, !0)
        : u !== void 0
          ? t.addEventListener(a, o, { passive: u })
          : t.addEventListener(a, o, !1);
  }
  function lf(t, a, o, l, u) {
    var f = l;
    if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var v = l.tag;
        if (v === 3 || v === 4) {
          var S = l.stateNode.containerInfo;
          if (S === u) break;
          if (v === 4)
            for (v = l.return; v !== null; ) {
              var T = v.tag;
              if ((T === 3 || T === 4) && v.stateNode.containerInfo === u)
                return;
              v = v.return;
            }
          for (; S !== null; ) {
            if (((v = ki(S)), v === null)) return;
            if (((T = v.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              l = f = v;
              continue e;
            }
            S = S.parentNode;
          }
        }
        l = l.return;
      }
    Gh(function () {
      var M = f,
        q = wu(o),
        Q = [];
      e: {
        var L = ym.get(t);
        if (L !== void 0) {
          var H = Ml,
            de = t;
          switch (t) {
            case "keypress":
              if (Vl(o) === 0) break e;
            case "keydown":
            case "keyup":
              H = RE;
              break;
            case "focusin":
              (de = "focus"), (H = _u);
              break;
            case "focusout":
              (de = "blur"), (H = _u);
              break;
            case "beforeblur":
            case "afterblur":
              H = _u;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = Yh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = mE;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = zE;
              break;
            case mm:
            case pm:
            case vm:
              H = bE;
              break;
            case bm:
              H = NE;
              break;
            case "scroll":
            case "scrollend":
              H = gE;
              break;
            case "wheel":
              H = PE;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = xE;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Kh;
              break;
            case "toggle":
            case "beforetoggle":
              H = DE;
          }
          var ce = (a & 4) !== 0,
            Le = !ce && (t === "scroll" || t === "scrollend"),
            P = ce ? (L !== null ? L + "Capture" : null) : L;
          ce = [];
          for (var N = M, D; N !== null; ) {
            var X = N;
            if (
              ((D = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                D === null ||
                P === null ||
                ((X = Hr(N, P)), X != null && ce.push(Co(N, X, D))),
              Le)
            )
              break;
            N = N.return;
          }
          0 < ce.length &&
            ((L = new H(L, de, null, o, q)),
            Q.push({ event: L, listeners: ce }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (
            ((L = t === "mouseover" || t === "pointerover"),
            (H = t === "mouseout" || t === "pointerout"),
            L &&
              o !== Ou &&
              (de = o.relatedTarget || o.fromElement) &&
              (ki(de) || de[wi]))
          )
            break e;
          if (
            (H || L) &&
            ((L =
              q.window === q
                ? q
                : (L = q.ownerDocument)
                  ? L.defaultView || L.parentWindow
                  : window),
            H
              ? ((de = o.relatedTarget || o.toElement),
                (H = M),
                (de = de ? ki(de) : null),
                de !== null &&
                  ((Le = c(de)),
                  (ce = de.tag),
                  de !== Le || (ce !== 5 && ce !== 27 && ce !== 6)) &&
                  (de = null))
              : ((H = null), (de = M)),
            H !== de)
          ) {
            if (
              ((ce = Yh),
              (X = "onMouseLeave"),
              (P = "onMouseEnter"),
              (N = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ce = Kh),
                (X = "onPointerLeave"),
                (P = "onPointerEnter"),
                (N = "pointer")),
              (Le = H == null ? L : Lr(H)),
              (D = de == null ? L : Lr(de)),
              (L = new ce(X, N + "leave", H, o, q)),
              (L.target = Le),
              (L.relatedTarget = D),
              (X = null),
              ki(q) === M &&
                ((ce = new ce(P, N + "enter", de, o, q)),
                (ce.target = D),
                (ce.relatedTarget = Le),
                (X = ce)),
              (Le = X),
              H && de)
            )
              t: {
                for (ce = H, P = de, N = 0, D = ce; D; D = or(D)) N++;
                for (D = 0, X = P; X; X = or(X)) D++;
                for (; 0 < N - D; ) (ce = or(ce)), N--;
                for (; 0 < D - N; ) (P = or(P)), D--;
                for (; N--; ) {
                  if (ce === P || (P !== null && ce === P.alternate)) break t;
                  (ce = or(ce)), (P = or(P));
                }
                ce = null;
              }
            else ce = null;
            H !== null && Hv(Q, L, H, ce, !1),
              de !== null && Le !== null && Hv(Q, Le, de, ce, !0);
          }
        }
        e: {
          if (
            ((L = M ? Lr(M) : window),
            (H = L.nodeName && L.nodeName.toLowerCase()),
            H === "select" || (H === "input" && L.type === "file"))
          )
            var oe = im;
          else if (nm(L))
            if (rm) oe = WE;
            else {
              oe = FE;
              var Oe = $E;
            }
          else
            (H = L.nodeName),
              !H ||
              H.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? M && Eu(M.elementType) && (oe = im)
                : (oe = GE);
          if (oe && (oe = oe(t, M))) {
            am(Q, oe, o, q);
            break e;
          }
          Oe && Oe(t, L, M),
            t === "focusout" &&
              M &&
              L.type === "number" &&
              M.memoizedProps.value != null &&
              Cu(L, "number", L.value);
        }
        switch (((Oe = M ? Lr(M) : window), t)) {
          case "focusin":
            (nm(Oe) || Oe.contentEditable === "true") &&
              ((Di = Oe), (Mu = M), (qr = null));
            break;
          case "focusout":
            qr = Mu = Di = null;
            break;
          case "mousedown":
            Lu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Lu = !1), gm(Q, o, q);
            break;
          case "selectionchange":
            if (YE) break;
          case "keydown":
          case "keyup":
            gm(Q, o, q);
        }
        var se;
        if (Iu)
          e: {
            switch (t) {
              case "compositionstart":
                var ue = "onCompositionStart";
                break e;
              case "compositionend":
                ue = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ue = "onCompositionUpdate";
                break e;
            }
            ue = void 0;
          }
        else
          Vi
            ? em(t, o) && (ue = "onCompositionEnd")
            : t === "keydown" &&
              o.keyCode === 229 &&
              (ue = "onCompositionStart");
        ue &&
          (Qh &&
            o.locale !== "ko" &&
            (Vi || ue !== "onCompositionStart"
              ? ue === "onCompositionEnd" && Vi && (se = Wh())
              : ((va = q),
                (Tu = "value" in va ? va.value : va.textContent),
                (Vi = !0))),
          (Oe = Os(M, ue)),
          0 < Oe.length &&
            ((ue = new Xh(ue, t, null, o, q)),
            Q.push({ event: ue, listeners: Oe }),
            se
              ? (ue.data = se)
              : ((se = tm(o)), se !== null && (ue.data = se)))),
          (se = LE ? HE(t, o) : BE(t, o)) &&
            ((ue = Os(M, "onBeforeInput")),
            0 < ue.length &&
              ((Oe = new Xh("onBeforeInput", "beforeinput", null, o, q)),
              Q.push({ event: Oe, listeners: ue }),
              (Oe.data = se))),
          zO(Q, t, M, o, q);
      }
      Mv(Q, a);
    });
  }
  function Co(t, a, o) {
    return { instance: t, listener: a, currentTarget: o };
  }
  function Os(t, a) {
    for (var o = a + "Capture", l = []; t !== null; ) {
      var u = t,
        f = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          f === null ||
          ((u = Hr(t, o)),
          u != null && l.unshift(Co(t, u, f)),
          (u = Hr(t, a)),
          u != null && l.push(Co(t, u, f))),
        t.tag === 3)
      )
        return l;
      t = t.return;
    }
    return [];
  }
  function or(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Hv(t, a, o, l, u) {
    for (var f = a._reactName, v = []; o !== null && o !== l; ) {
      var S = o,
        T = S.alternate,
        M = S.stateNode;
      if (((S = S.tag), T !== null && T === l)) break;
      (S !== 5 && S !== 26 && S !== 27) ||
        M === null ||
        ((T = M),
        u
          ? ((M = Hr(o, f)), M != null && v.unshift(Co(o, M, T)))
          : u || ((M = Hr(o, f)), M != null && v.push(Co(o, M, T)))),
        (o = o.return);
    }
    v.length !== 0 && t.push({ event: a, listeners: v });
  }
  var PO = /\r\n?/g,
    VO = /\u0000|\uFFFD/g;
  function Bv(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        PO,
        `
`,
      )
      .replace(VO, "");
  }
  function jv(t, a) {
    return (a = Bv(a)), Bv(t) === a;
  }
  function ws() {}
  function Me(t, a, o, l, u, f) {
    switch (o) {
      case "children":
        typeof l == "string"
          ? a === "body" || (a === "textarea" && l === "") || Ni(t, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            a !== "body" &&
            Ni(t, "" + l);
        break;
      case "className":
        zl(t, "class", l);
        break;
      case "tabIndex":
        zl(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        zl(t, o, l);
        break;
      case "style":
        $h(t, l, f);
        break;
      case "data":
        if (a !== "object") {
          zl(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (a !== "a" || o !== "href")) {
          t.removeAttribute(o);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          t.removeAttribute(o);
          break;
        }
        (l = Il("" + l)), t.setAttribute(o, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            o,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof f == "function" &&
            (o === "formAction"
              ? (a !== "input" && Me(t, a, "name", u.name, u, null),
                Me(t, a, "formEncType", u.formEncType, u, null),
                Me(t, a, "formMethod", u.formMethod, u, null),
                Me(t, a, "formTarget", u.formTarget, u, null))
              : (Me(t, a, "encType", u.encType, u, null),
                Me(t, a, "method", u.method, u, null),
                Me(t, a, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(o);
          break;
        }
        (l = Il("" + l)), t.setAttribute(o, l);
        break;
      case "onClick":
        l != null && (t.onclick = ws);
        break;
      case "onScroll":
        l != null && ke("scroll", t);
        break;
      case "onScrollEnd":
        l != null && ke("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((o = l.__html), o != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = o;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (o = Il("" + l)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? t.setAttribute(o, "" + l)
          : t.removeAttribute(o);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? t.setAttribute(o, "")
          : t.removeAttribute(o);
        break;
      case "capture":
      case "download":
        l === !0
          ? t.setAttribute(o, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? t.setAttribute(o, l)
            : t.removeAttribute(o);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? t.setAttribute(o, l)
          : t.removeAttribute(o);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? t.removeAttribute(o)
          : t.setAttribute(o, l);
        break;
      case "popover":
        ke("beforetoggle", t), ke("toggle", t), Al(t, "popover", l);
        break;
      case "xlinkActuate":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        $n(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        $n(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        $n(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        $n(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Al(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < o.length) ||
          (o[0] !== "o" && o[0] !== "O") ||
          (o[1] !== "n" && o[1] !== "N")) &&
          ((o = dE.get(o) || o), Al(t, o, l));
    }
  }
  function sf(t, a, o, l, u, f) {
    switch (o) {
      case "style":
        $h(t, l, f);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((o = l.__html), o != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = o;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? Ni(t, l)
          : (typeof l == "number" || typeof l == "bigint") && Ni(t, "" + l);
        break;
      case "onScroll":
        l != null && ke("scroll", t);
        break;
      case "onScrollEnd":
        l != null && ke("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = ws);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Nh.hasOwnProperty(o))
          e: {
            if (
              o[0] === "o" &&
              o[1] === "n" &&
              ((u = o.endsWith("Capture")),
              (a = o.slice(2, u ? o.length - 7 : void 0)),
              (f = t[Nt] || null),
              (f = f != null ? f[o] : null),
              typeof f == "function" && t.removeEventListener(a, f, u),
              typeof l == "function")
            ) {
              typeof f != "function" &&
                f !== null &&
                (o in t
                  ? (t[o] = null)
                  : t.hasAttribute(o) && t.removeAttribute(o)),
                t.addEventListener(a, l, u);
              break e;
            }
            o in t
              ? (t[o] = l)
              : l === !0
                ? t.setAttribute(o, "")
                : Al(t, o, l);
          }
    }
  }
  function bt(t, a, o) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ke("error", t), ke("load", t);
        var l = !1,
          u = !1,
          f;
        for (f in o)
          if (o.hasOwnProperty(f)) {
            var v = o[f];
            if (v != null)
              switch (f) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, a));
                default:
                  Me(t, a, f, v, o, null);
              }
          }
        u && Me(t, a, "srcSet", o.srcSet, o, null),
          l && Me(t, a, "src", o.src, o, null);
        return;
      case "input":
        ke("invalid", t);
        var S = (f = v = u = null),
          T = null,
          M = null;
        for (l in o)
          if (o.hasOwnProperty(l)) {
            var q = o[l];
            if (q != null)
              switch (l) {
                case "name":
                  u = q;
                  break;
                case "type":
                  v = q;
                  break;
                case "checked":
                  T = q;
                  break;
                case "defaultChecked":
                  M = q;
                  break;
                case "value":
                  f = q;
                  break;
                case "defaultValue":
                  S = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null) throw Error(r(137, a));
                  break;
                default:
                  Me(t, a, l, q, o, null);
              }
          }
        Hh(t, f, S, T, M, v, u, !1), _l(t);
        return;
      case "select":
        ke("invalid", t), (l = v = f = null);
        for (u in o)
          if (o.hasOwnProperty(u) && ((S = o[u]), S != null))
            switch (u) {
              case "value":
                f = S;
                break;
              case "defaultValue":
                v = S;
                break;
              case "multiple":
                l = S;
              default:
                Me(t, a, u, S, o, null);
            }
        (a = f),
          (o = v),
          (t.multiple = !!l),
          a != null ? _i(t, !!l, a, !1) : o != null && _i(t, !!l, o, !0);
        return;
      case "textarea":
        ke("invalid", t), (f = u = l = null);
        for (v in o)
          if (o.hasOwnProperty(v) && ((S = o[v]), S != null))
            switch (v) {
              case "value":
                l = S;
                break;
              case "defaultValue":
                u = S;
                break;
              case "children":
                f = S;
                break;
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(r(91));
                break;
              default:
                Me(t, a, v, S, o, null);
            }
        jh(t, l, u, f), _l(t);
        return;
      case "option":
        for (T in o)
          if (o.hasOwnProperty(T) && ((l = o[T]), l != null))
            switch (T) {
              case "selected":
                t.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Me(t, a, T, l, o, null);
            }
        return;
      case "dialog":
        ke("beforetoggle", t), ke("toggle", t), ke("cancel", t), ke("close", t);
        break;
      case "iframe":
      case "object":
        ke("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < So.length; l++) ke(So[l], t);
        break;
      case "image":
        ke("error", t), ke("load", t);
        break;
      case "details":
        ke("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ke("error", t), ke("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (M in o)
          if (o.hasOwnProperty(M) && ((l = o[M]), l != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, a));
              default:
                Me(t, a, M, l, o, null);
            }
        return;
      default:
        if (Eu(a)) {
          for (q in o)
            o.hasOwnProperty(q) &&
              ((l = o[q]), l !== void 0 && sf(t, a, q, l, o, void 0));
          return;
        }
    }
    for (S in o)
      o.hasOwnProperty(S) && ((l = o[S]), l != null && Me(t, a, S, l, o, null));
  }
  function DO(t, a, o, l) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          f = null,
          v = null,
          S = null,
          T = null,
          M = null,
          q = null;
        for (H in o) {
          var Q = o[H];
          if (o.hasOwnProperty(H) && Q != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = Q;
              default:
                l.hasOwnProperty(H) || Me(t, a, H, null, l, Q);
            }
        }
        for (var L in l) {
          var H = l[L];
          if (((Q = o[L]), l.hasOwnProperty(L) && (H != null || Q != null)))
            switch (L) {
              case "type":
                f = H;
                break;
              case "name":
                u = H;
                break;
              case "checked":
                M = H;
                break;
              case "defaultChecked":
                q = H;
                break;
              case "value":
                v = H;
                break;
              case "defaultValue":
                S = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null) throw Error(r(137, a));
                break;
              default:
                H !== Q && Me(t, a, L, H, l, Q);
            }
        }
        Su(t, v, S, T, M, q, f, u);
        return;
      case "select":
        H = v = S = L = null;
        for (f in o)
          if (((T = o[f]), o.hasOwnProperty(f) && T != null))
            switch (f) {
              case "value":
                break;
              case "multiple":
                H = T;
              default:
                l.hasOwnProperty(f) || Me(t, a, f, null, l, T);
            }
        for (u in l)
          if (
            ((f = l[u]),
            (T = o[u]),
            l.hasOwnProperty(u) && (f != null || T != null))
          )
            switch (u) {
              case "value":
                L = f;
                break;
              case "defaultValue":
                S = f;
                break;
              case "multiple":
                v = f;
              default:
                f !== T && Me(t, a, u, f, l, T);
            }
        (a = S),
          (o = v),
          (l = H),
          L != null
            ? _i(t, !!o, L, !1)
            : !!l != !!o &&
              (a != null ? _i(t, !!o, a, !0) : _i(t, !!o, o ? [] : "", !1));
        return;
      case "textarea":
        H = L = null;
        for (S in o)
          if (
            ((u = o[S]),
            o.hasOwnProperty(S) && u != null && !l.hasOwnProperty(S))
          )
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                Me(t, a, S, null, l, u);
            }
        for (v in l)
          if (
            ((u = l[v]),
            (f = o[v]),
            l.hasOwnProperty(v) && (u != null || f != null))
          )
            switch (v) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                H = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== f && Me(t, a, v, u, l, f);
            }
        Bh(t, L, H);
        return;
      case "option":
        for (var de in o)
          if (
            ((L = o[de]),
            o.hasOwnProperty(de) && L != null && !l.hasOwnProperty(de))
          )
            switch (de) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Me(t, a, de, null, l, L);
            }
        for (T in l)
          if (
            ((L = l[T]),
            (H = o[T]),
            l.hasOwnProperty(T) && L !== H && (L != null || H != null))
          )
            switch (T) {
              case "selected":
                t.selected =
                  L && typeof L != "function" && typeof L != "symbol";
                break;
              default:
                Me(t, a, T, L, l, H);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ce in o)
          (L = o[ce]),
            o.hasOwnProperty(ce) &&
              L != null &&
              !l.hasOwnProperty(ce) &&
              Me(t, a, ce, null, l, L);
        for (M in l)
          if (
            ((L = l[M]),
            (H = o[M]),
            l.hasOwnProperty(M) && L !== H && (L != null || H != null))
          )
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(r(137, a));
                break;
              default:
                Me(t, a, M, L, l, H);
            }
        return;
      default:
        if (Eu(a)) {
          for (var Le in o)
            (L = o[Le]),
              o.hasOwnProperty(Le) &&
                L !== void 0 &&
                !l.hasOwnProperty(Le) &&
                sf(t, a, Le, void 0, l, L);
          for (q in l)
            (L = l[q]),
              (H = o[q]),
              !l.hasOwnProperty(q) ||
                L === H ||
                (L === void 0 && H === void 0) ||
                sf(t, a, q, L, l, H);
          return;
        }
    }
    for (var P in o)
      (L = o[P]),
        o.hasOwnProperty(P) &&
          L != null &&
          !l.hasOwnProperty(P) &&
          Me(t, a, P, null, l, L);
    for (Q in l)
      (L = l[Q]),
        (H = o[Q]),
        !l.hasOwnProperty(Q) ||
          L === H ||
          (L == null && H == null) ||
          Me(t, a, Q, L, l, H);
  }
  var cf = null,
    uf = null;
  function ks(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Uv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $v(t, a) {
    if (t === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && a === "foreignObject" ? 0 : t;
  }
  function df(t, a) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof a.children == "string" ||
      typeof a.children == "number" ||
      typeof a.children == "bigint" ||
      (typeof a.dangerouslySetInnerHTML == "object" &&
        a.dangerouslySetInnerHTML !== null &&
        a.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ff = null;
  function MO() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === ff
        ? !1
        : ((ff = t), !0)
      : ((ff = null), !1);
  }
  var Fv = typeof setTimeout == "function" ? setTimeout : void 0,
    LO = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Gv = typeof Promise == "function" ? Promise : void 0,
    HO =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Gv < "u"
          ? function (t) {
              return Gv.resolve(null).then(t).catch(BO);
            }
          : Fv;
  function BO(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Ia(t) {
    return t === "head";
  }
  function Wv(t, a) {
    var o = a,
      l = 0,
      u = 0;
    do {
      var f = o.nextSibling;
      if ((t.removeChild(o), f && f.nodeType === 8))
        if (((o = f.data), o === "/$")) {
          if (0 < l && 8 > l) {
            o = l;
            var v = t.ownerDocument;
            if ((o & 1 && Eo(v.documentElement), o & 2 && Eo(v.body), o & 4))
              for (o = v.head, Eo(o), v = o.firstChild; v; ) {
                var S = v.nextSibling,
                  T = v.nodeName;
                v[Mr] ||
                  T === "SCRIPT" ||
                  T === "STYLE" ||
                  (T === "LINK" && v.rel.toLowerCase() === "stylesheet") ||
                  o.removeChild(v),
                  (v = S);
              }
          }
          if (u === 0) {
            t.removeChild(f), _o(a);
            return;
          }
          u--;
        } else
          o === "$" || o === "$?" || o === "$!"
            ? u++
            : (l = o.charCodeAt(0) - 48);
      else l = 0;
      o = f;
    } while (o);
    _o(a);
  }
  function gf(t) {
    var a = t.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var o = a;
      switch (((a = a.nextSibling), o.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gf(o), vu(o);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (o.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(o);
    }
  }
  function jO(t, a, o, l) {
    for (; t.nodeType === 1; ) {
      var u = o;
      if (t.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (l) {
        if (!t[Mr])
          switch (a) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((f = t.getAttribute("rel")),
                f === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                f !== u.rel ||
                t.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((f = t.getAttribute("src")),
                (f !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  f &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (a === "input" && t.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === f) return t;
      } else return t;
      if (((t = yn(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function UO(t, a, o) {
    if (a === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !o) ||
        ((t = yn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function hf(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState === "complete")
    );
  }
  function $O(t, a) {
    var o = t.ownerDocument;
    if (t.data !== "$?" || o.readyState === "complete") a();
    else {
      var l = function () {
        a(), o.removeEventListener("DOMContentLoaded", l);
      };
      o.addEventListener("DOMContentLoaded", l), (t._reactRetry = l);
    }
  }
  function yn(t) {
    for (; t != null; t = t.nextSibling) {
      var a = t.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (
          ((a = t.data),
          a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
        )
          break;
        if (a === "/$") return null;
      }
    }
    return t;
  }
  var mf = null;
  function qv(t) {
    t = t.previousSibling;
    for (var a = 0; t; ) {
      if (t.nodeType === 8) {
        var o = t.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (a === 0) return t;
          a--;
        } else o === "/$" && a++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Yv(t, a, o) {
    switch (((a = ks(o)), t)) {
      case "html":
        if (((t = a.documentElement), !t)) throw Error(r(452));
        return t;
      case "head":
        if (((t = a.head), !t)) throw Error(r(453));
        return t;
      case "body":
        if (((t = a.body), !t)) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Eo(t) {
    for (var a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
    vu(t);
  }
  var dn = new Map(),
    Xv = new Set();
  function Rs(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var aa = F.d;
  F.d = { f: FO, r: GO, D: WO, C: qO, L: YO, m: XO, X: QO, S: KO, M: ZO };
  function FO() {
    var t = aa.f(),
      a = bs();
    return t || a;
  }
  function GO(t) {
    var a = Ri(t);
    a !== null && a.tag === 5 && a.type === "form" ? mp(a) : aa.r(t);
  }
  var lr = typeof document > "u" ? null : document;
  function Kv(t, a, o) {
    var l = lr;
    if (l && typeof a == "string" && a) {
      var u = an(a);
      (u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof o == "string" && (u += '[crossorigin="' + o + '"]'),
        Xv.has(u) ||
          (Xv.add(u),
          (t = { rel: t, crossOrigin: o, href: a }),
          l.querySelector(u) === null &&
            ((a = l.createElement("link")),
            bt(a, "link", t),
            ct(a),
            l.head.appendChild(a)));
    }
  }
  function WO(t) {
    aa.D(t), Kv("dns-prefetch", t, null);
  }
  function qO(t, a) {
    aa.C(t, a), Kv("preconnect", t, a);
  }
  function YO(t, a, o) {
    aa.L(t, a, o);
    var l = lr;
    if (l && t && a) {
      var u = 'link[rel="preload"][as="' + an(a) + '"]';
      a === "image" && o && o.imageSrcSet
        ? ((u += '[imagesrcset="' + an(o.imageSrcSet) + '"]'),
          typeof o.imageSizes == "string" &&
            (u += '[imagesizes="' + an(o.imageSizes) + '"]'))
        : (u += '[href="' + an(t) + '"]');
      var f = u;
      switch (a) {
        case "style":
          f = sr(t);
          break;
        case "script":
          f = cr(t);
      }
      dn.has(f) ||
        ((t = p(
          {
            rel: "preload",
            href: a === "image" && o && o.imageSrcSet ? void 0 : t,
            as: a,
          },
          o,
        )),
        dn.set(f, t),
        l.querySelector(u) !== null ||
          (a === "style" && l.querySelector(Oo(f))) ||
          (a === "script" && l.querySelector(wo(f))) ||
          ((a = l.createElement("link")),
          bt(a, "link", t),
          ct(a),
          l.head.appendChild(a)));
    }
  }
  function XO(t, a) {
    aa.m(t, a);
    var o = lr;
    if (o && t) {
      var l = a && typeof a.as == "string" ? a.as : "script",
        u =
          'link[rel="modulepreload"][as="' + an(l) + '"][href="' + an(t) + '"]',
        f = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = cr(t);
      }
      if (
        !dn.has(f) &&
        ((t = p({ rel: "modulepreload", href: t }, a)),
        dn.set(f, t),
        o.querySelector(u) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (o.querySelector(wo(f))) return;
        }
        (l = o.createElement("link")),
          bt(l, "link", t),
          ct(l),
          o.head.appendChild(l);
      }
    }
  }
  function KO(t, a, o) {
    aa.S(t, a, o);
    var l = lr;
    if (l && t) {
      var u = Ti(l).hoistableStyles,
        f = sr(t);
      a = a || "default";
      var v = u.get(f);
      if (!v) {
        var S = { loading: 0, preload: null };
        if ((v = l.querySelector(Oo(f)))) S.loading = 5;
        else {
          (t = p({ rel: "stylesheet", href: t, "data-precedence": a }, o)),
            (o = dn.get(f)) && pf(t, o);
          var T = (v = l.createElement("link"));
          ct(T),
            bt(T, "link", t),
            (T._p = new Promise(function (M, q) {
              (T.onload = M), (T.onerror = q);
            })),
            T.addEventListener("load", function () {
              S.loading |= 1;
            }),
            T.addEventListener("error", function () {
              S.loading |= 2;
            }),
            (S.loading |= 4),
            Ts(v, a, l);
        }
        (v = { type: "stylesheet", instance: v, count: 1, state: S }),
          u.set(f, v);
      }
    }
  }
  function QO(t, a) {
    aa.X(t, a);
    var o = lr;
    if (o && t) {
      var l = Ti(o).hoistableScripts,
        u = cr(t),
        f = l.get(u);
      f ||
        ((f = o.querySelector(wo(u))),
        f ||
          ((t = p({ src: t, async: !0 }, a)),
          (a = dn.get(u)) && vf(t, a),
          (f = o.createElement("script")),
          ct(f),
          bt(f, "link", t),
          o.head.appendChild(f)),
        (f = { type: "script", instance: f, count: 1, state: null }),
        l.set(u, f));
    }
  }
  function ZO(t, a) {
    aa.M(t, a);
    var o = lr;
    if (o && t) {
      var l = Ti(o).hoistableScripts,
        u = cr(t),
        f = l.get(u);
      f ||
        ((f = o.querySelector(wo(u))),
        f ||
          ((t = p({ src: t, async: !0, type: "module" }, a)),
          (a = dn.get(u)) && vf(t, a),
          (f = o.createElement("script")),
          ct(f),
          bt(f, "link", t),
          o.head.appendChild(f)),
        (f = { type: "script", instance: f, count: 1, state: null }),
        l.set(u, f));
    }
  }
  function Qv(t, a, o, l) {
    var u = (u = fe.current) ? Rs(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof o.precedence == "string" && typeof o.href == "string"
          ? ((a = sr(o.href)),
            (o = Ti(u).hoistableStyles),
            (l = o.get(a)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              o.set(a, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          o.rel === "stylesheet" &&
          typeof o.href == "string" &&
          typeof o.precedence == "string"
        ) {
          t = sr(o.href);
          var f = Ti(u).hoistableStyles,
            v = f.get(t);
          if (
            (v ||
              ((u = u.ownerDocument || u),
              (v = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              f.set(t, v),
              (f = u.querySelector(Oo(t))) &&
                !f._p &&
                ((v.instance = f), (v.state.loading = 5)),
              dn.has(t) ||
                ((o = {
                  rel: "preload",
                  as: "style",
                  href: o.href,
                  crossOrigin: o.crossOrigin,
                  integrity: o.integrity,
                  media: o.media,
                  hrefLang: o.hrefLang,
                  referrerPolicy: o.referrerPolicy,
                }),
                dn.set(t, o),
                f || JO(u, t, o, v.state))),
            a && l === null)
          )
            throw Error(r(528, ""));
          return v;
        }
        if (a && l !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (a = o.async),
          (o = o.src),
          typeof o == "string" &&
          a &&
          typeof a != "function" &&
          typeof a != "symbol"
            ? ((a = cr(o)),
              (o = Ti(u).hoistableScripts),
              (l = o.get(a)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                o.set(a, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, t));
    }
  }
  function sr(t) {
    return 'href="' + an(t) + '"';
  }
  function Oo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Zv(t) {
    return p({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function JO(t, a, o, l) {
    t.querySelector('link[rel="preload"][as="style"][' + a + "]")
      ? (l.loading = 1)
      : ((a = t.createElement("link")),
        (l.preload = a),
        a.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        a.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        bt(a, "link", o),
        ct(a),
        t.head.appendChild(a));
  }
  function cr(t) {
    return '[src="' + an(t) + '"]';
  }
  function wo(t) {
    return "script[async]" + t;
  }
  function Jv(t, a, o) {
    if ((a.count++, a.instance === null))
      switch (a.type) {
        case "style":
          var l = t.querySelector('style[data-href~="' + an(o.href) + '"]');
          if (l) return (a.instance = l), ct(l), l;
          var u = p({}, o, {
            "data-href": o.href,
            "data-precedence": o.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (t.ownerDocument || t).createElement("style")),
            ct(l),
            bt(l, "style", u),
            Ts(l, o.precedence, t),
            (a.instance = l)
          );
        case "stylesheet":
          u = sr(o.href);
          var f = t.querySelector(Oo(u));
          if (f) return (a.state.loading |= 4), (a.instance = f), ct(f), f;
          (l = Zv(o)),
            (u = dn.get(u)) && pf(l, u),
            (f = (t.ownerDocument || t).createElement("link")),
            ct(f);
          var v = f;
          return (
            (v._p = new Promise(function (S, T) {
              (v.onload = S), (v.onerror = T);
            })),
            bt(f, "link", l),
            (a.state.loading |= 4),
            Ts(f, o.precedence, t),
            (a.instance = f)
          );
        case "script":
          return (
            (f = cr(o.src)),
            (u = t.querySelector(wo(f)))
              ? ((a.instance = u), ct(u), u)
              : ((l = o),
                (u = dn.get(f)) && ((l = p({}, o)), vf(l, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                ct(u),
                bt(u, "link", l),
                t.head.appendChild(u),
                (a.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, a.type));
      }
    else
      a.type === "stylesheet" &&
        (a.state.loading & 4) === 0 &&
        ((l = a.instance), (a.state.loading |= 4), Ts(l, o.precedence, t));
    return a.instance;
  }
  function Ts(t, a, o) {
    for (
      var l = o.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = l.length ? l[l.length - 1] : null,
        f = u,
        v = 0;
      v < l.length;
      v++
    ) {
      var S = l[v];
      if (S.dataset.precedence === a) f = S;
      else if (f !== u) break;
    }
    f
      ? f.parentNode.insertBefore(t, f.nextSibling)
      : ((a = o.nodeType === 9 ? o.head : o), a.insertBefore(t, a.firstChild));
  }
  function pf(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy),
      t.title == null && (t.title = a.title);
  }
  function vf(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy),
      t.integrity == null && (t.integrity = a.integrity);
  }
  var As = null;
  function eb(t, a, o) {
    if (As === null) {
      var l = new Map(),
        u = (As = new Map());
      u.set(o, l);
    } else (u = As), (l = u.get(o)), l || ((l = new Map()), u.set(o, l));
    if (l.has(t)) return l;
    for (
      l.set(t, null), o = o.getElementsByTagName(t), u = 0;
      u < o.length;
      u++
    ) {
      var f = o[u];
      if (
        !(
          f[Mr] ||
          f[wt] ||
          (t === "link" && f.getAttribute("rel") === "stylesheet")
        ) &&
        f.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var v = f.getAttribute(a) || "";
        v = t + v;
        var S = l.get(v);
        S ? S.push(f) : l.set(v, [f]);
      }
    }
    return l;
  }
  function tb(t, a, o) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        o,
        a === "title" ? t.querySelector("head > title") : null,
      );
  }
  function ew(t, a, o) {
    if (o === 1 || a.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof a.precedence != "string" ||
          typeof a.href != "string" ||
          a.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof a.rel != "string" ||
          typeof a.href != "string" ||
          a.href === "" ||
          a.onLoad ||
          a.onError
        )
          break;
        switch (a.rel) {
          case "stylesheet":
            return (
              (t = a.disabled), typeof a.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          a.async &&
          typeof a.async != "function" &&
          typeof a.async != "symbol" &&
          !a.onLoad &&
          !a.onError &&
          a.src &&
          typeof a.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function nb(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var ko = null;
  function tw() {}
  function nw(t, a, o) {
    if (ko === null) throw Error(r(475));
    var l = ko;
    if (
      a.type === "stylesheet" &&
      (typeof o.media != "string" || matchMedia(o.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = sr(o.href),
          f = t.querySelector(Oo(u));
        if (f) {
          (t = f._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = zs.bind(l)), t.then(l, l)),
            (a.state.loading |= 4),
            (a.instance = f),
            ct(f);
          return;
        }
        (f = t.ownerDocument || t),
          (o = Zv(o)),
          (u = dn.get(u)) && pf(o, u),
          (f = f.createElement("link")),
          ct(f);
        var v = f;
        (v._p = new Promise(function (S, T) {
          (v.onload = S), (v.onerror = T);
        })),
          bt(f, "link", o),
          (a.instance = f);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (l.count++,
          (a = zs.bind(l)),
          t.addEventListener("load", a),
          t.addEventListener("error", a));
    }
  }
  function aw() {
    if (ko === null) throw Error(r(475));
    var t = ko;
    return (
      t.stylesheets && t.count === 0 && bf(t, t.stylesheets),
      0 < t.count
        ? function (a) {
            var o = setTimeout(function () {
              if ((t.stylesheets && bf(t, t.stylesheets), t.unsuspend)) {
                var l = t.unsuspend;
                (t.unsuspend = null), l();
              }
            }, 6e4);
            return (
              (t.unsuspend = a),
              function () {
                (t.unsuspend = null), clearTimeout(o);
              }
            );
          }
        : null
    );
  }
  function zs() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) bf(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var _s = null;
  function bf(t, a) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (_s = new Map()),
        a.forEach(iw, t),
        (_s = null),
        zs.call(t));
  }
  function iw(t, a) {
    if (!(a.state.loading & 4)) {
      var o = _s.get(t);
      if (o) var l = o.get(null);
      else {
        (o = new Map()), _s.set(t, o);
        for (
          var u = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            f = 0;
          f < u.length;
          f++
        ) {
          var v = u[f];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") &&
            (o.set(v.dataset.precedence, v), (l = v));
        }
        l && o.set(null, l);
      }
      (u = a.instance),
        (v = u.getAttribute("data-precedence")),
        (f = o.get(v) || l),
        f === l && o.set(null, u),
        o.set(v, u),
        this.count++,
        (l = zs.bind(this)),
        u.addEventListener("load", l),
        u.addEventListener("error", l),
        f
          ? f.parentNode.insertBefore(u, f.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(u, t.firstChild)),
        (a.state.loading |= 4);
    }
  }
  var Ro = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function rw(t, a, o, l, u, f, v, S) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = gu(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = gu(0)),
      (this.hiddenUpdates = gu(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = u),
      (this.onCaughtError = f),
      (this.onRecoverableError = v),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map());
  }
  function ab(t, a, o, l, u, f, v, S, T, M, q, Q) {
    return (
      (t = new rw(t, a, o, v, S, T, M, Q)),
      (a = 1),
      f === !0 && (a |= 24),
      (f = Ft(3, null, null, a)),
      (t.current = f),
      (f.stateNode = t),
      (a = Zu()),
      a.refCount++,
      (t.pooledCache = a),
      a.refCount++,
      (f.memoizedState = { element: l, isDehydrated: o, cache: a }),
      nd(f),
      t
    );
  }
  function ib(t) {
    return t ? ((t = Bi), t) : Bi;
  }
  function rb(t, a, o, l, u, f) {
    (u = ib(u)),
      l.context === null ? (l.context = u) : (l.pendingContext = u),
      (l = xa(a)),
      (l.payload = { element: o }),
      (f = f === void 0 ? null : f),
      f !== null && (l.callback = f),
      (o = Sa(t, l, a)),
      o !== null && (Xt(o, t, a), no(o, t, a));
  }
  function ob(t, a) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var o = t.retryLane;
      t.retryLane = o !== 0 && o < a ? o : a;
    }
  }
  function yf(t, a) {
    ob(t, a), (t = t.alternate) && ob(t, a);
  }
  function lb(t) {
    if (t.tag === 13) {
      var a = Hi(t, 67108864);
      a !== null && Xt(a, t, 67108864), yf(t, 67108864);
    }
  }
  var Ns = !0;
  function ow(t, a, o, l) {
    var u = I.T;
    I.T = null;
    var f = F.p;
    try {
      (F.p = 2), xf(t, a, o, l);
    } finally {
      (F.p = f), (I.T = u);
    }
  }
  function lw(t, a, o, l) {
    var u = I.T;
    I.T = null;
    var f = F.p;
    try {
      (F.p = 8), xf(t, a, o, l);
    } finally {
      (F.p = f), (I.T = u);
    }
  }
  function xf(t, a, o, l) {
    if (Ns) {
      var u = Sf(l);
      if (u === null) lf(t, a, l, Is, o), cb(t, l);
      else if (cw(u, t, a, o, l)) l.stopPropagation();
      else if ((cb(t, l), a & 4 && -1 < sw.indexOf(t))) {
        for (; u !== null; ) {
          var f = Ri(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (((f = f.stateNode), f.current.memoizedState.isDehydrated)) {
                  var v = Wa(f.pendingLanes);
                  if (v !== 0) {
                    var S = f;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; v; ) {
                      var T = 1 << (31 - Ut(v));
                      (S.entanglements[1] |= T), (v &= ~T);
                    }
                    _n(f), (Pe & 6) === 0 && ((ps = tn() + 500), xo(0));
                  }
                }
                break;
              case 13:
                (S = Hi(f, 2)), S !== null && Xt(S, f, 2), bs(), yf(f, 2);
            }
          if (((f = Sf(l)), f === null && lf(t, a, l, Is, o), f === u)) break;
          u = f;
        }
        u !== null && l.stopPropagation();
      } else lf(t, a, l, null, o);
    }
  }
  function Sf(t) {
    return (t = wu(t)), Cf(t);
  }
  var Is = null;
  function Cf(t) {
    if (((Is = null), (t = ki(t)), t !== null)) {
      var a = c(t);
      if (a === null) t = null;
      else {
        var o = a.tag;
        if (o === 13) {
          if (((t = d(a)), t !== null)) return t;
          t = null;
        } else if (o === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          t = null;
        } else a !== t && (t = null);
      }
    }
    return (Is = t), null;
  }
  function sb(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (El()) {
          case Ol:
            return 2;
          case _r:
            return 8;
          case Oi:
          case wl:
            return 32;
          case Nr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ef = !1,
    Pa = null,
    Va = null,
    Da = null,
    To = new Map(),
    Ao = new Map(),
    Ma = [],
    sw =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function cb(t, a) {
    switch (t) {
      case "focusin":
      case "focusout":
        Pa = null;
        break;
      case "dragenter":
      case "dragleave":
        Va = null;
        break;
      case "mouseover":
      case "mouseout":
        Da = null;
        break;
      case "pointerover":
      case "pointerout":
        To.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ao.delete(a.pointerId);
    }
  }
  function zo(t, a, o, l, u, f) {
    return t === null || t.nativeEvent !== f
      ? ((t = {
          blockedOn: a,
          domEventName: o,
          eventSystemFlags: l,
          nativeEvent: f,
          targetContainers: [u],
        }),
        a !== null && ((a = Ri(a)), a !== null && lb(a)),
        t)
      : ((t.eventSystemFlags |= l),
        (a = t.targetContainers),
        u !== null && a.indexOf(u) === -1 && a.push(u),
        t);
  }
  function cw(t, a, o, l, u) {
    switch (a) {
      case "focusin":
        return (Pa = zo(Pa, t, a, o, l, u)), !0;
      case "dragenter":
        return (Va = zo(Va, t, a, o, l, u)), !0;
      case "mouseover":
        return (Da = zo(Da, t, a, o, l, u)), !0;
      case "pointerover":
        var f = u.pointerId;
        return To.set(f, zo(To.get(f) || null, t, a, o, l, u)), !0;
      case "gotpointercapture":
        return (
          (f = u.pointerId), Ao.set(f, zo(Ao.get(f) || null, t, a, o, l, u)), !0
        );
    }
    return !1;
  }
  function ub(t) {
    var a = ki(t.target);
    if (a !== null) {
      var o = c(a);
      if (o !== null) {
        if (((a = o.tag), a === 13)) {
          if (((a = d(o)), a !== null)) {
            (t.blockedOn = a),
              nE(t.priority, function () {
                if (o.tag === 13) {
                  var l = Yt();
                  l = hu(l);
                  var u = Hi(o, l);
                  u !== null && Xt(u, o, l), yf(o, l);
                }
              });
            return;
          }
        } else if (a === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ps(t) {
    if (t.blockedOn !== null) return !1;
    for (var a = t.targetContainers; 0 < a.length; ) {
      var o = Sf(t.nativeEvent);
      if (o === null) {
        o = t.nativeEvent;
        var l = new o.constructor(o.type, o);
        (Ou = l), o.target.dispatchEvent(l), (Ou = null);
      } else return (a = Ri(o)), a !== null && lb(a), (t.blockedOn = o), !1;
      a.shift();
    }
    return !0;
  }
  function db(t, a, o) {
    Ps(t) && o.delete(a);
  }
  function uw() {
    (Ef = !1),
      Pa !== null && Ps(Pa) && (Pa = null),
      Va !== null && Ps(Va) && (Va = null),
      Da !== null && Ps(Da) && (Da = null),
      To.forEach(db),
      Ao.forEach(db);
  }
  function Vs(t, a) {
    t.blockedOn === a &&
      ((t.blockedOn = null),
      Ef ||
        ((Ef = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, uw)));
  }
  var Ds = null;
  function fb(t) {
    Ds !== t &&
      ((Ds = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        Ds === t && (Ds = null);
        for (var a = 0; a < t.length; a += 3) {
          var o = t[a],
            l = t[a + 1],
            u = t[a + 2];
          if (typeof l != "function") {
            if (Cf(l || o) === null) continue;
            break;
          }
          var f = Ri(o);
          f !== null &&
            (t.splice(a, 3),
            (a -= 3),
            Sd(f, { pending: !0, data: u, method: o.method, action: l }, l, u));
        }
      }));
  }
  function _o(t) {
    function a(T) {
      return Vs(T, t);
    }
    Pa !== null && Vs(Pa, t),
      Va !== null && Vs(Va, t),
      Da !== null && Vs(Da, t),
      To.forEach(a),
      Ao.forEach(a);
    for (var o = 0; o < Ma.length; o++) {
      var l = Ma[o];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Ma.length && ((o = Ma[0]), o.blockedOn === null); )
      ub(o), o.blockedOn === null && Ma.shift();
    if (((o = (t.ownerDocument || t).$$reactFormReplay), o != null))
      for (l = 0; l < o.length; l += 3) {
        var u = o[l],
          f = o[l + 1],
          v = u[Nt] || null;
        if (typeof f == "function") v || fb(o);
        else if (v) {
          var S = null;
          if (f && f.hasAttribute("formAction")) {
            if (((u = f), (v = f[Nt] || null))) S = v.formAction;
            else if (Cf(u) !== null) continue;
          } else S = v.action;
          typeof S == "function" ? (o[l + 1] = S) : (o.splice(l, 3), (l -= 3)),
            fb(o);
        }
      }
  }
  function Of(t) {
    this._internalRoot = t;
  }
  (Ms.prototype.render = Of.prototype.render =
    function (t) {
      var a = this._internalRoot;
      if (a === null) throw Error(r(409));
      var o = a.current,
        l = Yt();
      rb(o, l, t, a, null, null);
    }),
    (Ms.prototype.unmount = Of.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var a = t.containerInfo;
          rb(t.current, 2, null, t, null, null), bs(), (a[wi] = null);
        }
      });
  function Ms(t) {
    this._internalRoot = t;
  }
  Ms.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var a = Ah();
      t = { blockedOn: null, target: t, priority: a };
      for (var o = 0; o < Ma.length && a !== 0 && a < Ma[o].priority; o++);
      Ma.splice(o, 0, t), o === 0 && ub(t);
    }
  };
  var gb = n.version;
  if (gb !== "19.1.0") throw Error(r(527, gb, "19.1.0"));
  F.findDOMNode = function (t) {
    var a = t._reactInternals;
    if (a === void 0)
      throw typeof t.render == "function"
        ? Error(r(188))
        : ((t = Object.keys(t).join(",")), Error(r(268, t)));
    return (
      (t = h(a)),
      (t = t !== null ? m(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var dw = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: I,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ls = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ls.isDisabled && Ls.supportsFiber)
      try {
        (Pr = Ls.inject(dw)), (jt = Ls);
      } catch {}
  }
  return (
    (Io.createRoot = function (t, a) {
      if (!s(t)) throw Error(r(299));
      var o = !1,
        l = "",
        u = Ap,
        f = zp,
        v = _p,
        S = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (o = !0),
          a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (S = a.unstable_transitionCallbacks)),
        (a = ab(t, 1, !1, null, null, o, l, u, f, v, S, null)),
        (t[wi] = a.current),
        of(t),
        new Of(a)
      );
    }),
    (Io.hydrateRoot = function (t, a, o) {
      if (!s(t)) throw Error(r(299));
      var l = !1,
        u = "",
        f = Ap,
        v = zp,
        S = _p,
        T = null,
        M = null;
      return (
        o != null &&
          (o.unstable_strictMode === !0 && (l = !0),
          o.identifierPrefix !== void 0 && (u = o.identifierPrefix),
          o.onUncaughtError !== void 0 && (f = o.onUncaughtError),
          o.onCaughtError !== void 0 && (v = o.onCaughtError),
          o.onRecoverableError !== void 0 && (S = o.onRecoverableError),
          o.unstable_transitionCallbacks !== void 0 &&
            (T = o.unstable_transitionCallbacks),
          o.formState !== void 0 && (M = o.formState)),
        (a = ab(t, 1, !0, a, o ?? null, l, u, f, v, S, T, M)),
        (a.context = ib(null)),
        (o = a.current),
        (l = Yt()),
        (l = hu(l)),
        (u = xa(l)),
        (u.callback = null),
        Sa(o, u, l),
        (o = l),
        (a.current.lanes = o),
        Dr(a, o),
        _n(a),
        (t[wi] = a.current),
        of(t),
        new Ms(a)
      );
    }),
    (Io.version = "19.1.0"),
    Io
  );
}
var Ob;
function Sw() {
  if (Ob) return Rf.exports;
  Ob = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return e(), (Rf.exports = xw()), Rf.exports;
}
var Cw = Sw();
const Zt = (...e) =>
  e
    .filter(Boolean)
    .map((n) => n.trim())
    .join(" ");
function Ew(e, n) {
  return `${e} returned \`undefined\`. Seems you forgot to wrap component within ${n}`;
}
function Ko(e = {}) {
  const {
      name: n,
      strict: i = !0,
      hookName: r = "useContext",
      providerName: s = "Provider",
      errorMessage: c,
      defaultValue: d,
    } = e,
    g = k.createContext(d);
  g.displayName = n;
  function h() {
    var p;
    const m = k.useContext(g);
    if (!m && i) {
      const y = new Error(c ?? Ew(r, s));
      throw (
        ((y.name = "ContextError"),
        (p = Error.captureStackTrace) == null || p.call(Error, y, h),
        y)
      );
    }
    return m;
  }
  return [g.Provider, h, g];
}
function Ow(...e) {
  return function (...i) {
    e.forEach((r) => (r == null ? void 0 : r(...i)));
  };
}
const ww = (...e) =>
    e
      .map((n) => {
        var i;
        return (i = n == null ? void 0 : n.trim) == null ? void 0 : i.call(n);
      })
      .filter(Boolean)
      .join(" "),
  kw = /^on[A-Z]/;
function el(...e) {
  let n = {};
  for (let i of e) {
    for (let r in n) {
      if (
        kw.test(r) &&
        typeof n[r] == "function" &&
        typeof i[r] == "function"
      ) {
        n[r] = Ow(n[r], i[r]);
        continue;
      }
      if (r === "className" || r === "class") {
        n[r] = ww(n[r], i[r]);
        continue;
      }
      if (r === "style") {
        n[r] = Object.assign({}, n[r] ?? {}, i[r] ?? {});
        continue;
      }
      n[r] = i[r] !== void 0 ? i[r] : n[r];
    }
    for (let r in i) n[r] === void 0 && (n[r] = i[r]);
  }
  return n;
}
const Tx = Object.freeze({}),
  Rw = Object.freeze({});
function Ax(e) {
  var n = Object.create(null);
  return function (i) {
    return n[i] === void 0 && (n[i] = e(i)), n[i];
  };
}
var Tw =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Aw = Ax(function (e) {
    return (
      Tw.test(e) ||
      (e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) < 91)
    );
  });
function zw(e) {
  if (e.sheet) return e.sheet;
  for (var n = 0; n < document.styleSheets.length; n++)
    if (document.styleSheets[n].ownerNode === e) return document.styleSheets[n];
}
function _w(e) {
  var n = document.createElement("style");
  return (
    n.setAttribute("data-emotion", e.key),
    e.nonce !== void 0 && n.setAttribute("nonce", e.nonce),
    n.appendChild(document.createTextNode("")),
    n.setAttribute("data-s", ""),
    n
  );
}
var Nw = (function () {
    function e(i) {
      var r = this;
      (this._insertTag = function (s) {
        var c;
        r.tags.length === 0
          ? r.insertionPoint
            ? (c = r.insertionPoint.nextSibling)
            : r.prepend
              ? (c = r.container.firstChild)
              : (c = r.before)
          : (c = r.tags[r.tags.length - 1].nextSibling),
          r.container.insertBefore(s, c),
          r.tags.push(s);
      }),
        (this.isSpeedy = i.speedy === void 0 ? !0 : i.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = i.nonce),
        (this.key = i.key),
        (this.container = i.container),
        (this.prepend = i.prepend),
        (this.insertionPoint = i.insertionPoint),
        (this.before = null);
    }
    var n = e.prototype;
    return (
      (n.hydrate = function (r) {
        r.forEach(this._insertTag);
      }),
      (n.insert = function (r) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
          this._insertTag(_w(this));
        var s = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var c = zw(s);
          try {
            c.insertRule(r, c.cssRules.length);
          } catch {}
        } else s.appendChild(document.createTextNode(r));
        this.ctr++;
      }),
      (n.flush = function () {
        this.tags.forEach(function (r) {
          var s;
          return (s = r.parentNode) == null ? void 0 : s.removeChild(r);
        }),
          (this.tags = []),
          (this.ctr = 0);
      }),
      e
    );
  })(),
  Tt = "-ms-",
  Sc = "-moz-",
  ze = "-webkit-",
  zx = "comm",
  Rg = "rule",
  Tg = "decl",
  Iw = "@import",
  _x = "@keyframes",
  Pw = "@layer",
  Vw = Math.abs,
  Uc = String.fromCharCode,
  Dw = Object.assign;
function Mw(e, n) {
  return St(e, 0) ^ 45
    ? (((((((n << 2) ^ St(e, 0)) << 2) ^ St(e, 1)) << 2) ^ St(e, 2)) << 2) ^
        St(e, 3)
    : 0;
}
function Nx(e) {
  return e.trim();
}
function Lw(e, n) {
  return (e = n.exec(e)) ? e[0] : e;
}
function _e(e, n, i) {
  return e.replace(n, i);
}
function ng(e, n) {
  return e.indexOf(n);
}
function St(e, n) {
  return e.charCodeAt(n) | 0;
}
function tl(e, n, i) {
  return e.slice(n, i);
}
function Nn(e) {
  return e.length;
}
function Ag(e) {
  return e.length;
}
function Hs(e, n) {
  return n.push(e), e;
}
function Hw(e, n) {
  return e.map(n).join("");
}
var $c = 1,
  Cr = 1,
  Ix = 0,
  Ht = 0,
  it = 0,
  wr = "";
function Fc(e, n, i, r, s, c, d) {
  return {
    value: e,
    root: n,
    parent: i,
    type: r,
    props: s,
    children: c,
    line: $c,
    column: Cr,
    length: d,
    return: "",
  };
}
function Po(e, n) {
  return Dw(Fc("", null, null, "", null, null, 0), e, { length: -e.length }, n);
}
function Bw() {
  return it;
}
function jw() {
  return (
    (it = Ht > 0 ? St(wr, --Ht) : 0), Cr--, it === 10 && ((Cr = 1), $c--), it
  );
}
function Jt() {
  return (
    (it = Ht < Ix ? St(wr, Ht++) : 0), Cr++, it === 10 && ((Cr = 1), $c++), it
  );
}
function Vn() {
  return St(wr, Ht);
}
function nc() {
  return Ht;
}
function sl(e, n) {
  return tl(wr, e, n);
}
function nl(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Px(e) {
  return ($c = Cr = 1), (Ix = Nn((wr = e))), (Ht = 0), [];
}
function Vx(e) {
  return (wr = ""), e;
}
function ac(e) {
  return Nx(sl(Ht - 1, ag(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Uw(e) {
  for (; (it = Vn()) && it < 33; ) Jt();
  return nl(e) > 2 || nl(it) > 3 ? "" : " ";
}
function $w(e, n) {
  for (
    ;
    --n &&
    Jt() &&
    !(it < 48 || it > 102 || (it > 57 && it < 65) || (it > 70 && it < 97));

  );
  return sl(e, nc() + (n < 6 && Vn() == 32 && Jt() == 32));
}
function ag(e) {
  for (; Jt(); )
    switch (it) {
      case e:
        return Ht;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ag(it);
        break;
      case 40:
        e === 41 && ag(e);
        break;
      case 92:
        Jt();
        break;
    }
  return Ht;
}
function Fw(e, n) {
  for (; Jt() && e + it !== 57; ) if (e + it === 84 && Vn() === 47) break;
  return "/*" + sl(n, Ht - 1) + "*" + Uc(e === 47 ? e : Jt());
}
function Gw(e) {
  for (; !nl(Vn()); ) Jt();
  return sl(e, Ht);
}
function Ww(e) {
  return Vx(ic("", null, null, null, [""], (e = Px(e)), 0, [0], e));
}
function ic(e, n, i, r, s, c, d, g, h) {
  for (
    var m = 0,
      p = 0,
      y = d,
      b = 0,
      x = 0,
      C = 0,
      E = 1,
      R = 1,
      O = 1,
      A = 0,
      z = "",
      B = s,
      _ = c,
      Y = r,
      $ = z;
    R;

  )
    switch (((C = A), (A = Jt()))) {
      case 40:
        if (C != 108 && St($, y - 1) == 58) {
          ng(($ += _e(ac(A), "&", "&\f")), "&\f") != -1 && (O = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        $ += ac(A);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        $ += Uw(C);
        break;
      case 92:
        $ += $w(nc() - 1, 7);
        continue;
      case 47:
        switch (Vn()) {
          case 42:
          case 47:
            Hs(qw(Fw(Jt(), nc()), n, i), h);
            break;
          default:
            $ += "/";
        }
        break;
      case 123 * E:
        g[m++] = Nn($) * O;
      case 125 * E:
      case 59:
      case 0:
        switch (A) {
          case 0:
          case 125:
            R = 0;
          case 59 + p:
            O == -1 && ($ = _e($, /\f/g, "")),
              x > 0 &&
                Nn($) - y &&
                Hs(
                  x > 32
                    ? kb($ + ";", r, i, y - 1)
                    : kb(_e($, " ", "") + ";", r, i, y - 2),
                  h,
                );
            break;
          case 59:
            $ += ";";
          default:
            if (
              (Hs((Y = wb($, n, i, m, p, s, g, z, (B = []), (_ = []), y)), c),
              A === 123)
            )
              if (p === 0) ic($, n, Y, Y, B, c, y, g, _);
              else
                switch (b === 99 && St($, 3) === 110 ? 100 : b) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ic(
                      e,
                      Y,
                      Y,
                      r && Hs(wb(e, Y, Y, 0, 0, s, g, z, s, (B = []), y), _),
                      s,
                      _,
                      y,
                      g,
                      r ? B : _,
                    );
                    break;
                  default:
                    ic($, Y, Y, Y, [""], _, 0, g, _);
                }
        }
        (m = p = x = 0), (E = O = 1), (z = $ = ""), (y = d);
        break;
      case 58:
        (y = 1 + Nn($)), (x = C);
      default:
        if (E < 1) {
          if (A == 123) --E;
          else if (A == 125 && E++ == 0 && jw() == 125) continue;
        }
        switch ((($ += Uc(A)), A * E)) {
          case 38:
            O = p > 0 ? 1 : (($ += "\f"), -1);
            break;
          case 44:
            (g[m++] = (Nn($) - 1) * O), (O = 1);
            break;
          case 64:
            Vn() === 45 && ($ += ac(Jt())),
              (b = Vn()),
              (p = y = Nn((z = $ += Gw(nc())))),
              A++;
            break;
          case 45:
            C === 45 && Nn($) == 2 && (E = 0);
        }
    }
  return c;
}
function wb(e, n, i, r, s, c, d, g, h, m, p) {
  for (
    var y = s - 1, b = s === 0 ? c : [""], x = Ag(b), C = 0, E = 0, R = 0;
    C < r;
    ++C
  )
    for (var O = 0, A = tl(e, y + 1, (y = Vw((E = d[C])))), z = e; O < x; ++O)
      (z = Nx(E > 0 ? b[O] + " " + A : _e(A, /&\f/g, b[O]))) && (h[R++] = z);
  return Fc(e, n, i, s === 0 ? Rg : g, h, m, p);
}
function qw(e, n, i) {
  return Fc(e, n, i, zx, Uc(Bw()), tl(e, 2, -2), 0);
}
function kb(e, n, i, r) {
  return Fc(e, n, i, Tg, tl(e, 0, r), tl(e, r + 1, -1), r);
}
function yr(e, n) {
  for (var i = "", r = Ag(e), s = 0; s < r; s++) i += n(e[s], s, e, n) || "";
  return i;
}
function Yw(e, n, i, r) {
  switch (e.type) {
    case Pw:
      if (e.children.length) break;
    case Iw:
    case Tg:
      return (e.return = e.return || e.value);
    case zx:
      return "";
    case _x:
      return (e.return = e.value + "{" + yr(e.children, r) + "}");
    case Rg:
      e.value = e.props.join(",");
  }
  return Nn((i = yr(e.children, r)))
    ? (e.return = e.value + "{" + i + "}")
    : "";
}
function Xw(e) {
  var n = Ag(e);
  return function (i, r, s, c) {
    for (var d = "", g = 0; g < n; g++) d += e[g](i, r, s, c) || "";
    return d;
  };
}
function Kw(e) {
  return function (n) {
    n.root || ((n = n.return) && e(n));
  };
}
var Qw = function (n, i, r) {
    for (
      var s = 0, c = 0;
      (s = c), (c = Vn()), s === 38 && c === 12 && (i[r] = 1), !nl(c);

    )
      Jt();
    return sl(n, Ht);
  },
  Zw = function (n, i) {
    var r = -1,
      s = 44;
    do
      switch (nl(s)) {
        case 0:
          s === 38 && Vn() === 12 && (i[r] = 1), (n[r] += Qw(Ht - 1, i, r));
          break;
        case 2:
          n[r] += ac(s);
          break;
        case 4:
          if (s === 44) {
            (n[++r] = Vn() === 58 ? "&\f" : ""), (i[r] = n[r].length);
            break;
          }
        default:
          n[r] += Uc(s);
      }
    while ((s = Jt()));
    return n;
  },
  Jw = function (n, i) {
    return Vx(Zw(Px(n), i));
  },
  Rb = new WeakMap(),
  ek = function (n) {
    if (!(n.type !== "rule" || !n.parent || n.length < 1)) {
      for (
        var i = n.value,
          r = n.parent,
          s = n.column === r.column && n.line === r.line;
        r.type !== "rule";

      )
        if (((r = r.parent), !r)) return;
      if (
        !(n.props.length === 1 && i.charCodeAt(0) !== 58 && !Rb.get(r)) &&
        !s
      ) {
        Rb.set(n, !0);
        for (
          var c = [], d = Jw(i, c), g = r.props, h = 0, m = 0;
          h < d.length;
          h++
        )
          for (var p = 0; p < g.length; p++, m++)
            n.props[m] = c[h] ? d[h].replace(/&\f/g, g[p]) : g[p] + " " + d[h];
      }
    }
  },
  tk = function (n) {
    if (n.type === "decl") {
      var i = n.value;
      i.charCodeAt(0) === 108 &&
        i.charCodeAt(2) === 98 &&
        ((n.return = ""), (n.value = ""));
    }
  };
function Dx(e, n) {
  switch (Mw(e, n)) {
    case 5103:
      return ze + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return ze + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return ze + e + Sc + e + Tt + e + e;
    case 6828:
    case 4268:
      return ze + e + Tt + e + e;
    case 6165:
      return ze + e + Tt + "flex-" + e + e;
    case 5187:
      return (
        ze + e + _e(e, /(\w+).+(:[^]+)/, ze + "box-$1$2" + Tt + "flex-$1$2") + e
      );
    case 5443:
      return ze + e + Tt + "flex-item-" + _e(e, /flex-|-self/, "") + e;
    case 4675:
      return (
        ze +
        e +
        Tt +
        "flex-line-pack" +
        _e(e, /align-content|flex-|-self/, "") +
        e
      );
    case 5548:
      return ze + e + Tt + _e(e, "shrink", "negative") + e;
    case 5292:
      return ze + e + Tt + _e(e, "basis", "preferred-size") + e;
    case 6060:
      return (
        ze +
        "box-" +
        _e(e, "-grow", "") +
        ze +
        e +
        Tt +
        _e(e, "grow", "positive") +
        e
      );
    case 4554:
      return ze + _e(e, /([^-])(transform)/g, "$1" + ze + "$2") + e;
    case 6187:
      return (
        _e(
          _e(_e(e, /(zoom-|grab)/, ze + "$1"), /(image-set)/, ze + "$1"),
          e,
          "",
        ) + e
      );
    case 5495:
    case 3959:
      return _e(e, /(image-set\([^]*)/, ze + "$1$`$1");
    case 4968:
      return (
        _e(
          _e(e, /(.+:)(flex-)?(.*)/, ze + "box-pack:$3" + Tt + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify",
        ) +
        ze +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return _e(e, /(.+)-inline(.+)/, ze + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Nn(e) - 1 - n > 6)
        switch (St(e, n + 1)) {
          case 109:
            if (St(e, n + 4) !== 45) break;
          case 102:
            return (
              _e(
                e,
                /(.+:)(.+)-([^]+)/,
                "$1" +
                  ze +
                  "$2-$3$1" +
                  Sc +
                  (St(e, n + 3) == 108 ? "$3" : "$2-$3"),
              ) + e
            );
          case 115:
            return ~ng(e, "stretch")
              ? Dx(_e(e, "stretch", "fill-available"), n) + e
              : e;
        }
      break;
    case 4949:
      if (St(e, n + 1) !== 115) break;
    case 6444:
      switch (St(e, Nn(e) - 3 - (~ng(e, "!important") && 10))) {
        case 107:
          return _e(e, ":", ":" + ze) + e;
        case 101:
          return (
            _e(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              "$1" +
                ze +
                (St(e, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                ze +
                "$2$3$1" +
                Tt +
                "$2box$3",
            ) + e
          );
      }
      break;
    case 5936:
      switch (St(e, n + 11)) {
        case 114:
          return ze + e + Tt + _e(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return ze + e + Tt + _e(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return ze + e + Tt + _e(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return ze + e + Tt + e + e;
  }
  return e;
}
var nk = function (n, i, r, s) {
    if (n.length > -1 && !n.return)
      switch (n.type) {
        case Tg:
          n.return = Dx(n.value, n.length);
          break;
        case _x:
          return yr([Po(n, { value: _e(n.value, "@", "@" + ze) })], s);
        case Rg:
          if (n.length)
            return Hw(n.props, function (c) {
              switch (Lw(c, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return yr(
                    [Po(n, { props: [_e(c, /:(read-\w+)/, ":" + Sc + "$1")] })],
                    s,
                  );
                case "::placeholder":
                  return yr(
                    [
                      Po(n, {
                        props: [_e(c, /:(plac\w+)/, ":" + ze + "input-$1")],
                      }),
                      Po(n, { props: [_e(c, /:(plac\w+)/, ":" + Sc + "$1")] }),
                      Po(n, { props: [_e(c, /:(plac\w+)/, Tt + "input-$1")] }),
                    ],
                    s,
                  );
              }
              return "";
            });
      }
  },
  ak = [nk],
  ik = function (n) {
    var i = n.key;
    if (i === "css") {
      var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(r, function (E) {
        var R = E.getAttribute("data-emotion");
        R.indexOf(" ") !== -1 &&
          (document.head.appendChild(E), E.setAttribute("data-s", ""));
      });
    }
    var s = n.stylisPlugins || ak,
      c = {},
      d,
      g = [];
    (d = n.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + i + ' "]'),
        function (E) {
          for (
            var R = E.getAttribute("data-emotion").split(" "), O = 1;
            O < R.length;
            O++
          )
            c[R[O]] = !0;
          g.push(E);
        },
      );
    var h,
      m = [ek, tk];
    {
      var p,
        y = [
          Yw,
          Kw(function (E) {
            p.insert(E);
          }),
        ],
        b = Xw(m.concat(s, y)),
        x = function (R) {
          return yr(Ww(R), b);
        };
      h = function (R, O, A, z) {
        (p = A),
          x(R ? R + "{" + O.styles + "}" : O.styles),
          z && (C.inserted[O.name] = !0);
      };
    }
    var C = {
      key: i,
      sheet: new Nw({
        key: i,
        container: d,
        nonce: n.nonce,
        speedy: n.speedy,
        prepend: n.prepend,
        insertionPoint: n.insertionPoint,
      }),
      nonce: n.nonce,
      inserted: c,
      registered: {},
      insert: h,
    };
    return C.sheet.hydrate(g), C;
  },
  _f = { exports: {} },
  Ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tb;
function rk() {
  if (Tb) return Ie;
  Tb = 1;
  var e = typeof Symbol == "function" && Symbol.for,
    n = e ? Symbol.for("react.element") : 60103,
    i = e ? Symbol.for("react.portal") : 60106,
    r = e ? Symbol.for("react.fragment") : 60107,
    s = e ? Symbol.for("react.strict_mode") : 60108,
    c = e ? Symbol.for("react.profiler") : 60114,
    d = e ? Symbol.for("react.provider") : 60109,
    g = e ? Symbol.for("react.context") : 60110,
    h = e ? Symbol.for("react.async_mode") : 60111,
    m = e ? Symbol.for("react.concurrent_mode") : 60111,
    p = e ? Symbol.for("react.forward_ref") : 60112,
    y = e ? Symbol.for("react.suspense") : 60113,
    b = e ? Symbol.for("react.suspense_list") : 60120,
    x = e ? Symbol.for("react.memo") : 60115,
    C = e ? Symbol.for("react.lazy") : 60116,
    E = e ? Symbol.for("react.block") : 60121,
    R = e ? Symbol.for("react.fundamental") : 60117,
    O = e ? Symbol.for("react.responder") : 60118,
    A = e ? Symbol.for("react.scope") : 60119;
  function z(_) {
    if (typeof _ == "object" && _ !== null) {
      var Y = _.$$typeof;
      switch (Y) {
        case n:
          switch (((_ = _.type), _)) {
            case h:
            case m:
            case r:
            case c:
            case s:
            case y:
              return _;
            default:
              switch (((_ = _ && _.$$typeof), _)) {
                case g:
                case p:
                case C:
                case x:
                case d:
                  return _;
                default:
                  return Y;
              }
          }
        case i:
          return Y;
      }
    }
  }
  function B(_) {
    return z(_) === m;
  }
  return (
    (Ie.AsyncMode = h),
    (Ie.ConcurrentMode = m),
    (Ie.ContextConsumer = g),
    (Ie.ContextProvider = d),
    (Ie.Element = n),
    (Ie.ForwardRef = p),
    (Ie.Fragment = r),
    (Ie.Lazy = C),
    (Ie.Memo = x),
    (Ie.Portal = i),
    (Ie.Profiler = c),
    (Ie.StrictMode = s),
    (Ie.Suspense = y),
    (Ie.isAsyncMode = function (_) {
      return B(_) || z(_) === h;
    }),
    (Ie.isConcurrentMode = B),
    (Ie.isContextConsumer = function (_) {
      return z(_) === g;
    }),
    (Ie.isContextProvider = function (_) {
      return z(_) === d;
    }),
    (Ie.isElement = function (_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === n;
    }),
    (Ie.isForwardRef = function (_) {
      return z(_) === p;
    }),
    (Ie.isFragment = function (_) {
      return z(_) === r;
    }),
    (Ie.isLazy = function (_) {
      return z(_) === C;
    }),
    (Ie.isMemo = function (_) {
      return z(_) === x;
    }),
    (Ie.isPortal = function (_) {
      return z(_) === i;
    }),
    (Ie.isProfiler = function (_) {
      return z(_) === c;
    }),
    (Ie.isStrictMode = function (_) {
      return z(_) === s;
    }),
    (Ie.isSuspense = function (_) {
      return z(_) === y;
    }),
    (Ie.isValidElementType = function (_) {
      return (
        typeof _ == "string" ||
        typeof _ == "function" ||
        _ === r ||
        _ === m ||
        _ === c ||
        _ === s ||
        _ === y ||
        _ === b ||
        (typeof _ == "object" &&
          _ !== null &&
          (_.$$typeof === C ||
            _.$$typeof === x ||
            _.$$typeof === d ||
            _.$$typeof === g ||
            _.$$typeof === p ||
            _.$$typeof === R ||
            _.$$typeof === O ||
            _.$$typeof === A ||
            _.$$typeof === E))
      );
    }),
    (Ie.typeOf = z),
    Ie
  );
}
var Ab;
function ok() {
  return Ab || ((Ab = 1), (_f.exports = rk())), _f.exports;
}
var Nf, zb;
function lk() {
  if (zb) return Nf;
  zb = 1;
  var e = ok(),
    n = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    i = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    r = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    },
    s = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    c = {};
  (c[e.ForwardRef] = r), (c[e.Memo] = s);
  function d(C) {
    return e.isMemo(C) ? s : c[C.$$typeof] || n;
  }
  var g = Object.defineProperty,
    h = Object.getOwnPropertyNames,
    m = Object.getOwnPropertySymbols,
    p = Object.getOwnPropertyDescriptor,
    y = Object.getPrototypeOf,
    b = Object.prototype;
  function x(C, E, R) {
    if (typeof E != "string") {
      if (b) {
        var O = y(E);
        O && O !== b && x(C, O, R);
      }
      var A = h(E);
      m && (A = A.concat(m(E)));
      for (var z = d(C), B = d(E), _ = 0; _ < A.length; ++_) {
        var Y = A[_];
        if (!i[Y] && !(R && R[Y]) && !(B && B[Y]) && !(z && z[Y])) {
          var $ = p(E, Y);
          try {
            g(C, Y, $);
          } catch {}
        }
      }
    }
    return C;
  }
  return (Nf = x), Nf;
}
lk();
var sk = !0;
function Mx(e, n, i) {
  var r = "";
  return (
    i.split(" ").forEach(function (s) {
      e[s] !== void 0 ? n.push(e[s] + ";") : s && (r += s + " ");
    }),
    r
  );
}
var zg = function (n, i, r) {
    var s = n.key + "-" + i.name;
    (r === !1 || sk === !1) &&
      n.registered[s] === void 0 &&
      (n.registered[s] = i.styles);
  },
  _g = function (n, i, r) {
    zg(n, i, r);
    var s = n.key + "-" + i.name;
    if (n.inserted[i.name] === void 0) {
      var c = i;
      do n.insert(i === c ? "." + s : "", c, n.sheet, !0), (c = c.next);
      while (c !== void 0);
    }
  };
function ck(e) {
  for (var n = 0, i, r = 0, s = e.length; s >= 4; ++r, s -= 4)
    (i =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (i = (i & 65535) * 1540483477 + (((i >>> 16) * 59797) << 16)),
      (i ^= i >>> 24),
      (n =
        ((i & 65535) * 1540483477 + (((i >>> 16) * 59797) << 16)) ^
        ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)));
  switch (s) {
    case 3:
      n ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      n ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      (n ^= e.charCodeAt(r) & 255),
        (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16));
  }
  return (
    (n ^= n >>> 13),
    (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
    ((n ^ (n >>> 15)) >>> 0).toString(36)
  );
}
var uk = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  dk = /[A-Z]|^ms/g,
  fk = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Lx = function (n) {
    return n.charCodeAt(1) === 45;
  },
  _b = function (n) {
    return n != null && typeof n != "boolean";
  },
  If = Ax(function (e) {
    return Lx(e) ? e : e.replace(dk, "-$&").toLowerCase();
  }),
  Nb = function (n, i) {
    switch (n) {
      case "animation":
      case "animationName":
        if (typeof i == "string")
          return i.replace(fk, function (r, s, c) {
            return (In = { name: s, styles: c, next: In }), s;
          });
    }
    return uk[n] !== 1 && !Lx(n) && typeof i == "number" && i !== 0
      ? i + "px"
      : i;
  };
function al(e, n, i) {
  if (i == null) return "";
  var r = i;
  if (r.__emotion_styles !== void 0) return r;
  switch (typeof i) {
    case "boolean":
      return "";
    case "object": {
      var s = i;
      if (s.anim === 1)
        return (In = { name: s.name, styles: s.styles, next: In }), s.name;
      var c = i;
      if (c.styles !== void 0) {
        var d = c.next;
        if (d !== void 0)
          for (; d !== void 0; )
            (In = { name: d.name, styles: d.styles, next: In }), (d = d.next);
        var g = c.styles + ";";
        return g;
      }
      return gk(e, n, i);
    }
    case "function": {
      if (e !== void 0) {
        var h = In,
          m = i(e);
        return (In = h), al(e, n, m);
      }
      break;
    }
  }
  var p = i;
  if (n == null) return p;
  var y = n[p];
  return y !== void 0 ? y : p;
}
function gk(e, n, i) {
  var r = "";
  if (Array.isArray(i))
    for (var s = 0; s < i.length; s++) r += al(e, n, i[s]) + ";";
  else
    for (var c in i) {
      var d = i[c];
      if (typeof d != "object") {
        var g = d;
        n != null && n[g] !== void 0
          ? (r += c + "{" + n[g] + "}")
          : _b(g) && (r += If(c) + ":" + Nb(c, g) + ";");
      } else if (
        Array.isArray(d) &&
        typeof d[0] == "string" &&
        (n == null || n[d[0]] === void 0)
      )
        for (var h = 0; h < d.length; h++)
          _b(d[h]) && (r += If(c) + ":" + Nb(c, d[h]) + ";");
      else {
        var m = al(e, n, d);
        switch (c) {
          case "animation":
          case "animationName": {
            r += If(c) + ":" + m + ";";
            break;
          }
          default:
            r += c + "{" + m + "}";
        }
      }
    }
  return r;
}
var Ib = /label:\s*([^\s;{]+)\s*(;|$)/g,
  In;
function Ng(e, n, i) {
  if (
    e.length === 1 &&
    typeof e[0] == "object" &&
    e[0] !== null &&
    e[0].styles !== void 0
  )
    return e[0];
  var r = !0,
    s = "";
  In = void 0;
  var c = e[0];
  if (c == null || c.raw === void 0) (r = !1), (s += al(i, n, c));
  else {
    var d = c;
    s += d[0];
  }
  for (var g = 1; g < e.length; g++)
    if (((s += al(i, n, e[g])), r)) {
      var h = c;
      s += h[g];
    }
  Ib.lastIndex = 0;
  for (var m = "", p; (p = Ib.exec(s)) !== null; ) m += "-" + p[1];
  var y = ck(s) + m;
  return { name: y, styles: s, next: In };
}
var hk = function (n) {
    return n();
  },
  Hx = bb.useInsertionEffect ? bb.useInsertionEffect : !1,
  Bx = Hx || hk,
  Pb = Hx || k.useLayoutEffect,
  jx = k.createContext(typeof HTMLElement < "u" ? ik({ key: "css" }) : null);
jx.Provider;
var Ig = function (n) {
    return k.forwardRef(function (i, r) {
      var s = k.useContext(jx);
      return n(i, s, r);
    });
  },
  Pg = k.createContext({}),
  Vg = {}.hasOwnProperty,
  ig = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
  mk = function (n, i) {
    var r = {};
    for (var s in i) Vg.call(i, s) && (r[s] = i[s]);
    return (r[ig] = n), r;
  },
  pk = function (n) {
    var i = n.cache,
      r = n.serialized,
      s = n.isStringTag;
    return (
      zg(i, r, s),
      Bx(function () {
        return _g(i, r, s);
      }),
      null
    );
  },
  vk = Ig(function (e, n, i) {
    var r = e.css;
    typeof r == "string" && n.registered[r] !== void 0 && (r = n.registered[r]);
    var s = e[ig],
      c = [r],
      d = "";
    typeof e.className == "string"
      ? (d = Mx(n.registered, c, e.className))
      : e.className != null && (d = e.className + " ");
    var g = Ng(c, void 0, k.useContext(Pg));
    d += n.key + "-" + g.name;
    var h = {};
    for (var m in e) Vg.call(e, m) && m !== "css" && m !== ig && (h[m] = e[m]);
    return (
      (h.className = d),
      i && (h.ref = i),
      k.createElement(
        k.Fragment,
        null,
        k.createElement(pk, {
          cache: n,
          serialized: g,
          isStringTag: typeof s == "string",
        }),
        k.createElement(s, h),
      )
    );
  }),
  bk = vk,
  Vb = function (n, i) {
    var r = arguments;
    if (i == null || !Vg.call(i, "css"))
      return k.createElement.apply(void 0, r);
    var s = r.length,
      c = new Array(s);
    (c[0] = bk), (c[1] = mk(n, i));
    for (var d = 2; d < s; d++) c[d] = r[d];
    return k.createElement.apply(null, c);
  };
(function (e) {
  var n;
  n || (n = e.JSX || (e.JSX = {}));
})(Vb || (Vb = {}));
var Db = Ig(function (e, n) {
  var i = e.styles,
    r = Ng([i], void 0, k.useContext(Pg)),
    s = k.useRef();
  return (
    Pb(
      function () {
        var c = n.key + "-global",
          d = new n.sheet.constructor({
            key: c,
            nonce: n.sheet.nonce,
            container: n.sheet.container,
            speedy: n.sheet.isSpeedy,
          }),
          g = !1,
          h = document.querySelector(
            'style[data-emotion="' + c + " " + r.name + '"]',
          );
        return (
          n.sheet.tags.length && (d.before = n.sheet.tags[0]),
          h !== null &&
            ((g = !0), h.setAttribute("data-emotion", c), d.hydrate([h])),
          (s.current = [d, g]),
          function () {
            d.flush();
          }
        );
      },
      [n],
    ),
    Pb(
      function () {
        var c = s.current,
          d = c[0],
          g = c[1];
        if (g) {
          c[1] = !1;
          return;
        }
        if ((r.next !== void 0 && _g(n, r.next, !0), d.tags.length)) {
          var h = d.tags[d.tags.length - 1].nextElementSibling;
          (d.before = h), d.flush();
        }
        n.insert("", r, d, !1);
      },
      [n, r.name],
    ),
    null
  );
});
function yk(e, n) {
  if (e != null) {
    if (typeof e == "function") {
      e(n);
      return;
    }
    try {
      e.current = n;
    } catch {
      throw new Error(`Cannot assign value '${n}' to ref '${e}'`);
    }
  }
}
function xk(...e) {
  return (n) => {
    e.forEach((i) => {
      yk(i, n);
    });
  };
}
function cl(e) {
  const n = Object.assign({}, e);
  for (let i in n) n[i] === void 0 && delete n[i];
  return n;
}
function Sk(e) {
  return e.default || e;
}
const Mt = (e) => e != null && typeof e == "object" && !Array.isArray(e),
  Mn = (e) => typeof e == "string",
  Dg = (e) => typeof e == "function";
function Ck(e) {
  var i;
  const n = k.version;
  return !Mn(n) || n.startsWith("18.")
    ? e == null
      ? void 0
      : e.ref
    : (i = e == null ? void 0 : e.props) == null
      ? void 0
      : i.ref;
}
const Ux = (...e) => {
    const n = e.reduce(
      (i, r) => (r != null && r.forEach((s) => i.add(s)), i),
      new Set([]),
    );
    return Array.from(n);
  },
  [Ek, Gc] = Ko({
    name: "ChakraContext",
    strict: !0,
    providerName: "<ChakraProvider />",
  });
function Ok(e) {
  const { value: n, children: i } = e;
  return V.jsxs(Ek, {
    value: n,
    children: [
      !n._config.disableLayers && V.jsx(Db, { styles: n.layers.atRule }),
      V.jsx(Db, { styles: n._global }),
      i,
    ],
  });
}
const wk = (e, n) => {
    const i = {},
      r = {},
      s = Object.keys(e);
    for (const c of s) n(c) ? (r[c] = e[c]) : (i[c] = e[c]);
    return [r, i];
  },
  xr = (e, n) => {
    const i = Dg(n) ? n : (r) => n.includes(r);
    return wk(e, i);
  },
  kk = new Set(["htmlWidth", "htmlHeight", "htmlSize", "htmlTranslate"]);
function Rk(e) {
  return typeof e == "string" && kk.has(e);
}
function Tk(e, n, i) {
  const { css: r, isValidProperty: s } = Gc(),
    { children: c, ...d } = e,
    g = k.useMemo(() => {
      const [b, x] = xr(d, (A) => i(A, n.variantKeys)),
        [C, E] = xr(x, n.variantKeys),
        [R, O] = xr(E, s);
      return {
        forwardedProps: b,
        variantProps: C,
        styleProps: R,
        elementProps: O,
      };
    }, [n.variantKeys, i, d, s]),
    { css: h, ...m } = g.styleProps,
    p = k.useMemo(() => {
      const b = { ...g.variantProps };
      return (
        n.variantKeys.includes("colorPalette") ||
          (b.colorPalette = d.colorPalette),
        n.variantKeys.includes("orientation") ||
          (b.orientation = d.orientation),
        n(b)
      );
    }, [n, g.variantProps, d.colorPalette, d.orientation]);
  return {
    styles: k.useMemo(() => r(p, ...Ak(h), m), [r, p, h, m]),
    props: { ...g.forwardedProps, ...g.elementProps, children: c },
  };
}
const Ak = (e) => (Array.isArray(e) ? e : [e]).filter(Boolean).flat(),
  zk = Sk(Aw),
  _k = zk,
  Nk = (e) => e !== "theme",
  Ik = (e, n, i) => {
    let r;
    if (n) {
      const s = n.shouldForwardProp;
      r =
        e.__emotion_forwardProp && s
          ? (c) => e.__emotion_forwardProp(c) && s(c)
          : s;
    }
    return typeof r != "function" && i && (r = e.__emotion_forwardProp), r;
  };
let Pk = typeof document < "u";
const Mb = ({ cache: e, serialized: n, isStringTag: i }) => {
    zg(e, n, i);
    const r = Bx(() => _g(e, n, i));
    if (!Pk && r !== void 0) {
      let s = n.name,
        c = n.next;
      for (; c !== void 0; ) (s = Zt(s, c.name)), (c = c.next);
      return V.jsx("style", {
        "data-emotion": Zt(e.key, s),
        dangerouslySetInnerHTML: { __html: r },
        nonce: e.sheet.nonce,
      });
    }
    return null;
  },
  Lb = {
    path: ["d"],
    text: ["x", "y"],
    circle: ["cx", "cy", "r"],
    rect: ["width", "height", "x", "y", "rx", "ry"],
    ellipse: ["cx", "cy", "rx", "ry"],
    g: ["transform"],
    stop: ["offset", "stopOpacity"],
  },
  Vk = (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  Dk = (e, n = {}, i = {}) => {
    if (Vk(Lb, e)) {
      i.forwardProps || (i.forwardProps = []);
      const m = Lb[e];
      i.forwardProps = Ux([...i.forwardProps, ...m]);
    }
    const r = e.__emotion_real === e,
      s = (r && e.__emotion_base) || e;
    let c, d;
    i !== void 0 && ((c = i.label), (d = i.target));
    let g = [];
    const h = Ig((m, p, y) => {
      var he;
      const { cva: b, isValidProperty: x } = Gc(),
        C = n.__cva__ ? n : b(n),
        E = Lk(e.__emotion_cva, C),
        R = (J) => (I, F) =>
          J.includes(I) ? !0 : !(F != null && F.includes(I)) && !x(I);
      !i.shouldForwardProp &&
        i.forwardProps &&
        (i.shouldForwardProp = R(i.forwardProps));
      const O = (J, I) => {
          const F = typeof e == "string" && e.charCodeAt(0) > 96 ? _k : Nk,
            W = !(I != null && I.includes(J)) && !x(J);
          return F(J) && W;
        },
        A = Ik(e, i, r) || O,
        z = k.useMemo(() => Object.assign({}, i.defaultProps, cl(m)), [m]),
        { props: B, styles: _ } = Tk(z, E, A);
      let Y = "",
        $ = [_],
        j = B;
      if (B.theme == null) {
        j = {};
        for (let J in B) j[J] = B[J];
        j.theme = k.useContext(Pg);
      }
      typeof B.className == "string"
        ? (Y = Mx(p.registered, $, B.className))
        : B.className != null && (Y = Zt(Y, B.className));
      const U = Ng(g.concat($), p.registered, j);
      (Y = Zt(Y, `${p.key}-${U.name}`)), d !== void 0 && (Y = Zt(Y, d));
      const K = !A("as");
      let re = (K && B.as) || s,
        ne = {};
      for (let J in B)
        if (!(K && J === "as")) {
          if (Rk(J)) {
            const I = J.replace("html", "").toLowerCase();
            ne[I] = B[J];
            continue;
          }
          A(J) && (ne[J] = B[J]);
        }
      (ne.className = Y.trim()), (ne.ref = y);
      const pe =
        i.forwardAsChild ||
        ((he = i.forwardProps) == null ? void 0 : he.includes("asChild"));
      if (B.asChild && !pe) {
        const J = k.Children.only(B.children);
        (re = J.type),
          (ne.children = null),
          Reflect.deleteProperty(ne, "asChild"),
          (ne = el(ne, J.props)),
          (ne.ref = xk(y, Ck(J)));
      }
      return ne.as && pe
        ? ((ne.as = void 0),
          V.jsxs(k.Fragment, {
            children: [
              V.jsx(Mb, {
                cache: p,
                serialized: U,
                isStringTag: typeof re == "string",
              }),
              V.jsx(re, {
                asChild: !0,
                ...ne,
                children: V.jsx(B.as, { children: ne.children }),
              }),
            ],
          }))
        : V.jsxs(k.Fragment, {
            children: [
              V.jsx(Mb, {
                cache: p,
                serialized: U,
                isStringTag: typeof re == "string",
              }),
              V.jsx(re, { ...ne }),
            ],
          });
    });
    return (
      (h.displayName =
        c !== void 0
          ? c
          : `chakra(${typeof s == "string" ? s : s.displayName || s.name || "Component"})`),
      (h.__emotion_real = h),
      (h.__emotion_base = s),
      (h.__emotion_forwardProp = i.shouldForwardProp),
      (h.__emotion_cva = n),
      Object.defineProperty(h, "toString", {
        value() {
          return `.${d}`;
        },
      }),
      h
    );
  },
  Pf = Dk.bind(),
  Vf = new Map(),
  Mk = new Proxy(Pf, {
    apply(e, n, i) {
      return Pf(...i);
    },
    get(e, n) {
      return Vf.has(n) || Vf.set(n, Pf(n)), Vf.get(n);
    },
  }),
  mt = Mk,
  Lk = (e, n) => (e && !n ? e : !e && n ? n : e.merge(n));
function $x(e) {
  const { key: n, recipe: i } = e,
    r = Gc();
  return k.useMemo(() => {
    const s = i || (n != null ? r.getRecipe(n) : {});
    return r.cva(structuredClone(s));
  }, [n, i, r]);
}
const Hk = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function Fa(e) {
  const { key: n, recipe: i } = e,
    r = Hk(n || i.className || "Component"),
    [s, c] = Ko({
      strict: !1,
      name: `${r}PropsContext`,
      providerName: `${r}PropsContext`,
    });
  function d(m) {
    const { unstyled: p, ...y } = m,
      b = $x({ key: n, recipe: y.recipe || i }),
      [x, C] = k.useMemo(() => b.splitVariantProps(y), [b, y]);
    return { styles: p ? Tx : b(x), className: b.className, props: C };
  }
  const g = (m, p) => {
    const y = mt(m, {}, p),
      b = k.forwardRef((x, C) => {
        const E = c(),
          R = k.useMemo(() => el(E, x), [x, E]),
          { styles: O, className: A, props: z } = d(R);
        return V.jsx(y, {
          ...z,
          ref: C,
          css: [O, R.css],
          className: Zt(A, R.className),
        });
      });
    return (b.displayName = m.displayName || m.name), b;
  };
  function h() {
    return s;
  }
  return {
    withContext: g,
    PropsProvider: s,
    withPropsProvider: h,
    usePropsContext: c,
    useRecipeResult: d,
  };
}
function Bk(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
var Fx = (e) => e[0],
  Gx = (e) => e[e.length - 1],
  jk = (e, n) => e.indexOf(n) !== -1,
  Wx = (e, ...n) => e.concat(n),
  Mg = (e, ...n) => e.filter((i) => !n.includes(i)),
  Cc = (e, n) => (jk(e, n) ? Mg(e, n) : Wx(e, n));
function qx(e, n, i = {}) {
  const { step: r = 1, loop: s = !0 } = i,
    c = n + r,
    d = e.length,
    g = d - 1;
  return n === -1
    ? r > 0
      ? 0
      : g
    : c < 0
      ? s
        ? g
        : 0
      : c >= d
        ? s
          ? 0
          : n > d
            ? d
            : n
        : c;
}
function Uk(e, n, i = {}) {
  return e[qx(e, n, i)];
}
function $k(e, n, i = {}) {
  const { step: r = 1, loop: s = !0 } = i;
  return qx(e, n, { step: -r, loop: s });
}
function Fk(e, n, i = {}) {
  return e[$k(e, n, i)];
}
var Hb = (e) => (e == null ? void 0 : e.constructor.name) === "Array",
  Gk = (e, n) => {
    if (e.length !== n.length) return !1;
    for (let i = 0; i < e.length; i++) if (!kr(e[i], n[i])) return !1;
    return !0;
  },
  kr = (e, n) => {
    if (Object.is(e, n)) return !0;
    if ((e == null && n != null) || (e != null && n == null)) return !1;
    if (
      typeof (e == null ? void 0 : e.isEqual) == "function" &&
      typeof (n == null ? void 0 : n.isEqual) == "function"
    )
      return e.isEqual(n);
    if (typeof e == "function" && typeof n == "function")
      return e.toString() === n.toString();
    if (Hb(e) && Hb(n)) return Gk(Array.from(e), Array.from(n));
    if (typeof e != "object" || typeof n != "object") return !1;
    const i = Object.keys(n ?? Object.create(null)),
      r = i.length;
    for (let s = 0; s < r; s++) if (!Reflect.has(e, i[s])) return !1;
    for (let s = 0; s < r; s++) {
      const c = i[s];
      if (!kr(e[c], n[c])) return !1;
    }
    return !0;
  },
  Wk = (e) => Array.isArray(e),
  qk = (e) => e === !0 || e === !1,
  Yk = (e) => e != null && typeof e == "object",
  Df = (e) => Yk(e) && !Wk(e),
  rc = (e) => typeof e == "string",
  pi = (e) => typeof e == "function",
  Xk = (e) => e == null,
  Mf = (e, n) => Object.prototype.hasOwnProperty.call(e, n),
  Kk = Function.prototype.toString;
Kk.call(Object);
var Qk = (e, ...n) => (typeof e == "function" ? e(...n) : e) ?? void 0,
  Zk = (e) => e(),
  Jk = () => {},
  Ec =
    (...e) =>
    (...n) => {
      e.forEach(function (i) {
        i == null || i(...n);
      });
    };
function Qo(e, n, ...i) {
  var s;
  if (e in n) {
    const c = n[e];
    return pi(c) ? c(...i) : c;
  }
  const r = new Error(
    `No matching key: ${JSON.stringify(e)} in ${JSON.stringify(Object.keys(n))}`,
  );
  throw ((s = Error.captureStackTrace) == null || s.call(Error, r, Qo), r);
}
var Yx = (e, n) => {
    var i;
    try {
      return e();
    } catch (r) {
      return (
        r instanceof Error &&
          ((i = Error.captureStackTrace) == null || i.call(Error, r, Yx)),
        n == null ? void 0 : n()
      );
    }
  },
  { floor: Xx, abs: Bb, round: Wc, min: eR, max: tR, pow: nR, sign: aR } = Math,
  rg = (e) => Number.isNaN(e),
  sa = (e) => (rg(e) ? 0 : e),
  Kx = (e, n) => ((e % n) + n) % n,
  iR = (e, n) => ((e % n) + n) % n,
  rR = (e, n) => sa(e) >= n,
  oR = (e, n) => sa(e) <= n,
  lR = (e, n, i) => sa(e) >= n && sa(e) <= i,
  sR = (e, n, i) => Wc((sa(e) - n) / i) * i + n,
  Lt = (e, n, i) => eR(tR(sa(e), n), i),
  cR = (e, n, i) => (sa(e) - n) / (i - n),
  uR = (e, n, i, r) => Lt(sR(e * (i - n) + n, n, r), n, i),
  jb = (e, n) => {
    let i = e,
      r = n.toString(),
      s = r.indexOf("."),
      c = s >= 0 ? r.length - s : 0;
    if (c > 0) {
      let d = nR(10, c);
      i = Wc(i * d) / d;
    }
    return i;
  },
  Lf = (e, n) => (typeof n == "number" ? Xx(e * n + 0.5) / n : Wc(e)),
  Ub = (e, n, i, r) => {
    const s = n != null ? Number(n) : 0,
      c = Number(i),
      d = (e - s) % r;
    let g = Bb(d) * 2 >= r ? e + aR(d) * (r - Bb(d)) : e - d;
    if (((g = jb(g, r)), !rg(s) && g < s)) g = s;
    else if (!rg(c) && g > c) {
      const h = Xx((c - s) / r),
        m = s + h * r;
      g = h <= 0 || m < s ? c : m;
    }
    return jb(g, r);
  },
  $e = (e, n = 0, i = 10) => {
    const r = Math.pow(i, n);
    return Wc(e * r) / r;
  },
  $b = (e) => {
    if (!Number.isFinite(e)) return 0;
    let n = 1,
      i = 0;
    for (; Math.round(e * n) / n !== e; ) (n *= 10), (i += 1);
    return i;
  },
  Qx = (e, n, i) => {
    let r = n === "+" ? e + i : e - i;
    if (e % 1 !== 0 || i % 1 !== 0) {
      const s = 10 ** Math.max($b(e), $b(i));
      (e = Math.round(e * s)),
        (i = Math.round(i * s)),
        (r = n === "+" ? e + i : e - i),
        (r /= s);
    }
    return r;
  },
  dR = (e, n) => Qx(sa(e), "+", n),
  fR = (e, n) => Qx(sa(e), "-", n);
function Lg(e) {
  if (!gR(e) || e === void 0) return e;
  const n = Reflect.ownKeys(e).filter((r) => typeof r == "string"),
    i = {};
  for (const r of n) {
    const s = e[r];
    s !== void 0 && (i[r] = Lg(s));
  }
  return i;
}
var gR = (e) => e && typeof e == "object" && e.constructor === Object;
function Oc(...e) {
  e.length === 1 ? e[0] : e[1], e.length === 2 && e[0];
}
function hR(e, n) {
  if (e == null) throw new Error(n());
}
function mR(e, n) {
  return `${e} returned \`undefined\`. Seems you forgot to wrap component within ${n}`;
}
function pn(e = {}) {
  const {
      name: n,
      strict: i = !0,
      hookName: r = "useContext",
      providerName: s = "Provider",
      errorMessage: c,
      defaultValue: d,
    } = e,
    g = k.createContext(d);
  g.displayName = n;
  function h() {
    var p;
    const m = k.useContext(g);
    if (!m && i) {
      const y = new Error(c ?? mR(r, s));
      throw (
        ((y.name = "ContextError"),
        (p = Error.captureStackTrace) == null || p.call(Error, y, h),
        y)
      );
    }
    return m;
  }
  return [g.Provider, h, g];
}
const [Z6, ul] = pn({
  name: "EnvironmentContext",
  hookName: "useEnvironmentContext",
  providerName: "<EnvironmentProvider />",
  strict: !1,
  defaultValue: {
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window,
  },
});
function pR(e) {
  if (!e) return;
  const n = e.selectionStart ?? 0,
    i = e.selectionEnd ?? 0;
  Math.abs(i - n) === 0 &&
    n === 0 &&
    e.setSelectionRange(e.value.length, e.value.length);
}
var Fb = (e) => Math.max(0, Math.min(1, e)),
  vR = (e, n) => e.map((i, r) => e[(Math.max(n, 0) + r) % e.length]),
  Hf =
    (...e) =>
    (n) =>
      e.reduce((i, r) => r(i), n),
  Go = () => {},
  qc = (e) => typeof e == "object" && e !== null,
  bR = 2147483647,
  Ct = (e) => (e ? "" : void 0),
  yR = 1,
  xR = 9,
  SR = 11,
  _t = (e) => qc(e) && e.nodeType === yR && typeof e.nodeName == "string",
  Zx = (e) => qc(e) && e.nodeType === xR,
  CR = (e) => qc(e) && e === e.window,
  Jx = (e) => (_t(e) ? e.localName || "" : "#document");
function ER(e) {
  return ["html", "body", "#document"].includes(Jx(e));
}
var OR = (e) => qc(e) && e.nodeType !== void 0,
  Er = (e) => OR(e) && e.nodeType === SR && "host" in e,
  wR = (e) => _t(e) && e.localName === "input",
  kR = (e) =>
    _t(e)
      ? e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
      : !1,
  RR = /(textarea|select)/;
function TR(e) {
  if (e == null || !_t(e)) return !1;
  try {
    return (
      (wR(e) && e.selectionStart != null) ||
      RR.test(e.localName) ||
      e.isContentEditable ||
      e.getAttribute("contenteditable") === "true" ||
      e.getAttribute("contenteditable") === ""
    );
  } catch {
    return !1;
  }
}
function vi(e, n) {
  var r;
  if (!e || !n || !_t(e) || !_t(n)) return !1;
  const i = (r = n.getRootNode) == null ? void 0 : r.call(n);
  if (e === n || e.contains(n)) return !0;
  if (i && Er(i)) {
    let s = n;
    for (; s; ) {
      if (e === s) return !0;
      s = s.parentNode || s.host;
    }
  }
  return !1;
}
function kn(e) {
  return Zx(e)
    ? e
    : CR(e)
      ? e.document
      : ((e == null ? void 0 : e.ownerDocument) ?? document);
}
function AR(e) {
  return kn(e).documentElement;
}
function Et(e) {
  var n;
  return Er(e)
    ? Et(e.host)
    : Zx(e)
      ? (e.defaultView ?? window)
      : _t(e)
        ? (((n = e.ownerDocument) == null ? void 0 : n.defaultView) ?? window)
        : window;
}
function zR(e) {
  let n = e.activeElement;
  for (; n != null && n.shadowRoot; ) {
    const i = n.shadowRoot.activeElement;
    if (i === n) break;
    n = i;
  }
  return n;
}
function _R(e) {
  if (Jx(e) === "html") return e;
  const n = e.assignedSlot || e.parentNode || (Er(e) && e.host) || AR(e);
  return Er(n) ? n.host : n;
}
var Bf = new WeakMap();
function wc(e) {
  return Bf.has(e) || Bf.set(e, Et(e).getComputedStyle(e)), Bf.get(e);
}
var Yc = () => typeof document < "u";
function NR() {
  const e = navigator.userAgentData;
  return (e == null ? void 0 : e.platform) ?? navigator.platform;
}
function IR() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? e.brands.map(({ brand: n, version: i }) => `${n}/${i}`).join(" ")
    : navigator.userAgent;
}
var Hg = (e) => Yc() && e.test(NR()),
  e1 = (e) => Yc() && e.test(IR()),
  PR = (e) => Yc() && e.test(navigator.vendor),
  Gb = () => Yc() && !!navigator.maxTouchPoints,
  VR = () => Hg(/^iPhone/i),
  DR = () => Hg(/^iPad/i) || (Xc() && navigator.maxTouchPoints > 1),
  Bg = () => VR() || DR(),
  MR = () => Xc() || Bg(),
  Xc = () => Hg(/^Mac/i),
  jg = () => MR() && PR(/apple/i),
  LR = () => e1(/Firefox/i),
  HR = () => e1(/Android/i);
function BR(e) {
  var n, i, r;
  return (
    ((n = e.composedPath) == null ? void 0 : n.call(e)) ??
    ((r = (i = e.nativeEvent) == null ? void 0 : i.composedPath) == null
      ? void 0
      : r.call(i))
  );
}
function mn(e) {
  const n = BR(e);
  return (n == null ? void 0 : n[0]) ?? e.target;
}
function jR(e) {
  return qR(e).isComposing || e.keyCode === 229;
}
function UR(e) {
  return e.mozInputSource === 0 && e.isTrusted
    ? !0
    : HR() && e.pointerType
      ? e.type === "click" && e.buttons === 1
      : e.detail === 0 && !e.pointerType;
}
var $R = (e) => e.button === 2 || (Xc() && e.ctrlKey && e.button === 0),
  FR = (e) => "touches" in e && e.touches.length > 0,
  GR = {
    Up: "ArrowUp",
    Down: "ArrowDown",
    Esc: "Escape",
    " ": "Space",
    ",": "Comma",
    Left: "ArrowLeft",
    Right: "ArrowRight",
  },
  Wb = { ArrowLeft: "ArrowRight", ArrowRight: "ArrowLeft" };
function WR(e, n = {}) {
  const { dir: i = "ltr", orientation: r = "horizontal" } = n;
  let s = e.key;
  return (
    (s = GR[s] ?? s),
    i === "rtl" && r === "horizontal" && s in Wb && (s = Wb[s]),
    s
  );
}
function qR(e) {
  return e.nativeEvent ?? e;
}
function t1(e, n = "client") {
  const i = FR(e) ? e.touches[0] || e.changedTouches[0] : e;
  return { x: i[`${n}X`], y: i[`${n}Y`] };
}
var Ge = (e, n, i, r) => {
  const s = typeof e == "function" ? e() : e;
  return (
    s == null || s.addEventListener(n, i, r),
    () => {
      s == null || s.removeEventListener(n, i, r);
    }
  );
};
function n1(e, n) {
  const { type: i = "HTMLInputElement", property: r = "value" } = n,
    s = Et(e)[i].prototype;
  return Object.getOwnPropertyDescriptor(s, r) ?? {};
}
function YR(e) {
  if (e.localName === "input") return "HTMLInputElement";
  if (e.localName === "textarea") return "HTMLTextAreaElement";
  if (e.localName === "select") return "HTMLSelectElement";
}
function Kc(e, n, i = "value") {
  var s;
  if (!e) return;
  const r = YR(e);
  r && ((s = n1(e, { type: r, property: i }).set) == null || s.call(e, n)),
    e.setAttribute(i, n);
}
function a1(e, n) {
  var r;
  if (!e) return;
  (r = n1(e, { type: "HTMLInputElement", property: "checked" }).set) == null ||
    r.call(e, n),
    n ? e.setAttribute("checked", "") : e.removeAttribute("checked");
}
function XR(e, n) {
  const { value: i, bubbles: r = !0 } = n;
  if (!e) return;
  const s = Et(e);
  e instanceof s.HTMLInputElement &&
    (Kc(e, `${i}`), e.dispatchEvent(new s.Event("input", { bubbles: r })));
}
function KR(e, n) {
  const { checked: i, bubbles: r = !0 } = n;
  if (!e) return;
  const s = Et(e);
  e instanceof s.HTMLInputElement &&
    (a1(e, i), e.dispatchEvent(new s.Event("click", { bubbles: r })));
}
function QR(e) {
  return ZR(e) ? e.form : e.closest("form");
}
function ZR(e) {
  return e.matches("textarea, input, select, button");
}
function JR(e, n) {
  if (!e) return;
  const i = QR(e),
    r = (s) => {
      s.defaultPrevented || n();
    };
  return (
    i == null || i.addEventListener("reset", r, { passive: !0 }),
    () => (i == null ? void 0 : i.removeEventListener("reset", r))
  );
}
function eT(e, n) {
  const i = e == null ? void 0 : e.closest("fieldset");
  if (!i) return;
  n(i.disabled);
  const r = Et(i),
    s = new r.MutationObserver(() => n(i.disabled));
  return (
    s.observe(i, { attributes: !0, attributeFilter: ["disabled"] }),
    () => s.disconnect()
  );
}
function Qc(e, n) {
  if (!e) return;
  const { onFieldsetDisabledChange: i, onFormReset: r } = n,
    s = [JR(e, r), eT(e, i)];
  return () => s.forEach((c) => (c == null ? void 0 : c()));
}
var tT = (e) => _t(e) && e.tagName === "IFRAME",
  nT = (e) => parseInt(e.getAttribute("tabindex") || "0", 10) < 0,
  i1 =
    "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function Ug(e) {
  return !e || e.closest("[inert]") ? !1 : e.matches(i1) && kR(e);
}
function r1(e, n) {
  if (!e) return [];
  const r = Array.from(e.querySelectorAll(i1)).filter(aT);
  return (
    r.forEach((s, c) => {
      if (tT(s) && s.contentDocument) {
        const d = s.contentDocument.body,
          g = r1(d);
        r.splice(c, 1, ...g);
      }
    }),
    r.length,
    r
  );
}
function aT(e) {
  return e != null && e.tabIndex > 0 ? !0 : Ug(e) && !nT(e);
}
function $g(e) {
  const { root: n, getInitialEl: i, filter: r, enabled: s = !0 } = e;
  if (!s) return;
  let c = null;
  if (
    (c || (c = typeof i == "function" ? i() : i),
    c ||
      (c =
        n == null ? void 0 : n.querySelector("[data-autofocus],[autofocus]")),
    !c)
  ) {
    const d = r1(n);
    c = r ? d.filter(r)[0] : d[0];
  }
  return c || n || void 0;
}
function Fg(e) {
  const n = new Set();
  function i(r) {
    const s = globalThis.requestAnimationFrame(r);
    n.add(() => globalThis.cancelAnimationFrame(s));
  }
  return (
    i(() => i(e)),
    function () {
      n.forEach((s) => s());
    }
  );
}
function Ce(e) {
  let n;
  const i = globalThis.requestAnimationFrame(() => {
    n = e();
  });
  return () => {
    globalThis.cancelAnimationFrame(i), n == null || n();
  };
}
function iT(e, n, i) {
  const r = Ce(() => {
      e.removeEventListener(n, s, !0), i();
    }),
    s = () => {
      r(), i();
    };
  return e.addEventListener(n, s, { once: !0, capture: !0 }), r;
}
function rT(e, n) {
  if (!e) return;
  const { attributes: i, callback: r } = n,
    s = e.ownerDocument.defaultView || window,
    c = new s.MutationObserver((d) => {
      for (const g of d)
        g.type === "attributes" &&
          g.attributeName &&
          i.includes(g.attributeName) &&
          r(g);
    });
  return (
    c.observe(e, { attributes: !0, attributeFilter: i }), () => c.disconnect()
  );
}
function Zc(e, n) {
  const { defer: i } = n,
    r = i ? Ce : (c) => c(),
    s = [];
  return (
    s.push(
      r(() => {
        const c = typeof e == "function" ? e() : e;
        s.push(rT(c, n));
      }),
    ),
    () => {
      s.forEach((c) => (c == null ? void 0 : c()));
    }
  );
}
function oT(e, n) {
  const { callback: i } = n;
  if (!e) return;
  const r = e.ownerDocument.defaultView || window,
    s = new r.MutationObserver(i);
  return s.observe(e, { childList: !0, subtree: !0 }), () => s.disconnect();
}
function lT(e, n) {
  const i = Ce,
    r = [];
  return (
    r.push(
      i(() => {
        const s = typeof e == "function" ? e() : e;
        r.push(oT(s, n));
      }),
    ),
    () => {
      r.forEach((s) => (s == null ? void 0 : s()));
    }
  );
}
function o1(e) {
  const n = () => e.click();
  LR() ? iT(e, "keyup", n) : queueMicrotask(n);
}
function kc(e) {
  const n = _R(e);
  return ER(n) ? kn(n).body : _t(n) && Gg(n) ? n : kc(n);
}
function l1(e, n = []) {
  const i = kc(e),
    r = i === e.ownerDocument.body,
    s = Et(i);
  return r
    ? n.concat(s, s.visualViewport || [], Gg(i) ? i : [])
    : n.concat(i, l1(i, []));
}
var sT = /auto|scroll|overlay|hidden|clip/;
function Gg(e) {
  const n = Et(e),
    {
      overflow: i,
      overflowX: r,
      overflowY: s,
      display: c,
    } = n.getComputedStyle(e);
  return sT.test(i + s + r) && !["inline", "contents"].includes(c);
}
function cT(e) {
  return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
}
function Wg(e, n) {
  const { rootEl: i, ...r } = n || {};
  !e || !i || !Gg(i) || !cT(i) || e.scrollIntoView(r);
}
function s1(e, n) {
  const { left: i, top: r, width: s, height: c } = n.getBoundingClientRect(),
    d = { x: e.x - i, y: e.y - r },
    g = { x: Fb(d.x / s), y: Fb(d.y / c) };
  function h(m = {}) {
    const { dir: p = "ltr", orientation: y = "horizontal", inverted: b } = m,
      x = typeof b == "object" ? b.x : b,
      C = typeof b == "object" ? b.y : b;
    return y === "horizontal"
      ? p === "rtl" || x
        ? 1 - g.x
        : g.x
      : C
        ? 1 - g.y
        : g.y;
  }
  return { offset: d, percent: g, getPercentValue: h };
}
function uT(e, n) {
  const i = e.body,
    r = "pointerLockElement" in e || "mozPointerLockElement" in e,
    s = () => !!e.pointerLockElement;
  function c() {}
  function d(h) {
    s(), console.error("PointerLock error occurred:", h), e.exitPointerLock();
  }
  if (!r) return;
  try {
    i.requestPointerLock();
  } catch {}
  const g = [
    Ge(e, "pointerlockchange", c, !1),
    Ge(e, "pointerlockerror", d, !1),
  ];
  return () => {
    g.forEach((h) => h()), e.exitPointerLock();
  };
}
var vr = "default",
  og = "",
  oc = new WeakMap();
function dT(e = {}) {
  const { target: n, doc: i } = e,
    r = i ?? document,
    s = r.documentElement;
  return (
    Bg()
      ? (vr === "default" &&
          ((og = s.style.webkitUserSelect),
          (s.style.webkitUserSelect = "none")),
        (vr = "disabled"))
      : n && (oc.set(n, n.style.userSelect), (n.style.userSelect = "none")),
    () => fT({ target: n, doc: r })
  );
}
function fT(e = {}) {
  const { target: n, doc: i } = e,
    s = (i ?? document).documentElement;
  if (Bg()) {
    if (vr !== "disabled") return;
    (vr = "restoring"),
      setTimeout(() => {
        Fg(() => {
          vr === "restoring" &&
            (s.style.webkitUserSelect === "none" &&
              (s.style.webkitUserSelect = og || ""),
            (og = ""),
            (vr = "default"));
        });
      }, 300);
  } else if (n && oc.has(n)) {
    const c = oc.get(n);
    n.style.userSelect === "none" && (n.style.userSelect = c ?? ""),
      n.getAttribute("style") === "" && n.removeAttribute("style"),
      oc.delete(n);
  }
}
function c1(e = {}) {
  const { defer: n, target: i, ...r } = e,
    s = n ? Ce : (d) => d(),
    c = [];
  return (
    c.push(
      s(() => {
        const d = typeof i == "function" ? i() : i;
        c.push(dT({ ...r, target: d }));
      }),
    ),
    () => {
      c.forEach((d) => (d == null ? void 0 : d()));
    }
  );
}
function gT(e, n) {
  const { onPointerMove: i, onPointerUp: r } = n,
    c = [
      Ge(
        e,
        "pointermove",
        (d) => {
          const g = t1(d),
            h = Math.sqrt(g.x ** 2 + g.y ** 2),
            m = d.pointerType === "touch" ? 10 : 5;
          if (!(h < m)) {
            if (d.pointerType === "mouse" && d.button === 0) {
              r();
              return;
            }
            i({ point: g, event: d });
          }
        },
        !1,
      ),
      Ge(e, "pointerup", r, !1),
      Ge(e, "pointercancel", r, !1),
      Ge(e, "contextmenu", r, !1),
      c1({ doc: e }),
    ];
  return () => {
    c.forEach((d) => d());
  };
}
function hT(e) {
  const {
    pointerNode: n,
    keyboardNode: i = n,
    onPress: r,
    onPressStart: s,
    onPressEnd: c,
    isValidKey: d = (z) => z.key === "Enter",
  } = e;
  if (!n) return Go;
  const g = Et(n),
    h = kn(n);
  let m = Go,
    p = Go,
    y = Go;
  const b = (z) => ({ point: t1(z), event: z });
  function x(z) {
    s == null || s(b(z));
  }
  function C(z) {
    c == null || c(b(z));
  }
  const R = Ge(
      n,
      "pointerdown",
      (z) => {
        p();
        const _ = Ge(
            g,
            "pointerup",
            ($) => {
              const j = mn($);
              vi(n, j) ? r == null || r(b($)) : c == null || c(b($));
            },
            { passive: !r, once: !0 },
          ),
          Y = Ge(g, "pointercancel", C, { passive: !c, once: !0 });
        (p = Hf(_, Y)),
          h.activeElement === i &&
            z.pointerType === "mouse" &&
            z.preventDefault(),
          x(z);
      },
      { passive: !s },
    ),
    O = Ge(i, "focus", A);
  m = Hf(R, O);
  function A() {
    const z = ($) => {
        if (!d($)) return;
        const j = (K) => {
          if (!d(K)) return;
          const re = new g.PointerEvent("pointerup"),
            ne = b(re);
          r == null || r(ne), c == null || c(ne);
        };
        p(), (p = Ge(i, "keyup", j));
        const U = new g.PointerEvent("pointerdown");
        x(U);
      },
      B = () => {
        const $ = new g.PointerEvent("pointercancel");
        C($);
      },
      _ = Ge(i, "keydown", z),
      Y = Ge(i, "blur", B);
    y = Hf(_, Y);
  }
  return () => {
    m(), p(), y();
  };
}
function Rc(e, n) {
  return Array.from((e == null ? void 0 : e.querySelectorAll(n)) ?? []);
}
function mT(e, n) {
  return (e == null ? void 0 : e.querySelector(n)) ?? null;
}
var qg = (e) => e.id;
function pT(e, n, i = qg) {
  return e.find((r) => i(r) === n);
}
function Yg(e, n, i = qg) {
  const r = pT(e, n, i);
  return r ? e.indexOf(r) : -1;
}
function vT(e, n, i = !0) {
  let r = Yg(e, n);
  return (r = i ? (r + 1) % e.length : Math.min(r + 1, e.length - 1)), e[r];
}
function bT(e, n, i = !0) {
  let r = Yg(e, n);
  return r === -1
    ? i
      ? e[e.length - 1]
      : null
    : ((r = i ? (r - 1 + e.length) % e.length : Math.max(0, r - 1)), e[r]);
}
var yT = (e) =>
    e
      .split("")
      .map((n) => {
        const i = n.charCodeAt(0);
        return i > 0 && i < 128
          ? n
          : i >= 128 && i <= 255
            ? `/x${i.toString(16)}`.replace("/", "\\")
            : "";
      })
      .join("")
      .trim(),
  xT = (e) => {
    var n;
    return yT(
      ((n = e.dataset) == null ? void 0 : n.valuetext) ?? e.textContent ?? "",
    );
  },
  ST = (e, n) => e.trim().toLowerCase().startsWith(n.toLowerCase());
function CT(e, n, i, r = qg) {
  const s = i ? Yg(e, i, r) : -1;
  let c = i ? vR(e, s) : e;
  return (
    n.length === 1 && (c = c.filter((g) => r(g) !== i)),
    c.find((g) => ST(xT(g), n))
  );
}
function Xg(e, n) {
  if (!e) return Go;
  const i = Object.keys(n).reduce(
    (r, s) => ((r[s] = e.style.getPropertyValue(s)), r),
    {},
  );
  return (
    Object.assign(e.style, n),
    () => {
      Object.assign(e.style, i),
        e.style.length === 0 && e.removeAttribute("style");
    }
  );
}
function ET(e, n) {
  const { state: i, activeId: r, key: s, timeout: c = 350, itemToId: d } = n,
    g = i.keysSoFar + s,
    m = g.length > 1 && Array.from(g).every((C) => C === g[0]) ? g[0] : g;
  let p = e.slice();
  const y = CT(p, m, r, d);
  function b() {
    clearTimeout(i.timer), (i.timer = -1);
  }
  function x(C) {
    (i.keysSoFar = C),
      b(),
      C !== "" &&
        (i.timer = +setTimeout(() => {
          x(""), b();
        }, c));
  }
  return x(g), y;
}
var Kg = Object.assign(ET, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: OT,
});
function OT(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
var wT = {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  },
  kT = 1e3 / 60;
function RT(e, n) {
  const i = e();
  if (_t(i) && i.isConnected) return n(i), () => {};
  {
    const r = setInterval(() => {
      const s = e();
      _t(s) && s.isConnected && (n(s), clearInterval(r));
    }, kT);
    return () => clearInterval(r);
  }
}
function TT(e, n) {
  const i = [];
  return (
    e == null ||
      e.forEach((r) => {
        const s = RT(r, n);
        i.push(s);
      }),
    () => {
      i.forEach((r) => r());
    }
  );
}
var AT = (...e) =>
    e
      .map((n) => {
        var i;
        return (i = n == null ? void 0 : n.trim) == null ? void 0 : i.call(n);
      })
      .filter(Boolean)
      .join(" "),
  zT = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g,
  qb = (e) => {
    const n = {};
    let i;
    for (; (i = zT.exec(e)); ) n[i[1]] = i[2];
    return n;
  },
  _T = (e, n) => {
    if (rc(e)) {
      if (rc(n)) return `${e};${n}`;
      e = qb(e);
    } else rc(n) && (n = qb(n));
    return Object.assign({}, e ?? {}, n ?? {});
  };
function Qe(...e) {
  let n = {};
  for (let i of e) {
    for (let r in n) {
      if (
        r.startsWith("on") &&
        typeof n[r] == "function" &&
        typeof i[r] == "function"
      ) {
        n[r] = Ec(i[r], n[r]);
        continue;
      }
      if (r === "className" || r === "class") {
        n[r] = AT(n[r], i[r]);
        continue;
      }
      if (r === "style") {
        n[r] = _T(n[r], i[r]);
        continue;
      }
      n[r] = i[r] !== void 0 ? i[r] : n[r];
    }
    for (let r in i) n[r] === void 0 && (n[r] = i[r]);
  }
  return n;
}
function Yb(e, n, i) {
  let r = [],
    s;
  return (c) => {
    const d = e(c);
    return (
      (d.length !== r.length || d.some((h, m) => !kr(r[m], h))) &&
        ((r = d), (s = n(...d))),
      s
    );
  };
}
function Ga() {
  return {
    and: (...e) =>
      function (i) {
        return e.every((r) => i.guard(r));
      },
    or: (...e) =>
      function (i) {
        return e.some((r) => i.guard(r));
      },
    not: (e) =>
      function (i) {
        return !i.guard(e);
      },
  };
}
function u1() {
  return {
    guards: Ga(),
    createMachine: (e) => e,
    choose: (e) =>
      function ({ choose: i }) {
        var r;
        return (r = i(e)) == null ? void 0 : r.actions;
      },
  };
}
var hr = ((e) => (
    (e.NotStarted = "Not Started"),
    (e.Started = "Started"),
    (e.Stopped = "Stopped"),
    e
  ))(hr || {}),
  jf = "__init__";
function NT(e) {
  const n = () => {
      var g;
      return ((g = e.getRootNode) == null ? void 0 : g.call(e)) ?? document;
    },
    i = () => kn(n()),
    r = () => i().defaultView ?? window,
    s = () => zR(n());
  return {
    ...e,
    getRootNode: n,
    getDoc: i,
    getWin: r,
    getActiveElement: s,
    isActiveElement: (g) => g === s(),
    getById: (g) => n().getElementById(g),
  };
}
function d1(...e) {
  return (n) => {
    const i = [];
    for (const r of e)
      if (typeof r == "function") {
        const s = r(n);
        typeof s == "function" && i.push(s);
      } else r && (r.current = n);
    if (i.length)
      return () => {
        for (const r of i) r();
      };
  };
}
function IT(e) {
  var r, s;
  let n =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    i = n && "isReactWarning" in n && n.isReactWarning;
  return i
    ? e.ref
    : ((n =
        (s = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : s.get),
      (i = n && "isReactWarning" in n && n.isReactWarning),
      i ? e.props.ref : e.props.ref || e.ref);
}
const Uf = (e) => {
    const n = k.memo(
      k.forwardRef((i, r) => {
        const { asChild: s, children: c, ...d } = i;
        if (!s) return k.createElement(e, { ...d, ref: r }, c);
        const g = k.Children.only(c);
        if (!k.isValidElement(g)) return null;
        const h = IT(g);
        return k.cloneElement(g, { ...Qe(d, g.props), ref: r ? d1(r, h) : h });
      }),
    );
    return (n.displayName = e.displayName || e.name), n;
  },
  PT = () => {
    const e = new Map();
    return new Proxy(Uf, {
      apply(n, i, r) {
        return Uf(r[0]);
      },
      get(n, i) {
        const r = i;
        return e.has(r) || e.set(r, Uf(r)), e.get(r);
      },
    });
  },
  Ot = PT(),
  [J6, Jc] = pn({
    name: "LocaleContext",
    hookName: "useLocaleContext",
    providerName: "<LocaleProvider />",
    strict: !1,
    defaultValue: { dir: "ltr", locale: "en-US" },
  }),
  Hn = () => (e, n) =>
    n.reduce(
      (i, r) => {
        const [s, c] = i,
          d = r;
        return c[d] !== void 0 && (s[d] = c[d]), delete c[d], [s, c];
      },
      [{}, { ...e }],
    ),
  f1 = (e) =>
    Hn()(e, [
      "immediate",
      "lazyMount",
      "onExitComplete",
      "present",
      "skipAnimationOnMount",
      "unmountOnExit",
    ]);
function VT(e) {
  return new Proxy(
    {},
    {
      get(n, i) {
        return i === "style" ? (r) => e({ style: r }).style : e;
      },
    },
  );
}
var ve = () => (e) => Array.from(new Set(e));
function DT(e, n) {
  const { state: i, send: r, context: s } = e,
    c = i.matches("mounted", "unmountSuspended");
  return {
    skip: !s.get("initial"),
    present: c,
    setNode(d) {
      d && r({ type: "NODE.SET", node: d });
    },
    unmount() {
      r({ type: "UNMOUNT" });
    },
  };
}
var MT = {
  props({ props: e }) {
    return { ...e, present: !!e.present };
  },
  initialState({ prop: e }) {
    return e("present") ? "mounted" : "unmounted";
  },
  refs() {
    return { node: null, styles: null };
  },
  context({ bindable: e }) {
    return {
      unmountAnimationName: e(() => ({ defaultValue: null })),
      prevAnimationName: e(() => ({ defaultValue: null })),
      present: e(() => ({ defaultValue: !1 })),
      initial: e(() => ({ sync: !0, defaultValue: !1 })),
    };
  },
  exit: ["clearInitial", "cleanupNode"],
  watch({ track: e, action: n, prop: i }) {
    e([() => i("present")], () => {
      n(["setInitial", "syncPresence"]);
    });
  },
  on: { "NODE.SET": { actions: ["setNode", "setStyles"] } },
  states: {
    mounted: {
      on: {
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"],
        },
        "UNMOUNT.SUSPEND": { target: "unmountSuspended" },
      },
    },
    unmountSuspended: {
      effects: ["trackAnimationEvents"],
      on: {
        MOUNT: { target: "mounted", actions: ["setPrevAnimationName"] },
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"],
        },
      },
    },
    unmounted: {
      on: { MOUNT: { target: "mounted", actions: ["setPrevAnimationName"] } },
    },
  },
  implementations: {
    actions: {
      setInitial: ({ context: e }) => {
        e.get("initial") ||
          queueMicrotask(() => {
            e.set("initial", !0);
          });
      },
      clearInitial: ({ context: e }) => {
        e.set("initial", !1);
      },
      cleanupNode: ({ refs: e }) => {
        e.set("node", null), e.set("styles", null);
      },
      invokeOnExitComplete: ({ prop: e }) => {
        var n;
        (n = e("onExitComplete")) == null || n();
      },
      setNode: ({ refs: e, event: n }) => {
        e.set("node", n.node);
      },
      setStyles: ({ refs: e, event: n }) => {
        e.set("styles", wc(n.node));
      },
      syncPresence: ({ context: e, refs: n, send: i, prop: r }) => {
        const s = r("present");
        if (s) return i({ type: "MOUNT", src: "presence.changed" });
        const c = n.get("node");
        if (
          !s &&
          (c == null ? void 0 : c.ownerDocument.visibilityState) === "hidden"
        )
          return i({ type: "UNMOUNT", src: "visibilitychange" });
        Ce(() => {
          var g, h;
          const d = Bs(n.get("styles"));
          e.set("unmountAnimationName", d),
            d === "none" ||
            d === e.get("prevAnimationName") ||
            ((g = n.get("styles")) == null ? void 0 : g.display) === "none" ||
            ((h = n.get("styles")) == null ? void 0 : h.animationDuration) ===
              "0s"
              ? i({ type: "UNMOUNT", src: "presence.changed" })
              : i({ type: "UNMOUNT.SUSPEND" });
        });
      },
      setPrevAnimationName: ({ context: e, refs: n }) => {
        Ce(() => {
          e.set("prevAnimationName", Bs(n.get("styles")));
        });
      },
      clearPrevAnimationName: ({ context: e }) => {
        e.set("prevAnimationName", null);
      },
    },
    effects: {
      trackAnimationEvents: ({ context: e, refs: n, send: i }) => {
        const r = n.get("node");
        if (!r) return;
        const s = (g) => {
            var m, p;
            (((p = (m = g.composedPath) == null ? void 0 : m.call(g)) == null
              ? void 0
              : p[0]) ?? g.target) === r &&
              e.set("prevAnimationName", Bs(n.get("styles")));
          },
          c = (g) => {
            const h = Bs(n.get("styles"));
            mn(g) === r &&
              h === e.get("unmountAnimationName") &&
              i({ type: "UNMOUNT", src: "animationend" });
          };
        r.addEventListener("animationstart", s),
          r.addEventListener("animationcancel", c),
          r.addEventListener("animationend", c);
        const d = Xg(r, { animationFillMode: "forwards" });
        return () => {
          r.removeEventListener("animationstart", s),
            r.removeEventListener("animationcancel", c),
            r.removeEventListener("animationend", c),
            Fg(() => d());
        };
      },
    },
  },
};
function Bs(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
ve()(["onExitComplete", "present", "immediate"]);
var eu = Rx(),
  g1 = typeof globalThis.document < "u" ? k.useLayoutEffect : k.useEffect;
function Tc(e) {
  const n = e().value ?? e().defaultValue,
    i = e().isEqual ?? Object.is,
    [r] = k.useState(n),
    [s, c] = k.useState(r),
    d = e().value !== void 0,
    g = k.useRef(s);
  g.current = d ? e().value : s;
  const h = k.useRef(g.current);
  g1(() => {
    h.current = g.current;
  }, [s, e().value]);
  const m = (y) => {
    var C, E;
    const b = h.current,
      x = pi(y) ? y(b) : y;
    e().debug &&
      console.log(`[bindable > ${e().debug}] setValue`, { next: x, prev: b }),
      d || c(x),
      i(x, b) || (E = (C = e()).onChange) == null || E.call(C, x, b);
  };
  function p() {
    return d ? e().value : s;
  }
  return {
    initial: r,
    ref: g,
    get: p,
    set(y) {
      (e().sync ? eu.flushSync : Zk)(() => m(y));
    },
    invoke(y, b) {
      var x, C;
      (C = (x = e()).onChange) == null || C.call(x, y, b);
    },
    hash(y) {
      var b, x;
      return (
        ((x = (b = e()).hash) == null ? void 0 : x.call(b, y)) ?? String(y)
      );
    },
  };
}
Tc.cleanup = (e) => {
  k.useEffect(() => e, []);
};
Tc.ref = (e) => {
  const n = k.useRef(e);
  return {
    get: () => n.current,
    set: (i) => {
      n.current = i;
    },
  };
};
function LT(e) {
  const n = k.useRef(e);
  return {
    get(i) {
      return n.current[i];
    },
    set(i, r) {
      n.current[i] = r;
    },
  };
}
var HT = (e, n) => {
  const i = k.useRef(!1),
    r = k.useRef(!1);
  k.useEffect(() => {
    if (i.current && r.current) return n();
    r.current = !0;
  }, [...(e ?? []).map((s) => (typeof s == "function" ? s() : s))]),
    k.useEffect(
      () => (
        (i.current = !0),
        () => {
          i.current = !1;
        }
      ),
      [],
    );
};
function dl(e, n = {}) {
  var re, ne, pe, he;
  const i = k.useMemo(() => {
      const { id: J, ids: I, getRootNode: F } = n;
      return NT({ id: J, ids: I, getRootNode: F });
    }, [n]),
    r = (...J) => {
      e.debug && console.log(...J);
    },
    s =
      ((re = e.props) == null
        ? void 0
        : re.call(e, { props: Lg(n), scope: i })) ?? n,
    c = BT(s),
    d =
      (ne = e.context) == null
        ? void 0
        : ne.call(e, {
            prop: c,
            bindable: Tc,
            scope: i,
            flush: Xb,
            getContext() {
              return h;
            },
            getComputed() {
              return _;
            },
            getRefs() {
              return E;
            },
          }),
    g = h1(d),
    h = {
      get(J) {
        var I;
        return (I = g.current) == null ? void 0 : I[J].ref.current;
      },
      set(J, I) {
        var F;
        (F = g.current) == null || F[J].set(I);
      },
      initial(J) {
        var I;
        return (I = g.current) == null ? void 0 : I[J].initial;
      },
      hash(J) {
        var F, W;
        const I = (F = g.current) == null ? void 0 : F[J].get();
        return (W = g.current) == null ? void 0 : W[J].hash(I);
      },
    },
    m = k.useRef(new Map()),
    p = k.useRef(null),
    y = k.useRef(null),
    b = k.useRef({ type: "" }),
    x = () => ({
      ...b.current,
      current() {
        return b.current;
      },
      previous() {
        return y.current;
      },
    }),
    C = () => ({
      ...Y,
      matches(...J) {
        return J.includes(Y.ref.current);
      },
      hasTag(J) {
        var I, F;
        return !!(
          (F = (I = e.states[Y.ref.current]) == null ? void 0 : I.tags) !=
            null && F.includes(J)
        );
      },
    }),
    E = LT(
      ((pe = e.refs) == null ? void 0 : pe.call(e, { prop: c, context: h })) ??
        {},
    ),
    R = () => ({
      state: C(),
      context: h,
      event: x(),
      prop: c,
      send: K,
      action: O,
      guard: A,
      track: HT,
      refs: E,
      computed: _,
      flush: Xb,
      scope: i,
      choose: B,
    }),
    O = (J) => {
      const I = pi(J) ? J(R()) : J;
      if (!I) return;
      const F = I.map((W) => {
        var w, G;
        const ie =
          (G = (w = e.implementations) == null ? void 0 : w.actions) == null
            ? void 0
            : G[W];
        return (
          ie ||
            Oc(
              `[zag-js] No implementation found for action "${JSON.stringify(W)}"`,
            ),
          ie
        );
      });
      for (const W of F) W == null || W(R());
    },
    A = (J) => {
      var I, F;
      return pi(J)
        ? J(R())
        : (F = (I = e.implementations) == null ? void 0 : I.guards) == null
          ? void 0
          : F[J](R());
    },
    z = (J) => {
      const I = pi(J) ? J(R()) : J;
      if (!I) return;
      const F = I.map((ie) => {
          var G, te;
          const w =
            (te = (G = e.implementations) == null ? void 0 : G.effects) == null
              ? void 0
              : te[ie];
          return (
            w ||
              Oc(
                `[zag-js] No implementation found for effect "${JSON.stringify(ie)}"`,
              ),
            w
          );
        }),
        W = [];
      for (const ie of F) {
        const w = ie == null ? void 0 : ie(R());
        w && W.push(w);
      }
      return () => W.forEach((ie) => (ie == null ? void 0 : ie()));
    },
    B = (J) =>
      Bk(J).find((I) => {
        let F = !I.guard;
        return (
          rc(I.guard) ? (F = !!A(I.guard)) : pi(I.guard) && (F = I.guard(R())),
          F
        );
      }),
    _ = (J) => {
      hR(e.computed, () => "[zag-js] No computed object found on machine");
      const I = e.computed[J];
      return I({
        context: h,
        event: x(),
        prop: c,
        refs: E,
        scope: i,
        computed: _,
      });
    },
    Y = Tc(() => ({
      defaultValue: e.initialState({ prop: c }),
      onChange(J, I) {
        var W, ie, w, G;
        if (I) {
          const te = m.current.get(I);
          te == null || te(), m.current.delete(I);
        }
        I && O((W = e.states[I]) == null ? void 0 : W.exit),
          O((ie = p.current) == null ? void 0 : ie.actions);
        const F = z((w = e.states[J]) == null ? void 0 : w.effects);
        if ((F && m.current.set(J, F), I === jf)) {
          O(e.entry);
          const te = z(e.effects);
          te && m.current.set(jf, te);
        }
        O((G = e.states[J]) == null ? void 0 : G.entry);
      },
    })),
    $ = k.useRef(void 0),
    j = k.useRef(hr.NotStarted);
  g1(() => {
    queueMicrotask(() => {
      const F = j.current === hr.Started;
      (j.current = hr.Started), r(F ? "rehydrating..." : "initializing...");
      const W = $.current ?? Y.initial;
      Y.invoke(W, F ? Y.get() : jf);
    });
    const J = m.current,
      I = Y.ref.current;
    return () => {
      r("unmounting..."),
        ($.current = I),
        (j.current = hr.Stopped),
        J.forEach((F) => (F == null ? void 0 : F())),
        (m.current = new Map()),
        (p.current = null),
        queueMicrotask(() => {
          O(e.exit);
        });
    };
  }, []);
  const U = () => ("ref" in Y ? Y.ref.current : Y.get()),
    K = (J) => {
      queueMicrotask(() => {
        var G, te;
        if (j.current !== hr.Started) return;
        (y.current = b.current), (b.current = J), r("send", J);
        let I = U();
        const F =
            ((G = e.states[I].on) == null ? void 0 : G[J.type]) ??
            ((te = e.on) == null ? void 0 : te[J.type]),
          W = B(F);
        if (!W) return;
        p.current = W;
        const ie = W.target ?? I;
        r("transition", W);
        const w = ie !== I;
        w
          ? eu.flushSync(() => Y.set(ie))
          : W.reenter && !w
            ? Y.invoke(I, I)
            : O(W.actions ?? []);
      });
    };
  return (
    (he = e.watch) == null || he.call(e, R()),
    {
      state: C(),
      send: K,
      context: h,
      prop: c,
      scope: i,
      refs: E,
      computed: _,
      event: x(),
      getStatus: () => j.current,
    }
  );
}
function h1(e) {
  const n = k.useRef(e);
  return (n.current = e), n;
}
function BT(e) {
  const n = h1(e);
  return function (r) {
    return n.current[r];
  };
}
function Xb(e) {
  queueMicrotask(() => {
    eu.flushSync(() => e());
  });
}
var tu = VT((e) => e);
function m1(e, n = {}) {
  const { sync: i = !1 } = n,
    r = jT(e);
  return k.useCallback(
    (...s) => {
      var c;
      return i
        ? queueMicrotask(() => {
            var d;
            return (d = r.current) == null ? void 0 : d.call(r, ...s);
          })
        : (c = r.current) == null
          ? void 0
          : c.call(r, ...s);
    },
    [i, r],
  );
}
function jT(e) {
  const n = k.useRef(e);
  return (n.current = e), n;
}
const p1 = (e = {}) => {
    const {
        lazyMount: n,
        unmountOnExit: i,
        present: r,
        skipAnimationOnMount: s = !1,
        ...c
      } = e,
      d = k.useRef(!1),
      g = { ...c, present: r, onExitComplete: m1(e.onExitComplete) },
      h = dl(MT, g),
      m = DT(h);
    m.present && (d.current = !0);
    const p = (!m.present && !d.current && n) || (i && !m.present && d.current),
      y = () => ({
        "data-state": m.skip && s ? void 0 : r ? "open" : "closed",
        hidden: !m.present,
      });
    return {
      ref: m.setNode,
      getPresenceProps: y,
      present: m.present,
      unmounted: p,
    };
  },
  [v1, b1] = pn({
    name: "PresenceContext",
    hookName: "usePresenceContext",
    providerName: "<PresenceProvider />",
  }),
  [y1, nu] = pn({
    name: "AccordionContext",
    hookName: "useAccordionContext",
    providerName: "<AccordionProvider />",
  }),
  [UT, eV] = pn({
    name: "AccordionItemContext",
    hookName: "useAccordionItemContext",
    providerName: "<AccordionItemProvider />",
  }),
  $T = (e) =>
    Hn()(e, [
      "defaultOpen",
      "disabled",
      "id",
      "ids",
      "lazyMount",
      "onExitComplete",
      "onOpenChange",
      "open",
      "unmountOnExit",
    ]);
var me = (e, n = []) => ({
    parts: (...i) => {
      if (FT(n)) return me(e, i);
      throw new Error(
        "createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?",
      );
    },
    extendWith: (...i) => me(e, [...n, ...i]),
    rename: (i) => me(i, n),
    keys: () => n,
    build: () =>
      [...new Set(n)].reduce(
        (i, r) =>
          Object.assign(i, {
            [r]: {
              selector: [
                `&[data-scope="${ur(e)}"][data-part="${ur(r)}"]`,
                `& [data-scope="${ur(e)}"][data-part="${ur(r)}"]`,
              ].join(", "),
              attrs: { "data-scope": ur(e), "data-part": ur(r) },
            },
          }),
        {},
      ),
  }),
  ur = (e) =>
    e
      .replace(/([A-Z])([A-Z])/g, "$1-$2")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase(),
  FT = (e) => e.length === 0,
  x1 = me("collapsible").parts("root", "trigger", "content", "indicator"),
  js = x1.build(),
  GT = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.root) ?? `collapsible:${e.id}`;
  },
  lg = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ??
      `collapsible:${e.id}:content`
    );
  },
  WT = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ??
      `collapsible:${e.id}:trigger`
    );
  },
  Us = (e) => e.getById(lg(e));
function qT(e, n) {
  const { state: i, send: r, context: s, scope: c, prop: d } = e,
    g = i.matches("open") || i.matches("closing"),
    h = i.matches("open"),
    { width: m, height: p } = s.get("size"),
    y = !!d("disabled"),
    b = !s.get("initial") && h,
    x = "ltr";
  return {
    disabled: y,
    visible: g,
    open: h,
    measureSize() {
      r({ type: "size.measure" });
    },
    setOpen(C) {
      i.matches("open") !== C && r({ type: C ? "open" : "close" });
    },
    getRootProps() {
      return n.element({
        ...js.root.attrs,
        "data-state": h ? "open" : "closed",
        dir: x,
        id: GT(c),
      });
    },
    getContentProps() {
      return n.element({
        ...js.content.attrs,
        "data-collapsible": "",
        "data-state": b ? void 0 : h ? "open" : "closed",
        id: lg(c),
        "data-disabled": Ct(y),
        hidden: !g,
        style: {
          "--height": p != null ? `${p}px` : void 0,
          "--width": m != null ? `${m}px` : void 0,
        },
      });
    },
    getTriggerProps() {
      return n.element({
        ...js.trigger.attrs,
        id: WT(c),
        dir: x,
        type: "button",
        "data-state": h ? "open" : "closed",
        "data-disabled": Ct(y),
        "aria-controls": lg(c),
        "aria-expanded": g || !1,
        onClick(C) {
          C.defaultPrevented || y || r({ type: h ? "close" : "open" });
        },
      });
    },
    getIndicatorProps() {
      return n.element({
        ...js.indicator.attrs,
        dir: x,
        "data-state": h ? "open" : "closed",
        "data-disabled": Ct(y),
      });
    },
  };
}
var YT = {
  initialState({ prop: e }) {
    return e("open") || e("defaultOpen") ? "open" : "closed";
  },
  context({ bindable: e }) {
    return {
      size: e(() => ({ defaultValue: { height: 0, width: 0 }, sync: !0 })),
      initial: e(() => ({ defaultValue: !1 })),
    };
  },
  refs() {
    return { cleanup: void 0, stylesRef: void 0 };
  },
  watch({ track: e, prop: n, action: i }) {
    e([() => n("open")], () => {
      i(["setInitial", "computeSize", "toggleVisibility"]);
    });
  },
  exit: ["clearInitial", "cleanupNode"],
  states: {
    closed: {
      on: {
        "controlled.open": { target: "open" },
        open: [
          { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
          {
            target: "open",
            actions: ["setInitial", "computeSize", "invokeOnOpen"],
          },
        ],
      },
    },
    closing: {
      effects: ["trackExitAnimation"],
      on: {
        "controlled.close": { target: "closed" },
        "controlled.open": { target: "open" },
        open: [
          { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
          { target: "open", actions: ["setInitial", "invokeOnOpen"] },
        ],
        close: [
          { guard: "isOpenControlled", actions: ["invokeOnExitComplete"] },
          {
            target: "closed",
            actions: ["setInitial", "computeSize", "invokeOnExitComplete"],
          },
        ],
        "animation.end": {
          target: "closed",
          actions: ["invokeOnExitComplete", "clearInitial"],
        },
      },
    },
    open: {
      effects: ["trackEnterAnimation"],
      on: {
        "controlled.close": { target: "closing" },
        close: [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          {
            target: "closing",
            actions: ["setInitial", "computeSize", "invokeOnClose"],
          },
        ],
        "size.measure": { actions: ["measureSize"] },
        "animation.end": { actions: ["clearInitial"] },
      },
    },
  },
  implementations: {
    guards: { isOpenControlled: ({ prop: e }) => e("open") != null },
    effects: {
      trackEnterAnimation: ({ send: e, scope: n }) => {
        let i;
        const r = Ce(() => {
          const s = Us(n);
          if (!s) return;
          const c = wc(s).animationName;
          if (!c || c === "none") {
            e({ type: "animation.end" });
            return;
          }
          const g = (h) => {
            mn(h) === s && e({ type: "animation.end" });
          };
          s.addEventListener("animationend", g),
            (i = () => {
              s.removeEventListener("animationend", g);
            });
        });
        return () => {
          r(), i == null || i();
        };
      },
      trackExitAnimation: ({ send: e, scope: n }) => {
        let i;
        const r = Ce(() => {
          const s = Us(n);
          if (!s) return;
          const c = wc(s).animationName;
          if (!c || c === "none") {
            e({ type: "animation.end" });
            return;
          }
          const g = (m) => {
            mn(m) === s && e({ type: "animation.end" });
          };
          s.addEventListener("animationend", g);
          const h = Xg(s, { animationFillMode: "forwards" });
          i = () => {
            s.removeEventListener("animationend", g), Fg(() => h());
          };
        });
        return () => {
          r(), i == null || i();
        };
      },
    },
    actions: {
      setInitial: ({ context: e, flush: n }) => {
        n(() => {
          e.set("initial", !0);
        });
      },
      clearInitial: ({ context: e }) => {
        e.set("initial", !1);
      },
      cleanupNode: ({ refs: e }) => {
        e.set("stylesRef", null);
      },
      measureSize: ({ context: e, scope: n }) => {
        const i = Us(n);
        if (!i) return;
        const { height: r, width: s } = i.getBoundingClientRect();
        e.set("size", { height: r, width: s });
      },
      computeSize: ({ refs: e, scope: n, context: i }) => {
        var s;
        (s = e.get("cleanup")) == null || s();
        const r = Ce(() => {
          const c = Us(n);
          if (!c) return;
          const d = c.hidden;
          (c.style.animationName = "none"),
            (c.style.animationDuration = "0s"),
            (c.hidden = !1);
          const g = c.getBoundingClientRect();
          i.set("size", { height: g.height, width: g.width }),
            i.get("initial") &&
              ((c.style.animationName = ""), (c.style.animationDuration = "")),
            (c.hidden = d);
        });
        e.set("cleanup", r);
      },
      invokeOnOpen: ({ prop: e }) => {
        var n;
        (n = e("onOpenChange")) == null || n({ open: !0 });
      },
      invokeOnClose: ({ prop: e }) => {
        var n;
        (n = e("onOpenChange")) == null || n({ open: !1 });
      },
      invokeOnExitComplete: ({ prop: e }) => {
        var n;
        (n = e("onExitComplete")) == null || n();
      },
      toggleVisibility: ({ prop: e, send: n }) => {
        n({ type: e("open") ? "controlled.open" : "controlled.close" });
      },
    },
  },
};
ve()([
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "onExitComplete",
  "onOpenChange",
  "defaultOpen",
  "open",
]);
const XT = (e = {}) => {
    const { lazyMount: n, unmountOnExit: i, ...r } = e,
      s = k.useId(),
      c = k.useRef(!1),
      { dir: d } = Jc(),
      { getRootNode: g } = ul(),
      h = { id: s, dir: d, getRootNode: g, ...r },
      m = dl(YT, h),
      p = qT(m, tu);
    p.visible && (c.current = !0);
    const y = (!p.visible && !c.current && n) || (i && !p.visible && c.current);
    return { ...p, isUnmounted: y };
  },
  [KT, S1] = pn({
    name: "CollapsibleContext",
    hookName: "useCollapsibleContext",
    providerName: "<CollapsibleProvider />",
  }),
  C1 = k.forwardRef((e, n) => {
    const [i, r] = $T(e),
      s = XT(i),
      c = Qe(s.getRootProps(), r);
    return V.jsx(KT, { value: s, children: V.jsx(Ot.div, { ...c, ref: n }) });
  });
C1.displayName = "CollapsibleRoot";
var QT = Object.defineProperty,
  ZT = (e, n, i) =>
    n in e
      ? QT(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (e[n] = i),
  Qg = (e, n, i) => ZT(e, n + "", i),
  JT = (e, n) => {
    if (Object.keys(e).length !== Object.keys(n).length) return !1;
    for (let i in e) if (e[i] !== n[i]) return !1;
    return !0;
  },
  Zg = class {
    toHexInt() {
      return this.toFormat("rgba").toHexInt();
    }
    getChannelValue(e) {
      if (e in this) return this[e];
      throw new Error("Unsupported color channel: " + e);
    }
    getChannelValuePercent(e, n) {
      const i = n ?? this.getChannelValue(e),
        { minValue: r, maxValue: s } = this.getChannelRange(e);
      return cR(i, r, s);
    }
    getChannelPercentValue(e, n) {
      const { minValue: i, maxValue: r, step: s } = this.getChannelRange(e),
        c = uR(n, i, r, s);
      return Ub(c, i, r, s);
    }
    withChannelValue(e, n) {
      const { minValue: i, maxValue: r } = this.getChannelRange(e);
      if (e in this) {
        let s = this.clone();
        return (s[e] = Lt(n, i, r)), s;
      }
      throw new Error("Unsupported color channel: " + e);
    }
    getColorAxes(e) {
      let { xChannel: n, yChannel: i } = e,
        r = n || this.getChannels().find((d) => d !== i),
        s = i || this.getChannels().find((d) => d !== r),
        c = this.getChannels().find((d) => d !== r && d !== s);
      return { xChannel: r, yChannel: s, zChannel: c };
    }
    incrementChannel(e, n) {
      const { minValue: i, maxValue: r, step: s } = this.getChannelRange(e),
        c = Ub(Lt(this.getChannelValue(e) + n, i, r), i, r, s);
      return this.withChannelValue(e, c);
    }
    decrementChannel(e, n) {
      return this.incrementChannel(e, -n);
    }
    isEqual(e) {
      return (
        JT(this.toJSON(), e.toJSON()) &&
        this.getChannelValue("alpha") === e.getChannelValue("alpha")
      );
    }
  },
  E1 = class lc extends Zg {
    constructor(n, i, r, s) {
      super(),
        (this.red = n),
        (this.green = i),
        (this.blue = r),
        (this.alpha = s);
    }
    static parse(n) {
      let i = [];
      if (/^#[\da-f]+$/i.test(n) && [4, 5, 7, 9].includes(n.length)) {
        const s = (n.length < 6 ? n.replace(/[^#]/gi, "$&$&") : n)
          .slice(1)
          .split("");
        for (; s.length > 0; ) i.push(parseInt(s.splice(0, 2).join(""), 16));
        i[3] = i[3] !== void 0 ? i[3] / 255 : void 0;
      }
      const r = n.match(/^rgba?\((.*)\)$/);
      return (
        r != null &&
          r[1] &&
          (i = r[1]
            .split(",")
            .map((s) => Number(s.trim()))
            .map((s, c) => Lt(s, 0, c < 3 ? 255 : 1))),
        i.length < 3 ? void 0 : new lc(i[0], i[1], i[2], i[3] ?? 1)
      );
    }
    toString(n) {
      switch (n) {
        case "hex":
          return (
            "#" +
            (
              this.red.toString(16).padStart(2, "0") +
              this.green.toString(16).padStart(2, "0") +
              this.blue.toString(16).padStart(2, "0")
            ).toUpperCase()
          );
        case "hexa":
          return (
            "#" +
            (
              this.red.toString(16).padStart(2, "0") +
              this.green.toString(16).padStart(2, "0") +
              this.blue.toString(16).padStart(2, "0") +
              Math.round(this.alpha * 255)
                .toString(16)
                .padStart(2, "0")
            ).toUpperCase()
          );
        case "rgb":
          return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        case "css":
        case "rgba":
          return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        case "hsl":
          return this.toHSL().toString("hsl");
        case "hsb":
          return this.toHSB().toString("hsb");
        default:
          return this.toFormat(n).toString(n);
      }
    }
    toFormat(n) {
      switch (n) {
        case "rgba":
          return this;
        case "hsba":
          return this.toHSB();
        case "hsla":
          return this.toHSL();
        default:
          throw new Error("Unsupported color conversion: rgb -> " + n);
      }
    }
    toHexInt() {
      return (this.red << 16) | (this.green << 8) | this.blue;
    }
    toHSB() {
      const n = this.red / 255,
        i = this.green / 255,
        r = this.blue / 255,
        s = Math.min(n, i, r),
        c = Math.max(n, i, r),
        d = c - s,
        g = c === 0 ? 0 : d / c;
      let h = 0;
      if (d !== 0) {
        switch (c) {
          case n:
            h = (i - r) / d + (i < r ? 6 : 0);
            break;
          case i:
            h = (r - n) / d + 2;
            break;
          case r:
            h = (n - i) / d + 4;
            break;
        }
        h /= 6;
      }
      return new th(
        $e(h * 360, 2),
        $e(g * 100, 2),
        $e(c * 100, 2),
        $e(this.alpha, 2),
      );
    }
    toHSL() {
      const n = this.red / 255,
        i = this.green / 255,
        r = this.blue / 255,
        s = Math.min(n, i, r),
        c = Math.max(n, i, r),
        d = (c + s) / 2,
        g = c - s;
      let h = -1,
        m = -1;
      if (g === 0) h = m = 0;
      else {
        switch (((m = g / (d < 0.5 ? c + s : 2 - c - s)), c)) {
          case n:
            h = (i - r) / g + (i < r ? 6 : 0);
            break;
          case i:
            h = (r - n) / g + 2;
            break;
          case r:
            h = (n - i) / g + 4;
            break;
        }
        h /= 6;
      }
      return new eh(
        $e(h * 360, 2),
        $e(m * 100, 2),
        $e(d * 100, 2),
        $e(this.alpha, 2),
      );
    }
    clone() {
      return new lc(this.red, this.green, this.blue, this.alpha);
    }
    getChannelFormatOptions(n) {
      switch (n) {
        case "red":
        case "green":
        case "blue":
          return { style: "decimal" };
        case "alpha":
          return { style: "percent" };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    formatChannelValue(n, i) {
      let r = this.getChannelFormatOptions(n),
        s = this.getChannelValue(n);
      return new Intl.NumberFormat(i, r).format(s);
    }
    getChannelRange(n) {
      switch (n) {
        case "red":
        case "green":
        case "blue":
          return { minValue: 0, maxValue: 255, step: 1, pageSize: 17 };
        case "alpha":
          return { minValue: 0, maxValue: 1, step: 0.01, pageSize: 0.1 };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    toJSON() {
      return { r: this.red, g: this.green, b: this.blue, a: this.alpha };
    }
    getFormat() {
      return "rgba";
    }
    getChannels() {
      return lc.colorChannels;
    }
  };
Qg(E1, "colorChannels", ["red", "green", "blue"]);
var Jg = E1,
  e2 =
    /hsl\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%)\)|hsla\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d(.\d+)?)\)/,
  O1 = class sc extends Zg {
    constructor(n, i, r, s) {
      super(),
        (this.hue = n),
        (this.saturation = i),
        (this.lightness = r),
        (this.alpha = s);
    }
    static parse(n) {
      let i;
      if ((i = n.match(e2))) {
        const [r, s, c, d] = (i[1] ?? i[2])
          .split(",")
          .map((g) => Number(g.trim().replace("%", "")));
        return new sc(
          Kx(r, 360),
          Lt(s, 0, 100),
          Lt(c, 0, 100),
          Lt(d ?? 1, 0, 1),
        );
      }
    }
    toString(n) {
      switch (n) {
        case "hex":
          return this.toRGB().toString("hex");
        case "hexa":
          return this.toRGB().toString("hexa");
        case "hsl":
          return `hsl(${this.hue}, ${$e(this.saturation, 2)}%, ${$e(this.lightness, 2)}%)`;
        case "css":
        case "hsla":
          return `hsla(${this.hue}, ${$e(this.saturation, 2)}%, ${$e(this.lightness, 2)}%, ${this.alpha})`;
        case "hsb":
          return this.toHSB().toString("hsb");
        case "rgb":
          return this.toRGB().toString("rgb");
        default:
          return this.toFormat(n).toString(n);
      }
    }
    toFormat(n) {
      switch (n) {
        case "hsla":
          return this;
        case "hsba":
          return this.toHSB();
        case "rgba":
          return this.toRGB();
        default:
          throw new Error("Unsupported color conversion: hsl -> " + n);
      }
    }
    toHSB() {
      let n = this.saturation / 100,
        i = this.lightness / 100,
        r = i + n * Math.min(i, 1 - i);
      return (
        (n = r === 0 ? 0 : 2 * (1 - i / r)),
        new th(
          $e(this.hue, 2),
          $e(n * 100, 2),
          $e(r * 100, 2),
          $e(this.alpha, 2),
        )
      );
    }
    toRGB() {
      let n = this.hue,
        i = this.saturation / 100,
        r = this.lightness / 100,
        s = i * Math.min(r, 1 - r),
        c = (d, g = (d + n / 30) % 12) =>
          r - s * Math.max(Math.min(g - 3, 9 - g, 1), -1);
      return new Jg(
        Math.round(c(0) * 255),
        Math.round(c(8) * 255),
        Math.round(c(4) * 255),
        $e(this.alpha, 2),
      );
    }
    clone() {
      return new sc(this.hue, this.saturation, this.lightness, this.alpha);
    }
    getChannelFormatOptions(n) {
      switch (n) {
        case "hue":
          return { style: "unit", unit: "degree", unitDisplay: "narrow" };
        case "saturation":
        case "lightness":
        case "alpha":
          return { style: "percent" };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    formatChannelValue(n, i) {
      let r = this.getChannelFormatOptions(n),
        s = this.getChannelValue(n);
      return (
        (n === "saturation" || n === "lightness") && (s /= 100),
        new Intl.NumberFormat(i, r).format(s)
      );
    }
    getChannelRange(n) {
      switch (n) {
        case "hue":
          return { minValue: 0, maxValue: 360, step: 1, pageSize: 15 };
        case "saturation":
        case "lightness":
          return { minValue: 0, maxValue: 100, step: 1, pageSize: 10 };
        case "alpha":
          return { minValue: 0, maxValue: 1, step: 0.01, pageSize: 0.1 };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    toJSON() {
      return {
        h: this.hue,
        s: this.saturation,
        l: this.lightness,
        a: this.alpha,
      };
    }
    getFormat() {
      return "hsla";
    }
    getChannels() {
      return sc.colorChannels;
    }
  };
Qg(O1, "colorChannels", ["hue", "saturation", "lightness"]);
var eh = O1,
  t2 =
    /hsb\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%)\)|hsba\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d(.\d+)?)\)/,
  w1 = class cc extends Zg {
    constructor(n, i, r, s) {
      super(),
        (this.hue = n),
        (this.saturation = i),
        (this.brightness = r),
        (this.alpha = s);
    }
    static parse(n) {
      let i;
      if ((i = n.match(t2))) {
        const [r, s, c, d] = (i[1] ?? i[2])
          .split(",")
          .map((g) => Number(g.trim().replace("%", "")));
        return new cc(
          Kx(r, 360),
          Lt(s, 0, 100),
          Lt(c, 0, 100),
          Lt(d ?? 1, 0, 1),
        );
      }
    }
    toString(n) {
      switch (n) {
        case "css":
          return this.toHSL().toString("css");
        case "hex":
          return this.toRGB().toString("hex");
        case "hexa":
          return this.toRGB().toString("hexa");
        case "hsb":
          return `hsb(${this.hue}, ${$e(this.saturation, 2)}%, ${$e(this.brightness, 2)}%)`;
        case "hsba":
          return `hsba(${this.hue}, ${$e(this.saturation, 2)}%, ${$e(this.brightness, 2)}%, ${this.alpha})`;
        case "hsl":
          return this.toHSL().toString("hsl");
        case "rgb":
          return this.toRGB().toString("rgb");
        default:
          return this.toFormat(n).toString(n);
      }
    }
    toFormat(n) {
      switch (n) {
        case "hsba":
          return this;
        case "hsla":
          return this.toHSL();
        case "rgba":
          return this.toRGB();
        default:
          throw new Error("Unsupported color conversion: hsb -> " + n);
      }
    }
    toHSL() {
      let n = this.saturation / 100,
        i = this.brightness / 100,
        r = i * (1 - n / 2);
      return (
        (n = r === 0 || r === 1 ? 0 : (i - r) / Math.min(r, 1 - r)),
        new eh(
          $e(this.hue, 2),
          $e(n * 100, 2),
          $e(r * 100, 2),
          $e(this.alpha, 2),
        )
      );
    }
    toRGB() {
      let n = this.hue,
        i = this.saturation / 100,
        r = this.brightness / 100,
        s = (c, d = (c + n / 60) % 6) =>
          r - i * r * Math.max(Math.min(d, 4 - d, 1), 0);
      return new Jg(
        Math.round(s(5) * 255),
        Math.round(s(3) * 255),
        Math.round(s(1) * 255),
        $e(this.alpha, 2),
      );
    }
    clone() {
      return new cc(this.hue, this.saturation, this.brightness, this.alpha);
    }
    getChannelFormatOptions(n) {
      switch (n) {
        case "hue":
          return { style: "unit", unit: "degree", unitDisplay: "narrow" };
        case "saturation":
        case "brightness":
        case "alpha":
          return { style: "percent" };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    formatChannelValue(n, i) {
      let r = this.getChannelFormatOptions(n),
        s = this.getChannelValue(n);
      return (
        (n === "saturation" || n === "brightness") && (s /= 100),
        new Intl.NumberFormat(i, r).format(s)
      );
    }
    getChannelRange(n) {
      switch (n) {
        case "hue":
          return { minValue: 0, maxValue: 360, step: 1, pageSize: 15 };
        case "saturation":
        case "brightness":
          return { minValue: 0, maxValue: 100, step: 1, pageSize: 10 };
        case "alpha":
          return { minValue: 0, maxValue: 1, step: 0.01, pageSize: 0.1 };
        default:
          throw new Error("Unknown color channel: " + n);
      }
    }
    toJSON() {
      return {
        h: this.hue,
        s: this.saturation,
        b: this.brightness,
        a: this.alpha,
      };
    }
    getFormat() {
      return "hsba";
    }
    getChannels() {
      return cc.colorChannels;
    }
  };
Qg(w1, "colorChannels", ["hue", "saturation", "brightness"]);
var th = w1,
  n2 =
    "aliceblue:f0f8ff,antiquewhite:faebd7,aqua:00ffff,aquamarine:7fffd4,azure:f0ffff,beige:f5f5dc,bisque:ffe4c4,black:000000,blanchedalmond:ffebcd,blue:0000ff,blueviolet:8a2be2,brown:a52a2a,burlywood:deb887,cadetblue:5f9ea0,chartreuse:7fff00,chocolate:d2691e,coral:ff7f50,cornflowerblue:6495ed,cornsilk:fff8dc,crimson:dc143c,cyan:00ffff,darkblue:00008b,darkcyan:008b8b,darkgoldenrod:b8860b,darkgray:a9a9a9,darkgreen:006400,darkkhaki:bdb76b,darkmagenta:8b008b,darkolivegreen:556b2f,darkorange:ff8c00,darkorchid:9932cc,darkred:8b0000,darksalmon:e9967a,darkseagreen:8fbc8f,darkslateblue:483d8b,darkslategray:2f4f4f,darkturquoise:00ced1,darkviolet:9400d3,deeppink:ff1493,deepskyblue:00bfff,dimgray:696969,dodgerblue:1e90ff,firebrick:b22222,floralwhite:fffaf0,forestgreen:228b22,fuchsia:ff00ff,gainsboro:dcdcdc,ghostwhite:f8f8ff,gold:ffd700,goldenrod:daa520,gray:808080,green:008000,greenyellow:adff2f,honeydew:f0fff0,hotpink:ff69b4,indianred:cd5c5c,indigo:4b0082,ivory:fffff0,khaki:f0e68c,lavender:e6e6fa,lavenderblush:fff0f5,lawngreen:7cfc00,lemonchiffon:fffacd,lightblue:add8e6,lightcoral:f08080,lightcyan:e0ffff,lightgoldenrodyellow:fafad2,lightgrey:d3d3d3,lightgreen:90ee90,lightpink:ffb6c1,lightsalmon:ffa07a,lightseagreen:20b2aa,lightskyblue:87cefa,lightslategray:778899,lightsteelblue:b0c4de,lightyellow:ffffe0,lime:00ff00,limegreen:32cd32,linen:faf0e6,magenta:ff00ff,maroon:800000,mediumaquamarine:66cdaa,mediumblue:0000cd,mediumorchid:ba55d3,mediumpurple:9370d8,mediumseagreen:3cb371,mediumslateblue:7b68ee,mediumspringgreen:00fa9a,mediumturquoise:48d1cc,mediumvioletred:c71585,midnightblue:191970,mintcream:f5fffa,mistyrose:ffe4e1,moccasin:ffe4b5,navajowhite:ffdead,navy:000080,oldlace:fdf5e6,olive:808000,olivedrab:6b8e23,orange:ffa500,orangered:ff4500,orchid:da70d6,palegoldenrod:eee8aa,palegreen:98fb98,paleturquoise:afeeee,palevioletred:d87093,papayawhip:ffefd5,peachpuff:ffdab9,peru:cd853f,pink:ffc0cb,plum:dda0dd,powderblue:b0e0e6,purple:800080,rebeccapurple:663399,red:ff0000,rosybrown:bc8f8f,royalblue:4169e1,saddlebrown:8b4513,salmon:fa8072,sandybrown:f4a460,seagreen:2e8b57,seashell:fff5ee,sienna:a0522d,silver:c0c0c0,skyblue:87ceeb,slateblue:6a5acd,slategray:708090,snow:fffafa,springgreen:00ff7f,steelblue:4682b4,tan:d2b48c,teal:008080,thistle:d8bfd8,tomato:ff6347,turquoise:40e0d0,violet:ee82ee,wheat:f5deb3,white:ffffff,whitesmoke:f5f5f5,yellow:ffff00,yellowgreen:9acd32",
  a2 = (e) => {
    const n = new Map(),
      i = e.split(",");
    for (let r = 0; r < i.length; r++) {
      const [s, c] = i[r].split(":");
      n.set(s, `#${c}`),
        s.includes("gray") && n.set(s.replace("gray", "grey"), `#${c}`);
    }
    return n;
  },
  Kb = a2(n2),
  Ac = (e) => {
    var i;
    if (Kb.has(e)) return Ac(Kb.get(e));
    const n = Jg.parse(e) || th.parse(e) || eh.parse(e);
    if (!n) {
      const r = new Error("Invalid color value: " + e);
      throw ((i = Error.captureStackTrace) == null || i.call(Error, r, Ac), r);
    }
    return n;
  };
const i2 = ["top", "right", "bottom", "left"],
  Ua = Math.min,
  Qt = Math.max,
  zc = Math.round,
  $s = Math.floor,
  Dn = (e) => ({ x: e, y: e }),
  r2 = { left: "right", right: "left", bottom: "top", top: "bottom" },
  o2 = { start: "end", end: "start" };
function sg(e, n, i) {
  return Qt(e, Ua(n, i));
}
function ca(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function ua(e) {
  return e.split("-")[0];
}
function Rr(e) {
  return e.split("-")[1];
}
function nh(e) {
  return e === "x" ? "y" : "x";
}
function ah(e) {
  return e === "y" ? "height" : "width";
}
function Pn(e) {
  return ["top", "bottom"].includes(ua(e)) ? "y" : "x";
}
function ih(e) {
  return nh(Pn(e));
}
function l2(e, n, i) {
  i === void 0 && (i = !1);
  const r = Rr(e),
    s = ih(e),
    c = ah(s);
  let d =
    s === "x"
      ? r === (i ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
        ? "bottom"
        : "top";
  return n.reference[c] > n.floating[c] && (d = _c(d)), [d, _c(d)];
}
function s2(e) {
  const n = _c(e);
  return [cg(e), n, cg(n)];
}
function cg(e) {
  return e.replace(/start|end/g, (n) => o2[n]);
}
function c2(e, n, i) {
  const r = ["left", "right"],
    s = ["right", "left"],
    c = ["top", "bottom"],
    d = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return i ? (n ? s : r) : n ? r : s;
    case "left":
    case "right":
      return n ? c : d;
    default:
      return [];
  }
}
function u2(e, n, i, r) {
  const s = Rr(e);
  let c = c2(ua(e), i === "start", r);
  return (
    s && ((c = c.map((d) => d + "-" + s)), n && (c = c.concat(c.map(cg)))), c
  );
}
function _c(e) {
  return e.replace(/left|right|bottom|top/g, (n) => r2[n]);
}
function d2(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function k1(e) {
  return typeof e != "number"
    ? d2(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Nc(e) {
  const { x: n, y: i, width: r, height: s } = e;
  return {
    width: r,
    height: s,
    top: i,
    left: n,
    right: n + r,
    bottom: i + s,
    x: n,
    y: i,
  };
}
function Qb(e, n, i) {
  let { reference: r, floating: s } = e;
  const c = Pn(n),
    d = ih(n),
    g = ah(d),
    h = ua(n),
    m = c === "y",
    p = r.x + r.width / 2 - s.width / 2,
    y = r.y + r.height / 2 - s.height / 2,
    b = r[g] / 2 - s[g] / 2;
  let x;
  switch (h) {
    case "top":
      x = { x: p, y: r.y - s.height };
      break;
    case "bottom":
      x = { x: p, y: r.y + r.height };
      break;
    case "right":
      x = { x: r.x + r.width, y };
      break;
    case "left":
      x = { x: r.x - s.width, y };
      break;
    default:
      x = { x: r.x, y: r.y };
  }
  switch (Rr(n)) {
    case "start":
      x[d] -= b * (i && m ? -1 : 1);
      break;
    case "end":
      x[d] += b * (i && m ? -1 : 1);
      break;
  }
  return x;
}
const f2 = async (e, n, i) => {
  const {
      placement: r = "bottom",
      strategy: s = "absolute",
      middleware: c = [],
      platform: d,
    } = i,
    g = c.filter(Boolean),
    h = await (d.isRTL == null ? void 0 : d.isRTL(n));
  let m = await d.getElementRects({ reference: e, floating: n, strategy: s }),
    { x: p, y } = Qb(m, r, h),
    b = r,
    x = {},
    C = 0;
  for (let E = 0; E < g.length; E++) {
    const { name: R, fn: O } = g[E],
      {
        x: A,
        y: z,
        data: B,
        reset: _,
      } = await O({
        x: p,
        y,
        initialPlacement: r,
        placement: b,
        strategy: s,
        middlewareData: x,
        rects: m,
        platform: d,
        elements: { reference: e, floating: n },
      });
    (p = A ?? p),
      (y = z ?? y),
      (x = { ...x, [R]: { ...x[R], ...B } }),
      _ &&
        C <= 50 &&
        (C++,
        typeof _ == "object" &&
          (_.placement && (b = _.placement),
          _.rects &&
            (m =
              _.rects === !0
                ? await d.getElementRects({
                    reference: e,
                    floating: n,
                    strategy: s,
                  })
                : _.rects),
          ({ x: p, y } = Qb(m, b, h))),
        (E = -1));
  }
  return { x: p, y, placement: b, strategy: s, middlewareData: x };
};
async function il(e, n) {
  var i;
  n === void 0 && (n = {});
  const { x: r, y: s, platform: c, rects: d, elements: g, strategy: h } = e,
    {
      boundary: m = "clippingAncestors",
      rootBoundary: p = "viewport",
      elementContext: y = "floating",
      altBoundary: b = !1,
      padding: x = 0,
    } = ca(n, e),
    C = k1(x),
    R = g[b ? (y === "floating" ? "reference" : "floating") : y],
    O = Nc(
      await c.getClippingRect({
        element:
          (i = await (c.isElement == null ? void 0 : c.isElement(R))) == null ||
          i
            ? R
            : R.contextElement ||
              (await (c.getDocumentElement == null
                ? void 0
                : c.getDocumentElement(g.floating))),
        boundary: m,
        rootBoundary: p,
        strategy: h,
      }),
    ),
    A =
      y === "floating"
        ? { x: r, y: s, width: d.floating.width, height: d.floating.height }
        : d.reference,
    z = await (c.getOffsetParent == null
      ? void 0
      : c.getOffsetParent(g.floating)),
    B = (await (c.isElement == null ? void 0 : c.isElement(z)))
      ? (await (c.getScale == null ? void 0 : c.getScale(z))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    _ = Nc(
      c.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: g,
            rect: A,
            offsetParent: z,
            strategy: h,
          })
        : A,
    );
  return {
    top: (O.top - _.top + C.top) / B.y,
    bottom: (_.bottom - O.bottom + C.bottom) / B.y,
    left: (O.left - _.left + C.left) / B.x,
    right: (_.right - O.right + C.right) / B.x,
  };
}
const g2 = (e) => ({
    name: "arrow",
    options: e,
    async fn(n) {
      const {
          x: i,
          y: r,
          placement: s,
          rects: c,
          platform: d,
          elements: g,
          middlewareData: h,
        } = n,
        { element: m, padding: p = 0 } = ca(e, n) || {};
      if (m == null) return {};
      const y = k1(p),
        b = { x: i, y: r },
        x = ih(s),
        C = ah(x),
        E = await d.getDimensions(m),
        R = x === "y",
        O = R ? "top" : "left",
        A = R ? "bottom" : "right",
        z = R ? "clientHeight" : "clientWidth",
        B = c.reference[C] + c.reference[x] - b[x] - c.floating[C],
        _ = b[x] - c.reference[x],
        Y = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(m));
      let $ = Y ? Y[z] : 0;
      (!$ || !(await (d.isElement == null ? void 0 : d.isElement(Y)))) &&
        ($ = g.floating[z] || c.floating[C]);
      const j = B / 2 - _ / 2,
        U = $ / 2 - E[C] / 2 - 1,
        K = Ua(y[O], U),
        re = Ua(y[A], U),
        ne = K,
        pe = $ - E[C] - re,
        he = $ / 2 - E[C] / 2 + j,
        J = sg(ne, he, pe),
        I =
          !h.arrow &&
          Rr(s) != null &&
          he !== J &&
          c.reference[C] / 2 - (he < ne ? K : re) - E[C] / 2 < 0,
        F = I ? (he < ne ? he - ne : he - pe) : 0;
      return {
        [x]: b[x] + F,
        data: {
          [x]: J,
          centerOffset: he - J - F,
          ...(I && { alignmentOffset: F }),
        },
        reset: I,
      };
    },
  }),
  h2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(n) {
          var i, r;
          const {
              placement: s,
              middlewareData: c,
              rects: d,
              initialPlacement: g,
              platform: h,
              elements: m,
            } = n,
            {
              mainAxis: p = !0,
              crossAxis: y = !0,
              fallbackPlacements: b,
              fallbackStrategy: x = "bestFit",
              fallbackAxisSideDirection: C = "none",
              flipAlignment: E = !0,
              ...R
            } = ca(e, n);
          if ((i = c.arrow) != null && i.alignmentOffset) return {};
          const O = ua(s),
            A = Pn(g),
            z = ua(g) === g,
            B = await (h.isRTL == null ? void 0 : h.isRTL(m.floating)),
            _ = b || (z || !E ? [_c(g)] : s2(g)),
            Y = C !== "none";
          !b && Y && _.push(...u2(g, E, C, B));
          const $ = [g, ..._],
            j = await il(n, R),
            U = [];
          let K = ((r = c.flip) == null ? void 0 : r.overflows) || [];
          if ((p && U.push(j[O]), y)) {
            const he = l2(s, d, B);
            U.push(j[he[0]], j[he[1]]);
          }
          if (
            ((K = [...K, { placement: s, overflows: U }]),
            !U.every((he) => he <= 0))
          ) {
            var re, ne;
            const he = (((re = c.flip) == null ? void 0 : re.index) || 0) + 1,
              J = $[he];
            if (
              J &&
              (!(y === "alignment" ? A !== Pn(J) : !1) ||
                K.every((W) => W.overflows[0] > 0 && Pn(W.placement) === A))
            )
              return {
                data: { index: he, overflows: K },
                reset: { placement: J },
              };
            let I =
              (ne = K.filter((F) => F.overflows[0] <= 0).sort(
                (F, W) => F.overflows[1] - W.overflows[1],
              )[0]) == null
                ? void 0
                : ne.placement;
            if (!I)
              switch (x) {
                case "bestFit": {
                  var pe;
                  const F =
                    (pe = K.filter((W) => {
                      if (Y) {
                        const ie = Pn(W.placement);
                        return ie === A || ie === "y";
                      }
                      return !0;
                    })
                      .map((W) => [
                        W.placement,
                        W.overflows
                          .filter((ie) => ie > 0)
                          .reduce((ie, w) => ie + w, 0),
                      ])
                      .sort((W, ie) => W[1] - ie[1])[0]) == null
                      ? void 0
                      : pe[0];
                  F && (I = F);
                  break;
                }
                case "initialPlacement":
                  I = g;
                  break;
              }
            if (s !== I) return { reset: { placement: I } };
          }
          return {};
        },
      }
    );
  };
function Zb(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width,
  };
}
function Jb(e) {
  return i2.some((n) => e[n] >= 0);
}
const m2 = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "hide",
      options: e,
      async fn(n) {
        const { rects: i } = n,
          { strategy: r = "referenceHidden", ...s } = ca(e, n);
        switch (r) {
          case "referenceHidden": {
            const c = await il(n, { ...s, elementContext: "reference" }),
              d = Zb(c, i.reference);
            return {
              data: { referenceHiddenOffsets: d, referenceHidden: Jb(d) },
            };
          }
          case "escaped": {
            const c = await il(n, { ...s, altBoundary: !0 }),
              d = Zb(c, i.floating);
            return { data: { escapedOffsets: d, escaped: Jb(d) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
async function p2(e, n) {
  const { placement: i, platform: r, elements: s } = e,
    c = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)),
    d = ua(i),
    g = Rr(i),
    h = Pn(i) === "y",
    m = ["left", "top"].includes(d) ? -1 : 1,
    p = c && h ? -1 : 1,
    y = ca(n, e);
  let {
    mainAxis: b,
    crossAxis: x,
    alignmentAxis: C,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    g && typeof C == "number" && (x = g === "end" ? C * -1 : C),
    h ? { x: x * p, y: b * m } : { x: b * m, y: x * p }
  );
}
const v2 = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(n) {
          var i, r;
          const { x: s, y: c, placement: d, middlewareData: g } = n,
            h = await p2(n, e);
          return d === ((i = g.offset) == null ? void 0 : i.placement) &&
            (r = g.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: s + h.x, y: c + h.y, data: { ...h, placement: d } };
        },
      }
    );
  },
  b2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(n) {
          const { x: i, y: r, placement: s } = n,
            {
              mainAxis: c = !0,
              crossAxis: d = !1,
              limiter: g = {
                fn: (R) => {
                  let { x: O, y: A } = R;
                  return { x: O, y: A };
                },
              },
              ...h
            } = ca(e, n),
            m = { x: i, y: r },
            p = await il(n, h),
            y = Pn(ua(s)),
            b = nh(y);
          let x = m[b],
            C = m[y];
          if (c) {
            const R = b === "y" ? "top" : "left",
              O = b === "y" ? "bottom" : "right",
              A = x + p[R],
              z = x - p[O];
            x = sg(A, x, z);
          }
          if (d) {
            const R = y === "y" ? "top" : "left",
              O = y === "y" ? "bottom" : "right",
              A = C + p[R],
              z = C - p[O];
            C = sg(A, C, z);
          }
          const E = g.fn({ ...n, [b]: x, [y]: C });
          return {
            ...E,
            data: { x: E.x - i, y: E.y - r, enabled: { [b]: c, [y]: d } },
          };
        },
      }
    );
  },
  y2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(n) {
          const { x: i, y: r, placement: s, rects: c, middlewareData: d } = n,
            { offset: g = 0, mainAxis: h = !0, crossAxis: m = !0 } = ca(e, n),
            p = { x: i, y: r },
            y = Pn(s),
            b = nh(y);
          let x = p[b],
            C = p[y];
          const E = ca(g, n),
            R =
              typeof E == "number"
                ? { mainAxis: E, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...E };
          if (h) {
            const z = b === "y" ? "height" : "width",
              B = c.reference[b] - c.floating[z] + R.mainAxis,
              _ = c.reference[b] + c.reference[z] - R.mainAxis;
            x < B ? (x = B) : x > _ && (x = _);
          }
          if (m) {
            var O, A;
            const z = b === "y" ? "width" : "height",
              B = ["top", "left"].includes(ua(s)),
              _ =
                c.reference[y] -
                c.floating[z] +
                ((B && ((O = d.offset) == null ? void 0 : O[y])) || 0) +
                (B ? 0 : R.crossAxis),
              Y =
                c.reference[y] +
                c.reference[z] +
                (B ? 0 : ((A = d.offset) == null ? void 0 : A[y]) || 0) -
                (B ? R.crossAxis : 0);
            C < _ ? (C = _) : C > Y && (C = Y);
          }
          return { [b]: x, [y]: C };
        },
      }
    );
  },
  x2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(n) {
          var i, r;
          const { placement: s, rects: c, platform: d, elements: g } = n,
            { apply: h = () => {}, ...m } = ca(e, n),
            p = await il(n, m),
            y = ua(s),
            b = Rr(s),
            x = Pn(s) === "y",
            { width: C, height: E } = c.floating;
          let R, O;
          y === "top" || y === "bottom"
            ? ((R = y),
              (O =
                b ===
                ((await (d.isRTL == null ? void 0 : d.isRTL(g.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((O = y), (R = b === "end" ? "top" : "bottom"));
          const A = E - p.top - p.bottom,
            z = C - p.left - p.right,
            B = Ua(E - p[R], A),
            _ = Ua(C - p[O], z),
            Y = !n.middlewareData.shift;
          let $ = B,
            j = _;
          if (
            ((i = n.middlewareData.shift) != null && i.enabled.x && (j = z),
            (r = n.middlewareData.shift) != null && r.enabled.y && ($ = A),
            Y && !b)
          ) {
            const K = Qt(p.left, 0),
              re = Qt(p.right, 0),
              ne = Qt(p.top, 0),
              pe = Qt(p.bottom, 0);
            x
              ? (j =
                  C - 2 * (K !== 0 || re !== 0 ? K + re : Qt(p.left, p.right)))
              : ($ =
                  E -
                  2 * (ne !== 0 || pe !== 0 ? ne + pe : Qt(p.top, p.bottom)));
          }
          await h({ ...n, availableWidth: j, availableHeight: $ });
          const U = await d.getDimensions(g.floating);
          return C !== U.width || E !== U.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function au() {
  return typeof window < "u";
}
function Tr(e) {
  return R1(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function en(e) {
  var n;
  return (
    (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) ||
    window
  );
}
function Bn(e) {
  var n;
  return (n = (R1(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : n.documentElement;
}
function R1(e) {
  return au() ? e instanceof Node || e instanceof en(e).Node : !1;
}
function Cn(e) {
  return au() ? e instanceof Element || e instanceof en(e).Element : !1;
}
function Ln(e) {
  return au() ? e instanceof HTMLElement || e instanceof en(e).HTMLElement : !1;
}
function ey(e) {
  return !au() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof en(e).ShadowRoot;
}
function fl(e) {
  const { overflow: n, overflowX: i, overflowY: r, display: s } = En(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(n + r + i) &&
    !["inline", "contents"].includes(s)
  );
}
function S2(e) {
  return ["table", "td", "th"].includes(Tr(e));
}
function iu(e) {
  return [":popover-open", ":modal"].some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
function rh(e) {
  const n = oh(),
    i = Cn(e) ? En(e) : e;
  return (
    ["transform", "translate", "scale", "rotate", "perspective"].some((r) =>
      i[r] ? i[r] !== "none" : !1,
    ) ||
    (i.containerType ? i.containerType !== "normal" : !1) ||
    (!n && (i.backdropFilter ? i.backdropFilter !== "none" : !1)) ||
    (!n && (i.filter ? i.filter !== "none" : !1)) ||
    ["transform", "translate", "scale", "rotate", "perspective", "filter"].some(
      (r) => (i.willChange || "").includes(r),
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (i.contain || "").includes(r),
    )
  );
}
function C2(e) {
  let n = $a(e);
  for (; Ln(n) && !Or(n); ) {
    if (rh(n)) return n;
    if (iu(n)) return null;
    n = $a(n);
  }
  return null;
}
function oh() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Or(e) {
  return ["html", "body", "#document"].includes(Tr(e));
}
function En(e) {
  return en(e).getComputedStyle(e);
}
function ru(e) {
  return Cn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function $a(e) {
  if (Tr(e) === "html") return e;
  const n = e.assignedSlot || e.parentNode || (ey(e) && e.host) || Bn(e);
  return ey(n) ? n.host : n;
}
function T1(e) {
  const n = $a(e);
  return Or(n)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Ln(n) && fl(n)
      ? n
      : T1(n);
}
function rl(e, n, i) {
  var r;
  n === void 0 && (n = []), i === void 0 && (i = !0);
  const s = T1(e),
    c = s === ((r = e.ownerDocument) == null ? void 0 : r.body),
    d = en(s);
  if (c) {
    const g = ug(d);
    return n.concat(
      d,
      d.visualViewport || [],
      fl(s) ? s : [],
      g && i ? rl(g) : [],
    );
  }
  return n.concat(s, rl(s, [], i));
}
function ug(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function A1(e) {
  const n = En(e);
  let i = parseFloat(n.width) || 0,
    r = parseFloat(n.height) || 0;
  const s = Ln(e),
    c = s ? e.offsetWidth : i,
    d = s ? e.offsetHeight : r,
    g = zc(i) !== c || zc(r) !== d;
  return g && ((i = c), (r = d)), { width: i, height: r, $: g };
}
function lh(e) {
  return Cn(e) ? e : e.contextElement;
}
function Sr(e) {
  const n = lh(e);
  if (!Ln(n)) return Dn(1);
  const i = n.getBoundingClientRect(),
    { width: r, height: s, $: c } = A1(n);
  let d = (c ? zc(i.width) : i.width) / r,
    g = (c ? zc(i.height) : i.height) / s;
  return (
    (!d || !Number.isFinite(d)) && (d = 1),
    (!g || !Number.isFinite(g)) && (g = 1),
    { x: d, y: g }
  );
}
const E2 = Dn(0);
function z1(e) {
  const n = en(e);
  return !oh() || !n.visualViewport
    ? E2
    : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function O2(e, n, i) {
  return n === void 0 && (n = !1), !i || (n && i !== en(e)) ? !1 : n;
}
function bi(e, n, i, r) {
  n === void 0 && (n = !1), i === void 0 && (i = !1);
  const s = e.getBoundingClientRect(),
    c = lh(e);
  let d = Dn(1);
  n && (r ? Cn(r) && (d = Sr(r)) : (d = Sr(e)));
  const g = O2(c, i, r) ? z1(c) : Dn(0);
  let h = (s.left + g.x) / d.x,
    m = (s.top + g.y) / d.y,
    p = s.width / d.x,
    y = s.height / d.y;
  if (c) {
    const b = en(c),
      x = r && Cn(r) ? en(r) : r;
    let C = b,
      E = ug(C);
    for (; E && r && x !== C; ) {
      const R = Sr(E),
        O = E.getBoundingClientRect(),
        A = En(E),
        z = O.left + (E.clientLeft + parseFloat(A.paddingLeft)) * R.x,
        B = O.top + (E.clientTop + parseFloat(A.paddingTop)) * R.y;
      (h *= R.x),
        (m *= R.y),
        (p *= R.x),
        (y *= R.y),
        (h += z),
        (m += B),
        (C = en(E)),
        (E = ug(C));
    }
  }
  return Nc({ width: p, height: y, x: h, y: m });
}
function sh(e, n) {
  const i = ru(e).scrollLeft;
  return n ? n.left + i : bi(Bn(e)).left + i;
}
function _1(e, n, i) {
  i === void 0 && (i = !1);
  const r = e.getBoundingClientRect(),
    s = r.left + n.scrollLeft - (i ? 0 : sh(e, r)),
    c = r.top + n.scrollTop;
  return { x: s, y: c };
}
function w2(e) {
  let { elements: n, rect: i, offsetParent: r, strategy: s } = e;
  const c = s === "fixed",
    d = Bn(r),
    g = n ? iu(n.floating) : !1;
  if (r === d || (g && c)) return i;
  let h = { scrollLeft: 0, scrollTop: 0 },
    m = Dn(1);
  const p = Dn(0),
    y = Ln(r);
  if (
    (y || (!y && !c)) &&
    ((Tr(r) !== "body" || fl(d)) && (h = ru(r)), Ln(r))
  ) {
    const x = bi(r);
    (m = Sr(r)), (p.x = x.x + r.clientLeft), (p.y = x.y + r.clientTop);
  }
  const b = d && !y && !c ? _1(d, h, !0) : Dn(0);
  return {
    width: i.width * m.x,
    height: i.height * m.y,
    x: i.x * m.x - h.scrollLeft * m.x + p.x + b.x,
    y: i.y * m.y - h.scrollTop * m.y + p.y + b.y,
  };
}
function k2(e) {
  return Array.from(e.getClientRects());
}
function R2(e) {
  const n = Bn(e),
    i = ru(e),
    r = e.ownerDocument.body,
    s = Qt(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth),
    c = Qt(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let d = -i.scrollLeft + sh(e);
  const g = -i.scrollTop;
  return (
    En(r).direction === "rtl" && (d += Qt(n.clientWidth, r.clientWidth) - s),
    { width: s, height: c, x: d, y: g }
  );
}
function T2(e, n) {
  const i = en(e),
    r = Bn(e),
    s = i.visualViewport;
  let c = r.clientWidth,
    d = r.clientHeight,
    g = 0,
    h = 0;
  if (s) {
    (c = s.width), (d = s.height);
    const m = oh();
    (!m || (m && n === "fixed")) && ((g = s.offsetLeft), (h = s.offsetTop));
  }
  return { width: c, height: d, x: g, y: h };
}
function A2(e, n) {
  const i = bi(e, !0, n === "fixed"),
    r = i.top + e.clientTop,
    s = i.left + e.clientLeft,
    c = Ln(e) ? Sr(e) : Dn(1),
    d = e.clientWidth * c.x,
    g = e.clientHeight * c.y,
    h = s * c.x,
    m = r * c.y;
  return { width: d, height: g, x: h, y: m };
}
function ty(e, n, i) {
  let r;
  if (n === "viewport") r = T2(e, i);
  else if (n === "document") r = R2(Bn(e));
  else if (Cn(n)) r = A2(n, i);
  else {
    const s = z1(e);
    r = { x: n.x - s.x, y: n.y - s.y, width: n.width, height: n.height };
  }
  return Nc(r);
}
function N1(e, n) {
  const i = $a(e);
  return i === n || !Cn(i) || Or(i)
    ? !1
    : En(i).position === "fixed" || N1(i, n);
}
function z2(e, n) {
  const i = n.get(e);
  if (i) return i;
  let r = rl(e, [], !1).filter((g) => Cn(g) && Tr(g) !== "body"),
    s = null;
  const c = En(e).position === "fixed";
  let d = c ? $a(e) : e;
  for (; Cn(d) && !Or(d); ) {
    const g = En(d),
      h = rh(d);
    !h && g.position === "fixed" && (s = null),
      (
        c
          ? !h && !s
          : (!h &&
              g.position === "static" &&
              !!s &&
              ["absolute", "fixed"].includes(s.position)) ||
            (fl(d) && !h && N1(e, d))
      )
        ? (r = r.filter((p) => p !== d))
        : (s = g),
      (d = $a(d));
  }
  return n.set(e, r), r;
}
function _2(e) {
  let { element: n, boundary: i, rootBoundary: r, strategy: s } = e;
  const d = [
      ...(i === "clippingAncestors"
        ? iu(n)
          ? []
          : z2(n, this._c)
        : [].concat(i)),
      r,
    ],
    g = d[0],
    h = d.reduce(
      (m, p) => {
        const y = ty(n, p, s);
        return (
          (m.top = Qt(y.top, m.top)),
          (m.right = Ua(y.right, m.right)),
          (m.bottom = Ua(y.bottom, m.bottom)),
          (m.left = Qt(y.left, m.left)),
          m
        );
      },
      ty(n, g, s),
    );
  return {
    width: h.right - h.left,
    height: h.bottom - h.top,
    x: h.left,
    y: h.top,
  };
}
function N2(e) {
  const { width: n, height: i } = A1(e);
  return { width: n, height: i };
}
function I2(e, n, i) {
  const r = Ln(n),
    s = Bn(n),
    c = i === "fixed",
    d = bi(e, !0, c, n);
  let g = { scrollLeft: 0, scrollTop: 0 };
  const h = Dn(0);
  function m() {
    h.x = sh(s);
  }
  if (r || (!r && !c))
    if (((Tr(n) !== "body" || fl(s)) && (g = ru(n)), r)) {
      const x = bi(n, !0, c, n);
      (h.x = x.x + n.clientLeft), (h.y = x.y + n.clientTop);
    } else s && m();
  c && !r && s && m();
  const p = s && !r && !c ? _1(s, g) : Dn(0),
    y = d.left + g.scrollLeft - h.x - p.x,
    b = d.top + g.scrollTop - h.y - p.y;
  return { x: y, y: b, width: d.width, height: d.height };
}
function $f(e) {
  return En(e).position === "static";
}
function ny(e, n) {
  if (!Ln(e) || En(e).position === "fixed") return null;
  if (n) return n(e);
  let i = e.offsetParent;
  return Bn(e) === i && (i = i.ownerDocument.body), i;
}
function I1(e, n) {
  const i = en(e);
  if (iu(e)) return i;
  if (!Ln(e)) {
    let s = $a(e);
    for (; s && !Or(s); ) {
      if (Cn(s) && !$f(s)) return s;
      s = $a(s);
    }
    return i;
  }
  let r = ny(e, n);
  for (; r && S2(r) && $f(r); ) r = ny(r, n);
  return r && Or(r) && $f(r) && !rh(r) ? i : r || C2(e) || i;
}
const P2 = async function (e) {
  const n = this.getOffsetParent || I1,
    i = this.getDimensions,
    r = await i(e.floating);
  return {
    reference: I2(e.reference, await n(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function V2(e) {
  return En(e).direction === "rtl";
}
const D2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: w2,
  getDocumentElement: Bn,
  getClippingRect: _2,
  getOffsetParent: I1,
  getElementRects: P2,
  getClientRects: k2,
  getDimensions: N2,
  getScale: Sr,
  isElement: Cn,
  isRTL: V2,
};
function P1(e, n) {
  return (
    e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height
  );
}
function M2(e, n) {
  let i = null,
    r;
  const s = Bn(e);
  function c() {
    var g;
    clearTimeout(r), (g = i) == null || g.disconnect(), (i = null);
  }
  function d(g, h) {
    g === void 0 && (g = !1), h === void 0 && (h = 1), c();
    const m = e.getBoundingClientRect(),
      { left: p, top: y, width: b, height: x } = m;
    if ((g || n(), !b || !x)) return;
    const C = $s(y),
      E = $s(s.clientWidth - (p + b)),
      R = $s(s.clientHeight - (y + x)),
      O = $s(p),
      z = {
        rootMargin: -C + "px " + -E + "px " + -R + "px " + -O + "px",
        threshold: Qt(0, Ua(1, h)) || 1,
      };
    let B = !0;
    function _(Y) {
      const $ = Y[0].intersectionRatio;
      if ($ !== h) {
        if (!B) return d();
        $
          ? d(!1, $)
          : (r = setTimeout(() => {
              d(!1, 1e-7);
            }, 1e3));
      }
      $ === 1 && !P1(m, e.getBoundingClientRect()) && d(), (B = !1);
    }
    try {
      i = new IntersectionObserver(_, { ...z, root: s.ownerDocument });
    } catch {
      i = new IntersectionObserver(_, z);
    }
    i.observe(e);
  }
  return d(!0), c;
}
function L2(e, n, i, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: c = !0,
      elementResize: d = typeof ResizeObserver == "function",
      layoutShift: g = typeof IntersectionObserver == "function",
      animationFrame: h = !1,
    } = r,
    m = lh(e),
    p = s || c ? [...(m ? rl(m) : []), ...rl(n)] : [];
  p.forEach((O) => {
    s && O.addEventListener("scroll", i, { passive: !0 }),
      c && O.addEventListener("resize", i);
  });
  const y = m && g ? M2(m, i) : null;
  let b = -1,
    x = null;
  d &&
    ((x = new ResizeObserver((O) => {
      let [A] = O;
      A &&
        A.target === m &&
        x &&
        (x.unobserve(n),
        cancelAnimationFrame(b),
        (b = requestAnimationFrame(() => {
          var z;
          (z = x) == null || z.observe(n);
        }))),
        i();
    })),
    m && !h && x.observe(m),
    x.observe(n));
  let C,
    E = h ? bi(e) : null;
  h && R();
  function R() {
    const O = bi(e);
    E && !P1(E, O) && i(), (E = O), (C = requestAnimationFrame(R));
  }
  return (
    i(),
    () => {
      var O;
      p.forEach((A) => {
        s && A.removeEventListener("scroll", i),
          c && A.removeEventListener("resize", i);
      }),
        y == null || y(),
        (O = x) == null || O.disconnect(),
        (x = null),
        h && cancelAnimationFrame(C);
    }
  );
}
const H2 = v2,
  B2 = b2,
  j2 = h2,
  U2 = x2,
  $2 = m2,
  F2 = g2,
  G2 = y2,
  W2 = (e, n, i) => {
    const r = new Map(),
      s = { platform: D2, ...i },
      c = { ...s.platform, _c: r };
    return f2(e, n, { ...s, platform: c });
  };
function ay(e = 0, n = 0, i = 0, r = 0) {
  if (typeof DOMRect == "function") return new DOMRect(e, n, i, r);
  const s = {
    x: e,
    y: n,
    width: i,
    height: r,
    top: n,
    right: e + i,
    bottom: n + r,
    left: e,
  };
  return { ...s, toJSON: () => s };
}
function q2(e) {
  if (!e) return ay();
  const { x: n, y: i, width: r, height: s } = e;
  return ay(n, i, r, s);
}
function Y2(e, n) {
  return {
    contextElement: _t(e) ? e : void 0,
    getBoundingClientRect: () => {
      const i = e,
        r = n == null ? void 0 : n(i);
      return r || !i ? q2(r) : i.getBoundingClientRect();
    },
  };
}
var Vo = (e) => ({ variable: e, reference: `var(${e})` }),
  ra = {
    arrowSize: Vo("--arrow-size"),
    arrowSizeHalf: Vo("--arrow-size-half"),
    arrowBg: Vo("--arrow-background"),
    transformOrigin: Vo("--transform-origin"),
    arrowOffset: Vo("--arrow-offset"),
  },
  X2 = (e) => ({
    top: "bottom center",
    "top-start": e ? `${e.x}px bottom` : "left bottom",
    "top-end": e ? `${e.x}px bottom` : "right bottom",
    bottom: "top center",
    "bottom-start": e ? `${e.x}px top` : "top left",
    "bottom-end": e ? `${e.x}px top` : "top right",
    left: "right center",
    "left-start": e ? `right ${e.y}px` : "right top",
    "left-end": e ? `right ${e.y}px` : "right bottom",
    right: "left center",
    "right-start": e ? `left ${e.y}px` : "left top",
    "right-end": e ? `left ${e.y}px` : "left bottom",
  }),
  K2 = {
    name: "transformOrigin",
    fn({ placement: e, elements: n, middlewareData: i }) {
      const { arrow: r } = i,
        s = X2(r)[e],
        { floating: c } = n;
      return (
        c.style.setProperty(ra.transformOrigin.variable, s),
        { data: { transformOrigin: s } }
      );
    },
  },
  Q2 = {
    name: "rects",
    fn({ rects: e }) {
      return { data: e };
    },
  },
  Z2 = (e) => {
    if (e)
      return {
        name: "shiftArrow",
        fn({ placement: n, middlewareData: i }) {
          if (!i.arrow) return {};
          const { x: r, y: s } = i.arrow,
            c = n.split("-")[0];
          return (
            Object.assign(e.style, {
              left: r != null ? `${r}px` : "",
              top: s != null ? `${s}px` : "",
              [c]: `calc(100% + ${ra.arrowOffset.reference})`,
            }),
            {}
          );
        },
      };
  };
function J2(e) {
  const [n, i] = e.split("-");
  return { side: n, align: i, hasAlign: i != null };
}
function eA(e) {
  return e.split("-")[0];
}
var tA = {
  strategy: "absolute",
  placement: "bottom",
  listeners: !0,
  gutter: 8,
  flip: !0,
  slide: !0,
  overlap: !1,
  sameWidth: !1,
  fitViewport: !1,
  overflowPadding: 8,
  arrowPadding: 4,
};
function iy(e, n) {
  const i = e.devicePixelRatio || 1;
  return Math.round(n * i) / i;
}
function V1(e) {
  return Qk(e.boundary);
}
function nA(e, n) {
  if (e) return F2({ element: e, padding: n.arrowPadding });
}
function aA(e, n) {
  if (!Xk(n.offset ?? n.gutter))
    return H2(({ placement: i }) => {
      var m, p;
      const r = ((e == null ? void 0 : e.clientHeight) || 0) / 2,
        s = ((m = n.offset) == null ? void 0 : m.mainAxis) ?? n.gutter,
        c = typeof s == "number" ? s + r : (s ?? r),
        { hasAlign: d } = J2(i),
        g = d ? void 0 : n.shift,
        h = ((p = n.offset) == null ? void 0 : p.crossAxis) ?? g;
      return Lg({ crossAxis: h, mainAxis: c, alignmentAxis: n.shift });
    });
}
function iA(e) {
  if (e.flip)
    return j2({
      boundary: V1(e),
      padding: e.overflowPadding,
      fallbackPlacements: e.flip === !0 ? void 0 : e.flip,
    });
}
function rA(e) {
  if (!(!e.slide && !e.overlap))
    return B2({
      boundary: V1(e),
      mainAxis: e.slide,
      crossAxis: e.overlap,
      padding: e.overflowPadding,
      limiter: G2(),
    });
}
function oA(e) {
  return U2({
    padding: e.overflowPadding,
    apply({ elements: n, rects: i, availableHeight: r, availableWidth: s }) {
      const c = n.floating,
        d = Math.round(i.reference.width);
      (s = Math.floor(s)),
        (r = Math.floor(r)),
        c.style.setProperty("--reference-width", `${d}px`),
        c.style.setProperty("--available-width", `${s}px`),
        c.style.setProperty("--available-height", `${r}px`);
    },
  });
}
function lA(e) {
  var n;
  if (e.hideWhenDetached)
    return $2({
      strategy: "referenceHidden",
      boundary:
        ((n = e.boundary) == null ? void 0 : n.call(e)) ?? "clippingAncestors",
    });
}
function sA(e) {
  return e
    ? e === !0
      ? {
          ancestorResize: !0,
          ancestorScroll: !0,
          elementResize: !0,
          layoutShift: !0,
        }
      : e
    : {};
}
function cA(e, n, i = {}) {
  const r = Y2(e, i.getAnchorRect);
  if (!n || !r) return;
  const s = Object.assign({}, tA, i),
    c = n.querySelector("[data-part=arrow]"),
    d = [aA(c, s), iA(s), rA(s), nA(c, s), Z2(c), K2, oA(s), lA(s), Q2],
    { placement: g, strategy: h, onComplete: m, onPositioned: p } = s,
    y = async () => {
      var B;
      if (!r || !n) return;
      const E = await W2(r, n, { placement: g, middleware: d, strategy: h });
      m == null || m(E), p == null || p({ placed: !0 });
      const R = Et(n),
        O = iy(R, E.x),
        A = iy(R, E.y);
      n.style.setProperty("--x", `${O}px`),
        n.style.setProperty("--y", `${A}px`),
        s.hideWhenDetached &&
          (((B = E.middlewareData.hide) == null ? void 0 : B.referenceHidden)
            ? (n.style.setProperty("visibility", "hidden"),
              n.style.setProperty("pointer-events", "none"))
            : (n.style.removeProperty("visibility"),
              n.style.removeProperty("pointer-events")));
      const z = n.firstElementChild;
      if (z) {
        const _ = wc(z);
        n.style.setProperty("--z-index", _.zIndex);
      }
    },
    b = async () => {
      i.updatePosition
        ? (await i.updatePosition({ updatePosition: y }),
          p == null || p({ placed: !0 }))
        : await y();
    },
    x = sA(s.listeners),
    C = s.listeners ? L2(r, n, b, x) : Jk;
  return (
    b(),
    () => {
      C == null || C(), p == null || p({ placed: !1 });
    }
  );
}
function On(e, n, i = {}) {
  const { defer: r, ...s } = i,
    c = r ? Ce : (g) => g(),
    d = [];
  return (
    d.push(
      c(() => {
        const g = typeof e == "function" ? e() : e,
          h = typeof n == "function" ? n() : n;
        d.push(cA(g, h, s));
      }),
    ),
    () => {
      d.forEach((g) => (g == null ? void 0 : g()));
    }
  );
}
var uA = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)",
};
function dA(e = {}) {
  const {
    placement: n,
    sameWidth: i,
    fitViewport: r,
    strategy: s = "absolute",
  } = e;
  return {
    arrow: {
      position: "absolute",
      width: ra.arrowSize.reference,
      height: ra.arrowSize.reference,
      [ra.arrowSizeHalf.variable]: `calc(${ra.arrowSize.reference} / 2)`,
      [ra.arrowOffset.variable]: `calc(${ra.arrowSizeHalf.reference} * -1)`,
    },
    arrowTip: {
      transform: n ? uA[n.split("-")[0]] : void 0,
      background: ra.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit",
    },
    floating: {
      position: s,
      isolation: "isolate",
      minWidth: i ? void 0 : "max-content",
      width: i ? "var(--reference-width)" : void 0,
      maxWidth: r ? "var(--available-width)" : void 0,
      maxHeight: r ? "var(--available-height)" : void 0,
      pointerEvents: n ? void 0 : "none",
      top: "0px",
      left: "0px",
      transform: n
        ? "translate3d(var(--x), var(--y), 0)"
        : "translate3d(0, -100vh, 0)",
      zIndex: "var(--z-index)",
    },
  };
}
function fA(e) {
  const n = {
    each(i) {
      var r;
      for (
        let s = 0;
        s < ((r = e.frames) == null ? void 0 : r.length);
        s += 1
      ) {
        const c = e.frames[s];
        c && i(c);
      }
    },
    addEventListener(i, r, s) {
      return (
        n.each((c) => {
          try {
            c.document.addEventListener(i, r, s);
          } catch {}
        }),
        () => {
          try {
            n.removeEventListener(i, r, s);
          } catch {}
        }
      );
    },
    removeEventListener(i, r, s) {
      n.each((c) => {
        try {
          c.document.removeEventListener(i, r, s);
        } catch {}
      });
    },
  };
  return n;
}
function gA(e) {
  const n = e.frameElement != null ? e.parent : null;
  return {
    addEventListener: (i, r, s) => {
      try {
        n == null || n.addEventListener(i, r, s);
      } catch {}
      return () => {
        try {
          n == null || n.removeEventListener(i, r, s);
        } catch {}
      };
    },
    removeEventListener: (i, r, s) => {
      try {
        n == null || n.removeEventListener(i, r, s);
      } catch {}
    },
  };
}
var ry = "pointerdown.outside",
  oy = "focus.outside";
function hA(e) {
  for (const n of e) if (_t(n) && Ug(n)) return !0;
  return !1;
}
var D1 = (e) => "clientY" in e;
function mA(e, n) {
  if (!D1(n) || !e) return !1;
  const i = e.getBoundingClientRect();
  return i.width === 0 || i.height === 0
    ? !1
    : i.top <= n.clientY &&
        n.clientY <= i.top + i.height &&
        i.left <= n.clientX &&
        n.clientX <= i.left + i.width;
}
function pA(e, n) {
  return (
    e.y <= n.y && n.y <= e.y + e.height && e.x <= n.x && n.x <= e.x + e.width
  );
}
function ly(e, n) {
  if (!n || !D1(e)) return !1;
  const i = n.scrollHeight > n.clientHeight,
    r = i && e.clientX > n.offsetLeft + n.clientWidth,
    s = n.scrollWidth > n.clientWidth,
    c = s && e.clientY > n.offsetTop + n.clientHeight,
    d = {
      x: n.offsetLeft,
      y: n.offsetTop,
      width: n.clientWidth + (i ? 16 : 0),
      height: n.clientHeight + (s ? 16 : 0),
    },
    g = { x: e.clientX, y: e.clientY };
  return pA(d, g) ? r || c : !1;
}
function vA(e, n) {
  const {
    exclude: i,
    onFocusOutside: r,
    onPointerDownOutside: s,
    onInteractOutside: c,
    defer: d,
  } = n;
  if (!e) return;
  const g = kn(e),
    h = Et(e),
    m = fA(h),
    p = gA(h);
  function y(A, z) {
    if (!_t(z) || !z.isConnected || vi(e, z) || mA(e, A)) return !1;
    const B = g.querySelector(`[aria-controls="${e.id}"]`);
    if (B) {
      const Y = kc(B);
      if (ly(A, Y)) return !1;
    }
    const _ = kc(e);
    return ly(A, _) ? !1 : !(i != null && i(z));
  }
  const b = new Set(),
    x = Er(e == null ? void 0 : e.getRootNode());
  function C(A) {
    function z(B) {
      var j;
      const _ = d && !Gb() ? Ce : (U) => U(),
        Y = B ?? A,
        $ = ((j = Y == null ? void 0 : Y.composedPath) == null
          ? void 0
          : j.call(Y)) ?? [Y == null ? void 0 : Y.target];
      _(() => {
        const U = x ? $[0] : mn(A);
        if (!(!e || !y(A, U))) {
          if (s || c) {
            const K = Ec(s, c);
            e.addEventListener(ry, K, { once: !0 });
          }
          sy(e, ry, {
            bubbles: !1,
            cancelable: !0,
            detail: {
              originalEvent: Y,
              contextmenu: $R(Y),
              focusable: hA($),
              target: U,
            },
          });
        }
      });
    }
    A.pointerType === "touch"
      ? (b.forEach((B) => B()),
        b.add(Ge(g, "click", z, { once: !0 })),
        b.add(p.addEventListener("click", z, { once: !0 })),
        b.add(m.addEventListener("click", z, { once: !0 })))
      : z();
  }
  const E = new Set(),
    R = setTimeout(() => {
      E.add(Ge(g, "pointerdown", C, !0)),
        E.add(p.addEventListener("pointerdown", C, !0)),
        E.add(m.addEventListener("pointerdown", C, !0));
    }, 0);
  function O(A) {
    (d ? Ce : (B) => B())(() => {
      const B = mn(A);
      if (!(!e || !y(A, B))) {
        if (r || c) {
          const _ = Ec(r, c);
          e.addEventListener(oy, _, { once: !0 });
        }
        sy(e, oy, {
          bubbles: !1,
          cancelable: !0,
          detail: {
            originalEvent: A,
            contextmenu: !1,
            focusable: Ug(B),
            target: B,
          },
        });
      }
    });
  }
  return (
    Gb() ||
      (E.add(Ge(g, "focusin", O, !0)),
      E.add(p.addEventListener("focusin", O, !0)),
      E.add(m.addEventListener("focusin", O, !0))),
    () => {
      clearTimeout(R), b.forEach((A) => A()), E.forEach((A) => A());
    }
  );
}
function bA(e, n) {
  const { defer: i } = n,
    r = i ? Ce : (c) => c(),
    s = [];
  return (
    s.push(
      r(() => {
        const c = typeof e == "function" ? e() : e;
        s.push(vA(c, n));
      }),
    ),
    () => {
      s.forEach((c) => (c == null ? void 0 : c()));
    }
  );
}
function sy(e, n, i) {
  const r = e.ownerDocument.defaultView || window,
    s = new r.CustomEvent(n, i);
  return e.dispatchEvent(s);
}
function yA(e, n) {
  const i = (r) => {
    r.key === "Escape" && (r.isComposing || n == null || n(r));
  };
  return Ge(kn(e), "keydown", i, { capture: !0 });
}
var xn = {
    layers: [],
    branches: [],
    count() {
      return this.layers.length;
    },
    pointerBlockingLayers() {
      return this.layers.filter((e) => e.pointerBlocking);
    },
    topMostPointerBlockingLayer() {
      return [...this.pointerBlockingLayers()].slice(-1)[0];
    },
    hasPointerBlockingLayer() {
      return this.pointerBlockingLayers().length > 0;
    },
    isBelowPointerBlockingLayer(e) {
      var r;
      const n = this.indexOf(e),
        i = this.topMostPointerBlockingLayer()
          ? this.indexOf(
              (r = this.topMostPointerBlockingLayer()) == null
                ? void 0
                : r.node,
            )
          : -1;
      return n < i;
    },
    isTopMost(e) {
      const n = this.layers[this.count() - 1];
      return (n == null ? void 0 : n.node) === e;
    },
    getNestedLayers(e) {
      return Array.from(this.layers).slice(this.indexOf(e) + 1);
    },
    isInNestedLayer(e, n) {
      return this.getNestedLayers(e).some((i) => vi(i.node, n));
    },
    isInBranch(e) {
      return Array.from(this.branches).some((n) => vi(n, e));
    },
    add(e) {
      const n = this.layers.push(e);
      e.node.style.setProperty("--layer-index", `${n}`);
    },
    addBranch(e) {
      this.branches.push(e);
    },
    remove(e) {
      const n = this.indexOf(e);
      n < 0 ||
        (n < this.count() - 1 &&
          this.getNestedLayers(e).forEach((r) => r.dismiss()),
        this.layers.splice(n, 1),
        e.style.removeProperty("--layer-index"));
    },
    removeBranch(e) {
      const n = this.branches.indexOf(e);
      n >= 0 && this.branches.splice(n, 1);
    },
    indexOf(e) {
      return this.layers.findIndex((n) => n.node === e);
    },
    dismiss(e) {
      var n;
      (n = this.layers[this.indexOf(e)]) == null || n.dismiss();
    },
    clear() {
      this.remove(this.layers[0].node);
    },
  },
  cy;
function uy() {
  xn.layers.forEach(({ node: e }) => {
    e.style.pointerEvents = xn.isBelowPointerBlockingLayer(e) ? "none" : "auto";
  });
}
function xA(e) {
  e.style.pointerEvents = "";
}
function SA(e, n) {
  const i = kn(e),
    r = [];
  if (
    (xn.hasPointerBlockingLayer() &&
      !i.body.hasAttribute("data-inert") &&
      ((cy = document.body.style.pointerEvents),
      queueMicrotask(() => {
        (i.body.style.pointerEvents = "none"),
          i.body.setAttribute("data-inert", "");
      })),
    n)
  ) {
    const s = TT(n, (c) => {
      r.push(Xg(c, { pointerEvents: "auto" }));
    });
    r.push(s);
  }
  return () => {
    xn.hasPointerBlockingLayer() ||
      (queueMicrotask(() => {
        (i.body.style.pointerEvents = cy),
          i.body.removeAttribute("data-inert"),
          i.body.style.length === 0 && i.body.removeAttribute("style");
      }),
      r.forEach((s) => s()));
  };
}
function CA(e, n) {
  const { warnOnMissingNode: i = !0 } = n;
  if (i && !e) {
    Oc("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  if (!e) return;
  const { onDismiss: r, pointerBlocking: s, exclude: c, debug: d } = n,
    g = { dismiss: r, node: e, pointerBlocking: s };
  xn.add(g), uy();
  function h(x) {
    var E, R;
    const C = mn(x.detail.originalEvent);
    xn.isBelowPointerBlockingLayer(e) ||
      xn.isInBranch(C) ||
      ((E = n.onPointerDownOutside) == null || E.call(n, x),
      (R = n.onInteractOutside) == null || R.call(n, x),
      !x.defaultPrevented &&
        (d && console.log("onPointerDownOutside:", x.detail.originalEvent),
        r == null || r()));
  }
  function m(x) {
    var E, R;
    const C = mn(x.detail.originalEvent);
    xn.isInBranch(C) ||
      ((E = n.onFocusOutside) == null || E.call(n, x),
      (R = n.onInteractOutside) == null || R.call(n, x),
      !x.defaultPrevented &&
        (d && console.log("onFocusOutside:", x.detail.originalEvent),
        r == null || r()));
  }
  function p(x) {
    var C;
    xn.isTopMost(e) &&
      ((C = n.onEscapeKeyDown) == null || C.call(n, x),
      !x.defaultPrevented && r && (x.preventDefault(), r()));
  }
  function y(x) {
    var O;
    if (!e) return !1;
    const C = typeof c == "function" ? c() : c,
      E = Array.isArray(C) ? C : [C],
      R =
        (O = n.persistentElements) == null
          ? void 0
          : O.map((A) => A()).filter(_t);
    return (
      R && E.push(...R), E.some((A) => vi(A, x)) || xn.isInNestedLayer(e, x)
    );
  }
  const b = [
    s ? SA(e, n.persistentElements) : void 0,
    yA(e, p),
    bA(e, {
      exclude: y,
      onFocusOutside: m,
      onPointerDownOutside: h,
      defer: n.defer,
    }),
  ];
  return () => {
    xn.remove(e), uy(), xA(e), b.forEach((x) => (x == null ? void 0 : x()));
  };
}
function gl(e, n) {
  const { defer: i } = n,
    r = i ? Ce : (c) => c(),
    s = [];
  return (
    s.push(
      r(() => {
        const c = pi(e) ? e() : e;
        s.push(CA(c, n));
      }),
    ),
    () => {
      s.forEach((c) => (c == null ? void 0 : c()));
    }
  );
}
var M1 = me("color-picker", [
  "root",
  "label",
  "control",
  "trigger",
  "positioner",
  "content",
  "area",
  "areaThumb",
  "valueText",
  "areaBackground",
  "channelSlider",
  "channelSliderLabel",
  "channelSliderTrack",
  "channelSliderThumb",
  "channelSliderValueText",
  "channelInput",
  "transparencyGrid",
  "swatchGroup",
  "swatchTrigger",
  "swatchIndicator",
  "swatch",
  "eyeDropperTrigger",
  "formatTrigger",
  "formatSelect",
]);
M1.build();
var EA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.hiddenInput) ??
      `color-picker:${e.id}:hidden-input`
    );
  },
  OA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.control) ??
      `color-picker:${e.id}:control`
    );
  },
  wA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ??
      `color-picker:${e.id}:trigger`
    );
  },
  kA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ??
      `color-picker:${e.id}:content`
    );
  },
  RA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ??
      `color-picker:${e.id}:positioner`
    );
  },
  TA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.formatSelect) ??
      `color-picker:${e.id}:format-select`
    );
  },
  AA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.area) ?? `color-picker:${e.id}:area`
    );
  },
  zA = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.areaThumb) ??
      `color-picker:${e.id}:area-thumb`
    );
  },
  _A = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.channelSliderTrack) == null
        ? void 0
        : r.call(i, n)) ?? `color-picker:${e.id}:slider-track:${n}`
    );
  },
  NA = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.channelSliderThumb) == null
        ? void 0
        : r.call(i, n)) ?? `color-picker:${e.id}:slider-thumb:${n}`
    );
  },
  uc = (e) => e.getById(kA(e)),
  IA = (e) => e.getById(zA(e)),
  PA = (e, n) => e.getById(NA(e, n)),
  VA = (e) => e.getById(TA(e)),
  dy = (e) => e.getById(EA(e)),
  DA = (e) => e.getById(AA(e)),
  MA = (e, n) => {
    const i = DA(e);
    if (!i) return;
    const { percent: r } = s1(n, i);
    return r;
  },
  LA = (e) => e.getById(OA(e)),
  Ff = (e) => e.getById(wA(e)),
  HA = (e) => e.getById(RA(e)),
  BA = (e, n) => e.getById(_A(e, n)),
  jA = (e, n, i) => {
    const r = BA(e, i);
    if (!r) return;
    const { percent: s } = s1(n, r);
    return s;
  },
  UA = (e) => [
    ...Rc(uc(e), "input[data-channel]"),
    ...Rc(LA(e), "input[data-channel]"),
  ];
function $A(e, n) {
  if (n == null) return "";
  if (n === "hex") return e.toString("hex");
  if (n === "css") return e.toString("css");
  if (n in e) return e.getChannelValue(n).toString();
  const i = e.getFormat() === "hsla";
  switch (n) {
    case "hue":
      return i
        ? e.toFormat("hsla").getChannelValue("hue").toString()
        : e.toFormat("hsba").getChannelValue("hue").toString();
    case "saturation":
      return i
        ? e.toFormat("hsla").getChannelValue("saturation").toString()
        : e.toFormat("hsba").getChannelValue("saturation").toString();
    case "lightness":
      return e.toFormat("hsla").getChannelValue("lightness").toString();
    case "brightness":
      return e.toFormat("hsba").getChannelValue("brightness").toString();
    case "red":
    case "green":
    case "blue":
      return e.toFormat("rgba").getChannelValue(n).toString();
    default:
      return e.getChannelValue(n).toString();
  }
}
var fy = (e) => Ac(e),
  { and: FA } = Ga();
FA("isOpenControlled", "closeOnSelect");
function gy(e, n, i) {
  const r = UA(e);
  Ce(() => {
    r.forEach((s) => {
      const c = s.dataset.channel;
      Kc(s, $A(i || n, c));
    });
  });
}
function GA(e, n) {
  const i = VA(e);
  i && Ce(() => Kc(i, n));
}
ve()([
  "closeOnSelect",
  "dir",
  "disabled",
  "format",
  "defaultFormat",
  "getRootNode",
  "id",
  "ids",
  "initialFocusEl",
  "name",
  "positioning",
  "onFocusOutside",
  "onFormatChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onValueChange",
  "onValueChangeEnd",
  "defaultOpen",
  "open",
  "positioning",
  "required",
  "readOnly",
  "value",
  "defaultValue",
  "invalid",
  "openAutoFocus",
]);
ve()(["xChannel", "yChannel"]);
ve()(["channel", "orientation"]);
ve()(["value", "disabled"]);
ve()(["value", "respectAlpha"]);
ve()(["size"]);
const [L1, WA] = pn({
    name: "RenderStrategyContext",
    hookName: "useRenderStrategyContext",
    providerName: "<RenderStrategyPropsProvider />",
  }),
  H1 = (e) => Hn()(e, ["lazyMount", "unmountOnExit"]),
  [qA, ch] = pn({
    name: "AccordionItemPropsContext",
    hookName: "useAccordionItemPropsContext",
    providerName: "<AccordionItemPropsProvider />",
  }),
  B1 = k.forwardRef((e, n) => {
    const [i, r] = Hn()(e, ["value", "disabled"]),
      s = nu(),
      c = WA(),
      d = Qe(s.getItemProps(i), r),
      g = s.getItemState(i),
      h = s.getItemContentProps(i);
    return V.jsx(qA, {
      value: i,
      children: V.jsx(UT, {
        value: g,
        children: V.jsx(C1, {
          ref: n,
          open: g.expanded,
          ids: { content: h.id },
          ...c,
          ...d,
        }),
      }),
    });
  });
B1.displayName = "AccordionItem";
const j1 = k.forwardRef((e, n) => {
  const i = S1();
  if (i.isUnmounted) return null;
  const r = Qe(i.getContentProps(), e);
  return V.jsx(Ot.div, { ...r, ref: n });
});
j1.displayName = "CollapsibleContent";
const YA = Hn(),
  U1 = k.forwardRef((e, n) => {
    const i = nu(),
      r = ch(),
      s = i.getItemContentProps(r),
      [, c] = YA(s, ["hidden", "data-state"]),
      d = Qe(c, e);
    return V.jsx(j1, { ref: n, ...d });
  });
U1.displayName = "AccordionItemContent";
const $1 = k.forwardRef((e, n) => {
  const i = nu(),
    r = ch(),
    s = Qe(i.getItemIndicatorProps(r), e);
  return V.jsx(Ot.div, { ...s, ref: n });
});
$1.displayName = "AccordionItemIndicator";
const F1 = k.forwardRef((e, n) => {
  const i = nu(),
    r = ch(),
    s = S1(),
    c = i.getItemTriggerProps(r),
    d = Qe(
      { ...c, "aria-controls": s.isUnmounted ? void 0 : c["aria-controls"] },
      e,
    );
  return V.jsx(Ot.button, { ...d, ref: n });
});
F1.displayName = "AccordionItemTrigger";
var G1 = me("accordion").parts(
    "root",
    "item",
    "itemTrigger",
    "itemContent",
    "itemIndicator",
  ),
  Do = G1.build(),
  Ic = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.root) ?? `accordion:${e.id}`;
  },
  XA = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.item) == null
        ? void 0
        : r.call(i, n)) ?? `accordion:${e.id}:item:${n}`
    );
  },
  hy = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.itemContent) == null
        ? void 0
        : r.call(i, n)) ?? `accordion:${e.id}:content:${n}`
    );
  },
  Pc = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.itemTrigger) == null
        ? void 0
        : r.call(i, n)) ?? `accordion:${e.id}:trigger:${n}`
    );
  },
  KA = (e) => e.getById(Ic(e)),
  ou = (e) => {
    const i = `[aria-controls][data-ownedby='${CSS.escape(Ic(e))}']:not([disabled])`;
    return Rc(KA(e), i);
  },
  QA = (e) => Fx(ou(e)),
  ZA = (e) => Gx(ou(e)),
  JA = (e, n) => vT(ou(e), Pc(e, n)),
  ez = (e, n) => bT(ou(e), Pc(e, n));
function tz(e, n) {
  const { send: i, context: r, prop: s, scope: c, computed: d } = e,
    g = r.get("focusedValue"),
    h = r.get("value"),
    m = s("multiple");
  function p(b) {
    let x = b;
    !m && x.length > 1 && (x = [x[0]]), i({ type: "VALUE.SET", value: x });
  }
  function y(b) {
    return {
      expanded: h.includes(b.value),
      focused: g === b.value,
      disabled: !!(b.disabled ?? s("disabled")),
    };
  }
  return {
    focusedValue: g,
    value: h,
    setValue: p,
    getItemState: y,
    getRootProps() {
      return n.element({
        ...Do.root.attrs,
        dir: s("dir"),
        id: Ic(c),
        "data-orientation": s("orientation"),
      });
    },
    getItemProps(b) {
      const x = y(b);
      return n.element({
        ...Do.item.attrs,
        dir: s("dir"),
        id: XA(c, b.value),
        "data-state": x.expanded ? "open" : "closed",
        "data-focus": Ct(x.focused),
        "data-disabled": Ct(x.disabled),
        "data-orientation": s("orientation"),
      });
    },
    getItemContentProps(b) {
      const x = y(b);
      return n.element({
        ...Do.itemContent.attrs,
        dir: s("dir"),
        role: "region",
        id: hy(c, b.value),
        "aria-labelledby": Pc(c, b.value),
        hidden: !x.expanded,
        "data-state": x.expanded ? "open" : "closed",
        "data-disabled": Ct(x.disabled),
        "data-focus": Ct(x.focused),
        "data-orientation": s("orientation"),
      });
    },
    getItemIndicatorProps(b) {
      const x = y(b);
      return n.element({
        ...Do.itemIndicator.attrs,
        dir: s("dir"),
        "aria-hidden": !0,
        "data-state": x.expanded ? "open" : "closed",
        "data-disabled": Ct(x.disabled),
        "data-focus": Ct(x.focused),
        "data-orientation": s("orientation"),
      });
    },
    getItemTriggerProps(b) {
      const { value: x } = b,
        C = y(b);
      return n.button({
        ...Do.itemTrigger.attrs,
        type: "button",
        dir: s("dir"),
        id: Pc(c, x),
        "aria-controls": hy(c, x),
        "aria-expanded": C.expanded,
        disabled: C.disabled,
        "data-orientation": s("orientation"),
        "aria-disabled": C.disabled,
        "data-state": C.expanded ? "open" : "closed",
        "data-ownedby": Ic(c),
        onFocus() {
          C.disabled || i({ type: "TRIGGER.FOCUS", value: x });
        },
        onBlur() {
          C.disabled || i({ type: "TRIGGER.BLUR" });
        },
        onClick(E) {
          C.disabled ||
            (jg() && E.currentTarget.focus(),
            i({ type: "TRIGGER.CLICK", value: x }));
        },
        onKeyDown(E) {
          if (E.defaultPrevented || C.disabled) return;
          const R = {
              ArrowDown() {
                d("isHorizontal") || i({ type: "GOTO.NEXT", value: x });
              },
              ArrowUp() {
                d("isHorizontal") || i({ type: "GOTO.PREV", value: x });
              },
              ArrowRight() {
                d("isHorizontal") && i({ type: "GOTO.NEXT", value: x });
              },
              ArrowLeft() {
                d("isHorizontal") && i({ type: "GOTO.PREV", value: x });
              },
              Home() {
                i({ type: "GOTO.FIRST", value: x });
              },
              End() {
                i({ type: "GOTO.LAST", value: x });
              },
            },
            O = WR(E, { dir: s("dir"), orientation: s("orientation") }),
            A = R[O];
          A && (A(E), E.preventDefault());
        },
      });
    },
  };
}
var { and: nz, not: az } = Ga(),
  iz = {
    props({ props: e }) {
      return {
        collapsible: !1,
        multiple: !1,
        orientation: "vertical",
        defaultValue: [],
        ...e,
      };
    },
    initialState() {
      return "idle";
    },
    context({ prop: e, bindable: n }) {
      return {
        focusedValue: n(() => ({
          defaultValue: null,
          sync: !0,
          onChange(i) {
            var r;
            (r = e("onFocusChange")) == null || r({ value: i });
          },
        })),
        value: n(() => ({
          defaultValue: e("defaultValue"),
          value: e("value"),
          onChange(i) {
            var r;
            (r = e("onValueChange")) == null || r({ value: i });
          },
        })),
      };
    },
    computed: {
      isHorizontal: ({ prop: e }) => e("orientation") === "horizontal",
    },
    on: { "VALUE.SET": { actions: ["setValue"] } },
    states: {
      idle: {
        on: {
          "TRIGGER.FOCUS": { target: "focused", actions: ["setFocusedValue"] },
        },
      },
      focused: {
        on: {
          "GOTO.NEXT": { actions: ["focusNextTrigger"] },
          "GOTO.PREV": { actions: ["focusPrevTrigger"] },
          "TRIGGER.CLICK": [
            { guard: nz("isExpanded", "canToggle"), actions: ["collapse"] },
            { guard: az("isExpanded"), actions: ["expand"] },
          ],
          "GOTO.FIRST": { actions: ["focusFirstTrigger"] },
          "GOTO.LAST": { actions: ["focusLastTrigger"] },
          "TRIGGER.BLUR": { target: "idle", actions: ["clearFocusedValue"] },
        },
      },
    },
    implementations: {
      guards: {
        canToggle: ({ prop: e }) => !!e("collapsible") || !!e("multiple"),
        isExpanded: ({ context: e, event: n }) =>
          e.get("value").includes(n.value),
      },
      actions: {
        collapse({ context: e, prop: n, event: i }) {
          const r = n("multiple") ? Mg(e.get("value"), i.value) : [];
          e.set("value", r);
        },
        expand({ context: e, prop: n, event: i }) {
          const r = n("multiple") ? Wx(e.get("value"), i.value) : [i.value];
          e.set("value", r);
        },
        focusFirstTrigger({ scope: e }) {
          var n;
          (n = QA(e)) == null || n.focus();
        },
        focusLastTrigger({ scope: e }) {
          var n;
          (n = ZA(e)) == null || n.focus();
        },
        focusNextTrigger({ context: e, scope: n }) {
          const i = e.get("focusedValue");
          if (!i) return;
          const r = JA(n, i);
          r == null || r.focus();
        },
        focusPrevTrigger({ context: e, scope: n }) {
          const i = e.get("focusedValue");
          if (!i) return;
          const r = ez(n, i);
          r == null || r.focus();
        },
        setFocusedValue({ context: e, event: n }) {
          e.set("focusedValue", n.value);
        },
        clearFocusedValue({ context: e }) {
          e.set("focusedValue", null);
        },
        setValue({ context: e, event: n }) {
          e.set("value", n.value);
        },
        coarseValue({ context: e, prop: n }) {
          !n("multiple") &&
            e.get("value").length > 1 &&
            (Oc(
              "The value of accordion should be a single value when multiple is false.",
            ),
            e.set("value", [e.get("value")[0]]));
        },
      },
    },
  };
ve()([
  "collapsible",
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "multiple",
  "onFocusChange",
  "onValueChange",
  "orientation",
  "value",
  "defaultValue",
]);
ve()(["value", "disabled"]);
const rz = (e) => {
    const n = k.useId(),
      { getRootNode: i } = ul(),
      { dir: r } = Jc(),
      s = { id: n, dir: r, getRootNode: i, ...e },
      c = dl(iz, s);
    return tz(c, tu);
  },
  W1 = k.forwardRef((e, n) => {
    const [i, r] = H1(e),
      [s, c] = Hn()(r, [
        "collapsible",
        "defaultValue",
        "disabled",
        "id",
        "ids",
        "multiple",
        "onFocusChange",
        "onValueChange",
        "orientation",
        "value",
      ]),
      d = rz(s),
      g = Qe(d.getRootProps(), c);
    return V.jsx(y1, {
      value: d,
      children: V.jsx(L1, {
        value: i,
        children: V.jsx(Ot.div, { ...g, ref: n }),
      }),
    });
  });
W1.displayName = "AccordionRoot";
const q1 = k.forwardRef((e, n) => {
  const [i, r] = H1(e),
    [{ value: s }, c] = Hn()(r, ["value"]),
    d = Qe(s.getRootProps(), c);
  return V.jsx(y1, {
    value: s,
    children: V.jsx(L1, {
      value: i,
      children: V.jsx(Ot.div, { ...d, ref: n }),
    }),
  });
});
q1.displayName = "AccordionRootProvider";
var Wo = (e, n) => ({ x: e, y: n });
function oz(e) {
  const { x: n, y: i, width: r, height: s } = e,
    c = n + r / 2,
    d = i + s / 2;
  return {
    x: n,
    y: i,
    width: r,
    height: s,
    minX: n,
    minY: i,
    maxX: n + r,
    maxY: i + s,
    midX: c,
    midY: d,
    center: Wo(c, d),
  };
}
function lz(e) {
  const n = Wo(e.minX, e.minY),
    i = Wo(e.maxX, e.minY),
    r = Wo(e.maxX, e.maxY),
    s = Wo(e.minX, e.maxY);
  return { top: n, right: i, bottom: r, left: s };
}
function sz(e, n) {
  const i = oz(e),
    { top: r, right: s, left: c, bottom: d } = lz(i),
    [g] = n.split("-");
  return {
    top: [c, r, s, d],
    right: [r, s, d, c],
    bottom: [r, c, d, s],
    left: [s, r, c, d],
  }[g];
}
function cz(e, n) {
  const { x: i, y: r } = n;
  let s = !1;
  for (let c = 0, d = e.length - 1; c < e.length; d = c++) {
    const g = e[c].x,
      h = e[c].y,
      m = e[d].x,
      p = e[d].y;
    h > r != p > r && i < ((m - g) * (r - h)) / (p - h) + g && (s = !s);
  }
  return s;
}
var Y1 = me("avatar").parts("root", "image", "fallback");
Y1.build();
ve()(["dir", "id", "ids", "onStatusChange", "getRootNode"]);
const [X1, lu] = pn({
    name: "CheckboxContext",
    hookName: "useCheckboxContext",
    providerName: "<CheckboxProvider />",
  }),
  K1 = k.forwardRef((e, n) => {
    const i = lu(),
      r = Qe(i.getControlProps(), e);
    return V.jsx(Ot.div, { ...r, ref: n });
  });
K1.displayName = "CheckboxControl";
function uz(e) {
  return !(
    e.metaKey ||
    (!Xc() && e.altKey) ||
    e.ctrlKey ||
    e.key === "Control" ||
    e.key === "Shift" ||
    e.key === "Meta"
  );
}
var dz = new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset",
]);
function fz(e, n, i) {
  const r = i ? mn(i) : null,
    s = Et(r);
  return (
    (e =
      e ||
      (r instanceof s.HTMLInputElement &&
        !dz.has(r == null ? void 0 : r.type)) ||
      r instanceof s.HTMLTextAreaElement ||
      (r instanceof s.HTMLElement && r.isContentEditable)),
    !(
      e &&
      n === "keyboard" &&
      i instanceof s.KeyboardEvent &&
      !Reflect.has(gz, i.key)
    )
  );
}
var xi = null,
  dg = new Set(),
  Zo = new Map(),
  yi = !1,
  fg = !1,
  gz = { Tab: !0, Escape: !0 };
function su(e, n) {
  for (let i of dg) i(e, n);
}
function Vc(e) {
  (yi = !0), uz(e) && ((xi = "keyboard"), su("keyboard", e));
}
function hn(e) {
  (xi = "pointer"),
    (e.type === "mousedown" || e.type === "pointerdown") &&
      ((yi = !0), su("pointer", e));
}
function Q1(e) {
  UR(e) && ((yi = !0), (xi = "virtual"));
}
function Z1(e) {
  const n = mn(e);
  n === Et(n) ||
    n === kn(n) ||
    (!yi && !fg && ((xi = "virtual"), su("virtual", e)), (yi = !1), (fg = !1));
}
function J1() {
  (yi = !1), (fg = !0);
}
function hz(e) {
  if (typeof window > "u" || Zo.get(Et(e))) return;
  const n = Et(e),
    i = kn(e);
  let r = n.HTMLElement.prototype.focus;
  function s() {
    (xi = "virtual"), su("virtual", null), (yi = !0), r.apply(this, arguments);
  }
  Object.defineProperty(n.HTMLElement.prototype, "focus", {
    configurable: !0,
    value: s,
  }),
    i.addEventListener("keydown", Vc, !0),
    i.addEventListener("keyup", Vc, !0),
    i.addEventListener("click", Q1, !0),
    n.addEventListener("focus", Z1, !0),
    n.addEventListener("blur", J1, !1),
    typeof n.PointerEvent < "u"
      ? (i.addEventListener("pointerdown", hn, !0),
        i.addEventListener("pointermove", hn, !0),
        i.addEventListener("pointerup", hn, !0))
      : (i.addEventListener("mousedown", hn, !0),
        i.addEventListener("mousemove", hn, !0),
        i.addEventListener("mouseup", hn, !0)),
    n.addEventListener(
      "beforeunload",
      () => {
        mz(e);
      },
      { once: !0 },
    ),
    Zo.set(n, { focus: r });
}
var mz = (e, n) => {
  const i = Et(e),
    r = kn(e);
  Zo.has(i) &&
    ((i.HTMLElement.prototype.focus = Zo.get(i).focus),
    r.removeEventListener("keydown", Vc, !0),
    r.removeEventListener("keyup", Vc, !0),
    r.removeEventListener("click", Q1, !0),
    i.removeEventListener("focus", Z1, !0),
    i.removeEventListener("blur", J1, !1),
    typeof i.PointerEvent < "u"
      ? (r.removeEventListener("pointerdown", hn, !0),
        r.removeEventListener("pointermove", hn, !0),
        r.removeEventListener("pointerup", hn, !0))
      : (r.removeEventListener("mousedown", hn, !0),
        r.removeEventListener("mousemove", hn, !0),
        r.removeEventListener("mouseup", hn, !0)),
    Zo.delete(i));
};
function Dc() {
  return xi === "keyboard";
}
function eS(e = {}) {
  const { isTextInput: n, autoFocus: i, onChange: r, root: s } = e;
  hz(s), r == null || r({ isFocusVisible: i || Dc(), modality: xi });
  const c = (d, g) => {
    fz(!!n, d, g) && (r == null || r({ isFocusVisible: Dc(), modality: d }));
  };
  return (
    dg.add(c),
    () => {
      dg.delete(c);
    }
  );
}
var tS = me("checkbox").parts("root", "label", "control", "indicator"),
  Fs = tS.build(),
  nS = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.root) ?? `checkbox:${e.id}`;
  },
  my = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.label) ?? `checkbox:${e.id}:label`;
  },
  pz = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.control) ?? `checkbox:${e.id}:control`
    );
  },
  gg = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.hiddenInput) ?? `checkbox:${e.id}:input`
    );
  },
  vz = (e) => e.getById(nS(e)),
  qo = (e) => e.getById(gg(e));
function bz(e, n) {
  const { send: i, context: r, prop: s, computed: c, scope: d } = e,
    g = s("disabled"),
    h = s("readOnly"),
    m = s("invalid"),
    p = !g && r.get("focused"),
    y = !g && r.get("focusVisible"),
    b = c("checked"),
    x = c("indeterminate"),
    C = {
      "data-active": Ct(r.get("active")),
      "data-focus": Ct(p),
      "data-focus-visible": Ct(y),
      "data-readonly": Ct(h),
      "data-hover": Ct(r.get("hovered")),
      "data-disabled": Ct(g),
      "data-state": x ? "indeterminate" : b ? "checked" : "unchecked",
      "data-invalid": Ct(m),
    };
  return {
    checked: b,
    disabled: g,
    indeterminate: x,
    focused: p,
    checkedState: b,
    setChecked(E) {
      i({ type: "CHECKED.SET", checked: E, isTrusted: !1 });
    },
    toggleChecked() {
      i({ type: "CHECKED.TOGGLE", checked: b, isTrusted: !1 });
    },
    getRootProps() {
      return n.label({
        ...Fs.root.attrs,
        ...C,
        dir: s("dir"),
        id: nS(d),
        htmlFor: gg(d),
        onPointerMove() {
          g || i({ type: "CONTEXT.SET", context: { hovered: !0 } });
        },
        onPointerLeave() {
          g || i({ type: "CONTEXT.SET", context: { hovered: !1 } });
        },
        onClick(E) {
          mn(E) === qo(d) && E.stopPropagation();
        },
      });
    },
    getLabelProps() {
      return n.element({ ...Fs.label.attrs, ...C, dir: s("dir"), id: my(d) });
    },
    getControlProps() {
      return n.element({
        ...Fs.control.attrs,
        ...C,
        dir: s("dir"),
        id: pz(d),
        "aria-hidden": !0,
      });
    },
    getIndicatorProps() {
      return n.element({
        ...Fs.indicator.attrs,
        ...C,
        dir: s("dir"),
        hidden: !x && !b,
      });
    },
    getHiddenInputProps() {
      return n.input({
        id: gg(d),
        type: "checkbox",
        required: s("required"),
        defaultChecked: b,
        disabled: g,
        "aria-labelledby": my(d),
        "aria-invalid": m,
        name: s("name"),
        form: s("form"),
        value: s("value"),
        style: wT,
        onFocus() {
          const E = Dc();
          i({ type: "CONTEXT.SET", context: { focused: !0, focusVisible: E } });
        },
        onBlur() {
          i({
            type: "CONTEXT.SET",
            context: { focused: !1, focusVisible: !1 },
          });
        },
        onClick(E) {
          if (h) {
            E.preventDefault();
            return;
          }
          const R = E.currentTarget.checked;
          i({ type: "CHECKED.SET", checked: R, isTrusted: !0 });
        },
      });
    },
  };
}
var { not: py } = Ga(),
  yz = {
    props({ props: e }) {
      return { value: "on", ...e, defaultChecked: !!e.defaultChecked };
    },
    initialState() {
      return "ready";
    },
    context({ prop: e, bindable: n }) {
      return {
        checked: n(() => ({
          defaultValue: e("defaultChecked"),
          value: e("checked"),
          onChange(i) {
            var r;
            (r = e("onCheckedChange")) == null || r({ checked: i });
          },
        })),
        fieldsetDisabled: n(() => ({ defaultValue: !1 })),
        focusVisible: n(() => ({ defaultValue: !1 })),
        active: n(() => ({ defaultValue: !1 })),
        focused: n(() => ({ defaultValue: !1 })),
        hovered: n(() => ({ defaultValue: !1 })),
      };
    },
    watch({ track: e, context: n, prop: i, action: r }) {
      e([() => i("disabled")], () => {
        r(["removeFocusIfNeeded"]);
      }),
        e([() => n.get("checked")], () => {
          r(["syncInputElement"]);
        });
    },
    effects: ["trackFormControlState", "trackPressEvent", "trackFocusVisible"],
    on: {
      "CHECKED.TOGGLE": [
        {
          guard: py("isTrusted"),
          actions: ["toggleChecked", "dispatchChangeEvent"],
        },
        { actions: ["toggleChecked"] },
      ],
      "CHECKED.SET": [
        {
          guard: py("isTrusted"),
          actions: ["setChecked", "dispatchChangeEvent"],
        },
        { actions: ["setChecked"] },
      ],
      "CONTEXT.SET": { actions: ["setContext"] },
    },
    computed: {
      indeterminate: ({ context: e }) => dc(e.get("checked")),
      checked: ({ context: e }) => xz(e.get("checked")),
      disabled: ({ context: e, prop: n }) =>
        !!n("disabled") || e.get("fieldsetDisabled"),
    },
    states: { ready: {} },
    implementations: {
      guards: { isTrusted: ({ event: e }) => !!e.isTrusted },
      effects: {
        trackPressEvent({ context: e, computed: n, scope: i }) {
          if (!n("disabled"))
            return hT({
              pointerNode: vz(i),
              keyboardNode: qo(i),
              isValidKey: (r) => r.key === " ",
              onPress: () => e.set("active", !1),
              onPressStart: () => e.set("active", !0),
              onPressEnd: () => e.set("active", !1),
            });
        },
        trackFocusVisible({ computed: e, scope: n }) {
          var i;
          if (!e("disabled"))
            return eS({
              root: (i = n.getRootNode) == null ? void 0 : i.call(n),
            });
        },
        trackFormControlState({ context: e, scope: n }) {
          return Qc(qo(n), {
            onFieldsetDisabledChange(i) {
              e.set("fieldsetDisabled", i);
            },
            onFormReset() {
              e.set("checked", e.initial("checked"));
            },
          });
        },
      },
      actions: {
        setContext({ context: e, event: n }) {
          for (const i in n.context) e.set(i, n.context[i]);
        },
        syncInputElement({ context: e, computed: n, scope: i }) {
          const r = qo(i);
          r && (a1(r, n("checked")), (r.indeterminate = dc(e.get("checked"))));
        },
        removeFocusIfNeeded({ context: e, prop: n }) {
          n("disabled") &&
            e.get("focused") &&
            (e.set("focused", !1), e.set("focusVisible", !1));
        },
        setChecked({ context: e, event: n }) {
          e.set("checked", n.checked);
        },
        toggleChecked({ context: e, computed: n }) {
          const i = dc(n("checked")) ? !0 : !n("checked");
          e.set("checked", i);
        },
        dispatchChangeEvent({ computed: e, scope: n }) {
          queueMicrotask(() => {
            const i = qo(n);
            KR(i, { checked: e("checked") });
          });
        },
      },
    },
  };
function dc(e) {
  return e === "indeterminate";
}
function xz(e) {
  return dc(e) ? !1 : !!e;
}
ve()([
  "defaultChecked",
  "checked",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "name",
  "onCheckedChange",
  "readOnly",
  "required",
  "value",
]);
const aS = tS.extendWith("group");
function Sz(e) {
  const { value: n, onChange: i, defaultValue: r } = e,
    [s, c] = k.useState(r),
    d = n !== void 0,
    g = d ? n : s,
    h = k.useCallback((m) => (d || c(m), i == null ? void 0 : i(m)), [d, i]);
  return [g, h];
}
function Cz(e = {}) {
  const {
      defaultValue: n,
      value: i,
      onValueChange: r,
      disabled: s,
      readOnly: c,
      name: d,
      invalid: g,
    } = e,
    h = !(s || c),
    m = m1(r, { sync: !0 }),
    [p, y] = Sz({ value: i, defaultValue: n || [], onChange: m }),
    b = (O) => p.some((A) => String(A) === String(O)),
    x = (O) => {
      b(O) ? E(O) : C(O);
    },
    C = (O) => {
      h && (b(O) || y(p.concat(O)));
    },
    E = (O) => {
      h && y(p.filter((A) => String(A) !== String(O)));
    };
  return {
    isChecked: b,
    value: p,
    name: d,
    disabled: !!s,
    readOnly: !!c,
    invalid: !!g,
    setValue: y,
    addValue: C,
    toggleValue: x,
    getItemProps: (O) => ({
      checked: O.value != null ? b(O.value) : void 0,
      onCheckedChange() {
        O.value != null && x(O.value);
      },
      name: d,
      disabled: s,
      readOnly: c,
      invalid: g,
    }),
  };
}
const [Ez, Oz] = pn({
    name: "CheckboxGroupContext",
    hookName: "useCheckboxGroupContext",
    providerName: "<CheckboxGroupProvider />",
    strict: !1,
  }),
  iS = k.forwardRef((e, n) => {
    const [i, r] = Hn()(e, [
        "defaultValue",
        "value",
        "onValueChange",
        "disabled",
        "invalid",
        "readOnly",
        "name",
      ]),
      s = Cz(i);
    return V.jsx(Ez, {
      value: s,
      children: V.jsx(Ot.div, {
        ref: n,
        role: "group",
        ...r,
        ...aS.build().group.attrs,
      }),
    });
  });
iS.displayName = "CheckboxGroup";
const [tV, rS] = pn({
    name: "FieldContext",
    hookName: "useFieldContext",
    providerName: "<FieldProvider />",
    strict: !1,
  }),
  oS = k.forwardRef((e, n) => {
    const i = lu(),
      r = Qe(i.getHiddenInputProps(), e),
      s = rS();
    return V.jsx(Ot.input, {
      "aria-describedby": s == null ? void 0 : s.ariaDescribedby,
      ...r,
      ref: n,
    });
  });
oS.displayName = "CheckboxHiddenInput";
const lS = k.forwardRef((e, n) => {
  const i = lu(),
    r = Qe(i.getLabelProps(), e);
  return V.jsx(Ot.span, { ...r, ref: n });
});
lS.displayName = "CheckboxLabel";
const wz = (e = {}) => {
    const n = Oz(),
      i = rS(),
      r = k.useMemo(
        () =>
          Qe(
            e,
            (n == null ? void 0 : n.getItemProps({ value: e.value })) ?? {},
          ),
        [e, n],
      ),
      s = k.useId(),
      { getRootNode: c } = ul(),
      { dir: d } = Jc(),
      g = {
        id: s,
        ids: {
          label: i == null ? void 0 : i.ids.label,
          hiddenInput: i == null ? void 0 : i.ids.control,
        },
        dir: d,
        disabled: i == null ? void 0 : i.disabled,
        readOnly: i == null ? void 0 : i.readOnly,
        invalid: i == null ? void 0 : i.invalid,
        required: i == null ? void 0 : i.required,
        getRootNode: c,
        ...r,
      },
      h = dl(yz, g);
    return bz(h, tu);
  },
  sS = k.forwardRef((e, n) => {
    const [i, r] = Hn()(e, [
        "checked",
        "defaultChecked",
        "disabled",
        "form",
        "id",
        "ids",
        "invalid",
        "name",
        "onCheckedChange",
        "readOnly",
        "required",
        "value",
      ]),
      s = wz(i),
      c = Qe(s.getRootProps(), r);
    return V.jsx(X1, { value: s, children: V.jsx(Ot.label, { ...c, ref: n }) });
  });
sS.displayName = "CheckboxRoot";
const cS = k.forwardRef((e, n) => {
  const [{ value: i }, r] = Hn()(e, ["value"]),
    s = Qe(i.getRootProps(), r);
  return V.jsx(X1, { value: i, children: V.jsx(Ot.label, { ...s, ref: n }) });
});
cS.displayName = "CheckboxRootProvider";
const kz = M1.extendWith("view");
var Rz = Object.defineProperty,
  Tz = (e, n, i) =>
    n in e
      ? Rz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (e[n] = i),
  ye = (e, n, i) => Tz(e, typeof n != "symbol" ? n + "" : n, i),
  fc = {
    itemToValue(e) {
      return typeof e == "string" ? e : Df(e) && Mf(e, "value") ? e.value : "";
    },
    itemToString(e) {
      return typeof e == "string"
        ? e
        : Df(e) && Mf(e, "label")
          ? e.label
          : fc.itemToValue(e);
    },
    isItemDisabled(e) {
      return Df(e) && Mf(e, "disabled") ? !!e.disabled : !1;
    },
  },
  cu = class uS {
    constructor(n) {
      (this.options = n),
        ye(this, "items"),
        ye(
          this,
          "copy",
          (i) => new uS({ ...this.options, items: i ?? [...this.items] }),
        ),
        ye(this, "isEqual", (i) => kr(this.items, i.items)),
        ye(this, "setItems", (i) => this.copy(i)),
        ye(this, "getValues", (i = this.items) =>
          Array.from(i)
            .map((r) => this.getItemValue(r))
            .filter(Boolean),
        ),
        ye(this, "find", (i) => {
          if (i == null) return null;
          const r = this.indexOf(i);
          return r != null ? this.at(r) : null;
        }),
        ye(this, "findMany", (i) =>
          Array.from(i)
            .map((r) => this.find(r))
            .filter((r) => r != null),
        ),
        ye(this, "at", (i) => {
          if (!this.options.groupBy && !this.options.groupSort)
            return this.items[i] ?? null;
          let r = 0;
          const s = this.group();
          for (const [, c] of s)
            for (const d of c) {
              if (r === i) return d;
              r++;
            }
          return null;
        }),
        ye(this, "sortFn", (i, r) => {
          const s = this.indexOf(i),
            c = this.indexOf(r);
          return (s ?? 0) - (c ?? 0);
        }),
        ye(this, "sort", (i) => [...i].sort(this.sortFn.bind(this))),
        ye(this, "getItemValue", (i) => {
          var r, s;
          return i == null
            ? null
            : (((s = (r = this.options).itemToValue) == null
                ? void 0
                : s.call(r, i)) ?? fc.itemToValue(i));
        }),
        ye(this, "getItemDisabled", (i) => {
          var r, s;
          return i == null
            ? !1
            : (((s = (r = this.options).isItemDisabled) == null
                ? void 0
                : s.call(r, i)) ?? fc.isItemDisabled(i));
        }),
        ye(this, "stringifyItem", (i) => {
          var r, s;
          return i == null
            ? null
            : (((s = (r = this.options).itemToString) == null
                ? void 0
                : s.call(r, i)) ?? fc.itemToString(i));
        }),
        ye(this, "stringify", (i) =>
          i == null ? null : this.stringifyItem(this.find(i)),
        ),
        ye(this, "stringifyItems", (i, r = ", ") =>
          Array.from(i)
            .map((s) => this.stringifyItem(s))
            .filter(Boolean)
            .join(r),
        ),
        ye(this, "stringifyMany", (i, r) =>
          this.stringifyItems(this.findMany(i), r),
        ),
        ye(this, "has", (i) => this.indexOf(i) !== -1),
        ye(this, "hasItem", (i) =>
          i == null ? !1 : this.has(this.getItemValue(i)),
        ),
        ye(this, "group", () => {
          const { groupBy: i, groupSort: r } = this.options;
          if (!i) return [["", [...this.items]]];
          const s = new Map();
          this.items.forEach((d, g) => {
            const h = i(d, g);
            s.has(h) || s.set(h, []), s.get(h).push(d);
          });
          let c = Array.from(s.entries());
          return (
            r &&
              c.sort(([d], [g]) => {
                if (typeof r == "function") return r(d, g);
                if (Array.isArray(r)) {
                  const h = r.indexOf(d),
                    m = r.indexOf(g);
                  return h === -1 ? 1 : m === -1 ? -1 : h - m;
                }
                return r === "asc"
                  ? d.localeCompare(g)
                  : r === "desc"
                    ? g.localeCompare(d)
                    : 0;
              }),
            c
          );
        }),
        ye(this, "getNextValue", (i, r = 1, s = !1) => {
          let c = this.indexOf(i);
          if (c === -1) return null;
          for (
            c = s ? Math.min(c + r, this.size - 1) : c + r;
            c <= this.size && this.getItemDisabled(this.at(c));

          )
            c++;
          return this.getItemValue(this.at(c));
        }),
        ye(this, "getPreviousValue", (i, r = 1, s = !1) => {
          let c = this.indexOf(i);
          if (c === -1) return null;
          for (
            c = s ? Math.max(c - r, 0) : c - r;
            c >= 0 && this.getItemDisabled(this.at(c));

          )
            c--;
          return this.getItemValue(this.at(c));
        }),
        ye(this, "indexOf", (i) => {
          if (i == null) return -1;
          if (!this.options.groupBy && !this.options.groupSort)
            return this.items.findIndex((c) => this.getItemValue(c) === i);
          let r = 0;
          const s = this.group();
          for (const [, c] of s)
            for (const d of c) {
              if (this.getItemValue(d) === i) return r;
              r++;
            }
          return -1;
        }),
        ye(this, "getByText", (i, r) => {
          let s = r != null ? zz(this.items, this.indexOf(r)) : this.items;
          return (
            i.length === 1 && (s = s.filter((d) => this.getItemValue(d) !== r)),
            s.find((d) => Az(this.stringifyItem(d), i))
          );
        }),
        ye(this, "search", (i, r) => {
          const { state: s, currentValue: c, timeout: d = 350 } = r,
            g = s.keysSoFar + i,
            m =
              g.length > 1 && Array.from(g).every((C) => C === g[0]) ? g[0] : g,
            p = this.getByText(m, c),
            y = this.getItemValue(p);
          function b() {
            clearTimeout(s.timer), (s.timer = -1);
          }
          function x(C) {
            (s.keysSoFar = C),
              b(),
              C !== "" &&
                (s.timer = +setTimeout(() => {
                  x(""), b();
                }, d));
          }
          return x(g), y;
        }),
        ye(this, "update", (i, r) => {
          let s = this.items.findIndex((c) => this.getItemValue(c) === i);
          return s === -1
            ? this
            : this.copy([
                ...this.items.slice(0, s),
                r,
                ...this.items.slice(s + 1),
              ]);
        }),
        ye(this, "insert", (i, ...r) => this.copy(Mo(this.items, i, ...r))),
        ye(this, "insertBefore", (i, ...r) => {
          let s = this.indexOf(i);
          if (s === -1)
            if (this.items.length === 0) s = 0;
            else return this;
          return this.copy(Mo(this.items, s, ...r));
        }),
        ye(this, "insertAfter", (i, ...r) => {
          let s = this.indexOf(i);
          if (s === -1)
            if (this.items.length === 0) s = 0;
            else return this;
          return this.copy(Mo(this.items, s + 1, ...r));
        }),
        ye(this, "prepend", (...i) => this.copy(Mo(this.items, 0, ...i))),
        ye(this, "append", (...i) =>
          this.copy(Mo(this.items, this.items.length, ...i)),
        ),
        ye(this, "filter", (i) => {
          const r = this.items.filter((s, c) => i(this.stringifyItem(s), c));
          return this.copy(r);
        }),
        ye(this, "remove", (...i) => {
          const r = i.map((s) =>
            typeof s == "string" ? s : this.getItemValue(s),
          );
          return this.copy(
            this.items.filter((s) => {
              const c = this.getItemValue(s);
              return c == null ? !1 : !r.includes(c);
            }),
          );
        }),
        ye(this, "move", (i, r) => {
          const s = this.indexOf(i);
          return s === -1 ? this : this.copy(Gs(this.items, [s], r));
        }),
        ye(this, "moveBefore", (i, ...r) => {
          let s = this.items.findIndex((d) => this.getItemValue(d) === i);
          if (s === -1) return this;
          let c = r
            .map((d) => this.items.findIndex((g) => this.getItemValue(g) === d))
            .sort((d, g) => d - g);
          return this.copy(Gs(this.items, c, s));
        }),
        ye(this, "moveAfter", (i, ...r) => {
          let s = this.items.findIndex((d) => this.getItemValue(d) === i);
          if (s === -1) return this;
          let c = r
            .map((d) => this.items.findIndex((g) => this.getItemValue(g) === d))
            .sort((d, g) => d - g);
          return this.copy(Gs(this.items, c, s + 1));
        }),
        ye(this, "reorder", (i, r) => this.copy(Gs(this.items, [i], r))),
        ye(this, "compareValue", (i, r) => {
          const s = this.indexOf(i),
            c = this.indexOf(r);
          return s < c ? -1 : s > c ? 1 : 0;
        }),
        ye(this, "range", (i, r) => {
          let s = [],
            c = i;
          for (; c != null; ) {
            if ((this.find(c) && s.push(c), c === r)) return s;
            c = this.getNextValue(c);
          }
          return [];
        }),
        ye(this, "getValueRange", (i, r) =>
          i && r
            ? this.compareValue(i, r) <= 0
              ? this.range(i, r)
              : this.range(r, i)
            : [],
        ),
        ye(this, "toString", () => {
          let i = "";
          for (const r of this.items) {
            const s = this.getItemValue(r),
              c = this.stringifyItem(r),
              d = this.getItemDisabled(r),
              g = [s, c, d].filter(Boolean).join(":");
            i += g + ",";
          }
          return i;
        }),
        ye(this, "toJSON", () => ({
          size: this.size,
          first: this.firstValue,
          last: this.lastValue,
        })),
        (this.items = [...n.items]);
    }
    get size() {
      return this.items.length;
    }
    get firstValue() {
      let n = 0;
      for (; this.getItemDisabled(this.at(n)); ) n++;
      return this.getItemValue(this.at(n));
    }
    get lastValue() {
      let n = this.size - 1;
      for (; this.getItemDisabled(this.at(n)); ) n--;
      return this.getItemValue(this.at(n));
    }
    *[Symbol.iterator]() {
      yield* this.items;
    }
  },
  Az = (e, n) => !!(e != null && e.toLowerCase().startsWith(n.toLowerCase())),
  zz = (e, n) => e.map((i, r) => e[(Math.max(n, 0) + r) % e.length]);
function Mo(e, n, ...i) {
  return [...e.slice(0, n), ...i, ...e.slice(n)];
}
function Gs(e, n, i) {
  n = [...n].sort((s, c) => s - c);
  const r = n.map((s) => e[s]);
  for (let s = n.length - 1; s >= 0; s--)
    e = [...e.slice(0, n[s]), ...e.slice(n[s] + 1)];
  return (
    (i = Math.max(0, i - n.filter((s) => s < i).length)),
    [...e.slice(0, i), ...r, ...e.slice(i)]
  );
}
var dr = new WeakMap(),
  Ws = new WeakMap(),
  qs = {},
  Gf = 0,
  dS = (e) => e && (e.host || dS(e.parentNode)),
  _z = (e, n) =>
    n
      .map((i) => {
        if (e.contains(i)) return i;
        const r = dS(i);
        return r && e.contains(r)
          ? r
          : (console.error(
              "[zag-js > ariaHidden] target",
              i,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter((i) => !!i),
  Nz = (e) =>
    e.localName === "next-route-announcer" ||
    e.localName === "script" ||
    e.hasAttribute("aria-live")
      ? !0
      : e.matches("[data-live-announcer]"),
  Iz = (e, n) => {
    const { parentNode: i, markerName: r, controlAttribute: s } = n,
      c = _z(i, Array.isArray(e) ? e : [e]);
    qs[r] || (qs[r] = new WeakMap());
    const d = qs[r],
      g = [],
      h = new Set(),
      m = new Set(c),
      p = (b) => {
        !b || h.has(b) || (h.add(b), p(b.parentNode));
      };
    c.forEach(p);
    const y = (b) => {
      !b ||
        m.has(b) ||
        Array.prototype.forEach.call(b.children, (x) => {
          if (h.has(x)) y(x);
          else
            try {
              if (Nz(x)) return;
              const E = x.getAttribute(s) === "true",
                R = (dr.get(x) || 0) + 1,
                O = (d.get(x) || 0) + 1;
              dr.set(x, R),
                d.set(x, O),
                g.push(x),
                R === 1 && E && Ws.set(x, !0),
                O === 1 && x.setAttribute(r, ""),
                E || x.setAttribute(s, "true");
            } catch (C) {
              console.error("[zag-js > ariaHidden] cannot operate on ", x, C);
            }
        });
    };
    return (
      y(i),
      h.clear(),
      Gf++,
      () => {
        g.forEach((b) => {
          const x = dr.get(b) - 1,
            C = d.get(b) - 1;
          dr.set(b, x),
            d.set(b, C),
            x || (Ws.has(b) || b.removeAttribute(s), Ws.delete(b)),
            C || b.removeAttribute(r);
        }),
          Gf--,
          Gf ||
            ((dr = new WeakMap()),
            (dr = new WeakMap()),
            (Ws = new WeakMap()),
            (qs = {}));
      }
    );
  },
  Pz = (e) => (Array.isArray(e) ? e[0] : e).ownerDocument.body,
  Vz = (e, n = Pz(e), i = "data-aria-hidden") => {
    if (n)
      return Iz(e, {
        parentNode: n,
        markerName: i,
        controlAttribute: "aria-hidden",
      });
  },
  Dz = (e) => {
    const n = requestAnimationFrame(() => e());
    return () => cancelAnimationFrame(n);
  };
function Mz(e, n = {}) {
  const { defer: i = !0 } = n,
    r = i ? Dz : (c) => c(),
    s = [];
  return (
    s.push(
      r(() => {
        const d = (typeof e == "function" ? e() : e).filter(Boolean);
        d.length !== 0 && s.push(Vz(d));
      }),
    ),
    () => {
      s.forEach((c) => (c == null ? void 0 : c()));
    }
  );
}
var fS = me("combobox").parts(
  "root",
  "clearTrigger",
  "content",
  "control",
  "input",
  "item",
  "itemGroup",
  "itemGroupLabel",
  "itemIndicator",
  "itemText",
  "label",
  "list",
  "positioner",
  "trigger",
);
fS.build();
var gS = (e) => new cu(e);
gS.empty = () => new cu({ items: [] });
var Lz = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.control) ?? `combobox:${e.id}:control`
    );
  },
  Hz = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.input) ?? `combobox:${e.id}:input`;
  },
  Bz = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ?? `combobox:${e.id}:content`
    );
  },
  jz = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ?? `combobox:${e.id}:popper`
    );
  },
  Uz = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ??
      `combobox:${e.id}:toggle-btn`
    );
  },
  $z = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.clearTrigger) ??
      `combobox:${e.id}:clear-btn`
    );
  },
  Ha = (e) => e.getById(Bz(e)),
  mr = (e) => e.getById(Hz(e)),
  vy = (e) => e.getById(jz(e)),
  by = (e) => e.getById(Lz(e)),
  Yo = (e) => e.getById(Uz(e)),
  yy = (e) => e.getById($z(e)),
  Fz = (e, n) => {
    if (n == null) return;
    const i = `[role=option][data-value="${CSS.escape(n)}"]`;
    return mT(Ha(e), i);
  },
  xy = (e) => {
    const n = mr(e);
    e.isActiveElement(n) || n == null || n.focus({ preventScroll: !0 });
  },
  Gz = (e) => {
    const n = Yo(e);
    e.isActiveElement(n) || n == null || n.focus({ preventScroll: !0 });
  },
  { guards: Wz, createMachine: qz, choose: Yz } = u1(),
  { and: gt, not: Kt } = Wz;
qz({
  props({ props: e }) {
    return {
      loopFocus: !0,
      openOnClick: !1,
      defaultValue: [],
      closeOnSelect: !e.multiple,
      allowCustomValue: !1,
      inputBehavior: "none",
      selectionBehavior: e.multiple ? "clear" : "replace",
      openOnKeyPress: !0,
      openOnChange: !0,
      composite: !0,
      navigate({ node: n }) {
        o1(n);
      },
      collection: gS.empty(),
      ...e,
      positioning: { placement: "bottom", sameWidth: !0, ...e.positioning },
      translations: {
        triggerLabel: "Toggle suggestions",
        clearTriggerLabel: "Clear value",
        ...e.translations,
      },
    };
  },
  initialState({ prop: e }) {
    return e("open") || e("defaultOpen") ? "suggesting" : "idle";
  },
  context({ prop: e, bindable: n, getContext: i }) {
    return {
      currentPlacement: n(() => ({ defaultValue: void 0 })),
      value: n(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        isEqual: kr,
        hash(r) {
          return r.join(",");
        },
        onChange(r) {
          var h;
          const s = i(),
            c = s.get("selectedItems"),
            d = e("collection"),
            g = r.map(
              (m) => c.find((y) => d.getItemValue(y) === m) || d.find(m),
            );
          s.set("selectedItems", g),
            s.set("valueAsString", d.stringifyItems(g)),
            (h = e("onValueChange")) == null || h({ value: r, items: g });
        },
      })),
      highlightedValue: n(() => ({
        defaultValue: e("defaultHighlightedValue") || null,
        value: e("highlightedValue"),
        onChange(r) {
          var c;
          const s = e("collection").find(r);
          (c = e("onHighlightChange")) == null ||
            c({ highlightedValue: r, highlightedItem: s });
        },
      })),
      inputValue: n(() => {
        let r = e("inputValue") || e("defaultInputValue") || "";
        const s = e("defaultValue") || e("value") || [];
        if (!r.trim() && !e("multiple")) {
          const c = e("collection").stringifyMany(s);
          r = Qo(e("selectionBehavior"), {
            preserve: r || c,
            replace: c,
            clear: "",
          });
        }
        return {
          defaultValue: r,
          value: e("inputValue"),
          onChange(c) {
            var d;
            (d = e("onInputValueChange")) == null || d({ inputValue: c });
          },
        };
      }),
      highlightedItem: n(() => {
        const r = e("highlightedValue");
        return { defaultValue: e("collection").find(r) };
      }),
      selectedItems: n(() => {
        const r = e("value") || e("defaultValue") || [];
        return { defaultValue: e("collection").findMany(r) };
      }),
      valueAsString: n(() => {
        const r = e("value") || e("defaultValue") || [];
        return { sync: !0, defaultValue: e("collection").stringifyMany(r) };
      }),
    };
  },
  computed: {
    isInputValueEmpty: ({ context: e }) => e.get("inputValue").length === 0,
    isInteractive: ({ prop: e }) => !(e("readOnly") || e("disabled")),
    autoComplete: ({ prop: e }) => e("inputBehavior") === "autocomplete",
    autoHighlight: ({ prop: e }) => e("inputBehavior") === "autohighlight",
    hasSelectedItems: ({ context: e }) => e.get("value").length > 0,
  },
  watch({ context: e, prop: n, track: i, action: r }) {
    i([() => e.hash("value")], () => {
      r(["syncSelectedItems"]);
    }),
      i([() => e.get("inputValue")], () => {
        r(["syncInputValue"]);
      }),
      i([() => e.get("highlightedValue")], () => {
        r(["syncHighlightedItem", "autofillInputValue"]);
      }),
      i([() => n("open")], () => {
        r(["toggleVisibility"]);
      });
  },
  on: {
    "SELECTED_ITEMS.SYNC": { actions: ["syncSelectedItems"] },
    "HIGHLIGHTED_VALUE.SET": { actions: ["setHighlightedItem"] },
    "ITEM.SELECT": { actions: ["selectItem"] },
    "ITEM.CLEAR": { actions: ["clearItem"] },
    "VALUE.SET": { actions: ["setValue"] },
    "INPUT_VALUE.SET": { actions: ["setInputValue"] },
    "POSITIONING.SET": { actions: ["reposition"] },
  },
  entry: Yz([{ guard: "autoFocus", actions: ["setInitialFocus"] }]),
  states: {
    idle: {
      tags: ["idle", "closed"],
      entry: ["scrollContentToTop", "clearHighlightedItem"],
      on: {
        "CONTROLLED.OPEN": { target: "interacting" },
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: [
              "setInitialFocus",
              "highlightFirstSelectedItem",
              "invokeOnOpen",
            ],
          },
          {
            target: "interacting",
            actions: [
              "setInitialFocus",
              "highlightFirstSelectedItem",
              "invokeOnOpen",
            ],
          },
        ],
        "INPUT.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"],
          },
          {
            target: "interacting",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"],
          },
        ],
        "INPUT.FOCUS": { target: "focused" },
        OPEN: [
          { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
          { target: "interacting", actions: ["invokeOnOpen"] },
        ],
        "VALUE.CLEAR": {
          target: "focused",
          actions: ["clearInputValue", "clearSelectedItems", "setInitialFocus"],
        },
      },
    },
    focused: {
      tags: ["focused", "closed"],
      entry: ["scrollContentToTop", "clearHighlightedItem"],
      on: {
        "CONTROLLED.OPEN": [
          { guard: "isChangeEvent", target: "suggesting" },
          { target: "interacting" },
        ],
        "INPUT.CHANGE": [
          {
            guard: gt("isOpenControlled", "openOnChange"),
            actions: [
              "setInputValue",
              "invokeOnOpen",
              "highlightFirstItemIfNeeded",
            ],
          },
          {
            guard: "openOnChange",
            target: "suggesting",
            actions: [
              "setInputValue",
              "invokeOnOpen",
              "highlightFirstItemIfNeeded",
            ],
          },
          { actions: ["setInputValue"] },
        ],
        "LAYER.INTERACT_OUTSIDE": { target: "idle" },
        "INPUT.ESCAPE": {
          guard: gt("isCustomValue", Kt("allowCustomValue")),
          actions: ["revertInputValue"],
        },
        "INPUT.BLUR": { target: "idle" },
        "INPUT.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"],
          },
          {
            target: "interacting",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"],
          },
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: [
              "setInitialFocus",
              "highlightFirstSelectedItem",
              "invokeOnOpen",
            ],
          },
          {
            target: "interacting",
            actions: [
              "setInitialFocus",
              "highlightFirstSelectedItem",
              "invokeOnOpen",
            ],
          },
        ],
        "INPUT.ARROW_DOWN": [
          {
            guard: gt("isOpenControlled", "autoComplete"),
            actions: ["invokeOnOpen"],
          },
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"],
          },
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"],
          },
          {
            target: "interacting",
            actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"],
          },
        ],
        "INPUT.ARROW_UP": [
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"],
          },
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"],
          },
          {
            target: "interacting",
            actions: ["highlightLastOrSelectedItem", "invokeOnOpen"],
          },
          {
            target: "interacting",
            actions: ["highlightLastOrSelectedItem", "invokeOnOpen"],
          },
        ],
        OPEN: [
          { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
          { target: "interacting", actions: ["invokeOnOpen"] },
        ],
        "VALUE.CLEAR": { actions: ["clearInputValue", "clearSelectedItems"] },
      },
    },
    interacting: {
      tags: ["open", "focused"],
      entry: ["setInitialFocus"],
      effects: [
        "scrollToHighlightedItem",
        "trackDismissableLayer",
        "trackPlacement",
        "hideOtherElements",
      ],
      on: {
        "CONTROLLED.CLOSE": [
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["setFinalFocus"],
          },
          { target: "idle" },
        ],
        "INPUT.HOME": { actions: ["highlightFirstItem"] },
        "INPUT.END": { actions: ["highlightLastItem"] },
        "INPUT.ARROW_DOWN": [
          {
            guard: gt("autoComplete", "isLastItemHighlighted"),
            actions: ["clearHighlightedItem", "scrollContentToTop"],
          },
          { actions: ["highlightNextItem"] },
        ],
        "INPUT.ARROW_UP": [
          {
            guard: gt("autoComplete", "isFirstItemHighlighted"),
            actions: ["clearHighlightedItem"],
          },
          { actions: ["highlightPrevItem"] },
        ],
        "INPUT.ENTER": [
          {
            guard: gt(
              "isOpenControlled",
              "isCustomValue",
              Kt("hasHighlightedItem"),
              Kt("allowCustomValue"),
            ),
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt(
              "isCustomValue",
              Kt("hasHighlightedItem"),
              Kt("allowCustomValue"),
            ),
            target: "focused",
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt("isOpenControlled", "closeOnSelect"),
            actions: ["selectHighlightedItem", "invokeOnClose"],
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: [
              "selectHighlightedItem",
              "invokeOnClose",
              "setFinalFocus",
            ],
          },
          { actions: ["selectHighlightedItem"] },
        ],
        "INPUT.CHANGE": [
          {
            guard: "autoComplete",
            target: "suggesting",
            actions: ["setInputValue"],
          },
          {
            target: "suggesting",
            actions: ["clearHighlightedItem", "setInputValue"],
          },
        ],
        "ITEM.POINTER_MOVE": { actions: ["setHighlightedItem"] },
        "ITEM.POINTER_LEAVE": { actions: ["clearHighlightedItem"] },
        "ITEM.CLICK": [
          {
            guard: gt("isOpenControlled", "closeOnSelect"),
            actions: ["selectItem", "invokeOnClose"],
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectItem", "invokeOnClose", "setFinalFocus"],
          },
          { actions: ["selectItem"] },
        ],
        "LAYER.ESCAPE": [
          {
            guard: gt("isOpenControlled", "autoComplete"),
            actions: ["syncInputValue", "invokeOnClose"],
          },
          {
            guard: "autoComplete",
            target: "focused",
            actions: ["syncInputValue", "invokeOnClose"],
          },
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose", "setFinalFocus"] },
        ],
        "TRIGGER.CLICK": [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose"] },
        ],
        "LAYER.INTERACT_OUTSIDE": [
          {
            guard: gt(
              "isOpenControlled",
              "isCustomValue",
              Kt("allowCustomValue"),
            ),
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt("isCustomValue", Kt("allowCustomValue")),
            target: "idle",
            actions: ["revertInputValue", "invokeOnClose"],
          },
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "idle", actions: ["invokeOnClose"] },
        ],
        CLOSE: [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose", "setFinalFocus"] },
        ],
        "VALUE.CLEAR": [
          {
            guard: "isOpenControlled",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose"],
          },
          {
            target: "focused",
            actions: [
              "clearInputValue",
              "clearSelectedItems",
              "invokeOnClose",
              "setFinalFocus",
            ],
          },
        ],
      },
    },
    suggesting: {
      tags: ["open", "focused"],
      effects: [
        "trackDismissableLayer",
        "scrollToHighlightedItem",
        "trackPlacement",
        "trackChildNodes",
        "hideOtherElements",
      ],
      entry: ["setInitialFocus"],
      on: {
        "CONTROLLED.CLOSE": [
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["setFinalFocus"],
          },
          { target: "idle" },
        ],
        CHILDREN_CHANGE: {
          guard: "autoHighlight",
          actions: ["highlightFirstItem"],
        },
        "INPUT.ARROW_DOWN": {
          target: "interacting",
          actions: ["highlightNextItem"],
        },
        "INPUT.ARROW_UP": {
          target: "interacting",
          actions: ["highlightPrevItem"],
        },
        "INPUT.HOME": {
          target: "interacting",
          actions: ["highlightFirstItem"],
        },
        "INPUT.END": { target: "interacting", actions: ["highlightLastItem"] },
        "INPUT.ENTER": [
          {
            guard: gt(
              "isOpenControlled",
              "isCustomValue",
              Kt("hasHighlightedItem"),
              Kt("allowCustomValue"),
            ),
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt(
              "isCustomValue",
              Kt("hasHighlightedItem"),
              Kt("allowCustomValue"),
            ),
            target: "focused",
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt("isOpenControlled", "closeOnSelect"),
            actions: ["selectHighlightedItem", "invokeOnClose"],
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: [
              "selectHighlightedItem",
              "invokeOnClose",
              "setFinalFocus",
            ],
          },
          { actions: ["selectHighlightedItem"] },
        ],
        "INPUT.CHANGE": { actions: ["setInputValue"] },
        "LAYER.ESCAPE": [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose"] },
        ],
        "ITEM.POINTER_MOVE": {
          target: "interacting",
          actions: ["setHighlightedItem"],
        },
        "ITEM.POINTER_LEAVE": { actions: ["clearHighlightedItem"] },
        "LAYER.INTERACT_OUTSIDE": [
          {
            guard: gt(
              "isOpenControlled",
              "isCustomValue",
              Kt("allowCustomValue"),
            ),
            actions: ["revertInputValue", "invokeOnClose"],
          },
          {
            guard: gt("isCustomValue", Kt("allowCustomValue")),
            target: "idle",
            actions: ["revertInputValue", "invokeOnClose"],
          },
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "idle", actions: ["invokeOnClose"] },
        ],
        "TRIGGER.CLICK": [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose"] },
        ],
        "ITEM.CLICK": [
          {
            guard: gt("isOpenControlled", "closeOnSelect"),
            actions: ["selectItem", "invokeOnClose"],
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectItem", "invokeOnClose", "setFinalFocus"],
          },
          { actions: ["selectItem"] },
        ],
        CLOSE: [
          { guard: "isOpenControlled", actions: ["invokeOnClose"] },
          { target: "focused", actions: ["invokeOnClose", "setFinalFocus"] },
        ],
        "VALUE.CLEAR": [
          {
            guard: "isOpenControlled",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose"],
          },
          {
            target: "focused",
            actions: [
              "clearInputValue",
              "clearSelectedItems",
              "invokeOnClose",
              "setFinalFocus",
            ],
          },
        ],
      },
    },
  },
  implementations: {
    guards: {
      isInputValueEmpty: ({ computed: e }) => e("isInputValueEmpty"),
      autoComplete: ({ computed: e, prop: n }) =>
        e("autoComplete") && !n("multiple"),
      autoHighlight: ({ computed: e }) => e("autoHighlight"),
      isFirstItemHighlighted: ({ prop: e, context: n }) =>
        e("collection").firstValue === n.get("highlightedValue"),
      isLastItemHighlighted: ({ prop: e, context: n }) =>
        e("collection").lastValue === n.get("highlightedValue"),
      isCustomValue: ({ context: e }) =>
        e.get("inputValue") !== e.get("valueAsString"),
      allowCustomValue: ({ prop: e }) => !!e("allowCustomValue"),
      hasHighlightedItem: ({ context: e }) => e.get("highlightedValue") != null,
      closeOnSelect: ({ prop: e }) => !!e("closeOnSelect"),
      isOpenControlled: ({ prop: e }) => e("open") != null,
      openOnChange: ({ prop: e, context: n }) => {
        const i = e("openOnChange");
        return qk(i)
          ? i
          : !!(i != null && i({ inputValue: n.get("inputValue") }));
      },
      restoreFocus: ({ event: e }) =>
        e.restoreFocus == null ? !0 : !!e.restoreFocus,
      isChangeEvent: ({ event: e }) => {
        var n;
        return (
          ((n = e.previousEvent) == null ? void 0 : n.type) === "INPUT.CHANGE"
        );
      },
      autoFocus: ({ prop: e }) => !!e("autoFocus"),
    },
    effects: {
      trackDismissableLayer({ send: e, prop: n, scope: i }) {
        return n("disableLayer")
          ? void 0
          : gl(() => Ha(i), {
              defer: !0,
              exclude: () => [mr(i), Yo(i), yy(i)],
              onFocusOutside: n("onFocusOutside"),
              onPointerDownOutside: n("onPointerDownOutside"),
              onInteractOutside: n("onInteractOutside"),
              onEscapeKeyDown(s) {
                s.preventDefault(),
                  s.stopPropagation(),
                  e({ type: "LAYER.ESCAPE" });
              },
              onDismiss() {
                e({ type: "LAYER.INTERACT_OUTSIDE", restoreFocus: !1 });
              },
            });
      },
      hideOtherElements({ scope: e }) {
        return Mz([mr(e), Ha(e), Yo(e), yy(e)]);
      },
      trackPlacement({ context: e, prop: n, scope: i }) {
        const r = () => by(i) || Yo(i),
          s = () => vy(i);
        return (
          e.set("currentPlacement", n("positioning").placement),
          On(r, s, {
            ...n("positioning"),
            defer: !0,
            onComplete(c) {
              e.set("currentPlacement", c.placement);
            },
          })
        );
      },
      trackChildNodes({ scope: e, computed: n, send: i }) {
        return n("autoHighlight")
          ? lT(() => Ha(e), { callback: () => i({ type: "CHILDREN_CHANGE" }) })
          : void 0;
      },
      scrollToHighlightedItem({ context: e, prop: n, scope: i, event: r }) {
        const s = mr(i);
        let c = [];
        const d = (m) => {
            const p = r.current().type.includes("POINTER"),
              y = e.get("highlightedValue");
            if (p || !y) return;
            const b = Fz(i, y),
              x = Ha(i),
              C = n("scrollToIndexFn");
            if (C) {
              const R = n("collection").indexOf(y);
              C({ index: R, immediate: m });
              return;
            }
            const E = Ce(() => {
              Wg(b, { rootEl: x, block: "nearest" });
            });
            c.push(E);
          },
          g = Ce(() => d(!0));
        c.push(g);
        const h = Zc(s, {
          attributes: ["aria-activedescendant"],
          callback: () => d(!1),
        });
        return (
          c.push(h),
          () => {
            c.forEach((m) => m());
          }
        );
      },
    },
    actions: {
      reposition({ context: e, prop: n, scope: i, event: r }) {
        On(
          () => by(i),
          () => vy(i),
          {
            ...n("positioning"),
            ...r.options,
            defer: !0,
            listeners: !1,
            onComplete(d) {
              e.set("currentPlacement", d.placement);
            },
          },
        );
      },
      setHighlightedItem(e) {
        const { context: n, event: i } = e;
        i.value != null && n.set("highlightedValue", i.value);
      },
      clearHighlightedItem(e) {
        const { context: n } = e;
        n.set("highlightedValue", null);
      },
      selectHighlightedItem(e) {
        var c;
        const { context: n, prop: i } = e,
          r = n.get("highlightedValue");
        if (!r) return;
        const s = i("multiple") ? Cc(n.get("value"), r) : [r];
        (c = i("onSelect")) == null || c({ value: s, itemValue: r }),
          n.set("value", s),
          n.set("inputValue", Lo(e));
      },
      selectItem(e) {
        const { context: n, event: i, flush: r, prop: s } = e;
        i.value != null &&
          r(() => {
            var d;
            const c = s("multiple") ? Cc(n.get("value"), i.value) : [i.value];
            (d = s("onSelect")) == null || d({ value: c, itemValue: i.value }),
              n.set("value", c),
              n.set("inputValue", Lo(e));
          });
      },
      clearItem(e) {
        const { context: n, event: i, flush: r } = e;
        i.value != null &&
          r(() => {
            const s = Mg(n.get("value"), i.value);
            n.set("value", s), n.set("inputValue", Lo(e));
          });
      },
      setInitialFocus({ scope: e }) {
        Ce(() => {
          xy(e);
        });
      },
      setFinalFocus({ scope: e }) {
        Ce(() => {
          const n = Yo(e);
          (n == null ? void 0 : n.dataset.focusable) == null ? xy(e) : Gz(e);
        });
      },
      syncInputValue({ context: e, scope: n, event: i }) {
        const r = mr(n);
        r &&
          ((r.value = e.get("inputValue")),
          queueMicrotask(() => {
            i.current().type !== "INPUT.CHANGE" && pR(r);
          }));
      },
      setInputValue({ context: e, event: n }) {
        e.set("inputValue", n.value);
      },
      clearInputValue({ context: e }) {
        e.set("inputValue", "");
      },
      revertInputValue({ context: e, prop: n, computed: i }) {
        const r = n("selectionBehavior"),
          s = Qo(r, {
            replace: i("hasSelectedItems") ? e.get("valueAsString") : "",
            preserve: e.get("inputValue"),
            clear: "",
          });
        e.set("inputValue", s);
      },
      setValue(e) {
        const { context: n, flush: i, event: r } = e;
        i(() => {
          n.set("value", r.value), n.set("inputValue", Lo(e));
        });
      },
      clearSelectedItems(e) {
        const { context: n, flush: i } = e;
        i(() => {
          n.set("value", []), n.set("inputValue", Lo(e));
        });
      },
      scrollContentToTop({ prop: e, scope: n }) {
        const i = e("scrollToIndexFn");
        if (i) i({ index: 0, immediate: !0 });
        else {
          const r = Ha(n);
          if (!r) return;
          r.scrollTop = 0;
        }
      },
      invokeOnOpen({ prop: e }) {
        var n;
        (n = e("onOpenChange")) == null || n({ open: !0 });
      },
      invokeOnClose({ prop: e }) {
        var n;
        (n = e("onOpenChange")) == null || n({ open: !1 });
      },
      highlightFirstItem({ context: e, prop: n, scope: i }) {
        (Ha(i) ? queueMicrotask : Ce)(() => {
          const s = n("collection").firstValue;
          s && e.set("highlightedValue", s);
        });
      },
      highlightFirstItemIfNeeded({ computed: e, action: n }) {
        e("autoHighlight") && n(["highlightFirstItem"]);
      },
      highlightLastItem({ context: e, prop: n, scope: i }) {
        (Ha(i) ? queueMicrotask : Ce)(() => {
          const s = n("collection").lastValue;
          s && e.set("highlightedValue", s);
        });
      },
      highlightNextItem({ context: e, prop: n }) {
        let i = null;
        const r = e.get("highlightedValue"),
          s = n("collection");
        r
          ? ((i = s.getNextValue(r)),
            !i && n("loopFocus") && (i = s.firstValue))
          : (i = s.firstValue),
          i && e.set("highlightedValue", i);
      },
      highlightPrevItem({ context: e, prop: n }) {
        let i = null;
        const r = e.get("highlightedValue"),
          s = n("collection");
        r
          ? ((i = s.getPreviousValue(r)),
            !i && n("loopFocus") && (i = s.lastValue))
          : (i = s.lastValue),
          i && e.set("highlightedValue", i);
      },
      highlightFirstSelectedItem({ context: e, prop: n }) {
        Ce(() => {
          const [i] = n("collection").sort(e.get("value"));
          i && e.set("highlightedValue", i);
        });
      },
      highlightFirstOrSelectedItem({ context: e, prop: n, computed: i }) {
        Ce(() => {
          let r = null;
          i("hasSelectedItems")
            ? (r = n("collection").sort(e.get("value"))[0])
            : (r = n("collection").firstValue),
            r && e.set("highlightedValue", r);
        });
      },
      highlightLastOrSelectedItem({ context: e, prop: n, computed: i }) {
        Ce(() => {
          const r = n("collection");
          let s = null;
          i("hasSelectedItems")
            ? (s = r.sort(e.get("value"))[0])
            : (s = r.lastValue),
            s && e.set("highlightedValue", s);
        });
      },
      autofillInputValue({
        context: e,
        computed: n,
        prop: i,
        event: r,
        scope: s,
      }) {
        const c = mr(s),
          d = i("collection");
        if (!n("autoComplete") || !c || !r.keypress) return;
        const g = d.stringify(e.get("highlightedValue"));
        Ce(() => {
          c.value = g || e.get("inputValue");
        });
      },
      syncSelectedItems(e) {
        const { context: n, prop: i } = e,
          r = Qo(i("selectionBehavior"), {
            preserve: n.get("inputValue"),
            replace: i("collection").stringifyMany(n.get("value")),
            clear: "",
          });
        n.set("selectedItems", Xz(e)), n.set("inputValue", r);
      },
      syncHighlightedItem({ context: e, prop: n }) {
        const i = n("collection").find(e.get("highlightedValue"));
        e.set("highlightedItem", i);
      },
      toggleVisibility({ event: e, send: n, prop: i }) {
        n({
          type: i("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE",
          previousEvent: e,
        });
      },
    },
  },
});
function Lo({ context: e, prop: n }) {
  return Qo(n("selectionBehavior"), {
    preserve: e.get("inputValue"),
    replace: e.get("valueAsString"),
    clear: "",
  });
}
function Xz({ context: e, prop: n }) {
  const i = n("collection");
  return e.get("value").map((r) => {
    const s = e.get("selectedItems").find((c) => i.getItemValue(c) === r);
    return s || i.find(r);
  });
}
ve()([
  "allowCustomValue",
  "autoFocus",
  "closeOnSelect",
  "collection",
  "composite",
  "defaultHighlightedValue",
  "defaultInputValue",
  "defaultOpen",
  "defaultValue",
  "dir",
  "disabled",
  "disableLayer",
  "form",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "inputBehavior",
  "inputValue",
  "invalid",
  "loopFocus",
  "multiple",
  "name",
  "navigate",
  "onFocusOutside",
  "onHighlightChange",
  "onInputValueChange",
  "onInteractOutside",
  "onOpenChange",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "onValueChange",
  "open",
  "openOnChange",
  "openOnClick",
  "openOnKeyPress",
  "placeholder",
  "positioning",
  "readOnly",
  "required",
  "scrollToIndexFn",
  "selectionBehavior",
  "translations",
  "value",
]);
ve()(["htmlFor"]);
ve()(["id"]);
ve()(["item", "persistFocus"]);
var uh = me("dialog").parts(
  "trigger",
  "backdrop",
  "positioner",
  "content",
  "title",
  "description",
  "closeTrigger",
);
uh.build();
ve()([
  "aria-label",
  "closeOnEscape",
  "closeOnInteractOutside",
  "dir",
  "finalFocusEl",
  "getRootNode",
  "getRootNode",
  "id",
  "id",
  "ids",
  "initialFocusEl",
  "modal",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "defaultOpen",
  "open",
  "persistentElements",
  "preventScroll",
  "restoreFocus",
  "role",
  "trapFocus",
]);
var hS = me("editable").parts(
  "root",
  "area",
  "label",
  "preview",
  "input",
  "editTrigger",
  "submitTrigger",
  "cancelTrigger",
  "control",
);
hS.build();
ve()([
  "activationMode",
  "autoResize",
  "dir",
  "disabled",
  "finalFocusEl",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "maxLength",
  "name",
  "onEditChange",
  "onFocusOutside",
  "onInteractOutside",
  "onPointerDownOutside",
  "onValueChange",
  "onValueCommit",
  "onValueRevert",
  "placeholder",
  "readOnly",
  "required",
  "selectOnFocus",
  "edit",
  "defaultEdit",
  "submitMode",
  "translations",
  "defaultValue",
  "value",
]);
const mS = me("field").parts(
  "root",
  "errorText",
  "helperText",
  "input",
  "label",
  "select",
  "textarea",
  "requiredIndicator",
);
mS.build();
const pS = me("fieldset").parts("root", "errorText", "helperText", "legend");
pS.build();
var vS = me("file-upload").parts(
  "root",
  "dropzone",
  "item",
  "itemDeleteTrigger",
  "itemGroup",
  "itemName",
  "itemPreview",
  "itemPreviewImage",
  "itemSizeText",
  "label",
  "trigger",
  "clearTrigger",
);
vS.build();
ve()([
  "accept",
  "allowDrop",
  "capture",
  "dir",
  "directory",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "locale",
  "maxFiles",
  "maxFileSize",
  "minFileSize",
  "name",
  "invalid",
  "onFileAccept",
  "onFileReject",
  "onFileChange",
  "preventDocumentDrop",
  "required",
  "translations",
  "transformFiles",
  "validate",
]);
ve()(["file"]);
const Kz = Symbol(),
  Sy = Object.getPrototypeOf,
  hg = new WeakMap(),
  Qz = (e) =>
    e &&
    (hg.has(e)
      ? hg.get(e)
      : Sy(e) === Object.prototype || Sy(e) === Array.prototype),
  Zz = (e) => (Qz(e) && e[Kz]) || null,
  Cy = (e, n = !0) => {
    hg.set(e, n);
  };
function Jz() {
  if (typeof globalThis < "u") return globalThis;
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
}
function bS(e, n) {
  const i = Jz();
  return i ? (i[e] || (i[e] = n()), i[e]) : n();
}
var gc = bS("__zag__refSet", () => new WeakSet()),
  e_ = (e) =>
    typeof e == "object" && e !== null && "$$typeof" in e && "props" in e,
  t_ = (e) => typeof e == "object" && e !== null && "__v_isVNode" in e,
  n_ = (e) =>
    typeof e == "object" &&
    e !== null &&
    "nodeType" in e &&
    typeof e.nodeName == "string",
  a_ = (e) => e_(e) || t_(e) || n_(e),
  mg = (e) => e !== null && typeof e == "object",
  Ey = (e) =>
    mg(e) &&
    !gc.has(e) &&
    (Array.isArray(e) || !(Symbol.iterator in e)) &&
    !a_(e) &&
    !(e instanceof WeakMap) &&
    !(e instanceof WeakSet) &&
    !(e instanceof Error) &&
    !(e instanceof Number) &&
    !(e instanceof Date) &&
    !(e instanceof String) &&
    !(e instanceof RegExp) &&
    !(e instanceof ArrayBuffer) &&
    !(e instanceof Promise),
  mi = bS("__zag__proxyStateMap", () => new WeakMap()),
  i_ = (
    e = Object.is,
    n = (g, h) => new Proxy(g, h),
    i = new WeakMap(),
    r = (g, h) => {
      const m = i.get(g);
      if ((m == null ? void 0 : m[0]) === h) return m[1];
      const p = Array.isArray(g) ? [] : Object.create(Object.getPrototypeOf(g));
      return (
        Cy(p, !0),
        i.set(g, [h, p]),
        Reflect.ownKeys(g).forEach((y) => {
          const b = Reflect.get(g, y);
          gc.has(b)
            ? (Cy(b, !1), (p[y] = b))
            : mi.has(b)
              ? (p[y] = l_(b))
              : (p[y] = b);
        }),
        Object.freeze(p)
      );
    },
    s = new WeakMap(),
    c = [1, 1],
    d = (g) => {
      if (!mg(g)) throw new Error("object required");
      const h = s.get(g);
      if (h) return h;
      let m = c[0];
      const p = new Set(),
        y = ($, j = ++c[0]) => {
          m !== j && ((m = j), p.forEach((U) => U($, j)));
        };
      let b = c[1];
      const x = ($ = ++c[1]) => (
          b !== $ &&
            !p.size &&
            ((b = $),
            E.forEach(([j]) => {
              const U = j[1]($);
              U > m && (m = U);
            })),
          m
        ),
        C = ($) => (j, U) => {
          const K = [...j];
          (K[1] = [$, ...K[1]]), y(K, U);
        },
        E = new Map(),
        R = ($, j) => {
          if (p.size) {
            const U = j[3](C($));
            E.set($, [j, U]);
          } else E.set($, [j]);
        },
        O = ($) => {
          var U;
          const j = E.get($);
          j && (E.delete($), (U = j[1]) == null || U.call(j));
        },
        A = ($) => (
          p.add($),
          p.size === 1 &&
            E.forEach(([U, K], re) => {
              const ne = U[3](C(re));
              E.set(re, [U, ne]);
            }),
          () => {
            p.delete($),
              p.size === 0 &&
                E.forEach(([U, K], re) => {
                  K && (K(), E.set(re, [U]));
                });
          }
        ),
        z = Array.isArray(g) ? [] : Object.create(Object.getPrototypeOf(g)),
        _ = n(z, {
          deleteProperty($, j) {
            const U = Reflect.get($, j);
            O(j);
            const K = Reflect.deleteProperty($, j);
            return K && y(["delete", [j], U]), K;
          },
          set($, j, U, K) {
            var he;
            const re = Reflect.has($, j),
              ne = Reflect.get($, j, K);
            if (re && (e(ne, U) || (s.has(U) && e(ne, s.get(U))))) return !0;
            O(j), mg(U) && (U = Zz(U) || U);
            let pe = U;
            if (
              !((he = Object.getOwnPropertyDescriptor($, j)) != null && he.set)
            ) {
              !mi.has(U) && Ey(U) && (pe = yS(U));
              const J = !gc.has(pe) && mi.get(pe);
              J && R(j, J);
            }
            return Reflect.set($, j, pe, K), y(["set", [j], U, ne]), !0;
          },
        });
      s.set(g, _);
      const Y = [z, x, r, A];
      return (
        mi.set(_, Y),
        Reflect.ownKeys(g).forEach(($) => {
          const j = Object.getOwnPropertyDescriptor(g, $);
          j.get || j.set ? Object.defineProperty(z, $, j) : (_[$] = g[$]);
        }),
        _
      );
    },
  ) => [d, mi, gc, e, n, Ey, i, r, s, c],
  [r_] = i_();
function yS(e = {}) {
  return r_(e);
}
function o_(e, n, i) {
  const r = mi.get(e);
  let s;
  const c = [],
    d = r[3];
  let g = !1;
  const m = d((p) => {
    c.push(p),
      s ||
        (s = Promise.resolve().then(() => {
          (s = void 0), g && n(c.splice(0));
        }));
  });
  return (
    (g = !0),
    () => {
      (g = !1), m();
    }
  );
}
function l_(e) {
  const n = mi.get(e),
    [i, r, s] = n;
  return s(i, r());
}
var xS = me("hoverCard").parts(
  "arrow",
  "arrowTip",
  "trigger",
  "positioner",
  "content",
);
xS.build();
var s_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ?? `hover-card:${e.id}:trigger`
    );
  },
  c_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ?? `hover-card:${e.id}:content`
    );
  },
  u_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ??
      `hover-card:${e.id}:popper`
    );
  },
  Wf = (e) => e.getById(s_(e)),
  d_ = (e) => e.getById(c_(e)),
  Oy = (e) => e.getById(u_(e)),
  { not: Ys, and: wy } = Ga();
wy("isOpenControlled", Ys("isPointer")),
  Ys("isPointer"),
  wy("isOpenControlled", Ys("isPointer")),
  Ys("isPointer");
ve()([
  "closeDelay",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "onOpenChange",
  "defaultOpen",
  "open",
  "openDelay",
  "positioning",
  "onInteractOutside",
  "onPointerDownOutside",
  "onFocusOutside",
]);
var SS = me("menu").parts(
  "arrow",
  "arrowTip",
  "content",
  "contextTrigger",
  "indicator",
  "item",
  "itemGroup",
  "itemGroupLabel",
  "itemIndicator",
  "itemText",
  "positioner",
  "separator",
  "trigger",
  "triggerItem",
);
SS.build();
var CS = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.trigger) ?? `menu:${e.id}:trigger`;
  },
  f_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.contextTrigger) ??
      `menu:${e.id}:ctx-trigger`
    );
  },
  ES = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.content) ?? `menu:${e.id}:content`;
  },
  g_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ?? `menu:${e.id}:popper`
    );
  },
  pg = (e, n) => `${e.id}/${n}`,
  ui = (e) => (e == null ? void 0 : e.dataset.value) ?? null,
  Ba = (e) => e.getById(ES(e)),
  ky = (e) => e.getById(g_(e)),
  Xs = (e) => e.getById(CS(e)),
  h_ = (e, n) => (n ? e.getById(pg(e, n)) : null),
  Ry = (e) => e.getById(f_(e)),
  hl = (e) => {
    const i = `[role^="menuitem"][data-ownedby=${CSS.escape(ES(e))}]:not([data-disabled])`;
    return Rc(Ba(e), i);
  },
  m_ = (e) => Fx(hl(e)),
  p_ = (e) => Gx(hl(e)),
  dh = (e, n) => (n ? e.id === n || e.dataset.value === n : !1),
  v_ = (e, n) => {
    const i = hl(e),
      r = i.findIndex((s) => dh(s, n.value));
    return Uk(i, r, { loop: n.loop ?? n.loopFocus });
  },
  b_ = (e, n) => {
    const i = hl(e),
      r = i.findIndex((s) => dh(s, n.value));
    return Fk(i, r, { loop: n.loop ?? n.loopFocus });
  },
  y_ = (e, n) => {
    const i = hl(e),
      r = i.find((s) => dh(s, n.value));
    return Kg(i, {
      state: n.typeaheadState,
      key: n.key,
      activeId: (r == null ? void 0 : r.id) ?? null,
    });
  },
  x_ = (e) => {
    var n;
    return (
      !!(
        (n = e == null ? void 0 : e.getAttribute("role")) != null &&
        n.startsWith("menuitem")
      ) && !!(e != null && e.hasAttribute("aria-controls"))
    );
  },
  S_ = "menu:select";
function C_(e, n) {
  if (!e) return;
  const i = Et(e),
    r = new i.CustomEvent(S_, { detail: { value: n } });
  e.dispatchEvent(r);
}
var { not: fn, and: fr, or: E_ } = Ga();
fn("isSubmenu"),
  E_("isOpenAutoFocusEvent", "isArrowDownEvent"),
  fr(fn("isTriggerItem"), "isOpenControlled"),
  fn("isTriggerItem"),
  fr("isSubmenu", "isOpenControlled"),
  fn("isPointerSuspended"),
  fr(fn("isPointerSuspended"), fn("isTriggerItem")),
  fr(
    fn("isTriggerItemHighlighted"),
    fn("isHighlightedItemEditable"),
    "closeOnSelect",
    "isOpenControlled",
  ),
  fr(
    fn("isTriggerItemHighlighted"),
    fn("isHighlightedItemEditable"),
    "closeOnSelect",
  ),
  fr(fn("isTriggerItemHighlighted"), fn("isHighlightedItemEditable"));
function Ty(e) {
  let n = e.parent;
  for (; n && n.computed("isSubmenu"); ) n = n.refs.get("parent");
  n == null || n.send({ type: "CLOSE" });
}
function O_(e, n) {
  return e ? cz(e, n) : !1;
}
function w_(e, n, i) {
  const r = Object.keys(e).length > 0;
  if (!n) return null;
  if (!r) return pg(i, n);
  for (const s in e) {
    const c = e[s],
      d = CS(c.scope);
    if (d === n) return d;
  }
  return pg(i, n);
}
ve()([
  "anchorPoint",
  "aria-label",
  "closeOnSelect",
  "composite",
  "defaultHighlightedValue",
  "defaultOpen",
  "dir",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "loopFocus",
  "navigate",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onHighlightChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "open",
  "positioning",
  "typeahead",
]);
ve()(["closeOnSelect", "disabled", "value", "valueText"]);
ve()(["htmlFor"]);
ve()(["id"]);
ve()([
  "checked",
  "closeOnSelect",
  "disabled",
  "onCheckedChange",
  "type",
  "value",
  "valueText",
]);
let qf = new Map(),
  vg = !1;
try {
  vg =
    new Intl.NumberFormat("de-DE", {
      signDisplay: "exceptZero",
    }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
let Mc = !1;
try {
  Mc =
    new Intl.NumberFormat("de-DE", {
      style: "unit",
      unit: "degree",
    }).resolvedOptions().style === "unit";
} catch {}
const OS = {
  degree: {
    narrow: { default: "°", "ja-JP": " 度", "zh-TW": "度", "sl-SI": " °" },
  },
};
class k_ {
  format(n) {
    let i = "";
    if (
      (!vg && this.options.signDisplay != null
        ? (i = T_(this.numberFormatter, this.options.signDisplay, n))
        : (i = this.numberFormatter.format(n)),
      this.options.style === "unit" && !Mc)
    ) {
      var r;
      let {
        unit: s,
        unitDisplay: c = "short",
        locale: d,
      } = this.resolvedOptions();
      if (!s) return i;
      let g = (r = OS[s]) === null || r === void 0 ? void 0 : r[c];
      i += g[d] || g.default;
    }
    return i;
  }
  formatToParts(n) {
    return this.numberFormatter.formatToParts(n);
  }
  formatRange(n, i) {
    if (typeof this.numberFormatter.formatRange == "function")
      return this.numberFormatter.formatRange(n, i);
    if (i < n) throw new RangeError("End date must be >= start date");
    return `${this.format(n)} – ${this.format(i)}`;
  }
  formatRangeToParts(n, i) {
    if (typeof this.numberFormatter.formatRangeToParts == "function")
      return this.numberFormatter.formatRangeToParts(n, i);
    if (i < n) throw new RangeError("End date must be >= start date");
    let r = this.numberFormatter.formatToParts(n),
      s = this.numberFormatter.formatToParts(i);
    return [
      ...r.map((c) => ({ ...c, source: "startRange" })),
      { type: "literal", value: " – ", source: "shared" },
      ...s.map((c) => ({ ...c, source: "endRange" })),
    ];
  }
  resolvedOptions() {
    let n = this.numberFormatter.resolvedOptions();
    return (
      !vg &&
        this.options.signDisplay != null &&
        (n = { ...n, signDisplay: this.options.signDisplay }),
      !Mc &&
        this.options.style === "unit" &&
        (n = {
          ...n,
          style: "unit",
          unit: this.options.unit,
          unitDisplay: this.options.unitDisplay,
        }),
      n
    );
  }
  constructor(n, i = {}) {
    (this.numberFormatter = R_(n, i)), (this.options = i);
  }
}
function R_(e, n = {}) {
  let { numberingSystem: i } = n;
  if (
    (i &&
      e.includes("-nu-") &&
      (e.includes("-u-") || (e += "-u-"), (e += `-nu-${i}`)),
    n.style === "unit" && !Mc)
  ) {
    var r;
    let { unit: d, unitDisplay: g = "short" } = n;
    if (!d) throw new Error('unit option must be provided with style: "unit"');
    if (!(!((r = OS[d]) === null || r === void 0) && r[g]))
      throw new Error(`Unsupported unit ${d} with unitDisplay = ${g}`);
    n = { ...n, style: "decimal" };
  }
  let s =
    e +
    (n
      ? Object.entries(n)
          .sort((d, g) => (d[0] < g[0] ? -1 : 1))
          .join()
      : "");
  if (qf.has(s)) return qf.get(s);
  let c = new Intl.NumberFormat(e, n);
  return qf.set(s, c), c;
}
function T_(e, n, i) {
  if (n === "auto") return e.format(i);
  if (n === "never") return e.format(Math.abs(i));
  {
    let r = !1;
    if (
      (n === "always"
        ? (r = i > 0 || Object.is(i, 0))
        : n === "exceptZero" &&
          (Object.is(i, -0) || Object.is(i, 0)
            ? (i = Math.abs(i))
            : (r = i > 0)),
      r)
    ) {
      let s = e.format(-i),
        c = e.format(i),
        d = s.replace(c, "").replace(/\u200e|\u061C/, "");
      return (
        [...d].length !== 1 &&
          console.warn(
            "@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case",
          ),
        s.replace(c, "!!!").replace(d, "+").replace("!!!", c)
      );
    } else return e.format(i);
  }
}
const A_ = new RegExp("^.*\\(.*\\).*$"),
  z_ = ["latn", "arab", "hanidec", "deva", "beng"];
class wS {
  parse(n) {
    return Yf(this.locale, this.options, n).parse(n);
  }
  isValidPartialNumber(n, i, r) {
    return Yf(this.locale, this.options, n).isValidPartialNumber(n, i, r);
  }
  getNumberingSystem(n) {
    return Yf(this.locale, this.options, n).options.numberingSystem;
  }
  constructor(n, i = {}) {
    (this.locale = n), (this.options = i);
  }
}
const Ay = new Map();
function Yf(e, n, i) {
  let r = zy(e, n);
  if (!e.includes("-nu-") && !r.isValidPartialNumber(i)) {
    for (let s of z_)
      if (s !== r.options.numberingSystem) {
        let c = zy(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + s, n);
        if (c.isValidPartialNumber(i)) return c;
      }
  }
  return r;
}
function zy(e, n) {
  let i =
      e +
      (n
        ? Object.entries(n)
            .sort((s, c) => (s[0] < c[0] ? -1 : 1))
            .join()
        : ""),
    r = Ay.get(i);
  return r || ((r = new __(e, n)), Ay.set(i, r)), r;
}
class __ {
  parse(n) {
    let i = this.sanitize(n);
    if (
      (this.symbols.group && (i = Ho(i, this.symbols.group, "")),
      this.symbols.decimal && (i = i.replace(this.symbols.decimal, ".")),
      this.symbols.minusSign && (i = i.replace(this.symbols.minusSign, "-")),
      (i = i.replace(this.symbols.numeral, this.symbols.index)),
      this.options.style === "percent")
    ) {
      let d = i.indexOf("-");
      (i = i.replace("-", "")), (i = i.replace("+", ""));
      let g = i.indexOf(".");
      g === -1 && (g = i.length),
        (i = i.replace(".", "")),
        g - 2 === 0
          ? (i = `0.${i}`)
          : g - 2 === -1
            ? (i = `0.0${i}`)
            : g - 2 === -2
              ? (i = "0.00")
              : (i = `${i.slice(0, g - 2)}.${i.slice(g - 2)}`),
        d > -1 && (i = `-${i}`);
    }
    let r = i ? +i : NaN;
    if (isNaN(r)) return NaN;
    if (this.options.style === "percent") {
      var s, c;
      let d = {
        ...this.options,
        style: "decimal",
        minimumFractionDigits: Math.min(
          ((s = this.options.minimumFractionDigits) !== null && s !== void 0
            ? s
            : 0) + 2,
          20,
        ),
        maximumFractionDigits: Math.min(
          ((c = this.options.maximumFractionDigits) !== null && c !== void 0
            ? c
            : 0) + 2,
          20,
        ),
      };
      return new wS(this.locale, d).parse(new k_(this.locale, d).format(r));
    }
    return (
      this.options.currencySign === "accounting" && A_.test(n) && (r = -1 * r),
      r
    );
  }
  sanitize(n) {
    return (
      (n = n.replace(this.symbols.literals, "")),
      this.symbols.minusSign && (n = n.replace("-", this.symbols.minusSign)),
      this.options.numberingSystem === "arab" &&
        (this.symbols.decimal &&
          ((n = n.replace(",", this.symbols.decimal)),
          (n = n.replace("،", this.symbols.decimal))),
        this.symbols.group && (n = Ho(n, ".", this.symbols.group))),
      this.options.locale === "fr-FR" &&
        this.symbols.group &&
        ((n = Ho(n, " ", this.symbols.group)),
        (n = Ho(n, /\u00A0/g, this.symbols.group))),
      n
    );
  }
  isValidPartialNumber(n, i = -1 / 0, r = 1 / 0) {
    return (
      (n = this.sanitize(n)),
      this.symbols.minusSign && n.startsWith(this.symbols.minusSign) && i < 0
        ? (n = n.slice(this.symbols.minusSign.length))
        : this.symbols.plusSign &&
          n.startsWith(this.symbols.plusSign) &&
          r > 0 &&
          (n = n.slice(this.symbols.plusSign.length)),
      (this.symbols.group && n.startsWith(this.symbols.group)) ||
      (this.symbols.decimal &&
        n.indexOf(this.symbols.decimal) > -1 &&
        this.options.maximumFractionDigits === 0)
        ? !1
        : (this.symbols.group && (n = Ho(n, this.symbols.group, "")),
          (n = n.replace(this.symbols.numeral, "")),
          this.symbols.decimal && (n = n.replace(this.symbols.decimal, "")),
          n.length === 0)
    );
  }
  constructor(n, i = {}) {
    (this.locale = n),
      i.roundingIncrement !== 1 &&
        i.roundingIncrement != null &&
        (i.maximumFractionDigits == null && i.minimumFractionDigits == null
          ? ((i.maximumFractionDigits = 0), (i.minimumFractionDigits = 0))
          : i.maximumFractionDigits == null
            ? (i.maximumFractionDigits = i.minimumFractionDigits)
            : i.minimumFractionDigits == null &&
              (i.minimumFractionDigits = i.maximumFractionDigits)),
      (this.formatter = new Intl.NumberFormat(n, i)),
      (this.options = this.formatter.resolvedOptions()),
      (this.symbols = I_(n, this.formatter, this.options, i));
    var r, s;
    this.options.style === "percent" &&
      (((r = this.options.minimumFractionDigits) !== null && r !== void 0
        ? r
        : 0) > 18 ||
        ((s = this.options.maximumFractionDigits) !== null && s !== void 0
          ? s
          : 0) > 18) &&
      console.warn(
        "NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.",
      );
  }
}
const _y = new Set([
    "decimal",
    "fraction",
    "integer",
    "minusSign",
    "plusSign",
    "group",
  ]),
  N_ = [0, 4, 2, 1, 11, 20, 3, 7, 100, 21, 0.1, 1.1];
function I_(e, n, i, r) {
  var s, c, d, g;
  let h = new Intl.NumberFormat(e, {
      ...i,
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 21,
      roundingIncrement: 1,
      roundingPriority: "auto",
      roundingMode: "halfExpand",
    }),
    m = h.formatToParts(-10000.111),
    p = h.formatToParts(10000.111),
    y = N_.map((K) => h.formatToParts(K));
  var b;
  let x =
      (b =
        (s = m.find((K) => K.type === "minusSign")) === null || s === void 0
          ? void 0
          : s.value) !== null && b !== void 0
        ? b
        : "-",
    C =
      (c = p.find((K) => K.type === "plusSign")) === null || c === void 0
        ? void 0
        : c.value;
  !C &&
    ((r == null ? void 0 : r.signDisplay) === "exceptZero" ||
      (r == null ? void 0 : r.signDisplay) === "always") &&
    (C = "+");
  let R =
      (d = new Intl.NumberFormat(e, {
        ...i,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
        .formatToParts(0.001)
        .find((K) => K.type === "decimal")) === null || d === void 0
        ? void 0
        : d.value,
    O =
      (g = m.find((K) => K.type === "group")) === null || g === void 0
        ? void 0
        : g.value,
    A = m.filter((K) => !_y.has(K.type)).map((K) => Ny(K.value)),
    z = y.flatMap((K) =>
      K.filter((re) => !_y.has(re.type)).map((re) => Ny(re.value)),
    ),
    B = [...new Set([...A, ...z])].sort((K, re) => re.length - K.length),
    _ =
      B.length === 0
        ? new RegExp("[\\p{White_Space}]", "gu")
        : new RegExp(`${B.join("|")}|[\\p{White_Space}]`, "gu"),
    Y = [
      ...new Intl.NumberFormat(i.locale, { useGrouping: !1 }).format(
        9876543210,
      ),
    ].reverse(),
    $ = new Map(Y.map((K, re) => [K, re])),
    j = new RegExp(`[${Y.join("")}]`, "g");
  return {
    minusSign: x,
    plusSign: C,
    decimal: R,
    group: O,
    literals: _,
    numeral: j,
    index: (K) => String($.get(K)),
  };
}
function Ho(e, n, i) {
  return e.replaceAll ? e.replaceAll(n, i) : e.split(n).join(i);
}
function Ny(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var kS = me("numberInput").parts(
  "root",
  "label",
  "input",
  "control",
  "valueText",
  "incrementTrigger",
  "decrementTrigger",
  "scrubber",
);
kS.build();
var P_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.input) ?? `number-input:${e.id}:input`
    );
  },
  V_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.incrementTrigger) ??
      `number-input:${e.id}:inc`
    );
  },
  D_ = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.decrementTrigger) ??
      `number-input:${e.id}:dec`
    );
  },
  RS = (e) => `number-input:${e.id}:cursor`,
  Ks = (e) => e.getById(P_(e)),
  M_ = (e) => e.getById(V_(e)),
  L_ = (e) => e.getById(D_(e)),
  TS = (e) => e.getDoc().getElementById(RS(e)),
  H_ = (e, n) => {
    let i = null;
    return (
      n === "increment" && (i = M_(e)), n === "decrement" && (i = L_(e)), i
    );
  },
  B_ = (e, n) => {
    if (!jg())
      return (
        $_(e, n),
        () => {
          var i;
          (i = TS(e)) == null || i.remove();
        }
      );
  },
  j_ = (e) => {
    const n = e.getDoc(),
      i = n.documentElement,
      r = n.body;
    return (
      (r.style.pointerEvents = "none"),
      (i.style.userSelect = "none"),
      (i.style.cursor = "ew-resize"),
      () => {
        (r.style.pointerEvents = ""),
          (i.style.userSelect = ""),
          (i.style.cursor = ""),
          i.style.length || i.removeAttribute("style"),
          r.style.length || r.removeAttribute("style");
      }
    );
  },
  U_ = (e, n) => {
    const { point: i, isRtl: r, event: s } = n,
      c = e.getWin(),
      d = Lf(s.movementX, c.devicePixelRatio),
      g = Lf(s.movementY, c.devicePixelRatio);
    let h = d > 0 ? "increment" : d < 0 ? "decrement" : null;
    r && h === "increment" && (h = "decrement"),
      r && h === "decrement" && (h = "increment");
    const m = { x: i.x + d, y: i.y + g },
      p = c.innerWidth,
      y = Lf(7.5, c.devicePixelRatio);
    return (m.x = iR(m.x + y, p) - y), { hint: h, point: m };
  },
  $_ = (e, n) => {
    const i = e.getDoc(),
      r = i.createElement("div");
    (r.className = "scrubber--cursor"),
      (r.id = RS(e)),
      Object.assign(r.style, {
        width: "15px",
        height: "15px",
        position: "fixed",
        pointerEvents: "none",
        left: "0px",
        top: "0px",
        zIndex: bR,
        transform: n ? `translate3d(${n.x}px, ${n.y}px, 0px)` : void 0,
        willChange: "transform",
      }),
      (r.innerHTML = `
      <svg width="46" height="15" style="left: -15.5px; position: absolute; top: 0; filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 1px 1.1px);">
        <g transform="translate(2 3)">
          <path fill-rule="evenodd" d="M 15 4.5L 15 2L 11.5 5.5L 15 9L 15 6.5L 31 6.5L 31 9L 34.5 5.5L 31 2L 31 4.5Z" style="stroke-width: 2px; stroke: white;"></path>
          <path fill-rule="evenodd" d="M 15 4.5L 15 2L 11.5 5.5L 15 9L 15 6.5L 31 6.5L 31 9L 34.5 5.5L 31 2L 31 4.5Z"></path>
        </g>
      </svg>`),
      i.body.appendChild(r);
  };
function F_(e) {
  if (!(!e || e.ownerDocument.activeElement !== e))
    try {
      const { selectionStart: n, selectionEnd: i, value: r } = e,
        s = r.substring(0, n),
        c = r.substring(i);
      return { start: n, end: i, value: r, beforeTxt: s, afterTxt: c };
    } catch {}
}
function G_(e, n) {
  if (!(!e || e.ownerDocument.activeElement !== e)) {
    if (!n) {
      e.setSelectionRange(e.value.length, e.value.length);
      return;
    }
    try {
      const { value: i } = e,
        { beforeTxt: r = "", afterTxt: s = "", start: c } = n;
      let d = i.length;
      if (i.endsWith(s)) d = i.length - s.length;
      else if (i.startsWith(r)) d = r.length;
      else if (c != null) {
        const g = r[c - 1],
          h = i.indexOf(g, c - 1);
        h !== -1 && (d = h + 1);
      }
      e.setSelectionRange(d, d);
    } catch {}
  }
}
var W_ = (e, n = {}) => new Intl.NumberFormat(e, n),
  q_ = (e, n = {}) => new wS(e, n),
  Xf = (e, n) => {
    const { prop: i, computed: r } = n;
    return i("formatOptions") ? r("parser").parse(String(e)) : parseFloat(e);
  },
  di = (e, n) => {
    const { prop: i, computed: r } = n;
    return Number.isNaN(e)
      ? ""
      : i("formatOptions")
        ? r("formatter").format(e)
        : e.toString();
  },
  Y_ = (e, n) => {
    let i = e !== void 0 && !Number.isNaN(e) ? e : 1;
    return (
      (n == null ? void 0 : n.style) === "percent" &&
        (e === void 0 || Number.isNaN(e)) &&
        (i = 0.01),
      i
    );
  },
  { choose: X_, guards: K_, createMachine: Q_ } = u1(),
  { not: Iy, and: Py } = K_;
Q_({
  props({ props: e }) {
    const n = Y_(e.step, e.formatOptions);
    return {
      dir: "ltr",
      locale: "en-US",
      focusInputOnChange: !0,
      clampValueOnBlur: !e.allowOverflow,
      allowOverflow: !1,
      inputMode: "decimal",
      pattern: "[0-9]*(.[0-9]+)?",
      defaultValue: "",
      step: n,
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
      spinOnPress: !0,
      ...e,
      translations: {
        incrementLabel: "increment value",
        decrementLabel: "decrease value",
        ...e.translations,
      },
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop: e, bindable: n, getComputed: i }) {
    return {
      value: n(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        onChange(r) {
          var d;
          const s = i(),
            c = Xf(r, { computed: s, prop: e });
          (d = e("onValueChange")) == null || d({ value: r, valueAsNumber: c });
        },
      })),
      hint: n(() => ({ defaultValue: null })),
      scrubberCursorPoint: n(() => ({
        defaultValue: null,
        hash(r) {
          return r ? `x:${r.x}, y:${r.y}` : "";
        },
      })),
      fieldsetDisabled: n(() => ({ defaultValue: !1 })),
    };
  },
  computed: {
    isRtl: ({ prop: e }) => e("dir") === "rtl",
    valueAsNumber: ({ context: e, computed: n, prop: i }) =>
      Xf(e.get("value"), { computed: n, prop: i }),
    formattedValue: ({ computed: e, prop: n }) =>
      di(e("valueAsNumber"), { computed: e, prop: n }),
    isAtMin: ({ computed: e, prop: n }) => oR(e("valueAsNumber"), n("min")),
    isAtMax: ({ computed: e, prop: n }) => rR(e("valueAsNumber"), n("max")),
    isOutOfRange: ({ computed: e, prop: n }) =>
      !lR(e("valueAsNumber"), n("min"), n("max")),
    isValueEmpty: ({ context: e }) => e.get("value") === "",
    isDisabled: ({ prop: e, context: n }) =>
      !!e("disabled") || n.get("fieldsetDisabled"),
    canIncrement: ({ prop: e, computed: n }) =>
      e("allowOverflow") || !n("isAtMax"),
    canDecrement: ({ prop: e, computed: n }) =>
      e("allowOverflow") || !n("isAtMin"),
    valueText: ({ prop: e, context: n }) => {
      var i, r;
      return (r = (i = e("translations")).valueText) == null
        ? void 0
        : r.call(i, n.get("value"));
    },
    formatter: Yb(
      ({ prop: e }) => [e("locale"), e("formatOptions")],
      (e, n) => W_(e, n),
    ),
    parser: Yb(
      ({ prop: e }) => [e("locale"), e("formatOptions")],
      (e, n) => q_(e, n),
    ),
  },
  watch({ track: e, action: n, context: i, computed: r, prop: s }) {
    e([() => i.get("value"), () => s("locale")], () => {
      n(["syncInputElement"]);
    }),
      e([() => r("isOutOfRange")], () => {
        n(["invokeOnInvalid"]);
      }),
      e([() => i.hash("scrubberCursorPoint")], () => {
        n(["setVirtualCursorPosition"]);
      });
  },
  effects: ["trackFormControl"],
  on: {
    "VALUE.SET": { actions: ["setRawValue"] },
    "VALUE.CLEAR": { actions: ["clearValue"] },
    "VALUE.INCREMENT": { actions: ["increment"] },
    "VALUE.DECREMENT": { actions: ["decrement"] },
  },
  states: {
    idle: {
      on: {
        "TRIGGER.PRESS_DOWN": [
          {
            guard: "isTouchPointer",
            target: "before:spin",
            actions: ["setHint"],
          },
          {
            target: "before:spin",
            actions: ["focusInput", "invokeOnFocus", "setHint"],
          },
        ],
        "SCRUBBER.PRESS_DOWN": {
          target: "scrubbing",
          actions: ["focusInput", "invokeOnFocus", "setHint", "setCursorPoint"],
        },
        "INPUT.FOCUS": {
          target: "focused",
          actions: ["focusInput", "invokeOnFocus"],
        },
      },
    },
    focused: {
      tags: ["focus"],
      effects: ["attachWheelListener"],
      on: {
        "TRIGGER.PRESS_DOWN": [
          {
            guard: "isTouchPointer",
            target: "before:spin",
            actions: ["setHint"],
          },
          { target: "before:spin", actions: ["focusInput", "setHint"] },
        ],
        "SCRUBBER.PRESS_DOWN": {
          target: "scrubbing",
          actions: ["focusInput", "setHint", "setCursorPoint"],
        },
        "INPUT.ARROW_UP": { actions: ["increment"] },
        "INPUT.ARROW_DOWN": { actions: ["decrement"] },
        "INPUT.HOME": { actions: ["decrementToMin"] },
        "INPUT.END": { actions: ["incrementToMax"] },
        "INPUT.CHANGE": { actions: ["setValue", "setHint"] },
        "INPUT.BLUR": [
          {
            guard: Py("clampValueOnBlur", Iy("isInRange")),
            target: "idle",
            actions: ["setClampedValue", "clearHint", "invokeOnBlur"],
          },
          {
            guard: Iy("isInRange"),
            target: "idle",
            actions: [
              "setFormattedValue",
              "clearHint",
              "invokeOnBlur",
              "invokeOnInvalid",
            ],
          },
          {
            target: "idle",
            actions: ["setFormattedValue", "clearHint", "invokeOnBlur"],
          },
        ],
        "INPUT.ENTER": {
          actions: ["setFormattedValue", "clearHint", "invokeOnBlur"],
        },
      },
    },
    "before:spin": {
      tags: ["focus"],
      effects: ["trackButtonDisabled", "waitForChangeDelay"],
      entry: X_([
        { guard: "isIncrementHint", actions: ["increment"] },
        { guard: "isDecrementHint", actions: ["decrement"] },
      ]),
      on: {
        CHANGE_DELAY: {
          target: "spinning",
          guard: Py("isInRange", "spinOnPress"),
        },
        "TRIGGER.PRESS_UP": [
          {
            guard: "isTouchPointer",
            target: "focused",
            actions: ["clearHint"],
          },
          { target: "focused", actions: ["focusInput", "clearHint"] },
        ],
      },
    },
    spinning: {
      tags: ["focus"],
      effects: ["trackButtonDisabled", "spinValue"],
      on: {
        SPIN: [
          { guard: "isIncrementHint", actions: ["increment"] },
          { guard: "isDecrementHint", actions: ["decrement"] },
        ],
        "TRIGGER.PRESS_UP": {
          target: "focused",
          actions: ["focusInput", "clearHint"],
        },
      },
    },
    scrubbing: {
      tags: ["focus"],
      effects: [
        "activatePointerLock",
        "trackMousemove",
        "setupVirtualCursor",
        "preventTextSelection",
      ],
      on: {
        "SCRUBBER.POINTER_UP": {
          target: "focused",
          actions: ["focusInput", "clearCursorPoint"],
        },
        "SCRUBBER.POINTER_MOVE": [
          {
            guard: "isIncrementHint",
            actions: ["increment", "setCursorPoint"],
          },
          {
            guard: "isDecrementHint",
            actions: ["decrement", "setCursorPoint"],
          },
        ],
      },
    },
  },
  implementations: {
    guards: {
      clampValueOnBlur: ({ prop: e }) => e("clampValueOnBlur"),
      spinOnPress: ({ prop: e }) => !!e("spinOnPress"),
      isInRange: ({ computed: e }) => !e("isOutOfRange"),
      isDecrementHint: ({ context: e, event: n }) =>
        (n.hint ?? e.get("hint")) === "decrement",
      isIncrementHint: ({ context: e, event: n }) =>
        (n.hint ?? e.get("hint")) === "increment",
      isTouchPointer: ({ event: e }) => e.pointerType === "touch",
    },
    effects: {
      waitForChangeDelay({ send: e }) {
        const n = setTimeout(() => {
          e({ type: "CHANGE_DELAY" });
        }, 300);
        return () => clearTimeout(n);
      },
      spinValue({ send: e }) {
        const n = setInterval(() => {
          e({ type: "SPIN" });
        }, 50);
        return () => clearInterval(n);
      },
      trackFormControl({ context: e, scope: n }) {
        const i = Ks(n);
        return Qc(i, {
          onFieldsetDisabledChange(r) {
            e.set("fieldsetDisabled", r);
          },
          onFormReset() {
            e.set("value", e.initial("value"));
          },
        });
      },
      setupVirtualCursor({ context: e, scope: n }) {
        const i = e.get("scrubberCursorPoint");
        return B_(n, i);
      },
      preventTextSelection({ scope: e }) {
        return j_(e);
      },
      trackButtonDisabled({ context: e, scope: n, send: i }) {
        const r = e.get("hint"),
          s = H_(n, r);
        return Zc(s, {
          attributes: ["disabled"],
          callback() {
            i({ type: "TRIGGER.PRESS_UP", src: "attr" });
          },
        });
      },
      attachWheelListener({ scope: e, send: n, prop: i }) {
        const r = Ks(e);
        if (!r || !e.isActiveElement(r) || !i("allowMouseWheel")) return;
        function s(c) {
          c.preventDefault();
          const d = Math.sign(c.deltaY) * -1;
          d === 1
            ? n({ type: "VALUE.INCREMENT" })
            : d === -1 && n({ type: "VALUE.DECREMENT" });
        }
        return Ge(r, "wheel", s, { passive: !1 });
      },
      activatePointerLock({ scope: e }) {
        if (!jg()) return uT(e.getDoc());
      },
      trackMousemove({ scope: e, send: n, context: i, computed: r }) {
        const s = e.getDoc();
        function c(g) {
          const h = i.get("scrubberCursorPoint"),
            m = r("isRtl"),
            p = U_(e, { point: h, isRtl: m, event: g });
          p.hint &&
            n({ type: "SCRUBBER.POINTER_MOVE", hint: p.hint, point: p.point });
        }
        function d() {
          n({ type: "SCRUBBER.POINTER_UP" });
        }
        return Ec(Ge(s, "mousemove", c, !1), Ge(s, "mouseup", d, !1));
      },
    },
    actions: {
      focusInput({ scope: e, prop: n }) {
        if (!n("focusInputOnChange")) return;
        const i = Ks(e);
        e.isActiveElement(i) ||
          Ce(() => (i == null ? void 0 : i.focus({ preventScroll: !0 })));
      },
      increment({ context: e, event: n, prop: i, computed: r }) {
        let s = dR(r("valueAsNumber"), n.step ?? i("step"));
        i("allowOverflow") || (s = Lt(s, i("min"), i("max"))),
          e.set("value", di(s, { computed: r, prop: i }));
      },
      decrement({ context: e, event: n, prop: i, computed: r }) {
        let s = fR(r("valueAsNumber"), n.step ?? i("step"));
        i("allowOverflow") || (s = Lt(s, i("min"), i("max"))),
          e.set("value", di(s, { computed: r, prop: i }));
      },
      setClampedValue({ context: e, prop: n, computed: i }) {
        const r = Lt(i("valueAsNumber"), n("min"), n("max"));
        e.set("value", di(r, { computed: i, prop: n }));
      },
      setRawValue({ context: e, event: n, prop: i, computed: r }) {
        let s = Xf(n.value, { computed: r, prop: i });
        i("allowOverflow") || (s = Lt(s, i("min"), i("max"))),
          e.set("value", di(s, { computed: r, prop: i }));
      },
      setValue({ context: e, event: n }) {
        var r;
        const i = ((r = n.target) == null ? void 0 : r.value) ?? n.value;
        e.set("value", i);
      },
      clearValue({ context: e }) {
        e.set("value", "");
      },
      incrementToMax({ context: e, prop: n, computed: i }) {
        const r = di(n("max"), { computed: i, prop: n });
        e.set("value", r);
      },
      decrementToMin({ context: e, prop: n, computed: i }) {
        const r = di(n("min"), { computed: i, prop: n });
        e.set("value", r);
      },
      setHint({ context: e, event: n }) {
        e.set("hint", n.hint);
      },
      clearHint({ context: e }) {
        e.set("hint", null);
      },
      invokeOnFocus({ computed: e, prop: n }) {
        var i;
        (i = n("onFocusChange")) == null ||
          i({
            focused: !0,
            value: e("formattedValue"),
            valueAsNumber: e("valueAsNumber"),
          });
      },
      invokeOnBlur({ computed: e, prop: n }) {
        var i;
        (i = n("onFocusChange")) == null ||
          i({
            focused: !1,
            value: e("formattedValue"),
            valueAsNumber: e("valueAsNumber"),
          });
      },
      invokeOnInvalid({ computed: e, prop: n, event: i }) {
        var s;
        if (i.type === "INPUT.CHANGE") return;
        const r =
          e("valueAsNumber") > n("max") ? "rangeOverflow" : "rangeUnderflow";
        (s = n("onValueInvalid")) == null ||
          s({
            reason: r,
            value: e("formattedValue"),
            valueAsNumber: e("valueAsNumber"),
          });
      },
      syncInputElement({ context: e, event: n, computed: i, scope: r }) {
        const s = n.type.endsWith("CHANGE")
            ? e.get("value")
            : i("formattedValue"),
          c = Ks(r),
          d = F_(c);
        Ce(() => {
          Kc(c, s), G_(c, d);
        });
      },
      setFormattedValue({ context: e, computed: n }) {
        e.set("value", n("formattedValue"));
      },
      setCursorPoint({ context: e, event: n }) {
        e.set("scrubberCursorPoint", n.point);
      },
      clearCursorPoint({ context: e }) {
        e.set("scrubberCursorPoint", null);
      },
      setVirtualCursorPosition({ context: e, scope: n }) {
        const i = TS(n),
          r = e.get("scrubberCursorPoint");
        !i ||
          !r ||
          (i.style.transform = `translate3d(${r.x}px, ${r.y}px, 0px)`);
      },
    },
  },
});
ve()([
  "allowMouseWheel",
  "allowOverflow",
  "clampValueOnBlur",
  "dir",
  "disabled",
  "focusInputOnChange",
  "form",
  "formatOptions",
  "getRootNode",
  "id",
  "ids",
  "inputMode",
  "invalid",
  "locale",
  "max",
  "min",
  "name",
  "onFocusChange",
  "onValueChange",
  "onValueInvalid",
  "pattern",
  "required",
  "readOnly",
  "spinOnPress",
  "step",
  "translations",
  "value",
  "defaultValue",
]);
var AS = me("pinInput").parts("root", "label", "input", "control");
AS.build();
ve()([
  "autoFocus",
  "blurOnComplete",
  "count",
  "defaultValue",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "mask",
  "name",
  "onValueChange",
  "onValueComplete",
  "onValueInvalid",
  "otp",
  "pattern",
  "placeholder",
  "readOnly",
  "required",
  "selectOnFocus",
  "translations",
  "type",
  "value",
]);
var zS = me("popover").parts(
  "arrow",
  "arrowTip",
  "anchor",
  "trigger",
  "indicator",
  "positioner",
  "content",
  "title",
  "description",
  "closeTrigger",
);
zS.build();
ve()([
  "autoFocus",
  "closeOnEscape",
  "closeOnInteractOutside",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "initialFocusEl",
  "modal",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "defaultOpen",
  "open",
  "persistentElements",
  "portalled",
  "positioning",
]);
const Z_ = (e) => {
    var h;
    const { children: n, disabled: i } = e,
      [r, s] = k.useState((h = e.container) == null ? void 0 : h.current),
      c = k.useSyncExternalStore(
        e5,
        () => !1,
        () => !0,
      ),
      { getRootNode: d } = ul();
    if (
      (k.useEffect(() => {
        s(() => {
          var m;
          return (m = e.container) == null ? void 0 : m.current;
        });
      }, [e.container]),
      c || i)
    )
      return V.jsx(V.Fragment, { children: n });
    const g = r ?? J_(d);
    return V.jsx(V.Fragment, {
      children: k.Children.map(n, (m) => eu.createPortal(m, g)),
    });
  },
  J_ = (e) => {
    const n = e == null ? void 0 : e(),
      i = n.getRootNode();
    return Er(i) ? i : kn(n).body;
  },
  e5 = () => () => {};
var fh = me("progress").parts(
  "root",
  "label",
  "track",
  "range",
  "valueText",
  "view",
  "circle",
  "circleTrack",
  "circleRange",
);
fh.build();
ve()([
  "dir",
  "getRootNode",
  "id",
  "ids",
  "max",
  "min",
  "orientation",
  "translations",
  "value",
  "onValueChange",
  "defaultValue",
  "formatOptions",
  "locale",
]);
var _S = me("qr-code").parts(
  "root",
  "frame",
  "pattern",
  "overlay",
  "downloadTrigger",
);
_S.build();
ve()([
  "ids",
  "defaultValue",
  "value",
  "id",
  "encoding",
  "dir",
  "getRootNode",
  "onValueChange",
  "pixelSize",
]);
var gh = me("radio-group").parts(
  "root",
  "label",
  "item",
  "itemText",
  "itemControl",
  "indicator",
);
gh.build();
ve()([
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "name",
  "onValueChange",
  "orientation",
  "readOnly",
  "value",
  "defaultValue",
]);
ve()(["value", "disabled", "invalid"]);
var NS = me("rating-group").parts("root", "label", "item", "control");
NS.build();
ve()([
  "allowHalf",
  "autoFocus",
  "count",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "name",
  "onHoverChange",
  "onValueChange",
  "required",
  "readOnly",
  "translations",
  "value",
  "defaultValue",
]);
ve()(["index"]);
const IS = gh.rename("segment-group");
IS.build();
var PS = me("select").parts(
  "label",
  "positioner",
  "trigger",
  "indicator",
  "clearTrigger",
  "item",
  "itemText",
  "itemIndicator",
  "itemGroup",
  "itemGroupLabel",
  "list",
  "content",
  "root",
  "control",
  "valueText",
);
PS.build();
var VS = (e) => new cu(e);
VS.empty = () => new cu({ items: [] });
var t5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ?? `select:${e.id}:content`
    );
  },
  n5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ?? `select:${e.id}:trigger`
    );
  },
  a5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.clearTrigger) ??
      `select:${e.id}:clear-trigger`
    );
  },
  i5 = (e, n) => {
    var i, r;
    return (
      ((r = (i = e.ids) == null ? void 0 : i.item) == null
        ? void 0
        : r.call(i, n)) ?? `select:${e.id}:option:${n}`
    );
  },
  r5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.hiddenSelect) ?? `select:${e.id}:select`
    );
  },
  o5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ??
      `select:${e.id}:positioner`
    );
  },
  Kf = (e) => e.getById(r5(e)),
  Bo = (e) => e.getById(t5(e)),
  Qs = (e) => e.getById(n5(e)),
  l5 = (e) => e.getById(a5(e)),
  Vy = (e) => e.getById(o5(e)),
  s5 = (e, n) => e.getById(i5(e, n)),
  { and: jo, not: fi, or: c5 } = Ga();
c5("isTriggerArrowDownEvent", "isTriggerEnterEvent"),
  jo(fi("multiple"), "hasSelectedItems"),
  fi("multiple"),
  jo(fi("multiple"), "hasSelectedItems"),
  fi("multiple"),
  fi("multiple"),
  fi("multiple"),
  fi("multiple"),
  jo("closeOnSelect", "isOpenControlled"),
  jo("hasHighlightedItem", "loop", "isLastItemHighlighted"),
  jo("hasHighlightedItem", "loop", "isFirstItemHighlighted");
function Dy(e) {
  var i;
  const n =
    e.restoreFocus ?? ((i = e.previousEvent) == null ? void 0 : i.restoreFocus);
  return n == null || !!n;
}
ve()([
  "closeOnSelect",
  "collection",
  "composite",
  "defaultHighlightedValue",
  "defaultOpen",
  "defaultValue",
  "deselectable",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "invalid",
  "loopFocus",
  "multiple",
  "name",
  "onFocusOutside",
  "onHighlightChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "onValueChange",
  "open",
  "positioning",
  "readOnly",
  "required",
  "scrollToIndexFn",
  "value",
]);
ve()(["item", "persistFocus"]);
ve()(["id"]);
ve()(["htmlFor"]);
var DS = me("slider").parts(
  "root",
  "label",
  "thumb",
  "valueText",
  "track",
  "range",
  "control",
  "markerGroup",
  "marker",
  "draggingIndicator",
);
DS.build();
ve()([
  "aria-label",
  "aria-labelledby",
  "dir",
  "disabled",
  "form",
  "getAriaValueText",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "max",
  "min",
  "minStepsBetweenThumbs",
  "name",
  "onFocusChange",
  "onValueChange",
  "onValueChangeEnd",
  "orientation",
  "origin",
  "readOnly",
  "step",
  "thumbAlignment",
  "thumbAlignment",
  "thumbSize",
  "value",
  "defaultValue",
]);
ve()(["index", "name"]);
var MS = me("switch").parts("root", "label", "control", "thumb");
MS.build();
ve()([
  "checked",
  "defaultChecked",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "label",
  "name",
  "onCheckedChange",
  "readOnly",
  "required",
  "value",
]);
const [LS, ml] = pn({
    name: "TooltipContext",
    hookName: "useTooltipContext",
    providerName: "<TooltipProvider />",
  }),
  HS = k.forwardRef((e, n) => {
    const i = ml(),
      r = Qe(i.getArrowProps(), e);
    return V.jsx(Ot.div, { ...r, ref: n });
  });
HS.displayName = "TooltipArrow";
const BS = k.forwardRef((e, n) => {
  const i = ml(),
    r = Qe(i.getArrowTipProps(), e);
  return V.jsx(Ot.div, { ...r, ref: n });
});
BS.displayName = "TooltipArrowTip";
const jS = k.forwardRef((e, n) => {
  const i = ml(),
    r = b1(),
    s = Qe(i.getContentProps(), r.getPresenceProps(), e);
  return r.unmounted ? null : V.jsx(Ot.div, { ...s, ref: d1(r.ref, n) });
});
jS.displayName = "TooltipContent";
const US = k.forwardRef((e, n) => {
  const i = ml(),
    r = Qe(i.getPositionerProps(), e);
  return b1().unmounted ? null : V.jsx(Ot.div, { ...r, ref: n });
});
US.displayName = "TooltipPositioner";
var $S = me("tooltip").parts(
    "trigger",
    "arrow",
    "arrowTip",
    "positioner",
    "content",
  ),
  Uo = $S.build(),
  FS = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.trigger) ?? `tooltip:${e.id}:trigger`
    );
  },
  u5 = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.content) ?? `tooltip:${e.id}:content`
    );
  },
  d5 = (e) => {
    var n;
    return ((n = e.ids) == null ? void 0 : n.arrow) ?? `tooltip:${e.id}:arrow`;
  },
  GS = (e) => {
    var n;
    return (
      ((n = e.ids) == null ? void 0 : n.positioner) ?? `tooltip:${e.id}:popper`
    );
  },
  Qf = (e) => e.getById(FS(e)),
  My = (e) => e.getById(GS(e)),
  oa = yS({ id: null });
function f5(e, n) {
  const { state: i, context: r, send: s, scope: c, prop: d, event: g } = e,
    h = d("id"),
    m = !!d("aria-label"),
    p = i.matches("open", "closing"),
    y = FS(c),
    b = u5(c),
    x = d("disabled"),
    C = dA({ ...d("positioning"), placement: r.get("currentPlacement") });
  return {
    open: p,
    setOpen(E) {
      i.matches("open", "closing") !== E && s({ type: E ? "open" : "close" });
    },
    reposition(E = {}) {
      s({ type: "positioning.set", options: E });
    },
    getTriggerProps() {
      return n.button({
        ...Uo.trigger.attrs,
        id: y,
        dir: d("dir"),
        "data-expanded": Ct(p),
        "data-state": p ? "open" : "closed",
        "aria-describedby": p ? b : void 0,
        onClick(E) {
          E.defaultPrevented ||
            x ||
            (d("closeOnClick") && s({ type: "close", src: "trigger.click" }));
        },
        onFocus(E) {
          queueMicrotask(() => {
            E.defaultPrevented ||
              x ||
              (g.src !== "trigger.pointerdown" &&
                Dc() &&
                s({ type: "open", src: "trigger.focus" }));
          });
        },
        onBlur(E) {
          E.defaultPrevented ||
            x ||
            (h === oa.id && s({ type: "close", src: "trigger.blur" }));
        },
        onPointerDown(E) {
          E.defaultPrevented ||
            x ||
            (d("closeOnPointerDown") &&
              h === oa.id &&
              s({ type: "close", src: "trigger.pointerdown" }));
        },
        onPointerMove(E) {
          E.defaultPrevented ||
            x ||
            (E.pointerType !== "touch" && s({ type: "pointer.move" }));
        },
        onPointerLeave() {
          x || s({ type: "pointer.leave" });
        },
        onPointerCancel() {
          x || s({ type: "pointer.leave" });
        },
      });
    },
    getArrowProps() {
      return n.element({
        id: d5(c),
        ...Uo.arrow.attrs,
        dir: d("dir"),
        style: C.arrow,
      });
    },
    getArrowTipProps() {
      return n.element({
        ...Uo.arrowTip.attrs,
        dir: d("dir"),
        style: C.arrowTip,
      });
    },
    getPositionerProps() {
      return n.element({
        id: GS(c),
        ...Uo.positioner.attrs,
        dir: d("dir"),
        style: C.floating,
      });
    },
    getContentProps() {
      return n.element({
        ...Uo.content.attrs,
        dir: d("dir"),
        hidden: !p,
        "data-state": p ? "open" : "closed",
        role: m ? void 0 : "tooltip",
        id: m ? void 0 : b,
        "data-placement": r.get("currentPlacement"),
        onPointerEnter() {
          s({ type: "content.pointer.move" });
        },
        onPointerLeave() {
          s({ type: "content.pointer.leave" });
        },
        style: { pointerEvents: d("interactive") ? "auto" : "none" },
      });
    },
  };
}
var { and: g5, not: Ly } = Ga(),
  h5 = {
    initialState: ({ prop: e }) =>
      e("open") || e("defaultOpen") ? "open" : "closed",
    props({ props: e }) {
      return {
        id: "x",
        openDelay: 1e3,
        closeDelay: 500,
        closeOnPointerDown: !0,
        closeOnEscape: !0,
        interactive: !1,
        closeOnScroll: !0,
        closeOnClick: !0,
        disabled: !1,
        ...e,
        positioning: { placement: "bottom", ...e.positioning },
      };
    },
    effects: ["trackFocusVisible", "trackStore"],
    context: ({ bindable: e }) => ({
      currentPlacement: e(() => ({ defaultValue: void 0 })),
      hasPointerMoveOpened: e(() => ({ defaultValue: !1 })),
    }),
    watch({ track: e, action: n, prop: i }) {
      e([() => i("disabled")], () => {
        n(["closeIfDisabled"]);
      }),
        e([() => i("open")], () => {
          n(["toggleVisibility"]);
        });
    },
    states: {
      closed: {
        entry: ["clearGlobalId"],
        on: {
          "controlled.open": { target: "open" },
          open: [
            { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
            { target: "open", actions: ["invokeOnOpen"] },
          ],
          "pointer.leave": { actions: ["clearPointerMoveOpened"] },
          "pointer.move": [
            {
              guard: g5("noVisibleTooltip", Ly("hasPointerMoveOpened")),
              target: "opening",
            },
            {
              guard: Ly("hasPointerMoveOpened"),
              target: "open",
              actions: ["setPointerMoveOpened", "invokeOnOpen"],
            },
          ],
        },
      },
      opening: {
        effects: ["trackScroll", "trackPointerlockChange", "waitForOpenDelay"],
        on: {
          "after.openDelay": [
            {
              guard: "isOpenControlled",
              actions: ["setPointerMoveOpened", "invokeOnOpen"],
            },
            {
              target: "open",
              actions: ["setPointerMoveOpened", "invokeOnOpen"],
            },
          ],
          "controlled.open": { target: "open" },
          "controlled.close": { target: "closed" },
          open: [
            { guard: "isOpenControlled", actions: ["invokeOnOpen"] },
            { target: "open", actions: ["invokeOnOpen"] },
          ],
          "pointer.leave": [
            {
              guard: "isOpenControlled",
              actions: [
                "clearPointerMoveOpened",
                "invokeOnClose",
                "toggleVisibility",
              ],
            },
            {
              target: "closed",
              actions: ["clearPointerMoveOpened", "invokeOnClose"],
            },
          ],
          close: [
            {
              guard: "isOpenControlled",
              actions: ["invokeOnClose", "toggleVisibility"],
            },
            { target: "closed", actions: ["invokeOnClose"] },
          ],
        },
      },
      open: {
        effects: [
          "trackEscapeKey",
          "trackScroll",
          "trackPointerlockChange",
          "trackPositioning",
        ],
        entry: ["setGlobalId"],
        on: {
          "controlled.close": { target: "closed" },
          close: [
            { guard: "isOpenControlled", actions: ["invokeOnClose"] },
            { target: "closed", actions: ["invokeOnClose"] },
          ],
          "pointer.leave": [
            {
              guard: "isVisible",
              target: "closing",
              actions: ["clearPointerMoveOpened"],
            },
            {
              guard: "isOpenControlled",
              actions: ["clearPointerMoveOpened", "invokeOnClose"],
            },
            {
              target: "closed",
              actions: ["clearPointerMoveOpened", "invokeOnClose"],
            },
          ],
          "content.pointer.leave": {
            guard: "isInteractive",
            target: "closing",
          },
          "positioning.set": { actions: ["reposition"] },
        },
      },
      closing: {
        effects: ["trackPositioning", "waitForCloseDelay"],
        on: {
          "after.closeDelay": [
            { guard: "isOpenControlled", actions: ["invokeOnClose"] },
            { target: "closed", actions: ["invokeOnClose"] },
          ],
          "controlled.close": { target: "closed" },
          "controlled.open": { target: "open" },
          close: [
            { guard: "isOpenControlled", actions: ["invokeOnClose"] },
            { target: "closed", actions: ["invokeOnClose"] },
          ],
          "pointer.move": [
            {
              guard: "isOpenControlled",
              actions: [
                "setPointerMoveOpened",
                "invokeOnOpen",
                "toggleVisibility",
              ],
            },
            {
              target: "open",
              actions: ["setPointerMoveOpened", "invokeOnOpen"],
            },
          ],
          "content.pointer.move": { guard: "isInteractive", target: "open" },
          "positioning.set": { actions: ["reposition"] },
        },
      },
    },
    implementations: {
      guards: {
        noVisibleTooltip: () => oa.id === null,
        isVisible: ({ prop: e }) => e("id") === oa.id,
        isInteractive: ({ prop: e }) => !!e("interactive"),
        hasPointerMoveOpened: ({ context: e }) => e.get("hasPointerMoveOpened"),
        isOpenControlled: ({ prop: e }) => e("open") !== void 0,
      },
      actions: {
        setGlobalId: ({ prop: e }) => {
          oa.id = e("id");
        },
        clearGlobalId: ({ prop: e }) => {
          e("id") === oa.id && (oa.id = null);
        },
        invokeOnOpen: ({ prop: e }) => {
          var n;
          (n = e("onOpenChange")) == null || n({ open: !0 });
        },
        invokeOnClose: ({ prop: e }) => {
          var n;
          (n = e("onOpenChange")) == null || n({ open: !1 });
        },
        closeIfDisabled: ({ prop: e, send: n }) => {
          e("disabled") && n({ type: "close", src: "disabled.change" });
        },
        reposition: ({ context: e, event: n, prop: i, scope: r }) => {
          if (n.type !== "positioning.set") return;
          const s = () => My(r);
          return On(Qf(r), s, {
            ...i("positioning"),
            ...n.options,
            defer: !0,
            listeners: !1,
            onComplete(c) {
              e.set("currentPlacement", c.placement);
            },
          });
        },
        toggleVisibility: ({ prop: e, event: n, send: i }) => {
          queueMicrotask(() => {
            i({
              type: e("open") ? "controlled.open" : "controlled.close",
              previousEvent: n,
            });
          });
        },
        setPointerMoveOpened: ({ context: e }) => {
          e.set("hasPointerMoveOpened", !0);
        },
        clearPointerMoveOpened: ({ context: e }) => {
          e.set("hasPointerMoveOpened", !1);
        },
      },
      effects: {
        trackFocusVisible: ({ scope: e }) => {
          var n;
          return eS({ root: (n = e.getRootNode) == null ? void 0 : n.call(e) });
        },
        trackPositioning: ({ context: e, prop: n, scope: i }) => {
          e.get("currentPlacement") ||
            e.set("currentPlacement", n("positioning").placement);
          const r = () => My(i);
          return On(Qf(i), r, {
            ...n("positioning"),
            defer: !0,
            onComplete(s) {
              e.set("currentPlacement", s.placement);
            },
          });
        },
        trackPointerlockChange: ({ send: e, scope: n }) => {
          const i = n.getDoc();
          return Ge(
            i,
            "pointerlockchange",
            () => e({ type: "close", src: "pointerlock:change" }),
            !1,
          );
        },
        trackScroll: ({ send: e, prop: n, scope: i }) => {
          if (!n("closeOnScroll")) return;
          const r = Qf(i);
          if (!r) return;
          const c = l1(r).map((d) =>
            Ge(
              d,
              "scroll",
              () => {
                e({ type: "close", src: "scroll" });
              },
              { passive: !0, capture: !0 },
            ),
          );
          return () => {
            c.forEach((d) => (d == null ? void 0 : d()));
          };
        },
        trackStore: ({ prop: e, send: n }) => {
          let i;
          return (
            queueMicrotask(() => {
              i = o_(oa, () => {
                oa.id !== e("id") && n({ type: "close", src: "id.change" });
              });
            }),
            () => (i == null ? void 0 : i())
          );
        },
        trackEscapeKey: ({ send: e, prop: n }) =>
          n("closeOnEscape")
            ? Ge(
                document,
                "keydown",
                (r) => {
                  jR(r) ||
                    (r.key === "Escape" &&
                      (r.stopPropagation(),
                      e({ type: "close", src: "keydown.escape" })));
                },
                !0,
              )
            : void 0,
        waitForOpenDelay: ({ send: e, prop: n }) => {
          const i = setTimeout(() => {
            e({ type: "after.openDelay" });
          }, n("openDelay"));
          return () => clearTimeout(i);
        },
        waitForCloseDelay: ({ send: e, prop: n }) => {
          const i = setTimeout(() => {
            e({ type: "after.closeDelay" });
          }, n("closeDelay"));
          return () => clearTimeout(i);
        },
      },
    },
  };
ve()([
  "aria-label",
  "closeDelay",
  "closeOnEscape",
  "closeOnPointerDown",
  "closeOnScroll",
  "closeOnClick",
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "interactive",
  "onOpenChange",
  "defaultOpen",
  "open",
  "openDelay",
  "positioning",
]);
const m5 = (e) => {
    const n = k.useId(),
      { getRootNode: i } = ul(),
      { dir: r } = Jc(),
      s = { id: n, dir: r, getRootNode: i, ...e },
      c = dl(h5, s);
    return f5(c, tu);
  },
  p5 = (e) => {
    const [n, { children: i, ...r }] = f1(e),
      s = m5(r),
      c = p1(Qe({ present: s.open }, n));
    return V.jsx(LS, {
      value: s,
      children: V.jsx(v1, { value: c, children: i }),
    });
  },
  v5 = (e) => {
    const [n, { value: i, children: r }] = f1(e),
      s = p1(Qe({ present: i.open }, n));
    return V.jsx(LS, {
      value: i,
      children: V.jsx(v1, { value: s, children: r }),
    });
  },
  WS = k.forwardRef((e, n) => {
    const i = ml(),
      r = Qe(i.getTriggerProps(), e);
    return V.jsx(Ot.button, { ...r, ref: n });
  });
WS.displayName = "TooltipTrigger";
function qS(e, n = []) {
  const i = Object.assign({}, e);
  for (const r of n) r in i && delete i[r];
  return i;
}
const b5 = (e, n) => {
    var h;
    if (!e || typeof e != "string") return { invalid: !0, value: e };
    const [i, r] = e.split("/");
    if (!i || !r || i === "currentBg") return { invalid: !0, value: i };
    const s = n(`colors.${i}`),
      c = (h = n.raw(`opacity.${r}`)) == null ? void 0 : h.value;
    if (!c && isNaN(Number(r))) return { invalid: !0, value: i };
    const d = c ? Number(c) * 100 + "%" : `${r}%`,
      g = s ?? i;
    return {
      invalid: !1,
      color: g,
      value: `color-mix(in srgb, ${g} ${d}, transparent)`,
    };
  },
  je = (e) => (n, i) => {
    const r = i.utils.colorMix(n);
    if (r.invalid) return { [e]: n };
    const s = "--mix-" + e;
    return { [s]: r.value, [e]: `var(${s}, ${r.color})` };
  };
function bg(e) {
  if (e === null || typeof e != "object") return e;
  if (Array.isArray(e)) return e.map((i) => bg(i));
  const n = Object.create(Object.getPrototypeOf(e));
  for (const i of Object.keys(e)) n[i] = bg(e[i]);
  return n;
}
function yg(e, n) {
  if (n == null) return e;
  for (const i of Object.keys(n))
    if (!(n[i] === void 0 || i === "__proto__"))
      if (!Mt(e[i]) && Mt(n[i])) Object.assign(e, { [i]: n[i] });
      else if (e[i] && Mt(n[i])) yg(e[i], n[i]);
      else if (Array.isArray(n[i]) && Array.isArray(e[i])) {
        let r = 0;
        for (; r < n[i].length; r++)
          Mt(e[i][r]) && Mt(n[i][r])
            ? yg(e[i][r], n[i][r])
            : (e[i][r] = n[i][r]);
      } else Object.assign(e, { [i]: n[i] });
  return e;
}
function Ar(e, ...n) {
  for (const i of n) yg(e, i);
  return e;
}
const y5 = (e) => e,
  st = (e) => e,
  ge = (e) => e,
  x5 = (e) => e,
  S5 = (e) => e,
  YS = (e) => e,
  C5 = (e) => e,
  E5 = (e) => e,
  O5 = (e) => e;
function XS() {
  const e = (n) => n;
  return new Proxy(e, {
    get() {
      return e;
    },
  });
}
const rt = XS(),
  hh = XS(),
  KS = (e) => e,
  QS = (...e) => Ar({}, ...e.map(bg)),
  w5 = /[^a-zA-Z0-9_\u0081-\uffff-]/g;
function k5(e) {
  return `${e}`.replace(w5, (n) => `\\${n}`);
}
const R5 = /[A-Z]/g;
function T5(e) {
  return e.replace(R5, (n) => `-${n.toLowerCase()}`);
}
function ZS(e, n = {}) {
  const { fallback: i = "", prefix: r = "" } = n,
    s = T5(["-", r, k5(e)].filter(Boolean).join("-"));
  return { var: s, ref: `var(${s}${i ? `, ${i}` : ""})` };
}
const A5 = (e) => /^var\(--.+\)$/.test(e),
  ht = (e, n) => (n != null ? `${e}(${n})` : n),
  gi = (e) => {
    if (A5(e) || e == null) return e;
    const n = typeof e == "string" && !e.endsWith("deg");
    return typeof e == "number" || n ? `${e}deg` : e;
  },
  Hy = (e) => ({
    values: ["outside", "inside", "mixed", "none"],
    transform(n, { token: i }) {
      const r = i("colors.colorPalette.focusRing");
      return (
        {
          inside: {
            "--focus-ring-color": r,
            [e]: {
              outlineOffset: "0px",
              outlineWidth: "var(--focus-ring-width, 1px)",
              outlineColor: "var(--focus-ring-color)",
              outlineStyle: "var(--focus-ring-style, solid)",
              borderColor: "var(--focus-ring-color)",
            },
          },
          outside: {
            "--focus-ring-color": r,
            [e]: {
              outlineWidth: "var(--focus-ring-width, 2px)",
              outlineOffset: "var(--focus-ring-offset, 2px)",
              outlineStyle: "var(--focus-ring-style, solid)",
              outlineColor: "var(--focus-ring-color)",
            },
          },
          mixed: {
            "--focus-ring-color": r,
            [e]: {
              outlineWidth: "var(--focus-ring-width, 3px)",
              outlineStyle: "var(--focus-ring-style, solid)",
              outlineColor:
                "color-mix(in srgb, var(--focus-ring-color), transparent 60%)",
              borderColor: "var(--focus-ring-color)",
            },
          },
          none: { "--focus-ring-color": r, [e]: { outline: "none" } },
        }[n] ?? {}
      );
    },
  }),
  z5 = je("borderColor"),
  ia = (e) => ({
    transition: e,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
  }),
  _5 = y5({
    hover: [
      "@media (hover: hover)",
      "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])",
    ],
    active:
      "&:is(:active, [data-active]):not(:disabled, [data-disabled], [data-state=open])",
    focus: "&:is(:focus, [data-focus])",
    focusWithin: "&:is(:focus-within, [data-focus-within])",
    focusVisible: "&:is(:focus-visible, [data-focus-visible])",
    disabled:
      "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
    visited: "&:visited",
    target: "&:target",
    readOnly: "&:is([data-readonly], [aria-readonly=true], [readonly])",
    readWrite: "&:read-write",
    empty: "&:is(:empty, [data-empty])",
    checked:
      "&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])",
    enabled: "&:enabled",
    expanded:
      "&:is([aria-expanded=true], [data-expanded], [data-state=expanded])",
    highlighted: "&[data-highlighted]",
    complete: "&[data-complete]",
    incomplete: "&[data-incomplete]",
    dragging: "&[data-dragging]",
    before: "&::before",
    after: "&::after",
    firstLetter: "&::first-letter",
    firstLine: "&::first-line",
    marker: "&::marker",
    selection: "&::selection",
    file: "&::file-selector-button",
    backdrop: "&::backdrop",
    first: "&:first-of-type",
    last: "&:last-of-type",
    notFirst: "&:not(:first-of-type)",
    notLast: "&:not(:last-of-type)",
    only: "&:only-child",
    even: "&:nth-of-type(even)",
    odd: "&:nth-of-type(odd)",
    peerFocus: ".peer:is(:focus, [data-focus]) ~ &",
    peerHover:
      ".peer:is(:hover, [data-hover]):not(:disabled, [data-disabled]) ~ &",
    peerActive:
      ".peer:is(:active, [data-active]):not(:disabled, [data-disabled]) ~ &",
    peerFocusWithin: ".peer:focus-within ~ &",
    peerFocusVisible: ".peer:is(:focus-visible, [data-focus-visible]) ~ &",
    peerDisabled: ".peer:is(:disabled, [disabled], [data-disabled]) ~ &",
    peerChecked:
      ".peer:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) ~ &",
    peerInvalid: ".peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &",
    peerExpanded:
      ".peer:is([aria-expanded=true], [data-expanded], [data-state=expanded]) ~ &",
    peerPlaceholderShown: ".peer:placeholder-shown ~ &",
    groupFocus: ".group:is(:focus, [data-focus]) &",
    groupHover:
      ".group:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &",
    groupActive:
      ".group:is(:active, [data-active]):not(:disabled, [data-disabled]) &",
    groupFocusWithin: ".group:focus-within &",
    groupFocusVisible: ".group:is(:focus-visible, [data-focus-visible]) &",
    groupDisabled: ".group:is(:disabled, [disabled], [data-disabled]) &",
    groupChecked:
      ".group:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &",
    groupExpanded:
      ".group:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &",
    groupInvalid: ".group:invalid &",
    indeterminate:
      "&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])",
    required: "&:is([data-required], [aria-required=true])",
    valid: "&:is([data-valid], [data-state=valid])",
    invalid: "&:is([data-invalid], [aria-invalid=true], [data-state=invalid])",
    autofill: "&:autofill",
    inRange: "&:is(:in-range, [data-in-range])",
    outOfRange: "&:is(:out-of-range, [data-outside-range])",
    placeholder: "&::placeholder, &[data-placeholder]",
    placeholderShown: "&:is(:placeholder-shown, [data-placeholder-shown])",
    pressed: "&:is([aria-pressed=true], [data-pressed])",
    selected: "&:is([aria-selected=true], [data-selected])",
    grabbed: "&:is([aria-grabbed=true], [data-grabbed])",
    underValue: "&[data-state=under-value]",
    overValue: "&[data-state=over-value]",
    atValue: "&[data-state=at-value]",
    default: "&:default",
    optional: "&:optional",
    open: "&:is([open], [data-open], [data-state=open])",
    closed: "&:is([closed], [data-closed], [data-state=closed])",
    fullscreen: "&is(:fullscreen, [data-fullscreen])",
    loading: "&:is([data-loading], [aria-busy=true])",
    hidden: "&:is([hidden], [data-hidden])",
    current: "&[data-current]",
    currentPage: "&[aria-current=page]",
    currentStep: "&[aria-current=step]",
    today: "&[data-today]",
    unavailable: "&[data-unavailable]",
    rangeStart: "&[data-range-start]",
    rangeEnd: "&[data-range-end]",
    now: "&[data-now]",
    topmost: "&[data-topmost]",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
    motionSafe: "@media (prefers-reduced-motion: no-preference)",
    print: "@media print",
    landscape: "@media (orientation: landscape)",
    portrait: "@media (orientation: portrait)",
    dark: ".dark &, .dark .chakra-theme:not(.light) &",
    light: ":root &, .light &",
    osDark: "@media (prefers-color-scheme: dark)",
    osLight: "@media (prefers-color-scheme: light)",
    highContrast: "@media (forced-colors: active)",
    lessContrast: "@media (prefers-contrast: less)",
    moreContrast: "@media (prefers-contrast: more)",
    ltr: "[dir=ltr] &",
    rtl: "[dir=rtl] &",
    scrollbar: "&::-webkit-scrollbar",
    scrollbarThumb: "&::-webkit-scrollbar-thumb",
    scrollbarTrack: "&::-webkit-scrollbar-track",
    horizontal: "&[data-orientation=horizontal]",
    vertical: "&[data-orientation=vertical]",
    icon: "& :where(svg)",
    starting: "@starting-style",
  }),
  br = ZS("bg-currentcolor"),
  By = (e) => e === br.ref || e === "currentBg",
  Be = (e) => ({ ...e("colors"), currentBg: br }),
  N5 = KS({
    conditions: _5,
    utilities: {
      background: {
        values: Be,
        shorthand: ["bg"],
        transform(e, n) {
          if (By(n.raw)) return { background: br.ref };
          const i = je("background")(e, n);
          return { ...i, [br.var]: i == null ? void 0 : i.background };
        },
      },
      backgroundColor: {
        values: Be,
        shorthand: ["bgColor"],
        transform(e, n) {
          if (By(n.raw)) return { backgroundColor: br.ref };
          const i = je("backgroundColor")(e, n);
          return { ...i, [br.var]: i == null ? void 0 : i.backgroundColor };
        },
      },
      backgroundSize: { shorthand: ["bgSize"] },
      backgroundPosition: { shorthand: ["bgPos"] },
      backgroundRepeat: { shorthand: ["bgRepeat"] },
      backgroundAttachment: { shorthand: ["bgAttachment"] },
      backgroundClip: {
        shorthand: ["bgClip"],
        values: ["text"],
        transform(e) {
          return e === "text"
            ? { color: "transparent", backgroundClip: "text" }
            : { backgroundClip: e };
        },
      },
      backgroundGradient: {
        shorthand: ["bgGradient"],
        values(e) {
          return {
            ...e("gradients"),
            "to-t": "linear-gradient(to top, var(--gradient))",
            "to-tr": "linear-gradient(to top right, var(--gradient))",
            "to-r": "linear-gradient(to right, var(--gradient))",
            "to-br": "linear-gradient(to bottom right, var(--gradient))",
            "to-b": "linear-gradient(to bottom, var(--gradient))",
            "to-bl": "linear-gradient(to bottom left, var(--gradient))",
            "to-l": "linear-gradient(to left, var(--gradient))",
            "to-tl": "linear-gradient(to top left, var(--gradient))",
          };
        },
        transform(e) {
          return {
            "--gradient-stops": "var(--gradient-from), var(--gradient-to)",
            "--gradient": "var(--gradient-via-stops, var(--gradient-stops))",
            backgroundImage: e,
          };
        },
      },
      gradientFrom: { values: Be, transform: je("--gradient-from") },
      gradientTo: { values: Be, transform: je("--gradient-to") },
      gradientVia: {
        values: Be,
        transform(e, n) {
          return {
            ...je("--gradient-via")(e, n),
            "--gradient-via-stops":
              "var(--gradient-from), var(--gradient-via), var(--gradient-to)",
          };
        },
      },
      backgroundImage: {
        values(e) {
          return { ...e("gradients"), ...e("assets") };
        },
        shorthand: ["bgImg", "bgImage"],
      },
      border: { values: "borders" },
      borderTop: { values: "borders" },
      borderLeft: { values: "borders" },
      borderBlockStart: { values: "borders" },
      borderRight: { values: "borders" },
      borderBottom: { values: "borders" },
      borderBlockEnd: { values: "borders" },
      borderInlineStart: { values: "borders", shorthand: ["borderStart"] },
      borderInlineEnd: { values: "borders", shorthand: ["borderEnd"] },
      borderInline: { values: "borders", shorthand: ["borderX"] },
      borderBlock: { values: "borders", shorthand: ["borderY"] },
      borderColor: { values: Be, transform: je("borderColor") },
      borderTopColor: { values: Be, transform: je("borderTopColor") },
      borderBlockStartColor: {
        values: Be,
        transform: je("borderBlockStartColor"),
      },
      borderBottomColor: { values: Be, transform: je("borderBottomColor") },
      borderBlockEndColor: { values: Be, transform: je("borderBlockEndColor") },
      borderLeftColor: { values: Be, transform: je("borderLeftColor") },
      borderInlineStartColor: {
        values: Be,
        shorthand: ["borderStartColor"],
        transform: je("borderInlineStartColor"),
      },
      borderRightColor: { values: Be, transform: je("borderRightColor") },
      borderInlineEndColor: {
        values: Be,
        shorthand: ["borderEndColor"],
        transform: je("borderInlineEndColor"),
      },
      borderStyle: { values: "borderStyles" },
      borderTopStyle: { values: "borderStyles" },
      borderBlockStartStyle: { values: "borderStyles" },
      borderBottomStyle: { values: "borderStyles" },
      borderBlockEndStyle: { values: "borderStyles" },
      borderInlineStartStyle: {
        values: "borderStyles",
        shorthand: ["borderStartStyle"],
      },
      borderInlineEndStyle: {
        values: "borderStyles",
        shorthand: ["borderEndStyle"],
      },
      borderLeftStyle: { values: "borderStyles" },
      borderRightStyle: { values: "borderStyles" },
      borderRadius: { values: "radii", shorthand: ["rounded"] },
      borderTopLeftRadius: { values: "radii", shorthand: ["roundedTopLeft"] },
      borderStartStartRadius: {
        values: "radii",
        shorthand: ["roundedStartStart", "borderTopStartRadius"],
      },
      borderEndStartRadius: {
        values: "radii",
        shorthand: ["roundedEndStart", "borderBottomStartRadius"],
      },
      borderTopRightRadius: { values: "radii", shorthand: ["roundedTopRight"] },
      borderStartEndRadius: {
        values: "radii",
        shorthand: ["roundedStartEnd", "borderTopEndRadius"],
      },
      borderEndEndRadius: {
        values: "radii",
        shorthand: ["roundedEndEnd", "borderBottomEndRadius"],
      },
      borderBottomLeftRadius: {
        values: "radii",
        shorthand: ["roundedBottomLeft"],
      },
      borderBottomRightRadius: {
        values: "radii",
        shorthand: ["roundedBottomRight"],
      },
      borderInlineStartRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedStart", "borderStartRadius"],
        transform: (e) => ({
          borderStartStartRadius: e,
          borderEndStartRadius: e,
        }),
      },
      borderInlineEndRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedEnd", "borderEndRadius"],
        transform: (e) => ({ borderStartEndRadius: e, borderEndEndRadius: e }),
      },
      borderTopRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedTop"],
        transform: (e) => ({ borderTopLeftRadius: e, borderTopRightRadius: e }),
      },
      borderBottomRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedBottom"],
        transform: (e) => ({
          borderBottomLeftRadius: e,
          borderBottomRightRadius: e,
        }),
      },
      borderLeftRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedLeft"],
        transform: (e) => ({
          borderTopLeftRadius: e,
          borderBottomLeftRadius: e,
        }),
      },
      borderRightRadius: {
        values: "radii",
        property: "borderRadius",
        shorthand: ["roundedRight"],
        transform: (e) => ({
          borderTopRightRadius: e,
          borderBottomRightRadius: e,
        }),
      },
      borderWidth: { values: "borderWidths" },
      borderBlockStartWidth: { values: "borderWidths" },
      borderTopWidth: { values: "borderWidths" },
      borderBottomWidth: { values: "borderWidths" },
      borderBlockEndWidth: { values: "borderWidths" },
      borderRightWidth: { values: "borderWidths" },
      borderInlineWidth: {
        values: "borderWidths",
        shorthand: ["borderXWidth"],
      },
      borderInlineStartWidth: {
        values: "borderWidths",
        shorthand: ["borderStartWidth"],
      },
      borderInlineEndWidth: {
        values: "borderWidths",
        shorthand: ["borderEndWidth"],
      },
      borderLeftWidth: { values: "borderWidths" },
      borderBlockWidth: { values: "borderWidths", shorthand: ["borderYWidth"] },
      color: { values: Be, transform: je("color") },
      fill: { values: Be, transform: je("fill") },
      stroke: { values: Be, transform: je("stroke") },
      accentColor: { values: Be, transform: je("accentColor") },
      divideX: {
        values: { type: "string" },
        transform(e) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
              borderInlineStartWidth: e,
              borderInlineEndWidth: "0px",
            },
          };
        },
      },
      divideY: {
        values: { type: "string" },
        transform(e) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
              borderTopWidth: e,
              borderBottomWidth: "0px",
            },
          };
        },
      },
      divideColor: {
        values: Be,
        transform(e, n) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": z5(e, n),
          };
        },
      },
      divideStyle: {
        property: "borderStyle",
        transform(e) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
              borderStyle: e,
            },
          };
        },
      },
      boxShadow: { values: "shadows", shorthand: ["shadow"] },
      boxShadowColor: {
        values: Be,
        transform: je("--shadow-color"),
        shorthand: ["shadowColor"],
      },
      mixBlendMode: { shorthand: ["blendMode"] },
      backgroundBlendMode: { shorthand: ["bgBlendMode"] },
      opacity: { values: "opacity" },
      filter: {
        transform(e) {
          return e !== "auto"
            ? { filter: e }
            : {
                filter:
                  "var(--blur) var(--brightness) var(--contrast) var(--grayscale) var(--hue-rotate) var(--invert) var(--saturate) var(--sepia) var(--drop-shadow)",
              };
        },
      },
      blur: {
        values: "blurs",
        transform: (e) => ({ "--blur": ht("blur", e) }),
      },
      brightness: {
        transform: (e) => ({ "--brightness": ht("brightness", e) }),
      },
      contrast: { transform: (e) => ({ "--contrast": ht("contrast", e) }) },
      grayscale: { transform: (e) => ({ "--grayscale": ht("grayscale", e) }) },
      hueRotate: {
        transform: (e) => ({ "--hue-rotate": ht("hue-rotate", gi(e)) }),
      },
      invert: { transform: (e) => ({ "--invert": ht("invert", e) }) },
      saturate: { transform: (e) => ({ "--saturate": ht("saturate", e) }) },
      sepia: { transform: (e) => ({ "--sepia": ht("sepia", e) }) },
      dropShadow: {
        transform: (e) => ({ "--drop-shadow": ht("drop-shadow", e) }),
      },
      backdropFilter: {
        transform(e) {
          return e !== "auto"
            ? { backdropFilter: e }
            : {
                backdropFilter:
                  "var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia)",
              };
        },
      },
      backdropBlur: {
        values: "blurs",
        transform: (e) => ({ "--backdrop-blur": ht("blur", e) }),
      },
      backdropBrightness: {
        transform: (e) => ({ "--backdrop-brightness": ht("brightness", e) }),
      },
      backdropContrast: {
        transform: (e) => ({ "--backdrop-contrast": ht("contrast", e) }),
      },
      backdropGrayscale: {
        transform: (e) => ({ "--backdrop-grayscale": ht("grayscale", e) }),
      },
      backdropHueRotate: {
        transform: (e) => ({
          "--backdrop-hue-rotate": ht("hue-rotate", gi(e)),
        }),
      },
      backdropInvert: {
        transform: (e) => ({ "--backdrop-invert": ht("invert", e) }),
      },
      backdropOpacity: {
        transform: (e) => ({ "--backdrop-opacity": ht("opacity", e) }),
      },
      backdropSaturate: {
        transform: (e) => ({ "--backdrop-saturate": ht("saturate", e) }),
      },
      backdropSepia: {
        transform: (e) => ({ "--backdrop-sepia": ht("sepia", e) }),
      },
      flexBasis: { values: "sizes" },
      gap: { values: "spacing" },
      rowGap: { values: "spacing", shorthand: ["gapY"] },
      columnGap: { values: "spacing", shorthand: ["gapX"] },
      flexDirection: { shorthand: ["flexDir"] },
      gridGap: { values: "spacing" },
      gridColumnGap: { values: "spacing" },
      gridRowGap: { values: "spacing" },
      outlineColor: { values: Be, transform: je("outlineColor") },
      focusRing: Hy("&:is(:focus, [data-focus])"),
      focusVisibleRing: Hy("&:is(:focus-visible, [data-focus-visible])"),
      focusRingColor: { values: Be, transform: je("--focus-ring-color") },
      focusRingOffset: {
        values: "spacing",
        transform: (e) => ({ "--focus-ring-offset": e }),
      },
      focusRingWidth: {
        values: "borderWidths",
        property: "outlineWidth",
        transform: (e) => ({ "--focus-ring-width": e }),
      },
      focusRingStyle: {
        values: "borderStyles",
        property: "outlineStyle",
        transform: (e) => ({ "--focus-ring-style": e }),
      },
      aspectRatio: { values: "aspectRatios" },
      width: { values: "sizes", shorthand: ["w"] },
      inlineSize: { values: "sizes" },
      height: { values: "sizes", shorthand: ["h"] },
      blockSize: { values: "sizes" },
      boxSize: {
        values: "sizes",
        property: "width",
        transform: (e) => ({ width: e, height: e }),
      },
      minWidth: { values: "sizes", shorthand: ["minW"] },
      minInlineSize: { values: "sizes" },
      minHeight: { values: "sizes", shorthand: ["minH"] },
      minBlockSize: { values: "sizes" },
      maxWidth: { values: "sizes", shorthand: ["maxW"] },
      maxInlineSize: { values: "sizes" },
      maxHeight: { values: "sizes", shorthand: ["maxH"] },
      maxBlockSize: { values: "sizes" },
      hideFrom: {
        values: "breakpoints",
        transform: (e, { raw: n, token: i }) => ({
          [i.raw(`breakpoints.${n}`)
            ? `@breakpoint ${n}`
            : `@media screen and (min-width: ${e})`]: { display: "none" },
        }),
      },
      hideBelow: {
        values: "breakpoints",
        transform(e, { raw: n, token: i }) {
          return {
            [i.raw(`breakpoints.${n}`)
              ? `@breakpoint ${n}Down`
              : `@media screen and (max-width: ${e})`]: { display: "none" },
          };
        },
      },
      overscrollBehavior: { shorthand: ["overscroll"] },
      overscrollBehaviorX: { shorthand: ["overscrollX"] },
      overscrollBehaviorY: { shorthand: ["overscrollY"] },
      scrollbar: {
        values: ["visible", "hidden"],
        transform(e) {
          switch (e) {
            case "visible":
              return {
                msOverflowStyle: "auto",
                scrollbarWidth: "auto",
                "&::-webkit-scrollbar": { display: "block" },
              };
            case "hidden":
              return {
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              };
            default:
              return {};
          }
        },
      },
      scrollbarColor: { values: Be, transform: je("scrollbarColor") },
      scrollbarGutter: { values: "spacing" },
      scrollbarWidth: { values: "sizes" },
      scrollMargin: { values: "spacing" },
      scrollMarginTop: { values: "spacing" },
      scrollMarginBottom: { values: "spacing" },
      scrollMarginLeft: { values: "spacing" },
      scrollMarginRight: { values: "spacing" },
      scrollMarginX: {
        values: "spacing",
        transform: (e) => ({ scrollMarginLeft: e, scrollMarginRight: e }),
      },
      scrollMarginY: {
        values: "spacing",
        transform: (e) => ({ scrollMarginTop: e, scrollMarginBottom: e }),
      },
      scrollPadding: { values: "spacing" },
      scrollPaddingTop: { values: "spacing" },
      scrollPaddingBottom: { values: "spacing" },
      scrollPaddingLeft: { values: "spacing" },
      scrollPaddingRight: { values: "spacing" },
      scrollPaddingInline: { values: "spacing", shorthand: ["scrollPaddingX"] },
      scrollPaddingBlock: { values: "spacing", shorthand: ["scrollPaddingY"] },
      scrollSnapType: {
        values: {
          none: "none",
          x: "x var(--scroll-snap-strictness)",
          y: "y var(--scroll-snap-strictness)",
          both: "both var(--scroll-snap-strictness)",
        },
      },
      scrollSnapStrictness: {
        values: ["mandatory", "proximity"],
        transform: (e) => ({ "--scroll-snap-strictness": e }),
      },
      scrollSnapMargin: { values: "spacing" },
      scrollSnapMarginTop: { values: "spacing" },
      scrollSnapMarginBottom: { values: "spacing" },
      scrollSnapMarginLeft: { values: "spacing" },
      scrollSnapMarginRight: { values: "spacing" },
      listStylePosition: { shorthand: ["listStylePos"] },
      listStyleImage: { values: "assets", shorthand: ["listStyleImg"] },
      position: { shorthand: ["pos"] },
      zIndex: { values: "zIndex" },
      inset: { values: "spacing" },
      insetInline: { values: "spacing", shorthand: ["insetX"] },
      insetBlock: { values: "spacing", shorthand: ["insetY"] },
      top: { values: "spacing" },
      insetBlockStart: { values: "spacing" },
      bottom: { values: "spacing" },
      insetBlockEnd: { values: "spacing" },
      left: { values: "spacing" },
      right: { values: "spacing" },
      insetInlineStart: { values: "spacing", shorthand: ["insetStart"] },
      insetInlineEnd: { values: "spacing", shorthand: ["insetEnd"] },
      ring: {
        transform(e) {
          return {
            "--ring-offset-shadow":
              "var(--ring-inset) 0 0 0 var(--ring-offset-width) var(--ring-offset-color)",
            "--ring-shadow":
              "var(--ring-inset) 0 0 0 calc(var(--ring-width) + var(--ring-offset-width)) var(--ring-color)",
            "--ring-width": e,
            boxShadow:
              "var(--ring-offset-shadow), var(--ring-shadow), var(--shadow, 0 0 #0000)",
          };
        },
      },
      ringColor: { values: Be, transform: je("--ring-color") },
      ringOffset: { transform: (e) => ({ "--ring-offset-width": e }) },
      ringOffsetColor: { values: Be, transform: je("--ring-offset-color") },
      ringInset: { transform: (e) => ({ "--ring-inset": e }) },
      margin: { values: "spacing", shorthand: ["m"] },
      marginTop: { values: "spacing", shorthand: ["mt"] },
      marginBlockStart: { values: "spacing" },
      marginRight: { values: "spacing", shorthand: ["mr"] },
      marginBottom: { values: "spacing", shorthand: ["mb"] },
      marginBlockEnd: { values: "spacing" },
      marginLeft: { values: "spacing", shorthand: ["ml"] },
      marginInlineStart: {
        values: "spacing",
        shorthand: ["ms", "marginStart"],
      },
      marginInlineEnd: { values: "spacing", shorthand: ["me", "marginEnd"] },
      marginInline: { values: "spacing", shorthand: ["mx", "marginX"] },
      marginBlock: { values: "spacing", shorthand: ["my", "marginY"] },
      padding: { values: "spacing", shorthand: ["p"] },
      paddingTop: { values: "spacing", shorthand: ["pt"] },
      paddingRight: { values: "spacing", shorthand: ["pr"] },
      paddingBottom: { values: "spacing", shorthand: ["pb"] },
      paddingBlockStart: { values: "spacing" },
      paddingBlockEnd: { values: "spacing" },
      paddingLeft: { values: "spacing", shorthand: ["pl"] },
      paddingInlineStart: {
        values: "spacing",
        shorthand: ["ps", "paddingStart"],
      },
      paddingInlineEnd: { values: "spacing", shorthand: ["pe", "paddingEnd"] },
      paddingInline: { values: "spacing", shorthand: ["px", "paddingX"] },
      paddingBlock: { values: "spacing", shorthand: ["py", "paddingY"] },
      textDecoration: { shorthand: ["textDecor"] },
      textDecorationColor: { values: Be, transform: je("textDecorationColor") },
      textShadow: { values: "shadows" },
      transform: {
        transform: (e) => {
          let n = e;
          return (
            e === "auto" &&
              (n =
                "translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))"),
            e === "auto-gpu" &&
              (n =
                "translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))"),
            { transform: n }
          );
        },
      },
      skewX: { transform: (e) => ({ "--skew-x": gi(e) }) },
      skewY: { transform: (e) => ({ "--skew-y": gi(e) }) },
      scaleX: { transform: (e) => ({ "--scale-x": e }) },
      scaleY: { transform: (e) => ({ "--scale-y": e }) },
      scale: {
        transform(e) {
          return e !== "auto"
            ? { scale: e }
            : { scale: "var(--scale-x, 1) var(--scale-y, 1)" };
        },
      },
      spaceXReverse: {
        values: { type: "boolean" },
        transform(e) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
              "--space-x-reverse": e ? "1" : void 0,
            },
          };
        },
      },
      spaceX: {
        property: "marginInlineStart",
        values: "spacing",
        transform: (e) => ({
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            "--space-x-reverse": "0",
            marginInlineStart: `calc(${e} * calc(1 - var(--space-x-reverse)))`,
            marginInlineEnd: `calc(${e} * var(--space-x-reverse))`,
          },
        }),
      },
      spaceYReverse: {
        values: { type: "boolean" },
        transform(e) {
          return {
            "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
              "--space-y-reverse": e ? "1" : void 0,
            },
          };
        },
      },
      spaceY: {
        property: "marginTop",
        values: "spacing",
        transform: (e) => ({
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            "--space-y-reverse": "0",
            marginTop: `calc(${e} * calc(1 - var(--space-y-reverse)))`,
            marginBottom: `calc(${e} * var(--space-y-reverse))`,
          },
        }),
      },
      rotate: {
        transform(e) {
          return e !== "auto"
            ? { rotate: gi(e) }
            : {
                rotate:
                  "var(--rotate-x, 0) var(--rotate-y, 0) var(--rotate-z, 0)",
              };
        },
      },
      rotateX: {
        transform(e) {
          return { "--rotate-x": gi(e) };
        },
      },
      rotateY: {
        transform(e) {
          return { "--rotate-y": gi(e) };
        },
      },
      translate: {
        transform(e) {
          return e !== "auto"
            ? { translate: e }
            : { translate: "var(--translate-x) var(--translate-y)" };
        },
      },
      translateX: {
        values: "spacing",
        transform: (e) => ({ "--translate-x": e }),
      },
      translateY: {
        values: "spacing",
        transform: (e) => ({ "--translate-y": e }),
      },
      transition: {
        values: [
          "all",
          "common",
          "colors",
          "opacity",
          "position",
          "backgrounds",
          "size",
          "shadow",
          "transform",
        ],
        transform(e) {
          switch (e) {
            case "all":
              return ia("all");
            case "position":
              return ia("left, right, top, bottom, inset-inline, inset-block");
            case "colors":
              return ia(
                "color, background-color, border-color, text-decoration-color, fill, stroke",
              );
            case "opacity":
              return ia("opacity");
            case "shadow":
              return ia("box-shadow");
            case "transform":
              return ia("transform");
            case "size":
              return ia("width, height");
            case "backgrounds":
              return ia(
                "background, background-color, background-image, background-position",
              );
            case "common":
              return ia(
                "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
              );
            default:
              return { transition: e };
          }
        },
      },
      transitionDuration: { values: "durations" },
      transitionProperty: {
        values: {
          common:
            "background-color, border-color, color, fill, stroke, opacity, box-shadow, translate, transform",
          colors: "background-color, border-color, color, fill, stroke",
          size: "width, height",
          position: "left, right, top, bottom, inset-inline, inset-block",
          background:
            "background, background-color, background-image, background-position",
        },
      },
      transitionTimingFunction: { values: "easings" },
      animation: { values: "animations" },
      animationDuration: { values: "durations" },
      animationDelay: { values: "durations" },
      animationTimingFunction: { values: "easings" },
      fontFamily: { values: "fonts" },
      fontSize: { values: "fontSizes" },
      fontWeight: { values: "fontWeights" },
      lineHeight: { values: "lineHeights" },
      letterSpacing: { values: "letterSpacings" },
      textIndent: { values: "spacing" },
      truncate: {
        values: { type: "boolean" },
        transform(e) {
          return e === !0
            ? {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }
            : {};
        },
      },
      lineClamp: {
        transform(e) {
          return e === "none"
            ? { WebkitLineClamp: "unset" }
            : {
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: e,
                WebkitBoxOrient: "vertical",
                textWrap: "wrap",
              };
        },
      },
      srOnly: {
        values: { type: "boolean" },
        transform(e) {
          return I5[e] || {};
        },
      },
      debug: {
        values: { type: "boolean" },
        transform(e) {
          return e
            ? {
                outline: "1px solid blue !important",
                "& > *": { outline: "1px solid red !important" },
              }
            : {};
        },
      },
      caretColor: { values: Be, transform: je("caretColor") },
      cursor: { values: "cursor" },
    },
  }),
  I5 = {
    true: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    },
    false: {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      whiteSpace: "normal",
    },
  };
var P5 = "",
  V5 = P5.split(","),
  D5 =
    "WebkitAppearance,WebkitBorderBefore,WebkitBorderBeforeColor,WebkitBorderBeforeStyle,WebkitBorderBeforeWidth,WebkitBoxReflect,WebkitLineClamp,WebkitMask,WebkitMaskAttachment,WebkitMaskClip,WebkitMaskComposite,WebkitMaskImage,WebkitMaskOrigin,WebkitMaskPosition,WebkitMaskPositionX,WebkitMaskPositionY,WebkitMaskRepeat,WebkitMaskRepeatX,WebkitMaskRepeatY,WebkitMaskSize,WebkitOverflowScrolling,WebkitTapHighlightColor,WebkitTextFillColor,WebkitTextStroke,WebkitTextStrokeColor,WebkitTextStrokeWidth,WebkitTouchCallout,WebkitUserModify,WebkitUserSelect,accentColor,alignContent,alignItems,alignSelf,alignTracks,all,anchorName,anchorScope,animation,animationComposition,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationRange,animationRangeEnd,animationRangeStart,animationTimeline,animationTimingFunction,appearance,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundSize,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxAlign,boxDecorationBreak,boxDirection,boxFlex,boxFlexGroup,boxLines,boxOrdinalGroup,boxOrient,boxPack,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,captionSide,caret,caretColor,caretShape,clear,clip,clipPath,clipRule,color,colorInterpolationFilters,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,container,containerName,containerType,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,direction,display,dominantBaseline,emptyCells,fieldSizing,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontFamily,fontFeatureSettings,fontKerning,fontLanguageOverride,fontOpticalSizing,fontPalette,fontSize,fontSizeAdjust,fontSmooth,fontStretch,fontStyle,fontSynthesis,fontSynthesisPosition,fontSynthesisSmallCaps,fontSynthesisStyle,fontSynthesisWeight,fontVariant,fontVariantAlternates,fontVariantCaps,fontVariantEastAsian,fontVariantEmoji,fontVariantLigatures,fontVariantNumeric,fontVariantPosition,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,hangingPunctuation,height,hyphenateCharacter,hyphenateLimitChars,hyphens,imageOrientation,imageRendering,imageResolution,imeMode,initialLetter,initialLetterAlign,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,interpolateSize,isolation,justifyContent,justifyItems,justifySelf,justifyTracks,left,letterSpacing,lightingColor,lineBreak,lineClamp,lineHeight,lineHeightStep,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marginTrim,marker,markerEnd,markerMid,markerStart,mask,maskBorder,maskBorderMode,maskBorderOutset,maskBorderRepeat,maskBorderSlice,maskBorderSource,maskBorderWidth,maskClip,maskComposite,maskImage,maskMode,maskOrigin,maskPosition,maskRepeat,maskSize,maskType,masonryAutoFlow,mathDepth,mathShift,mathStyle,maxBlockSize,maxHeight,maxInlineSize,maxLines,maxWidth,minBlockSize,minHeight,minInlineSize,minWidth,mixBlendMode,objectFit,objectPosition,offset,offsetAnchor,offsetDistance,offsetPath,offsetPosition,offsetRotate,opacity,order,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowBlock,overflowClipBox,overflowClipMargin,overflowInline,overflowWrap,overflowX,overflowY,overlay,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,positionAnchor,positionArea,positionTry,positionTryFallbacks,positionTryOrder,positionVisibility,printColorAdjust,quotes,r,resize,right,rotate,rowGap,rubyAlign,rubyMerge,rubyPosition,rx,ry,scale,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapCoordinate,scrollSnapDestination,scrollSnapPointsX,scrollSnapPointsY,scrollSnapStop,scrollSnapType,scrollSnapTypeX,scrollSnapTypeY,scrollTimeline,scrollTimelineAxis,scrollTimelineName,scrollbarColor,scrollbarGutter,scrollbarWidth,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textBox,textBoxEdge,textBoxTrim,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkip,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textEmphasis,textEmphasisColor,textEmphasisPosition,textEmphasisStyle,textIndent,textJustify,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textSpacingTrim,textTransform,textUnderlineOffset,textUnderlinePosition,textWrap,textWrapMode,textWrapStyle,timelineScope,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionBehavior,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,translate,unicodeBidi,userSelect,vectorEffect,verticalAlign,viewTimeline,viewTimelineAxis,viewTimelineInset,viewTimelineName,viewTransitionName,visibility,whiteSpace,whiteSpaceCollapse,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex,zoom,alignmentBaseline,baselineShift,colorInterpolation,colorRendering,glyphOrientationVertical",
  M5 = D5.split(",").concat(V5),
  L5 = new Map(M5.map((e) => [e, !0]));
function H5(e) {
  const n = Object.create(null);
  return (i) => (n[i] === void 0 && (n[i] = e(i)), n[i]);
}
var B5 = /&|@/,
  j5 = H5((e) => L5.has(e) || e.startsWith("--") || B5.test(e));
const U5 = (e) => e != null;
function da(e, n, i = {}) {
  const { stop: r, getKey: s } = i;
  function c(d, g = []) {
    if (Mt(d) || Array.isArray(d)) {
      const h = {};
      for (const [m, p] of Object.entries(d)) {
        const y = (s == null ? void 0 : s(m, p)) ?? m,
          b = [...g, y];
        if (r != null && r(d, b)) return n(d, g);
        const x = c(p, b);
        U5(x) && (h[y] = x);
      }
      return h;
    }
    return n(d, g);
  }
  return c(e);
}
function JS(e, n) {
  return Array.isArray(e)
    ? e.map((i) => n(i))
    : Mt(e)
      ? da(e, (i) => n(i))
      : e != null
        ? n(e)
        : e;
}
function $5(e, n) {
  const i = {};
  return (
    da(
      e,
      (r, s) => {
        r && (i[s.join(".")] = r.value);
      },
      { stop: n },
    ),
    i
  );
}
var Zf, jy;
function F5() {
  if (jy) return Zf;
  (jy = 1), (Zf = c), (c.default = c), (c.stable = m), (c.stableStringify = m);
  var e = "[...]",
    n = "[Circular]",
    i = [],
    r = [];
  function s() {
    return {
      depthLimit: Number.MAX_SAFE_INTEGER,
      edgesLimit: Number.MAX_SAFE_INTEGER,
    };
  }
  function c(b, x, C, E) {
    typeof E > "u" && (E = s()), g(b, "", 0, [], void 0, 0, E);
    var R;
    try {
      r.length === 0
        ? (R = JSON.stringify(b, x, C))
        : (R = JSON.stringify(b, y(x), C));
    } catch {
      return JSON.stringify(
        "[unable to serialize, circular reference is too complex to analyze]",
      );
    } finally {
      for (; i.length !== 0; ) {
        var O = i.pop();
        O.length === 4
          ? Object.defineProperty(O[0], O[1], O[3])
          : (O[0][O[1]] = O[2]);
      }
    }
    return R;
  }
  function d(b, x, C, E) {
    var R = Object.getOwnPropertyDescriptor(E, C);
    R.get !== void 0
      ? R.configurable
        ? (Object.defineProperty(E, C, { value: b }), i.push([E, C, x, R]))
        : r.push([x, C, b])
      : ((E[C] = b), i.push([E, C, x]));
  }
  function g(b, x, C, E, R, O, A) {
    O += 1;
    var z;
    if (typeof b == "object" && b !== null) {
      for (z = 0; z < E.length; z++)
        if (E[z] === b) {
          d(n, b, x, R);
          return;
        }
      if (typeof A.depthLimit < "u" && O > A.depthLimit) {
        d(e, b, x, R);
        return;
      }
      if (typeof A.edgesLimit < "u" && C + 1 > A.edgesLimit) {
        d(e, b, x, R);
        return;
      }
      if ((E.push(b), Array.isArray(b)))
        for (z = 0; z < b.length; z++) g(b[z], z, z, E, b, O, A);
      else {
        var B = Object.keys(b);
        for (z = 0; z < B.length; z++) {
          var _ = B[z];
          g(b[_], _, z, E, b, O, A);
        }
      }
      E.pop();
    }
  }
  function h(b, x) {
    return b < x ? -1 : b > x ? 1 : 0;
  }
  function m(b, x, C, E) {
    typeof E > "u" && (E = s());
    var R = p(b, "", 0, [], void 0, 0, E) || b,
      O;
    try {
      r.length === 0
        ? (O = JSON.stringify(R, x, C))
        : (O = JSON.stringify(R, y(x), C));
    } catch {
      return JSON.stringify(
        "[unable to serialize, circular reference is too complex to analyze]",
      );
    } finally {
      for (; i.length !== 0; ) {
        var A = i.pop();
        A.length === 4
          ? Object.defineProperty(A[0], A[1], A[3])
          : (A[0][A[1]] = A[2]);
      }
    }
    return O;
  }
  function p(b, x, C, E, R, O, A) {
    O += 1;
    var z;
    if (typeof b == "object" && b !== null) {
      for (z = 0; z < E.length; z++)
        if (E[z] === b) {
          d(n, b, x, R);
          return;
        }
      try {
        if (typeof b.toJSON == "function") return;
      } catch {
        return;
      }
      if (typeof A.depthLimit < "u" && O > A.depthLimit) {
        d(e, b, x, R);
        return;
      }
      if (typeof A.edgesLimit < "u" && C + 1 > A.edgesLimit) {
        d(e, b, x, R);
        return;
      }
      if ((E.push(b), Array.isArray(b)))
        for (z = 0; z < b.length; z++) p(b[z], z, z, E, b, O, A);
      else {
        var B = {},
          _ = Object.keys(b).sort(h);
        for (z = 0; z < _.length; z++) {
          var Y = _[z];
          p(b[Y], Y, z, E, b, O, A), (B[Y] = b[Y]);
        }
        if (typeof R < "u") i.push([R, x, b]), (R[x] = B);
        else return B;
      }
      E.pop();
    }
  }
  function y(b) {
    return (
      (b =
        typeof b < "u"
          ? b
          : function (x, C) {
              return C;
            }),
      function (x, C) {
        if (r.length > 0)
          for (var E = 0; E < r.length; E++) {
            var R = r[E];
            if (R[1] === x && R[0] === C) {
              (C = R[2]), r.splice(E, 1);
              break;
            }
          }
        return b.call(this, x, C);
      }
    );
  }
  return Zf;
}
var G5 = F5();
const W5 = kx(G5),
  Sn = (e) => {
    const n = Object.create(null);
    function i(...r) {
      const s = r.map((c) => W5(c)).join("|");
      return n[s] === void 0 && (n[s] = e(...r)), n[s];
    }
    return i;
  },
  eC = 16,
  Lc = "px",
  mh = "em",
  Jo = "rem";
function tC(e = "") {
  const n = new RegExp(String.raw`-?\d+(?:\.\d+|\d*)`),
    i = new RegExp(`${Lc}|${mh}|${Jo}`),
    r = e.match(new RegExp(`${n.source}(${i.source})`));
  return r == null ? void 0 : r[1];
}
function nC(e = "") {
  if (typeof e == "number") return `${e}px`;
  const n = tC(e);
  if (!n || n === Lc) return e;
  if (n === mh || n === Jo) return `${parseFloat(e) * eC}${Lc}`;
}
function aC(e = "") {
  const n = tC(e);
  if (!n || n === Jo) return e;
  if (n === mh) return `${parseFloat(e)}${Jo}`;
  if (n === Lc) return `${parseFloat(e) / eC}${Jo}`;
}
const q5 = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function Y5(e) {
  const n = X5(e),
    i = Object.fromEntries(n);
  function r(b) {
    return i[b];
  }
  function s(b) {
    return gr(r(b));
  }
  function c() {
    const b = Object.keys(i),
      x = K5(b),
      C = b
        .flatMap((E) => {
          const R = r(E),
            O = [`${E}Down`, gr({ max: hc(R.min) })],
            A = [E, gr({ min: R.min })],
            z = [`${E}Only`, s(E)];
          return [A, z, O];
        })
        .filter(([, E]) => E !== "")
        .concat(
          x.map(([E, R]) => {
            const O = r(E),
              A = r(R);
            return [`${E}To${q5(R)}`, gr({ min: O.min, max: hc(A.min) })];
          }),
        );
    return Object.fromEntries(C);
  }
  function d() {
    const b = c();
    return Object.fromEntries(Object.entries(b));
  }
  const g = d(),
    h = (b) => g[b];
  function m() {
    return ["base", ...Object.keys(i)];
  }
  function p(b) {
    return gr({ min: r(b).min });
  }
  function y(b) {
    return gr({ max: hc(r(b).min) });
  }
  return {
    values: Object.values(i),
    only: s,
    keys: m,
    conditions: g,
    getCondition: h,
    up: p,
    down: y,
  };
}
function hc(e) {
  const n = parseFloat(nC(e) ?? "") - 0.04;
  return aC(`${n}px`);
}
function X5(e) {
  return Object.entries(e)
    .sort(([, i], [, r]) => (parseInt(i, 10) < parseInt(r, 10) ? -1 : 1))
    .map(([i, r], s, c) => {
      var g;
      let d = null;
      return (
        s <= c.length - 1 && (d = (g = c[s + 1]) == null ? void 0 : g[1]),
        d != null && (d = hc(d)),
        [i, { name: i, min: aC(r), max: d }]
      );
    });
}
function K5(e) {
  const n = [];
  return (
    e.forEach((i, r) => {
      let s = r;
      s++;
      let c = e[s];
      for (; c; ) n.push([i, c]), s++, (c = e[s]);
    }),
    n
  );
}
function gr({ min: e, max: n }) {
  return e == null && n == null
    ? ""
    : ["@media screen", e && `(min-width: ${e})`, n && `(max-width: ${n})`]
        .filter(Boolean)
        .join(" and ");
}
const Q5 = (e, n) =>
    Object.fromEntries(Object.entries(e).map(([i, r]) => n(i, r))),
  Z5 = (e) => {
    const { breakpoints: n, conditions: i = {} } = e,
      r = Q5(i, (p, y) => [`_${p}`, y]),
      s = Object.assign({}, r, n.conditions);
    function c() {
      return Object.keys(s);
    }
    function d(p) {
      return c().includes(p) || /^@|&|&$/.test(p) || p.startsWith("_");
    }
    function g(p) {
      return p
        .filter((y) => y !== "base")
        .sort((y, b) => {
          const x = d(y),
            C = d(b);
          return x && !C ? 1 : !x && C ? -1 : 0;
        });
    }
    function h(p) {
      return p.startsWith("@breakpoint")
        ? n.getCondition(p.replace("@breakpoint ", ""))
        : p;
    }
    function m(p) {
      return Reflect.get(s, p) || p;
    }
    return {
      keys: c,
      sort: g,
      has: d,
      resolve: m,
      breakpoints: n.keys(),
      expandAtRule: h,
    };
  },
  iC = (e) => ({
    minMax: new RegExp(
      `(!?\\(\\s*min(-device-)?-${e})(.|
)+\\(\\s*max(-device)?-${e}`,
      "i",
    ),
    min: new RegExp(`\\(\\s*min(-device)?-${e}`, "i"),
    maxMin: new RegExp(
      `(!?\\(\\s*max(-device)?-${e})(.|
)+\\(\\s*min(-device)?-${e}`,
      "i",
    ),
    max: new RegExp(`\\(\\s*max(-device)?-${e}`, "i"),
  }),
  J5 = iC("width"),
  eN = iC("height"),
  rC = (e) => ({
    isMin: qy(e.minMax, e.maxMin, e.min),
    isMax: qy(e.maxMin, e.minMax, e.max),
  }),
  { isMin: xg, isMax: Uy } = rC(J5),
  { isMin: Sg, isMax: $y } = rC(eN),
  Fy = /print/i,
  Gy = /^print$/i,
  tN = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/,
  nN = /(\d)/,
  Xo = Number.MAX_VALUE,
  aN = { ch: 8.8984375, em: 16, rem: 16, ex: 8.296875, px: 1 };
function Wy(e) {
  const n = tN.exec(e) || (xg(e) || Sg(e) ? nN.exec(e) : null);
  if (!n) return Xo;
  if (n[0] === "0") return 0;
  const i = parseFloat(n[1]),
    r = n[2];
  return i * (aN[r] || 1);
}
function qy(e, n, i) {
  return (r) => e.test(r) || (!n.test(r) && i.test(r));
}
function iN(e, n) {
  const i = Fy.test(e),
    r = Gy.test(e),
    s = Fy.test(n),
    c = Gy.test(n);
  return i && s
    ? !r && c
      ? 1
      : r && !c
        ? -1
        : e.localeCompare(n)
    : i
      ? 1
      : s
        ? -1
        : null;
}
const rN = Sn((e, n) => {
  const i = iN(e, n);
  if (i !== null) return i;
  const r = xg(e) || Sg(e),
    s = Uy(e) || $y(e),
    c = xg(n) || Sg(n),
    d = Uy(n) || $y(n);
  if (r && d) return -1;
  if (s && c) return 1;
  const g = Wy(e),
    h = Wy(n);
  return g === Xo && h === Xo
    ? e.localeCompare(n)
    : g === Xo
      ? 1
      : h === Xo
        ? -1
        : g !== h
          ? g > h
            ? s
              ? -1
              : 1
            : s
              ? 1
              : -1
          : e.localeCompare(n);
});
function Yy(e) {
  return e.sort(([n], [i]) => rN(n, i));
}
function oC(e) {
  const n = [],
    i = [],
    r = {};
  for (const [d, g] of Object.entries(e))
    d.startsWith("@media")
      ? n.push([d, g])
      : d.startsWith("@container")
        ? i.push([d, g])
        : Mt(g)
          ? (r[d] = oC(g))
          : (r[d] = g);
  const s = Yy(n),
    c = Yy(i);
  return { ...r, ...Object.fromEntries(s), ...Object.fromEntries(c) };
}
const lC = /\s*!(important)?/i,
  oN = (e) => (Mn(e) ? lC.test(e) : !1),
  lN = (e) => (Mn(e) ? e.replace(lC, "").trim() : e);
function sC(e) {
  const { transform: n, conditions: i, normalize: r } = e,
    s = uN(e);
  return Sn(function (...d) {
    const g = s(...d),
      h = r(g),
      m = Object.create(null);
    return (
      da(h, (p, y) => {
        const b = oN(p);
        if (p == null) return;
        const [x, ...C] = i.sort(y).map(i.resolve);
        b && (p = lN(p));
        let E = n(x, p) ?? Object.create(null);
        (E = da(E, (R) => (Mn(R) && b ? `${R} !important` : R), {
          getKey: (R) => i.expandAtRule(R),
        })),
          sN(m, C.flat(), E);
      }),
      oC(m)
    );
  });
}
function sN(e, n, i) {
  let r = e;
  for (const s of n) s && (r[s] || (r[s] = Object.create(null)), (r = r[s]));
  Ar(r, i);
}
function cN(...e) {
  return e.filter((n) => Mt(n) && Object.keys(cl(n)).length > 0);
}
function uN(e) {
  function n(i) {
    const r = cN(...i);
    return r.length === 1 ? r : r.map((s) => e.normalize(s));
  }
  return Sn(function (...r) {
    return Ar({}, ...n(r));
  });
}
const cC = (e) => ({
  base: {},
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
  ...e,
});
function dN(e) {
  const { css: n, conditions: i, normalize: r, layers: s } = e;
  function c(g = {}) {
    const {
        base: h,
        variants: m,
        defaultVariants: p,
        compoundVariants: y,
      } = cC(g),
      b = sC({
        conditions: i,
        normalize: r,
        transform(A, z) {
          var B;
          return (B = m[A]) == null ? void 0 : B[z];
        },
      }),
      x = (A = {}) => {
        const z = r({ ...p, ...cl(A) });
        let B = { ...h };
        Ar(B, b(z));
        const _ = d(y, z);
        return s.wrap("recipes", n(B, _));
      },
      C = Object.keys(m),
      E = (A) => {
        const z = qS(A, ["recipe"]),
          [B, _] = xr(z, C);
        return (
          C.includes("colorPalette") ||
            (B.colorPalette = A.colorPalette || p.colorPalette),
          C.includes("orientation") && (_.orientation = A.orientation),
          [B, _]
        );
      },
      R = Object.fromEntries(
        Object.entries(m).map(([A, z]) => [A, Object.keys(z)]),
      );
    return Object.assign((A) => n(x(A)), {
      className: g.className,
      __cva__: !0,
      variantMap: R,
      variantKeys: C,
      raw: x,
      config: g,
      splitVariantProps: E,
      merge(A) {
        return c(fN(e)(this, A));
      },
    });
  }
  function d(g, h) {
    let m = {};
    return (
      g.forEach((p) => {
        Object.entries(p).every(([b, x]) =>
          b === "css"
            ? !0
            : (Array.isArray(x) ? x : [x]).some((E) => h[b] === E),
        ) && (m = n(m, p.css));
      }),
      m
    );
  }
  return c;
}
function fN(e) {
  const { css: n } = e;
  return function (r, s) {
    const c = cC(s.config),
      d = Ux(r.variantKeys, Object.keys(s.variants)),
      g = n(r.base, c.base),
      h = Object.fromEntries(
        d.map((b) => [b, n(r.config.variants[b], c.variants[b])]),
      ),
      m = Ar(r.config.defaultVariants, c.defaultVariants),
      p = [...r.compoundVariants, ...c.compoundVariants];
    return {
      className: Zt(r.className, s.className),
      base: g,
      variants: h,
      defaultVariants: m,
      compoundVariants: p,
    };
  };
}
const gN = {
    reset: "reset",
    base: "base",
    tokens: "tokens",
    recipes: "recipes",
  },
  Xy = { reset: 0, base: 1, tokens: 2, recipes: 3 };
function hN(e) {
  const n = e.layers ?? gN,
    r = Object.values(n).sort((s, c) => Xy[s] - Xy[c]);
  return {
    names: r,
    atRule: `@layer ${r.join(", ")};`,
    wrap(s, c) {
      return e.disableLayers ? c : { [`@layer ${n[s]}`]: c };
    },
  };
}
function mN(e) {
  const { utility: n, normalize: i } = e,
    { hasShorthand: r, resolveShorthand: s } = n;
  return function (c) {
    return da(c, i, { stop: (d) => Array.isArray(d), getKey: r ? s : void 0 });
  };
}
function pN(e) {
  const { preflight: n } = e;
  if (!n) return {};
  const { scope: i = "", level: r = "parent" } = Mt(n) ? n : {};
  let s = "";
  i && r === "parent" ? (s = `${i} `) : i && r === "element" && (s = `&${i}`);
  const c = {
      "*": {
        margin: "0px",
        padding: "0px",
        font: "inherit",
        wordWrap: "break-word",
        WebkitTapHighlightColor: "transparent",
      },
      "*, *::before, *::after, *::backdrop": {
        boxSizing: "border-box",
        borderWidth: "0px",
        borderStyle: "solid",
        borderColor: "var(--global-color-border, currentColor)",
      },
      hr: { height: "0px", color: "inherit", borderTopWidth: "1px" },
      body: { minHeight: "100dvh", position: "relative" },
      img: { borderStyle: "none" },
      "img, svg, video, canvas, audio, iframe, embed, object": {
        display: "block",
        verticalAlign: "middle",
      },
      iframe: { border: "none" },
      "img, video": { maxWidth: "100%", height: "auto" },
      "p, h1, h2, h3, h4, h5, h6": { overflowWrap: "break-word" },
      "ol, ul": { listStyle: "none" },
      "code, kbd, pre, samp": { fontSize: "1em" },
      "button, [type='button'], [type='reset'], [type='submit']": {
        WebkitAppearance: "button",
        backgroundColor: "transparent",
        backgroundImage: "none",
      },
      "button, input, optgroup, select, textarea": { color: "inherit" },
      "button, select": { textTransform: "none" },
      table: {
        textIndent: "0px",
        borderColor: "inherit",
        borderCollapse: "collapse",
      },
      "*::placeholder": {
        opacity: "unset",
        color: "#9ca3af",
        userSelect: "none",
      },
      textarea: { resize: "vertical" },
      summary: { display: "list-item" },
      small: { fontSize: "80%" },
      "sub, sup": {
        fontSize: "75%",
        lineHeight: 0,
        position: "relative",
        verticalAlign: "baseline",
      },
      sub: { bottom: "-0.25em" },
      sup: { top: "-0.5em" },
      dialog: { padding: "0px" },
      a: { color: "inherit", textDecoration: "inherit" },
      "abbr:where([title])": { textDecoration: "underline dotted" },
      "b, strong": { fontWeight: "bolder" },
      "code, kbd, samp, pre": {
        fontSize: "1em",
        "--font-mono-fallback":
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New'",
        fontFamily: "var(--global-font-mono, var(--font-mono-fallback))",
      },
      'input[type="text"], input[type="email"], input[type="search"], input[type="password"]':
        { WebkitAppearance: "none", MozAppearance: "none" },
      "input[type='search']": {
        WebkitAppearance: "textfield",
        outlineOffset: "-2px",
      },
      "::-webkit-search-decoration, ::-webkit-search-cancel-button": {
        WebkitAppearance: "none",
      },
      "::-webkit-file-upload-button": {
        WebkitAppearance: "button",
        font: "inherit",
      },
      'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
        { height: "auto" },
      "input[type='number']": { MozAppearance: "textfield" },
      ":-moz-ui-invalid": { boxShadow: "none" },
      ":-moz-focusring": { outline: "auto" },
      "[hidden]:where(:not([hidden='until-found']))": {
        display: "none !important",
      },
    },
    d = {
      [i || "html"]: {
        lineHeight: 1.5,
        "--font-fallback":
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        WebkitTextSizeAdjust: "100%",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
        touchAction: "manipulation",
        MozTabSize: "4",
        tabSize: "4",
        fontFamily: "var(--global-font-body, var(--font-fallback))",
      },
    };
  if (r === "element") {
    const g = Object.entries(c).reduce(
      (h, [m, p]) => ((h[m] = { [s]: p }), h),
      {},
    );
    Object.assign(d, g);
  } else s ? (d[s] = c) : Object.assign(d, c);
  return d;
}
function vN(e) {
  const { conditions: n, isValidProperty: i } = e;
  return function (s) {
    return da(s, (c) => c, {
      getKey: (c, d) =>
        Mt(d) && !n.has(c) && !i(c)
          ? bN(c)
              .map((g) => "&" + g)
              .join(", ")
          : c,
    });
  };
}
function bN(e) {
  const n = [];
  let i = 0,
    r = "",
    s = !1;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (d === "\\" && !s) {
      (s = !0), (r += d);
      continue;
    }
    if (s) {
      (s = !1), (r += d);
      continue;
    }
    d === "(" ? i++ : d === ")" && i--,
      d === "," && i === 0 ? (n.push(r.trim()), (r = "")) : (r += d);
  }
  return r && n.push(r.trim()), n;
}
const yN = (e = {}) => {
    const n = (s) => {
        var c;
        return {
          base: ((c = e.base) == null ? void 0 : c[s]) ?? {},
          variants: {},
          defaultVariants: e.defaultVariants ?? {},
          compoundVariants: e.compoundVariants ? xN(e.compoundVariants, s) : [],
        };
      },
      r = (e.slots ?? []).map((s) => [s, n(s)]);
    for (const [s, c] of Object.entries(e.variants ?? {}))
      for (const [d, g] of Object.entries(c))
        r.forEach(([h, m]) => {
          var p;
          (p = m.variants)[s] ?? (p[s] = {}), (m.variants[s][d] = g[h] ?? {});
        });
    return Object.fromEntries(r);
  },
  xN = (e, n) =>
    e.filter((i) => i.css[n]).map((i) => ({ ...i, css: i.css[n] }));
function SN(e) {
  const { cva: n } = e;
  return function (r = {}) {
    const s = Object.entries(yN(r)).map(([y, b]) => [y, n(b)]);
    function c(y) {
      const b = s.map(([x, C]) => [x, C(y)]);
      return Object.fromEntries(b);
    }
    const d = r.variants ?? {},
      g = Object.keys(d);
    function h(y) {
      var E;
      const b = qS(y, ["recipe"]),
        [x, C] = xr(b, g);
      return (
        g.includes("colorPalette") ||
          (x.colorPalette =
            y.colorPalette ||
            ((E = r.defaultVariants) == null ? void 0 : E.colorPalette)),
        g.includes("orientation") && (C.orientation = y.orientation),
        [x, C]
      );
    }
    const m = Object.fromEntries(
      Object.entries(d).map(([y, b]) => [y, Object.keys(b)]),
    );
    let p = {};
    return (
      r.className &&
        (p = Object.fromEntries(
          r.slots.map((y) => [y, `${r.className}__${y}`]),
        )),
      Object.assign(c, {
        variantMap: m,
        variantKeys: g,
        splitVariantProps: h,
        classNameMap: p,
      })
    );
  };
}
const CN = () => (e) => Array.from(new Set(e)),
  EN = /([\0-\x1f\x7f]|^-?\d)|^-$|^-|[^\x80-\uFFFF\w-]/g,
  ON = function (e, n) {
    return n
      ? e === "\0"
        ? "�"
        : e === "-" && e.length === 1
          ? "\\-"
          : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16)
      : "\\" + e;
  },
  uC = (e) => (e + "").replace(EN, ON),
  dC = (e, n) => {
    let i = "",
      r = 0,
      s = "char",
      c = "",
      d = "";
    const g = [];
    for (; r < e.length; ) {
      const h = e[r];
      if (h === "{") {
        const p = e.indexOf("}", r);
        if (p === -1) break;
        const y = e.slice(r + 1, p),
          b = n(y);
        (i += b ?? y), (r = p + 1);
        continue;
      }
      if (s === "token" && h === ",") {
        e[r] === "" && r++, (s = "fallback"), g.push(s);
        const p = n(c);
        p != null && p.endsWith(")") && (i += p.slice(0, -1)),
          (c = ""),
          (d = "");
        continue;
      }
      if (s === "fallback" && d + h === ", var(") {
        const b = wN(e.slice(r + 1)) + r + 1,
          x = e.slice(r + 1, b);
        if (b === -1) break;
        (i += ", var(" + x + ")"), (r = b + 1), (s = g.pop() ?? s), (d = "");
        continue;
      }
      if (s === "token" || s === "fallback") {
        if ((r++, h === ")")) {
          (s = g.pop() ?? s ?? "char"), (d += h);
          const p = c && (n(c) ?? uC(c));
          if (d) {
            if (
              ((d = d.slice(1).trim()),
              !d.startsWith("token(") &&
                d.endsWith(")") &&
                (d = d.slice(0, -1)),
              d.includes("token("))
            ) {
              const b = dC(d, n);
              b && (d = b.slice(0, -1));
            } else if (d) {
              const b = n(d);
              b && (d = b);
            }
          }
          const y = i.at(-1);
          d
            ? y != null && y.trim()
              ? (i += p.slice(0, -1) + (", " + d + ")"))
              : (i += d)
            : (i += p || ")"),
            (c = ""),
            (d = ""),
            (s = "char");
          continue;
        }
        s === "token" && (c += h), s === "fallback" && (d += h);
        continue;
      }
      const m = e.indexOf("token(", r);
      if (m !== -1) {
        const p = m + 6;
        (i += e.slice(r, m)), (r = p), (s = "token"), g.push(s);
        continue;
      }
      (i += h), r++;
    }
    return i;
  },
  wN = (e) => {
    let n = 0;
    const i = ["("];
    for (; n < e.length; ) {
      const r = e[n];
      if (r === "(") i.push(r);
      else if (r === ")" && (i.pop(), i.length === 0)) return n;
      n++;
    }
    return n;
  };
function fC(e) {
  const n = {};
  return (
    e.forEach((i, r) => {
      i instanceof Map ? (n[r] = Object.fromEntries(i)) : (n[r] = i);
    }),
    n
  );
}
const gC = /({([^}]*)})/g,
  kN = /[{}]/g,
  RN = /\w+\.\w+/,
  hC = (e) => {
    if (!Mn(e)) return [];
    const n = e.match(gC);
    return n ? n.map((i) => i.replace(kN, "")).map((i) => i.trim()) : [];
  },
  TN = (e) => gC.test(e);
function mC(e) {
  var i, r, s;
  if (!((i = e.extensions) != null && i.references))
    return (
      ((s = (r = e.extensions) == null ? void 0 : r.cssVar) == null
        ? void 0
        : s.ref) ?? e.value
    );
  const n = e.extensions.references ?? {};
  return (
    (e.value = Object.keys(n).reduce((c, d) => {
      const g = n[d];
      if (g.extensions.conditions) return c;
      const h = mC(g);
      return c.replace(`{${d}}`, h);
    }, e.value)),
    delete e.extensions.references,
    e.value
  );
}
function pC(e) {
  return Mt(e) && e.reference ? e.reference : String(e);
}
const uu = (e, ...n) => n.map(pC).join(` ${e} `).replace(/calc/g, ""),
  Ky = (...e) => `calc(${uu("+", ...e)})`,
  Qy = (...e) => `calc(${uu("-", ...e)})`,
  Cg = (...e) => `calc(${uu("*", ...e)})`,
  Zy = (...e) => `calc(${uu("/", ...e)})`,
  Jy = (e) => {
    const n = pC(e);
    return n != null && !Number.isNaN(parseFloat(n))
      ? String(n).startsWith("-")
        ? String(n).slice(1)
        : `-${n}`
      : Cg(n, -1);
  },
  pr = Object.assign(
    (e) => ({
      add: (...n) => pr(Ky(e, ...n)),
      subtract: (...n) => pr(Qy(e, ...n)),
      multiply: (...n) => pr(Cg(e, ...n)),
      divide: (...n) => pr(Zy(e, ...n)),
      negate: () => pr(Jy(e)),
      toString: () => e.toString(),
    }),
    { add: Ky, subtract: Qy, multiply: Cg, divide: Zy, negate: Jy },
  ),
  AN = {
    enforce: "pre",
    transform(e) {
      const {
        prefix: n,
        allTokens: i,
        formatCssVar: r,
        formatTokenName: s,
        registerToken: c,
      } = e;
      i.filter(({ extensions: g }) => g.category === "spacing").forEach((g) => {
        const h = g.path.slice(),
          m = r(h, n);
        if (Mn(g.value) && g.value === "0rem") return;
        const p = structuredClone(g);
        Object.assign(p.extensions, {
          negative: !0,
          prop: `-${g.extensions.prop}`,
          originalPath: h,
        }),
          (p.value = pr.negate(m.ref));
        const y = p.path[p.path.length - 1];
        y != null && (p.path[p.path.length - 1] = `-${y}`),
          p.path && (p.name = s(p.path)),
          c(p);
      });
    },
  },
  zN = new Set(["spacing", "sizes", "borderWidths", "fontSizes", "radii"]),
  _N = {
    enforce: "post",
    transform(e) {
      e.allTokens
        .filter((i) => zN.has(i.extensions.category) && !i.extensions.negative)
        .forEach((i) => {
          Object.assign(i.extensions, { pixelValue: nC(i.value) });
        });
    },
  },
  NN = {
    enforce: "post",
    transform(e) {
      const { allTokens: n, registerToken: i, formatTokenName: r } = e,
        s = n.filter(({ extensions: g }) => g.category === "colors"),
        c = new Map(),
        d = new Map();
      s.forEach((g) => {
        const { colorPalette: h } = g.extensions;
        h &&
          (h.keys.forEach((m) => {
            c.set(r(m), m);
          }),
          h.roots.forEach((m) => {
            var b;
            const p = r(m),
              y = d.get(p) || [];
            if (
              (y.push(g), d.set(p, y), g.extensions.default && m.length === 1)
            ) {
              const x = (b = h.keys[0]) == null ? void 0 : b.filter(Boolean);
              if (!x.length) return;
              const C = m.concat(x);
              c.set(r(C), []);
            }
          }));
      }),
        c.forEach((g) => {
          const h = ["colors", "colorPalette", ...g].filter(Boolean),
            m = r(h),
            p = r(h.slice(1));
          i(
            {
              name: m,
              value: m,
              originalValue: m,
              path: h,
              extensions: {
                condition: "base",
                originalPath: h,
                category: "colors",
                prop: p,
                virtual: !0,
              },
            },
            "pre",
          );
        });
    },
  },
  IN = {
    enforce: "post",
    transform(e) {
      e.allTokens = e.allTokens.filter((n) => n.value !== "");
    },
  },
  PN = [AN, NN, _N, IN],
  VN = {
    type: "extensions",
    enforce: "pre",
    name: "tokens/css-var",
    transform(e, n) {
      const { prefix: i, formatCssVar: r } = n,
        { negative: s, originalPath: c } = e.extensions,
        d = s ? c : e.path;
      return { cssVar: r(d.filter(Boolean), i) };
    },
  },
  DN = {
    enforce: "post",
    type: "value",
    name: "tokens/conditionals",
    transform(e, n) {
      const { prefix: i, formatCssVar: r } = n,
        s = hC(e.value);
      return (
        s.length &&
          s.forEach((c) => {
            const d = r(c.split("."), i);
            e.value = e.value.replace(`{${d.ref}}`, d);
          }),
        e.value
      );
    },
  },
  MN = {
    type: "extensions",
    enforce: "pre",
    name: "tokens/colors/colorPalette",
    match(e) {
      return e.extensions.category === "colors" && !e.extensions.virtual;
    },
    transform(e, n) {
      let i = e.path.slice();
      if ((i.pop(), i.shift(), i.length === 0)) {
        const g = [...e.path];
        g.shift(), (i = g);
      }
      if (i.length === 0) return {};
      const r = i.reduce((g, h, m, p) => {
          const y = p.slice(0, m + 1);
          return g.push(y), g;
        }, []),
        s = i[0],
        c = n.formatTokenName(i),
        d = e.path
          .slice(e.path.indexOf(s) + 1)
          .reduce((g, h, m, p) => (g.push(p.slice(m)), g), []);
      return (
        d.length === 0 && d.push([""]),
        { colorPalette: { value: c, roots: r, keys: d } }
      );
    },
  },
  LN = [VN, DN, MN],
  e0 = (e) => Mt(e) && Object.prototype.hasOwnProperty.call(e, "value");
function HN(e) {
  return e
    ? {
        breakpoints: JS(e, (n) => ({ value: n })),
        sizes: Object.fromEntries(
          Object.entries(e).map(([n, i]) => [`breakpoint-${n}`, { value: i }]),
        ),
      }
    : { breakpoints: {}, sizes: {} };
}
function BN(e) {
  const {
      prefix: n = "",
      tokens: i = {},
      semanticTokens: r = {},
      breakpoints: s = {},
    } = e,
    c = (Z) => Z.join("."),
    d = (Z, ee) => ZS(Z.join("-"), { prefix: ee }),
    g = [],
    h = new Map(),
    m = new Map(),
    p = new Map(),
    y = new Map(),
    b = new Map(),
    x = new Map(),
    C = new Map(),
    E = new Map(),
    R = [];
  function O(Z, ee) {
    g.push(Z),
      h.set(Z.name, Z),
      ee &&
        E.forEach((Ee) => {
          Ee.enforce === ee && w(Ee, Z);
        });
  }
  const A = HN(s),
    z = cl({
      ...i,
      breakpoints: A.breakpoints,
      sizes: { ...i.sizes, ...A.sizes },
    });
  function B() {
    da(
      z,
      (Z, ee) => {
        const Ee = ee.includes("DEFAULT");
        ee = t0(ee);
        const Ne = ee[0],
          We = c(ee),
          Ze = Mn(Z) ? { value: Z } : Z,
          Bt = {
            value: Ze.value,
            originalValue: Ze.value,
            name: We,
            path: ee,
            extensions: {
              condition: "base",
              originalPath: ee,
              category: Ne,
              prop: c(ee.slice(1)),
            },
          };
        Ee && (Bt.extensions.default = !0), O(Bt);
      },
      { stop: e0 },
    ),
      da(
        r,
        (Z, ee) => {
          const Ee = ee.includes("DEFAULT");
          ee = vC(t0(ee));
          const Ne = ee[0],
            We = c(ee),
            Ze = Mn(Z.value) ? { value: { base: Z.value } } : Z,
            Bt = {
              value: Ze.value.base || "",
              originalValue: Ze.value.base || "",
              name: We,
              path: ee,
              extensions: {
                originalPath: ee,
                category: Ne,
                conditions: Ze.value,
                condition: "base",
                prop: c(ee.slice(1)),
              },
            };
          Ee && (Bt.extensions.default = !0), O(Bt);
        },
        { stop: e0 },
      );
  }
  function _(Z) {
    return h.get(Z);
  }
  function Y(Z) {
    const { condition: ee } = Z.extensions;
    ee && (m.has(ee) || m.set(ee, new Set()), m.get(ee).add(Z));
  }
  function $(Z) {
    const { category: ee, prop: Ee } = Z.extensions;
    ee && (C.has(ee) || C.set(ee, new Map()), C.get(ee).set(Ee, Z));
  }
  function j(Z) {
    const {
      condition: ee,
      negative: Ee,
      virtual: Ne,
      cssVar: We,
    } = Z.extensions;
    Ee ||
      Ne ||
      !ee ||
      !We ||
      (p.has(ee) || p.set(ee, new Map()), p.get(ee).set(We.var, Z.value));
  }
  function U(Z) {
    const { category: ee, prop: Ee, cssVar: Ne, negative: We } = Z.extensions;
    if (!ee) return;
    x.has(ee) || x.set(ee, new Map());
    const Ze = We
      ? Z.extensions.conditions
        ? Z.originalValue
        : Z.value
      : Ne.ref;
    x.get(ee).set(Ee, Ze), b.set([ee, Ee].join("."), Ze);
  }
  function K(Z) {
    const { colorPalette: ee, virtual: Ee, default: Ne } = Z.extensions;
    !ee ||
      Ee ||
      ee.roots.forEach((We) => {
        var El;
        const Ze = c(We);
        y.has(Ze) || y.set(Ze, new Map());
        const Bt = UN([...Z.path], [...We]),
          Ei = c(Bt),
          ha = _(Ei);
        if (!ha || !ha.extensions.cssVar) return;
        const { var: tn } = ha.extensions.cssVar;
        if (
          (y.get(Ze).set(tn, Z.extensions.cssVar.ref), Ne && We.length === 1)
        ) {
          const Ol = c(["colors", "colorPalette"]),
            _r = _(Ol);
          if (!_r) return;
          const Oi = c(Z.path),
            wl = _(Oi);
          if (!wl) return;
          const Nr = (El = ee.keys[0]) == null ? void 0 : El.filter(Boolean);
          if (!Nr.length) return;
          const Ir = c(We.concat(Nr));
          y.has(Ir) || y.set(Ir, new Map()),
            y.get(Ir).set(_r.extensions.cssVar.var, wl.extensions.cssVar.ref);
        }
      });
  }
  let re = {};
  function ne() {
    g.forEach((Z) => {
      Y(Z), $(Z), j(Z), U(Z), K(Z);
    }),
      (re = fC(x));
  }
  const pe = (Z, ee) => {
      var ha;
      if (!Z || typeof Z != "string") return { invalid: !0, value: Z };
      const [Ee, Ne] = Z.split("/");
      if (!Ee || !Ne) return { invalid: !0, value: Ee };
      const We = ee(Ee),
        Ze = (ha = _(`opacity.${Ne}`)) == null ? void 0 : ha.value;
      if (!Ze && isNaN(Number(Ne))) return { invalid: !0, value: Ee };
      const Bt = Ze ? Number(Ze) * 100 + "%" : `${Ne}%`,
        Ei = We ?? Ee;
      return {
        invalid: !1,
        color: Ei,
        value: `color-mix(in srgb, ${Ei} ${Bt}, transparent)`,
      };
    },
    he = Sn((Z, ee) => b.get(Z) ?? ee),
    J = Sn((Z) => re[Z] || null),
    I = Sn((Z) =>
      dC(Z, (ee) => {
        if (!ee) return;
        if (ee.includes("/")) {
          const Ne = pe(ee, (We) => he(We));
          if (Ne.invalid)
            throw new Error("Invalid color mix at " + ee + ": " + Ne.value);
          return Ne.value;
        }
        const Ee = he(ee);
        return Ee || (RN.test(ee) ? uC(ee) : ee);
      }),
    ),
    F = {
      prefix: n,
      allTokens: g,
      tokenMap: h,
      registerToken: O,
      getByName: _,
      formatTokenName: c,
      formatCssVar: d,
      flatMap: b,
      cssVarMap: p,
      categoryMap: C,
      colorPaletteMap: y,
      getVar: he,
      getCategoryValues: J,
      expandReferenceInValue: I,
    };
  function W(...Z) {
    Z.forEach((ee) => {
      E.set(ee.name, ee);
    });
  }
  function ie(...Z) {
    R.push(...Z);
  }
  function w(Z, ee) {
    if (ee.extensions.references || (Dg(Z.match) && !Z.match(ee))) return;
    const Ne = ((We) => Z.transform(We, F))(ee);
    switch (!0) {
      case Z.type === "extensions":
        Object.assign(ee.extensions, Ne);
        break;
      case Z.type === "value":
        ee.value = Ne;
        break;
      default:
        ee[Z.type] = Ne;
        break;
    }
  }
  function G(Z) {
    R.forEach((ee) => {
      ee.enforce === Z && ee.transform(F);
    });
  }
  function te(Z) {
    E.forEach((ee) => {
      ee.enforce === Z &&
        g.forEach((Ee) => {
          w(ee, Ee);
        });
    });
  }
  function ae() {
    g.forEach((Z) => {
      const ee = jN(Z);
      !ee ||
        ee.length === 0 ||
        ee.forEach((Ee) => {
          O(Ee);
        });
    });
  }
  function le(Z) {
    return hC(Z)
      .map((Ee) => _(Ee))
      .filter(Boolean);
  }
  function xe() {
    g.forEach((Z) => {
      if (!TN(Z.value)) return;
      const ee = le(Z.value);
      Z.extensions.references = ee.reduce(
        (Ee, Ne) => ((Ee[Ne.name] = Ne), Ee),
        {},
      );
    });
  }
  function fe() {
    g.forEach((Z) => {
      mC(Z);
    });
  }
  function At() {
    G("pre"), te("pre"), ae(), xe(), fe(), G("post"), te("post"), ne();
  }
  return B(), W(...LN), ie(...PN), At(), F;
}
function t0(e) {
  return e[0] === "DEFAULT" ? e : e.filter((n) => n !== "DEFAULT");
}
function vC(e) {
  return e.filter((n) => n !== "base");
}
function jN(e) {
  if (!e.extensions.conditions) return;
  const { conditions: n } = e.extensions,
    i = [];
  return (
    da(n, (r, s) => {
      const c = vC(s);
      if (!c.length) return;
      const d = structuredClone(e);
      (d.value = r), (d.extensions.condition = c.join(":")), i.push(d);
    }),
    i
  );
}
function UN(e, n) {
  const i = e.findIndex((r, s) => n.every((c, d) => e[s + d] === c));
  return i === -1 || (e.splice(i, n.length), e.splice(i, 0, "colorPalette")), e;
}
CN()([
  "aspectRatios",
  "zIndex",
  "opacity",
  "colors",
  "fonts",
  "fontSizes",
  "fontWeights",
  "lineHeights",
  "letterSpacings",
  "sizes",
  "shadows",
  "spacing",
  "radii",
  "cursor",
  "borders",
  "borderWidths",
  "borderStyles",
  "durations",
  "easings",
  "animations",
  "blurs",
  "gradients",
  "breakpoints",
  "assets",
]);
function $N(e) {
  return Object.fromEntries(Object.entries(e).map(([n, i]) => [n, i]));
}
function FN(e) {
  const n = $N(e.config),
    i = e.tokens,
    r = new Map(),
    s = new Map();
  function c(j, U) {
    (n[j] = U), d(j, U);
  }
  const d = (j, U) => {
      const K = E(U);
      K && (s.set(j, K), y(j, U));
    },
    g = () => {
      for (const [j, U] of Object.entries(n)) U && d(j, U);
    },
    h = () => {
      for (const [j, U] of Object.entries(n)) {
        const { shorthand: K } = U ?? {};
        if (!K) continue;
        (Array.isArray(K) ? K : [K]).forEach((ne) => r.set(ne, j));
      }
    },
    m = () => {
      const j = fC(i.colorPaletteMap);
      c("colorPalette", { values: Object.keys(j), transform: Sn((U) => j[U]) });
    },
    p = new Map(),
    y = (j, U) => {
      if (!U) return;
      const K = E(U, (ne) => `type:Tokens["${ne}"]`);
      if (typeof K == "object" && K.type) {
        p.set(j, new Set([`type:${K.type}`]));
        return;
      }
      if (K) {
        const ne = new Set(Object.keys(K));
        p.set(j, ne);
      }
      const re = p.get(j) ?? new Set();
      U.property && p.set(j, re.add(`CssProperties["${U.property}"]`));
    },
    b = () => {
      for (const [j, U] of Object.entries(n)) U && y(j, U);
    },
    x = (j, U) => {
      const K = p.get(j) ?? new Set();
      p.set(j, new Set([...K, ...U]));
    },
    C = () => {
      const j = new Map();
      for (const [U, K] of p.entries()) {
        if (K.size === 0) {
          j.set(U, ["string"]);
          continue;
        }
        const re = Array.from(K).map((ne) =>
          ne.startsWith("CssProperties")
            ? ne
            : ne.startsWith("type:")
              ? ne.replace("type:", "")
              : JSON.stringify(ne),
        );
        j.set(U, re);
      }
      return j;
    },
    E = (j, U) => {
      const { values: K } = j,
        re = (ne) => {
          const pe = U == null ? void 0 : U(ne);
          return pe ? { [pe]: pe } : void 0;
        };
      return Mn(K)
        ? ((re == null ? void 0 : re(K)) ?? i.getCategoryValues(K) ?? {})
        : Array.isArray(K)
          ? K.reduce((ne, pe) => ((ne[pe] = pe), ne), {})
          : Dg(K)
            ? K(U ? re : i.getCategoryValues)
            : K;
    },
    R = Sn((j, U) => ({ [j]: j.startsWith("--") ? i.getVar(U, U) : U })),
    O = Object.assign(i.getVar, { raw: (j) => i.getByName(j) }),
    A = Sn((j, U) => {
      var he;
      const K = _(j);
      Mn(U) && !U.includes("_EMO_") && (U = i.expandReferenceInValue(U));
      const re = n[K];
      if (!re) return R(K, U);
      const ne = (he = s.get(K)) == null ? void 0 : he[U];
      if (!re.transform) return R(j, ne ?? U);
      const pe = (J) => b5(J, O);
      return re.transform(ne ?? U, {
        raw: U,
        token: O,
        utils: { colorMix: pe },
      });
    });
  function z() {
    h(), m(), g(), b();
  }
  z();
  const B = r.size > 0,
    _ = Sn((j) => r.get(j) ?? j);
  return {
    keys: () => [...Array.from(r.keys()), ...Object.keys(n)],
    hasShorthand: B,
    transform: A,
    shorthands: r,
    resolveShorthand: _,
    register: c,
    getTypes: C,
    addPropertyType: x,
  };
}
function GN(...e) {
  const n = QS(...e),
    {
      theme: i = {},
      utilities: r = {},
      globalCss: s = {},
      cssVarsRoot: c = ":where(:root, :host)",
      cssVarsPrefix: d = "chakra",
      preflight: g,
    } = n,
    h = hN(n),
    m = BN({
      breakpoints: i.breakpoints,
      tokens: i.tokens,
      semanticTokens: i.semanticTokens,
      prefix: d,
    }),
    p = Y5(i.breakpoints ?? {}),
    y = Z5({ conditions: n.conditions ?? {}, breakpoints: p }),
    b = FN({ config: r, tokens: m });
  function x() {
    const { textStyles: W, layerStyles: ie, animationStyles: w } = i,
      G = cl({ textStyle: W, layerStyle: ie, animationStyle: w });
    for (const [te, ae] of Object.entries(G)) {
      const le = $5(ae ?? {}, (xe) => Mt(xe) && "value" in xe);
      b.register(te, {
        values: Object.keys(le),
        transform(xe) {
          return z(le[xe]);
        },
      });
    }
  }
  x(), b.addPropertyType("animationName", Object.keys(i.keyframes ?? {}));
  const C = new Set(["css", ...b.keys(), ...y.keys()]),
    E = Sn((W) => C.has(W) || j5(W)),
    R = (W) =>
      Array.isArray(W)
        ? W.reduce((ie, w, G) => {
            const te = y.breakpoints[G];
            return w != null && (ie[te] = w), ie;
          }, {})
        : W,
    O = mN({ utility: b, normalize: R }),
    A = vN({ conditions: y, isValidProperty: E }),
    z = sC({ transform: b.transform, conditions: y, normalize: O }),
    B = dN({ css: z, conditions: y, normalize: O, layers: h }),
    _ = SN({ cva: B });
  function Y() {
    const W = {};
    for (const [ie, w] of m.cssVarMap.entries()) {
      const G = Object.fromEntries(w);
      if (Object.keys(G).length === 0) continue;
      const te = ie === "base" ? c : y.resolve(ie),
        ae = te.startsWith("@"),
        le = z(A({ [te]: ae ? { [c]: G } : G }));
      Ar(W, le);
    }
    return h.wrap("tokens", W);
  }
  function $() {
    const W = Object.fromEntries(
        Object.entries(i.keyframes ?? {}).map(([w, G]) => [
          `@keyframes ${w}`,
          G,
        ]),
      ),
      ie = Object.assign({}, W, z(A(s)));
    return h.wrap("base", ie);
  }
  function j(W) {
    return xr(W, E);
  }
  function U() {
    const W = pN({ preflight: g });
    return h.wrap("reset", W);
  }
  const K = WN(m),
    re = (W, ie) => {
      var w;
      return ((w = K.get(W)) == null ? void 0 : w.value) || ie;
    };
  re.var = (W, ie) => {
    var w;
    return ((w = K.get(W)) == null ? void 0 : w.variable) || ie;
  };
  function ne(W, ie) {
    var w;
    return ((w = i.recipes) == null ? void 0 : w[W]) ?? ie;
  }
  function pe(W, ie) {
    var w;
    return ((w = i.slotRecipes) == null ? void 0 : w[W]) ?? ie;
  }
  function he(W) {
    return Object.hasOwnProperty.call(i.recipes ?? {}, W);
  }
  function J(W) {
    return Object.hasOwnProperty.call(i.slotRecipes ?? {}, W);
  }
  function I(W) {
    return he(W) || J(W);
  }
  const F = [U(), $(), Y()];
  return {
    $$chakra: !0,
    _config: n,
    _global: F,
    breakpoints: p,
    tokens: m,
    conditions: y,
    utility: b,
    token: re,
    properties: C,
    layers: h,
    isValidProperty: E,
    splitCssProps: j,
    normalizeValue: R,
    getTokenCss: Y,
    getGlobalCss: $,
    getPreflightCss: U,
    css: z,
    cva: B,
    sva: _,
    getRecipe: ne,
    getSlotRecipe: pe,
    hasRecipe: I,
    isRecipe: he,
    isSlotRecipe: J,
  };
}
function WN(e) {
  const n = new Map();
  return (
    e.allTokens.forEach((i) => {
      const { cssVar: r, virtual: s, conditions: c } = i.extensions,
        d = c || s ? r.ref : i.value;
      n.set(i.name, { value: d, variable: r.ref });
    }),
    n
  );
}
const qN = {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  Jf = "var(--chakra-empty,/*!*/ /*!*/)",
  YN = S5({
    "*": {
      fontFeatureSettings: '"cv11"',
      "--ring-inset": Jf,
      "--ring-offset-width": "0px",
      "--ring-offset-color": "#fff",
      "--ring-color": "rgba(66, 153, 225, 0.6)",
      "--ring-offset-shadow": "0 0 #0000",
      "--ring-shadow": "0 0 #0000",
      ...Object.fromEntries(
        [
          "brightness",
          "contrast",
          "grayscale",
          "hue-rotate",
          "invert",
          "saturate",
          "sepia",
          "drop-shadow",
        ].map((e) => [`--${e}`, Jf]),
      ),
      ...Object.fromEntries(
        [
          "blur",
          "brightness",
          "contrast",
          "grayscale",
          "hue-rotate",
          "invert",
          "opacity",
          "saturate",
          "sepia",
        ].map((e) => [`--backdrop-${e}`, Jf]),
      ),
      "--global-font-mono": "fonts.mono",
      "--global-font-body": "fonts.body",
      "--global-color-border": "colors.border",
    },
    html: { color: "fg", bg: "bg", lineHeight: "1.5", colorPalette: "gray" },
    "*::placeholder, *[data-placeholder]": { color: "fg.muted/80" },
    "*::selection": { bg: "colorPalette.emphasized/80" },
  }),
  XN = O5({
    "fill.muted": {
      value: { background: "colorPalette.muted", color: "colorPalette.fg" },
    },
    "fill.subtle": {
      value: { background: "colorPalette.subtle", color: "colorPalette.fg" },
    },
    "fill.surface": {
      value: {
        background: "colorPalette.subtle",
        color: "colorPalette.fg",
        boxShadow: "0 0 0px 1px var(--shadow-color)",
        boxShadowColor: "colorPalette.muted",
      },
    },
    "fill.solid": {
      value: {
        background: "colorPalette.solid",
        color: "colorPalette.contrast",
      },
    },
    "outline.subtle": {
      value: {
        color: "colorPalette.fg",
        boxShadow: "inset 0 0 0px 1px var(--shadow-color)",
        boxShadowColor: "colorPalette.subtle",
      },
    },
    "outline.solid": {
      value: {
        borderWidth: "1px",
        borderColor: "colorPalette.solid",
        color: "colorPalette.fg",
      },
    },
    "indicator.bottom": {
      value: {
        position: "relative",
        "--indicator-color-fallback": "colors.colorPalette.solid",
        _before: {
          content: '""',
          position: "absolute",
          bottom: "var(--indicator-offset-y, 0)",
          insetInline: "var(--indicator-offset-x, 0)",
          height: "var(--indicator-thickness, 2px)",
          background: "var(--indicator-color, var(--indicator-color-fallback))",
        },
      },
    },
    "indicator.top": {
      value: {
        position: "relative",
        "--indicator-color-fallback": "colors.colorPalette.solid",
        _before: {
          content: '""',
          position: "absolute",
          top: "var(--indicator-offset-y, 0)",
          insetInline: "var(--indicator-offset-x, 0)",
          height: "var(--indicator-thickness, 2px)",
          background: "var(--indicator-color, var(--indicator-color-fallback))",
        },
      },
    },
    "indicator.start": {
      value: {
        position: "relative",
        "--indicator-color-fallback": "colors.colorPalette.solid",
        _before: {
          content: '""',
          position: "absolute",
          insetInlineStart: "var(--indicator-offset-x, 0)",
          insetBlock: "var(--indicator-offset-y, 0)",
          width: "var(--indicator-thickness, 2px)",
          background: "var(--indicator-color, var(--indicator-color-fallback))",
        },
      },
    },
    "indicator.end": {
      value: {
        position: "relative",
        "--indicator-color-fallback": "colors.colorPalette.solid",
        _before: {
          content: '""',
          position: "absolute",
          insetInlineEnd: "var(--indicator-offset-x, 0)",
          insetBlock: "var(--indicator-offset-y, 0)",
          width: "var(--indicator-thickness, 2px)",
          background: "var(--indicator-color, var(--indicator-color-fallback))",
        },
      },
    },
    disabled: { value: { opacity: "0.5", cursor: "not-allowed" } },
    none: { value: {} },
  }),
  KN = E5({
    "slide-fade-in": {
      value: {
        transformOrigin: "var(--transform-origin)",
        "&[data-placement^=top]": {
          animationName: "slide-from-bottom, fade-in",
        },
        "&[data-placement^=bottom]": {
          animationName: "slide-from-top, fade-in",
        },
        "&[data-placement^=left]": {
          animationName: "slide-from-right, fade-in",
        },
        "&[data-placement^=right]": {
          animationName: "slide-from-left, fade-in",
        },
      },
    },
    "slide-fade-out": {
      value: {
        transformOrigin: "var(--transform-origin)",
        "&[data-placement^=top]": {
          animationName: "slide-to-bottom, fade-out",
        },
        "&[data-placement^=bottom]": {
          animationName: "slide-to-top, fade-out",
        },
        "&[data-placement^=left]": {
          animationName: "slide-to-right, fade-out",
        },
        "&[data-placement^=right]": {
          animationName: "slide-to-left, fade-out",
        },
      },
    },
    "scale-fade-in": {
      value: {
        transformOrigin: "var(--transform-origin)",
        animationName: "scale-in, fade-in",
      },
    },
    "scale-fade-out": {
      value: {
        transformOrigin: "var(--transform-origin)",
        animationName: "scale-out, fade-out",
      },
    },
  }),
  ph = st({
    className: "chakra-badge",
    base: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "l2",
      gap: "1",
      fontWeight: "medium",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      userSelect: "none",
    },
    variants: {
      variant: {
        solid: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
        subtle: { bg: "colorPalette.subtle", color: "colorPalette.fg" },
        outline: {
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
        },
        surface: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
        },
        plain: { color: "colorPalette.fg" },
      },
      size: {
        xs: { textStyle: "2xs", px: "1", minH: "4" },
        sm: { textStyle: "xs", px: "1.5", minH: "5" },
        md: { textStyle: "sm", px: "2", minH: "6" },
        lg: { textStyle: "sm", px: "2.5", minH: "7" },
      },
    },
    defaultVariants: { variant: "subtle", size: "sm" },
  }),
  QN = st({
    className: "chakra-button",
    base: {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      borderRadius: "l2",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      borderWidth: "1px",
      borderColor: "transparent",
      cursor: "button",
      flexShrink: "0",
      outline: "0",
      lineHeight: "1.2",
      isolation: "isolate",
      fontWeight: "medium",
      transitionProperty: "common",
      transitionDuration: "moderate",
      focusVisibleRing: "outside",
      _disabled: { layerStyle: "disabled" },
      _icon: { flexShrink: "0" },
    },
    variants: {
      size: {
        "2xs": {
          h: "6",
          minW: "6",
          textStyle: "xs",
          px: "2",
          gap: "1",
          _icon: { width: "3.5", height: "3.5" },
        },
        xs: {
          h: "8",
          minW: "8",
          textStyle: "xs",
          px: "2.5",
          gap: "1",
          _icon: { width: "4", height: "4" },
        },
        sm: {
          h: "9",
          minW: "9",
          px: "3.5",
          textStyle: "sm",
          gap: "2",
          _icon: { width: "4", height: "4" },
        },
        md: {
          h: "10",
          minW: "10",
          textStyle: "sm",
          px: "4",
          gap: "2",
          _icon: { width: "5", height: "5" },
        },
        lg: {
          h: "11",
          minW: "11",
          textStyle: "md",
          px: "5",
          gap: "3",
          _icon: { width: "5", height: "5" },
        },
        xl: {
          h: "12",
          minW: "12",
          textStyle: "md",
          px: "5",
          gap: "2.5",
          _icon: { width: "5", height: "5" },
        },
        "2xl": {
          h: "16",
          minW: "16",
          textStyle: "lg",
          px: "7",
          gap: "3",
          _icon: { width: "6", height: "6" },
        },
      },
      variant: {
        solid: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "transparent",
          _hover: { bg: "colorPalette.solid/90" },
          _expanded: { bg: "colorPalette.solid/90" },
        },
        subtle: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          borderColor: "transparent",
          _hover: { bg: "colorPalette.muted" },
          _expanded: { bg: "colorPalette.muted" },
        },
        surface: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          shadow: "0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
          _hover: { bg: "colorPalette.muted" },
          _expanded: { bg: "colorPalette.muted" },
        },
        outline: {
          borderWidth: "1px",
          borderColor: "colorPalette.muted",
          color: "colorPalette.fg",
          _hover: { bg: "colorPalette.subtle" },
          _expanded: { bg: "colorPalette.subtle" },
        },
        ghost: {
          bg: "transparent",
          color: "colorPalette.fg",
          _hover: { bg: "colorPalette.subtle" },
          _expanded: { bg: "colorPalette.subtle" },
        },
        plain: { color: "colorPalette.fg" },
      },
    },
    defaultVariants: { size: "md", variant: "solid" },
  }),
  yt = st({
    className: "chakra-checkmark",
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      color: "white",
      borderWidth: "1px",
      borderColor: "transparent",
      borderRadius: "l1",
      cursor: "checkbox",
      focusVisibleRing: "outside",
      _icon: { boxSize: "full" },
      _invalid: { colorPalette: "red", borderColor: "border.error" },
      _disabled: { opacity: "0.5", cursor: "disabled" },
    },
    variants: {
      size: {
        xs: { boxSize: "3" },
        sm: { boxSize: "4" },
        md: { boxSize: "5", p: "0.5" },
        lg: { boxSize: "6", p: "0.5" },
      },
      variant: {
        solid: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        outline: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
            borderColor: "colorPalette.solid",
          },
        },
        subtle: {
          bg: "colorPalette.muted",
          borderColor: "colorPalette.muted",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
          },
        },
        plain: {
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
          },
        },
        inverted: {
          borderColor: "border",
          color: "colorPalette.fg",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            borderColor: "colorPalette.solid",
          },
        },
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }),
  { variants: ZN, defaultVariants: JN } = ph,
  e3 = st({
    className: "chakra-code",
    base: {
      fontFamily: "mono",
      alignItems: "center",
      display: "inline-flex",
      borderRadius: "l2",
    },
    variants: ZN,
    defaultVariants: JN,
  }),
  bC = st({
    className: "color-swatch",
    base: {
      boxSize: "var(--swatch-size)",
      shadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
      "--checker-size": "8px",
      "--checker-bg": "colors.bg",
      "--checker-fg": "colors.bg.emphasized",
      background:
        "linear-gradient(var(--color), var(--color)), repeating-conic-gradient(var(--checker-fg) 0%, var(--checker-fg) 25%, var(--checker-bg) 0%, var(--checker-bg) 50%) 0% 50% / var(--checker-size) var(--checker-size) !important",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
    },
    variants: {
      size: {
        "2xs": { "--swatch-size": "sizes.3.5" },
        xs: { "--swatch-size": "sizes.4" },
        sm: { "--swatch-size": "sizes.4.5" },
        md: { "--swatch-size": "sizes.5" },
        lg: { "--swatch-size": "sizes.6" },
        xl: { "--swatch-size": "sizes.7" },
        "2xl": { "--swatch-size": "sizes.8" },
        inherit: { "--swatch-size": "inherit" },
        full: { "--swatch-size": "100%" },
      },
      shape: {
        square: { borderRadius: "none" },
        circle: { borderRadius: "full" },
        rounded: { borderRadius: "l1" },
      },
    },
    defaultVariants: { size: "md", shape: "rounded" },
  }),
  t3 = st({
    className: "chakra-container",
    base: {
      position: "relative",
      maxWidth: "8xl",
      w: "100%",
      mx: "auto",
      px: { base: "4", md: "6", lg: "8" },
    },
    variants: {
      centerContent: {
        true: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
      fluid: { true: { maxWidth: "full" } },
    },
  }),
  n3 = st({
    className: "chakra-heading",
    base: { fontFamily: "heading", fontWeight: "semibold" },
    variants: {
      size: {
        xs: { textStyle: "xs" },
        sm: { textStyle: "sm" },
        md: { textStyle: "md" },
        lg: { textStyle: "lg" },
        xl: { textStyle: "xl" },
        "2xl": { textStyle: "2xl" },
        "3xl": { textStyle: "3xl" },
        "4xl": { textStyle: "4xl" },
        "5xl": { textStyle: "5xl" },
        "6xl": { textStyle: "6xl" },
        "7xl": { textStyle: "7xl" },
      },
    },
    defaultVariants: { size: "xl" },
  }),
  a3 = st({
    className: "chakra-icon",
    base: {
      display: "inline-block",
      lineHeight: "1em",
      flexShrink: "0",
      color: "currentcolor",
      verticalAlign: "middle",
    },
    variants: {
      size: {
        inherit: {},
        xs: { boxSize: "3" },
        sm: { boxSize: "4" },
        md: { boxSize: "5" },
        lg: { boxSize: "6" },
        xl: { boxSize: "7" },
        "2xl": { boxSize: "8" },
      },
    },
    defaultVariants: { size: "inherit" },
  }),
  at = st({
    className: "chakra-input",
    base: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      textAlign: "start",
      borderRadius: "l2",
      _disabled: { layerStyle: "disabled" },
      height: "var(--input-height)",
      minW: "var(--input-height)",
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
    },
    variants: {
      size: {
        "2xs": { textStyle: "xs", px: "2", "--input-height": "sizes.7" },
        xs: { textStyle: "xs", px: "2", "--input-height": "sizes.8" },
        sm: { textStyle: "sm", px: "2.5", "--input-height": "sizes.9" },
        md: { textStyle: "sm", px: "3", "--input-height": "sizes.10" },
        lg: { textStyle: "md", px: "4", "--input-height": "sizes.11" },
        xl: { textStyle: "md", px: "4.5", "--input-height": "sizes.12" },
        "2xl": { textStyle: "lg", px: "5", "--input-height": "sizes.16" },
      },
      variant: {
        outline: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          focusVisibleRing: "inside",
          focusRingColor: "var(--focus-color)",
        },
        subtle: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
          focusRingColor: "var(--focus-color)",
        },
        flushed: {
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          _focusVisible: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
            _invalid: {
              borderColor: "var(--error-color)",
              boxShadow: "0px 1px 0px 0px var(--error-color)",
            },
          },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  i3 = st({
    className: "chakra-input-addon",
    base: {
      flex: "0 0 auto",
      width: "auto",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      alignSelf: "stretch",
      borderRadius: "l2",
    },
    variants: {
      size: at.variants.size,
      variant: {
        outline: { borderWidth: "1px", borderColor: "border", bg: "bg.muted" },
        subtle: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.emphasized",
        },
        flushed: {
          borderBottom: "1px solid",
          borderColor: "inherit",
          borderRadius: "0",
          px: "0",
          bg: "transparent",
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  r3 = st({
    className: "chakra-kbd",
    base: {
      display: "inline-flex",
      alignItems: "center",
      fontWeight: "medium",
      fontFamily: "mono",
      flexShrink: "0",
      whiteSpace: "nowrap",
      wordSpacing: "-0.5em",
      userSelect: "none",
      px: "1",
      borderRadius: "l2",
    },
    variants: {
      variant: {
        raised: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          borderWidth: "1px",
          borderBottomWidth: "2px",
          borderColor: "colorPalette.muted",
        },
        outline: { borderWidth: "1px", color: "colorPalette.fg" },
        subtle: { bg: "colorPalette.muted", color: "colorPalette.fg" },
        plain: { color: "colorPalette.fg" },
      },
      size: {
        sm: { textStyle: "xs", height: "4.5" },
        md: { textStyle: "sm", height: "5" },
        lg: { textStyle: "md", height: "6" },
      },
    },
    defaultVariants: { size: "md", variant: "raised" },
  }),
  o3 = st({
    className: "chakra-link",
    base: {
      display: "inline-flex",
      alignItems: "center",
      outline: "none",
      gap: "1.5",
      cursor: "pointer",
      borderRadius: "l1",
      focusRing: "outside",
    },
    variants: {
      variant: {
        underline: {
          color: "colorPalette.fg",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "currentColor/20",
        },
        plain: {
          color: "colorPalette.fg",
          _hover: {
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            textDecorationColor: "currentColor/20",
          },
        },
      },
    },
    defaultVariants: { variant: "plain" },
  }),
  l3 = st({
    className: "chakra-mark",
    base: { bg: "transparent", color: "inherit", whiteSpace: "nowrap" },
    variants: {
      variant: {
        subtle: { bg: "colorPalette.subtle", color: "inherit" },
        solid: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
        text: { fontWeight: "medium" },
        plain: {},
      },
    },
  }),
  xt = st({
    className: "chakra-radiomark",
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      verticalAlign: "top",
      color: "white",
      borderWidth: "1px",
      borderColor: "transparent",
      borderRadius: "full",
      cursor: "radio",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
      _invalid: { colorPalette: "red", borderColor: "red.500" },
      _disabled: { opacity: "0.5", cursor: "disabled" },
      "& .dot": {
        height: "100%",
        width: "100%",
        borderRadius: "full",
        bg: "currentColor",
        scale: "0.4",
      },
    },
    variants: {
      variant: {
        solid: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        subtle: {
          borderWidth: "1px",
          bg: "colorPalette.muted",
          borderColor: "colorPalette.muted",
          color: "transparent",
          _checked: { color: "colorPalette.fg" },
        },
        outline: {
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            color: "colorPalette.fg",
            borderColor: "colorPalette.solid",
          },
          "& .dot": { scale: "0.6" },
        },
        inverted: {
          bg: "bg",
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            color: "colorPalette.solid",
            borderColor: "currentcolor",
          },
        },
      },
      size: {
        xs: { boxSize: "3" },
        sm: { boxSize: "4" },
        md: { boxSize: "5" },
        lg: { boxSize: "6" },
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }),
  s3 = st({
    className: "chakra-separator",
    base: { display: "block", borderColor: "border" },
    variants: {
      variant: {
        solid: { borderStyle: "solid" },
        dashed: { borderStyle: "dashed" },
        dotted: { borderStyle: "dotted" },
      },
      orientation: {
        vertical: { borderInlineStartWidth: "var(--separator-thickness)" },
        horizontal: { borderTopWidth: "var(--separator-thickness)" },
      },
      size: {
        xs: { "--separator-thickness": "0.5px" },
        sm: { "--separator-thickness": "1px" },
        md: { "--separator-thickness": "2px" },
        lg: { "--separator-thickness": "3px" },
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "solid",
      orientation: "horizontal",
    },
  }),
  c3 = st({
    className: "chakra-skeleton",
    base: {},
    variants: {
      loading: {
        true: {
          borderRadius: "l2",
          boxShadow: "none",
          backgroundClip: "padding-box",
          cursor: "default",
          color: "transparent",
          pointerEvents: "none",
          userSelect: "none",
          flexShrink: "0",
          "&::before, &::after, *": { visibility: "hidden" },
        },
        false: {
          background: "unset",
          animation: "fade-in var(--fade-duration, 0.1s) ease-out !important",
        },
      },
      variant: {
        pulse: {
          background: "bg.emphasized",
          animation: "pulse",
          animationDuration: "var(--duration, 1.2s)",
        },
        shine: {
          "--animate-from": "200%",
          "--animate-to": "-200%",
          "--start-color": "colors.bg.muted",
          "--end-color": "colors.bg.emphasized",
          backgroundImage:
            "linear-gradient(270deg,var(--start-color),var(--end-color),var(--end-color),var(--start-color))",
          backgroundSize: "400% 100%",
          animation: "bg-position var(--duration, 5s) ease-in-out infinite",
        },
        none: { animation: "none" },
      },
    },
    defaultVariants: { variant: "pulse", loading: !0 },
  }),
  u3 = st({
    className: "chakra-skip-nav",
    base: {
      display: "inline-flex",
      bg: "bg.panel",
      padding: "2.5",
      borderRadius: "l2",
      fontWeight: "semibold",
      focusVisibleRing: "outside",
      textStyle: "sm",
      userSelect: "none",
      border: "0",
      height: "1px",
      width: "1px",
      margin: "-1px",
      outline: "0",
      overflow: "hidden",
      position: "absolute",
      clip: "rect(0 0 0 0)",
      _focusVisible: {
        clip: "auto",
        width: "auto",
        height: "auto",
        position: "fixed",
        top: "6",
        insetStart: "6",
      },
    },
  }),
  d3 = st({
    className: "chakra-spinner",
    base: {
      display: "inline-block",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "full",
      width: "var(--spinner-size)",
      height: "var(--spinner-size)",
      animation: "spin",
      animationDuration: "slowest",
      "--spinner-track-color": "transparent",
      borderBottomColor: "var(--spinner-track-color)",
      borderInlineStartColor: "var(--spinner-track-color)",
    },
    variants: {
      size: {
        inherit: { "--spinner-size": "1em" },
        xs: { "--spinner-size": "sizes.3" },
        sm: { "--spinner-size": "sizes.4" },
        md: { "--spinner-size": "sizes.5" },
        lg: { "--spinner-size": "sizes.8" },
        xl: { "--spinner-size": "sizes.10" },
      },
    },
    defaultVariants: { size: "md" },
  }),
  f3 = st({
    className: "chakra-textarea",
    base: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      textAlign: "start",
      borderRadius: "l2",
      _disabled: { layerStyle: "disabled" },
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
    },
    variants: {
      size: {
        xs: { textStyle: "xs", px: "2", py: "1.5", scrollPaddingBottom: "1.5" },
        sm: { textStyle: "sm", px: "2.5", py: "2", scrollPaddingBottom: "2" },
        md: { textStyle: "sm", px: "3", py: "2", scrollPaddingBottom: "2" },
        lg: { textStyle: "md", px: "4", py: "3", scrollPaddingBottom: "3" },
        xl: {
          textStyle: "md",
          px: "4.5",
          py: "3.5",
          scrollPaddingBottom: "3.5",
        },
      },
      variant: {
        outline: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          focusVisibleRing: "inside",
        },
        subtle: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
        },
        flushed: {
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          _focusVisible: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
          },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  g3 = {
    badge: ph,
    button: QN,
    code: e3,
    container: t3,
    heading: n3,
    input: at,
    inputAddon: i3,
    kbd: r3,
    link: o3,
    mark: l3,
    separator: s3,
    skeleton: c3,
    skipNavLink: u3,
    spinner: d3,
    textarea: f3,
    icon: a3,
    checkmark: yt,
    radiomark: xt,
    colorSwatch: bC,
  },
  h3 = hh.colors({
    bg: {
      DEFAULT: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
      subtle: {
        value: { _light: "{colors.gray.50}", _dark: "{colors.gray.950}" },
      },
      muted: {
        value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
      },
      emphasized: {
        value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
      },
      inverted: {
        value: { _light: "{colors.black}", _dark: "{colors.white}" },
      },
      panel: {
        value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
      },
      error: {
        value: { _light: "{colors.red.50}", _dark: "{colors.red.950}" },
      },
      warning: {
        value: { _light: "{colors.orange.50}", _dark: "{colors.orange.950}" },
      },
      success: {
        value: { _light: "{colors.green.50}", _dark: "{colors.green.950}" },
      },
      info: {
        value: { _light: "{colors.blue.50}", _dark: "{colors.blue.950}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.black}", _dark: "{colors.gray.50}" },
      },
      muted: {
        value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
      },
      subtle: {
        value: { _light: "{colors.gray.400}", _dark: "{colors.gray.500}" },
      },
      inverted: {
        value: { _light: "{colors.gray.50}", _dark: "{colors.black}" },
      },
      error: {
        value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
      },
      warning: {
        value: { _light: "{colors.orange.600}", _dark: "{colors.orange.300}" },
      },
      success: {
        value: { _light: "{colors.green.600}", _dark: "{colors.green.300}" },
      },
      info: {
        value: { _light: "{colors.blue.600}", _dark: "{colors.blue.300}" },
      },
    },
    border: {
      DEFAULT: {
        value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
      },
      muted: {
        value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
      },
      subtle: {
        value: { _light: "{colors.gray.50}", _dark: "{colors.gray.950}" },
      },
      emphasized: {
        value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
      },
      inverted: {
        value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
      },
      error: {
        value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
      },
      warning: {
        value: { _light: "{colors.orange.500}", _dark: "{colors.orange.400}" },
      },
      success: {
        value: { _light: "{colors.green.500}", _dark: "{colors.green.400}" },
      },
      info: {
        value: { _light: "{colors.blue.500}", _dark: "{colors.blue.400}" },
      },
    },
    gray: {
      contrast: {
        value: { _light: "{colors.white}", _dark: "{colors.black}" },
      },
      fg: {
        value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
      },
      subtle: {
        value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
      },
      muted: {
        value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
      },
      emphasized: {
        value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
      },
      solid: {
        value: { _light: "{colors.gray.900}", _dark: "{colors.white}" },
      },
      focusRing: {
        value: { _light: "{colors.gray.400}", _dark: "{colors.gray.400}" },
      },
    },
    red: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: { value: { _light: "{colors.red.700}", _dark: "{colors.red.300}" } },
      subtle: {
        value: { _light: "{colors.red.100}", _dark: "{colors.red.900}" },
      },
      muted: {
        value: { _light: "{colors.red.200}", _dark: "{colors.red.800}" },
      },
      emphasized: {
        value: { _light: "{colors.red.300}", _dark: "{colors.red.700}" },
      },
      solid: {
        value: { _light: "{colors.red.600}", _dark: "{colors.red.600}" },
      },
      focusRing: {
        value: { _light: "{colors.red.500}", _dark: "{colors.red.500}" },
      },
    },
    orange: {
      contrast: { value: { _light: "white", _dark: "black" } },
      fg: {
        value: { _light: "{colors.orange.700}", _dark: "{colors.orange.300}" },
      },
      subtle: {
        value: { _light: "{colors.orange.100}", _dark: "{colors.orange.900}" },
      },
      muted: {
        value: { _light: "{colors.orange.200}", _dark: "{colors.orange.800}" },
      },
      emphasized: {
        value: { _light: "{colors.orange.300}", _dark: "{colors.orange.700}" },
      },
      solid: {
        value: { _light: "{colors.orange.600}", _dark: "{colors.orange.500}" },
      },
      focusRing: {
        value: { _light: "{colors.orange.500}", _dark: "{colors.orange.500}" },
      },
    },
    green: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.green.700}", _dark: "{colors.green.300}" },
      },
      subtle: {
        value: { _light: "{colors.green.100}", _dark: "{colors.green.900}" },
      },
      muted: {
        value: { _light: "{colors.green.200}", _dark: "{colors.green.800}" },
      },
      emphasized: {
        value: { _light: "{colors.green.300}", _dark: "{colors.green.700}" },
      },
      solid: {
        value: { _light: "{colors.green.600}", _dark: "{colors.green.600}" },
      },
      focusRing: {
        value: { _light: "{colors.green.500}", _dark: "{colors.green.500}" },
      },
    },
    blue: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.blue.700}", _dark: "{colors.blue.300}" },
      },
      subtle: {
        value: { _light: "{colors.blue.100}", _dark: "{colors.blue.900}" },
      },
      muted: {
        value: { _light: "{colors.blue.200}", _dark: "{colors.blue.800}" },
      },
      emphasized: {
        value: { _light: "{colors.blue.300}", _dark: "{colors.blue.700}" },
      },
      solid: {
        value: { _light: "{colors.blue.600}", _dark: "{colors.blue.600}" },
      },
      focusRing: {
        value: { _light: "{colors.blue.500}", _dark: "{colors.blue.500}" },
      },
    },
    yellow: {
      contrast: { value: { _light: "black", _dark: "black" } },
      fg: {
        value: { _light: "{colors.yellow.800}", _dark: "{colors.yellow.300}" },
      },
      subtle: {
        value: { _light: "{colors.yellow.100}", _dark: "{colors.yellow.900}" },
      },
      muted: {
        value: { _light: "{colors.yellow.200}", _dark: "{colors.yellow.800}" },
      },
      emphasized: {
        value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.700}" },
      },
      solid: {
        value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.300}" },
      },
      focusRing: {
        value: { _light: "{colors.yellow.500}", _dark: "{colors.yellow.500}" },
      },
    },
    teal: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.300}" },
      },
      subtle: {
        value: { _light: "{colors.teal.100}", _dark: "{colors.teal.900}" },
      },
      muted: {
        value: { _light: "{colors.teal.200}", _dark: "{colors.teal.800}" },
      },
      emphasized: {
        value: { _light: "{colors.teal.300}", _dark: "{colors.teal.700}" },
      },
      solid: {
        value: { _light: "{colors.teal.600}", _dark: "{colors.teal.600}" },
      },
      focusRing: {
        value: { _light: "{colors.teal.500}", _dark: "{colors.teal.500}" },
      },
    },
    purple: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.purple.700}", _dark: "{colors.purple.300}" },
      },
      subtle: {
        value: { _light: "{colors.purple.100}", _dark: "{colors.purple.900}" },
      },
      muted: {
        value: { _light: "{colors.purple.200}", _dark: "{colors.purple.800}" },
      },
      emphasized: {
        value: { _light: "{colors.purple.300}", _dark: "{colors.purple.700}" },
      },
      solid: {
        value: { _light: "{colors.purple.600}", _dark: "{colors.purple.600}" },
      },
      focusRing: {
        value: { _light: "{colors.purple.500}", _dark: "{colors.purple.500}" },
      },
    },
    pink: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.pink.700}", _dark: "{colors.pink.300}" },
      },
      subtle: {
        value: { _light: "{colors.pink.100}", _dark: "{colors.pink.900}" },
      },
      muted: {
        value: { _light: "{colors.pink.200}", _dark: "{colors.pink.800}" },
      },
      emphasized: {
        value: { _light: "{colors.pink.300}", _dark: "{colors.pink.700}" },
      },
      solid: {
        value: { _light: "{colors.pink.600}", _dark: "{colors.pink.600}" },
      },
      focusRing: {
        value: { _light: "{colors.pink.500}", _dark: "{colors.pink.500}" },
      },
    },
    cyan: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: { _light: "{colors.cyan.700}", _dark: "{colors.cyan.300}" },
      },
      subtle: {
        value: { _light: "{colors.cyan.100}", _dark: "{colors.cyan.900}" },
      },
      muted: {
        value: { _light: "{colors.cyan.200}", _dark: "{colors.cyan.800}" },
      },
      emphasized: {
        value: { _light: "{colors.cyan.300}", _dark: "{colors.cyan.700}" },
      },
      solid: {
        value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.600}" },
      },
      focusRing: {
        value: { _light: "{colors.cyan.500}", _dark: "{colors.cyan.500}" },
      },
    },
  }),
  m3 = hh.radii({
    l1: { value: "{radii.xs}" },
    l2: { value: "{radii.sm}" },
    l3: { value: "{radii.md}" },
  }),
  p3 = hh.shadows({
    xs: {
      value: {
        _light:
          "0px 1px 2px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/20}",
        _dark: "0px 1px 1px {black/64}, 0px 0px 1px inset {colors.gray.300/20}",
      },
    },
    sm: {
      value: {
        _light:
          "0px 2px 4px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
        _dark: "0px 2px 4px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
      },
    },
    md: {
      value: {
        _light:
          "0px 4px 8px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
        _dark: "0px 4px 8px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
      },
    },
    lg: {
      value: {
        _light:
          "0px 8px 16px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
        _dark:
          "0px 8px 16px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
      },
    },
    xl: {
      value: {
        _light:
          "0px 16px 24px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
        _dark:
          "0px 16px 24px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
      },
    },
    "2xl": {
      value: {
        _light:
          "0px 24px 40px {colors.gray.900/16}, 0px 0px 1px {colors.gray.900/30}",
        _dark:
          "0px 24px 40px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
      },
    },
    inner: {
      value: {
        _light: "inset 0 2px 4px 0 {black/5}",
        _dark: "inset 0 2px 4px 0 black",
      },
    },
    inset: {
      value: {
        _light: "inset 0 0 0 1px {black/5}",
        _dark: "inset 0 0 0 1px {colors.gray.300/5}",
      },
    },
  }),
  v3 = G1.extendWith("itemBody"),
  b3 = me("action-bar").parts(
    "positioner",
    "content",
    "separator",
    "selectionTrigger",
    "closeTrigger",
  ),
  y3 = me("alert").parts(
    "title",
    "description",
    "root",
    "indicator",
    "content",
  ),
  x3 = me("breadcrumb").parts(
    "link",
    "currentLink",
    "item",
    "list",
    "root",
    "ellipsis",
    "separator",
  ),
  S3 = me("blockquote").parts("root", "icon", "content", "caption"),
  C3 = me("card").parts(
    "root",
    "header",
    "body",
    "footer",
    "title",
    "description",
  ),
  E3 = me("checkbox-card", [
    "root",
    "control",
    "label",
    "description",
    "addon",
    "indicator",
    "content",
  ]),
  O3 = me("data-list").parts("root", "item", "itemLabel", "itemValue"),
  w3 = uh.extendWith("header", "body", "footer", "backdrop"),
  k3 = uh.extendWith("header", "body", "footer", "backdrop"),
  R3 = hS.extendWith("textarea"),
  T3 = me("empty-state", [
    "root",
    "content",
    "indicator",
    "title",
    "description",
  ]),
  A3 = mS.extendWith("requiredIndicator"),
  z3 = pS.extendWith("content"),
  _3 = vS.extendWith("itemContent", "dropzoneContent", "fileText"),
  N3 = me("list").parts("root", "item", "indicator"),
  I3 = SS.extendWith("itemCommand"),
  P3 = me("select").parts("root", "field", "indicator"),
  V3 = zS.extendWith("header", "body", "footer"),
  yC = gh.extendWith("itemAddon", "itemIndicator"),
  D3 = yC.extendWith("itemContent", "itemDescription"),
  M3 = NS.extendWith("itemIndicator"),
  L3 = PS.extendWith("indicatorGroup"),
  H3 = fS.extendWith("indicatorGroup", "empty"),
  B3 = DS.extendWith("markerIndicator"),
  j3 = me("stat").parts(
    "root",
    "label",
    "helpText",
    "valueText",
    "valueUnit",
    "indicator",
  ),
  U3 = me("status").parts("root", "indicator"),
  $3 = me("steps", [
    "root",
    "list",
    "item",
    "trigger",
    "indicator",
    "separator",
    "content",
    "title",
    "description",
    "nextTrigger",
    "prevTrigger",
    "progress",
  ]),
  F3 = MS.extendWith("indicator"),
  G3 = me("table").parts(
    "root",
    "header",
    "body",
    "row",
    "columnHeader",
    "cell",
    "footer",
    "caption",
  ),
  W3 = me("toast").parts(
    "root",
    "title",
    "description",
    "indicator",
    "closeTrigger",
    "actionTrigger",
  ),
  q3 = me("tabs").parts(
    "root",
    "trigger",
    "list",
    "content",
    "contentGroup",
    "indicator",
  ),
  Y3 = me("tag").parts(
    "root",
    "label",
    "closeTrigger",
    "startElement",
    "endElement",
  ),
  X3 = me("timeline").parts(
    "root",
    "item",
    "content",
    "separator",
    "indicator",
    "connector",
    "title",
    "description",
  ),
  K3 = kz.extendWith("channelText"),
  Q3 = ge({
    className: "chakra-accordion",
    slots: v3.keys(),
    base: {
      root: { width: "full", "--accordion-radius": "radii.l2" },
      item: { overflowAnchor: "none" },
      itemTrigger: {
        display: "flex",
        alignItems: "center",
        textAlign: "start",
        width: "full",
        outline: "0",
        gap: "3",
        fontWeight: "medium",
        borderRadius: "var(--accordion-radius)",
        _focusVisible: {
          outline: "2px solid",
          outlineColor: "colorPalette.focusRing",
        },
        _disabled: { layerStyle: "disabled" },
      },
      itemBody: {
        pt: "var(--accordion-padding-y)",
        pb: "calc(var(--accordion-padding-y) * 2)",
      },
      itemContent: {
        overflow: "hidden",
        borderRadius: "var(--accordion-radius)",
        _open: {
          animationName: "expand-height, fade-in",
          animationDuration: "moderate",
        },
        _closed: {
          animationName: "collapse-height, fade-out",
          animationDuration: "moderate",
        },
      },
      itemIndicator: {
        transition: "rotate 0.2s",
        transformOrigin: "center",
        color: "fg.subtle",
        _open: { rotate: "180deg" },
        _icon: { width: "1.2em", height: "1.2em" },
      },
    },
    variants: {
      variant: {
        outline: { item: { borderBottomWidth: "1px" } },
        subtle: {
          itemTrigger: { px: "var(--accordion-padding-x)" },
          itemContent: { px: "var(--accordion-padding-x)" },
          item: {
            borderRadius: "var(--accordion-radius)",
            _open: { bg: "colorPalette.subtle" },
          },
        },
        enclosed: {
          root: {
            borderWidth: "1px",
            borderRadius: "var(--accordion-radius)",
            divideY: "1px",
            overflow: "hidden",
          },
          itemTrigger: { px: "var(--accordion-padding-x)" },
          itemContent: { px: "var(--accordion-padding-x)" },
          item: { _open: { bg: "bg.subtle" } },
        },
        plain: {},
      },
      size: {
        sm: {
          root: {
            "--accordion-padding-x": "spacing.3",
            "--accordion-padding-y": "spacing.2",
          },
          itemTrigger: { textStyle: "sm", py: "var(--accordion-padding-y)" },
        },
        md: {
          root: {
            "--accordion-padding-x": "spacing.4",
            "--accordion-padding-y": "spacing.2",
          },
          itemTrigger: { textStyle: "md", py: "var(--accordion-padding-y)" },
        },
        lg: {
          root: {
            "--accordion-padding-x": "spacing.4.5",
            "--accordion-padding-y": "spacing.2.5",
          },
          itemTrigger: { textStyle: "lg", py: "var(--accordion-padding-y)" },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  Z3 = ge({
    className: "chakra-action-bar",
    slots: b3.keys(),
    base: {
      positioner: {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        insetInline: "0",
        top: "unset",
        bottom: "calc(env(safe-area-inset-bottom) + 20px)",
      },
      content: {
        bg: "bg.panel",
        shadow: "md",
        display: "flex",
        alignItems: "center",
        gap: "3",
        borderRadius: "l3",
        py: "2.5",
        px: "3",
        pointerEvents: "auto",
        translate: "calc(-1 * var(--scrollbar-width) / 2) 0px",
        _open: {
          animationName: "slide-from-bottom, fade-in",
          animationDuration: "moderate",
        },
        _closed: {
          animationName: "slide-to-bottom, fade-out",
          animationDuration: "faster",
        },
      },
      separator: { width: "1px", height: "5", bg: "border" },
      selectionTrigger: {
        display: "inline-flex",
        alignItems: "center",
        gap: "2",
        alignSelf: "stretch",
        textStyle: "sm",
        px: "4",
        py: "1",
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "dashed",
      },
    },
  }),
  J3 = ge({
    slots: y3.keys(),
    className: "chakra-alert",
    base: {
      root: {
        width: "full",
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        borderRadius: "l3",
      },
      title: { fontWeight: "medium" },
      description: { display: "inline" },
      indicator: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
        width: "1em",
        height: "1em",
        _icon: { boxSize: "full" },
      },
      content: { display: "flex", flex: "1", gap: "1" },
    },
    variants: {
      status: {
        info: { root: { colorPalette: "blue" } },
        warning: { root: { colorPalette: "orange" } },
        success: { root: { colorPalette: "green" } },
        error: { root: { colorPalette: "red" } },
        neutral: { root: { colorPalette: "gray" } },
      },
      inline: {
        true: {
          content: {
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
          },
        },
        false: { content: { display: "flex", flexDirection: "column" } },
      },
      variant: {
        subtle: {
          root: { bg: "colorPalette.subtle", color: "colorPalette.fg" },
        },
        surface: {
          root: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
            shadow: "inset 0 0 0px 1px var(--shadow-color)",
            shadowColor: "colorPalette.muted",
          },
          indicator: { color: "colorPalette.fg" },
        },
        outline: {
          root: {
            color: "colorPalette.fg",
            shadow: "inset 0 0 0px 1px var(--shadow-color)",
            shadowColor: "colorPalette.muted",
          },
          indicator: { color: "colorPalette.fg" },
        },
        solid: {
          root: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
          indicator: { color: "colorPalette.contrast" },
        },
      },
      size: {
        sm: {
          root: { gap: "2", px: "3", py: "3", textStyle: "xs" },
          indicator: { textStyle: "lg" },
        },
        md: {
          root: { gap: "3", px: "4", py: "4", textStyle: "sm" },
          indicator: { textStyle: "xl" },
        },
        lg: {
          root: { gap: "3", px: "4", py: "4", textStyle: "md" },
          indicator: { textStyle: "2xl" },
        },
      },
    },
    defaultVariants: {
      status: "info",
      variant: "subtle",
      size: "md",
      inline: !1,
    },
  }),
  eI = ge({
    slots: Y1.keys(),
    className: "chakra-avatar",
    base: {
      root: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "medium",
        position: "relative",
        verticalAlign: "top",
        flexShrink: "0",
        userSelect: "none",
        width: "var(--avatar-size)",
        height: "var(--avatar-size)",
        fontSize: "var(--avatar-font-size)",
        borderRadius: "var(--avatar-radius)",
        "&[data-group-item]": { borderWidth: "2px", borderColor: "bg" },
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "var(--avatar-radius)",
      },
      fallback: {
        lineHeight: "1",
        textTransform: "uppercase",
        fontWeight: "medium",
        fontSize: "var(--avatar-font-size)",
        borderRadius: "var(--avatar-radius)",
      },
    },
    variants: {
      size: {
        full: {
          root: { "--avatar-size": "100%", "--avatar-font-size": "100%" },
        },
        "2xs": {
          root: {
            "--avatar-font-size": "fontSizes.2xs",
            "--avatar-size": "sizes.6",
          },
        },
        xs: {
          root: {
            "--avatar-font-size": "fontSizes.xs",
            "--avatar-size": "sizes.8",
          },
        },
        sm: {
          root: {
            "--avatar-font-size": "fontSizes.sm",
            "--avatar-size": "sizes.9",
          },
        },
        md: {
          root: {
            "--avatar-font-size": "fontSizes.md",
            "--avatar-size": "sizes.10",
          },
        },
        lg: {
          root: {
            "--avatar-font-size": "fontSizes.md",
            "--avatar-size": "sizes.11",
          },
        },
        xl: {
          root: {
            "--avatar-font-size": "fontSizes.lg",
            "--avatar-size": "sizes.12",
          },
        },
        "2xl": {
          root: {
            "--avatar-font-size": "fontSizes.xl",
            "--avatar-size": "sizes.16",
          },
        },
      },
      variant: {
        solid: {
          root: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
        },
        subtle: {
          root: { bg: "colorPalette.muted", color: "colorPalette.fg" },
        },
        outline: {
          root: {
            color: "colorPalette.fg",
            borderWidth: "1px",
            borderColor: "colorPalette.muted",
          },
        },
      },
      shape: {
        square: {},
        rounded: { root: { "--avatar-radius": "radii.l3" } },
        full: { root: { "--avatar-radius": "radii.full" } },
      },
      borderless: {
        true: { root: { "&[data-group-item]": { borderWidth: "0px" } } },
      },
    },
    defaultVariants: { size: "md", shape: "full", variant: "subtle" },
  }),
  tI = ge({
    className: "chakra-blockquote",
    slots: S3.keys(),
    base: {
      root: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "2",
      },
      caption: { textStyle: "sm", color: "fg.muted" },
      icon: { boxSize: "5" },
    },
    variants: {
      justify: {
        start: { root: { alignItems: "flex-start", textAlign: "start" } },
        center: { root: { alignItems: "center", textAlign: "center" } },
        end: { root: { alignItems: "flex-end", textAlign: "end" } },
      },
      variant: {
        subtle: {
          root: {
            paddingX: "5",
            borderStartWidth: "4px",
            borderStartColor: "colorPalette.muted",
          },
          icon: { color: "colorPalette.fg" },
        },
        solid: {
          root: {
            paddingX: "5",
            borderStartWidth: "4px",
            borderStartColor: "colorPalette.solid",
          },
          icon: { color: "colorPalette.solid" },
        },
        plain: {
          root: { paddingX: "5" },
          icon: { color: "colorPalette.solid" },
        },
      },
    },
    defaultVariants: { variant: "subtle", justify: "start" },
  }),
  nI = ge({
    className: "chakra-breadcrumb",
    slots: x3.keys(),
    base: {
      list: {
        display: "flex",
        alignItems: "center",
        wordBreak: "break-word",
        color: "fg.muted",
        listStyle: "none",
      },
      link: {
        outline: "0",
        textDecoration: "none",
        borderRadius: "l1",
        focusRing: "outside",
        display: "inline-flex",
        alignItems: "center",
        gap: "2",
      },
      item: { display: "inline-flex", alignItems: "center" },
      separator: {
        color: "fg.muted",
        opacity: "0.8",
        _icon: { boxSize: "1em" },
        _rtl: { rotate: "180deg" },
      },
      ellipsis: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        _icon: { boxSize: "1em" },
      },
    },
    variants: {
      variant: {
        underline: {
          link: {
            color: "colorPalette.fg",
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationColor: "colorPalette.muted",
          },
          currentLink: { color: "colorPalette.fg" },
        },
        plain: {
          link: { color: "fg.muted", _hover: { color: "fg" } },
          currentLink: { color: "fg" },
        },
      },
      size: {
        sm: { list: { gap: "1", textStyle: "xs" } },
        md: { list: { gap: "1.5", textStyle: "sm" } },
        lg: { list: { gap: "2", textStyle: "md" } },
      },
    },
    defaultVariants: { variant: "plain", size: "md" },
  }),
  aI = ge({
    className: "chakra-card",
    slots: C3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minWidth: "0",
        wordWrap: "break-word",
        borderRadius: "l3",
        color: "fg",
        textAlign: "start",
      },
      title: { fontWeight: "semibold" },
      description: { color: "fg.muted", fontSize: "sm" },
      header: {
        paddingInline: "var(--card-padding)",
        paddingTop: "var(--card-padding)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5",
      },
      body: {
        padding: "var(--card-padding)",
        flex: "1",
        display: "flex",
        flexDirection: "column",
      },
      footer: {
        display: "flex",
        alignItems: "center",
        gap: "2",
        paddingInline: "var(--card-padding)",
        paddingBottom: "var(--card-padding)",
      },
    },
    variants: {
      size: {
        sm: {
          root: { "--card-padding": "spacing.4" },
          title: { textStyle: "md" },
        },
        md: {
          root: { "--card-padding": "spacing.6" },
          title: { textStyle: "lg" },
        },
        lg: {
          root: { "--card-padding": "spacing.7" },
          title: { textStyle: "xl" },
        },
      },
      variant: {
        elevated: { root: { bg: "bg.panel", boxShadow: "md" } },
        outline: {
          root: { bg: "bg.panel", borderWidth: "1px", borderColor: "border" },
        },
        subtle: { root: { bg: "bg.muted" } },
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  });
var v0, b0, y0, x0, S0, C0, E0, O0, w0, k0, R0, T0, A0, z0;
const iI = ge({
  slots: aS.keys(),
  className: "chakra-checkbox",
  base: {
    root: {
      display: "inline-flex",
      gap: "2",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
    },
    control: yt.base,
    label: {
      fontWeight: "medium",
      userSelect: "none",
      _disabled: { opacity: "0.5" },
    },
  },
  variants: {
    size: {
      xs: {
        root: { gap: "1.5" },
        label: { textStyle: "xs" },
        control:
          (b0 = (v0 = yt.variants) == null ? void 0 : v0.size) == null
            ? void 0
            : b0.xs,
      },
      sm: {
        root: { gap: "2" },
        label: { textStyle: "sm" },
        control:
          (x0 = (y0 = yt.variants) == null ? void 0 : y0.size) == null
            ? void 0
            : x0.sm,
      },
      md: {
        root: { gap: "2.5" },
        label: { textStyle: "sm" },
        control:
          (C0 = (S0 = yt.variants) == null ? void 0 : S0.size) == null
            ? void 0
            : C0.md,
      },
      lg: {
        root: { gap: "3" },
        label: { textStyle: "md" },
        control:
          (O0 = (E0 = yt.variants) == null ? void 0 : E0.size) == null
            ? void 0
            : O0.lg,
      },
    },
    variant: {
      outline: {
        control:
          (k0 = (w0 = yt.variants) == null ? void 0 : w0.variant) == null
            ? void 0
            : k0.outline,
      },
      solid: {
        control:
          (T0 = (R0 = yt.variants) == null ? void 0 : R0.variant) == null
            ? void 0
            : T0.solid,
      },
      subtle: {
        control:
          (z0 = (A0 = yt.variants) == null ? void 0 : A0.variant) == null
            ? void 0
            : z0.subtle,
      },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
});
var _0, N0, I0, P0, V0, D0, M0;
const rI = ge({
    slots: E3.keys(),
    className: "chakra-checkbox-card",
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        position: "relative",
        borderRadius: "l2",
        flex: "1",
        focusVisibleRing: "outside",
        _disabled: { opacity: "0.8" },
        _invalid: { outline: "2px solid", outlineColor: "border.error" },
      },
      control: {
        display: "inline-flex",
        flex: "1",
        position: "relative",
        borderRadius: "inherit",
        justifyContent: "var(--checkbox-card-justify)",
        alignItems: "var(--checkbox-card-align)",
      },
      label: {
        fontWeight: "medium",
        display: "flex",
        alignItems: "center",
        gap: "2",
        flex: "1",
        _disabled: { opacity: "0.5" },
      },
      description: {
        opacity: "0.64",
        textStyle: "sm",
        _disabled: { opacity: "0.5" },
      },
      addon: { _disabled: { opacity: "0.5" } },
      indicator: yt.base,
      content: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        gap: "1",
        justifyContent: "var(--checkbox-card-justify)",
        alignItems: "var(--checkbox-card-align)",
      },
    },
    variants: {
      size: {
        sm: {
          root: { textStyle: "sm" },
          control: { padding: "3", gap: "1.5" },
          addon: { px: "3", py: "1.5", borderTopWidth: "1px" },
          indicator: (_0 = yt.variants) == null ? void 0 : _0.size.sm,
        },
        md: {
          root: { textStyle: "sm" },
          control: { padding: "4", gap: "2.5" },
          addon: { px: "4", py: "2", borderTopWidth: "1px" },
          indicator: (N0 = yt.variants) == null ? void 0 : N0.size.md,
        },
        lg: {
          root: { textStyle: "md" },
          control: { padding: "4", gap: "3.5" },
          addon: { px: "4", py: "2", borderTopWidth: "1px" },
          indicator: (I0 = yt.variants) == null ? void 0 : I0.size.lg,
        },
      },
      variant: {
        surface: {
          root: {
            borderWidth: "1px",
            borderColor: "border",
            _checked: {
              bg: "colorPalette.subtle",
              color: "colorPalette.fg",
              borderColor: "colorPalette.muted",
            },
            _disabled: { bg: "bg.muted" },
          },
          indicator: (P0 = yt.variants) == null ? void 0 : P0.variant.solid,
        },
        subtle: {
          root: { bg: "bg.muted" },
          control: {
            _checked: { bg: "colorPalette.muted", color: "colorPalette.fg" },
          },
          indicator: (V0 = yt.variants) == null ? void 0 : V0.variant.plain,
        },
        outline: {
          root: {
            borderWidth: "1px",
            borderColor: "border",
            _checked: {
              boxShadow: "0 0 0 1px var(--shadow-color)",
              boxShadowColor: "colorPalette.solid",
              borderColor: "colorPalette.solid",
            },
          },
          indicator: (D0 = yt.variants) == null ? void 0 : D0.variant.solid,
        },
        solid: {
          root: {
            borderWidth: "1px",
            _checked: {
              bg: "colorPalette.solid",
              color: "colorPalette.contrast",
              borderColor: "colorPalette.solid",
            },
          },
          indicator: (M0 = yt.variants) == null ? void 0 : M0.variant.inverted,
        },
      },
      justify: {
        start: { root: { "--checkbox-card-justify": "flex-start" } },
        end: { root: { "--checkbox-card-justify": "flex-end" } },
        center: { root: { "--checkbox-card-justify": "center" } },
      },
      align: {
        start: {
          root: { "--checkbox-card-align": "flex-start" },
          content: { textAlign: "start" },
        },
        end: {
          root: { "--checkbox-card-align": "flex-end" },
          content: { textAlign: "end" },
        },
        center: {
          root: { "--checkbox-card-align": "center" },
          content: { textAlign: "center" },
        },
      },
      orientation: {
        vertical: { control: { flexDirection: "column" } },
        horizontal: { control: { flexDirection: "row" } },
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline",
      align: "start",
      orientation: "horizontal",
    },
  }),
  oI = ge({
    slots: x1.keys(),
    className: "chakra-collapsible",
    base: {
      content: {
        overflow: "hidden",
        _open: {
          animationName: "expand-height, fade-in",
          animationDuration: "moderate",
        },
        _closed: {
          animationName: "collapse-height, fade-out",
          animationDuration: "moderate",
        },
      },
    },
  });
var L0, H0, B0, j0, U0, $0, F0, G0, W0, q0, Y0, X0, K0, Q0, Z0, J0, ex, tx;
const lI = ge({
    className: "colorPicker",
    slots: K3.keys(),
    base: {
      root: { display: "flex", flexDirection: "column", gap: "1.5" },
      label: {
        color: "fg",
        fontWeight: "medium",
        textStyle: "sm",
        _disabled: { opacity: "0.5" },
      },
      valueText: { textAlign: "start" },
      control: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "2",
        position: "relative",
      },
      swatchTrigger: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      trigger: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexShrink: "0",
        gap: "2",
        textStyle: "sm",
        minH: "var(--input-height)",
        minW: "var(--input-height)",
        px: "1",
        rounded: "l2",
        _disabled: { opacity: "0.5" },
        "--focus-color": "colors.colorPalette.focusRing",
        "&:focus-visible": {
          borderColor: "var(--focus-color)",
          outline: "1px solid var(--focus-color)",
        },
        "&[data-fit-content]": {
          "--input-height": "unset",
          px: "0",
          border: "0",
        },
      },
      content: {
        display: "flex",
        flexDirection: "column",
        bg: "bg.panel",
        borderRadius: "l3",
        boxShadow: "lg",
        width: "64",
        p: "4",
        gap: "3",
        zIndex: "dropdown",
        _open: { animationStyle: "slide-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "slide-fade-out",
          animationDuration: "faster",
        },
      },
      area: { height: "180px", borderRadius: "l2", overflow: "hidden" },
      areaThumb: {
        borderRadius: "full",
        height: "var(--thumb-size)",
        width: "var(--thumb-size)",
        borderWidth: "2px",
        borderColor: "white",
        shadow: "sm",
        focusVisibleRing: "mixed",
        focusRingColor: "white",
      },
      areaBackground: { height: "full" },
      channelSlider: { borderRadius: "l2", flex: "1" },
      channelSliderTrack: {
        height: "var(--slider-height)",
        borderRadius: "inherit",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
      },
      channelText: {
        textStyle: "xs",
        color: "fg.muted",
        fontWeight: "medium",
        textTransform: "capitalize",
      },
      swatchGroup: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "2",
      },
      swatch: { ...bC.base, borderRadius: "l1" },
      swatchIndicator: { color: "white", rounded: "full" },
      channelSliderThumb: {
        borderRadius: "full",
        height: "var(--thumb-size)",
        width: "var(--thumb-size)",
        borderWidth: "2px",
        borderColor: "white",
        shadow: "sm",
        transform: "translate(-50%, -50%)",
        focusVisibleRing: "outside",
        focusRingOffset: "1px",
      },
      channelInput: {
        ...at.base,
        "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      },
      formatSelect: {
        textStyle: "xs",
        textTransform: "uppercase",
        borderWidth: "1px",
        minH: "6",
        focusRing: "inside",
        rounded: "l2",
      },
      transparencyGrid: { borderRadius: "l2" },
      view: { display: "flex", flexDirection: "column", gap: "2" },
    },
    variants: {
      size: {
        "2xs": {
          channelInput:
            (H0 = (L0 = at.variants) == null ? void 0 : L0.size) == null
              ? void 0
              : H0["2xs"],
          swatch: { "--swatch-size": "sizes.4.5" },
          trigger: { "--input-height": "sizes.7" },
          area: { "--thumb-size": "sizes.3" },
          channelSlider: {
            "--slider-height": "sizes.3",
            "--thumb-size": "sizes.3",
          },
        },
        xs: {
          channelInput:
            (j0 = (B0 = at.variants) == null ? void 0 : B0.size) == null
              ? void 0
              : j0.xs,
          swatch: { "--swatch-size": "sizes.5" },
          trigger: { "--input-height": "sizes.8" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
        sm: {
          channelInput:
            ($0 = (U0 = at.variants) == null ? void 0 : U0.size) == null
              ? void 0
              : $0.sm,
          swatch: { "--swatch-size": "sizes.6" },
          trigger: { "--input-height": "sizes.9" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
        md: {
          channelInput:
            (G0 = (F0 = at.variants) == null ? void 0 : F0.size) == null
              ? void 0
              : G0.md,
          swatch: { "--swatch-size": "sizes.7" },
          trigger: { "--input-height": "sizes.10" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
        lg: {
          channelInput:
            (q0 = (W0 = at.variants) == null ? void 0 : W0.size) == null
              ? void 0
              : q0.lg,
          swatch: { "--swatch-size": "sizes.7" },
          trigger: { "--input-height": "sizes.11" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
        xl: {
          channelInput:
            (X0 = (Y0 = at.variants) == null ? void 0 : Y0.size) == null
              ? void 0
              : X0.xl,
          swatch: { "--swatch-size": "sizes.8" },
          trigger: { "--input-height": "sizes.12" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
        "2xl": {
          channelInput:
            (Q0 = (K0 = at.variants) == null ? void 0 : K0.size) == null
              ? void 0
              : Q0["2xl"],
          swatch: { "--swatch-size": "sizes.10" },
          trigger: { "--input-height": "sizes.16" },
          area: { "--thumb-size": "sizes.3.5" },
          channelSlider: {
            "--slider-height": "sizes.3.5",
            "--thumb-size": "sizes.3.5",
          },
        },
      },
      variant: {
        outline: {
          channelInput:
            (J0 = (Z0 = at.variants) == null ? void 0 : Z0.variant) == null
              ? void 0
              : J0.outline,
          trigger: { borderWidth: "1px" },
        },
        subtle: {
          channelInput:
            (tx = (ex = at.variants) == null ? void 0 : ex.variant) == null
              ? void 0
              : tx.subtle,
          trigger: {
            borderWidth: "1px",
            borderColor: "transparent",
            bg: "bg.muted",
          },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  sI = ge({
    className: "chakra-combobox",
    slots: H3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5",
        width: "full",
      },
      label: {
        fontWeight: "medium",
        userSelect: "none",
        textStyle: "sm",
        _disabled: { layerStyle: "disabled" },
      },
      input: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "bg.panel",
        width: "full",
        minH: "var(--combobox-input-height)",
        px: "var(--combobox-input-padding-x)",
        "--input-height": "var(--combobox-input-height)",
        borderRadius: "l2",
        outline: 0,
        userSelect: "none",
        textAlign: "start",
        _placeholderShown: { color: "fg.muted" },
        _disabled: { layerStyle: "disabled" },
        "--focus-color": "colors.colorPalette.focusRing",
        "--error-color": "colors.border.error",
        _invalid: {
          focusRingColor: "var(--error-color)",
          borderColor: "var(--error-color)",
        },
      },
      trigger: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        "--input-height": "var(--combobox-input-height)",
      },
      clearTrigger: {
        color: "fg.muted",
        pointerEvents: "auto",
        focusVisibleRing: "inside",
        focusRingWidth: "2px",
        rounded: "l1",
      },
      control: { pos: "relative" },
      indicatorGroup: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1",
        pos: "absolute",
        insetEnd: "0",
        top: "0",
        bottom: "0",
        px: "var(--combobox-input-padding-x)",
        _icon: { boxSize: "var(--combobox-indicator-size)" },
        "[data-disabled] &": { opacity: 0.5 },
      },
      content: {
        background: "bg.panel",
        display: "flex",
        flexDirection: "column",
        zIndex: "dropdown",
        borderRadius: "l2",
        outline: 0,
        maxH: "96",
        overflowY: "auto",
        boxShadow: "md",
        _open: { animationStyle: "slide-fade-in", animationDuration: "fast" },
        _closed: { animationStyle: "slide-fade-out", animationDuration: "0s" },
        "&[data-empty]:not(:has([data-scope=combobox][data-part=empty]))": {
          opacity: 0,
        },
      },
      item: {
        position: "relative",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: "2",
        py: "var(--combobox-item-padding-y)",
        px: "var(--combobox-item-padding-x)",
        cursor: "option",
        justifyContent: "space-between",
        flex: "1",
        textAlign: "start",
        borderRadius: "l1",
        _highlighted: { bg: "bg.emphasized/60" },
        _disabled: { pointerEvents: "none", opacity: "0.5" },
        _icon: { boxSize: "var(--combobox-indicator-size)" },
      },
      empty: {
        py: "var(--combobox-item-padding-y)",
        px: "var(--combobox-item-padding-x)",
      },
      itemText: { flex: "1" },
      itemGroup: { pb: "var(--combobox-item-padding-y)", _last: { pb: "0" } },
      itemGroupLabel: {
        fontWeight: "medium",
        py: "var(--combobox-item-padding-y)",
        px: "var(--combobox-item-padding-x)",
      },
    },
    variants: {
      variant: {
        outline: {
          input: {
            bg: "transparent",
            borderWidth: "1px",
            borderColor: "border",
            focusVisibleRing: "inside",
          },
        },
        subtle: {
          input: {
            borderWidth: "1px",
            borderColor: "transparent",
            bg: "bg.muted",
            focusVisibleRing: "inside",
          },
        },
        flushed: {
          input: {
            bg: "transparent",
            borderBottomWidth: "1px",
            borderBottomColor: "border",
            borderRadius: "0",
            px: "0",
            _focusVisible: {
              borderColor: "var(--focus-color)",
              boxShadow: "0px 1px 0px 0px var(--focus-color)",
            },
          },
          indicatorGroup: { px: "0" },
        },
      },
      size: {
        xs: {
          root: {
            "--combobox-input-height": "sizes.8",
            "--combobox-input-padding-x": "spacing.2",
            "--combobox-indicator-size": "sizes.3.5",
          },
          input: { textStyle: "xs" },
          content: {
            "--combobox-item-padding-x": "spacing.1.5",
            "--combobox-item-padding-y": "spacing.1",
            "--combobox-indicator-size": "sizes.3.5",
            p: "1",
            textStyle: "xs",
          },
          trigger: { textStyle: "xs", gap: "1" },
        },
        sm: {
          root: {
            "--combobox-input-height": "sizes.9",
            "--combobox-input-padding-x": "spacing.2.5",
            "--combobox-indicator-size": "sizes.4",
          },
          input: { textStyle: "sm" },
          content: {
            "--combobox-item-padding-x": "spacing.2",
            "--combobox-item-padding-y": "spacing.1.5",
            "--combobox-indicator-size": "sizes.4",
            p: "1",
            textStyle: "sm",
          },
          trigger: { textStyle: "sm", gap: "1" },
        },
        md: {
          root: {
            "--combobox-input-height": "sizes.10",
            "--combobox-input-padding-x": "spacing.3",
            "--combobox-indicator-size": "sizes.4",
          },
          input: { textStyle: "sm" },
          content: {
            "--combobox-item-padding-x": "spacing.2",
            "--combobox-item-padding-y": "spacing.1.5",
            "--combobox-indicator-size": "sizes.4",
            p: "1",
            textStyle: "sm",
          },
          itemIndicator: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          trigger: { textStyle: "sm", gap: "2" },
        },
        lg: {
          root: {
            "--combobox-input-height": "sizes.12",
            "--combobox-input-padding-x": "spacing.4",
            "--combobox-indicator-size": "sizes.5",
          },
          input: { textStyle: "md" },
          content: {
            "--combobox-item-padding-y": "spacing.2",
            "--combobox-item-padding-x": "spacing.3",
            "--combobox-indicator-size": "sizes.5",
            p: "1.5",
            textStyle: "md",
          },
          trigger: { textStyle: "md", py: "3", gap: "2" },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  cI = ge({
    slots: O3.keys(),
    className: "chakra-data-list",
    base: {
      itemLabel: { display: "flex", alignItems: "center", gap: "1" },
      itemValue: { display: "flex", minWidth: "0", flex: "1" },
    },
    variants: {
      orientation: {
        horizontal: {
          root: { display: "flex", flexDirection: "column" },
          item: { display: "inline-flex", alignItems: "center", gap: "4" },
          itemLabel: { minWidth: "120px" },
        },
        vertical: {
          root: { display: "flex", flexDirection: "column" },
          item: { display: "flex", flexDirection: "column", gap: "1" },
        },
      },
      size: {
        sm: { root: { gap: "3" }, item: { textStyle: "xs" } },
        md: { root: { gap: "4" }, item: { textStyle: "sm" } },
        lg: { root: { gap: "5" }, item: { textStyle: "md" } },
      },
      variant: {
        subtle: { itemLabel: { color: "fg.muted" } },
        bold: {
          itemLabel: { fontWeight: "medium" },
          itemValue: { color: "fg.muted" },
        },
      },
    },
    defaultVariants: { size: "md", orientation: "vertical", variant: "subtle" },
  }),
  uI = ge({
    slots: w3.keys(),
    className: "chakra-dialog",
    base: {
      backdrop: {
        bg: "blackAlpha.500",
        pos: "fixed",
        left: 0,
        top: 0,
        w: "100vw",
        h: "100dvh",
        zIndex: "overlay",
        _open: { animationName: "fade-in", animationDuration: "slow" },
        _closed: { animationName: "fade-out", animationDuration: "moderate" },
      },
      positioner: {
        display: "flex",
        width: "100vw",
        height: "100dvh",
        position: "fixed",
        left: 0,
        top: 0,
        "--dialog-z-index": "zIndex.modal",
        zIndex: "calc(var(--dialog-z-index) + var(--layer-index, 0))",
        justifyContent: "center",
        overscrollBehaviorY: "none",
      },
      content: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        outline: 0,
        borderRadius: "l3",
        textStyle: "sm",
        my: "var(--dialog-margin, var(--dialog-base-margin))",
        "--dialog-z-index": "zIndex.modal",
        zIndex: "calc(var(--dialog-z-index) + var(--layer-index, 0))",
        bg: "bg.panel",
        boxShadow: "lg",
        _open: { animationDuration: "moderate" },
        _closed: { animationDuration: "faster" },
      },
      header: { display: "flex", gap: "2", flex: 0, px: "6", pt: "6", pb: "4" },
      body: { flex: "1", px: "6", pt: "2", pb: "6" },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "3",
        px: "6",
        pt: "2",
        pb: "4",
      },
      title: { textStyle: "lg", fontWeight: "semibold" },
      description: { color: "fg.muted" },
      closeTrigger: { pos: "absolute", top: "2", insetEnd: "2" },
    },
    variants: {
      placement: {
        center: {
          positioner: { alignItems: "center" },
          content: { "--dialog-base-margin": "auto", mx: "auto" },
        },
        top: {
          positioner: { alignItems: "flex-start" },
          content: { "--dialog-base-margin": "spacing.16", mx: "auto" },
        },
        bottom: {
          positioner: { alignItems: "flex-end" },
          content: { "--dialog-base-margin": "spacing.16", mx: "auto" },
        },
      },
      scrollBehavior: {
        inside: {
          positioner: { overflow: "hidden" },
          content: { maxH: "calc(100% - 7.5rem)" },
          body: { overflow: "auto" },
        },
        outside: { positioner: { overflow: "auto", pointerEvents: "auto" } },
      },
      size: {
        xs: { content: { maxW: "sm" } },
        sm: { content: { maxW: "md" } },
        md: { content: { maxW: "lg" } },
        lg: { content: { maxW: "2xl" } },
        xl: { content: { maxW: "4xl" } },
        cover: {
          positioner: { padding: "10" },
          content: { width: "100%", height: "100%", "--dialog-margin": "0" },
        },
        full: {
          content: {
            maxW: "100vw",
            minH: "100vh",
            "--dialog-margin": "0",
            borderRadius: "0",
          },
        },
      },
      motionPreset: {
        scale: {
          content: {
            _open: { animationName: "scale-in, fade-in" },
            _closed: { animationName: "scale-out, fade-out" },
          },
        },
        "slide-in-bottom": {
          content: {
            _open: { animationName: "slide-from-bottom, fade-in" },
            _closed: { animationName: "slide-to-bottom, fade-out" },
          },
        },
        "slide-in-top": {
          content: {
            _open: { animationName: "slide-from-top, fade-in" },
            _closed: { animationName: "slide-to-top, fade-out" },
          },
        },
        "slide-in-left": {
          content: {
            _open: { animationName: "slide-from-left, fade-in" },
            _closed: { animationName: "slide-to-left, fade-out" },
          },
        },
        "slide-in-right": {
          content: {
            _open: { animationName: "slide-from-right, fade-in" },
            _closed: { animationName: "slide-to-right, fade-out" },
          },
        },
        none: {},
      },
    },
    defaultVariants: {
      size: "md",
      scrollBehavior: "outside",
      placement: "top",
      motionPreset: "scale",
    },
  }),
  dI = ge({
    slots: k3.keys(),
    className: "chakra-drawer",
    base: {
      backdrop: {
        bg: "blackAlpha.500",
        pos: "fixed",
        insetInlineStart: 0,
        top: 0,
        w: "100vw",
        h: "100dvh",
        zIndex: "overlay",
        _open: { animationName: "fade-in", animationDuration: "slow" },
        _closed: { animationName: "fade-out", animationDuration: "moderate" },
      },
      positioner: {
        display: "flex",
        width: "100vw",
        height: "100dvh",
        position: "fixed",
        insetInlineStart: 0,
        top: 0,
        zIndex: "modal",
        overscrollBehaviorY: "none",
      },
      content: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        outline: 0,
        zIndex: "modal",
        textStyle: "sm",
        maxH: "100dvh",
        color: "inherit",
        bg: "bg.panel",
        boxShadow: "lg",
        _open: {
          animationDuration: "slowest",
          animationTimingFunction: "ease-in-smooth",
        },
        _closed: {
          animationDuration: "slower",
          animationTimingFunction: "ease-in-smooth",
        },
      },
      header: {
        display: "flex",
        alignItems: "center",
        gap: "2",
        flex: 0,
        px: "6",
        pt: "6",
        pb: "4",
      },
      body: { px: "6", py: "2", flex: "1", overflow: "auto" },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "3",
        px: "6",
        pt: "2",
        pb: "4",
      },
      title: { flex: "1", textStyle: "lg", fontWeight: "semibold" },
      description: { color: "fg.muted" },
      closeTrigger: { pos: "absolute", top: "3", insetEnd: "2" },
    },
    variants: {
      size: {
        xs: { content: { maxW: "xs" } },
        sm: { content: { maxW: "md" } },
        md: { content: { maxW: "lg" } },
        lg: { content: { maxW: "2xl" } },
        xl: { content: { maxW: "4xl" } },
        full: { content: { maxW: "100vw", h: "100dvh" } },
      },
      placement: {
        start: {
          positioner: { justifyContent: "flex-start" },
          content: {
            _open: {
              animationName: {
                base: "slide-from-left-full, fade-in",
                _rtl: "slide-from-right-full, fade-in",
              },
            },
            _closed: {
              animationName: {
                base: "slide-to-left-full, fade-out",
                _rtl: "slide-to-right-full, fade-out",
              },
            },
          },
        },
        end: {
          positioner: { justifyContent: "flex-end" },
          content: {
            _open: {
              animationName: {
                base: "slide-from-right-full, fade-in",
                _rtl: "slide-from-left-full, fade-in",
              },
            },
            _closed: {
              animationName: {
                base: "slide-to-right-full, fade-out",
                _rtl: "slide-to-left-full, fade-out",
              },
            },
          },
        },
        top: {
          positioner: { alignItems: "flex-start" },
          content: {
            maxW: "100%",
            _open: { animationName: "slide-from-top-full, fade-in" },
            _closed: { animationName: "slide-to-top-full, fade-out" },
          },
        },
        bottom: {
          positioner: { alignItems: "flex-end" },
          content: {
            maxW: "100%",
            _open: { animationName: "slide-from-bottom-full, fade-in" },
            _closed: { animationName: "slide-to-bottom-full, fade-out" },
          },
        },
      },
      contained: {
        true: { positioner: { padding: "4" }, content: { borderRadius: "l3" } },
      },
    },
    defaultVariants: { size: "xs", placement: "end" },
  }),
  n0 = YS({
    fontSize: "inherit",
    fontWeight: "inherit",
    textAlign: "inherit",
    bg: "transparent",
    borderRadius: "l2",
  }),
  fI = ge({
    slots: R3.keys(),
    className: "chakra-editable",
    base: {
      root: {
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        gap: "1.5",
        width: "full",
      },
      preview: {
        ...n0,
        py: "1",
        px: "1",
        display: "inline-flex",
        alignItems: "center",
        transitionProperty: "common",
        transitionDuration: "normal",
        cursor: "text",
        _hover: { bg: "bg.muted" },
        _disabled: { userSelect: "none" },
      },
      input: {
        ...n0,
        outline: "0",
        py: "1",
        px: "1",
        transitionProperty: "common",
        transitionDuration: "normal",
        width: "full",
        focusVisibleRing: "inside",
        focusRingWidth: "2px",
        _placeholder: { opacity: 0.6 },
      },
      control: { display: "inline-flex", alignItems: "center", gap: "1.5" },
    },
    variants: {
      size: {
        sm: {
          root: { textStyle: "sm" },
          preview: { minH: "8" },
          input: { minH: "8" },
        },
        md: {
          root: { textStyle: "sm" },
          preview: { minH: "9" },
          input: { minH: "9" },
        },
        lg: {
          root: { textStyle: "md" },
          preview: { minH: "10" },
          input: { minH: "10" },
        },
      },
    },
    defaultVariants: { size: "md" },
  }),
  gI = ge({
    slots: T3.keys(),
    className: "chakra-empty-state",
    base: {
      root: { width: "full" },
      content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      indicator: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "fg.subtle",
        _icon: { boxSize: "1em" },
      },
      title: { fontWeight: "semibold" },
      description: { textStyle: "sm", color: "fg.muted" },
    },
    variants: {
      size: {
        sm: {
          root: { px: "4", py: "6" },
          title: { textStyle: "md" },
          content: { gap: "4" },
          indicator: { textStyle: "2xl" },
        },
        md: {
          root: { px: "8", py: "12" },
          title: { textStyle: "lg" },
          content: { gap: "6" },
          indicator: { textStyle: "4xl" },
        },
        lg: {
          root: { px: "12", py: "16" },
          title: { textStyle: "xl" },
          content: { gap: "8" },
          indicator: { textStyle: "6xl" },
        },
      },
    },
    defaultVariants: { size: "md" },
  }),
  hI = ge({
    className: "chakra-field",
    slots: A3.keys(),
    base: {
      requiredIndicator: { color: "fg.error", lineHeight: "1" },
      root: {
        display: "flex",
        width: "100%",
        position: "relative",
        gap: "1.5",
      },
      label: {
        display: "flex",
        alignItems: "center",
        textAlign: "start",
        textStyle: "sm",
        fontWeight: "medium",
        gap: "1",
        userSelect: "none",
        _disabled: { opacity: "0.5" },
      },
      errorText: {
        display: "inline-flex",
        alignItems: "center",
        fontWeight: "medium",
        gap: "1",
        color: "fg.error",
        textStyle: "xs",
      },
      helperText: { color: "fg.muted", textStyle: "xs" },
    },
    variants: {
      orientation: {
        vertical: {
          root: { flexDirection: "column", alignItems: "flex-start" },
        },
        horizontal: {
          root: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          label: { flex: "0 0 var(--field-label-width, 80px)" },
        },
      },
    },
    defaultVariants: { orientation: "vertical" },
  }),
  mI = ge({
    className: "fieldset",
    slots: z3.keys(),
    base: {
      root: { display: "flex", flexDirection: "column", width: "full" },
      content: { display: "flex", flexDirection: "column", width: "full" },
      legend: {
        color: "fg",
        fontWeight: "medium",
        _disabled: { opacity: "0.5" },
      },
      helperText: { color: "fg.muted", textStyle: "sm" },
      errorText: {
        display: "inline-flex",
        alignItems: "center",
        color: "fg.error",
        gap: "2",
        fontWeight: "medium",
        textStyle: "sm",
      },
    },
    variants: {
      size: {
        sm: {
          root: { spaceY: "2" },
          content: { gap: "1.5" },
          legend: { textStyle: "sm" },
        },
        md: {
          root: { spaceY: "4" },
          content: { gap: "4" },
          legend: { textStyle: "sm" },
        },
        lg: {
          root: { spaceY: "6" },
          content: { gap: "4" },
          legend: { textStyle: "md" },
        },
      },
    },
    defaultVariants: { size: "md" },
  }),
  pI = ge({
    className: "chakra-file-upload",
    slots: _3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "4",
        width: "100%",
        alignItems: "flex-start",
      },
      label: { fontWeight: "medium", textStyle: "sm" },
      dropzone: {
        background: "bg",
        borderRadius: "l3",
        borderWidth: "2px",
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "4",
        justifyContent: "center",
        minHeight: "2xs",
        px: "3",
        py: "2",
        transition: "backgrounds",
        focusVisibleRing: "outside",
        _hover: { bg: "bg.subtle" },
        _dragging: {
          bg: "colorPalette.subtle",
          borderStyle: "solid",
          borderColor: "colorPalette.solid",
        },
      },
      dropzoneContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1",
        textStyle: "sm",
      },
      item: {
        pos: "relative",
        textStyle: "sm",
        animationName: "fade-in",
        animationDuration: "moderate",
        background: "bg",
        borderRadius: "l2",
        borderWidth: "1px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "3",
        p: "4",
      },
      itemGroup: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "3",
        _empty: { display: "none" },
      },
      itemName: { color: "fg", fontWeight: "medium", lineClamp: "1" },
      itemContent: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5",
        flex: "1",
      },
      itemSizeText: { color: "fg.muted", textStyle: "xs" },
      itemDeleteTrigger: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        boxSize: "5",
        p: "2px",
        color: "fg.muted",
        cursor: "button",
      },
      itemPreview: { color: "fg.muted", _icon: { boxSize: "4.5" } },
    },
    defaultVariants: {},
  }),
  vI = ge({
    className: "chakra-hover-card",
    slots: xS.keys(),
    base: {
      content: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textStyle: "sm",
        "--hovercard-bg": "colors.bg.panel",
        bg: "var(--hovercard-bg)",
        boxShadow: "lg",
        maxWidth: "80",
        borderRadius: "l3",
        zIndex: "popover",
        transformOrigin: "var(--transform-origin)",
        outline: "0",
        _open: { animationStyle: "slide-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "slide-fade-out",
          animationDuration: "faster",
        },
      },
      arrow: {
        "--arrow-size": "sizes.3",
        "--arrow-background": "var(--hovercard-bg)",
      },
      arrowTip: { borderTopWidth: "0.5px", borderInlineStartWidth: "0.5px" },
    },
    variants: {
      size: {
        xs: { content: { padding: "3" } },
        sm: { content: { padding: "4" } },
        md: { content: { padding: "5" } },
        lg: { content: { padding: "6" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  bI = ge({
    className: "chakra-list",
    slots: N3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--list-gap)",
        "& :where(ul, ol)": { marginTop: "var(--list-gap)" },
      },
      item: { whiteSpace: "normal", display: "list-item" },
      indicator: {
        marginEnd: "2",
        minHeight: "1lh",
        flexShrink: 0,
        display: "inline-block",
        verticalAlign: "middle",
      },
    },
    variants: {
      variant: {
        marker: {
          root: { listStyle: "revert" },
          item: { _marker: { color: "fg.subtle" } },
        },
        plain: { item: { alignItems: "flex-start", display: "inline-flex" } },
      },
      align: {
        center: { item: { alignItems: "center" } },
        start: { item: { alignItems: "flex-start" } },
        end: { item: { alignItems: "flex-end" } },
      },
    },
    defaultVariants: { variant: "marker" },
  }),
  yI = ge({
    className: "chakra-menu",
    slots: I3.keys(),
    base: {
      content: {
        outline: 0,
        bg: "bg.panel",
        boxShadow: "lg",
        color: "fg",
        maxHeight: "var(--available-height)",
        "--menu-z-index": "zIndex.dropdown",
        zIndex: "calc(var(--menu-z-index) + var(--layer-index, 0))",
        borderRadius: "l2",
        overflow: "hidden",
        overflowY: "auto",
        _open: { animationStyle: "slide-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "slide-fade-out",
          animationDuration: "faster",
        },
      },
      item: {
        textDecoration: "none",
        color: "fg",
        userSelect: "none",
        borderRadius: "l1",
        width: "100%",
        display: "flex",
        cursor: "menuitem",
        alignItems: "center",
        textAlign: "start",
        position: "relative",
        flex: "0 0 auto",
        outline: 0,
        _disabled: { layerStyle: "disabled" },
        "&[data-type]": { ps: "8" },
      },
      itemText: { flex: "1" },
      itemIndicator: {
        position: "absolute",
        insetStart: "2",
        transform: "translateY(-50%)",
        top: "50%",
      },
      itemGroupLabel: {
        px: "2",
        py: "1.5",
        fontWeight: "semibold",
        textStyle: "sm",
      },
      indicator: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
      },
      itemCommand: {
        opacity: "0.6",
        textStyle: "xs",
        ms: "auto",
        ps: "4",
        letterSpacing: "widest",
        fontFamily: "inherit",
      },
      separator: { height: "1px", bg: "bg.muted", my: "1", mx: "-1" },
    },
    variants: {
      variant: {
        subtle: { item: { _highlighted: { bg: "bg.emphasized/60" } } },
        solid: {
          item: {
            _highlighted: {
              bg: "colorPalette.solid",
              color: "colorPalette.contrast",
            },
          },
        },
      },
      size: {
        sm: {
          content: { minW: "8rem", padding: "1" },
          item: { gap: "1", textStyle: "xs", py: "1", px: "1.5" },
        },
        md: {
          content: { minW: "8rem", padding: "1.5" },
          item: { gap: "2", textStyle: "sm", py: "1.5", px: "2" },
        },
      },
    },
    defaultVariants: { size: "md", variant: "subtle" },
  }),
  mc = ge({
    className: "chakra-select",
    slots: L3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5",
        width: "full",
      },
      trigger: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "full",
        minH: "var(--select-trigger-height)",
        "--input-height": "var(--select-trigger-height)",
        px: "var(--select-trigger-padding-x)",
        borderRadius: "l2",
        userSelect: "none",
        textAlign: "start",
        focusVisibleRing: "inside",
        _placeholderShown: { color: "fg.muted/80" },
        _disabled: { layerStyle: "disabled" },
        _invalid: { borderColor: "border.error" },
      },
      indicatorGroup: {
        display: "flex",
        alignItems: "center",
        gap: "1",
        pos: "absolute",
        insetEnd: "0",
        top: "0",
        bottom: "0",
        px: "var(--select-trigger-padding-x)",
        pointerEvents: "none",
      },
      indicator: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: {
          base: "fg.muted",
          _disabled: "fg.subtle",
          _invalid: "fg.error",
        },
      },
      content: {
        background: "bg.panel",
        display: "flex",
        flexDirection: "column",
        zIndex: "dropdown",
        borderRadius: "l2",
        outline: 0,
        maxH: "96",
        overflowY: "auto",
        boxShadow: "md",
        _open: { animationStyle: "slide-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "slide-fade-out",
          animationDuration: "fastest",
        },
      },
      item: {
        position: "relative",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: "2",
        cursor: "option",
        justifyContent: "space-between",
        flex: "1",
        textAlign: "start",
        borderRadius: "l1",
        _highlighted: { bg: "bg.emphasized/60" },
        _disabled: { pointerEvents: "none", opacity: "0.5" },
        _icon: { width: "4", height: "4" },
      },
      control: { pos: "relative" },
      itemText: { flex: "1" },
      itemGroup: { _first: { mt: "0" } },
      itemGroupLabel: { py: "1", fontWeight: "medium" },
      label: {
        fontWeight: "medium",
        userSelect: "none",
        textStyle: "sm",
        _disabled: { layerStyle: "disabled" },
      },
      valueText: { lineClamp: "1", maxW: "80%" },
      clearTrigger: {
        color: "fg.muted",
        pointerEvents: "auto",
        focusVisibleRing: "inside",
        focusRingWidth: "2px",
        rounded: "l1",
      },
    },
    variants: {
      variant: {
        outline: {
          trigger: {
            bg: "transparent",
            borderWidth: "1px",
            borderColor: "border",
            _expanded: { borderColor: "border.emphasized" },
          },
        },
        subtle: {
          trigger: {
            borderWidth: "1px",
            borderColor: "transparent",
            bg: "bg.muted",
          },
        },
      },
      size: {
        xs: {
          root: {
            "--select-trigger-height": "sizes.8",
            "--select-trigger-padding-x": "spacing.2",
          },
          content: { p: "1", gap: "1", textStyle: "xs" },
          trigger: { textStyle: "xs", gap: "1" },
          item: { py: "1", px: "2" },
          itemGroupLabel: { py: "1", px: "2" },
          indicator: { _icon: { width: "3.5", height: "3.5" } },
        },
        sm: {
          root: {
            "--select-trigger-height": "sizes.9",
            "--select-trigger-padding-x": "spacing.2.5",
          },
          content: { p: "1", textStyle: "sm" },
          trigger: { textStyle: "sm", gap: "1" },
          indicator: { _icon: { width: "4", height: "4" } },
          item: { py: "1", px: "1.5" },
          itemGroup: { mt: "1" },
          itemGroupLabel: { py: "1", px: "1.5" },
        },
        md: {
          root: {
            "--select-trigger-height": "sizes.10",
            "--select-trigger-padding-x": "spacing.3",
          },
          content: { p: "1", textStyle: "sm" },
          itemGroup: { mt: "1.5" },
          item: { py: "1.5", px: "2" },
          itemIndicator: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          itemGroupLabel: { py: "1.5", px: "2" },
          trigger: { textStyle: "sm", gap: "2" },
          indicator: { _icon: { width: "4", height: "4" } },
        },
        lg: {
          root: {
            "--select-trigger-height": "sizes.12",
            "--select-trigger-padding-x": "spacing.4",
          },
          content: { p: "1.5", textStyle: "md" },
          itemGroup: { mt: "2" },
          item: { py: "2", px: "3" },
          itemGroupLabel: { py: "2", px: "3" },
          trigger: { textStyle: "md", py: "3", gap: "2" },
          indicator: { _icon: { width: "5", height: "5" } },
        },
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  });
var nx, ax;
const xI = ge({
  className: "chakra-native-select",
  slots: P3.keys(),
  base: {
    root: {
      height: "fit-content",
      display: "flex",
      width: "100%",
      position: "relative",
    },
    field: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      appearance: "none",
      borderRadius: "l2",
      "--error-color": "colors.border.error",
      _disabled: { layerStyle: "disabled" },
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
      focusVisibleRing: "inside",
      lineHeight: "normal",
      "& > option, & > optgroup": { bg: "bg" },
    },
    indicator: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
      color: "fg.muted",
      _disabled: { opacity: "0.5" },
      _invalid: { color: "fg.error" },
      _icon: { width: "1em", height: "1em" },
    },
  },
  variants: {
    variant: {
      outline: {
        field: (nx = mc.variants) == null ? void 0 : nx.variant.outline.trigger,
      },
      subtle: {
        field: (ax = mc.variants) == null ? void 0 : ax.variant.subtle.trigger,
      },
      plain: {
        field: { bg: "transparent", color: "fg", focusRingWidth: "2px" },
      },
    },
    size: {
      xs: {
        field: { textStyle: "xs", ps: "2", pe: "6", height: "6" },
        indicator: { textStyle: "sm", insetEnd: "1.5" },
      },
      sm: {
        field: { textStyle: "sm", ps: "2.5", pe: "8", height: "8" },
        indicator: { textStyle: "md", insetEnd: "2" },
      },
      md: {
        field: { textStyle: "sm", ps: "3", pe: "8", height: "10" },
        indicator: { textStyle: "lg", insetEnd: "2" },
      },
      lg: {
        field: { textStyle: "md", ps: "4", pe: "8", height: "11" },
        indicator: { textStyle: "xl", insetEnd: "3" },
      },
      xl: {
        field: { textStyle: "md", ps: "4.5", pe: "10", height: "12" },
        indicator: { textStyle: "xl", insetEnd: "3" },
      },
    },
  },
  defaultVariants: mc.defaultVariants,
});
function Eg(e, n) {
  const i = {};
  for (const r in e) {
    const s = n(r, e[r]);
    i[s[0]] = s[1];
  }
  return i;
}
const a0 = YS({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
    userSelect: "none",
    cursor: "button",
    lineHeight: "1",
    color: "fg.muted",
    "--stepper-base-radius": "radii.l1",
    "--stepper-radius": "calc(var(--stepper-base-radius) + 1px)",
    _icon: { boxSize: "1em" },
    _disabled: { opacity: "0.5" },
    _hover: { bg: "bg.muted" },
    _active: { bg: "bg.emphasized" },
  }),
  SI = ge({
    className: "chakra-number-input",
    slots: kS.keys(),
    base: {
      root: { position: "relative", zIndex: "0", isolation: "isolate" },
      input: {
        ...at.base,
        verticalAlign: "top",
        pe: "calc(var(--stepper-width) + 0.5rem)",
      },
      control: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "0",
        insetEnd: "0px",
        margin: "1px",
        width: "var(--stepper-width)",
        height: "calc(100% - 2px)",
        zIndex: "1",
        borderStartWidth: "1px",
        divideY: "1px",
      },
      incrementTrigger: { ...a0, borderTopEndRadius: "var(--stepper-radius)" },
      decrementTrigger: {
        ...a0,
        borderBottomEndRadius: "var(--stepper-radius)",
      },
      valueText: {
        fontWeight: "medium",
        fontFeatureSettings: "pnum",
        fontVariantNumeric: "proportional-nums",
      },
    },
    variants: {
      size: {
        xs: {
          input: at.variants.size.xs,
          control: { fontSize: "2xs", "--stepper-width": "sizes.4" },
        },
        sm: {
          input: at.variants.size.sm,
          control: { fontSize: "xs", "--stepper-width": "sizes.5" },
        },
        md: {
          input: at.variants.size.md,
          control: { fontSize: "sm", "--stepper-width": "sizes.6" },
        },
        lg: {
          input: at.variants.size.lg,
          control: { fontSize: "sm", "--stepper-width": "sizes.6" },
        },
      },
      variant: Eg(at.variants.variant, (e, n) => [e, { input: n }]),
    },
    defaultVariants: { size: "md", variant: "outline" },
  }),
  { variants: i0, defaultVariants: CI } = at,
  EI = ge({
    className: "chakra-pin-input",
    slots: AS.keys(),
    base: {
      input: { ...at.base, textAlign: "center", width: "var(--input-height)" },
      control: { display: "inline-flex", gap: "2", isolation: "isolate" },
    },
    variants: {
      size: Eg(i0.size, (e, n) => [e, { input: { ...n, px: "1" } }]),
      variant: Eg(i0.variant, (e, n) => [e, { input: n }]),
      attached: {
        true: {
          control: { gap: "0", spaceX: "-1px" },
          input: {
            _notFirst: { borderStartRadius: "0" },
            _notLast: { borderEndRadius: "0" },
            _focusVisible: { zIndex: "1" },
          },
        },
      },
    },
    defaultVariants: CI,
  }),
  OI = ge({
    className: "chakra-popover",
    slots: V3.keys(),
    base: {
      content: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textStyle: "sm",
        "--popover-bg": "colors.bg.panel",
        bg: "var(--popover-bg)",
        boxShadow: "lg",
        "--popover-size": "sizes.xs",
        "--popover-mobile-size": "calc(100dvw - 1rem)",
        width: {
          base: "min(var(--popover-mobile-size), var(--popover-size))",
          sm: "var(--popover-size)",
        },
        borderRadius: "l3",
        "--popover-z-index": "zIndex.popover",
        zIndex: "calc(var(--popover-z-index) + var(--layer-index, 0))",
        outline: "0",
        transformOrigin: "var(--transform-origin)",
        maxHeight: "var(--available-height)",
        _open: { animationStyle: "scale-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "scale-fade-out",
          animationDuration: "faster",
        },
      },
      header: {
        paddingInline: "var(--popover-padding)",
        paddingTop: "var(--popover-padding)",
      },
      body: { padding: "var(--popover-padding)", flex: "1" },
      footer: {
        display: "flex",
        alignItems: "center",
        paddingInline: "var(--popover-padding)",
        paddingBottom: "var(--popover-padding)",
      },
      arrow: {
        "--arrow-size": "sizes.3",
        "--arrow-background": "var(--popover-bg)",
      },
      arrowTip: { borderTopWidth: "1px", borderInlineStartWidth: "1px" },
    },
    variants: {
      size: {
        xs: { content: { "--popover-padding": "spacing.3" } },
        sm: { content: { "--popover-padding": "spacing.4" } },
        md: { content: { "--popover-padding": "spacing.5" } },
        lg: { content: { "--popover-padding": "spacing.6" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  wI = ge({
    slots: fh.keys(),
    className: "chakra-progress",
    base: {
      root: { textStyle: "sm", position: "relative" },
      track: { overflow: "hidden", position: "relative" },
      range: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transitionProperty: "width, height",
        transitionDuration: "slow",
        height: "100%",
        bgColor: "var(--track-color)",
        _indeterminate: {
          "--animate-from-x": "-40%",
          "--animate-to-x": "100%",
          position: "absolute",
          willChange: "left",
          minWidth: "50%",
          animation: "position 1s ease infinite normal none running",
          backgroundImage:
            "linear-gradient(to right, transparent 0%, var(--track-color) 50%, transparent 100%)",
        },
      },
      label: {
        display: "inline-flex",
        fontWeight: "medium",
        alignItems: "center",
        gap: "1",
      },
      valueText: { textStyle: "xs", lineHeight: "1", fontWeight: "medium" },
    },
    variants: {
      variant: {
        outline: {
          track: { shadow: "inset", bgColor: "bg.muted" },
          range: { bgColor: "colorPalette.solid" },
        },
        subtle: {
          track: { bgColor: "colorPalette.muted" },
          range: { bgColor: "colorPalette.solid/72" },
        },
      },
      shape: {
        square: {},
        rounded: { track: { borderRadius: "l1" } },
        full: { track: { borderRadius: "full" } },
      },
      striped: {
        true: {
          range: {
            backgroundImage:
              "linear-gradient(45deg, var(--stripe-color) 25%, transparent 25%, transparent 50%, var(--stripe-color) 50%, var(--stripe-color) 75%, transparent 75%, transparent)",
            backgroundSize: "var(--stripe-size) var(--stripe-size)",
            "--stripe-size": "1rem",
            "--stripe-color": {
              _light: "rgba(255, 255, 255, 0.3)",
              _dark: "rgba(0, 0, 0, 0.3)",
            },
          },
        },
      },
      animated: {
        true: {
          range: {
            "--animate-from": "var(--stripe-size)",
            animation: "bg-position 1s linear infinite",
          },
        },
      },
      size: {
        xs: { track: { h: "1.5" } },
        sm: { track: { h: "2" } },
        md: { track: { h: "2.5" } },
        lg: { track: { h: "3" } },
        xl: { track: { h: "4" } },
      },
    },
    defaultVariants: { variant: "outline", size: "md", shape: "rounded" },
  }),
  kI = ge({
    className: "chakra-progress-circle",
    slots: fh.keys(),
    base: {
      root: { display: "inline-flex", textStyle: "sm", position: "relative" },
      circle: { _indeterminate: { animation: "spin 2s linear infinite" } },
      circleTrack: {
        "--track-color": "colors.colorPalette.muted",
        stroke: "var(--track-color)",
      },
      circleRange: {
        stroke: "colorPalette.solid",
        transitionProperty: "stroke-dashoffset, stroke-dasharray",
        transitionDuration: "0.6s",
        _indeterminate: { animation: "circular-progress 1.5s linear infinite" },
      },
      label: { display: "inline-flex" },
      valueText: {
        lineHeight: "1",
        fontWeight: "medium",
        letterSpacing: "tight",
        fontVariantNumeric: "tabular-nums",
      },
    },
    variants: {
      size: {
        xs: {
          circle: { "--size": "24px", "--thickness": "4px" },
          valueText: { textStyle: "2xs" },
        },
        sm: {
          circle: { "--size": "32px", "--thickness": "5px" },
          valueText: { textStyle: "2xs" },
        },
        md: {
          circle: { "--size": "40px", "--thickness": "6px" },
          valueText: { textStyle: "xs" },
        },
        lg: {
          circle: { "--size": "48px", "--thickness": "7px" },
          valueText: { textStyle: "sm" },
        },
        xl: {
          circle: { "--size": "64px", "--thickness": "8px" },
          valueText: { textStyle: "sm" },
        },
      },
    },
    defaultVariants: { size: "md" },
  }),
  RI = ge({
    slots: _S.keys(),
    className: "chakra-qr-code",
    base: {
      root: {
        position: "relative",
        width: "fit-content",
        "--qr-code-overlay-size": "calc(var(--qr-code-size) / 3)",
      },
      frame: {
        width: "var(--qr-code-size)",
        height: "var(--qr-code-size)",
        fill: "currentColor",
      },
      overlay: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--qr-code-overlay-size)",
        height: "var(--qr-code-overlay-size)",
        padding: "1",
        bg: "bg",
        rounded: "l1",
      },
    },
    variants: {
      size: {
        "2xs": { root: { "--qr-code-size": "40px" } },
        xs: { root: { "--qr-code-size": "64px" } },
        sm: { root: { "--qr-code-size": "80px" } },
        md: { root: { "--qr-code-size": "120px" } },
        lg: { root: { "--qr-code-size": "160px" } },
        xl: { root: { "--qr-code-size": "200px" } },
        "2xl": { root: { "--qr-code-size": "240px" } },
        full: { root: { "--qr-code-size": "100%" } },
      },
    },
    defaultVariants: { size: "md" },
  });
var ix, rx, ox, lx, sx, cx, ux;
const TI = ge({
  className: "chakra-radio-card",
  slots: D3.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      isolation: "isolate",
    },
    item: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      borderRadius: "l2",
      _focus: { bg: "colorPalette.muted/20" },
      _disabled: { opacity: "0.8", borderColor: "border.disabled" },
      _checked: { zIndex: "1" },
    },
    label: {
      display: "inline-flex",
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: { opacity: "0.5" },
    },
    itemText: { fontWeight: "medium", flex: "1" },
    itemDescription: { opacity: "0.64", textStyle: "sm" },
    itemControl: {
      display: "inline-flex",
      flex: "1",
      pos: "relative",
      rounded: "inherit",
      justifyContent: "var(--radio-card-justify)",
      alignItems: "var(--radio-card-align)",
      _disabled: { bg: "bg.muted" },
    },
    itemIndicator: xt.base,
    itemAddon: { roundedBottom: "inherit", _disabled: { color: "fg.muted" } },
    itemContent: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
      gap: "1",
      justifyContent: "var(--radio-card-justify)",
      alignItems: "var(--radio-card-align)",
    },
  },
  variants: {
    size: {
      sm: {
        item: { textStyle: "sm" },
        itemControl: { padding: "3", gap: "1.5" },
        itemAddon: { px: "3", py: "1.5", borderTopWidth: "1px" },
        itemIndicator: (ix = xt.variants) == null ? void 0 : ix.size.sm,
      },
      md: {
        item: { textStyle: "sm" },
        itemControl: { padding: "4", gap: "2.5" },
        itemAddon: { px: "4", py: "2", borderTopWidth: "1px" },
        itemIndicator: (rx = xt.variants) == null ? void 0 : rx.size.md,
      },
      lg: {
        item: { textStyle: "md" },
        itemControl: { padding: "4", gap: "3.5" },
        itemAddon: { px: "4", py: "2", borderTopWidth: "1px" },
        itemIndicator: (ox = xt.variants) == null ? void 0 : ox.size.lg,
      },
    },
    variant: {
      surface: {
        item: {
          borderWidth: "1px",
          _checked: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
            borderColor: "colorPalette.muted",
          },
        },
        itemIndicator: (lx = xt.variants) == null ? void 0 : lx.variant.solid,
      },
      subtle: {
        item: { bg: "bg.muted" },
        itemControl: {
          _checked: { bg: "colorPalette.muted", color: "colorPalette.fg" },
        },
        itemIndicator: (sx = xt.variants) == null ? void 0 : sx.variant.outline,
      },
      outline: {
        item: {
          borderWidth: "1px",
          _checked: {
            boxShadow: "0 0 0 1px var(--shadow-color)",
            boxShadowColor: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator: (cx = xt.variants) == null ? void 0 : cx.variant.solid,
      },
      solid: {
        item: {
          borderWidth: "1px",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator:
          (ux = xt.variants) == null ? void 0 : ux.variant.inverted,
      },
    },
    justify: {
      start: { item: { "--radio-card-justify": "flex-start" } },
      end: { item: { "--radio-card-justify": "flex-end" } },
      center: { item: { "--radio-card-justify": "center" } },
    },
    align: {
      start: {
        item: { "--radio-card-align": "flex-start" },
        itemControl: { textAlign: "start" },
      },
      end: {
        item: { "--radio-card-align": "flex-end" },
        itemControl: { textAlign: "end" },
      },
      center: {
        item: { "--radio-card-align": "center" },
        itemControl: { textAlign: "center" },
      },
    },
    orientation: {
      vertical: { itemControl: { flexDirection: "column" } },
      horizontal: { itemControl: { flexDirection: "row" } },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
    align: "start",
    orientation: "horizontal",
  },
});
var dx, fx, gx, hx, mx, px, vx, bx, yx, xx, Sx, Cx, Ex, Ox;
const AI = ge({
    className: "chakra-radio-group",
    slots: yC.keys(),
    base: {
      item: {
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        fontWeight: "medium",
        _disabled: { cursor: "disabled" },
      },
      itemControl: xt.base,
      label: {
        userSelect: "none",
        textStyle: "sm",
        _disabled: { opacity: "0.5" },
      },
    },
    variants: {
      variant: {
        outline: {
          itemControl:
            (fx = (dx = xt.variants) == null ? void 0 : dx.variant) == null
              ? void 0
              : fx.outline,
        },
        subtle: {
          itemControl:
            (hx = (gx = xt.variants) == null ? void 0 : gx.variant) == null
              ? void 0
              : hx.subtle,
        },
        solid: {
          itemControl:
            (px = (mx = xt.variants) == null ? void 0 : mx.variant) == null
              ? void 0
              : px.solid,
        },
      },
      size: {
        xs: {
          item: { textStyle: "xs", gap: "1.5" },
          itemControl:
            (bx = (vx = xt.variants) == null ? void 0 : vx.size) == null
              ? void 0
              : bx.xs,
        },
        sm: {
          item: { textStyle: "sm", gap: "2" },
          itemControl:
            (xx = (yx = xt.variants) == null ? void 0 : yx.size) == null
              ? void 0
              : xx.sm,
        },
        md: {
          item: { textStyle: "sm", gap: "2.5" },
          itemControl:
            (Cx = (Sx = xt.variants) == null ? void 0 : Sx.size) == null
              ? void 0
              : Cx.md,
        },
        lg: {
          item: { textStyle: "md", gap: "3" },
          itemControl:
            (Ox = (Ex = xt.variants) == null ? void 0 : Ex.size) == null
              ? void 0
              : Ox.lg,
        },
      },
    },
    defaultVariants: { size: "md", variant: "solid" },
  }),
  zI = ge({
    className: "chakra-rating-group",
    slots: M3.keys(),
    base: {
      root: { display: "inline-flex" },
      control: { display: "inline-flex", alignItems: "center" },
      item: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      },
      itemIndicator: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1em",
        height: "1em",
        position: "relative",
        "--clip-path": { base: "inset(0 50% 0 0)", _rtl: "inset(0 0 0 50%)" },
        _icon: {
          stroke: "currentColor",
          width: "100%",
          height: "100%",
          display: "inline-block",
          flexShrink: 0,
          position: "absolute",
          left: 0,
          top: 0,
        },
        "& [data-bg]": { color: "bg.emphasized" },
        "& [data-fg]": { color: "transparent" },
        "&[data-highlighted]:not([data-half])": {
          "& [data-fg]": { color: "colorPalette.solid" },
        },
        "&[data-half]": {
          "& [data-fg]": {
            color: "colorPalette.solid",
            clipPath: "var(--clip-path)",
          },
        },
      },
    },
    variants: {
      size: {
        xs: { item: { textStyle: "sm" } },
        sm: { item: { textStyle: "md" } },
        md: { item: { textStyle: "xl" } },
        lg: { item: { textStyle: "2xl" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  _I = ge({
    className: "chakra-segment-group",
    slots: IS.keys(),
    base: {
      root: {
        "--segment-radius": "radii.l2",
        borderRadius: "l2",
        display: "inline-flex",
        boxShadow: "inset",
        minW: "max-content",
        textAlign: "center",
        position: "relative",
        isolation: "isolate",
        bg: "bg.muted",
        _vertical: { flexDirection: "column" },
      },
      item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        fontSize: "sm",
        position: "relative",
        color: "fg",
        borderRadius: "var(--segment-radius)",
        _disabled: { opacity: "0.5" },
        "&:has(input:focus-visible)": { focusRing: "outside" },
        _before: {
          content: '""',
          position: "absolute",
          bg: "border",
          transition: "opacity 0.2s",
        },
        _horizontal: {
          _before: { insetInlineStart: 0, insetBlock: "1.5", width: "1px" },
        },
        _vertical: {
          _before: { insetBlockStart: 0, insetInline: "1.5", height: "1px" },
        },
        "& + &[data-state=checked], &[data-state=checked] + &, &:first-of-type":
          { _before: { opacity: "0" } },
        "&[data-state=checked][data-ssr]": {
          shadow: "sm",
          bg: "bg",
          borderRadius: "var(--segment-radius)",
        },
      },
      indicator: {
        shadow: "sm",
        pos: "absolute",
        bg: { _light: "bg", _dark: "bg.emphasized" },
        width: "var(--width)",
        height: "var(--height)",
        top: "var(--top)",
        left: "var(--left)",
        zIndex: -1,
        borderRadius: "var(--segment-radius)",
      },
    },
    variants: {
      size: {
        xs: { item: { textStyle: "xs", px: "3", gap: "1", height: "6" } },
        sm: { item: { textStyle: "sm", px: "4", gap: "2", height: "8" } },
        md: { item: { textStyle: "sm", px: "4", gap: "2", height: "10" } },
        lg: { item: { textStyle: "md", px: "4.5", gap: "3", height: "11" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  NI = ge({
    className: "chakra-slider",
    slots: B3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1",
        textStyle: "sm",
        position: "relative",
        isolation: "isolate",
        touchAction: "none",
      },
      label: { fontWeight: "medium", textStyle: "sm" },
      control: {
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
      },
      track: { overflow: "hidden", borderRadius: "full", flex: "1" },
      range: {
        width: "inherit",
        height: "inherit",
        _disabled: { bg: "border.emphasized!" },
      },
      markerGroup: { position: "absolute!", zIndex: "1" },
      marker: {
        "--marker-bg": { base: "white", _underValue: "colors.bg" },
        display: "flex",
        alignItems: "center",
        gap: "calc(var(--slider-thumb-size) / 2)",
        color: "fg.muted",
        textStyle: "xs",
      },
      markerIndicator: {
        width: "var(--slider-marker-size)",
        height: "var(--slider-marker-size)",
        borderRadius: "full",
        bg: "var(--marker-bg)",
      },
      thumb: {
        width: "var(--slider-thumb-size)",
        height: "var(--slider-thumb-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
        zIndex: "2",
        borderRadius: "full",
        _focusVisible: {
          ring: "2px",
          ringColor: "colorPalette.focusRing",
          ringOffset: "2px",
          ringOffsetColor: "bg",
        },
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            "--slider-thumb-size": "sizes.4",
            "--slider-track-size": "sizes.1.5",
            "--slider-marker-center": "6px",
            "--slider-marker-size": "sizes.1",
            "--slider-marker-inset": "3px",
          },
        },
        md: {
          root: {
            "--slider-thumb-size": "sizes.5",
            "--slider-track-size": "sizes.2",
            "--slider-marker-center": "8px",
            "--slider-marker-size": "sizes.1",
            "--slider-marker-inset": "4px",
          },
        },
        lg: {
          root: {
            "--slider-thumb-size": "sizes.6",
            "--slider-track-size": "sizes.2.5",
            "--slider-marker-center": "9px",
            "--slider-marker-size": "sizes.1.5",
            "--slider-marker-inset": "5px",
          },
        },
      },
      variant: {
        outline: {
          track: { shadow: "inset", bg: "bg.emphasized/72" },
          range: { bg: "colorPalette.solid" },
          thumb: {
            borderWidth: "2px",
            borderColor: "colorPalette.solid",
            bg: "bg",
            _disabled: {
              bg: "border.emphasized",
              borderColor: "border.emphasized",
            },
          },
        },
        solid: {
          track: { bg: "colorPalette.subtle", _disabled: { bg: "bg.muted" } },
          range: { bg: "colorPalette.solid" },
          thumb: {
            bg: "colorPalette.solid",
            _disabled: { bg: "border.emphasized" },
          },
        },
      },
      orientation: {
        vertical: {
          root: { display: "inline-flex" },
          control: {
            flexDirection: "column",
            height: "100%",
            minWidth: "var(--slider-thumb-size)",
            "&[data-has-mark-label], &:has(.chakra-slider__marker-label)": {
              marginEnd: "4",
            },
          },
          track: { width: "var(--slider-track-size)" },
          thumb: { left: "50%", translate: "-50% 0" },
          markerGroup: {
            insetStart: "var(--slider-marker-center)",
            insetBlock: "var(--slider-marker-inset)",
          },
          marker: { flexDirection: "row" },
        },
        horizontal: {
          control: {
            flexDirection: "row",
            width: "100%",
            minHeight: "var(--slider-thumb-size)",
            "&[data-has-mark-label], &:has(.chakra-slider__marker-label)": {
              marginBottom: "4",
            },
          },
          track: { height: "var(--slider-track-size)" },
          thumb: { top: "50%", translate: "0 -50%" },
          markerGroup: {
            top: "var(--slider-marker-center)",
            insetInline: "var(--slider-marker-inset)",
          },
          marker: { flexDirection: "column" },
        },
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline",
      orientation: "horizontal",
    },
  }),
  II = ge({
    className: "chakra-stat",
    slots: j3.keys(),
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1",
        position: "relative",
        flex: "1",
      },
      label: {
        display: "inline-flex",
        gap: "1.5",
        alignItems: "center",
        color: "fg.muted",
        textStyle: "sm",
      },
      helpText: { color: "fg.muted", textStyle: "xs" },
      valueUnit: {
        color: "fg.muted",
        textStyle: "xs",
        fontWeight: "initial",
        letterSpacing: "initial",
      },
      valueText: {
        verticalAlign: "baseline",
        fontWeight: "semibold",
        letterSpacing: "tight",
        fontFeatureSettings: "pnum",
        fontVariantNumeric: "proportional-nums",
        display: "inline-flex",
        gap: "1",
      },
      indicator: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginEnd: 1,
        "& :where(svg)": { w: "1em", h: "1em" },
        "&[data-type=up]": { color: "fg.success" },
        "&[data-type=down]": { color: "fg.error" },
      },
    },
    variants: {
      size: {
        sm: { valueText: { textStyle: "xl" } },
        md: { valueText: { textStyle: "2xl" } },
        lg: { valueText: { textStyle: "3xl" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  PI = ge({
    className: "chakra-status",
    slots: U3.keys(),
    base: {
      root: { display: "inline-flex", alignItems: "center", gap: "2" },
      indicator: {
        width: "0.64em",
        height: "0.64em",
        flexShrink: 0,
        borderRadius: "full",
        forcedColorAdjust: "none",
        bg: "colorPalette.solid",
      },
    },
    variants: {
      size: {
        sm: { root: { textStyle: "xs" } },
        md: { root: { textStyle: "sm" } },
        lg: { root: { textStyle: "md" } },
      },
    },
    defaultVariants: { size: "md" },
  }),
  VI = ge({
    className: "chakra-steps",
    slots: $3.keys(),
    base: {
      root: { display: "flex", width: "full" },
      list: {
        display: "flex",
        justifyContent: "space-between",
        "--steps-gutter": "spacing.3",
        "--steps-thickness": "2px",
      },
      title: { fontWeight: "medium", color: "fg" },
      description: { color: "fg.muted" },
      separator: { bg: "border", flex: "1" },
      indicator: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: "0",
        borderRadius: "full",
        fontWeight: "medium",
        width: "var(--steps-size)",
        height: "var(--steps-size)",
        _icon: {
          flexShrink: "0",
          width: "var(--steps-icon-size)",
          height: "var(--steps-icon-size)",
        },
      },
      item: {
        position: "relative",
        display: "flex",
        gap: "3",
        flex: "1 0 0",
        "&:last-of-type": {
          flex: "initial",
          "& [data-part=separator]": { display: "none" },
        },
      },
      trigger: {
        display: "flex",
        alignItems: "center",
        gap: "3",
        textAlign: "start",
        focusVisibleRing: "outside",
        borderRadius: "l2",
      },
      content: { focusVisibleRing: "outside" },
    },
    variants: {
      orientation: {
        vertical: {
          root: { flexDirection: "row", height: "100%" },
          list: { flexDirection: "column", alignItems: "flex-start" },
          separator: {
            position: "absolute",
            width: "var(--steps-thickness)",
            height: "100%",
            maxHeight:
              "calc(100% - var(--steps-size) - var(--steps-gutter) * 2)",
            top: "calc(var(--steps-size) + var(--steps-gutter))",
            insetStart: "calc(var(--steps-size) / 2 - 1px)",
          },
          item: { alignItems: "flex-start" },
        },
        horizontal: {
          root: { flexDirection: "column", width: "100%" },
          list: { flexDirection: "row", alignItems: "center" },
          separator: {
            width: "100%",
            height: "var(--steps-thickness)",
            marginX: "var(--steps-gutter)",
          },
          item: { alignItems: "center" },
        },
      },
      variant: {
        solid: {
          indicator: {
            _incomplete: { borderWidth: "var(--steps-thickness)" },
            _current: {
              bg: "colorPalette.muted",
              borderWidth: "var(--steps-thickness)",
              borderColor: "colorPalette.solid",
              color: "colorPalette.fg",
            },
            _complete: {
              bg: "colorPalette.solid",
              borderColor: "colorPalette.solid",
              color: "colorPalette.contrast",
            },
          },
          separator: { _complete: { bg: "colorPalette.solid" } },
        },
        subtle: {
          indicator: {
            _incomplete: { bg: "bg.muted" },
            _current: { bg: "colorPalette.muted", color: "colorPalette.fg" },
            _complete: {
              bg: "colorPalette.emphasized",
              color: "colorPalette.fg",
            },
          },
          separator: { _complete: { bg: "colorPalette.emphasized" } },
        },
      },
      size: {
        xs: {
          root: { gap: "2.5" },
          list: {
            "--steps-size": "sizes.6",
            "--steps-icon-size": "sizes.3.5",
            textStyle: "xs",
          },
          title: { textStyle: "sm" },
        },
        sm: {
          root: { gap: "3" },
          list: {
            "--steps-size": "sizes.8",
            "--steps-icon-size": "sizes.4",
            textStyle: "xs",
          },
          title: { textStyle: "sm" },
        },
        md: {
          root: { gap: "4" },
          list: {
            "--steps-size": "sizes.10",
            "--steps-icon-size": "sizes.4",
            textStyle: "sm",
          },
          title: { textStyle: "sm" },
        },
        lg: {
          root: { gap: "6" },
          list: {
            "--steps-size": "sizes.11",
            "--steps-icon-size": "sizes.5",
            textStyle: "md",
          },
          title: { textStyle: "md" },
        },
      },
    },
    defaultVariants: {
      size: "md",
      variant: "solid",
      orientation: "horizontal",
    },
  }),
  DI = ge({
    slots: F3.keys(),
    className: "chakra-switch",
    base: {
      root: {
        display: "inline-flex",
        gap: "2.5",
        alignItems: "center",
        position: "relative",
        verticalAlign: "middle",
        "--switch-diff": "calc(var(--switch-width) - var(--switch-height))",
        "--switch-x": {
          base: "var(--switch-diff)",
          _rtl: "calc(var(--switch-diff) * -1)",
        },
      },
      label: {
        lineHeight: "1",
        userSelect: "none",
        fontSize: "sm",
        fontWeight: "medium",
        _disabled: { opacity: "0.5" },
      },
      indicator: {
        position: "absolute",
        height: "var(--switch-height)",
        width: "var(--switch-height)",
        fontSize: "var(--switch-indicator-font-size)",
        fontWeight: "medium",
        flexShrink: 0,
        userSelect: "none",
        display: "grid",
        placeContent: "center",
        transition: "inset-inline-start 0.12s ease",
        insetInlineStart: "calc(var(--switch-x) - 2px)",
        _checked: { insetInlineStart: "2px" },
      },
      control: {
        display: "inline-flex",
        gap: "0.5rem",
        flexShrink: 0,
        justifyContent: "flex-start",
        cursor: "switch",
        borderRadius: "full",
        position: "relative",
        width: "var(--switch-width)",
        height: "var(--switch-height)",
        transition: "backgrounds",
        _disabled: { opacity: "0.5", cursor: "not-allowed" },
        _invalid: {
          outline: "2px solid",
          outlineColor: "border.error",
          outlineOffset: "2px",
        },
      },
      thumb: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transitionProperty: "translate",
        transitionDuration: "fast",
        borderRadius: "inherit",
        _checked: { translate: "var(--switch-x) 0" },
      },
    },
    variants: {
      variant: {
        solid: {
          control: {
            borderRadius: "full",
            bg: "bg.emphasized",
            focusVisibleRing: "outside",
            _checked: { bg: "colorPalette.solid" },
          },
          thumb: {
            bg: "white",
            width: "var(--switch-height)",
            height: "var(--switch-height)",
            scale: "0.8",
            boxShadow: "sm",
            _checked: { bg: "colorPalette.contrast" },
          },
        },
        raised: {
          control: {
            borderRadius: "full",
            height: "calc(var(--switch-height) / 2)",
            bg: "bg.muted",
            boxShadow: "inset",
            _checked: { bg: "colorPalette.solid/60" },
          },
          thumb: {
            width: "var(--switch-height)",
            height: "var(--switch-height)",
            position: "relative",
            top: "calc(var(--switch-height) * -0.25)",
            bg: "white",
            boxShadow: "xs",
            focusVisibleRing: "outside",
            _checked: { bg: "colorPalette.solid" },
          },
        },
      },
      size: {
        xs: {
          root: {
            "--switch-width": "sizes.6",
            "--switch-height": "sizes.3",
            "--switch-indicator-font-size": "fontSizes.xs",
          },
        },
        sm: {
          root: {
            "--switch-width": "sizes.8",
            "--switch-height": "sizes.4",
            "--switch-indicator-font-size": "fontSizes.xs",
          },
        },
        md: {
          root: {
            "--switch-width": "sizes.10",
            "--switch-height": "sizes.5",
            "--switch-indicator-font-size": "fontSizes.sm",
          },
        },
        lg: {
          root: {
            "--switch-width": "sizes.12",
            "--switch-height": "sizes.6",
            "--switch-indicator-font-size": "fontSizes.md",
          },
        },
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }),
  MI = ge({
    className: "chakra-table",
    slots: G3.keys(),
    base: {
      root: {
        fontVariantNumeric: "lining-nums tabular-nums",
        borderCollapse: "collapse",
        width: "full",
        textAlign: "start",
        verticalAlign: "top",
      },
      row: { _selected: { bg: "colorPalette.subtle" } },
      cell: { textAlign: "start", alignItems: "center" },
      columnHeader: { fontWeight: "medium", textAlign: "start", color: "fg" },
      caption: { fontWeight: "medium", textStyle: "xs" },
      footer: { fontWeight: "medium" },
    },
    variants: {
      interactive: {
        true: { body: { "& tr": { _hover: { bg: "colorPalette.subtle" } } } },
      },
      stickyHeader: {
        true: {
          header: {
            "& :where(tr)": {
              top: "var(--table-sticky-offset, 0)",
              position: "sticky",
              zIndex: 1,
            },
          },
        },
      },
      striped: {
        true: { row: { "&:nth-of-type(odd) td": { bg: "bg.muted" } } },
      },
      showColumnBorder: {
        true: {
          columnHeader: {
            "&:not(:last-of-type)": { borderInlineEndWidth: "1px" },
          },
          cell: { "&:not(:last-of-type)": { borderInlineEndWidth: "1px" } },
        },
      },
      variant: {
        line: {
          columnHeader: { borderBottomWidth: "1px" },
          cell: { borderBottomWidth: "1px" },
          row: { bg: "bg" },
        },
        outline: {
          root: { boxShadow: "0 0 0 1px {colors.border}", overflow: "hidden" },
          columnHeader: { borderBottomWidth: "1px" },
          header: { bg: "bg.muted" },
          row: { "&:not(:last-of-type)": { borderBottomWidth: "1px" } },
          footer: { borderTopWidth: "1px" },
        },
      },
      size: {
        sm: {
          root: { textStyle: "sm" },
          columnHeader: { px: "2", py: "2" },
          cell: { px: "2", py: "2" },
        },
        md: {
          root: { textStyle: "sm" },
          columnHeader: { px: "3", py: "3" },
          cell: { px: "3", py: "3" },
        },
        lg: {
          root: { textStyle: "md" },
          columnHeader: { px: "4", py: "3" },
          cell: { px: "4", py: "3" },
        },
      },
    },
    defaultVariants: { variant: "line", size: "md" },
  }),
  LI = ge({
    slots: q3.keys(),
    className: "chakra-tabs",
    base: {
      root: {
        "--tabs-trigger-radius": "radii.l2",
        position: "relative",
        _horizontal: { display: "block" },
        _vertical: { display: "flex" },
      },
      list: {
        display: "inline-flex",
        position: "relative",
        isolation: "isolate",
        "--tabs-indicator-shadow": "shadows.xs",
        "--tabs-indicator-bg": "colors.bg",
        minH: "var(--tabs-height)",
        _horizontal: { flexDirection: "row" },
        _vertical: { flexDirection: "column" },
      },
      trigger: {
        outline: "0",
        minW: "var(--tabs-height)",
        height: "var(--tabs-height)",
        display: "flex",
        alignItems: "center",
        fontWeight: "medium",
        position: "relative",
        cursor: "button",
        gap: "2",
        _focusVisible: {
          zIndex: 1,
          outline: "2px solid",
          outlineColor: "colorPalette.focusRing",
        },
        _disabled: { cursor: "not-allowed", opacity: 0.5 },
      },
      content: {
        focusVisibleRing: "inside",
        _horizontal: { width: "100%", pt: "var(--tabs-content-padding)" },
        _vertical: { height: "100%", ps: "var(--tabs-content-padding)" },
      },
      indicator: {
        width: "var(--width)",
        height: "var(--height)",
        borderRadius: "var(--tabs-indicator-radius)",
        bg: "var(--tabs-indicator-bg)",
        shadow: "var(--tabs-indicator-shadow)",
        zIndex: -1,
      },
    },
    variants: {
      fitted: {
        true: {
          list: { display: "flex" },
          trigger: { flex: 1, textAlign: "center", justifyContent: "center" },
        },
      },
      justify: {
        start: { list: { justifyContent: "flex-start" } },
        center: { list: { justifyContent: "center" } },
        end: { list: { justifyContent: "flex-end" } },
      },
      size: {
        sm: {
          root: {
            "--tabs-height": "sizes.9",
            "--tabs-content-padding": "spacing.3",
          },
          trigger: { py: "1", px: "3", textStyle: "sm" },
        },
        md: {
          root: {
            "--tabs-height": "sizes.10",
            "--tabs-content-padding": "spacing.4",
          },
          trigger: { py: "2", px: "4", textStyle: "sm" },
        },
        lg: {
          root: {
            "--tabs-height": "sizes.11",
            "--tabs-content-padding": "spacing.4.5",
          },
          trigger: { py: "2", px: "4.5", textStyle: "md" },
        },
      },
      variant: {
        line: {
          list: {
            display: "flex",
            borderColor: "border",
            _horizontal: { borderBottomWidth: "1px" },
            _vertical: { borderEndWidth: "1px" },
          },
          trigger: {
            color: "fg.muted",
            _disabled: { _active: { bg: "initial" } },
            _selected: {
              color: "fg",
              _horizontal: {
                layerStyle: "indicator.bottom",
                "--indicator-offset-y": "-1px",
                "--indicator-color": "colors.colorPalette.solid",
              },
              _vertical: {
                layerStyle: "indicator.end",
                "--indicator-offset-x": "-1px",
              },
            },
          },
        },
        subtle: {
          trigger: {
            borderRadius: "var(--tabs-trigger-radius)",
            color: "fg.muted",
            _selected: { bg: "colorPalette.subtle", color: "colorPalette.fg" },
          },
        },
        enclosed: {
          list: {
            bg: "bg.muted",
            padding: "1",
            borderRadius: "l3",
            minH: "calc(var(--tabs-height) - 4px)",
          },
          trigger: {
            justifyContent: "center",
            color: "fg.muted",
            borderRadius: "var(--tabs-trigger-radius)",
            _selected: { bg: "bg", color: "colorPalette.fg", shadow: "xs" },
          },
        },
        outline: {
          list: {
            "--line-thickness": "1px",
            "--line-offset": "calc(var(--line-thickness) * -1)",
            borderColor: "border",
            display: "flex",
            _horizontal: {
              _before: {
                content: '""',
                position: "absolute",
                bottom: "0px",
                width: "100%",
                borderBottomWidth: "var(--line-thickness)",
                borderBottomColor: "border",
              },
            },
            _vertical: {
              _before: {
                content: '""',
                position: "absolute",
                insetInline: "var(--line-offset)",
                height: "calc(100% - calc(var(--line-thickness) * 2))",
                borderEndWidth: "var(--line-thickness)",
                borderEndColor: "border",
              },
            },
          },
          trigger: {
            color: "fg.muted",
            borderWidth: "1px",
            borderColor: "transparent",
            _selected: { bg: "currentBg", color: "colorPalette.fg" },
            _horizontal: {
              borderTopRadius: "var(--tabs-trigger-radius)",
              marginBottom: "var(--line-offset)",
              marginEnd: { _notLast: "var(--line-offset)" },
              _selected: {
                borderColor: "border",
                borderBottomColor: "transparent",
              },
            },
            _vertical: {
              borderStartRadius: "var(--tabs-trigger-radius)",
              marginEnd: "var(--line-offset)",
              marginBottom: { _notLast: "var(--line-offset)" },
              _selected: {
                borderColor: "border",
                borderEndColor: "transparent",
              },
            },
          },
        },
        plain: {
          trigger: {
            color: "fg.muted",
            _selected: { color: "colorPalette.fg" },
            borderRadius: "var(--tabs-trigger-radius)",
            "&[data-selected][data-ssr]": {
              bg: "var(--tabs-indicator-bg)",
              shadow: "var(--tabs-indicator-shadow)",
              borderRadius: "var(--tabs-indicator-radius)",
            },
          },
        },
      },
    },
    defaultVariants: { size: "md", variant: "line" },
  });
var wx;
const gn = (wx = ph.variants) == null ? void 0 : wx.variant,
  HI = ge({
    slots: Y3.keys(),
    className: "chakra-tag",
    base: {
      root: {
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "top",
        maxWidth: "100%",
        userSelect: "none",
        borderRadius: "l2",
        focusVisibleRing: "outside",
      },
      label: { lineClamp: "1" },
      closeTrigger: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "0",
        borderRadius: "l1",
        color: "currentColor",
        focusVisibleRing: "inside",
        focusRingWidth: "2px",
      },
      startElement: {
        flexShrink: 0,
        boxSize: "var(--tag-element-size)",
        ms: "var(--tag-element-offset)",
        "&:has([data-scope=avatar])": {
          boxSize: "var(--tag-avatar-size)",
          ms: "calc(var(--tag-element-offset) * 1.5)",
        },
        _icon: { boxSize: "100%" },
      },
      endElement: {
        flexShrink: 0,
        boxSize: "var(--tag-element-size)",
        me: "var(--tag-element-offset)",
        _icon: { boxSize: "100%" },
        "&:has(button)": { ms: "calc(var(--tag-element-offset) * -1)" },
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            px: "1.5",
            minH: "4.5",
            gap: "1",
            "--tag-avatar-size": "spacing.3",
            "--tag-element-size": "spacing.3",
            "--tag-element-offset": "-2px",
          },
          label: { textStyle: "xs" },
        },
        md: {
          root: {
            px: "1.5",
            minH: "5",
            gap: "1",
            "--tag-avatar-size": "spacing.3.5",
            "--tag-element-size": "spacing.3.5",
            "--tag-element-offset": "-2px",
          },
          label: { textStyle: "xs" },
        },
        lg: {
          root: {
            px: "2",
            minH: "6",
            gap: "1.5",
            "--tag-avatar-size": "spacing.4.5",
            "--tag-element-size": "spacing.4",
            "--tag-element-offset": "-3px",
          },
          label: { textStyle: "sm" },
        },
        xl: {
          root: {
            px: "2.5",
            minH: "8",
            gap: "1.5",
            "--tag-avatar-size": "spacing.6",
            "--tag-element-size": "spacing.4.5",
            "--tag-element-offset": "-4px",
          },
          label: { textStyle: "sm" },
        },
      },
      variant: {
        subtle: { root: gn == null ? void 0 : gn.subtle },
        solid: { root: gn == null ? void 0 : gn.solid },
        outline: { root: gn == null ? void 0 : gn.outline },
        surface: { root: gn == null ? void 0 : gn.surface },
      },
    },
    defaultVariants: { size: "md", variant: "surface" },
  }),
  BI = ge({
    slots: X3.keys(),
    className: "chakra-timeline",
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
        width: "full",
        "--timeline-thickness": "1px",
        "--timeline-gutter": "4px",
      },
      item: {
        display: "flex",
        position: "relative",
        alignItems: "flex-start",
        flexShrink: 0,
        gap: "4",
        _last: { "& :where(.chakra-timeline__separator)": { display: "none" } },
      },
      separator: {
        position: "absolute",
        borderStartWidth: "var(--timeline-thickness)",
        ms: "calc(-1 * var(--timeline-thickness) / 2)",
        insetInlineStart: "calc(var(--timeline-indicator-size) / 2)",
        insetBlock: "0",
        borderColor: "border",
      },
      indicator: {
        outline: "2px solid {colors.bg}",
        position: "relative",
        flexShrink: "0",
        boxSize: "var(--timeline-indicator-size)",
        fontSize: "var(--timeline-font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "full",
        fontWeight: "medium",
      },
      connector: { alignSelf: "stretch", position: "relative" },
      content: {
        pb: "6",
        display: "flex",
        flexDirection: "column",
        width: "full",
        gap: "2",
      },
      title: {
        display: "flex",
        fontWeight: "medium",
        flexWrap: "wrap",
        gap: "1.5",
        alignItems: "center",
        mt: "var(--timeline-margin)",
      },
      description: { color: "fg.muted", textStyle: "xs" },
    },
    variants: {
      variant: {
        subtle: { indicator: { bg: "colorPalette.muted" } },
        solid: {
          indicator: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
          },
        },
        outline: {
          indicator: {
            bg: "currentBg",
            borderWidth: "1px",
            borderColor: "colorPalette.muted",
          },
        },
        plain: {},
      },
      size: {
        sm: {
          root: {
            "--timeline-indicator-size": "sizes.4",
            "--timeline-font-size": "fontSizes.2xs",
          },
          title: { textStyle: "xs" },
        },
        md: {
          root: {
            "--timeline-indicator-size": "sizes.5",
            "--timeline-font-size": "fontSizes.xs",
          },
          title: { textStyle: "sm" },
        },
        lg: {
          root: {
            "--timeline-indicator-size": "sizes.6",
            "--timeline-font-size": "fontSizes.xs",
          },
          title: { mt: "0.5", textStyle: "sm" },
        },
        xl: {
          root: {
            "--timeline-indicator-size": "sizes.8",
            "--timeline-font-size": "fontSizes.sm",
          },
          title: { mt: "1.5", textStyle: "sm" },
        },
      },
    },
    defaultVariants: { size: "md", variant: "solid" },
  }),
  jI = ge({
    slots: W3.keys(),
    className: "chakra-toast",
    base: {
      root: {
        width: "full",
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        gap: "3",
        py: "4",
        ps: "4",
        pe: "6",
        borderRadius: "l2",
        translate: "var(--x) var(--y)",
        scale: "var(--scale)",
        zIndex: "var(--z-index)",
        height: "var(--height)",
        opacity: "var(--opacity)",
        willChange: "translate, opacity, scale",
        transition:
          "translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms",
        transitionTimingFunction: "cubic-bezier(0.21, 1.02, 0.73, 1)",
        _closed: {
          transition: "translate 400ms, scale 400ms, opacity 200ms",
          transitionTimingFunction: "cubic-bezier(0.06, 0.71, 0.55, 1)",
        },
        bg: "bg.panel",
        color: "fg",
        boxShadow: "xl",
        "--toast-trigger-bg": "colors.bg.muted",
        "&[data-type=warning]": {
          bg: "orange.solid",
          color: "orange.contrast",
          "--toast-trigger-bg": "{white/10}",
          "--toast-border-color": "{white/40}",
        },
        "&[data-type=success]": {
          bg: "green.solid",
          color: "green.contrast",
          "--toast-trigger-bg": "{white/10}",
          "--toast-border-color": "{white/40}",
        },
        "&[data-type=error]": {
          bg: "red.solid",
          color: "red.contrast",
          "--toast-trigger-bg": "{white/10}",
          "--toast-border-color": "{white/40}",
        },
      },
      title: { fontWeight: "medium", textStyle: "sm", marginEnd: "2" },
      description: { display: "inline", textStyle: "sm", opacity: "0.8" },
      indicator: { flexShrink: "0", boxSize: "5" },
      actionTrigger: {
        textStyle: "sm",
        fontWeight: "medium",
        height: "8",
        px: "3",
        borderRadius: "l2",
        alignSelf: "center",
        borderWidth: "1px",
        borderColor: "var(--toast-border-color, inherit)",
        transition: "background 200ms",
        _hover: { bg: "var(--toast-trigger-bg)" },
      },
      closeTrigger: {
        position: "absolute",
        top: "1",
        insetEnd: "1",
        padding: "1",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "{currentColor/60}",
        borderRadius: "l2",
        textStyle: "md",
        transition: "background 200ms",
        _icon: { boxSize: "1em" },
      },
    },
  }),
  UI = ge({
    slots: $S.keys(),
    className: "chakra-tooltip",
    base: {
      content: {
        "--tooltip-bg": "colors.bg.inverted",
        bg: "var(--tooltip-bg)",
        color: "fg.inverted",
        px: "2.5",
        py: "1",
        borderRadius: "l2",
        fontWeight: "medium",
        textStyle: "xs",
        boxShadow: "md",
        maxW: "xs",
        zIndex: "tooltip",
        transformOrigin: "var(--transform-origin)",
        _open: { animationStyle: "scale-fade-in", animationDuration: "fast" },
        _closed: {
          animationStyle: "scale-fade-out",
          animationDuration: "fast",
        },
      },
      arrow: {
        "--arrow-size": "sizes.2",
        "--arrow-background": "var(--tooltip-bg)",
      },
      arrowTip: {
        borderTopWidth: "1px",
        borderInlineStartWidth: "1px",
        borderColor: "var(--tooltip-bg)",
      },
    },
  }),
  $I = {
    accordion: Q3,
    actionBar: Z3,
    alert: J3,
    avatar: eI,
    blockquote: tI,
    breadcrumb: nI,
    card: aI,
    checkbox: iI,
    checkboxCard: rI,
    collapsible: oI,
    dataList: cI,
    dialog: uI,
    drawer: dI,
    editable: fI,
    emptyState: gI,
    field: hI,
    fieldset: mI,
    fileUpload: pI,
    hoverCard: vI,
    list: bI,
    menu: yI,
    nativeSelect: xI,
    numberInput: SI,
    pinInput: EI,
    popover: OI,
    progress: wI,
    progressCircle: kI,
    radioCard: TI,
    radioGroup: AI,
    ratingGroup: zI,
    segmentGroup: _I,
    select: mc,
    combobox: sI,
    slider: NI,
    stat: II,
    steps: VI,
    switch: DI,
    table: MI,
    tabs: LI,
    tag: HI,
    toast: jI,
    tooltip: UI,
    status: PI,
    timeline: BI,
    colorPicker: lI,
    qrCode: RI,
  },
  FI = C5({
    "2xs": { value: { fontSize: "2xs", lineHeight: "0.75rem" } },
    xs: { value: { fontSize: "xs", lineHeight: "1rem" } },
    sm: { value: { fontSize: "sm", lineHeight: "1.25rem" } },
    md: { value: { fontSize: "md", lineHeight: "1.5rem" } },
    lg: { value: { fontSize: "lg", lineHeight: "1.75rem" } },
    xl: { value: { fontSize: "xl", lineHeight: "1.875rem" } },
    "2xl": { value: { fontSize: "2xl", lineHeight: "2rem" } },
    "3xl": { value: { fontSize: "3xl", lineHeight: "2.375rem" } },
    "4xl": {
      value: {
        fontSize: "4xl",
        lineHeight: "2.75rem",
        letterSpacing: "-0.025em",
      },
    },
    "5xl": {
      value: {
        fontSize: "5xl",
        lineHeight: "3.75rem",
        letterSpacing: "-0.025em",
      },
    },
    "6xl": {
      value: {
        fontSize: "6xl",
        lineHeight: "4.5rem",
        letterSpacing: "-0.025em",
      },
    },
    "7xl": {
      value: {
        fontSize: "7xl",
        lineHeight: "5.75rem",
        letterSpacing: "-0.025em",
      },
    },
    none: { value: {} },
    label: {
      value: { fontSize: "sm", lineHeight: "1.25rem", fontWeight: "medium" },
    },
  }),
  GI = rt.animations({
    spin: { value: "spin 1s linear infinite" },
    ping: { value: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" },
    pulse: { value: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" },
    bounce: { value: "bounce 1s infinite" },
  }),
  WI = rt.aspectRatios({
    square: { value: "1 / 1" },
    landscape: { value: "4 / 3" },
    portrait: { value: "3 / 4" },
    wide: { value: "16 / 9" },
    ultrawide: { value: "18 / 5" },
    golden: { value: "1.618 / 1" },
  }),
  qI = rt.blurs({
    none: { value: " " },
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "12px" },
    xl: { value: "16px" },
    "2xl": { value: "24px" },
    "3xl": { value: "40px" },
    "4xl": { value: "64px" },
  }),
  YI = rt.borders({
    xs: { value: "0.5px solid" },
    sm: { value: "1px solid" },
    md: { value: "2px solid" },
    lg: { value: "4px solid" },
    xl: { value: "8px solid" },
  }),
  XI = rt.colors({
    transparent: { value: "transparent" },
    current: { value: "currentColor" },
    black: { value: "#09090B" },
    white: { value: "#FFFFFF" },
    whiteAlpha: {
      50: { value: "rgba(255, 255, 255, 0.04)" },
      100: { value: "rgba(255, 255, 255, 0.06)" },
      200: { value: "rgba(255, 255, 255, 0.08)" },
      300: { value: "rgba(255, 255, 255, 0.16)" },
      400: { value: "rgba(255, 255, 255, 0.24)" },
      500: { value: "rgba(255, 255, 255, 0.36)" },
      600: { value: "rgba(255, 255, 255, 0.48)" },
      700: { value: "rgba(255, 255, 255, 0.64)" },
      800: { value: "rgba(255, 255, 255, 0.80)" },
      900: { value: "rgba(255, 255, 255, 0.92)" },
      950: { value: "rgba(255, 255, 255, 0.95)" },
    },
    blackAlpha: {
      50: { value: "rgba(0, 0, 0, 0.04)" },
      100: { value: "rgba(0, 0, 0, 0.06)" },
      200: { value: "rgba(0, 0, 0, 0.08)" },
      300: { value: "rgba(0, 0, 0, 0.16)" },
      400: { value: "rgba(0, 0, 0, 0.24)" },
      500: { value: "rgba(0, 0, 0, 0.36)" },
      600: { value: "rgba(0, 0, 0, 0.48)" },
      700: { value: "rgba(0, 0, 0, 0.64)" },
      800: { value: "rgba(0, 0, 0, 0.80)" },
      900: { value: "rgba(0, 0, 0, 0.92)" },
      950: { value: "rgba(0, 0, 0, 0.95)" },
    },
    gray: {
      50: { value: "#fafafa" },
      100: { value: "#f4f4f5" },
      200: { value: "#e4e4e7" },
      300: { value: "#d4d4d8" },
      400: { value: "#a1a1aa" },
      500: { value: "#71717a" },
      600: { value: "#52525b" },
      700: { value: "#3f3f46" },
      800: { value: "#27272a" },
      900: { value: "#18181b" },
      950: { value: "#111111" },
    },
    red: {
      50: { value: "#fef2f2" },
      100: { value: "#fee2e2" },
      200: { value: "#fecaca" },
      300: { value: "#fca5a5" },
      400: { value: "#f87171" },
      500: { value: "#ef4444" },
      600: { value: "#dc2626" },
      700: { value: "#991919" },
      800: { value: "#511111" },
      900: { value: "#300c0c" },
      950: { value: "#1f0808" },
    },
    orange: {
      50: { value: "#fff7ed" },
      100: { value: "#ffedd5" },
      200: { value: "#fed7aa" },
      300: { value: "#fdba74" },
      400: { value: "#fb923c" },
      500: { value: "#f97316" },
      600: { value: "#ea580c" },
      700: { value: "#92310a" },
      800: { value: "#6c2710" },
      900: { value: "#3b1106" },
      950: { value: "#220a04" },
    },
    yellow: {
      50: { value: "#fefce8" },
      100: { value: "#fef9c3" },
      200: { value: "#fef08a" },
      300: { value: "#fde047" },
      400: { value: "#facc15" },
      500: { value: "#eab308" },
      600: { value: "#ca8a04" },
      700: { value: "#845209" },
      800: { value: "#713f12" },
      900: { value: "#422006" },
      950: { value: "#281304" },
    },
    green: {
      50: { value: "#f0fdf4" },
      100: { value: "#dcfce7" },
      200: { value: "#bbf7d0" },
      300: { value: "#86efac" },
      400: { value: "#4ade80" },
      500: { value: "#22c55e" },
      600: { value: "#16a34a" },
      700: { value: "#116932" },
      800: { value: "#124a28" },
      900: { value: "#042713" },
      950: { value: "#03190c" },
    },
    teal: {
      50: { value: "#f0fdfa" },
      100: { value: "#ccfbf1" },
      200: { value: "#99f6e4" },
      300: { value: "#5eead4" },
      400: { value: "#2dd4bf" },
      500: { value: "#14b8a6" },
      600: { value: "#0d9488" },
      700: { value: "#0c5d56" },
      800: { value: "#114240" },
      900: { value: "#032726" },
      950: { value: "#021716" },
    },
    blue: {
      50: { value: "#eff6ff" },
      100: { value: "#dbeafe" },
      200: { value: "#bfdbfe" },
      300: { value: "#a3cfff" },
      400: { value: "#60a5fa" },
      500: { value: "#3b82f6" },
      600: { value: "#2563eb" },
      700: { value: "#173da6" },
      800: { value: "#1a3478" },
      900: { value: "#14204a" },
      950: { value: "#0c142e" },
    },
    cyan: {
      50: { value: "#ecfeff" },
      100: { value: "#cffafe" },
      200: { value: "#a5f3fc" },
      300: { value: "#67e8f9" },
      400: { value: "#22d3ee" },
      500: { value: "#06b6d4" },
      600: { value: "#0891b2" },
      700: { value: "#0c5c72" },
      800: { value: "#134152" },
      900: { value: "#072a38" },
      950: { value: "#051b24" },
    },
    purple: {
      50: { value: "#faf5ff" },
      100: { value: "#f3e8ff" },
      200: { value: "#e9d5ff" },
      300: { value: "#d8b4fe" },
      400: { value: "#c084fc" },
      500: { value: "#a855f7" },
      600: { value: "#9333ea" },
      700: { value: "#641ba3" },
      800: { value: "#4a1772" },
      900: { value: "#2f0553" },
      950: { value: "#1a032e" },
    },
    pink: {
      50: { value: "#fdf2f8" },
      100: { value: "#fce7f3" },
      200: { value: "#fbcfe8" },
      300: { value: "#f9a8d4" },
      400: { value: "#f472b6" },
      500: { value: "#ec4899" },
      600: { value: "#db2777" },
      700: { value: "#a41752" },
      800: { value: "#6d0e34" },
      900: { value: "#45061f" },
      950: { value: "#2c0514" },
    },
  }),
  KI = rt.cursor({
    button: { value: "pointer" },
    checkbox: { value: "default" },
    disabled: { value: "not-allowed" },
    menuitem: { value: "default" },
    option: { value: "default" },
    radio: { value: "default" },
    slider: { value: "default" },
    switch: { value: "pointer" },
  }),
  QI = rt.durations({
    fastest: { value: "50ms" },
    faster: { value: "100ms" },
    fast: { value: "150ms" },
    moderate: { value: "200ms" },
    slow: { value: "300ms" },
    slower: { value: "400ms" },
    slowest: { value: "500ms" },
  }),
  ZI = rt.easings({
    "ease-in": { value: "cubic-bezier(0.42, 0, 1, 1)" },
    "ease-out": { value: "cubic-bezier(0, 0, 0.58, 1)" },
    "ease-in-out": { value: "cubic-bezier(0.42, 0, 0.58, 1)" },
    "ease-in-smooth": { value: "cubic-bezier(0.32, 0.72, 0, 1)" },
  }),
  JI = rt.fontSizes({
    "2xs": { value: "0.625rem" },
    xs: { value: "0.75rem" },
    sm: { value: "0.875rem" },
    md: { value: "1rem" },
    lg: { value: "1.125rem" },
    xl: { value: "1.25rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "1.875rem" },
    "4xl": { value: "2.25rem" },
    "5xl": { value: "3rem" },
    "6xl": { value: "3.75rem" },
    "7xl": { value: "4.5rem" },
    "8xl": { value: "6rem" },
    "9xl": { value: "8rem" },
  }),
  eP = rt.fontWeights({
    thin: { value: "100" },
    extralight: { value: "200" },
    light: { value: "300" },
    normal: { value: "400" },
    medium: { value: "500" },
    semibold: { value: "600" },
    bold: { value: "700" },
    extrabold: { value: "800" },
    black: { value: "900" },
  }),
  r0 =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  tP = rt.fonts({
    heading: { value: `Inter, ${r0}` },
    body: { value: `Inter, ${r0}` },
    mono: {
      value:
        'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
  }),
  nP = x5({
    spin: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    pulse: { "50%": { opacity: "0.5" } },
    ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
      },
    },
    "bg-position": {
      from: { backgroundPosition: "var(--animate-from, 1rem) 0" },
      to: { backgroundPosition: "var(--animate-to, 0) 0" },
    },
    position: {
      from: {
        insetInlineStart: "var(--animate-from-x)",
        insetBlockStart: "var(--animate-from-y)",
      },
      to: {
        insetInlineStart: "var(--animate-to-x)",
        insetBlockStart: "var(--animate-to-y)",
      },
    },
    "circular-progress": {
      "0%": { strokeDasharray: "1, 400", strokeDashoffset: "0" },
      "50%": { strokeDasharray: "400, 400", strokeDashoffset: "-100%" },
      "100%": { strokeDasharray: "400, 400", strokeDashoffset: "-260%" },
    },
    "expand-height": { from: { height: "0" }, to: { height: "var(--height)" } },
    "collapse-height": {
      from: { height: "var(--height)" },
      to: { height: "0" },
    },
    "expand-width": { from: { width: "0" }, to: { width: "var(--width)" } },
    "collapse-width": { from: { height: "var(--width)" }, to: { height: "0" } },
    "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
    "fade-out": { from: { opacity: 1 }, to: { opacity: 0 } },
    "slide-from-left-full": {
      from: { translate: "-100% 0" },
      to: { translate: "0 0" },
    },
    "slide-from-right-full": {
      from: { translate: "100% 0" },
      to: { translate: "0 0" },
    },
    "slide-from-top-full": {
      from: { translate: "0 -100%" },
      to: { translate: "0 0" },
    },
    "slide-from-bottom-full": {
      from: { translate: "0 100%" },
      to: { translate: "0 0" },
    },
    "slide-to-left-full": {
      from: { translate: "0 0" },
      to: { translate: "-100% 0" },
    },
    "slide-to-right-full": {
      from: { translate: "0 0" },
      to: { translate: "100% 0" },
    },
    "slide-to-top-full": {
      from: { translate: "0 0" },
      to: { translate: "0 -100%" },
    },
    "slide-to-bottom-full": {
      from: { translate: "0 0" },
      to: { translate: "0 100%" },
    },
    "slide-from-top": {
      "0%": { translate: "0 -0.5rem" },
      to: { translate: "0" },
    },
    "slide-from-bottom": {
      "0%": { translate: "0 0.5rem" },
      to: { translate: "0" },
    },
    "slide-from-left": {
      "0%": { translate: "-0.5rem 0" },
      to: { translate: "0" },
    },
    "slide-from-right": {
      "0%": { translate: "0.5rem 0" },
      to: { translate: "0" },
    },
    "slide-to-top": {
      "0%": { translate: "0" },
      to: { translate: "0 -0.5rem" },
    },
    "slide-to-bottom": {
      "0%": { translate: "0" },
      to: { translate: "0 0.5rem" },
    },
    "slide-to-left": {
      "0%": { translate: "0" },
      to: { translate: "-0.5rem 0" },
    },
    "slide-to-right": {
      "0%": { translate: "0" },
      to: { translate: "0.5rem 0" },
    },
    "scale-in": { from: { scale: "0.95" }, to: { scale: "1" } },
    "scale-out": { from: { scale: "1" }, to: { scale: "0.95" } },
  }),
  aP = rt.letterSpacings({
    tighter: { value: "-0.05em" },
    tight: { value: "-0.025em" },
    wide: { value: "0.025em" },
    wider: { value: "0.05em" },
    widest: { value: "0.1em" },
  }),
  iP = rt.lineHeights({
    shorter: { value: 1.25 },
    short: { value: 1.375 },
    moderate: { value: 1.5 },
    tall: { value: 1.625 },
    taller: { value: 2 },
  }),
  rP = rt.radii({
    none: { value: "0" },
    "2xs": { value: "0.0625rem" },
    xs: { value: "0.125rem" },
    sm: { value: "0.25rem" },
    md: { value: "0.375rem" },
    lg: { value: "0.5rem" },
    xl: { value: "0.75rem" },
    "2xl": { value: "1rem" },
    "3xl": { value: "1.5rem" },
    "4xl": { value: "2rem" },
    full: { value: "9999px" },
  }),
  xC = rt.spacing({
    0.5: { value: "0.125rem" },
    1: { value: "0.25rem" },
    1.5: { value: "0.375rem" },
    2: { value: "0.5rem" },
    2.5: { value: "0.625rem" },
    3: { value: "0.75rem" },
    3.5: { value: "0.875rem" },
    4: { value: "1rem" },
    4.5: { value: "1.125rem" },
    5: { value: "1.25rem" },
    6: { value: "1.5rem" },
    7: { value: "1.75rem" },
    8: { value: "2rem" },
    9: { value: "2.25rem" },
    10: { value: "2.5rem" },
    11: { value: "2.75rem" },
    12: { value: "3rem" },
    14: { value: "3.5rem" },
    16: { value: "4rem" },
    20: { value: "5rem" },
    24: { value: "6rem" },
    28: { value: "7rem" },
    32: { value: "8rem" },
    36: { value: "9rem" },
    40: { value: "10rem" },
    44: { value: "11rem" },
    48: { value: "12rem" },
    52: { value: "13rem" },
    56: { value: "14rem" },
    60: { value: "15rem" },
    64: { value: "16rem" },
    72: { value: "18rem" },
    80: { value: "20rem" },
    96: { value: "24rem" },
  }),
  oP = rt.sizes({
    "3xs": { value: "14rem" },
    "2xs": { value: "16rem" },
    xs: { value: "20rem" },
    sm: { value: "24rem" },
    md: { value: "28rem" },
    lg: { value: "32rem" },
    xl: { value: "36rem" },
    "2xl": { value: "42rem" },
    "3xl": { value: "48rem" },
    "4xl": { value: "56rem" },
    "5xl": { value: "64rem" },
    "6xl": { value: "72rem" },
    "7xl": { value: "80rem" },
    "8xl": { value: "90rem" },
  }),
  lP = rt.sizes({
    max: { value: "max-content" },
    min: { value: "min-content" },
    fit: { value: "fit-content" },
    prose: { value: "60ch" },
    full: { value: "100%" },
    dvh: { value: "100dvh" },
    svh: { value: "100svh" },
    lvh: { value: "100lvh" },
    dvw: { value: "100dvw" },
    svw: { value: "100svw" },
    lvw: { value: "100lvw" },
    vw: { value: "100vw" },
    vh: { value: "100vh" },
  }),
  sP = rt.sizes({
    "1/2": { value: "50%" },
    "1/3": { value: "33.333333%" },
    "2/3": { value: "66.666667%" },
    "1/4": { value: "25%" },
    "3/4": { value: "75%" },
    "1/5": { value: "20%" },
    "2/5": { value: "40%" },
    "3/5": { value: "60%" },
    "4/5": { value: "80%" },
    "1/6": { value: "16.666667%" },
    "2/6": { value: "33.333333%" },
    "3/6": { value: "50%" },
    "4/6": { value: "66.666667%" },
    "5/6": { value: "83.333333%" },
    "1/12": { value: "8.333333%" },
    "2/12": { value: "16.666667%" },
    "3/12": { value: "25%" },
    "4/12": { value: "33.333333%" },
    "5/12": { value: "41.666667%" },
    "6/12": { value: "50%" },
    "7/12": { value: "58.333333%" },
    "8/12": { value: "66.666667%" },
    "9/12": { value: "75%" },
    "10/12": { value: "83.333333%" },
    "11/12": { value: "91.666667%" },
  }),
  cP = rt.sizes({ ...oP, ...xC, ...sP, ...lP }),
  uP = rt.zIndex({
    hide: { value: -1 },
    base: { value: 0 },
    docked: { value: 10 },
    dropdown: { value: 1e3 },
    sticky: { value: 1100 },
    banner: { value: 1200 },
    overlay: { value: 1300 },
    modal: { value: 1400 },
    popover: { value: 1500 },
    skipNav: { value: 1600 },
    toast: { value: 1700 },
    tooltip: { value: 1800 },
    max: { value: 2147483647 },
  }),
  dP = KS({
    preflight: !0,
    cssVarsPrefix: "chakra",
    cssVarsRoot: ":where(html, .chakra-theme)",
    globalCss: YN,
    theme: {
      breakpoints: qN,
      keyframes: nP,
      tokens: {
        aspectRatios: WI,
        animations: GI,
        blurs: qI,
        borders: YI,
        colors: XI,
        durations: QI,
        easings: ZI,
        fonts: tP,
        fontSizes: JI,
        fontWeights: eP,
        letterSpacings: aP,
        lineHeights: iP,
        radii: rP,
        spacing: xC,
        sizes: cP,
        zIndex: uP,
        cursor: KI,
      },
      semanticTokens: { colors: h3, shadows: p3, radii: m3 },
      recipes: g3,
      slotRecipes: $I,
      textStyles: FI,
      layerStyles: XN,
      animationStyles: KN,
    },
  }),
  fP = QS(N5, dP),
  gP = GN(fP);
function hP(e) {
  const { key: n, recipe: i } = e,
    r = Gc();
  return k.useMemo(() => {
    const s = i || (n != null ? r.getSlotRecipe(n) : {});
    return r.sva(structuredClone(s));
  }, [n, i, r]);
}
const mP = (e) => e.charAt(0).toUpperCase() + e.slice(1),
  pl = (e) => {
    const { key: n, recipe: i } = e,
      r = mP(n || i.className || "Component"),
      [s, c] = Ko({
        name: `${r}StylesContext`,
        errorMessage: `use${r}Styles returned is 'undefined'. Seems you forgot to wrap the components in "<${r}.Root />" `,
      }),
      [d, g] = Ko({
        name: `${r}ClassNameContext`,
        errorMessage: `use${r}ClassNames returned is 'undefined'. Seems you forgot to wrap the components in "<${r}.Root />" `,
        strict: !1,
      }),
      [h, m] = Ko({
        strict: !1,
        name: `${r}PropsContext`,
        providerName: `${r}PropsContext`,
        defaultValue: {},
      });
    function p(C) {
      const { unstyled: E, ...R } = C,
        O = hP({ key: n, recipe: R.recipe || i }),
        [A, z] = k.useMemo(() => O.splitVariantProps(R), [R, O]);
      return {
        styles: k.useMemo(() => (E ? Rw : O(A)), [E, A, O]),
        classNames: O.classNameMap,
        props: z,
      };
    }
    function y(C, E = {}) {
      const { defaultProps: R } = E,
        O = (A) => {
          const z = m(),
            B = k.useMemo(() => el(R, z, A), [z, A]),
            { styles: _, classNames: Y, props: $ } = p(B);
          return V.jsx(s, {
            value: _,
            children: V.jsx(d, { value: Y, children: V.jsx(C, { ...$ }) }),
          });
        };
      return (O.displayName = C.displayName || C.name), O;
    }
    return {
      StylesProvider: s,
      ClassNamesProvider: d,
      PropsProvider: h,
      usePropsContext: m,
      useRecipeResult: p,
      withProvider: (C, E, R) => {
        const { defaultProps: O, ...A } = R ?? {},
          z = mt(C, {}, A),
          B = k.forwardRef((_, Y) => {
            var he;
            const $ = m(),
              j = k.useMemo(() => el(O ?? {}, $, _), [$, _]),
              { styles: U, props: K, classNames: re } = p(j),
              ne = re[E],
              pe = V.jsx(s, {
                value: U,
                children: V.jsx(d, {
                  value: re,
                  children: V.jsx(z, {
                    ref: Y,
                    ...K,
                    css: [U[E], j.css],
                    className: Zt(j.className, ne),
                  }),
                }),
              });
            return (
              ((he = R == null ? void 0 : R.wrapElement) == null
                ? void 0
                : he.call(R, pe, j)) ?? pe
            );
          });
        return (B.displayName = C.displayName || C.name), B;
      },
      withContext: (C, E, R) => {
        const O = mt(C, {}, R),
          A = k.forwardRef((z, B) => {
            const _ = c(),
              Y = g(),
              $ = Y == null ? void 0 : Y[E];
            return V.jsx(O, {
              ...z,
              css: [E ? _[E] : void 0, z.css],
              ref: B,
              className: Zt(z.className, $),
            });
          });
        return (A.displayName = C.displayName || C.name), A;
      },
      withRootProvider: y,
      useStyles: c,
      useClassNames: g,
    };
  },
  pP = (e) =>
    V.jsx(mt.svg, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...e,
      children: V.jsx("path", { d: "m6 9 6 6 6-6" }),
    }),
  { withProvider: SC, withContext: vl } = pl({ key: "accordion" });
SC(q1, "root", { forwardAsChild: !0 });
const vP = SC(W1, "root", { forwardAsChild: !0 }),
  bP = vl(B1, "item", { forwardAsChild: !0 }),
  yP = vl(U1, "itemContent", { forwardAsChild: !0 }),
  xP = vl("div", "itemBody"),
  SP = vl(F1, "itemTrigger", { forwardAsChild: !0 });
vl($1, "itemIndicator", {
  forwardAsChild: !0,
  defaultProps: { children: V.jsx(pP, {}) },
});
const CC = (e) => (e ? "" : void 0),
  { withContext: CP } = Fa({ key: "badge" }),
  EP = CP("span"),
  ol = mt("div");
ol.displayName = "Box";
const Zs = mt("span"),
  { withContext: OP } = Fa({ key: "spinner" }),
  EC = OP("span"),
  OC = mt("div", {
    base: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    variants: {
      axis: {
        horizontal: {
          insetStart: "50%",
          translate: "-50%",
          _rtl: { translate: "50%" },
        },
        vertical: { top: "50%", translate: "0 -50%" },
        both: {
          insetStart: "50%",
          top: "50%",
          translate: "-50% -50%",
          _rtl: { translate: "50% -50%" },
        },
      },
    },
    defaultVariants: { axis: "both" },
  });
OC.displayName = "AbsoluteCenter";
const wP = k.forwardRef(function (n, i) {
    const {
      spinner: r = V.jsx(EC, {
        size: "inherit",
        borderWidth: "0.125em",
        color: "inherit",
      }),
      spinnerPlacement: s = "start",
      children: c,
      text: d,
      visible: g = !0,
      ...h
    } = n;
    return g
      ? d
        ? V.jsxs(Zs, {
            ref: i,
            display: "contents",
            ...h,
            children: [s === "start" && r, d, s === "end" && r],
          })
        : r
          ? V.jsxs(Zs, {
              ref: i,
              display: "contents",
              ...h,
              children: [
                V.jsx(OC, { display: "inline-flex", children: r }),
                V.jsx(Zs, {
                  visibility: "hidden",
                  display: "contents",
                  children: c,
                }),
              ],
            })
          : V.jsx(Zs, { ref: i, display: "contents", ...h, children: c })
      : c;
  }),
  { useRecipeResult: kP, usePropsContext: RP } = Fa({ key: "button" }),
  TP = k.forwardRef(function (n, i) {
    const r = RP(),
      s = k.useMemo(() => el(r, n), [r, n]),
      c = kP(s),
      {
        loading: d,
        loadingText: g,
        children: h,
        spinner: m,
        spinnerPlacement: p,
        ...y
      } = c.props;
    return V.jsx(mt.button, {
      type: "button",
      ref: i,
      ...y,
      "data-loading": CC(d),
      disabled: d || y.disabled,
      className: Zt(c.className, s.className),
      css: [c.styles, s.css],
      children:
        !s.asChild && d
          ? V.jsx(wP, { spinner: m, text: g, spinnerPlacement: p, children: h })
          : h,
    });
  }),
  { withProvider: AP, withContext: bl } = pl({ key: "card" }),
  zP = AP("div", "root"),
  _P = bl("div", "body"),
  NP = bl("div", "header");
bl("div", "footer");
bl("h3", "title");
bl("p", "description");
const vh = mt("div", {
  base: { display: "flex", alignItems: "center", justifyContent: "center" },
  variants: { inline: { true: { display: "inline-flex" } } },
});
vh.displayName = "Center";
const IP = k.forwardRef(function (n, i) {
    const r = $x({ key: "checkmark", recipe: n.recipe }),
      [s, c] = r.splitVariantProps(n),
      {
        checked: d,
        indeterminate: g,
        disabled: h,
        unstyled: m,
        children: p,
        ...y
      } = c,
      b = m ? Tx : r(s);
    return V.jsx(mt.svg, {
      ref: i,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3px",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "data-state": g ? "indeterminate" : d ? "checked" : "unchecked",
      "data-disabled": CC(h),
      css: [b, n.css],
      ...y,
      children: g
        ? V.jsx("path", { d: "M5 12h14" })
        : d
          ? V.jsx("polyline", { points: "20 6 9 17 4 12" })
          : null,
    });
  }),
  {
    withProvider: wC,
    withContext: kC,
    useStyles: PP,
  } = pl({ key: "checkbox" });
wC(cS, "root", { forwardAsChild: !0 });
const VP = wC(sS, "root", { forwardAsChild: !0 }),
  DP = kC(lS, "label", { forwardAsChild: !0 }),
  MP = k.forwardRef(function (n, i) {
    const { checked: r, indeterminate: s, ...c } = n,
      d = lu(),
      g = PP();
    return r && d.checked
      ? V.jsx(mt.svg, {
          ref: i,
          asChild: !0,
          ...c,
          css: [g.indicator, n.css],
          children: r,
        })
      : s && d.indeterminate
        ? V.jsx(mt.svg, {
            ref: i,
            asChild: !0,
            ...c,
            css: [g.indicator, n.css],
            children: s,
          })
        : V.jsx(IP, {
            ref: i,
            checked: d.checked,
            indeterminate: d.indeterminate,
            disabled: d.disabled,
            unstyled: !0,
            ...c,
            css: [g.indicator, n.css],
          });
  }),
  LP = kC(K1, "control", {
    forwardAsChild: !0,
    defaultProps: { children: V.jsx(MP, {}) },
  });
mt(
  iS,
  { base: { display: "flex", flexDirection: "column", gap: "1.5" } },
  { forwardAsChild: !0 },
);
const HP = oS;
function BP(e) {
  const { gap: n, direction: i } = e,
    r = {
      column: {
        marginY: n,
        marginX: 0,
        borderInlineStartWidth: 0,
        borderTopWidth: "1px",
      },
      "column-reverse": {
        marginY: n,
        marginX: 0,
        borderInlineStartWidth: 0,
        borderTopWidth: "1px",
      },
      row: {
        marginX: n,
        marginY: 0,
        borderInlineStartWidth: "1px",
        borderTopWidth: 0,
      },
      "row-reverse": {
        marginX: n,
        marginY: 0,
        borderInlineStartWidth: "1px",
        borderTopWidth: 0,
      },
    };
  return { "&": JS(i, (s) => r[s]) };
}
function jP(e) {
  return k.Children.toArray(e).filter((n) => k.isValidElement(n));
}
const pc = k.forwardRef(function (n, i) {
    const {
        direction: r = "column",
        align: s,
        justify: c,
        gap: d = "0.5rem",
        wrap: g,
        children: h,
        separator: m,
        className: p,
        ...y
      } = n,
      b = k.useMemo(() => BP({ gap: d, direction: r }), [d, r]),
      x = k.useMemo(
        () =>
          m
            ? jP(h).map((C, E, R) => {
                const O = typeof C.key < "u" ? C.key : E,
                  A = k.cloneElement(m, { css: [b, m.props.css] });
                return V.jsxs(
                  k.Fragment,
                  { children: [C, E === R.length - 1 ? null : A] },
                  O,
                );
              })
            : h,
        [h, m, b],
      );
    return V.jsx(mt.div, {
      ref: i,
      display: "flex",
      alignItems: s,
      justifyContent: c,
      flexDirection: r,
      flexWrap: g,
      gap: m ? void 0 : d,
      className: Zt("chakra-stack", p),
      ...y,
      children: x,
    });
  }),
  { withContext: UP } = Fa({ key: "container" }),
  $P = UP("div"),
  { useRecipeResult: FP } = Fa({ key: "icon" }),
  GP = k.forwardRef(function (n, i) {
    const { styles: r, className: s, props: c } = FP({ asChild: !n.as, ...n });
    return V.jsx(mt.svg, {
      ref: i,
      focusable: !1,
      "aria-hidden": "true",
      ...c,
      css: [r, n.css],
      className: Zt(s, n.className),
    });
  }),
  bh = k.forwardRef(function (n, i) {
    const {
      direction: r,
      align: s,
      justify: c,
      wrap: d,
      basis: g,
      grow: h,
      shrink: m,
      inline: p,
      ...y
    } = n;
    return V.jsx(mt.div, {
      ref: i,
      ...y,
      css: {
        display: p ? "inline-flex" : "flex",
        flexDirection: r,
        alignItems: s,
        justifyContent: c,
        flexWrap: d,
        flexBasis: g,
        flexGrow: h,
        flexShrink: m,
        ...n.css,
      },
    });
  }),
  { withContext: WP } = Fa({ key: "link" }),
  vc = WP("a"),
  o0 = k.forwardRef(function (n, i) {
    return V.jsx(pc, { align: "center", ...n, direction: "row", ref: i });
  }),
  {
    StylesProvider: qP,
    ClassNamesProvider: YP,
    useRecipeResult: XP,
    withContext: ga,
  } = pl({ key: "table" }),
  KP = k.forwardRef(function ({ native: n, ...i }, r) {
    const { styles: s, props: c, classNames: d } = XP(i),
      g = k.useMemo(
        () =>
          n
            ? {
                ...s.root,
                "& thead": s.header,
                "& tbody": s.body,
                "& tfoot": s.footer,
                "& thead th": s.columnHeader,
                "& tr": s.row,
                "& td": s.cell,
                "& caption": s.caption,
              }
            : s.root,
        [s, n],
      );
    return V.jsx(YP, {
      value: d,
      children: V.jsx(qP, {
        value: s,
        children: V.jsx(mt.table, {
          ref: r,
          ...c,
          css: [g, i.css],
          className: Zt(d == null ? void 0 : d.root, i.className),
        }),
      }),
    });
  }),
  l0 = ga("tr", "row");
mt("div", {
  base: {
    display: "block",
    whiteSpace: "nowrap",
    WebkitOverflowScrolling: "touch",
    overflow: "auto",
    maxWidth: "100%",
  },
});
const QP = ga("thead", "header");
ga("tfoot", "footer");
const Js = ga("th", "columnHeader"),
  ec = ga("td", "cell");
ga("caption", "caption", { defaultProps: { captionSide: "bottom" } });
const ZP = ga("tbody", "body");
ga("colgroup");
ga("col");
const { withRootProvider: RC, withContext: yl } = pl({ key: "tooltip" });
RC(v5);
const JP = RC(p5, { defaultProps: { lazyMount: !0, unmountOnExit: !0 } }),
  e4 = yl(WS, "trigger", { forwardAsChild: !0 }),
  t4 = yl(US, "positioner", { forwardAsChild: !0 }),
  n4 = yl(jS, "content", { forwardAsChild: !0 }),
  TC = yl(BS, "arrowTip", { forwardAsChild: !0 }),
  a4 = yl(HS, "arrow", {
    forwardAsChild: !0,
    defaultProps: { children: V.jsx(TC, {}) },
  }),
  { withContext: i4 } = Fa({ key: "heading" }),
  AC = i4("h2"),
  { withContext: r4 } = Fa({ key: "text" }),
  hi = r4("p");
var zC = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  s0 = ja.createContext && ja.createContext(zC),
  o4 = ["attr", "size", "title"];
function l4(e, n) {
  if (e == null) return {};
  var i = s4(e, n),
    r,
    s;
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(e);
    for (s = 0; s < c.length; s++)
      (r = c[s]),
        !(n.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (i[r] = e[r]);
  }
  return i;
}
function s4(e, n) {
  if (e == null) return {};
  var i = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (n.indexOf(r) >= 0) continue;
      i[r] = e[r];
    }
  return i;
}
function Hc() {
  return (
    (Hc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var i = arguments[n];
            for (var r in i)
              Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
          }
          return e;
        }),
    Hc.apply(this, arguments)
  );
}
function c0(e, n) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    n &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(e, s).enumerable;
      })),
      i.push.apply(i, r);
  }
  return i;
}
function Bc(e) {
  for (var n = 1; n < arguments.length; n++) {
    var i = arguments[n] != null ? arguments[n] : {};
    n % 2
      ? c0(Object(i), !0).forEach(function (r) {
          c4(e, r, i[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
        : c0(Object(i)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(i, r));
          });
  }
  return e;
}
function c4(e, n, i) {
  return (
    (n = u4(n)),
    n in e
      ? Object.defineProperty(e, n, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[n] = i),
    e
  );
}
function u4(e) {
  var n = d4(e, "string");
  return typeof n == "symbol" ? n : n + "";
}
function d4(e, n) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var r = i.call(e, n);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (n === "string" ? String : Number)(e);
}
function _C(e) {
  return (
    e &&
    e.map((n, i) =>
      ja.createElement(n.tag, Bc({ key: i }, n.attr), _C(n.child)),
    )
  );
}
function yh(e) {
  return (n) =>
    ja.createElement(f4, Hc({ attr: Bc({}, e.attr) }, n), _C(e.child));
}
function f4(e) {
  var n = (i) => {
    var { attr: r, size: s, title: c } = e,
      d = l4(e, o4),
      g = s || i.size || "1em",
      h;
    return (
      i.className && (h = i.className),
      e.className && (h = (h ? h + " " : "") + e.className),
      ja.createElement(
        "svg",
        Hc(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          i.attr,
          r,
          d,
          {
            className: h,
            style: Bc(Bc({ color: e.color || i.color }, i.style), e.style),
            height: g,
            width: g,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        c && ja.createElement("title", null, c),
        e.children,
      )
    );
  };
  return s0 !== void 0
    ? ja.createElement(s0.Consumer, null, (i) => n(i))
    : n(zC);
}
function g4(e) {
  return yh({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M413.967 276.8c1.06-6.235 1.06-13.518 1.06-20.8s-1.06-13.518-1.06-20.8l44.667-34.318c4.26-3.118 5.319-8.317 2.13-13.518L418.215 115.6c-2.129-4.164-8.507-6.235-12.767-4.164l-53.186 20.801c-10.638-8.318-23.394-15.601-36.16-20.801l-7.448-55.117c-1.06-4.154-5.319-8.318-10.638-8.318h-85.098c-5.318 0-9.577 4.164-10.637 8.318l-8.508 55.117c-12.767 5.2-24.464 12.482-36.171 20.801l-53.186-20.801c-5.319-2.071-10.638 0-12.767 4.164L49.1 187.365c-2.119 4.153-1.061 10.399 2.129 13.518L96.97 235.2c0 7.282-1.06 13.518-1.06 20.8s1.06 13.518 1.06 20.8l-44.668 34.318c-4.26 3.118-5.318 8.317-2.13 13.518L92.721 396.4c2.13 4.164 8.508 6.235 12.767 4.164l53.187-20.801c10.637 8.318 23.394 15.601 36.16 20.801l8.508 55.117c1.069 5.2 5.318 8.318 10.637 8.318h85.098c5.319 0 9.578-4.164 10.638-8.318l8.518-55.117c12.757-5.2 24.464-12.482 36.16-20.801l53.187 20.801c5.318 2.071 10.637 0 12.767-4.164l42.549-71.765c2.129-4.153 1.06-10.399-2.13-13.518l-46.8-34.317zm-158.499 52c-41.489 0-74.46-32.235-74.46-72.8s32.971-72.8 74.46-72.8 74.461 32.235 74.461 72.8-32.972 72.8-74.461 72.8z",
        },
        child: [],
      },
    ],
  })(e);
}
function h4(e) {
  return yh({
    attr: {
      version: "1",
      viewBox: "0 0 48 48",
      enableBackground: "new 0 0 48 48",
    },
    child: [
      {
        tag: "polygon",
        attr: {
          fill: "#43A047",
          points: "40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9",
        },
        child: [],
      },
    ],
  })(e);
}
const NC = k.createContext(void 0),
  m4 = () => {
    const e = k.useContext(NC);
    if (!e) throw new Error("useFeed must be inside FeedProvider");
    return e;
  },
  u0 = k.forwardRef(function (n, i) {
    const {
      showArrow: r,
      children: s,
      disabled: c,
      portalled: d = !0,
      content: g,
      contentProps: h,
      portalRef: m,
      ...p
    } = n;
    return c
      ? s
      : V.jsxs(JP, {
          ...p,
          children: [
            V.jsx(e4, { asChild: !0, children: s }),
            V.jsx(Z_, {
              disabled: !d,
              container: m,
              children: V.jsx(t4, {
                children: V.jsxs(n4, {
                  ref: i,
                  ...h,
                  children: [r && V.jsx(a4, { children: V.jsx(TC, {}) }), g],
                }),
              }),
            }),
          ],
        });
  }),
  p4 = () => {
    const {
        tagRecord: e,
        feed: n,
        siteRecord: i,
        toggleSite: r,
        loading: s,
      } = m4(),
      [c, d] = k.useState(new Set()),
      g = "readEntries";
    k.useEffect(() => {
      const p = localStorage.getItem(g);
      if (p)
        try {
          d(new Set(JSON.parse(p)));
        } catch (y) {
          console.error("Failed to parse readEntries", y);
        }
    }, []);
    const h = (p) => {
      const y = new Set(c);
      y.add(p), d(y), localStorage.setItem(g, JSON.stringify([...y]));
    };
    if (s)
      return V.jsx(ol, {
        pos: "absolute",
        inset: "0",
        children: V.jsx(vh, { h: "full", children: V.jsx(EC, { size: "xl" }) }),
      });
    if (!n) return V.jsx("div", { children: "No data." });
    const m = n.entries.filter((p) => i[p.config_source] && !c.has(p.link));
    return V.jsxs(V.Fragment, {
      children: [
        V.jsx(pc, {
          direction: "row",
          wrap: "wrap",
          children: V.jsx(vP, {
            collapsible: !0,
            variant: "plain",
            children: V.jsxs(bP, {
              value: "value",
              children: [
                V.jsxs(SP, {
                  children: [
                    V.jsx(GP, { fontSize: "lg", children: V.jsx(g4, {}) }),
                    V.jsx(hi, { children: "Settings" }),
                  ],
                }),
                V.jsx(yP, {
                  children: V.jsx(xP, {
                    children: V.jsxs(KP, {
                      size: "md",
                      children: [
                        V.jsx(QP, {
                          children: V.jsxs(l0, {
                            children: [
                              V.jsx(Js, { children: "名前" }),
                              V.jsx(Js, { children: "概要" }),
                              V.jsx(Js, { children: "タグ" }),
                              V.jsx(Js, { children: "数" }),
                            ],
                          }),
                        }),
                        V.jsx(ZP, {
                          children: Object.entries(i).map(([p, y]) =>
                            V.jsxs(
                              l0,
                              {
                                children: [
                                  V.jsx(ec, {
                                    children: V.jsxs(
                                      VP,
                                      {
                                        checked: y,
                                        onCheckedChange: () => r(p),
                                        children: [
                                          V.jsx(HP, {}),
                                          V.jsx(LP, {}),
                                          V.jsx(u0, {
                                            content:
                                              n.source_map[p].config_source
                                                .desc,
                                            showArrow: !0,
                                            children: V.jsx(DP, {
                                              children: V.jsx(
                                                vc,
                                                {
                                                  href: n.source_map[p]
                                                    .config_source.rss_url,
                                                  target: "_blank",
                                                  rel: "noreferrer",
                                                  _hover: {
                                                    textDecoration: "none",
                                                  },
                                                  children: p,
                                                },
                                                p,
                                              ),
                                            }),
                                          }),
                                        ],
                                      },
                                      p,
                                    ),
                                  }),
                                  V.jsx(ec, {
                                    children: V.jsx(hi, {
                                      children:
                                        n.source_map[p].config_source.desc,
                                    }),
                                  }),
                                  V.jsx(ec, {
                                    children: V.jsx(pc, {
                                      direction: "row",
                                      children: n.source_map[
                                        p
                                      ].config_source.tags.map((b) => {
                                        var x;
                                        return V.jsx(
                                          u0,
                                          {
                                            content:
                                              (x = e[b]) == null
                                                ? void 0
                                                : x.desc,
                                            showArrow: !0,
                                            children: V.jsx(EP, {
                                              children: b,
                                            }),
                                          },
                                          b,
                                        );
                                      }),
                                    }),
                                  }),
                                  V.jsx(ec, {
                                    children: V.jsx(hi, {
                                      children: n.source_map[p].entry_count,
                                    }),
                                  }),
                                ],
                              },
                              p,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
        V.jsx(pc, {
          gap: "8",
          direction: "row",
          wrap: "wrap",
          children: m.map((p, y) =>
            V.jsxs(zP, {
              w: "600px",
              bgColor: "gray.50",
              children: [
                V.jsx(NP, {
                  children: V.jsx(
                    vc,
                    {
                      href: p.link,
                      target: "_blank",
                      rel: "noreferrer",
                      _hover: { textDecoration: "none" },
                      children: V.jsxs(ol, {
                        children: [
                          V.jsx(AC, { children: p.title }),
                          V.jsxs(hi, {
                            textStyle: "xs",
                            children: [
                              new Date(p.published).toLocaleString(),
                              " -",
                              " ",
                              p.feed_source,
                            ],
                          }),
                        ],
                      }),
                    },
                    y,
                  ),
                }),
                V.jsxs(_P, {
                  children: [
                    V.jsx(
                      vc,
                      {
                        href: p.link,
                        target: "_blank",
                        rel: "noreferrer",
                        _hover: { textDecoration: "none" },
                        children: V.jsx(hi, {
                          dangerouslySetInnerHTML: { __html: p.summary },
                          className: "feedcontent",
                        }),
                      },
                      y,
                    ),
                    V.jsx(bh, {
                      justify: "flex-end",
                      ml: "auto",
                      children: V.jsx(TP, {
                        variant: "outline",
                        size: "lg",
                        onClick: () => h(p.link),
                        children: V.jsx(h4, {}),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ),
        }),
        V.jsxs(hi, {
          textStyle: "xs",
          children: [
            "aggregated at ",
            new Date(n.generated_at).toLocaleString(),
          ],
        }),
      ],
    });
  };
function v4() {
  return V.jsx(V.Fragment, {
    children: V.jsx(bh, { children: V.jsx(ol, { children: V.jsx(p4, {}) }) }),
  });
}
function b4() {
  return V.jsx(hi, { children: "Not Found" });
}
var $o = {},
  d0;
function y4() {
  if (d0) return $o;
  (d0 = 1),
    Object.defineProperty($o, "__esModule", { value: !0 }),
    ($o.parse = d),
    ($o.serialize = m);
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    n = /^[\u0021-\u003A\u003C-\u007E]*$/,
    i =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    s = Object.prototype.toString,
    c = (() => {
      const b = function () {};
      return (b.prototype = Object.create(null)), b;
    })();
  function d(b, x) {
    const C = new c(),
      E = b.length;
    if (E < 2) return C;
    const R = (x == null ? void 0 : x.decode) || p;
    let O = 0;
    do {
      const A = b.indexOf("=", O);
      if (A === -1) break;
      const z = b.indexOf(";", O),
        B = z === -1 ? E : z;
      if (A > B) {
        O = b.lastIndexOf(";", A - 1) + 1;
        continue;
      }
      const _ = g(b, O, A),
        Y = h(b, A, _),
        $ = b.slice(_, Y);
      if (C[$] === void 0) {
        let j = g(b, A + 1, B),
          U = h(b, B, j);
        const K = R(b.slice(j, U));
        C[$] = K;
      }
      O = B + 1;
    } while (O < E);
    return C;
  }
  function g(b, x, C) {
    do {
      const E = b.charCodeAt(x);
      if (E !== 32 && E !== 9) return x;
    } while (++x < C);
    return C;
  }
  function h(b, x, C) {
    for (; x > C; ) {
      const E = b.charCodeAt(--x);
      if (E !== 32 && E !== 9) return x + 1;
    }
    return C;
  }
  function m(b, x, C) {
    const E = (C == null ? void 0 : C.encode) || encodeURIComponent;
    if (!e.test(b)) throw new TypeError(`argument name is invalid: ${b}`);
    const R = E(x);
    if (!n.test(R)) throw new TypeError(`argument val is invalid: ${x}`);
    let O = b + "=" + R;
    if (!C) return O;
    if (C.maxAge !== void 0) {
      if (!Number.isInteger(C.maxAge))
        throw new TypeError(`option maxAge is invalid: ${C.maxAge}`);
      O += "; Max-Age=" + C.maxAge;
    }
    if (C.domain) {
      if (!i.test(C.domain))
        throw new TypeError(`option domain is invalid: ${C.domain}`);
      O += "; Domain=" + C.domain;
    }
    if (C.path) {
      if (!r.test(C.path))
        throw new TypeError(`option path is invalid: ${C.path}`);
      O += "; Path=" + C.path;
    }
    if (C.expires) {
      if (!y(C.expires) || !Number.isFinite(C.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${C.expires}`);
      O += "; Expires=" + C.expires.toUTCString();
    }
    if (
      (C.httpOnly && (O += "; HttpOnly"),
      C.secure && (O += "; Secure"),
      C.partitioned && (O += "; Partitioned"),
      C.priority)
    )
      switch (
        typeof C.priority == "string" ? C.priority.toLowerCase() : void 0
      ) {
        case "low":
          O += "; Priority=Low";
          break;
        case "medium":
          O += "; Priority=Medium";
          break;
        case "high":
          O += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${C.priority}`);
      }
    if (C.sameSite)
      switch (
        typeof C.sameSite == "string" ? C.sameSite.toLowerCase() : C.sameSite
      ) {
        case !0:
        case "strict":
          O += "; SameSite=Strict";
          break;
        case "lax":
          O += "; SameSite=Lax";
          break;
        case "none":
          O += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${C.sameSite}`);
      }
    return O;
  }
  function p(b) {
    if (b.indexOf("%") === -1) return b;
    try {
      return decodeURIComponent(b);
    } catch {
      return b;
    }
  }
  function y(b) {
    return s.call(b) === "[object Date]";
  }
  return $o;
}
y4();
var f0 = "popstate";
function x4(e = {}) {
  function n(s, c) {
    let {
      pathname: d = "/",
      search: g = "",
      hash: h = "",
    } = Si(s.location.hash.substring(1));
    return (
      !d.startsWith("/") && !d.startsWith(".") && (d = "/" + d),
      Og(
        "",
        { pathname: d, search: g, hash: h },
        (c.state && c.state.usr) || null,
        (c.state && c.state.key) || "default",
      )
    );
  }
  function i(s, c) {
    let d = s.document.querySelector("base"),
      g = "";
    if (d && d.getAttribute("href")) {
      let h = s.location.href,
        m = h.indexOf("#");
      g = m === -1 ? h : h.slice(0, m);
    }
    return g + "#" + (typeof c == "string" ? c : ll(c));
  }
  function r(s, c) {
    wn(
      s.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(c)})`,
    );
  }
  return C4(n, i, r, e);
}
function Ye(e, n) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(n);
}
function wn(e, n) {
  if (!e) {
    typeof console < "u" && console.warn(n);
    try {
      throw new Error(n);
    } catch {}
  }
}
function S4() {
  return Math.random().toString(36).substring(2, 10);
}
function g0(e, n) {
  return { usr: e.state, key: e.key, idx: n };
}
function Og(e, n, i = null, r) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof n == "string" ? Si(n) : n),
    state: i,
    key: (n && n.key) || r || S4(),
  };
}
function ll({ pathname: e = "/", search: n = "", hash: i = "" }) {
  return (
    n && n !== "?" && (e += n.charAt(0) === "?" ? n : "?" + n),
    i && i !== "#" && (e += i.charAt(0) === "#" ? i : "#" + i),
    e
  );
}
function Si(e) {
  let n = {};
  if (e) {
    let i = e.indexOf("#");
    i >= 0 && ((n.hash = e.substring(i)), (e = e.substring(0, i)));
    let r = e.indexOf("?");
    r >= 0 && ((n.search = e.substring(r)), (e = e.substring(0, r))),
      e && (n.pathname = e);
  }
  return n;
}
function C4(e, n, i, r = {}) {
  let { window: s = document.defaultView, v5Compat: c = !1 } = r,
    d = s.history,
    g = "POP",
    h = null,
    m = p();
  m == null && ((m = 0), d.replaceState({ ...d.state, idx: m }, ""));
  function p() {
    return (d.state || { idx: null }).idx;
  }
  function y() {
    g = "POP";
    let R = p(),
      O = R == null ? null : R - m;
    (m = R), h && h({ action: g, location: E.location, delta: O });
  }
  function b(R, O) {
    g = "PUSH";
    let A = Og(E.location, R, O);
    i && i(A, R), (m = p() + 1);
    let z = g0(A, m),
      B = E.createHref(A);
    try {
      d.pushState(z, "", B);
    } catch (_) {
      if (_ instanceof DOMException && _.name === "DataCloneError") throw _;
      s.location.assign(B);
    }
    c && h && h({ action: g, location: E.location, delta: 1 });
  }
  function x(R, O) {
    g = "REPLACE";
    let A = Og(E.location, R, O);
    i && i(A, R), (m = p());
    let z = g0(A, m),
      B = E.createHref(A);
    d.replaceState(z, "", B),
      c && h && h({ action: g, location: E.location, delta: 0 });
  }
  function C(R) {
    return E4(R);
  }
  let E = {
    get action() {
      return g;
    },
    get location() {
      return e(s, d);
    },
    listen(R) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(f0, y),
        (h = R),
        () => {
          s.removeEventListener(f0, y), (h = null);
        }
      );
    },
    createHref(R) {
      return n(s, R);
    },
    createURL: C,
    encodeLocation(R) {
      let O = C(R);
      return { pathname: O.pathname, search: O.search, hash: O.hash };
    },
    push: b,
    replace: x,
    go(R) {
      return d.go(R);
    },
  };
  return E;
}
function E4(e, n = !1) {
  let i = "http://localhost";
  typeof window < "u" &&
    (i =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Ye(i, "No window.location.(origin|href) available to create URL");
  let r = typeof e == "string" ? e : ll(e);
  return (
    (r = r.replace(/ $/, "%20")),
    !n && r.startsWith("//") && (r = i + r),
    new URL(r, i)
  );
}
function IC(e, n, i = "/") {
  return O4(e, n, i, !1);
}
function O4(e, n, i, r) {
  let s = typeof n == "string" ? Si(n) : n,
    c = fa(s.pathname || "/", i);
  if (c == null) return null;
  let d = PC(e);
  w4(d);
  let g = null;
  for (let h = 0; g == null && h < d.length; ++h) {
    let m = D4(c);
    g = P4(d[h], m, r);
  }
  return g;
}
function PC(e, n = [], i = [], r = "") {
  let s = (c, d, g) => {
    let h = {
      relativePath: g === void 0 ? c.path || "" : g,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c,
    };
    h.relativePath.startsWith("/") &&
      (Ye(
        h.relativePath.startsWith(r),
        `Absolute route path "${h.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (h.relativePath = h.relativePath.slice(r.length)));
    let m = la([r, h.relativePath]),
      p = i.concat(h);
    c.children &&
      c.children.length > 0 &&
      (Ye(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`,
      ),
      PC(c.children, n, p, m)),
      !(c.path == null && !c.index) &&
        n.push({ path: m, score: N4(m, c.index), routesMeta: p });
  };
  return (
    e.forEach((c, d) => {
      var g;
      if (c.path === "" || !((g = c.path) != null && g.includes("?"))) s(c, d);
      else for (let h of VC(c.path)) s(c, d, h);
    }),
    n
  );
}
function VC(e) {
  let n = e.split("/");
  if (n.length === 0) return [];
  let [i, ...r] = n,
    s = i.endsWith("?"),
    c = i.replace(/\?$/, "");
  if (r.length === 0) return s ? [c, ""] : [c];
  let d = VC(r.join("/")),
    g = [];
  return (
    g.push(...d.map((h) => (h === "" ? c : [c, h].join("/")))),
    s && g.push(...d),
    g.map((h) => (e.startsWith("/") && h === "" ? "/" : h))
  );
}
function w4(e) {
  e.sort((n, i) =>
    n.score !== i.score
      ? i.score - n.score
      : I4(
          n.routesMeta.map((r) => r.childrenIndex),
          i.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var k4 = /^:[\w-]+$/,
  R4 = 3,
  T4 = 2,
  A4 = 1,
  z4 = 10,
  _4 = -2,
  h0 = (e) => e === "*";
function N4(e, n) {
  let i = e.split("/"),
    r = i.length;
  return (
    i.some(h0) && (r += _4),
    n && (r += T4),
    i
      .filter((s) => !h0(s))
      .reduce((s, c) => s + (k4.test(c) ? R4 : c === "" ? A4 : z4), r)
  );
}
function I4(e, n) {
  return e.length === n.length && e.slice(0, -1).every((r, s) => r === n[s])
    ? e[e.length - 1] - n[n.length - 1]
    : 0;
}
function P4(e, n, i = !1) {
  let { routesMeta: r } = e,
    s = {},
    c = "/",
    d = [];
  for (let g = 0; g < r.length; ++g) {
    let h = r[g],
      m = g === r.length - 1,
      p = c === "/" ? n : n.slice(c.length) || "/",
      y = jc(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: m },
        p,
      ),
      b = h.route;
    if (
      (!y &&
        m &&
        i &&
        !r[r.length - 1].route.index &&
        (y = jc(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          p,
        )),
      !y)
    )
      return null;
    Object.assign(s, y.params),
      d.push({
        params: s,
        pathname: la([c, y.pathname]),
        pathnameBase: B4(la([c, y.pathnameBase])),
        route: b,
      }),
      y.pathnameBase !== "/" && (c = la([c, y.pathnameBase]));
  }
  return d;
}
function jc(e, n) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [i, r] = V4(e.path, e.caseSensitive, e.end),
    s = n.match(i);
  if (!s) return null;
  let c = s[0],
    d = c.replace(/(.)\/+$/, "$1"),
    g = s.slice(1);
  return {
    params: r.reduce((m, { paramName: p, isOptional: y }, b) => {
      if (p === "*") {
        let C = g[b] || "";
        d = c.slice(0, c.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const x = g[b];
      return (
        y && !x ? (m[p] = void 0) : (m[p] = (x || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: c,
    pathnameBase: d,
    pattern: e,
  };
}
function V4(e, n = !1, i = !0) {
  wn(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (d, g, h) => (
            r.push({ paramName: g, isOptional: h != null }),
            h ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (s += "\\/*$")
        : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, n ? void 0 : "i"), r]
  );
}
function D4(e) {
  try {
    return e
      .split("/")
      .map((n) => decodeURIComponent(n).replace(/\//g, "%2F"))
      .join("/");
  } catch (n) {
    return (
      wn(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`,
      ),
      e
    );
  }
}
function fa(e, n) {
  if (n === "/") return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase())) return null;
  let i = n.endsWith("/") ? n.length - 1 : n.length,
    r = e.charAt(i);
  return r && r !== "/" ? null : e.slice(i) || "/";
}
function M4(e, n = "/") {
  let {
    pathname: i,
    search: r = "",
    hash: s = "",
  } = typeof e == "string" ? Si(e) : e;
  return {
    pathname: i ? (i.startsWith("/") ? i : L4(i, n)) : n,
    search: j4(r),
    hash: U4(s),
  };
}
function L4(e, n) {
  let i = n.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function eg(e, n, i, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${n}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function H4(e) {
  return e.filter(
    (n, i) => i === 0 || (n.route.path && n.route.path.length > 0),
  );
}
function DC(e) {
  let n = H4(e);
  return n.map((i, r) => (r === n.length - 1 ? i.pathname : i.pathnameBase));
}
function MC(e, n, i, r = !1) {
  let s;
  typeof e == "string"
    ? (s = Si(e))
    : ((s = { ...e }),
      Ye(
        !s.pathname || !s.pathname.includes("?"),
        eg("?", "pathname", "search", s),
      ),
      Ye(
        !s.pathname || !s.pathname.includes("#"),
        eg("#", "pathname", "hash", s),
      ),
      Ye(!s.search || !s.search.includes("#"), eg("#", "search", "hash", s)));
  let c = e === "" || s.pathname === "",
    d = c ? "/" : s.pathname,
    g;
  if (d == null) g = i;
  else {
    let y = n.length - 1;
    if (!r && d.startsWith("..")) {
      let b = d.split("/");
      for (; b[0] === ".."; ) b.shift(), (y -= 1);
      s.pathname = b.join("/");
    }
    g = y >= 0 ? n[y] : "/";
  }
  let h = M4(s, g),
    m = d && d !== "/" && d.endsWith("/"),
    p = (c || d === ".") && i.endsWith("/");
  return !h.pathname.endsWith("/") && (m || p) && (h.pathname += "/"), h;
}
var la = (e) => e.join("/").replace(/\/\/+/g, "/"),
  B4 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  j4 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  U4 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function $4(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var LC = ["POST", "PUT", "PATCH", "DELETE"];
new Set(LC);
var F4 = ["GET", ...LC];
new Set(F4);
var zr = k.createContext(null);
zr.displayName = "DataRouter";
var du = k.createContext(null);
du.displayName = "DataRouterState";
var HC = k.createContext({ isTransitioning: !1 });
HC.displayName = "ViewTransition";
var G4 = k.createContext(new Map());
G4.displayName = "Fetchers";
var W4 = k.createContext(null);
W4.displayName = "Await";
var jn = k.createContext(null);
jn.displayName = "Navigation";
var xl = k.createContext(null);
xl.displayName = "Location";
var Un = k.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Un.displayName = "Route";
var xh = k.createContext(null);
xh.displayName = "RouteError";
function q4(e, { relative: n } = {}) {
  Ye(
    Sl(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: i, navigator: r } = k.useContext(jn),
    { hash: s, pathname: c, search: d } = Cl(e, { relative: n }),
    g = c;
  return (
    i !== "/" && (g = c === "/" ? i : la([i, c])),
    r.createHref({ pathname: g, search: d, hash: s })
  );
}
function Sl() {
  return k.useContext(xl) != null;
}
function Ci() {
  return (
    Ye(
      Sl(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    k.useContext(xl).location
  );
}
var BC =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function jC(e) {
  k.useContext(jn).static || k.useLayoutEffect(e);
}
function Y4() {
  let { isDataRoute: e } = k.useContext(Un);
  return e ? c6() : X4();
}
function X4() {
  Ye(
    Sl(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = k.useContext(zr),
    { basename: n, navigator: i } = k.useContext(jn),
    { matches: r } = k.useContext(Un),
    { pathname: s } = Ci(),
    c = JSON.stringify(DC(r)),
    d = k.useRef(!1);
  return (
    jC(() => {
      d.current = !0;
    }),
    k.useCallback(
      (h, m = {}) => {
        if ((wn(d.current, BC), !d.current)) return;
        if (typeof h == "number") {
          i.go(h);
          return;
        }
        let p = MC(h, JSON.parse(c), s, m.relative === "path");
        e == null &&
          n !== "/" &&
          (p.pathname = p.pathname === "/" ? n : la([n, p.pathname])),
          (m.replace ? i.replace : i.push)(p, m.state, m);
      },
      [n, i, c, s, e],
    )
  );
}
var K4 = k.createContext(null);
function Q4(e) {
  let n = k.useContext(Un).outlet;
  return n && k.createElement(K4.Provider, { value: e }, n);
}
function Cl(e, { relative: n } = {}) {
  let { matches: i } = k.useContext(Un),
    { pathname: r } = Ci(),
    s = JSON.stringify(DC(i));
  return k.useMemo(() => MC(e, JSON.parse(s), r, n === "path"), [e, s, r, n]);
}
function Z4(e, n) {
  return UC(e, n);
}
function UC(e, n, i, r) {
  var O;
  Ye(
    Sl(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: s } = k.useContext(jn),
    { matches: c } = k.useContext(Un),
    d = c[c.length - 1],
    g = d ? d.params : {},
    h = d ? d.pathname : "/",
    m = d ? d.pathnameBase : "/",
    p = d && d.route;
  {
    let A = (p && p.path) || "";
    $C(
      h,
      !p || A.endsWith("*") || A.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === "/" ? "*" : `${A}/*`}">.`,
    );
  }
  let y = Ci(),
    b;
  if (n) {
    let A = typeof n == "string" ? Si(n) : n;
    Ye(
      m === "/" || ((O = A.pathname) == null ? void 0 : O.startsWith(m)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${A.pathname}" was given in the \`location\` prop.`,
    ),
      (b = A);
  } else b = y;
  let x = b.pathname || "/",
    C = x;
  if (m !== "/") {
    let A = m.replace(/^\//, "").split("/");
    C = "/" + x.replace(/^\//, "").split("/").slice(A.length).join("/");
  }
  let E = IC(e, { pathname: C });
  wn(
    p || E != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `,
  ),
    wn(
      E == null ||
        E[E.length - 1].route.element !== void 0 ||
        E[E.length - 1].route.Component !== void 0 ||
        E[E.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let R = a6(
    E &&
      E.map((A) =>
        Object.assign({}, A, {
          params: Object.assign({}, g, A.params),
          pathname: la([
            m,
            s.encodeLocation
              ? s.encodeLocation(A.pathname).pathname
              : A.pathname,
          ]),
          pathnameBase:
            A.pathnameBase === "/"
              ? m
              : la([
                  m,
                  s.encodeLocation
                    ? s.encodeLocation(A.pathnameBase).pathname
                    : A.pathnameBase,
                ]),
        }),
      ),
    c,
    i,
    r,
  );
  return n && R
    ? k.createElement(
        xl.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...b,
            },
            navigationType: "POP",
          },
        },
        R,
      )
    : R;
}
function J4() {
  let e = s6(),
    n = $4(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    i = e instanceof Error ? e.stack : null,
    r = "rgba(200,200,200, 0.5)",
    s = { padding: "0.5rem", backgroundColor: r },
    c = { padding: "2px 4px", backgroundColor: r },
    d = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (d = k.createElement(
      k.Fragment,
      null,
      k.createElement("p", null, "💿 Hey developer 👋"),
      k.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        k.createElement("code", { style: c }, "ErrorBoundary"),
        " or",
        " ",
        k.createElement("code", { style: c }, "errorElement"),
        " prop on your route.",
      ),
    )),
    k.createElement(
      k.Fragment,
      null,
      k.createElement("h2", null, "Unexpected Application Error!"),
      k.createElement("h3", { style: { fontStyle: "italic" } }, n),
      i ? k.createElement("pre", { style: s }, i) : null,
      d,
    )
  );
}
var e6 = k.createElement(J4, null),
  t6 = class extends k.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, n) {
      return n.location !== e.location ||
        (n.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : n.error,
            location: n.location,
            revalidation: e.revalidation || n.revalidation,
          };
    }
    componentDidCatch(e, n) {
      console.error(
        "React Router caught the following error during render",
        e,
        n,
      );
    }
    render() {
      return this.state.error !== void 0
        ? k.createElement(
            Un.Provider,
            { value: this.props.routeContext },
            k.createElement(xh.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function n6({ routeContext: e, match: n, children: i }) {
  let r = k.useContext(zr);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = n.route.id),
    k.createElement(Un.Provider, { value: e }, i)
  );
}
function a6(e, n = [], i = null, r = null) {
  if (e == null) {
    if (!i) return null;
    if (i.errors) e = i.matches;
    else if (n.length === 0 && !i.initialized && i.matches.length > 0)
      e = i.matches;
    else return null;
  }
  let s = e,
    c = i == null ? void 0 : i.errors;
  if (c != null) {
    let h = s.findIndex(
      (m) => m.route.id && (c == null ? void 0 : c[m.route.id]) !== void 0,
    );
    Ye(
      h >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`,
    ),
      (s = s.slice(0, Math.min(s.length, h + 1)));
  }
  let d = !1,
    g = -1;
  if (i)
    for (let h = 0; h < s.length; h++) {
      let m = s[h];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (g = h),
        m.route.id)
      ) {
        let { loaderData: p, errors: y } = i,
          b =
            m.route.loader &&
            !p.hasOwnProperty(m.route.id) &&
            (!y || y[m.route.id] === void 0);
        if (m.route.lazy || b) {
          (d = !0), g >= 0 ? (s = s.slice(0, g + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((h, m, p) => {
    let y,
      b = !1,
      x = null,
      C = null;
    i &&
      ((y = c && m.route.id ? c[m.route.id] : void 0),
      (x = m.route.errorElement || e6),
      d &&
        (g < 0 && p === 0
          ? ($C(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (b = !0),
            (C = null))
          : g === p &&
            ((b = !0), (C = m.route.hydrateFallbackElement || null))));
    let E = n.concat(s.slice(0, p + 1)),
      R = () => {
        let O;
        return (
          y
            ? (O = x)
            : b
              ? (O = C)
              : m.route.Component
                ? (O = k.createElement(m.route.Component, null))
                : m.route.element
                  ? (O = m.route.element)
                  : (O = h),
          k.createElement(n6, {
            match: m,
            routeContext: { outlet: h, matches: E, isDataRoute: i != null },
            children: O,
          })
        );
      };
    return i && (m.route.ErrorBoundary || m.route.errorElement || p === 0)
      ? k.createElement(t6, {
          location: i.location,
          revalidation: i.revalidation,
          component: x,
          error: y,
          children: R(),
          routeContext: { outlet: null, matches: E, isDataRoute: !0 },
        })
      : R();
  }, null);
}
function Sh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function i6(e) {
  let n = k.useContext(zr);
  return Ye(n, Sh(e)), n;
}
function r6(e) {
  let n = k.useContext(du);
  return Ye(n, Sh(e)), n;
}
function o6(e) {
  let n = k.useContext(Un);
  return Ye(n, Sh(e)), n;
}
function Ch(e) {
  let n = o6(e),
    i = n.matches[n.matches.length - 1];
  return (
    Ye(
      i.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    i.route.id
  );
}
function l6() {
  return Ch("useRouteId");
}
function s6() {
  var r;
  let e = k.useContext(xh),
    n = r6("useRouteError"),
    i = Ch("useRouteError");
  return e !== void 0 ? e : (r = n.errors) == null ? void 0 : r[i];
}
function c6() {
  let { router: e } = i6("useNavigate"),
    n = Ch("useNavigate"),
    i = k.useRef(!1);
  return (
    jC(() => {
      i.current = !0;
    }),
    k.useCallback(
      async (s, c = {}) => {
        wn(i.current, BC),
          i.current &&
            (typeof s == "number"
              ? e.navigate(s)
              : await e.navigate(s, { fromRouteId: n, ...c }));
      },
      [e, n],
    )
  );
}
var m0 = {};
function $C(e, n, i) {
  !n && !m0[e] && ((m0[e] = !0), wn(!1, i));
}
k.memo(u6);
function u6({ routes: e, future: n, state: i }) {
  return UC(e, void 0, i, n);
}
function d6(e) {
  return Q4(e.context);
}
function bc(e) {
  Ye(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function f6({
  basename: e = "/",
  children: n = null,
  location: i,
  navigationType: r = "POP",
  navigator: s,
  static: c = !1,
}) {
  Ye(
    !Sl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let d = e.replace(/^\/*/, "/"),
    g = k.useMemo(
      () => ({ basename: d, navigator: s, static: c, future: {} }),
      [d, s, c],
    );
  typeof i == "string" && (i = Si(i));
  let {
      pathname: h = "/",
      search: m = "",
      hash: p = "",
      state: y = null,
      key: b = "default",
    } = i,
    x = k.useMemo(() => {
      let C = fa(h, d);
      return C == null
        ? null
        : {
            location: { pathname: C, search: m, hash: p, state: y, key: b },
            navigationType: r,
          };
    }, [d, h, m, p, y, b, r]);
  return (
    wn(
      x != null,
      `<Router basename="${d}"> is not able to match the URL "${h}${m}${p}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    x == null
      ? null
      : k.createElement(
          jn.Provider,
          { value: g },
          k.createElement(xl.Provider, { children: n, value: x }),
        )
  );
}
function g6({ children: e, location: n }) {
  return Z4(wg(e), n);
}
function wg(e, n = []) {
  let i = [];
  return (
    k.Children.forEach(e, (r, s) => {
      if (!k.isValidElement(r)) return;
      let c = [...n, s];
      if (r.type === k.Fragment) {
        i.push.apply(i, wg(r.props.children, c));
        return;
      }
      Ye(
        r.type === bc,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        Ye(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        );
      let d = {
        id: r.props.id || c.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (d.children = wg(r.props.children, c)), i.push(d);
    }),
    i
  );
}
var yc = "get",
  xc = "application/x-www-form-urlencoded";
function fu(e) {
  return e != null && typeof e.tagName == "string";
}
function h6(e) {
  return fu(e) && e.tagName.toLowerCase() === "button";
}
function m6(e) {
  return fu(e) && e.tagName.toLowerCase() === "form";
}
function p6(e) {
  return fu(e) && e.tagName.toLowerCase() === "input";
}
function v6(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function b6(e, n) {
  return e.button === 0 && (!n || n === "_self") && !v6(e);
}
var tc = null;
function y6() {
  if (tc === null)
    try {
      new FormData(document.createElement("form"), 0), (tc = !1);
    } catch {
      tc = !0;
    }
  return tc;
}
var x6 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function tg(e) {
  return e != null && !x6.has(e)
    ? (wn(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${xc}"`,
      ),
      null)
    : e;
}
function S6(e, n) {
  let i, r, s, c, d;
  if (m6(e)) {
    let g = e.getAttribute("action");
    (r = g ? fa(g, n) : null),
      (i = e.getAttribute("method") || yc),
      (s = tg(e.getAttribute("enctype")) || xc),
      (c = new FormData(e));
  } else if (h6(e) || (p6(e) && (e.type === "submit" || e.type === "image"))) {
    let g = e.form;
    if (g == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let h = e.getAttribute("formaction") || g.getAttribute("action");
    if (
      ((r = h ? fa(h, n) : null),
      (i = e.getAttribute("formmethod") || g.getAttribute("method") || yc),
      (s =
        tg(e.getAttribute("formenctype")) ||
        tg(g.getAttribute("enctype")) ||
        xc),
      (c = new FormData(g, e)),
      !y6())
    ) {
      let { name: m, type: p, value: y } = e;
      if (p === "image") {
        let b = m ? `${m}.` : "";
        c.append(`${b}x`, "0"), c.append(`${b}y`, "0");
      } else m && c.append(m, y);
    }
  } else {
    if (fu(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (i = yc), (r = null), (s = xc), (d = e);
  }
  return (
    c && s === "text/plain" && ((d = c), (c = void 0)),
    { action: r, method: i.toLowerCase(), encType: s, formData: c, body: d }
  );
}
function Eh(e, n) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(n);
}
async function C6(e, n) {
  if (e.id in n) return n[e.id];
  try {
    let i = await import(e.module);
    return (n[e.id] = i), i;
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function E6(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function O6(e, n, i) {
  let r = await Promise.all(
    e.map(async (s) => {
      let c = n.routes[s.route.id];
      if (c) {
        let d = await C6(c, i);
        return d.links ? d.links() : [];
      }
      return [];
    }),
  );
  return T6(
    r
      .flat(1)
      .filter(E6)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" },
      ),
  );
}
function p0(e, n, i, r, s, c) {
  let d = (h, m) => (i[m] ? h.route.id !== i[m].route.id : !0),
    g = (h, m) => {
      var p;
      return (
        i[m].pathname !== h.pathname ||
        (((p = i[m].route.path) == null ? void 0 : p.endsWith("*")) &&
          i[m].params["*"] !== h.params["*"])
      );
    };
  return c === "assets"
    ? n.filter((h, m) => d(h, m) || g(h, m))
    : c === "data"
      ? n.filter((h, m) => {
          var y;
          let p = r.routes[h.route.id];
          if (!p || !p.hasLoader) return !1;
          if (d(h, m) || g(h, m)) return !0;
          if (h.route.shouldRevalidate) {
            let b = h.route.shouldRevalidate({
              currentUrl: new URL(
                s.pathname + s.search + s.hash,
                window.origin,
              ),
              currentParams: ((y = i[0]) == null ? void 0 : y.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof b == "boolean") return b;
          }
          return !0;
        })
      : [];
}
function w6(e, n, { includeHydrateFallback: i } = {}) {
  return k6(
    e
      .map((r) => {
        let s = n.routes[r.route.id];
        if (!s) return [];
        let c = [s.module];
        return (
          s.clientActionModule && (c = c.concat(s.clientActionModule)),
          s.clientLoaderModule && (c = c.concat(s.clientLoaderModule)),
          i &&
            s.hydrateFallbackModule &&
            (c = c.concat(s.hydrateFallbackModule)),
          s.imports && (c = c.concat(s.imports)),
          c
        );
      })
      .flat(1),
  );
}
function k6(e) {
  return [...new Set(e)];
}
function R6(e) {
  let n = {},
    i = Object.keys(e).sort();
  for (let r of i) n[r] = e[r];
  return n;
}
function T6(e, n) {
  let i = new Set();
  return (
    new Set(n),
    e.reduce((r, s) => {
      let c = JSON.stringify(R6(s));
      return i.has(c) || (i.add(c), r.push({ key: c, link: s })), r;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var A6 = new Set([100, 101, 204, 205]);
function z6(e, n) {
  let i =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    i.pathname === "/"
      ? (i.pathname = "_root.data")
      : n && fa(i.pathname, n) === "/"
        ? (i.pathname = `${n.replace(/\/$/, "")}/_root.data`)
        : (i.pathname = `${i.pathname.replace(/\/$/, "")}.data`),
    i
  );
}
function FC() {
  let e = k.useContext(zr);
  return (
    Eh(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function _6() {
  let e = k.useContext(du);
  return (
    Eh(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Oh = k.createContext(void 0);
Oh.displayName = "FrameworkContext";
function GC() {
  let e = k.useContext(Oh);
  return (
    Eh(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function N6(e, n) {
  let i = k.useContext(Oh),
    [r, s] = k.useState(!1),
    [c, d] = k.useState(!1),
    {
      onFocus: g,
      onBlur: h,
      onMouseEnter: m,
      onMouseLeave: p,
      onTouchStart: y,
    } = n,
    b = k.useRef(null);
  k.useEffect(() => {
    if ((e === "render" && d(!0), e === "viewport")) {
      let E = (O) => {
          O.forEach((A) => {
            d(A.isIntersecting);
          });
        },
        R = new IntersectionObserver(E, { threshold: 0.5 });
      return (
        b.current && R.observe(b.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [e]),
    k.useEffect(() => {
      if (r) {
        let E = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(E);
        };
      }
    }, [r]);
  let x = () => {
      s(!0);
    },
    C = () => {
      s(!1), d(!1);
    };
  return i
    ? e !== "intent"
      ? [c, b, {}]
      : [
          c,
          b,
          {
            onFocus: Fo(g, x),
            onBlur: Fo(h, C),
            onMouseEnter: Fo(m, x),
            onMouseLeave: Fo(p, C),
            onTouchStart: Fo(y, x),
          },
        ]
    : [!1, b, {}];
}
function Fo(e, n) {
  return (i) => {
    e && e(i), i.defaultPrevented || n(i);
  };
}
function I6({ page: e, ...n }) {
  let { router: i } = FC(),
    r = k.useMemo(() => IC(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return r ? k.createElement(V6, { page: e, matches: r, ...n }) : null;
}
function P6(e) {
  let { manifest: n, routeModules: i } = GC(),
    [r, s] = k.useState([]);
  return (
    k.useEffect(() => {
      let c = !1;
      return (
        O6(e, n, i).then((d) => {
          c || s(d);
        }),
        () => {
          c = !0;
        }
      );
    }, [e, n, i]),
    r
  );
}
function V6({ page: e, matches: n, ...i }) {
  let r = Ci(),
    { manifest: s, routeModules: c } = GC(),
    { basename: d } = FC(),
    { loaderData: g, matches: h } = _6(),
    m = k.useMemo(() => p0(e, n, h, s, r, "data"), [e, n, h, s, r]),
    p = k.useMemo(() => p0(e, n, h, s, r, "assets"), [e, n, h, s, r]),
    y = k.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let C = new Set(),
        E = !1;
      if (
        (n.forEach((O) => {
          var z;
          let A = s.routes[O.route.id];
          !A ||
            !A.hasLoader ||
            ((!m.some((B) => B.route.id === O.route.id) &&
              O.route.id in g &&
              (z = c[O.route.id]) != null &&
              z.shouldRevalidate) ||
            A.hasClientLoader
              ? (E = !0)
              : C.add(O.route.id));
        }),
        C.size === 0)
      )
        return [];
      let R = z6(e, d);
      return (
        E &&
          C.size > 0 &&
          R.searchParams.set(
            "_routes",
            n
              .filter((O) => C.has(O.route.id))
              .map((O) => O.route.id)
              .join(","),
          ),
        [R.pathname + R.search]
      );
    }, [d, g, r, s, m, n, e, c]),
    b = k.useMemo(() => w6(p, s), [p, s]),
    x = P6(p);
  return k.createElement(
    k.Fragment,
    null,
    y.map((C) =>
      k.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...i,
      }),
    ),
    b.map((C) =>
      k.createElement("link", { key: C, rel: "modulepreload", href: C, ...i }),
    ),
    x.map(({ key: C, link: E }) => k.createElement("link", { key: C, ...E })),
  );
}
function D6(...e) {
  return (n) => {
    e.forEach((i) => {
      typeof i == "function" ? i(n) : i != null && (i.current = n);
    });
  };
}
var WC =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  WC && (window.__reactRouterVersion = "7.6.2");
} catch {}
function M6({ basename: e, children: n, window: i }) {
  let r = k.useRef();
  r.current == null && (r.current = x4({ window: i, v5Compat: !0 }));
  let s = r.current,
    [c, d] = k.useState({ action: s.action, location: s.location }),
    g = k.useCallback(
      (h) => {
        k.startTransition(() => d(h));
      },
      [d],
    );
  return (
    k.useLayoutEffect(() => s.listen(g), [s, g]),
    k.createElement(f6, {
      basename: e,
      children: n,
      location: c.location,
      navigationType: c.action,
      navigator: s,
    })
  );
}
var qC = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  YC = k.forwardRef(function (
    {
      onClick: n,
      discover: i = "render",
      prefetch: r = "none",
      relative: s,
      reloadDocument: c,
      replace: d,
      state: g,
      target: h,
      to: m,
      preventScrollReset: p,
      viewTransition: y,
      ...b
    },
    x,
  ) {
    let { basename: C } = k.useContext(jn),
      E = typeof m == "string" && qC.test(m),
      R,
      O = !1;
    if (typeof m == "string" && E && ((R = m), WC))
      try {
        let U = new URL(window.location.href),
          K = m.startsWith("//") ? new URL(U.protocol + m) : new URL(m),
          re = fa(K.pathname, C);
        K.origin === U.origin && re != null
          ? (m = re + K.search + K.hash)
          : (O = !0);
      } catch {
        wn(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let A = q4(m, { relative: s }),
      [z, B, _] = N6(r, b),
      Y = j6(m, {
        replace: d,
        state: g,
        target: h,
        preventScrollReset: p,
        relative: s,
        viewTransition: y,
      });
    function $(U) {
      n && n(U), U.defaultPrevented || Y(U);
    }
    let j = k.createElement("a", {
      ...b,
      ..._,
      href: R || A,
      onClick: O || c ? n : $,
      ref: D6(x, B),
      target: h,
      "data-discover": !E && i === "render" ? "true" : void 0,
    });
    return z && !E
      ? k.createElement(k.Fragment, null, j, k.createElement(I6, { page: A }))
      : j;
  });
YC.displayName = "Link";
var L6 = k.forwardRef(function (
  {
    "aria-current": n = "page",
    caseSensitive: i = !1,
    className: r = "",
    end: s = !1,
    style: c,
    to: d,
    viewTransition: g,
    children: h,
    ...m
  },
  p,
) {
  let y = Cl(d, { relative: m.relative }),
    b = Ci(),
    x = k.useContext(du),
    { navigator: C, basename: E } = k.useContext(jn),
    R = x != null && W6(y) && g === !0,
    O = C.encodeLocation ? C.encodeLocation(y).pathname : y.pathname,
    A = b.pathname,
    z =
      x && x.navigation && x.navigation.location
        ? x.navigation.location.pathname
        : null;
  i ||
    ((A = A.toLowerCase()),
    (z = z ? z.toLowerCase() : null),
    (O = O.toLowerCase())),
    z && E && (z = fa(z, E) || z);
  const B = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
  let _ = A === O || (!s && A.startsWith(O) && A.charAt(B) === "/"),
    Y =
      z != null &&
      (z === O || (!s && z.startsWith(O) && z.charAt(O.length) === "/")),
    $ = { isActive: _, isPending: Y, isTransitioning: R },
    j = _ ? n : void 0,
    U;
  typeof r == "function"
    ? (U = r($))
    : (U = [
        r,
        _ ? "active" : null,
        Y ? "pending" : null,
        R ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let K = typeof c == "function" ? c($) : c;
  return k.createElement(
    YC,
    {
      ...m,
      "aria-current": j,
      className: U,
      ref: p,
      style: K,
      to: d,
      viewTransition: g,
    },
    typeof h == "function" ? h($) : h,
  );
});
L6.displayName = "NavLink";
var H6 = k.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: n,
      navigate: i,
      reloadDocument: r,
      replace: s,
      state: c,
      method: d = yc,
      action: g,
      onSubmit: h,
      relative: m,
      preventScrollReset: p,
      viewTransition: y,
      ...b
    },
    x,
  ) => {
    let C = F6(),
      E = G6(g, { relative: m }),
      R = d.toLowerCase() === "get" ? "get" : "post",
      O = typeof g == "string" && qC.test(g),
      A = (z) => {
        if ((h && h(z), z.defaultPrevented)) return;
        z.preventDefault();
        let B = z.nativeEvent.submitter,
          _ = (B == null ? void 0 : B.getAttribute("formmethod")) || d;
        C(B || z.currentTarget, {
          fetcherKey: n,
          method: _,
          navigate: i,
          replace: s,
          state: c,
          relative: m,
          preventScrollReset: p,
          viewTransition: y,
        });
      };
    return k.createElement("form", {
      ref: x,
      method: R,
      action: E,
      onSubmit: r ? h : A,
      ...b,
      "data-discover": !O && e === "render" ? "true" : void 0,
    });
  },
);
H6.displayName = "Form";
function B6(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function XC(e) {
  let n = k.useContext(zr);
  return Ye(n, B6(e)), n;
}
function j6(
  e,
  {
    target: n,
    replace: i,
    state: r,
    preventScrollReset: s,
    relative: c,
    viewTransition: d,
  } = {},
) {
  let g = Y4(),
    h = Ci(),
    m = Cl(e, { relative: c });
  return k.useCallback(
    (p) => {
      if (b6(p, n)) {
        p.preventDefault();
        let y = i !== void 0 ? i : ll(h) === ll(m);
        g(e, {
          replace: y,
          state: r,
          preventScrollReset: s,
          relative: c,
          viewTransition: d,
        });
      }
    },
    [h, g, m, i, r, n, e, s, c, d],
  );
}
var U6 = 0,
  $6 = () => `__${String(++U6)}__`;
function F6() {
  let { router: e } = XC("useSubmit"),
    { basename: n } = k.useContext(jn),
    i = l6();
  return k.useCallback(
    async (r, s = {}) => {
      let { action: c, method: d, encType: g, formData: h, body: m } = S6(r, n);
      if (s.navigate === !1) {
        let p = s.fetcherKey || $6();
        await e.fetch(p, i, s.action || c, {
          preventScrollReset: s.preventScrollReset,
          formData: h,
          body: m,
          formMethod: s.method || d,
          formEncType: s.encType || g,
          flushSync: s.flushSync,
        });
      } else
        await e.navigate(s.action || c, {
          preventScrollReset: s.preventScrollReset,
          formData: h,
          body: m,
          formMethod: s.method || d,
          formEncType: s.encType || g,
          replace: s.replace,
          state: s.state,
          fromRouteId: i,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition,
        });
    },
    [e, n, i],
  );
}
function G6(e, { relative: n } = {}) {
  let { basename: i } = k.useContext(jn),
    r = k.useContext(Un);
  Ye(r, "useFormAction must be used inside a RouteContext");
  let [s] = r.matches.slice(-1),
    c = { ...Cl(e || ".", { relative: n }) },
    d = Ci();
  if (e == null) {
    c.search = d.search;
    let g = new URLSearchParams(c.search),
      h = g.getAll("index");
    if (h.some((p) => p === "")) {
      g.delete("index"),
        h.filter((y) => y).forEach((y) => g.append("index", y));
      let p = g.toString();
      c.search = p ? `?${p}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      s.route.index &&
      (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (c.pathname = c.pathname === "/" ? i : la([i, c.pathname])),
    ll(c)
  );
}
function W6(e, n = {}) {
  let i = k.useContext(HC);
  Ye(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = XC("useViewTransitionState"),
    s = Cl(e, { relative: n.relative });
  if (!i.isTransitioning) return !1;
  let c = fa(i.currentLocation.pathname, r) || i.currentLocation.pathname,
    d = fa(i.nextLocation.pathname, r) || i.nextLocation.pathname;
  return jc(s.pathname, d) != null || jc(s.pathname, c) != null;
}
[...A6];
function q6(e) {
  return yh({
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
        },
        child: [],
      },
    ],
  })(e);
}
const Y6 = () =>
    V.jsxs(ol, {
      children: [
        V.jsx(bh, {
          children: V.jsx(o0, { children: V.jsx(AC, { children: "PLANET" }) }),
        }),
        V.jsx($P, {
          w: "600px",
          minHeight: "90vh",
          py: 8,
          children: V.jsx(d6, {}),
        }),
        V.jsx(vh, {
          children: V.jsx(o0, {
            children: V.jsx(vc, {
              href: "https://github.com/kijimaD/planetizer",
              children: V.jsx(q6, {}),
            }),
          }),
        }),
      ],
    }),
  X6 = "feed.json",
  K6 = ({ children: e }) => {
    const [n, i] = k.useState(),
      [r, s] = k.useState(!0),
      [c, d] = k.useState({}),
      [g, h] = k.useState({});
    k.useEffect(() => {
      fetch(X6)
        .then((p) => p.json())
        .then((p) => {
          i(p);
        })
        .finally(() => s(!1));
    }, []);
    const m = (p) => {
      d((y) => ({ ...y, [p]: !y[p] }));
    };
    return (
      k.useEffect(() => {
        if (!n) return;
        const p = {};
        n.entries.forEach((y) => {
          p[y.config_source] =
            n.source_map[y.config_source].config_source.initial_visible;
        }),
          d(p);
      }, [n]),
      k.useEffect(() => {
        if (!n) return;
        const p = {};
        n.config.tags.forEach((y) => {
          p[y.name] = y;
        }),
          h(p);
      }, [n]),
      V.jsx(NC.Provider, {
        value: {
          tagRecord: g,
          feed: n,
          siteRecord: c,
          toggleSite: m,
          loading: r,
        },
        children: e,
      })
    );
  };
function Q6() {
  return V.jsx(Ok, {
    value: gP,
    children: V.jsx(K6, {
      children: V.jsx(M6, {
        children: V.jsx(g6, {
          children: V.jsxs(bc, {
            path: "/",
            element: V.jsx(Y6, {}),
            children: [
              V.jsx(bc, { path: "/", element: V.jsx(v4, {}) }),
              V.jsx(bc, { path: "*", element: V.jsx(b4, {}) }),
            ],
          }),
        }),
      }),
    }),
  });
}
Cw.createRoot(document.getElementById("root")).render(
  V.jsx(k.StrictMode, { children: V.jsx(Q6, {}) }),
);
