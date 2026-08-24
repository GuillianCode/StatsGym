function Wd(b) {
  return b && b.__esModule && Object.prototype.hasOwnProperty.call(b, "default") ? b.default : b;
}
var ef = { exports: {} }, j = {};
var oo;
function Fd() {
  if (oo) return j;
  oo = 1;
  var b = /* @__PURE__ */ Symbol.for("react.transitional.element"), B = /* @__PURE__ */ Symbol.for("react.portal"), N = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), K = /* @__PURE__ */ Symbol.for("react.profiler"), Z = /* @__PURE__ */ Symbol.for("react.consumer"), X = /* @__PURE__ */ Symbol.for("react.context"), P = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), C = /* @__PURE__ */ Symbol.for("react.lazy"), D = /* @__PURE__ */ Symbol.for("react.activity"), q = Symbol.iterator;
  function ml(m) {
    return m === null || typeof m != "object" ? null : (m = q && m[q] || m["@@iterator"], typeof m == "function" ? m : null);
  }
  var pl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Ul = Object.assign, Dt = {};
  function Wl(m, T, O) {
    this.props = m, this.context = T, this.refs = Dt, this.updater = O || pl;
  }
  Wl.prototype.isReactComponent = {}, Wl.prototype.setState = function(m, T) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, T, "setState");
  }, Wl.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function $t() {
  }
  $t.prototype = Wl.prototype;
  function Bl(m, T, O) {
    this.props = m, this.context = T, this.refs = Dt, this.updater = O || pl;
  }
  var ct = Bl.prototype = new $t();
  ct.constructor = Bl, Ul(ct, Wl.prototype), ct.isPureReactComponent = !0;
  var zt = Array.isArray;
  function Xl() {
  }
  var k = { H: null, A: null, T: null, S: null }, jl = Object.prototype.hasOwnProperty;
  function Tt(m, T, O) {
    var H = O.ref;
    return {
      $$typeof: b,
      type: m,
      key: T,
      ref: H !== void 0 ? H : null,
      props: O
    };
  }
  function ja(m, T) {
    return Tt(m.type, T, m.props);
  }
  function At(m) {
    return typeof m == "object" && m !== null && m.$$typeof === b;
  }
  function Zl(m) {
    var T = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(O) {
      return T[O];
    });
  }
  var Ea = /\/+/g;
  function Ut(m, T) {
    return typeof m == "object" && m !== null && m.key != null ? Zl("" + m.key) : T.toString(36);
  }
  function rt(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(Xl, Xl) : (m.status = "pending", m.then(
          function(T) {
            m.status === "pending" && (m.status = "fulfilled", m.value = T);
          },
          function(T) {
            m.status === "pending" && (m.status = "rejected", m.reason = T);
          }
        )), m.status) {
          case "fulfilled":
            return m.value;
          case "rejected":
            throw m.reason;
        }
    }
    throw m;
  }
  function S(m, T, O, H, L) {
    var J = typeof m;
    (J === "undefined" || J === "boolean") && (m = null);
    var el = !1;
    if (m === null) el = !0;
    else
      switch (J) {
        case "bigint":
        case "string":
        case "number":
          el = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case b:
            case B:
              el = !0;
              break;
            case C:
              return el = m._init, S(
                el(m._payload),
                T,
                O,
                H,
                L
              );
          }
      }
    if (el)
      return L = L(m), el = H === "" ? "." + Ut(m, 0) : H, zt(L) ? (O = "", el != null && (O = el.replace(Ea, "$&/") + "/"), S(L, T, O, "", function(pe) {
        return pe;
      })) : L != null && (At(L) && (L = ja(
        L,
        O + (L.key == null || m && m.key === L.key ? "" : ("" + L.key).replace(
          Ea,
          "$&/"
        ) + "/") + el
      )), T.push(L)), 1;
    el = 0;
    var Gl = H === "" ? "." : H + ":";
    if (zt(m))
      for (var Sl = 0; Sl < m.length; Sl++)
        H = m[Sl], J = Gl + Ut(H, Sl), el += S(
          H,
          T,
          O,
          J,
          L
        );
    else if (Sl = ml(m), typeof Sl == "function")
      for (m = Sl.call(m), Sl = 0; !(H = m.next()).done; )
        H = H.value, J = Gl + Ut(H, Sl++), el += S(
          H,
          T,
          O,
          J,
          L
        );
    else if (J === "object") {
      if (typeof m.then == "function")
        return S(
          rt(m),
          T,
          O,
          H,
          L
        );
      throw T = String(m), Error(
        "Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return el;
  }
  function _(m, T, O) {
    if (m == null) return m;
    var H = [], L = 0;
    return S(m, H, "", "", function(J) {
      return T.call(O, J, L++);
    }), H;
  }
  function Q(m) {
    if (m._status === -1) {
      var T = m._result;
      T = T(), T.then(
        function(O) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = O);
        },
        function(O) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = O);
        }
      ), m._status === -1 && (m._status = 0, m._result = T);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var cl = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var T = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(T)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  }, ol = {
    map: _,
    forEach: function(m, T, O) {
      _(
        m,
        function() {
          T.apply(this, arguments);
        },
        O
      );
    },
    count: function(m) {
      var T = 0;
      return _(m, function() {
        T++;
      }), T;
    },
    toArray: function(m) {
      return _(m, function(T) {
        return T;
      }) || [];
    },
    only: function(m) {
      if (!At(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return j.Activity = D, j.Children = ol, j.Component = Wl, j.Fragment = N, j.Profiler = K, j.PureComponent = Bl, j.StrictMode = o, j.Suspense = p, j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, j.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return k.H.useMemoCache(m);
    }
  }, j.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, j.cacheSignal = function() {
    return null;
  }, j.cloneElement = function(m, T, O) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var H = Ul({}, m.props), L = m.key;
    if (T != null)
      for (J in T.key !== void 0 && (L = "" + T.key), T)
        !jl.call(T, J) || J === "key" || J === "__self" || J === "__source" || J === "ref" && T.ref === void 0 || (H[J] = T[J]);
    var J = arguments.length - 2;
    if (J === 1) H.children = O;
    else if (1 < J) {
      for (var el = Array(J), Gl = 0; Gl < J; Gl++)
        el[Gl] = arguments[Gl + 2];
      H.children = el;
    }
    return Tt(m.type, L, H);
  }, j.createContext = function(m) {
    return m = {
      $$typeof: X,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: Z,
      _context: m
    }, m;
  }, j.createElement = function(m, T, O) {
    var H, L = {}, J = null;
    if (T != null)
      for (H in T.key !== void 0 && (J = "" + T.key), T)
        jl.call(T, H) && H !== "key" && H !== "__self" && H !== "__source" && (L[H] = T[H]);
    var el = arguments.length - 2;
    if (el === 1) L.children = O;
    else if (1 < el) {
      for (var Gl = Array(el), Sl = 0; Sl < el; Sl++)
        Gl[Sl] = arguments[Sl + 2];
      L.children = Gl;
    }
    if (m && m.defaultProps)
      for (H in el = m.defaultProps, el)
        L[H] === void 0 && (L[H] = el[H]);
    return Tt(m, J, L);
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(m) {
    return { $$typeof: P, render: m };
  }, j.isValidElement = At, j.lazy = function(m) {
    return {
      $$typeof: C,
      _payload: { _status: -1, _result: m },
      _init: Q
    };
  }, j.memo = function(m, T) {
    return {
      $$typeof: A,
      type: m,
      compare: T === void 0 ? null : T
    };
  }, j.startTransition = function(m) {
    var T = k.T, O = {};
    k.T = O;
    try {
      var H = m(), L = k.S;
      L !== null && L(O, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(Xl, cl);
    } catch (J) {
      cl(J);
    } finally {
      T !== null && O.types !== null && (T.types = O.types), k.T = T;
    }
  }, j.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, j.use = function(m) {
    return k.H.use(m);
  }, j.useActionState = function(m, T, O) {
    return k.H.useActionState(m, T, O);
  }, j.useCallback = function(m, T) {
    return k.H.useCallback(m, T);
  }, j.useContext = function(m) {
    return k.H.useContext(m);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(m, T) {
    return k.H.useDeferredValue(m, T);
  }, j.useEffect = function(m, T) {
    return k.H.useEffect(m, T);
  }, j.useEffectEvent = function(m) {
    return k.H.useEffectEvent(m);
  }, j.useId = function() {
    return k.H.useId();
  }, j.useImperativeHandle = function(m, T, O) {
    return k.H.useImperativeHandle(m, T, O);
  }, j.useInsertionEffect = function(m, T) {
    return k.H.useInsertionEffect(m, T);
  }, j.useLayoutEffect = function(m, T) {
    return k.H.useLayoutEffect(m, T);
  }, j.useMemo = function(m, T) {
    return k.H.useMemo(m, T);
  }, j.useOptimistic = function(m, T) {
    return k.H.useOptimistic(m, T);
  }, j.useReducer = function(m, T, O) {
    return k.H.useReducer(m, T, O);
  }, j.useRef = function(m) {
    return k.H.useRef(m);
  }, j.useState = function(m) {
    return k.H.useState(m);
  }, j.useSyncExternalStore = function(m, T, O) {
    return k.H.useSyncExternalStore(
      m,
      T,
      O
    );
  }, j.useTransition = function() {
    return k.H.useTransition();
  }, j.version = "19.2.8", j;
}
var yo;
function sf() {
  return yo || (yo = 1, ef.exports = Fd()), ef.exports;
}
var kd = sf();
const M = /* @__PURE__ */ Wd(kd);
var uf = { exports: {} }, Su = {}, nf = { exports: {} }, cf = {};
var vo;
function Id() {
  return vo || (vo = 1, (function(b) {
    function B(S, _) {
      var Q = S.length;
      S.push(_);
      l: for (; 0 < Q; ) {
        var cl = Q - 1 >>> 1, ol = S[cl];
        if (0 < K(ol, _))
          S[cl] = _, S[Q] = ol, Q = cl;
        else break l;
      }
    }
    function N(S) {
      return S.length === 0 ? null : S[0];
    }
    function o(S) {
      if (S.length === 0) return null;
      var _ = S[0], Q = S.pop();
      if (Q !== _) {
        S[0] = Q;
        l: for (var cl = 0, ol = S.length, m = ol >>> 1; cl < m; ) {
          var T = 2 * (cl + 1) - 1, O = S[T], H = T + 1, L = S[H];
          if (0 > K(O, Q))
            H < ol && 0 > K(L, O) ? (S[cl] = L, S[H] = Q, cl = H) : (S[cl] = O, S[T] = Q, cl = T);
          else if (H < ol && 0 > K(L, Q))
            S[cl] = L, S[H] = Q, cl = H;
          else break l;
        }
      }
      return _;
    }
    function K(S, _) {
      var Q = S.sortIndex - _.sortIndex;
      return Q !== 0 ? Q : S.id - _.id;
    }
    if (b.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var Z = performance;
      b.unstable_now = function() {
        return Z.now();
      };
    } else {
      var X = Date, P = X.now();
      b.unstable_now = function() {
        return X.now() - P;
      };
    }
    var p = [], A = [], C = 1, D = null, q = 3, ml = !1, pl = !1, Ul = !1, Dt = !1, Wl = typeof setTimeout == "function" ? setTimeout : null, $t = typeof clearTimeout == "function" ? clearTimeout : null, Bl = typeof setImmediate < "u" ? setImmediate : null;
    function ct(S) {
      for (var _ = N(A); _ !== null; ) {
        if (_.callback === null) o(A);
        else if (_.startTime <= S)
          o(A), _.sortIndex = _.expirationTime, B(p, _);
        else break;
        _ = N(A);
      }
    }
    function zt(S) {
      if (Ul = !1, ct(S), !pl)
        if (N(p) !== null)
          pl = !0, Xl || (Xl = !0, Zl());
        else {
          var _ = N(A);
          _ !== null && rt(zt, _.startTime - S);
        }
    }
    var Xl = !1, k = -1, jl = 5, Tt = -1;
    function ja() {
      return Dt ? !0 : !(b.unstable_now() - Tt < jl);
    }
    function At() {
      if (Dt = !1, Xl) {
        var S = b.unstable_now();
        Tt = S;
        var _ = !0;
        try {
          l: {
            pl = !1, Ul && (Ul = !1, $t(k), k = -1), ml = !0;
            var Q = q;
            try {
              t: {
                for (ct(S), D = N(p); D !== null && !(D.expirationTime > S && ja()); ) {
                  var cl = D.callback;
                  if (typeof cl == "function") {
                    D.callback = null, q = D.priorityLevel;
                    var ol = cl(
                      D.expirationTime <= S
                    );
                    if (S = b.unstable_now(), typeof ol == "function") {
                      D.callback = ol, ct(S), _ = !0;
                      break t;
                    }
                    D === N(p) && o(p), ct(S);
                  } else o(p);
                  D = N(p);
                }
                if (D !== null) _ = !0;
                else {
                  var m = N(A);
                  m !== null && rt(
                    zt,
                    m.startTime - S
                  ), _ = !1;
                }
              }
              break l;
            } finally {
              D = null, q = Q, ml = !1;
            }
            _ = void 0;
          }
        } finally {
          _ ? Zl() : Xl = !1;
        }
      }
    }
    var Zl;
    if (typeof Bl == "function")
      Zl = function() {
        Bl(At);
      };
    else if (typeof MessageChannel < "u") {
      var Ea = new MessageChannel(), Ut = Ea.port2;
      Ea.port1.onmessage = At, Zl = function() {
        Ut.postMessage(null);
      };
    } else
      Zl = function() {
        Wl(At, 0);
      };
    function rt(S, _) {
      k = Wl(function() {
        S(b.unstable_now());
      }, _);
    }
    b.unstable_IdlePriority = 5, b.unstable_ImmediatePriority = 1, b.unstable_LowPriority = 4, b.unstable_NormalPriority = 3, b.unstable_Profiling = null, b.unstable_UserBlockingPriority = 2, b.unstable_cancelCallback = function(S) {
      S.callback = null;
    }, b.unstable_forceFrameRate = function(S) {
      0 > S || 125 < S ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : jl = 0 < S ? Math.floor(1e3 / S) : 5;
    }, b.unstable_getCurrentPriorityLevel = function() {
      return q;
    }, b.unstable_next = function(S) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = q;
      }
      var Q = q;
      q = _;
      try {
        return S();
      } finally {
        q = Q;
      }
    }, b.unstable_requestPaint = function() {
      Dt = !0;
    }, b.unstable_runWithPriority = function(S, _) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var Q = q;
      q = S;
      try {
        return _();
      } finally {
        q = Q;
      }
    }, b.unstable_scheduleCallback = function(S, _, Q) {
      var cl = b.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? cl + Q : cl) : Q = cl, S) {
        case 1:
          var ol = -1;
          break;
        case 2:
          ol = 250;
          break;
        case 5:
          ol = 1073741823;
          break;
        case 4:
          ol = 1e4;
          break;
        default:
          ol = 5e3;
      }
      return ol = Q + ol, S = {
        id: C++,
        callback: _,
        priorityLevel: S,
        startTime: Q,
        expirationTime: ol,
        sortIndex: -1
      }, Q > cl ? (S.sortIndex = Q, B(A, S), N(p) === null && S === N(A) && (Ul ? ($t(k), k = -1) : Ul = !0, rt(zt, Q - cl))) : (S.sortIndex = ol, B(p, S), pl || ml || (pl = !0, Xl || (Xl = !0, Zl()))), S;
    }, b.unstable_shouldYield = ja, b.unstable_wrapCallback = function(S) {
      var _ = q;
      return function() {
        var Q = q;
        q = _;
        try {
          return S.apply(this, arguments);
        } finally {
          q = Q;
        }
      };
    };
  })(cf)), cf;
}
var ho;
function Pd() {
  return ho || (ho = 1, nf.exports = Id()), nf.exports;
}
var ff = { exports: {} }, Yl = {};
var go;
function lv() {
  if (go) return Yl;
  go = 1;
  var b = sf();
  function B(p) {
    var A = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var C = 2; C < arguments.length; C++)
        A += "&args[]=" + encodeURIComponent(arguments[C]);
    }
    return "Minified React error #" + p + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function N() {
  }
  var o = {
    d: {
      f: N,
      r: function() {
        throw Error(B(522));
      },
      D: N,
      C: N,
      L: N,
      m: N,
      X: N,
      S: N,
      M: N
    },
    p: 0,
    findDOMNode: null
  }, K = /* @__PURE__ */ Symbol.for("react.portal");
  function Z(p, A, C) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: K,
      key: D == null ? null : "" + D,
      children: p,
      containerInfo: A,
      implementation: C
    };
  }
  var X = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function P(p, A) {
    if (p === "font") return "";
    if (typeof A == "string")
      return A === "use-credentials" ? A : "";
  }
  return Yl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Yl.createPortal = function(p, A) {
    var C = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
      throw Error(B(299));
    return Z(p, A, null, C);
  }, Yl.flushSync = function(p) {
    var A = X.T, C = o.p;
    try {
      if (X.T = null, o.p = 2, p) return p();
    } finally {
      X.T = A, o.p = C, o.d.f();
    }
  }, Yl.preconnect = function(p, A) {
    typeof p == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, o.d.C(p, A));
  }, Yl.prefetchDNS = function(p) {
    typeof p == "string" && o.d.D(p);
  }, Yl.preinit = function(p, A) {
    if (typeof p == "string" && A && typeof A.as == "string") {
      var C = A.as, D = P(C, A.crossOrigin), q = typeof A.integrity == "string" ? A.integrity : void 0, ml = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      C === "style" ? o.d.S(
        p,
        typeof A.precedence == "string" ? A.precedence : void 0,
        {
          crossOrigin: D,
          integrity: q,
          fetchPriority: ml
        }
      ) : C === "script" && o.d.X(p, {
        crossOrigin: D,
        integrity: q,
        fetchPriority: ml,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      });
    }
  }, Yl.preinitModule = function(p, A) {
    if (typeof p == "string")
      if (typeof A == "object" && A !== null) {
        if (A.as == null || A.as === "script") {
          var C = P(
            A.as,
            A.crossOrigin
          );
          o.d.M(p, {
            crossOrigin: C,
            integrity: typeof A.integrity == "string" ? A.integrity : void 0,
            nonce: typeof A.nonce == "string" ? A.nonce : void 0
          });
        }
      } else A == null && o.d.M(p);
  }, Yl.preload = function(p, A) {
    if (typeof p == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var C = A.as, D = P(C, A.crossOrigin);
      o.d.L(p, C, {
        crossOrigin: D,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0,
        type: typeof A.type == "string" ? A.type : void 0,
        fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
        referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
        imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
        imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
        media: typeof A.media == "string" ? A.media : void 0
      });
    }
  }, Yl.preloadModule = function(p, A) {
    if (typeof p == "string")
      if (A) {
        var C = P(A.as, A.crossOrigin);
        o.d.m(p, {
          as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
          crossOrigin: C,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0
        });
      } else o.d.m(p);
  }, Yl.requestFormReset = function(p) {
    o.d.r(p);
  }, Yl.unstable_batchedUpdates = function(p, A) {
    return p(A);
  }, Yl.useFormState = function(p, A, C) {
    return X.H.useFormState(p, A, C);
  }, Yl.useFormStatus = function() {
    return X.H.useHostTransitionStatus();
  }, Yl.version = "19.2.8", Yl;
}
var ro;
function tv() {
  if (ro) return ff.exports;
  ro = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (B) {
        console.error(B);
      }
  }
  return b(), ff.exports = lv(), ff.exports;
}
var So;
function av() {
  if (So) return Su;
  So = 1;
  var b = Pd(), B = sf(), N = tv();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function K(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function Z(l) {
    var t = l, a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (a = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function X(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function P(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(l) {
    if (Z(l) !== l)
      throw Error(o(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = Z(l), t === null) throw Error(o(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (e = u.return, e !== null) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return p(u), l;
          if (n === e) return p(u), t;
          n = n.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== e.return) a = u, e = n;
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === a) {
            c = !0, a = u, e = n;
            break;
          }
          if (i === e) {
            c = !0, e = u, a = n;
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === a) {
              c = !0, a = n, e = u;
              break;
            }
            if (i === e) {
              c = !0, e = n, a = u;
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (a.alternate !== e) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? l : t;
  }
  function C(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = C(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var D = Object.assign, q = /* @__PURE__ */ Symbol.for("react.element"), ml = /* @__PURE__ */ Symbol.for("react.transitional.element"), pl = /* @__PURE__ */ Symbol.for("react.portal"), Ul = /* @__PURE__ */ Symbol.for("react.fragment"), Dt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Wl = /* @__PURE__ */ Symbol.for("react.profiler"), $t = /* @__PURE__ */ Symbol.for("react.consumer"), Bl = /* @__PURE__ */ Symbol.for("react.context"), ct = /* @__PURE__ */ Symbol.for("react.forward_ref"), zt = /* @__PURE__ */ Symbol.for("react.suspense"), Xl = /* @__PURE__ */ Symbol.for("react.suspense_list"), k = /* @__PURE__ */ Symbol.for("react.memo"), jl = /* @__PURE__ */ Symbol.for("react.lazy"), Tt = /* @__PURE__ */ Symbol.for("react.activity"), ja = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), At = Symbol.iterator;
  function Zl(l) {
    return l === null || typeof l != "object" ? null : (l = At && l[At] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ea = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ut(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ea ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Ul:
        return "Fragment";
      case Wl:
        return "Profiler";
      case Dt:
        return "StrictMode";
      case zt:
        return "Suspense";
      case Xl:
        return "SuspenseList";
      case Tt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case pl:
          return "Portal";
        case Bl:
          return l.displayName || "Context";
        case $t:
          return (l._context.displayName || "Context") + ".Consumer";
        case ct:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case k:
          return t = l.displayName || null, t !== null ? t : Ut(l.type) || "Memo";
        case jl:
          t = l._payload, l = l._init;
          try {
            return Ut(l(t));
          } catch {
          }
      }
    return null;
  }
  var rt = Array.isArray, S = B.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = N.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, cl = [], ol = -1;
  function m(l) {
    return { current: l };
  }
  function T(l) {
    0 > ol || (l.current = cl[ol], cl[ol] = null, ol--);
  }
  function O(l, t) {
    ol++, cl[ol] = l.current, l.current = t;
  }
  var H = m(null), L = m(null), J = m(null), el = m(null);
  function Gl(l, t) {
    switch (O(J, t), O(L, l), O(H, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? q0(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = q0(t), l = B0(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    T(H), O(H, l);
  }
  function Sl() {
    T(H), T(L), T(J);
  }
  function pe(l) {
    l.memoizedState !== null && O(el, l);
    var t = H.current, a = B0(t, l.type);
    t !== a && (O(L, l), O(H, a));
  }
  function bu(l) {
    L.current === l && (T(H), T(L)), el.current === l && (T(el), vu._currentValue = Q);
  }
  var Xn, mf;
  function za(l) {
    if (Xn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Xn = t && t[1] || "", mf = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Xn + l + mf;
  }
  var jn = !1;
  function Zn(l, t) {
    if (!l || jn) return "";
    jn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var z = function() {
                throw Error();
              };
              if (Object.defineProperty(z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(z, []);
                } catch (g) {
                  var h = g;
                }
                Reflect.construct(l, [], z);
              } else {
                try {
                  z.call();
                } catch (g) {
                  h = g;
                }
                l.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                h = g;
              }
              (z = l()) && typeof z.catch == "function" && z.catch(function() {
              });
            }
          } catch (g) {
            if (g && h && typeof g.stack == "string")
              return [g.stack, h.stack];
          }
          return [null, null];
        }
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        e.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = e.DetermineComponentFrameRoot(), c = n[0], i = n[1];
      if (c && i) {
        var f = c.split(`
`), v = i.split(`
`);
        for (u = e = 0; e < f.length && !f[e].includes("DetermineComponentFrameRoot"); )
          e++;
        for (; u < v.length && !v[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (e === f.length || u === v.length)
          for (e = f.length - 1, u = v.length - 1; 1 <= e && 0 <= u && f[e] !== v[u]; )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== v[u]) {
            if (e !== 1 || u !== 1)
              do
                if (e--, u--, 0 > u || f[e] !== v[u]) {
                  var r = `
` + f[e].replace(" at new ", " at ");
                  return l.displayName && r.includes("<anonymous>") && (r = r.replace("<anonymous>", l.displayName)), r;
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      jn = !1, Error.prepareStackTrace = a;
    }
    return (a = l ? l.displayName || l.name : "") ? za(a) : "";
  }
  function _o(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return za(l.type);
      case 16:
        return za("Lazy");
      case 13:
        return l.child !== t && t !== null ? za("Suspense Fallback") : za("Suspense");
      case 19:
        return za("SuspenseList");
      case 0:
      case 15:
        return Zn(l.type, !1);
      case 11:
        return Zn(l.type.render, !1);
      case 1:
        return Zn(l.type, !0);
      case 31:
        return za("Activity");
      default:
        return "";
    }
  }
  function of(l) {
    try {
      var t = "", a = null;
      do
        t += _o(l, a), a = l, l = l.return;
      while (l);
      return t;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  var Ln = Object.prototype.hasOwnProperty, xn = b.unstable_scheduleCallback, Vn = b.unstable_cancelCallback, Oo = b.unstable_shouldYield, Do = b.unstable_requestPaint, Fl = b.unstable_now, Uo = b.unstable_getCurrentPriorityLevel, yf = b.unstable_ImmediatePriority, df = b.unstable_UserBlockingPriority, Eu = b.unstable_NormalPriority, No = b.unstable_LowPriority, vf = b.unstable_IdlePriority, Ho = b.log, Ro = b.unstable_setDisableYieldValue, _e = null, kl = null;
  function Wt(l) {
    if (typeof Ho == "function" && Ro(l), kl && typeof kl.setStrictMode == "function")
      try {
        kl.setStrictMode(_e, l);
      } catch {
      }
  }
  var Il = Math.clz32 ? Math.clz32 : Bo, Co = Math.log, qo = Math.LN2;
  function Bo(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Co(l) / qo | 0) | 0;
  }
  var zu = 256, Tu = 262144, Au = 4194304;
  function Ta(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
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
        return l;
    }
  }
  function Mu(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0, n = l.suspendedLanes, c = l.pingedLanes;
    l = l.warmLanes;
    var i = e & 134217727;
    return i !== 0 ? (e = i & ~n, e !== 0 ? u = Ta(e) : (c &= i, c !== 0 ? u = Ta(c) : a || (a = i & ~l, a !== 0 && (u = Ta(a))))) : (i = e & ~n, i !== 0 ? u = Ta(i) : c !== 0 ? u = Ta(c) : a || (a = e & ~l, a !== 0 && (u = Ta(a)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : u;
  }
  function Oe(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Yo(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function hf() {
    var l = Au;
    return Au <<= 1, (Au & 62914560) === 0 && (Au = 4194304), l;
  }
  function Kn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function De(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Go(l, t, a, e, u, n) {
    var c = l.pendingLanes;
    l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
    var i = l.entanglements, f = l.expirationTimes, v = l.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var r = 31 - Il(a), z = 1 << r;
      i[r] = 0, f[r] = -1;
      var h = v[r];
      if (h !== null)
        for (v[r] = null, r = 0; r < h.length; r++) {
          var g = h[r];
          g !== null && (g.lane &= -536870913);
        }
      a &= ~z;
    }
    e !== 0 && gf(l, e, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function gf(l, t, a) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var e = 31 - Il(t);
    l.entangledLanes |= t, l.entanglements[e] = l.entanglements[e] | 1073741824 | a & 261930;
  }
  function rf(l, t) {
    var a = l.entangledLanes |= t;
    for (l = l.entanglements; a; ) {
      var e = 31 - Il(a), u = 1 << e;
      u & t | l[e] & t && (l[e] |= t), a &= ~u;
    }
  }
  function Sf(l, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Jn(a), (a & (l.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Jn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function wn(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function bf() {
    var l = _.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : uo(l.type));
  }
  function Ef(l, t) {
    var a = _.p;
    try {
      return _.p = l, t();
    } finally {
      _.p = a;
    }
  }
  var Ft = Math.random().toString(36).slice(2), Nl = "__reactFiber$" + Ft, Ll = "__reactProps$" + Ft, Za = "__reactContainer$" + Ft, $n = "__reactEvents$" + Ft, Qo = "__reactListeners$" + Ft, Xo = "__reactHandles$" + Ft, zf = "__reactResources$" + Ft, Ue = "__reactMarker$" + Ft;
  function Wn(l) {
    delete l[Nl], delete l[Ll], delete l[$n], delete l[Qo], delete l[Xo];
  }
  function La(l) {
    var t = l[Nl];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if (t = a[Za] || a[Nl]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (l = L0(l); l !== null; ) {
            if (a = l[Nl]) return a;
            l = L0(l);
          }
        return t;
      }
      l = a, a = l.parentNode;
    }
    return null;
  }
  function xa(l) {
    if (l = l[Nl] || l[Za]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Ne(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function Va(l) {
    var t = l[zf];
    return t || (t = l[zf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ol(l) {
    l[Ue] = !0;
  }
  var Tf = /* @__PURE__ */ new Set(), Af = {};
  function Aa(l, t) {
    Ka(l, t), Ka(l + "Capture", t);
  }
  function Ka(l, t) {
    for (Af[l] = t, l = 0; l < t.length; l++)
      Tf.add(t[l]);
  }
  var jo = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Mf = {}, pf = {};
  function Zo(l) {
    return Ln.call(pf, l) ? !0 : Ln.call(Mf, l) ? !1 : jo.test(l) ? pf[l] = !0 : (Mf[l] = !0, !1);
  }
  function pu(l, t, a) {
    if (Zo(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function _u(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Nt(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
    }
  }
  function it(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function _f(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Lo(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var u = e.get, n = e.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(c) {
          a = "" + c, n.call(this, c);
        }
      }), Object.defineProperty(l, t, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(c) {
          a = "" + c;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Fn(l) {
    if (!l._valueTracker) {
      var t = _f(l) ? "checked" : "value";
      l._valueTracker = Lo(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Of(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), e = "";
    return l && (e = _f(l) ? l.checked ? "true" : "false" : l.value), l = e, l !== a ? (t.setValue(l), !0) : !1;
  }
  function Ou(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var xo = /[\n"\\]/g;
  function ft(l) {
    return l.replace(
      xo,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function kn(l, t, a, e, u, n, c, i) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + it(t)) : l.value !== "" + it(t) && (l.value = "" + it(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? In(l, c, it(t)) : a != null ? In(l, c, it(a)) : e != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.name = "" + it(i) : l.removeAttribute("name");
  }
  function Df(l, t, a, e, u, n, c, i) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Fn(l);
        return;
      }
      a = a != null ? "" + it(a) : "", t = t != null ? "" + it(t) : a, i || t === l.value || (l.value = t), l.defaultValue = t;
    }
    e = e ?? u, e = typeof e != "function" && typeof e != "symbol" && !!e, l.checked = i ? l.checked : !!e, l.defaultChecked = !!e, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), Fn(l);
  }
  function In(l, t, a) {
    t === "number" && Ou(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
  }
  function Ja(l, t, a, e) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < a.length; u++)
        t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        u = t.hasOwnProperty("$" + l[a].value), l[a].selected !== u && (l[a].selected = u), u && e && (l[a].defaultSelected = !0);
    } else {
      for (a = "" + it(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          l[u].selected = !0, e && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Uf(l, t, a) {
    if (t != null && (t = "" + it(t), t !== l.value && (l.value = t), a == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + it(a) : "";
  }
  function Nf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(o(92));
        if (rt(e)) {
          if (1 < e.length) throw Error(o(93));
          e = e[0];
        }
        a = e;
      }
      a == null && (a = ""), t = a;
    }
    a = it(t), l.defaultValue = a, e = l.textContent, e === a && e !== "" && e !== null && (l.value = e), Fn(l);
  }
  function wa(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Vo = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Hf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? e ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : e ? l.setProperty(t, a) : typeof a != "number" || a === 0 || Vo.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
  }
  function Rf(l, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, a != null) {
      for (var e in a)
        !a.hasOwnProperty(e) || t != null && t.hasOwnProperty(e) || (e.indexOf("--") === 0 ? l.setProperty(e, "") : e === "float" ? l.cssFloat = "" : l[e] = "");
      for (var u in t)
        e = t[u], t.hasOwnProperty(u) && a[u] !== e && Hf(l, u, e);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Hf(l, n, t[n]);
  }
  function Pn(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var Ko = /* @__PURE__ */ new Map([
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
    ["xHeight", "x-height"]
  ]), Jo = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Du(l) {
    return Jo.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ht() {
  }
  var lc = null;
  function tc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var $a = null, Wa = null;
  function Cf(l) {
    var t = xa(l);
    if (t && (l = t.stateNode)) {
      var a = l[Ll] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (kn(
            l,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + ft(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[Ll] || null;
                if (!u) throw Error(o(90));
                kn(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              e = a[t], e.form === l.form && Of(e);
          }
          break l;
        case "textarea":
          Uf(l, a.value, a.defaultValue);
          break l;
        case "select":
          t = a.value, t != null && Ja(l, !!a.multiple, t, !1);
      }
    }
  }
  var ac = !1;
  function qf(l, t, a) {
    if (ac) return l(t, a);
    ac = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (ac = !1, ($a !== null || Wa !== null) && (gn(), $a && (t = $a, l = Wa, Wa = $a = null, Cf(t), l)))
        for (t = 0; t < l.length; t++) Cf(l[t]);
    }
  }
  function He(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[Ll] || null;
    if (e === null) return null;
    a = e[t];
    l: switch (t) {
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
        (e = !e.disabled) || (l = l.type, e = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !e;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function")
      throw Error(
        o(231, t, typeof a)
      );
    return a;
  }
  var Rt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ec = !1;
  if (Rt)
    try {
      var Re = {};
      Object.defineProperty(Re, "passive", {
        get: function() {
          ec = !0;
        }
      }), window.addEventListener("test", Re, Re), window.removeEventListener("test", Re, Re);
    } catch {
      ec = !1;
    }
  var kt = null, uc = null, Uu = null;
  function Bf() {
    if (Uu) return Uu;
    var l, t = uc, a = t.length, e, u = "value" in kt ? kt.value : kt.textContent, n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++) ;
    var c = a - l;
    for (e = 1; e <= c && t[a - e] === u[n - e]; e++) ;
    return Uu = u.slice(l, 1 < e ? 1 - e : void 0);
  }
  function Nu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Hu() {
    return !0;
  }
  function Yf() {
    return !1;
  }
  function xl(l) {
    function t(a, e, u, n, c) {
      this._reactName = a, this._targetInst = u, this.type = e, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var i in l)
        l.hasOwnProperty(i) && (a = l[i], this[i] = a ? a(n) : n[i]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Hu : Yf, this.isPropagationStopped = Yf, this;
    }
    return D(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Hu);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Hu);
      },
      persist: function() {
      },
      isPersistent: Hu
    }), t;
  }
  var Ma = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ru = xl(Ma), Ce = D({}, Ma, { view: 0, detail: 0 }), wo = xl(Ce), nc, cc, qe, Cu = D({}, Ce, {
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
    getModifierState: fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== qe && (qe && l.type === "mousemove" ? (nc = l.screenX - qe.screenX, cc = l.screenY - qe.screenY) : cc = nc = 0, qe = l), nc);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : cc;
    }
  }), Gf = xl(Cu), $o = D({}, Cu, { dataTransfer: 0 }), Wo = xl($o), Fo = D({}, Ce, { relatedTarget: 0 }), ic = xl(Fo), ko = D({}, Ma, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Io = xl(ko), Po = D({}, Ma, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), ly = xl(Po), ty = D({}, Ma, { data: 0 }), Qf = xl(ty), ay = {
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
    MozPrintableKey: "Unidentified"
  }, ey = {
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
    224: "Meta"
  }, uy = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ny(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = uy[l]) ? !!t[l] : !1;
  }
  function fc() {
    return ny;
  }
  var cy = D({}, Ce, {
    key: function(l) {
      if (l.key) {
        var t = ay[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Nu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? ey[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fc,
    charCode: function(l) {
      return l.type === "keypress" ? Nu(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Nu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), iy = xl(cy), fy = D({}, Cu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Xf = xl(fy), sy = D({}, Ce, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fc
  }), my = xl(sy), oy = D({}, Ma, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yy = xl(oy), dy = D({}, Cu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vy = xl(dy), hy = D({}, Ma, {
    newState: 0,
    oldState: 0
  }), gy = xl(hy), ry = [9, 13, 27, 32], sc = Rt && "CompositionEvent" in window, Be = null;
  Rt && "documentMode" in document && (Be = document.documentMode);
  var Sy = Rt && "TextEvent" in window && !Be, jf = Rt && (!sc || Be && 8 < Be && 11 >= Be), Zf = " ", Lf = !1;
  function xf(l, t) {
    switch (l) {
      case "keyup":
        return ry.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vf(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Fa = !1;
  function by(l, t) {
    switch (l) {
      case "compositionend":
        return Vf(t);
      case "keypress":
        return t.which !== 32 ? null : (Lf = !0, Zf);
      case "textInput":
        return l = t.data, l === Zf && Lf ? null : l;
      default:
        return null;
    }
  }
  function Ey(l, t) {
    if (Fa)
      return l === "compositionend" || !sc && xf(l, t) ? (l = Bf(), Uu = uc = kt = null, Fa = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return jf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var zy = {
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
    week: !0
  };
  function Kf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!zy[l.type] : t === "textarea";
  }
  function Jf(l, t, a, e) {
    $a ? Wa ? Wa.push(e) : Wa = [e] : $a = e, t = An(t, "onChange"), 0 < t.length && (a = new Ru(
      "onChange",
      "change",
      null,
      a,
      e
    ), l.push({ event: a, listeners: t }));
  }
  var Ye = null, Ge = null;
  function Ty(l) {
    D0(l, 0);
  }
  function qu(l) {
    var t = Ne(l);
    if (Of(t)) return l;
  }
  function wf(l, t) {
    if (l === "change") return t;
  }
  var $f = !1;
  if (Rt) {
    var mc;
    if (Rt) {
      var oc = "oninput" in document;
      if (!oc) {
        var Wf = document.createElement("div");
        Wf.setAttribute("oninput", "return;"), oc = typeof Wf.oninput == "function";
      }
      mc = oc;
    } else mc = !1;
    $f = mc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ff() {
    Ye && (Ye.detachEvent("onpropertychange", kf), Ge = Ye = null);
  }
  function kf(l) {
    if (l.propertyName === "value" && qu(Ge)) {
      var t = [];
      Jf(
        t,
        Ge,
        l,
        tc(l)
      ), qf(Ty, t);
    }
  }
  function Ay(l, t, a) {
    l === "focusin" ? (Ff(), Ye = t, Ge = a, Ye.attachEvent("onpropertychange", kf)) : l === "focusout" && Ff();
  }
  function My(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return qu(Ge);
  }
  function py(l, t) {
    if (l === "click") return qu(t);
  }
  function _y(l, t) {
    if (l === "input" || l === "change")
      return qu(t);
  }
  function Oy(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Pl = typeof Object.is == "function" ? Object.is : Oy;
  function Qe(l, t) {
    if (Pl(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(l), e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Ln.call(t, u) || !Pl(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function If(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Pf(l, t) {
    var a = If(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (e = l + a.textContent.length, l <= t && e >= t)
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = If(a);
    }
  }
  function ls(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ls(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ts(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Ou(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = Ou(l.document);
    }
    return t;
  }
  function yc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Dy = Rt && "documentMode" in document && 11 >= document.documentMode, ka = null, dc = null, Xe = null, vc = !1;
  function as(l, t, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    vc || ka == null || ka !== Ou(e) || (e = ka, "selectionStart" in e && yc(e) ? e = { start: e.selectionStart, end: e.selectionEnd } : (e = (e.ownerDocument && e.ownerDocument.defaultView || window).getSelection(), e = {
      anchorNode: e.anchorNode,
      anchorOffset: e.anchorOffset,
      focusNode: e.focusNode,
      focusOffset: e.focusOffset
    }), Xe && Qe(Xe, e) || (Xe = e, e = An(dc, "onSelect"), 0 < e.length && (t = new Ru(
      "onSelect",
      "select",
      null,
      t,
      a
    ), l.push({ event: t, listeners: e }), t.target = ka)));
  }
  function pa(l, t) {
    var a = {};
    return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
  }
  var Ia = {
    animationend: pa("Animation", "AnimationEnd"),
    animationiteration: pa("Animation", "AnimationIteration"),
    animationstart: pa("Animation", "AnimationStart"),
    transitionrun: pa("Transition", "TransitionRun"),
    transitionstart: pa("Transition", "TransitionStart"),
    transitioncancel: pa("Transition", "TransitionCancel"),
    transitionend: pa("Transition", "TransitionEnd")
  }, hc = {}, es = {};
  Rt && (es = document.createElement("div").style, "AnimationEvent" in window || (delete Ia.animationend.animation, delete Ia.animationiteration.animation, delete Ia.animationstart.animation), "TransitionEvent" in window || delete Ia.transitionend.transition);
  function _a(l) {
    if (hc[l]) return hc[l];
    if (!Ia[l]) return l;
    var t = Ia[l], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in es)
        return hc[l] = t[a];
    return l;
  }
  var us = _a("animationend"), ns = _a("animationiteration"), cs = _a("animationstart"), Uy = _a("transitionrun"), Ny = _a("transitionstart"), Hy = _a("transitioncancel"), is = _a("transitionend"), fs = /* @__PURE__ */ new Map(), gc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  gc.push("scrollEnd");
  function St(l, t) {
    fs.set(l, t), Aa(t, [l]);
  }
  var Bu = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, st = [], Pa = 0, rc = 0;
  function Yu() {
    for (var l = Pa, t = rc = Pa = 0; t < l; ) {
      var a = st[t];
      st[t++] = null;
      var e = st[t];
      st[t++] = null;
      var u = st[t];
      st[t++] = null;
      var n = st[t];
      if (st[t++] = null, e !== null && u !== null) {
        var c = e.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), e.pending = u;
      }
      n !== 0 && ss(a, u, n);
    }
  }
  function Gu(l, t, a, e) {
    st[Pa++] = l, st[Pa++] = t, st[Pa++] = a, st[Pa++] = e, rc |= e, l.lanes |= e, l = l.alternate, l !== null && (l.lanes |= e);
  }
  function Sc(l, t, a, e) {
    return Gu(l, t, a, e), Qu(l);
  }
  function Oa(l, t) {
    return Gu(l, null, null, t), Qu(l);
  }
  function ss(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= a, e = n.alternate, e !== null && (e.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Il(a), l = n.hiddenUpdates, e = l[u], e === null ? l[u] = [t] : e.push(t), t.lane = a | 536870912), n) : null;
  }
  function Qu(l) {
    if (50 < iu)
      throw iu = 0, Oi = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var le = {};
  function Ry(l, t, a, e) {
    this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = e, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function lt(l, t, a, e) {
    return new Ry(l, t, a, e);
  }
  function bc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Ct(l, t) {
    var a = l.alternate;
    return a === null ? (a = lt(
      l.tag,
      t,
      l.key,
      l.mode
    ), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
  }
  function ms(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Xu(l, t, a, e, u, n) {
    var c = 0;
    if (e = l, typeof l == "function") bc(l) && (c = 1);
    else if (typeof l == "string")
      c = Gd(
        l,
        a,
        H.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Tt:
          return l = lt(31, a, t, u), l.elementType = Tt, l.lanes = n, l;
        case Ul:
          return Da(a.children, u, n, t);
        case Dt:
          c = 8, u |= 24;
          break;
        case Wl:
          return l = lt(12, a, t, u | 2), l.elementType = Wl, l.lanes = n, l;
        case zt:
          return l = lt(13, a, t, u), l.elementType = zt, l.lanes = n, l;
        case Xl:
          return l = lt(19, a, t, u), l.elementType = Xl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Bl:
                c = 10;
                break l;
              case $t:
                c = 9;
                break l;
              case ct:
                c = 11;
                break l;
              case k:
                c = 14;
                break l;
              case jl:
                c = 16, e = null;
                break l;
            }
          c = 29, a = Error(
            o(130, l === null ? "null" : typeof l, "")
          ), e = null;
      }
    return t = lt(c, a, t, u), t.elementType = l, t.type = e, t.lanes = n, t;
  }
  function Da(l, t, a, e) {
    return l = lt(7, l, e, t), l.lanes = a, l;
  }
  function Ec(l, t, a) {
    return l = lt(6, l, null, t), l.lanes = a, l;
  }
  function os(l) {
    var t = lt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function zc(l, t, a) {
    return t = lt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var ys = /* @__PURE__ */ new WeakMap();
  function mt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = ys.get(l);
      return a !== void 0 ? a : (t = {
        value: l,
        source: t,
        stack: of(t)
      }, ys.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: of(t)
    };
  }
  var te = [], ae = 0, ju = null, je = 0, ot = [], yt = 0, It = null, Mt = 1, pt = "";
  function qt(l, t) {
    te[ae++] = je, te[ae++] = ju, ju = l, je = t;
  }
  function ds(l, t, a) {
    ot[yt++] = Mt, ot[yt++] = pt, ot[yt++] = It, It = l;
    var e = Mt;
    l = pt;
    var u = 32 - Il(e) - 1;
    e &= ~(1 << u), a += 1;
    var n = 32 - Il(t) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (e & (1 << c) - 1).toString(32), e >>= c, u -= c, Mt = 1 << 32 - Il(t) + u | a << u | e, pt = n + l;
    } else
      Mt = 1 << n | a << u | e, pt = l;
  }
  function Tc(l) {
    l.return !== null && (qt(l, 1), ds(l, 1, 0));
  }
  function Ac(l) {
    for (; l === ju; )
      ju = te[--ae], te[ae] = null, je = te[--ae], te[ae] = null;
    for (; l === It; )
      It = ot[--yt], ot[yt] = null, pt = ot[--yt], ot[yt] = null, Mt = ot[--yt], ot[yt] = null;
  }
  function vs(l, t) {
    ot[yt++] = Mt, ot[yt++] = pt, ot[yt++] = It, Mt = t.id, pt = t.overflow, It = l;
  }
  var Hl = null, dl = null, I = !1, Pt = null, dt = !1, Mc = Error(o(519));
  function la(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ze(mt(t, l)), Mc;
  }
  function hs(l) {
    var t = l.stateNode, a = l.type, e = l.memoizedProps;
    switch (t[Nl] = l, t[Ll] = e, a) {
      case "dialog":
        $("cancel", t), $("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        $("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < su.length; a++)
          $(su[a], t);
        break;
      case "source":
        $("error", t);
        break;
      case "img":
      case "image":
      case "link":
        $("error", t), $("load", t);
        break;
      case "details":
        $("toggle", t);
        break;
      case "input":
        $("invalid", t), Df(
          t,
          e.value,
          e.defaultValue,
          e.checked,
          e.defaultChecked,
          e.type,
          e.name,
          !0
        );
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        $("invalid", t), Nf(t, e.value, e.defaultValue, e.children);
    }
    a = e.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || e.suppressHydrationWarning === !0 || R0(t.textContent, a) ? (e.popover != null && ($("beforetoggle", t), $("toggle", t)), e.onScroll != null && $("scroll", t), e.onScrollEnd != null && $("scrollend", t), e.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || la(l, !0);
  }
  function gs(l) {
    for (Hl = l.return; Hl; )
      switch (Hl.tag) {
        case 5:
        case 31:
        case 13:
          dt = !1;
          return;
        case 27:
        case 3:
          dt = !0;
          return;
        default:
          Hl = Hl.return;
      }
  }
  function ee(l) {
    if (l !== Hl) return !1;
    if (!I) return gs(l), I = !0, !1;
    var t = l.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || Li(l.type, l.memoizedProps)), a = !a), a && dl && la(l), gs(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      dl = Z0(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      dl = Z0(l);
    } else
      t === 27 ? (t = dl, va(l.type) ? (l = wi, wi = null, dl = l) : dl = t) : dl = Hl ? ht(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ua() {
    dl = Hl = null, I = !1;
  }
  function pc() {
    var l = Pt;
    return l !== null && (wl === null ? wl = l : wl.push.apply(
      wl,
      l
    ), Pt = null), l;
  }
  function Ze(l) {
    Pt === null ? Pt = [l] : Pt.push(l);
  }
  var _c = m(null), Na = null, Bt = null;
  function ta(l, t, a) {
    O(_c, t._currentValue), t._currentValue = a;
  }
  function Yt(l) {
    l._currentValue = _c.current, T(_c);
  }
  function Oc(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, e !== null && (e.childLanes |= t)) : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t), l === a) break;
      l = l.return;
    }
  }
  function Dc(l, t, a, e) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (i.context === t[f]) {
              n.lanes |= a, i = n.alternate, i !== null && (i.lanes |= a), Oc(
                n.return,
                a,
                l
              ), e || (c = null);
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(o(341));
        c.lanes |= a, n = c.alternate, n !== null && (n.lanes |= a), Oc(c, a, l), c = null;
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (u = c.sibling, u !== null) {
            u.return = c.return, c = u;
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function ue(l, t, a, e) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var i = u.type;
          Pl(u.pendingProps.value, c.value) || (l !== null ? l.push(i) : l = [i]);
        }
      } else if (u === el.current) {
        if (c = u.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(vu) : l = [vu]);
      }
      u = u.return;
    }
    l !== null && Dc(
      t,
      l,
      a,
      e
    ), t.flags |= 262144;
  }
  function Zu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Pl(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ha(l) {
    Na = l, Bt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Rl(l) {
    return rs(Na, l);
  }
  function Lu(l, t) {
    return Na === null && Ha(l), rs(l, t);
  }
  function rs(l, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Bt === null) {
      if (l === null) throw Error(o(308));
      Bt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Bt = Bt.next = t;
    return a;
  }
  var Cy = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, e) {
        l.push(e);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(a) {
        return a();
      });
    };
  }, qy = b.unstable_scheduleCallback, By = b.unstable_NormalPriority, zl = {
    $$typeof: Bl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Uc() {
    return {
      controller: new Cy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Le(l) {
    l.refCount--, l.refCount === 0 && qy(By, function() {
      l.controller.abort();
    });
  }
  var xe = null, Nc = 0, ne = 0, ce = null;
  function Yy(l, t) {
    if (xe === null) {
      var a = xe = [];
      Nc = 0, ne = Ci(), ce = {
        status: "pending",
        value: void 0,
        then: function(e) {
          a.push(e);
        }
      };
    }
    return Nc++, t.then(Ss, Ss), t;
  }
  function Ss() {
    if (--Nc === 0 && xe !== null) {
      ce !== null && (ce.status = "fulfilled");
      var l = xe;
      xe = null, ne = 0, ce = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Gy(l, t) {
    var a = [], e = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return l.then(
      function() {
        e.status = "fulfilled", e.value = t;
        for (var u = 0; u < a.length; u++) (0, a[u])(t);
      },
      function(u) {
        for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), e;
  }
  var bs = S.S;
  S.S = function(l, t) {
    a0 = Fl(), typeof t == "object" && t !== null && typeof t.then == "function" && Yy(l, t), bs !== null && bs(l, t);
  };
  var Ra = m(null);
  function Hc() {
    var l = Ra.current;
    return l !== null ? l : yl.pooledCache;
  }
  function xu(l, t) {
    t === null ? O(Ra, Ra.current) : O(Ra, t.pool);
  }
  function Es() {
    var l = Hc();
    return l === null ? null : { parent: zl._currentValue, pool: l };
  }
  var ie = Error(o(460)), Rc = Error(o(474)), Vu = Error(o(542)), Ku = { then: function() {
  } };
  function zs(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ts(l, t, a) {
    switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(Ht, Ht), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ms(l), l;
      default:
        if (typeof t.status == "string") t.then(Ht, Ht);
        else {
          if (l = yl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(o(482));
          l = t, l.status = "pending", l.then(
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = e;
              }
            },
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = e;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Ms(l), l;
        }
        throw qa = t, ie;
    }
  }
  function Ca(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (qa = a, ie) : a;
    }
  }
  var qa = null;
  function As() {
    if (qa === null) throw Error(o(459));
    var l = qa;
    return qa = null, l;
  }
  function Ms(l) {
    if (l === ie || l === Vu)
      throw Error(o(483));
  }
  var fe = null, Ve = 0;
  function Ju(l) {
    var t = Ve;
    return Ve += 1, fe === null && (fe = []), Ts(fe, l, t);
  }
  function Ke(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function wu(l, t) {
    throw t.$$typeof === q ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function ps(l) {
    function t(y, s) {
      if (l) {
        var d = y.deletions;
        d === null ? (y.deletions = [s], y.flags |= 16) : d.push(s);
      }
    }
    function a(y, s) {
      if (!l) return null;
      for (; s !== null; )
        t(y, s), s = s.sibling;
      return null;
    }
    function e(y) {
      for (var s = /* @__PURE__ */ new Map(); y !== null; )
        y.key !== null ? s.set(y.key, y) : s.set(y.index, y), y = y.sibling;
      return s;
    }
    function u(y, s) {
      return y = Ct(y, s), y.index = 0, y.sibling = null, y;
    }
    function n(y, s, d) {
      return y.index = d, l ? (d = y.alternate, d !== null ? (d = d.index, d < s ? (y.flags |= 67108866, s) : d) : (y.flags |= 67108866, s)) : (y.flags |= 1048576, s);
    }
    function c(y) {
      return l && y.alternate === null && (y.flags |= 67108866), y;
    }
    function i(y, s, d, E) {
      return s === null || s.tag !== 6 ? (s = Ec(d, y.mode, E), s.return = y, s) : (s = u(s, d), s.return = y, s);
    }
    function f(y, s, d, E) {
      var Y = d.type;
      return Y === Ul ? r(
        y,
        s,
        d.props.children,
        E,
        d.key
      ) : s !== null && (s.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === jl && Ca(Y) === s.type) ? (s = u(s, d.props), Ke(s, d), s.return = y, s) : (s = Xu(
        d.type,
        d.key,
        d.props,
        null,
        y.mode,
        E
      ), Ke(s, d), s.return = y, s);
    }
    function v(y, s, d, E) {
      return s === null || s.tag !== 4 || s.stateNode.containerInfo !== d.containerInfo || s.stateNode.implementation !== d.implementation ? (s = zc(d, y.mode, E), s.return = y, s) : (s = u(s, d.children || []), s.return = y, s);
    }
    function r(y, s, d, E, Y) {
      return s === null || s.tag !== 7 ? (s = Da(
        d,
        y.mode,
        E,
        Y
      ), s.return = y, s) : (s = u(s, d), s.return = y, s);
    }
    function z(y, s, d) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
        return s = Ec(
          "" + s,
          y.mode,
          d
        ), s.return = y, s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case ml:
            return d = Xu(
              s.type,
              s.key,
              s.props,
              null,
              y.mode,
              d
            ), Ke(d, s), d.return = y, d;
          case pl:
            return s = zc(
              s,
              y.mode,
              d
            ), s.return = y, s;
          case jl:
            return s = Ca(s), z(y, s, d);
        }
        if (rt(s) || Zl(s))
          return s = Da(
            s,
            y.mode,
            d,
            null
          ), s.return = y, s;
        if (typeof s.then == "function")
          return z(y, Ju(s), d);
        if (s.$$typeof === Bl)
          return z(
            y,
            Lu(y, s),
            d
          );
        wu(y, s);
      }
      return null;
    }
    function h(y, s, d, E) {
      var Y = s !== null ? s.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return Y !== null ? null : i(y, s, "" + d, E);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case ml:
            return d.key === Y ? f(y, s, d, E) : null;
          case pl:
            return d.key === Y ? v(y, s, d, E) : null;
          case jl:
            return d = Ca(d), h(y, s, d, E);
        }
        if (rt(d) || Zl(d))
          return Y !== null ? null : r(y, s, d, E, null);
        if (typeof d.then == "function")
          return h(
            y,
            s,
            Ju(d),
            E
          );
        if (d.$$typeof === Bl)
          return h(
            y,
            s,
            Lu(y, d),
            E
          );
        wu(y, d);
      }
      return null;
    }
    function g(y, s, d, E, Y) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return y = y.get(d) || null, i(s, y, "" + E, Y);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ml:
            return y = y.get(
              E.key === null ? d : E.key
            ) || null, f(s, y, E, Y);
          case pl:
            return y = y.get(
              E.key === null ? d : E.key
            ) || null, v(s, y, E, Y);
          case jl:
            return E = Ca(E), g(
              y,
              s,
              d,
              E,
              Y
            );
        }
        if (rt(E) || Zl(E))
          return y = y.get(d) || null, r(s, y, E, Y, null);
        if (typeof E.then == "function")
          return g(
            y,
            s,
            d,
            Ju(E),
            Y
          );
        if (E.$$typeof === Bl)
          return g(
            y,
            s,
            d,
            Lu(s, E),
            Y
          );
        wu(s, E);
      }
      return null;
    }
    function U(y, s, d, E) {
      for (var Y = null, ll = null, R = s, V = s = 0, F = null; R !== null && V < d.length; V++) {
        R.index > V ? (F = R, R = null) : F = R.sibling;
        var tl = h(
          y,
          R,
          d[V],
          E
        );
        if (tl === null) {
          R === null && (R = F);
          break;
        }
        l && R && tl.alternate === null && t(y, R), s = n(tl, s, V), ll === null ? Y = tl : ll.sibling = tl, ll = tl, R = F;
      }
      if (V === d.length)
        return a(y, R), I && qt(y, V), Y;
      if (R === null) {
        for (; V < d.length; V++)
          R = z(y, d[V], E), R !== null && (s = n(
            R,
            s,
            V
          ), ll === null ? Y = R : ll.sibling = R, ll = R);
        return I && qt(y, V), Y;
      }
      for (R = e(R); V < d.length; V++)
        F = g(
          R,
          y,
          V,
          d[V],
          E
        ), F !== null && (l && F.alternate !== null && R.delete(
          F.key === null ? V : F.key
        ), s = n(
          F,
          s,
          V
        ), ll === null ? Y = F : ll.sibling = F, ll = F);
      return l && R.forEach(function(ba) {
        return t(y, ba);
      }), I && qt(y, V), Y;
    }
    function G(y, s, d, E) {
      if (d == null) throw Error(o(151));
      for (var Y = null, ll = null, R = s, V = s = 0, F = null, tl = d.next(); R !== null && !tl.done; V++, tl = d.next()) {
        R.index > V ? (F = R, R = null) : F = R.sibling;
        var ba = h(y, R, tl.value, E);
        if (ba === null) {
          R === null && (R = F);
          break;
        }
        l && R && ba.alternate === null && t(y, R), s = n(ba, s, V), ll === null ? Y = ba : ll.sibling = ba, ll = ba, R = F;
      }
      if (tl.done)
        return a(y, R), I && qt(y, V), Y;
      if (R === null) {
        for (; !tl.done; V++, tl = d.next())
          tl = z(y, tl.value, E), tl !== null && (s = n(tl, s, V), ll === null ? Y = tl : ll.sibling = tl, ll = tl);
        return I && qt(y, V), Y;
      }
      for (R = e(R); !tl.done; V++, tl = d.next())
        tl = g(R, y, V, tl.value, E), tl !== null && (l && tl.alternate !== null && R.delete(tl.key === null ? V : tl.key), s = n(tl, s, V), ll === null ? Y = tl : ll.sibling = tl, ll = tl);
      return l && R.forEach(function($d) {
        return t(y, $d);
      }), I && qt(y, V), Y;
    }
    function sl(y, s, d, E) {
      if (typeof d == "object" && d !== null && d.type === Ul && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case ml:
            l: {
              for (var Y = d.key; s !== null; ) {
                if (s.key === Y) {
                  if (Y = d.type, Y === Ul) {
                    if (s.tag === 7) {
                      a(
                        y,
                        s.sibling
                      ), E = u(
                        s,
                        d.props.children
                      ), E.return = y, y = E;
                      break l;
                    }
                  } else if (s.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === jl && Ca(Y) === s.type) {
                    a(
                      y,
                      s.sibling
                    ), E = u(s, d.props), Ke(E, d), E.return = y, y = E;
                    break l;
                  }
                  a(y, s);
                  break;
                } else t(y, s);
                s = s.sibling;
              }
              d.type === Ul ? (E = Da(
                d.props.children,
                y.mode,
                E,
                d.key
              ), E.return = y, y = E) : (E = Xu(
                d.type,
                d.key,
                d.props,
                null,
                y.mode,
                E
              ), Ke(E, d), E.return = y, y = E);
            }
            return c(y);
          case pl:
            l: {
              for (Y = d.key; s !== null; ) {
                if (s.key === Y)
                  if (s.tag === 4 && s.stateNode.containerInfo === d.containerInfo && s.stateNode.implementation === d.implementation) {
                    a(
                      y,
                      s.sibling
                    ), E = u(s, d.children || []), E.return = y, y = E;
                    break l;
                  } else {
                    a(y, s);
                    break;
                  }
                else t(y, s);
                s = s.sibling;
              }
              E = zc(d, y.mode, E), E.return = y, y = E;
            }
            return c(y);
          case jl:
            return d = Ca(d), sl(
              y,
              s,
              d,
              E
            );
        }
        if (rt(d))
          return U(
            y,
            s,
            d,
            E
          );
        if (Zl(d)) {
          if (Y = Zl(d), typeof Y != "function") throw Error(o(150));
          return d = Y.call(d), G(
            y,
            s,
            d,
            E
          );
        }
        if (typeof d.then == "function")
          return sl(
            y,
            s,
            Ju(d),
            E
          );
        if (d.$$typeof === Bl)
          return sl(
            y,
            s,
            Lu(y, d),
            E
          );
        wu(y, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, s !== null && s.tag === 6 ? (a(y, s.sibling), E = u(s, d), E.return = y, y = E) : (a(y, s), E = Ec(d, y.mode, E), E.return = y, y = E), c(y)) : a(y, s);
    }
    return function(y, s, d, E) {
      try {
        Ve = 0;
        var Y = sl(
          y,
          s,
          d,
          E
        );
        return fe = null, Y;
      } catch (R) {
        if (R === ie || R === Vu) throw R;
        var ll = lt(29, R, null, y.mode);
        return ll.lanes = E, ll.return = y, ll;
      }
    };
  }
  var Ba = ps(!0), _s = ps(!1), aa = !1;
  function Cc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ea(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ua(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (e = e.shared, (al & 2) !== 0) {
      var u = e.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), e.pending = t, t = Qu(l), ss(l, null, a), t;
    }
    return Gu(l, e, t, a), Qu(l);
  }
  function Je(l, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, rf(l, a);
    }
  }
  function Bc(l, t) {
    var a = l.updateQueue, e = l.alternate;
    if (e !== null && (e = e.updateQueue, a === e)) {
      var u = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = c : n = n.next = c, a = a.next;
        } while (a !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks
      }, l.updateQueue = a;
      return;
    }
    l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
  }
  var Yc = !1;
  function we() {
    if (Yc) {
      var l = ce;
      if (l !== null) throw l;
    }
  }
  function $e(l, t, a, e) {
    Yc = !1;
    var u = l.updateQueue;
    aa = !1;
    var n = u.firstBaseUpdate, c = u.lastBaseUpdate, i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var f = i, v = f.next;
      f.next = null, c === null ? n = v : c.next = v, c = f;
      var r = l.alternate;
      r !== null && (r = r.updateQueue, i = r.lastBaseUpdate, i !== c && (i === null ? r.firstBaseUpdate = v : i.next = v, r.lastBaseUpdate = f));
    }
    if (n !== null) {
      var z = u.baseState;
      c = 0, r = v = f = null, i = n;
      do {
        var h = i.lane & -536870913, g = h !== i.lane;
        if (g ? (W & h) === h : (e & h) === h) {
          h !== 0 && h === ne && (Yc = !0), r !== null && (r = r.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, G = i;
            h = t;
            var sl = a;
            switch (G.tag) {
              case 1:
                if (U = G.payload, typeof U == "function") {
                  z = U.call(sl, z, h);
                  break l;
                }
                z = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = G.payload, h = typeof U == "function" ? U.call(sl, z, h) : U, h == null) break l;
                z = D({}, z, h);
                break l;
              case 2:
                aa = !0;
            }
          }
          h = i.callback, h !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [h] : g.push(h));
        } else
          g = {
            lane: h,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, r === null ? (v = r = g, f = z) : r = r.next = g, c |= h;
        if (i = i.next, i === null) {
          if (i = u.shared.pending, i === null)
            break;
          g = i, i = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      r === null && (f = z), u.baseState = f, u.firstBaseUpdate = v, u.lastBaseUpdate = r, n === null && (u.shared.lanes = 0), sa |= c, l.lanes = c, l.memoizedState = z;
    }
  }
  function Os(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Ds(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++)
        Os(a[l], t);
  }
  var se = m(null), $u = m(0);
  function Us(l, t) {
    l = Kt, O($u, l), O(se, t), Kt = l | t.baseLanes;
  }
  function Gc() {
    O($u, Kt), O(se, se.current);
  }
  function Qc() {
    Kt = $u.current, T(se), T($u);
  }
  var tt = m(null), vt = null;
  function na(l) {
    var t = l.alternate;
    O(bl, bl.current & 1), O(tt, l), vt === null && (t === null || se.current !== null || t.memoizedState !== null) && (vt = l);
  }
  function Xc(l) {
    O(bl, bl.current), O(tt, l), vt === null && (vt = l);
  }
  function Ns(l) {
    l.tag === 22 ? (O(bl, bl.current), O(tt, l), vt === null && (vt = l)) : ca();
  }
  function ca() {
    O(bl, bl.current), O(tt, tt.current);
  }
  function at(l) {
    T(tt), vt === l && (vt = null), T(bl);
  }
  var bl = m(0);
  function Wu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Ki(a) || Ji(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Gt = 0, x = null, il = null, Tl = null, Fu = !1, me = !1, Ya = !1, ku = 0, We = 0, oe = null, Qy = 0;
  function gl() {
    throw Error(o(321));
  }
  function jc(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!Pl(l[a], t[a])) return !1;
    return !0;
  }
  function Zc(l, t, a, e, u, n) {
    return Gt = n, x = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = l === null || l.memoizedState === null ? dm : ai, Ya = !1, n = a(e, u), Ya = !1, me && (n = Rs(
      t,
      a,
      e,
      u
    )), Hs(l), n;
  }
  function Hs(l) {
    S.H = Ie;
    var t = il !== null && il.next !== null;
    if (Gt = 0, Tl = il = x = null, Fu = !1, We = 0, oe = null, t) throw Error(o(300));
    l === null || Al || (l = l.dependencies, l !== null && Zu(l) && (Al = !0));
  }
  function Rs(l, t, a, e) {
    x = l;
    var u = 0;
    do {
      if (me && (oe = null), We = 0, me = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Tl = il = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      S.H = vm, n = t(a, e);
    } while (me);
    return n;
  }
  function Xy() {
    var l = S.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Fe(t) : t, l = l.useState()[0], (il !== null ? il.memoizedState : null) !== l && (x.flags |= 1024), t;
  }
  function Lc() {
    var l = ku !== 0;
    return ku = 0, l;
  }
  function xc(l, t, a) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
  }
  function Vc(l) {
    if (Fu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Fu = !1;
    }
    Gt = 0, Tl = il = x = null, me = !1, We = ku = 0, oe = null;
  }
  function Ql() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Tl === null ? x.memoizedState = Tl = l : Tl = Tl.next = l, Tl;
  }
  function El() {
    if (il === null) {
      var l = x.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = il.next;
    var t = Tl === null ? x.memoizedState : Tl.next;
    if (t !== null)
      Tl = t, il = l;
    else {
      if (l === null)
        throw x.alternate === null ? Error(o(467)) : Error(o(310));
      il = l, l = {
        memoizedState: il.memoizedState,
        baseState: il.baseState,
        baseQueue: il.baseQueue,
        queue: il.queue,
        next: null
      }, Tl === null ? x.memoizedState = Tl = l : Tl = Tl.next = l;
    }
    return Tl;
  }
  function Iu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fe(l) {
    var t = We;
    return We += 1, oe === null && (oe = []), l = Ts(oe, l, t), t = x, (Tl === null ? t.memoizedState : Tl.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? dm : ai), l;
  }
  function Pu(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Fe(l);
      if (l.$$typeof === Bl) return Rl(l);
    }
    throw Error(o(438, String(l)));
  }
  function Kc(l) {
    var t = null, a = x.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var e = x.alternate;
      e !== null && (e = e.updateQueue, e !== null && (e = e.memoCache, e != null && (t = {
        data: e.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Iu(), x.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++)
        a[e] = ja;
    return t.index++, a;
  }
  function Qt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function ln(l) {
    var t = El();
    return Jc(t, il, l);
  }
  function Jc(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue, n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        u.next = n.next, n.next = c;
      }
      t.baseQueue = u = n, e.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var i = c = null, f = null, v = t, r = !1;
      do {
        var z = v.lane & -536870913;
        if (z !== v.lane ? (W & z) === z : (Gt & z) === z) {
          var h = v.revertLane;
          if (h === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }), z === ne && (r = !0);
          else if ((Gt & h) === h) {
            v = v.next, h === ne && (r = !0);
            continue;
          } else
            z = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, f === null ? (i = f = z, c = n) : f = f.next = z, x.lanes |= h, sa |= h;
          z = v.action, Ya && a(n, z), n = v.hasEagerState ? v.eagerState : a(n, z);
        } else
          h = {
            lane: z,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, f === null ? (i = f = h, c = n) : f = f.next = h, x.lanes |= z, sa |= z;
        v = v.next;
      } while (v !== null && v !== t);
      if (f === null ? c = n : f.next = i, !Pl(n, l.memoizedState) && (Al = !0, r && (a = ce, a !== null)))
        throw a;
      l.memoizedState = n, l.baseState = c, l.baseQueue = f, e.lastRenderedState = n;
    }
    return u === null && (e.lanes = 0), [l.memoizedState, e.dispatch];
  }
  function wc(l) {
    var t = El(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch, u = a.pending, n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var c = u = u.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== u);
      Pl(n, t.memoizedState) || (Al = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
    }
    return [n, e];
  }
  function Cs(l, t, a) {
    var e = x, u = El(), n = I;
    if (n) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !Pl(
      (il || u).memoizedState,
      a
    );
    if (c && (u.memoizedState = a, Al = !0), u = u.queue, Fc(Ys.bind(null, e, u, l), [
      l
    ]), u.getSnapshot !== t || c || Tl !== null && Tl.memoizedState.tag & 1) {
      if (e.flags |= 2048, ye(
        9,
        { destroy: void 0 },
        Bs.bind(
          null,
          e,
          u,
          a,
          t
        ),
        null
      ), yl === null) throw Error(o(349));
      n || (Gt & 127) !== 0 || qs(e, t, a);
    }
    return a;
  }
  function qs(l, t, a) {
    l.flags |= 16384, l = { getSnapshot: t, value: a }, t = x.updateQueue, t === null ? (t = Iu(), x.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
  }
  function Bs(l, t, a, e) {
    t.value = a, t.getSnapshot = e, Gs(t) && Qs(l);
  }
  function Ys(l, t, a) {
    return a(function() {
      Gs(t) && Qs(l);
    });
  }
  function Gs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !Pl(l, a);
    } catch {
      return !0;
    }
  }
  function Qs(l) {
    var t = Oa(l, 2);
    t !== null && $l(t, l, 2);
  }
  function $c(l) {
    var t = Ql();
    if (typeof l == "function") {
      var a = l;
      if (l = a(), Ya) {
        Wt(!0);
        try {
          a();
        } finally {
          Wt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qt,
      lastRenderedState: l
    }, t;
  }
  function Xs(l, t, a, e) {
    return l.baseState = a, Jc(
      l,
      il,
      typeof e == "function" ? e : Qt
    );
  }
  function jy(l, t, a, e, u) {
    if (en(l)) throw Error(o(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          n.listeners.push(c);
        }
      };
      S.T !== null ? a(!0) : n.isTransition = !1, e(n), a = t.pending, a === null ? (n.next = t.pending = n, js(t, n)) : (n.next = a.next, t.pending = a.next = n);
    }
  }
  function js(l, t) {
    var a = t.action, e = t.payload, u = l.state;
    if (t.isTransition) {
      var n = S.T, c = {};
      S.T = c;
      try {
        var i = a(u, e), f = S.S;
        f !== null && f(c, i), Zs(l, t, i);
      } catch (v) {
        Wc(l, t, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), S.T = n;
      }
    } else
      try {
        n = a(u, e), Zs(l, t, n);
      } catch (v) {
        Wc(l, t, v);
      }
  }
  function Zs(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(e) {
        Ls(l, t, e);
      },
      function(e) {
        return Wc(l, t, e);
      }
    ) : Ls(l, t, a);
  }
  function Ls(l, t, a) {
    t.status = "fulfilled", t.value = a, xs(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, js(l, a)));
  }
  function Wc(l, t, a) {
    var e = l.pending;
    if (l.pending = null, e !== null) {
      e = e.next;
      do
        t.status = "rejected", t.reason = a, xs(t), t = t.next;
      while (t !== e);
    }
    l.action = null;
  }
  function xs(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Vs(l, t) {
    return t;
  }
  function Ks(l, t) {
    if (I) {
      var a = yl.formState;
      if (a !== null) {
        l: {
          var e = x;
          if (I) {
            if (dl) {
              t: {
                for (var u = dl, n = dt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = ht(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                dl = ht(
                  u.nextSibling
                ), e = u.data === "F!";
                break l;
              }
            }
            la(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return a = Ql(), a.memoizedState = a.baseState = t, e = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vs,
      lastRenderedState: t
    }, a.queue = e, a = mm.bind(
      null,
      x,
      e
    ), e.dispatch = a, e = $c(!1), n = ti.bind(
      null,
      x,
      !1,
      e.queue
    ), e = Ql(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, e.queue = u, a = jy.bind(
      null,
      x,
      u,
      n,
      a
    ), u.dispatch = a, e.memoizedState = l, [t, a, !1];
  }
  function Js(l) {
    var t = El();
    return ws(t, il, l);
  }
  function ws(l, t, a) {
    if (t = Jc(
      l,
      t,
      Vs
    )[0], l = ln(Qt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var e = Fe(t);
      } catch (c) {
        throw c === ie ? Vu : c;
      }
    else e = t;
    t = El();
    var u = t.queue, n = u.dispatch;
    return a !== t.memoizedState && (x.flags |= 2048, ye(
      9,
      { destroy: void 0 },
      Zy.bind(null, u, a),
      null
    )), [e, n, l];
  }
  function Zy(l, t) {
    l.action = t;
  }
  function $s(l) {
    var t = El(), a = il;
    if (a !== null)
      return ws(t, a, l);
    El(), t = t.memoizedState, a = El();
    var e = a.queue.dispatch;
    return a.memoizedState = l, [t, e, !1];
  }
  function ye(l, t, a, e) {
    return l = { tag: l, create: a, deps: e, inst: t, next: null }, t = x.updateQueue, t === null && (t = Iu(), x.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (e = a.next, a.next = l, l.next = e, t.lastEffect = l), l;
  }
  function Ws() {
    return El().memoizedState;
  }
  function tn(l, t, a, e) {
    var u = Ql();
    x.flags |= l, u.memoizedState = ye(
      1 | t,
      { destroy: void 0 },
      a,
      e === void 0 ? null : e
    );
  }
  function an(l, t, a, e) {
    var u = El();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    il !== null && e !== null && jc(e, il.memoizedState.deps) ? u.memoizedState = ye(t, n, a, e) : (x.flags |= l, u.memoizedState = ye(
      1 | t,
      n,
      a,
      e
    ));
  }
  function Fs(l, t) {
    tn(8390656, 8, l, t);
  }
  function Fc(l, t) {
    an(2048, 8, l, t);
  }
  function Ly(l) {
    x.flags |= 4;
    var t = x.updateQueue;
    if (t === null)
      t = Iu(), x.updateQueue = t, t.events = [l];
    else {
      var a = t.events;
      a === null ? t.events = [l] : a.push(l);
    }
  }
  function ks(l) {
    var t = El().memoizedState;
    return Ly({ ref: t, nextImpl: l }), function() {
      if ((al & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Is(l, t) {
    return an(4, 2, l, t);
  }
  function Ps(l, t) {
    return an(4, 4, l, t);
  }
  function lm(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function tm(l, t, a) {
    a = a != null ? a.concat([l]) : null, an(4, 4, lm.bind(null, t, l), a);
  }
  function kc() {
  }
  function am(l, t) {
    var a = El();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && jc(t, e[1]) ? e[0] : (a.memoizedState = [l, t], l);
  }
  function em(l, t) {
    var a = El();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && jc(t, e[1]))
      return e[0];
    if (e = l(), Ya) {
      Wt(!0);
      try {
        l();
      } finally {
        Wt(!1);
      }
    }
    return a.memoizedState = [e, t], e;
  }
  function Ic(l, t, a) {
    return a === void 0 || (Gt & 1073741824) !== 0 && (W & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = a, l = u0(), x.lanes |= l, sa |= l, a);
  }
  function um(l, t, a, e) {
    return Pl(a, t) ? a : se.current !== null ? (l = Ic(l, a, e), Pl(l, t) || (Al = !0), l) : (Gt & 42) === 0 || (Gt & 1073741824) !== 0 && (W & 261930) === 0 ? (Al = !0, l.memoizedState = a) : (l = u0(), x.lanes |= l, sa |= l, t);
  }
  function nm(l, t, a, e, u) {
    var n = _.p;
    _.p = n !== 0 && 8 > n ? n : 8;
    var c = S.T, i = {};
    S.T = i, ti(l, !1, t, a);
    try {
      var f = u(), v = S.S;
      if (v !== null && v(i, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var r = Gy(
          f,
          e
        );
        ke(
          l,
          t,
          r,
          nt(l)
        );
      } else
        ke(
          l,
          t,
          e,
          nt(l)
        );
    } catch (z) {
      ke(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: z },
        nt()
      );
    } finally {
      _.p = n, c !== null && i.types !== null && (c.types = i.types), S.T = c;
    }
  }
  function xy() {
  }
  function Pc(l, t, a, e) {
    if (l.tag !== 5) throw Error(o(476));
    var u = cm(l).queue;
    nm(
      l,
      u,
      t,
      Q,
      a === null ? xy : function() {
        return im(l), a(e);
      }
    );
  }
  function cm(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qt,
        lastRenderedState: Q
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qt,
        lastRenderedState: a
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function im(l) {
    var t = cm(l);
    t.next === null && (t = l.alternate.memoizedState), ke(
      l,
      t.next.queue,
      {},
      nt()
    );
  }
  function li() {
    return Rl(vu);
  }
  function fm() {
    return El().memoizedState;
  }
  function sm() {
    return El().memoizedState;
  }
  function Vy(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = nt();
          l = ea(a);
          var e = ua(t, l, a);
          e !== null && ($l(e, t, a), Je(e, t, a)), t = { cache: Uc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Ky(l, t, a) {
    var e = nt();
    a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, en(l) ? om(t, a) : (a = Sc(l, t, a, e), a !== null && ($l(a, l, e), ym(a, t, e)));
  }
  function mm(l, t, a) {
    var e = nt();
    ke(l, t, a, e);
  }
  function ke(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (en(l)) om(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var c = t.lastRenderedState, i = n(c, a);
          if (u.hasEagerState = !0, u.eagerState = i, Pl(i, c))
            return Gu(l, t, u, 0), yl === null && Yu(), !1;
        } catch {
        }
      if (a = Sc(l, t, u, e), a !== null)
        return $l(a, l, e), ym(a, t, e), !0;
    }
    return !1;
  }
  function ti(l, t, a, e) {
    if (e = {
      lane: 2,
      revertLane: Ci(),
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, en(l)) {
      if (t) throw Error(o(479));
    } else
      t = Sc(
        l,
        a,
        e,
        2
      ), t !== null && $l(t, l, 2);
  }
  function en(l) {
    var t = l.alternate;
    return l === x || t !== null && t === x;
  }
  function om(l, t) {
    me = Fu = !0;
    var a = l.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
  }
  function ym(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, rf(l, a);
    }
  }
  var Ie = {
    readContext: Rl,
    use: Pu,
    useCallback: gl,
    useContext: gl,
    useEffect: gl,
    useImperativeHandle: gl,
    useLayoutEffect: gl,
    useInsertionEffect: gl,
    useMemo: gl,
    useReducer: gl,
    useRef: gl,
    useState: gl,
    useDebugValue: gl,
    useDeferredValue: gl,
    useTransition: gl,
    useSyncExternalStore: gl,
    useId: gl,
    useHostTransitionStatus: gl,
    useFormState: gl,
    useActionState: gl,
    useOptimistic: gl,
    useMemoCache: gl,
    useCacheRefresh: gl
  };
  Ie.useEffectEvent = gl;
  var dm = {
    readContext: Rl,
    use: Pu,
    useCallback: function(l, t) {
      return Ql().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Rl,
    useEffect: Fs,
    useImperativeHandle: function(l, t, a) {
      a = a != null ? a.concat([l]) : null, tn(
        4194308,
        4,
        lm.bind(null, t, l),
        a
      );
    },
    useLayoutEffect: function(l, t) {
      return tn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      tn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var a = Ql();
      t = t === void 0 ? null : t;
      var e = l();
      if (Ya) {
        Wt(!0);
        try {
          l();
        } finally {
          Wt(!1);
        }
      }
      return a.memoizedState = [e, t], e;
    },
    useReducer: function(l, t, a) {
      var e = Ql();
      if (a !== void 0) {
        var u = a(t);
        if (Ya) {
          Wt(!0);
          try {
            a(t);
          } finally {
            Wt(!1);
          }
        }
      } else u = t;
      return e.memoizedState = e.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, e.queue = l, l = l.dispatch = Ky.bind(
        null,
        x,
        l
      ), [e.memoizedState, l];
    },
    useRef: function(l) {
      var t = Ql();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = $c(l);
      var t = l.queue, a = mm.bind(null, x, t);
      return t.dispatch = a, [l.memoizedState, a];
    },
    useDebugValue: kc,
    useDeferredValue: function(l, t) {
      var a = Ql();
      return Ic(a, l, t);
    },
    useTransition: function() {
      var l = $c(!1);
      return l = nm.bind(
        null,
        x,
        l.queue,
        !0,
        !1
      ), Ql().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, a) {
      var e = x, u = Ql();
      if (I) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), yl === null)
          throw Error(o(349));
        (W & 127) !== 0 || qs(e, t, a);
      }
      u.memoizedState = a;
      var n = { value: a, getSnapshot: t };
      return u.queue = n, Fs(Ys.bind(null, e, n, l), [
        l
      ]), e.flags |= 2048, ye(
        9,
        { destroy: void 0 },
        Bs.bind(
          null,
          e,
          n,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var l = Ql(), t = yl.identifierPrefix;
      if (I) {
        var a = pt, e = Mt;
        a = (e & ~(1 << 32 - Il(e) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = ku++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Qy++, t = "_" + t + "r_" + a.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: li,
    useFormState: Ks,
    useActionState: Ks,
    useOptimistic: function(l) {
      var t = Ql();
      t.memoizedState = t.baseState = l;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = ti.bind(
        null,
        x,
        !0,
        a
      ), a.dispatch = t, [l, t];
    },
    useMemoCache: Kc,
    useCacheRefresh: function() {
      return Ql().memoizedState = Vy.bind(
        null,
        x
      );
    },
    useEffectEvent: function(l) {
      var t = Ql(), a = { impl: l };
      return t.memoizedState = a, function() {
        if ((al & 2) !== 0)
          throw Error(o(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, ai = {
    readContext: Rl,
    use: Pu,
    useCallback: am,
    useContext: Rl,
    useEffect: Fc,
    useImperativeHandle: tm,
    useInsertionEffect: Is,
    useLayoutEffect: Ps,
    useMemo: em,
    useReducer: ln,
    useRef: Ws,
    useState: function() {
      return ln(Qt);
    },
    useDebugValue: kc,
    useDeferredValue: function(l, t) {
      var a = El();
      return um(
        a,
        il.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = ln(Qt)[0], t = El().memoizedState;
      return [
        typeof l == "boolean" ? l : Fe(l),
        t
      ];
    },
    useSyncExternalStore: Cs,
    useId: fm,
    useHostTransitionStatus: li,
    useFormState: Js,
    useActionState: Js,
    useOptimistic: function(l, t) {
      var a = El();
      return Xs(a, il, l, t);
    },
    useMemoCache: Kc,
    useCacheRefresh: sm
  };
  ai.useEffectEvent = ks;
  var vm = {
    readContext: Rl,
    use: Pu,
    useCallback: am,
    useContext: Rl,
    useEffect: Fc,
    useImperativeHandle: tm,
    useInsertionEffect: Is,
    useLayoutEffect: Ps,
    useMemo: em,
    useReducer: wc,
    useRef: Ws,
    useState: function() {
      return wc(Qt);
    },
    useDebugValue: kc,
    useDeferredValue: function(l, t) {
      var a = El();
      return il === null ? Ic(a, l, t) : um(
        a,
        il.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = wc(Qt)[0], t = El().memoizedState;
      return [
        typeof l == "boolean" ? l : Fe(l),
        t
      ];
    },
    useSyncExternalStore: Cs,
    useId: fm,
    useHostTransitionStatus: li,
    useFormState: $s,
    useActionState: $s,
    useOptimistic: function(l, t) {
      var a = El();
      return il !== null ? Xs(a, il, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
    },
    useMemoCache: Kc,
    useCacheRefresh: sm
  };
  vm.useEffectEvent = ks;
  function ei(l, t, a, e) {
    t = l.memoizedState, a = a(e, t), a = a == null ? t : D({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var ui = {
    enqueueSetState: function(l, t, a) {
      l = l._reactInternals;
      var e = nt(), u = ea(e);
      u.payload = t, a != null && (u.callback = a), t = ua(l, u, e), t !== null && ($l(t, l, e), Je(t, l, e));
    },
    enqueueReplaceState: function(l, t, a) {
      l = l._reactInternals;
      var e = nt(), u = ea(e);
      u.tag = 1, u.payload = t, a != null && (u.callback = a), t = ua(l, u, e), t !== null && ($l(t, l, e), Je(t, l, e));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var a = nt(), e = ea(a);
      e.tag = 2, t != null && (e.callback = t), t = ua(l, e, a), t !== null && ($l(t, l, a), Je(t, l, a));
    }
  };
  function hm(l, t, a, e, u, n, c) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(e, n, c) : t.prototype && t.prototype.isPureReactComponent ? !Qe(a, e) || !Qe(u, n) : !0;
  }
  function gm(l, t, a, e) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, e), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, e), t.state !== l && ui.enqueueReplaceState(t, t.state, null);
  }
  function Ga(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t)
        e !== "ref" && (a[e] = t[e]);
    }
    if (l = l.defaultProps) {
      a === t && (a = D({}, a));
      for (var u in l)
        a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function rm(l) {
    Bu(l);
  }
  function Sm(l) {
    console.error(l);
  }
  function bm(l) {
    Bu(l);
  }
  function un(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function Em(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function ni(l, t, a) {
    return a = ea(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      un(l, t);
    }, a;
  }
  function zm(l) {
    return l = ea(l), l.tag = 3, l;
  }
  function Tm(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Em(t, a, e);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
      Em(t, a, e), typeof u != "function" && (ma === null ? ma = /* @__PURE__ */ new Set([this]) : ma.add(this));
      var i = e.stack;
      this.componentDidCatch(e.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function Jy(l, t, a, e, u) {
    if (a.flags |= 32768, e !== null && typeof e == "object" && typeof e.then == "function") {
      if (t = a.alternate, t !== null && ue(
        t,
        a,
        u,
        !0
      ), a = tt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return vt === null ? rn() : a.alternate === null && rl === 0 && (rl = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, e === Ku ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([e]) : t.add(e), Ni(l, e, u)), !1;
          case 22:
            return a.flags |= 65536, e === Ku ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([e])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([e]) : a.add(e)), Ni(l, e, u)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Ni(l, e, u), rn(), !1;
    }
    if (I)
      return t = tt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, e !== Mc && (l = Error(o(422), { cause: e }), Ze(mt(l, a)))) : (e !== Mc && (t = Error(o(423), {
        cause: e
      }), Ze(
        mt(t, a)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, e = mt(e, a), u = ni(
        l.stateNode,
        e,
        u
      ), Bc(l, u), rl !== 4 && (rl = 2)), !1;
    var n = Error(o(520), { cause: e });
    if (n = mt(n, a), cu === null ? cu = [n] : cu.push(n), rl !== 4 && (rl = 2), t === null) return !0;
    e = mt(e, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, l = u & -u, a.lanes |= l, l = ni(a.stateNode, e, l), Bc(a, l), !1;
        case 1:
          if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ma === null || !ma.has(n))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = zm(u), Tm(
              u,
              l,
              a,
              e
            ), Bc(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ci = Error(o(461)), Al = !1;
  function Cl(l, t, a, e) {
    t.child = l === null ? _s(t, null, a, e) : Ba(
      t,
      l.child,
      a,
      e
    );
  }
  function Am(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var c = {};
      for (var i in e)
        i !== "ref" && (c[i] = e[i]);
    } else c = e;
    return Ha(t), e = Zc(
      l,
      t,
      a,
      c,
      n,
      u
    ), i = Lc(), l !== null && !Al ? (xc(l, t, u), Xt(l, t, u)) : (I && i && Tc(t), t.flags |= 1, Cl(l, t, e, u), t.child);
  }
  function Mm(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" && !bc(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, pm(
        l,
        t,
        n,
        e,
        u
      )) : (l = Xu(
        a.type,
        null,
        e,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !vi(l, u)) {
      var c = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Qe, a(c, e) && l.ref === t.ref)
        return Xt(l, t, u);
    }
    return t.flags |= 1, l = Ct(n, e), l.ref = t.ref, l.return = t, t.child = l;
  }
  function pm(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Qe(n, e) && l.ref === t.ref)
        if (Al = !1, t.pendingProps = e = n, vi(l, u))
          (l.flags & 131072) !== 0 && (Al = !0);
        else
          return t.lanes = l.lanes, Xt(l, t, u);
    }
    return ii(
      l,
      t,
      a,
      e,
      u
    );
  }
  function _m(l, t, a, e) {
    var u = e.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, l !== null) {
          for (e = t.child = l.child, u = 0; e !== null; )
            u = u | e.lanes | e.childLanes, e = e.sibling;
          e = u & ~n;
        } else e = 0, t.child = null;
        return Om(
          l,
          t,
          n,
          a,
          e
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && xu(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Us(t, n) : Gc(), Ns(t);
      else
        return e = t.lanes = 536870912, Om(
          l,
          t,
          n !== null ? n.baseLanes | a : a,
          a,
          e
        );
    } else
      n !== null ? (xu(t, n.cachePool), Us(t, n), ca(), t.memoizedState = null) : (l !== null && xu(t, null), Gc(), ca());
    return Cl(l, t, u, a), t.child;
  }
  function Pe(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Om(l, t, a, e, u) {
    var n = Hc();
    return n = n === null ? null : { parent: zl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, l !== null && xu(t, null), Gc(), Ns(t), l !== null && ue(l, t, e, !0), t.childLanes = u, null;
  }
  function nn(l, t) {
    return t = fn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Dm(l, t, a) {
    return Ba(t, l.child, null, a), l = nn(t, t.pendingProps), l.flags |= 2, at(t), t.memoizedState = null, l;
  }
  function wy(l, t, a) {
    var e = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (I) {
        if (e.mode === "hidden")
          return l = nn(t, e), t.lanes = 536870912, Pe(null, l);
        if (Xc(t), (l = dl) ? (l = j0(
          l,
          dt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? { id: Mt, overflow: pt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = os(l), a.return = t, t.child = a, Hl = t, dl = null)) : l = null, l === null) throw la(t);
        return t.lanes = 536870912, null;
      }
      return nn(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (Xc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Dm(
            l,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Al || ue(l, t, a, !1), u = (a & l.childLanes) !== 0, Al || u) {
        if (e = yl, e !== null && (c = Sf(e, a), c !== 0 && c !== n.retryLane))
          throw n.retryLane = c, Oa(l, c), $l(e, l, c), ci;
        rn(), t = Dm(
          l,
          t,
          a
        );
      } else
        l = n.treeContext, dl = ht(c.nextSibling), Hl = t, I = !0, Pt = null, dt = !1, l !== null && vs(t, l), t = nn(t, e), t.flags |= 4096;
      return t;
    }
    return l = Ct(l.child, {
      mode: e.mode,
      children: e.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function cn(l, t) {
    var a = t.ref;
    if (a === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function ii(l, t, a, e, u) {
    return Ha(t), a = Zc(
      l,
      t,
      a,
      e,
      void 0,
      u
    ), e = Lc(), l !== null && !Al ? (xc(l, t, u), Xt(l, t, u)) : (I && e && Tc(t), t.flags |= 1, Cl(l, t, a, u), t.child);
  }
  function Um(l, t, a, e, u, n) {
    return Ha(t), t.updateQueue = null, a = Rs(
      t,
      e,
      a,
      u
    ), Hs(l), e = Lc(), l !== null && !Al ? (xc(l, t, n), Xt(l, t, n)) : (I && e && Tc(t), t.flags |= 1, Cl(l, t, a, n), t.child);
  }
  function Nm(l, t, a, e, u) {
    if (Ha(t), t.stateNode === null) {
      var n = le, c = a.contextType;
      typeof c == "object" && c !== null && (n = Rl(c)), n = new a(e, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ui, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = e, n.state = t.memoizedState, n.refs = {}, Cc(t), c = a.contextType, n.context = typeof c == "object" && c !== null ? Rl(c) : le, n.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (ei(
        t,
        a,
        c,
        e
      ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && ui.enqueueReplaceState(n, n.state, null), $e(t, e, n, u), we(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !0;
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps, f = Ga(a, i);
      n.props = f;
      var v = n.context, r = a.contextType;
      c = le, typeof r == "object" && r !== null && (c = Rl(r));
      var z = a.getDerivedStateFromProps;
      r = typeof z == "function" || typeof n.getSnapshotBeforeUpdate == "function", i = t.pendingProps !== i, r || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i || v !== c) && gm(
        t,
        n,
        e,
        c
      ), aa = !1;
      var h = t.memoizedState;
      n.state = h, $e(t, e, n, u), we(), v = t.memoizedState, i || h !== v || aa ? (typeof z == "function" && (ei(
        t,
        a,
        z,
        e
      ), v = t.memoizedState), (f = aa || hm(
        t,
        a,
        f,
        e,
        h,
        v,
        c
      )) ? (r || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = e, t.memoizedState = v), n.props = e, n.state = v, n.context = c, e = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !1);
    } else {
      n = t.stateNode, qc(l, t), c = t.memoizedProps, r = Ga(a, c), n.props = r, z = t.pendingProps, h = n.context, v = a.contextType, f = le, typeof v == "object" && v !== null && (f = Rl(v)), i = a.getDerivedStateFromProps, (v = typeof i == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== z || h !== f) && gm(
        t,
        n,
        e,
        f
      ), aa = !1, h = t.memoizedState, n.state = h, $e(t, e, n, u), we();
      var g = t.memoizedState;
      c !== z || h !== g || aa || l !== null && l.dependencies !== null && Zu(l.dependencies) ? (typeof i == "function" && (ei(
        t,
        a,
        i,
        e
      ), g = t.memoizedState), (r = aa || hm(
        t,
        a,
        r,
        e,
        h,
        g,
        f
      ) || l !== null && l.dependencies !== null && Zu(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, g, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        e,
        g,
        f
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), t.memoizedProps = e, t.memoizedState = g), n.props = e, n.state = g, n.context = f, e = r) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), e = !1);
    }
    return n = e, cn(l, t), e = (t.flags & 128) !== 0, n || e ? (n = t.stateNode, a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && e ? (t.child = Ba(
      t,
      l.child,
      null,
      u
    ), t.child = Ba(
      t,
      null,
      a,
      u
    )) : Cl(l, t, a, u), t.memoizedState = n.state, l = t.child) : l = Xt(
      l,
      t,
      u
    ), l;
  }
  function Hm(l, t, a, e) {
    return Ua(), t.flags |= 256, Cl(l, t, a, e), t.child;
  }
  var fi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function si(l) {
    return { baseLanes: l, cachePool: Es() };
  }
  function mi(l, t, a) {
    return l = l !== null ? l.childLanes & ~a : 0, t && (l |= ut), l;
  }
  function Rm(l, t, a) {
    var e = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? !1 : (bl.current & 2) !== 0), c && (u = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (I) {
        if (u ? na(t) : ca(), (l = dl) ? (l = j0(
          l,
          dt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? { id: Mt, overflow: pt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = os(l), a.return = t, t.child = a, Hl = t, dl = null)) : l = null, l === null) throw la(t);
        return Ji(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var i = e.children;
      return e = e.fallback, u ? (ca(), u = t.mode, i = fn(
        { mode: "hidden", children: i },
        u
      ), e = Da(
        e,
        u,
        a,
        null
      ), i.return = t, e.return = t, i.sibling = e, t.child = i, e = t.child, e.memoizedState = si(a), e.childLanes = mi(
        l,
        c,
        a
      ), t.memoizedState = fi, Pe(null, e)) : (na(t), oi(t, i));
    }
    var f = l.memoizedState;
    if (f !== null && (i = f.dehydrated, i !== null)) {
      if (n)
        t.flags & 256 ? (na(t), t.flags &= -257, t = yi(
          l,
          t,
          a
        )) : t.memoizedState !== null ? (ca(), t.child = l.child, t.flags |= 128, t = null) : (ca(), i = e.fallback, u = t.mode, e = fn(
          { mode: "visible", children: e.children },
          u
        ), i = Da(
          i,
          u,
          a,
          null
        ), i.flags |= 2, e.return = t, i.return = t, e.sibling = i, t.child = e, Ba(
          t,
          l.child,
          null,
          a
        ), e = t.child, e.memoizedState = si(a), e.childLanes = mi(
          l,
          c,
          a
        ), t.memoizedState = fi, t = Pe(null, e));
      else if (na(t), Ji(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var v = c.dgst;
        c = v, e = Error(o(419)), e.stack = "", e.digest = c, Ze({ value: e, source: null, stack: null }), t = yi(
          l,
          t,
          a
        );
      } else if (Al || ue(l, t, a, !1), c = (a & l.childLanes) !== 0, Al || c) {
        if (c = yl, c !== null && (e = Sf(c, a), e !== 0 && e !== f.retryLane))
          throw f.retryLane = e, Oa(l, e), $l(c, l, e), ci;
        Ki(i) || rn(), t = yi(
          l,
          t,
          a
        );
      } else
        Ki(i) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, dl = ht(
          i.nextSibling
        ), Hl = t, I = !0, Pt = null, dt = !1, l !== null && vs(t, l), t = oi(
          t,
          e.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (ca(), i = e.fallback, u = t.mode, f = l.child, v = f.sibling, e = Ct(f, {
      mode: "hidden",
      children: e.children
    }), e.subtreeFlags = f.subtreeFlags & 65011712, v !== null ? i = Ct(
      v,
      i
    ) : (i = Da(
      i,
      u,
      a,
      null
    ), i.flags |= 2), i.return = t, e.return = t, e.sibling = i, t.child = e, Pe(null, e), e = t.child, i = l.child.memoizedState, i === null ? i = si(a) : (u = i.cachePool, u !== null ? (f = zl._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Es(), i = {
      baseLanes: i.baseLanes | a,
      cachePool: u
    }), e.memoizedState = i, e.childLanes = mi(
      l,
      c,
      a
    ), t.memoizedState = fi, Pe(l.child, e)) : (na(t), a = l.child, l = a.sibling, a = Ct(a, {
      mode: "visible",
      children: e.children
    }), a.return = t, a.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = a, t.memoizedState = null, a);
  }
  function oi(l, t) {
    return t = fn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function fn(l, t) {
    return l = lt(22, l, null, t), l.lanes = 0, l;
  }
  function yi(l, t, a) {
    return Ba(t, l.child, null, a), l = oi(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Cm(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    e !== null && (e.lanes |= t), Oc(l.return, t, a);
  }
  function di(l, t, a, e, u, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: e,
      tail: a,
      tailMode: u,
      treeForkCount: n
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = e, c.tail = a, c.tailMode = u, c.treeForkCount = n);
  }
  function qm(l, t, a) {
    var e = t.pendingProps, u = e.revealOrder, n = e.tail;
    e = e.children;
    var c = bl.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, O(bl, c), Cl(l, t, e, a), e = I ? je : 0, !i && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Cm(l, a, t);
        else if (l.tag === 19)
          Cm(l, a, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          l = a.alternate, l !== null && Wu(l) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = t.child, t.child = null) : (u = a.sibling, a.sibling = null), di(
          t,
          !1,
          u,
          a,
          n,
          e
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Wu(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = a, a = u, u = l;
        }
        di(
          t,
          !0,
          a,
          null,
          n,
          e
        );
        break;
      case "together":
        di(
          t,
          !1,
          null,
          null,
          void 0,
          e
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Xt(l, t, a) {
    if (l !== null && (t.dependencies = l.dependencies), sa |= t.lanes, (a & t.childLanes) === 0)
      if (l !== null) {
        if (ue(
          l,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, a = Ct(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; )
        l = l.sibling, a = a.sibling = Ct(l, l.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function vi(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Zu(l)));
  }
  function $y(l, t, a) {
    switch (t.tag) {
      case 3:
        Gl(t, t.stateNode.containerInfo), ta(t, zl, l.memoizedState.cache), Ua();
        break;
      case 27:
      case 5:
        pe(t);
        break;
      case 4:
        Gl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ta(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Xc(t), null;
        break;
      case 13:
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null ? (na(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Rm(l, t, a) : (na(t), l = Xt(
            l,
            t,
            a
          ), l !== null ? l.sibling : null);
        na(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (e = (a & t.childLanes) !== 0, e || (ue(
          l,
          t,
          a,
          !1
        ), e = (a & t.childLanes) !== 0), u) {
          if (e)
            return qm(
              l,
              t,
              a
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), O(bl, bl.current), e) break;
        return null;
      case 22:
        return t.lanes = 0, _m(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ta(t, zl, l.memoizedState.cache);
    }
    return Xt(l, t, a);
  }
  function Bm(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Al = !0;
      else {
        if (!vi(l, a) && (t.flags & 128) === 0)
          return Al = !1, $y(
            l,
            t,
            a
          );
        Al = (l.flags & 131072) !== 0;
      }
    else
      Al = !1, I && (t.flags & 1048576) !== 0 && ds(t, je, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (l = Ca(t.elementType), t.type = l, typeof l == "function")
            bc(l) ? (e = Ga(l, e), t.tag = 1, t = Nm(
              null,
              t,
              l,
              e,
              a
            )) : (t.tag = 0, t = ii(
              null,
              t,
              l,
              e,
              a
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === ct) {
                t.tag = 11, t = Am(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break l;
              } else if (u === k) {
                t.tag = 14, t = Mm(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break l;
              }
            }
            throw t = Ut(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return ii(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return e = t.type, u = Ga(
          e,
          t.pendingProps
        ), Nm(
          l,
          t,
          e,
          u,
          a
        );
      case 3:
        l: {
          if (Gl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(o(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, qc(l, t), $e(t, e, null, a);
          var c = t.memoizedState;
          if (e = c.cache, ta(t, zl, e), e !== n.cache && Dc(
            t,
            [zl],
            a,
            !0
          ), we(), e = c.element, n.isDehydrated)
            if (n = {
              element: e,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Hm(
                l,
                t,
                e,
                a
              );
              break l;
            } else if (e !== u) {
              u = mt(
                Error(o(424)),
                t
              ), Ze(u), t = Hm(
                l,
                t,
                e,
                a
              );
              break l;
            } else
              for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, dl = ht(l.firstChild), Hl = t, I = !0, Pt = null, dt = !0, a = _s(
                t,
                null,
                e,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Ua(), e === u) {
              t = Xt(
                l,
                t,
                a
              );
              break l;
            }
            Cl(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return cn(l, t), l === null ? (a = J0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : I || (a = t.type, l = t.pendingProps, e = Mn(
          J.current
        ).createElement(a), e[Nl] = t, e[Ll] = l, ql(e, a, l), Ol(e), t.stateNode = e) : t.memoizedState = J0(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return pe(t), l === null && I && (e = t.stateNode = x0(
          t.type,
          t.pendingProps,
          J.current
        ), Hl = t, dt = !0, u = dl, va(t.type) ? (wi = u, dl = ht(e.firstChild)) : dl = u), Cl(
          l,
          t,
          t.pendingProps.children,
          a
        ), cn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && I && ((u = e = dl) && (e = Md(
          e,
          t.type,
          t.pendingProps,
          dt
        ), e !== null ? (t.stateNode = e, Hl = t, dl = ht(e.firstChild), dt = !1, u = !0) : u = !1), u || la(t)), pe(t), u = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, e = n.children, Li(u, n) ? e = null : c !== null && Li(u, c) && (t.flags |= 32), t.memoizedState !== null && (u = Zc(
          l,
          t,
          Xy,
          null,
          null,
          a
        ), vu._currentValue = u), cn(l, t), Cl(l, t, e, a), t.child;
      case 6:
        return l === null && I && ((l = a = dl) && (a = pd(
          a,
          t.pendingProps,
          dt
        ), a !== null ? (t.stateNode = a, Hl = t, dl = null, l = !0) : l = !1), l || la(t)), null;
      case 13:
        return Rm(l, t, a);
      case 4:
        return Gl(
          t,
          t.stateNode.containerInfo
        ), e = t.pendingProps, l === null ? t.child = Ba(
          t,
          null,
          e,
          a
        ) : Cl(l, t, e, a), t.child;
      case 11:
        return Am(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return Cl(
          l,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return Cl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Cl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return e = t.pendingProps, ta(t, t.type, e.value), Cl(l, t, e.children, a), t.child;
      case 9:
        return u = t.type._context, e = t.pendingProps.children, Ha(t), u = Rl(u), e = e(u), t.flags |= 1, Cl(l, t, e, a), t.child;
      case 14:
        return Mm(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return pm(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return qm(l, t, a);
      case 31:
        return wy(l, t, a);
      case 22:
        return _m(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Ha(t), e = Rl(zl), l === null ? (u = Hc(), u === null && (u = yl, n = Uc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= a), u = n), t.memoizedState = { parent: e, cache: u }, Cc(t), ta(t, zl, u)) : ((l.lanes & a) !== 0 && (qc(l, t), $e(t, null, null, a), we()), u = l.memoizedState, n = t.memoizedState, u.parent !== e ? (u = { parent: e, cache: e }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ta(t, zl, e)) : (e = n.cache, ta(t, zl, e), e !== u.cache && Dc(
          t,
          [zl],
          a,
          !0
        ))), Cl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function jt(l) {
    l.flags |= 4;
  }
  function hi(l, t, a, e, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (f0()) l.flags |= 8192;
        else
          throw qa = Ku, Rc;
    } else l.flags &= -16777217;
  }
  function Ym(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !k0(t))
      if (f0()) l.flags |= 8192;
      else
        throw qa = Ku, Rc;
  }
  function sn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? hf() : 536870912, l.lanes |= t, ge |= t);
  }
  function lu(l, t) {
    if (!I)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? l.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            a.alternate !== null && (e = a), a = a.sibling;
          e === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : e.sibling = null;
      }
  }
  function vl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, a = 0, e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags & 65011712, e |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags, e |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= e, l.childLanes = a, t;
  }
  function Wy(l, t, a) {
    var e = t.pendingProps;
    switch (Ac(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return vl(t), null;
      case 1:
        return vl(t), null;
      case 3:
        return a = t.stateNode, e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Yt(zl), Sl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (ee(t) ? jt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, pc())), vl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (jt(t), n !== null ? (vl(t), Ym(t, n)) : (vl(t), hi(
          t,
          u,
          null,
          e,
          a
        ))) : n ? n !== l.memoizedState ? (jt(t), vl(t), Ym(t, n)) : (vl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== e && jt(t), vl(t), hi(
          t,
          u,
          l,
          e,
          a
        )), null;
      case 27:
        if (bu(t), a = J.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && jt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(o(166));
            return vl(t), null;
          }
          l = H.current, ee(t) ? hs(t) : (l = x0(u, e, a), t.stateNode = l, jt(t));
        }
        return vl(t), null;
      case 5:
        if (bu(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && jt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(o(166));
            return vl(t), null;
          }
          if (n = H.current, ee(t))
            hs(t);
          else {
            var c = Mn(
              J.current
            );
            switch (n) {
              case 1:
                n = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = c.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof e.is == "string" ? c.createElement("select", {
                      is: e.is
                    }) : c.createElement("select"), e.multiple ? n.multiple = !0 : e.size && (n.size = e.size);
                    break;
                  default:
                    n = typeof e.is == "string" ? c.createElement(u, { is: e.is }) : c.createElement(u);
                }
            }
            n[Nl] = t, n[Ll] = e;
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break l;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = n;
            l: switch (ql(n, u, e), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && jt(t);
          }
        }
        return vl(t), hi(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== e && jt(t);
        else {
          if (typeof e != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = J.current, ee(t)) {
            if (l = t.stateNode, a = t.memoizedProps, e = null, u = Hl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            l[Nl] = t, l = !!(l.nodeValue === a || e !== null && e.suppressHydrationWarning === !0 || R0(l.nodeValue, a)), l || la(t, !0);
          } else
            l = Mn(l).createTextNode(
              e
            ), l[Nl] = t, t.stateNode = l;
        }
        return vl(t), null;
      case 31:
        if (a = t.memoizedState, l === null || l.memoizedState !== null) {
          if (e = ee(t), a !== null) {
            if (l === null) {
              if (!e) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Nl] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vl(t), l = !1;
          } else
            a = pc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = a), l = !0;
          if (!l)
            return t.flags & 256 ? (at(t), t) : (at(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return vl(t), null;
      case 13:
        if (e = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ee(t), e !== null && e.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Nl] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vl(t), u = !1;
          } else
            u = pc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (at(t), t) : (at(t), null);
        }
        return at(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = e !== null, l = l !== null && l.memoizedState !== null, a && (e = t.child, u = null, e.alternate !== null && e.alternate.memoizedState !== null && e.alternate.memoizedState.cachePool !== null && (u = e.alternate.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== u && (e.flags |= 2048)), a !== l && a && (t.child.flags |= 8192), sn(t, t.updateQueue), vl(t), null);
      case 4:
        return Sl(), l === null && Gi(t.stateNode.containerInfo), vl(t), null;
      case 10:
        return Yt(t.type), vl(t), null;
      case 19:
        if (T(bl), e = t.memoizedState, e === null) return vl(t), null;
        if (u = (t.flags & 128) !== 0, n = e.rendering, n === null)
          if (u) lu(e, !1);
          else {
            if (rl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Wu(l), n !== null) {
                  for (t.flags |= 128, lu(e, !1), l = n.updateQueue, t.updateQueue = l, sn(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; )
                    ms(a, l), a = a.sibling;
                  return O(
                    bl,
                    bl.current & 1 | 2
                  ), I && qt(t, e.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            e.tail !== null && Fl() > vn && (t.flags |= 128, u = !0, lu(e, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Wu(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, sn(t, l), lu(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !I)
                return vl(t), null;
            } else
              2 * Fl() - e.renderingStartTime > vn && a !== 536870912 && (t.flags |= 128, u = !0, lu(e, !1), t.lanes = 4194304);
          e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
        }
        return e.tail !== null ? (l = e.tail, e.rendering = l, e.tail = l.sibling, e.renderingStartTime = Fl(), l.sibling = null, a = bl.current, O(
          bl,
          u ? a & 1 | 2 : a & 1
        ), I && qt(t, e.treeForkCount), l) : (vl(t), null);
      case 22:
      case 23:
        return at(t), Qc(), e = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== e && (t.flags |= 8192) : e && (t.flags |= 8192), e ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (vl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vl(t), a = t.updateQueue, a !== null && sn(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (t.flags |= 2048), l !== null && T(Ra), null;
      case 24:
        return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Yt(zl), vl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Fy(l, t) {
    switch (Ac(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Yt(zl), Sl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return bu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (at(t), t.alternate === null)
            throw Error(o(340));
          Ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (at(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return T(bl), null;
      case 4:
        return Sl(), null;
      case 10:
        return Yt(t.type), null;
      case 22:
      case 23:
        return at(t), Qc(), l !== null && T(Ra), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Yt(zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Gm(l, t) {
    switch (Ac(t), t.tag) {
      case 3:
        Yt(zl), Sl();
        break;
      case 26:
      case 27:
      case 5:
        bu(t);
        break;
      case 4:
        Sl();
        break;
      case 31:
        t.memoizedState !== null && at(t);
        break;
      case 13:
        at(t);
        break;
      case 19:
        T(bl);
        break;
      case 10:
        Yt(t.type);
        break;
      case 22:
      case 23:
        at(t), Qc(), l !== null && T(Ra);
        break;
      case 24:
        Yt(zl);
    }
  }
  function tu(l, t) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create, c = a.inst;
            e = n(), c.destroy = e;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (i) {
      nl(t, t.return, i);
    }
  }
  function ia(l, t, a) {
    try {
      var e = t.updateQueue, u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var c = e.inst, i = c.destroy;
            if (i !== void 0) {
              c.destroy = void 0, u = t;
              var f = a, v = i;
              try {
                v();
              } catch (r) {
                nl(
                  u,
                  f,
                  r
                );
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (r) {
      nl(t, t.return, r);
    }
  }
  function Qm(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        Ds(t, a);
      } catch (e) {
        nl(l, l.return, e);
      }
    }
  }
  function Xm(l, t, a) {
    a.props = Ga(
      l.type,
      l.memoizedProps
    ), a.state = l.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (e) {
      nl(l, t, e);
    }
  }
  function au(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? l.refCleanup = a(e) : a.current = e;
      }
    } catch (u) {
      nl(l, t, u);
    }
  }
  function _t(l, t) {
    var a = l.ref, e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          nl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          nl(l, t, u);
        }
      else a.current = null;
  }
  function jm(l) {
    var t = l.type, a = l.memoizedProps, e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      nl(l, l.return, u);
    }
  }
  function gi(l, t, a) {
    try {
      var e = l.stateNode;
      Sd(e, l.type, a, t), e[Ll] = t;
    } catch (u) {
      nl(l, l.return, u);
    }
  }
  function Zm(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && va(l.type) || l.tag === 4;
  }
  function ri(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Zm(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && va(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Si(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Ht));
    else if (e !== 4 && (e === 27 && va(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null))
      for (Si(l, t, a), l = l.sibling; l !== null; )
        Si(l, t, a), l = l.sibling;
  }
  function mn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (e !== 4 && (e === 27 && va(l.type) && (a = l.stateNode), l = l.child, l !== null))
      for (mn(l, t, a), l = l.sibling; l !== null; )
        mn(l, t, a), l = l.sibling;
  }
  function Lm(l) {
    var t = l.stateNode, a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      ql(t, e, a), t[Nl] = l, t[Ll] = a;
    } catch (n) {
      nl(l, l.return, n);
    }
  }
  var Zt = !1, Ml = !1, bi = !1, xm = typeof WeakSet == "function" ? WeakSet : Set, Dl = null;
  function ky(l, t) {
    if (l = l.containerInfo, ji = Hn, l = ts(l), yc(l)) {
      if ("selectionStart" in l)
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset, n = e.focusNode;
            e = e.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var c = 0, i = -1, f = -1, v = 0, r = 0, z = l, h = null;
            t: for (; ; ) {
              for (var g; z !== a || u !== 0 && z.nodeType !== 3 || (i = c + u), z !== n || e !== 0 && z.nodeType !== 3 || (f = c + e), z.nodeType === 3 && (c += z.nodeValue.length), (g = z.firstChild) !== null; )
                h = z, z = g;
              for (; ; ) {
                if (z === l) break t;
                if (h === a && ++v === u && (i = c), h === n && ++r === e && (f = c), (g = z.nextSibling) !== null) break;
                z = h, h = z.parentNode;
              }
              z = g;
            }
            a = i === -1 || f === -1 ? null : { start: i, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Zi = { focusedElem: l, selectionRange: a }, Hn = !1, Dl = t; Dl !== null; )
      if (t = Dl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Dl = l;
      else
        for (; Dl !== null; ) {
          switch (t = Dl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (a = 0; a < l.length; a++)
                  u = l[a], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, a = t, u = n.memoizedProps, n = n.memoizedState, e = a.stateNode;
                try {
                  var U = Ga(
                    a.type,
                    u
                  );
                  l = e.getSnapshotBeforeUpdate(
                    U,
                    n
                  ), e.__reactInternalSnapshotBeforeUpdate = l;
                } catch (G) {
                  nl(
                    a,
                    a.return,
                    G
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
                  Vi(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Vi(l);
                      break;
                    default:
                      l.textContent = "";
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
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Dl = l;
            break;
          }
          Dl = t.return;
        }
  }
  function Vm(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        xt(l, a), e & 4 && tu(5, a);
        break;
      case 1:
        if (xt(l, a), e & 4)
          if (l = a.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (c) {
              nl(a, a.return, c);
            }
          else {
            var u = Ga(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              nl(
                a,
                a.return,
                c
              );
            }
          }
        e & 64 && Qm(a), e & 512 && au(a, a.return);
        break;
      case 3:
        if (xt(l, a), e & 64 && (l = a.updateQueue, l !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Ds(l, t);
          } catch (c) {
            nl(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && e & 4 && Lm(a);
      case 26:
      case 5:
        xt(l, a), t === null && e & 4 && jm(a), e & 512 && au(a, a.return);
        break;
      case 12:
        xt(l, a);
        break;
      case 31:
        xt(l, a), e & 4 && wm(l, a);
        break;
      case 13:
        xt(l, a), e & 4 && $m(l, a), e & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = cd.bind(
          null,
          a
        ), _d(l, a))));
        break;
      case 22:
        if (e = a.memoizedState !== null || Zt, !e) {
          t = t !== null && t.memoizedState !== null || Ml, u = Zt;
          var n = Ml;
          Zt = e, (Ml = t) && !n ? Vt(
            l,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : xt(l, a), Zt = u, Ml = n;
        }
        break;
      case 30:
        break;
      default:
        xt(l, a);
    }
  }
  function Km(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Km(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Wn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var hl = null, Vl = !1;
  function Lt(l, t, a) {
    for (a = a.child; a !== null; )
      Jm(l, t, a), a = a.sibling;
  }
  function Jm(l, t, a) {
    if (kl && typeof kl.onCommitFiberUnmount == "function")
      try {
        kl.onCommitFiberUnmount(_e, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Ml || _t(a, t), Lt(
          l,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Ml || _t(a, t);
        var e = hl, u = Vl;
        va(a.type) && (hl = a.stateNode, Vl = !1), Lt(
          l,
          t,
          a
        ), ou(a.stateNode), hl = e, Vl = u;
        break;
      case 5:
        Ml || _t(a, t);
      case 6:
        if (e = hl, u = Vl, hl = null, Lt(
          l,
          t,
          a
        ), hl = e, Vl = u, hl !== null)
          if (Vl)
            try {
              (hl.nodeType === 9 ? hl.body : hl.nodeName === "HTML" ? hl.ownerDocument.body : hl).removeChild(a.stateNode);
            } catch (n) {
              nl(
                a,
                t,
                n
              );
            }
          else
            try {
              hl.removeChild(a.stateNode);
            } catch (n) {
              nl(
                a,
                t,
                n
              );
            }
        break;
      case 18:
        hl !== null && (Vl ? (l = hl, Q0(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          a.stateNode
        ), Me(l)) : Q0(hl, a.stateNode));
        break;
      case 4:
        e = hl, u = Vl, hl = a.stateNode.containerInfo, Vl = !0, Lt(
          l,
          t,
          a
        ), hl = e, Vl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ia(2, a, t), Ml || ia(4, a, t), Lt(
          l,
          t,
          a
        );
        break;
      case 1:
        Ml || (_t(a, t), e = a.stateNode, typeof e.componentWillUnmount == "function" && Xm(
          a,
          t,
          e
        )), Lt(
          l,
          t,
          a
        );
        break;
      case 21:
        Lt(
          l,
          t,
          a
        );
        break;
      case 22:
        Ml = (e = Ml) || a.memoizedState !== null, Lt(
          l,
          t,
          a
        ), Ml = e;
        break;
      default:
        Lt(
          l,
          t,
          a
        );
    }
  }
  function wm(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Me(l);
      } catch (a) {
        nl(t, t.return, a);
      }
    }
  }
  function $m(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Me(l);
      } catch (a) {
        nl(t, t.return, a);
      }
  }
  function Iy(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new xm()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new xm()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function on(l, t) {
    var a = Iy(l);
    t.forEach(function(e) {
      if (!a.has(e)) {
        a.add(e);
        var u = id.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function Kl(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e], n = l, c = t, i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (va(i.type)) {
                hl = i.stateNode, Vl = !1;
                break l;
              }
              break;
            case 5:
              hl = i.stateNode, Vl = !1;
              break l;
            case 3:
            case 4:
              hl = i.stateNode.containerInfo, Vl = !0;
              break l;
          }
          i = i.return;
        }
        if (hl === null) throw Error(o(160));
        Jm(n, c, u), hl = null, Vl = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Wm(t, l), t = t.sibling;
  }
  var bt = null;
  function Wm(l, t) {
    var a = l.alternate, e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kl(t, l), Jl(l), e & 4 && (ia(3, l, l.return), tu(3, l), ia(5, l, l.return));
        break;
      case 1:
        Kl(t, l), Jl(l), e & 512 && (Ml || a === null || _t(a, a.return)), e & 64 && Zt && (l = l.updateQueue, l !== null && (e = l.callbacks, e !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? e : a.concat(e))));
        break;
      case 26:
        var u = bt;
        if (Kl(t, l), Jl(l), e & 512 && (Ml || a === null || _t(a, a.return)), e & 4) {
          var n = a !== null ? a.memoizedState : null;
          if (e = l.memoizedState, a === null)
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  e = l.type, a = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (e) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ue] || n[Nl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(e), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), ql(n, e, a), n[Nl] = l, Ol(n), e = n;
                      break l;
                    case "link":
                      var c = W0(
                        "link",
                        "href",
                        u
                      ).get(e + (a.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (n = c[i], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), ql(n, e, a), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (c = W0(
                        "meta",
                        "content",
                        u
                      ).get(e + (a.content || ""))) {
                        for (i = 0; i < c.length; i++)
                          if (n = c[i], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), ql(n, e, a), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(o(468, e));
                  }
                  n[Nl] = l, Ol(n), e = n;
                }
                l.stateNode = e;
              } else
                F0(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = $0(
                u,
                e,
                l.memoizedProps
              );
          else
            n !== e ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, e === null ? F0(
              u,
              l.type,
              l.stateNode
            ) : $0(
              u,
              e,
              l.memoizedProps
            )) : e === null && l.stateNode !== null && gi(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Kl(t, l), Jl(l), e & 512 && (Ml || a === null || _t(a, a.return)), a !== null && e & 4 && gi(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (Kl(t, l), Jl(l), e & 512 && (Ml || a === null || _t(a, a.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            wa(u, "");
          } catch (U) {
            nl(l, l.return, U);
          }
        }
        e & 4 && l.stateNode != null && (u = l.memoizedProps, gi(
          l,
          u,
          a !== null ? a.memoizedProps : u
        )), e & 1024 && (bi = !0);
        break;
      case 6:
        if (Kl(t, l), Jl(l), e & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          e = l.memoizedProps, a = l.stateNode;
          try {
            a.nodeValue = e;
          } catch (U) {
            nl(l, l.return, U);
          }
        }
        break;
      case 3:
        if (On = null, u = bt, bt = pn(t.containerInfo), Kl(t, l), bt = u, Jl(l), e & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Me(t.containerInfo);
          } catch (U) {
            nl(l, l.return, U);
          }
        bi && (bi = !1, Fm(l));
        break;
      case 4:
        e = bt, bt = pn(
          l.stateNode.containerInfo
        ), Kl(t, l), Jl(l), bt = e;
        break;
      case 12:
        Kl(t, l), Jl(l);
        break;
      case 31:
        Kl(t, l), Jl(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, on(l, e)));
        break;
      case 13:
        Kl(t, l), Jl(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (dn = Fl()), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, on(l, e)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null, v = Zt, r = Ml;
        if (Zt = v || u, Ml = r || f, Kl(t, l), Ml = r, Zt = v, Jl(l), e & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (a === null || f || Zt || Ml || Qa(l)), a = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (n = f.stateNode, u)
                    c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    i = f.stateNode;
                    var z = f.memoizedProps.style, h = z != null && z.hasOwnProperty("display") ? z.display : null;
                    i.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (U) {
                  nl(f, f.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (U) {
                  nl(f, f.return, U);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var g = f.stateNode;
                  u ? X0(g, !0) : X0(f.stateNode, !1);
                } catch (U) {
                  nl(f, f.return, U);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        e & 4 && (e = l.updateQueue, e !== null && (a = e.retryQueue, a !== null && (e.retryQueue = null, on(l, a))));
        break;
      case 19:
        Kl(t, l), Jl(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, on(l, e)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Kl(t, l), Jl(l);
    }
  }
  function Jl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if (Zm(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, n = ri(l);
            mn(l, n, u);
            break;
          case 5:
            var c = a.stateNode;
            a.flags & 32 && (wa(c, ""), a.flags &= -33);
            var i = ri(l);
            mn(l, i, c);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo, v = ri(l);
            Si(
              l,
              v,
              f
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (r) {
        nl(l, l.return, r);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Fm(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Fm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function xt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Vm(l, t.alternate, t), t = t.sibling;
  }
  function Qa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ia(4, t, t.return), Qa(t);
          break;
        case 1:
          _t(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Xm(
            t,
            t.return,
            a
          ), Qa(t);
          break;
        case 27:
          ou(t.stateNode);
        case 26:
        case 5:
          _t(t, t.return), Qa(t);
          break;
        case 22:
          t.memoizedState === null && Qa(t);
          break;
        case 30:
          Qa(t);
          break;
        default:
          Qa(t);
      }
      l = l.sibling;
    }
  }
  function Vt(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate, u = l, n = t, c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Vt(
            u,
            n,
            a
          ), tu(4, n);
          break;
        case 1:
          if (Vt(
            u,
            n,
            a
          ), e = n, u = e.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (v) {
              nl(e, e.return, v);
            }
          if (e = n, u = e.updateQueue, u !== null) {
            var i = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Os(f[u], i);
            } catch (v) {
              nl(e, e.return, v);
            }
          }
          a && c & 64 && Qm(n), au(n, n.return);
          break;
        case 27:
          Lm(n);
        case 26:
        case 5:
          Vt(
            u,
            n,
            a
          ), a && e === null && c & 4 && jm(n), au(n, n.return);
          break;
        case 12:
          Vt(
            u,
            n,
            a
          );
          break;
        case 31:
          Vt(
            u,
            n,
            a
          ), a && c & 4 && wm(u, n);
          break;
        case 13:
          Vt(
            u,
            n,
            a
          ), a && c & 4 && $m(u, n);
          break;
        case 22:
          n.memoizedState === null && Vt(
            u,
            n,
            a
          ), au(n, n.return);
          break;
        case 30:
          break;
        default:
          Vt(
            u,
            n,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Ei(l, t) {
    var a = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && Le(a));
  }
  function zi(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Le(l));
  }
  function Et(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        km(
          l,
          t,
          a,
          e
        ), t = t.sibling;
  }
  function km(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Et(
          l,
          t,
          a,
          e
        ), u & 2048 && tu(9, t);
        break;
      case 1:
        Et(
          l,
          t,
          a,
          e
        );
        break;
      case 3:
        Et(
          l,
          t,
          a,
          e
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Le(l)));
        break;
      case 12:
        if (u & 2048) {
          Et(
            l,
            t,
            a,
            e
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, c = n.id, i = n.onPostCommit;
            typeof i == "function" && i(
              c,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (f) {
            nl(t, t.return, f);
          }
        } else
          Et(
            l,
            t,
            a,
            e
          );
        break;
      case 31:
        Et(
          l,
          t,
          a,
          e
        );
        break;
      case 13:
        Et(
          l,
          t,
          a,
          e
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, c = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Et(
          l,
          t,
          a,
          e
        ) : eu(l, t) : n._visibility & 2 ? Et(
          l,
          t,
          a,
          e
        ) : (n._visibility |= 2, de(
          l,
          t,
          a,
          e,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Ei(c, t);
        break;
      case 24:
        Et(
          l,
          t,
          a,
          e
        ), u & 2048 && zi(t.alternate, t);
        break;
      default:
        Et(
          l,
          t,
          a,
          e
        );
    }
  }
  function de(l, t, a, e, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, c = t, i = a, f = e, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          de(
            n,
            c,
            i,
            f,
            u
          ), tu(8, c);
          break;
        case 23:
          break;
        case 22:
          var r = c.stateNode;
          c.memoizedState !== null ? r._visibility & 2 ? de(
            n,
            c,
            i,
            f,
            u
          ) : eu(
            n,
            c
          ) : (r._visibility |= 2, de(
            n,
            c,
            i,
            f,
            u
          )), u && v & 2048 && Ei(
            c.alternate,
            c
          );
          break;
        case 24:
          de(
            n,
            c,
            i,
            f,
            u
          ), u && v & 2048 && zi(c.alternate, c);
          break;
        default:
          de(
            n,
            c,
            i,
            f,
            u
          );
      }
      t = t.sibling;
    }
  }
  function eu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l, e = t, u = e.flags;
        switch (e.tag) {
          case 22:
            eu(a, e), u & 2048 && Ei(
              e.alternate,
              e
            );
            break;
          case 24:
            eu(a, e), u & 2048 && zi(e.alternate, e);
            break;
          default:
            eu(a, e);
        }
        t = t.sibling;
      }
  }
  var uu = 8192;
  function ve(l, t, a) {
    if (l.subtreeFlags & uu)
      for (l = l.child; l !== null; )
        Im(
          l,
          t,
          a
        ), l = l.sibling;
  }
  function Im(l, t, a) {
    switch (l.tag) {
      case 26:
        ve(
          l,
          t,
          a
        ), l.flags & uu && l.memoizedState !== null && Qd(
          a,
          bt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ve(
          l,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var e = bt;
        bt = pn(l.stateNode.containerInfo), ve(
          l,
          t,
          a
        ), bt = e;
        break;
      case 22:
        l.memoizedState === null && (e = l.alternate, e !== null && e.memoizedState !== null ? (e = uu, uu = 16777216, ve(
          l,
          t,
          a
        ), uu = e) : ve(
          l,
          t,
          a
        ));
        break;
      default:
        ve(
          l,
          t,
          a
        );
    }
  }
  function Pm(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function nu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Dl = e, t0(
            e,
            l
          );
        }
      Pm(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        l0(l), l = l.sibling;
  }
  function l0(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        nu(l), l.flags & 2048 && ia(9, l, l.return);
        break;
      case 3:
        nu(l);
        break;
      case 12:
        nu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, yn(l)) : nu(l);
        break;
      default:
        nu(l);
    }
  }
  function yn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Dl = e, t0(
            e,
            l
          );
        }
      Pm(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, t, t.return), yn(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, yn(t));
          break;
        default:
          yn(t);
      }
      l = l.sibling;
    }
  }
  function t0(l, t) {
    for (; Dl !== null; ) {
      var a = Dl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Le(a.memoizedState.cache);
      }
      if (e = a.child, e !== null) e.return = a, Dl = e;
      else
        l: for (a = l; Dl !== null; ) {
          e = Dl;
          var u = e.sibling, n = e.return;
          if (Km(e), e === a) {
            Dl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Dl = u;
            break l;
          }
          Dl = n;
        }
    }
  }
  var Py = {
    getCacheForType: function(l) {
      var t = Rl(zl), a = t.data.get(l);
      return a === void 0 && (a = l(), t.data.set(l, a)), a;
    },
    cacheSignal: function() {
      return Rl(zl).controller.signal;
    }
  }, ld = typeof WeakMap == "function" ? WeakMap : Map, al = 0, yl = null, w = null, W = 0, ul = 0, et = null, fa = !1, he = !1, Ti = !1, Kt = 0, rl = 0, sa = 0, Xa = 0, Ai = 0, ut = 0, ge = 0, cu = null, wl = null, Mi = !1, dn = 0, a0 = 0, vn = 1 / 0, hn = null, ma = null, _l = 0, oa = null, re = null, Jt = 0, pi = 0, _i = null, e0 = null, iu = 0, Oi = null;
  function nt() {
    return (al & 2) !== 0 && W !== 0 ? W & -W : S.T !== null ? Ci() : bf();
  }
  function u0() {
    if (ut === 0)
      if ((W & 536870912) === 0 || I) {
        var l = Tu;
        Tu <<= 1, (Tu & 3932160) === 0 && (Tu = 262144), ut = l;
      } else ut = 536870912;
    return l = tt.current, l !== null && (l.flags |= 32), ut;
  }
  function $l(l, t, a) {
    (l === yl && (ul === 2 || ul === 9) || l.cancelPendingCommit !== null) && (Se(l, 0), ya(
      l,
      W,
      ut,
      !1
    )), De(l, a), ((al & 2) === 0 || l !== yl) && (l === yl && ((al & 2) === 0 && (Xa |= a), rl === 4 && ya(
      l,
      W,
      ut,
      !1
    )), Ot(l));
  }
  function n0(l, t, a) {
    if ((al & 6) !== 0) throw Error(o(327));
    var e = !a && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Oe(l, t), u = e ? ed(l, t) : Ui(l, t, !0), n = e;
    do {
      if (u === 0) {
        he && !e && ya(l, t, 0, !1);
        break;
      } else {
        if (a = l.current.alternate, n && !td(a)) {
          u = Ui(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var c = 0;
          else
            c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = cu;
              var f = i.current.memoizedState.isDehydrated;
              if (f && (Se(i, c).flags |= 256), c = Ui(
                i,
                c,
                !1
              ), c !== 2) {
                if (Ti && !f) {
                  i.errorRecoveryDisabledLanes |= n, Xa |= n, u = 4;
                  break l;
                }
                n = wl, wl = u, n !== null && (wl === null ? wl = n : wl.push.apply(
                  wl,
                  n
                ));
              }
              u = c;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Se(l, 0), ya(l, t, 0, !0);
          break;
        }
        l: {
          switch (e = l, n = u, n) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ya(
                e,
                t,
                ut,
                !fa
              );
              break l;
            case 2:
              wl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (u = dn + 300 - Fl(), 10 < u)) {
            if (ya(
              e,
              t,
              ut,
              !fa
            ), Mu(e, 0, !0) !== 0) break l;
            Jt = t, e.timeoutHandle = Y0(
              c0.bind(
                null,
                e,
                a,
                wl,
                hn,
                Mi,
                t,
                ut,
                Xa,
                ge,
                fa,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          c0(
            e,
            a,
            wl,
            hn,
            Mi,
            t,
            ut,
            Xa,
            ge,
            fa,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ot(l);
  }
  function c0(l, t, a, e, u, n, c, i, f, v, r, z, h, g) {
    if (l.timeoutHandle = -1, z = t.subtreeFlags, z & 8192 || (z & 16785408) === 16785408) {
      z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ht
      }, Im(
        t,
        n,
        z
      );
      var U = (n & 62914560) === n ? dn - Fl() : (n & 4194048) === n ? a0 - Fl() : 0;
      if (U = Xd(
        z,
        U
      ), U !== null) {
        Jt = n, l.cancelPendingCommit = U(
          v0.bind(
            null,
            l,
            t,
            n,
            a,
            e,
            u,
            c,
            i,
            f,
            r,
            z,
            null,
            h,
            g
          )
        ), ya(l, n, c, !v);
        return;
      }
    }
    v0(
      l,
      t,
      n,
      a,
      e,
      u,
      c,
      i,
      f
    );
  }
  function td(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var e = 0; e < a.length; e++) {
          var u = a[e], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Pl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ya(l, t, a, e) {
    t &= ~Ai, t &= ~Xa, l.suspendedLanes |= t, l.pingedLanes &= ~t, e && (l.warmLanes |= t), e = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Il(u), c = 1 << n;
      e[n] = -1, u &= ~c;
    }
    a !== 0 && gf(l, a, t);
  }
  function gn() {
    return (al & 6) === 0 ? (fu(0), !1) : !0;
  }
  function Di() {
    if (w !== null) {
      if (ul === 0)
        var l = w.return;
      else
        l = w, Bt = Na = null, Vc(l), fe = null, Ve = 0, l = w;
      for (; l !== null; )
        Gm(l.alternate, l), l = l.return;
      w = null;
    }
  }
  function Se(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && (l.timeoutHandle = -1, zd(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), Jt = 0, Di(), yl = l, w = a = Ct(l.current, null), W = t, ul = 0, et = null, fa = !1, he = Oe(l, t), Ti = !1, ge = ut = Ai = Xa = sa = rl = 0, wl = cu = null, Mi = !1, (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - Il(e), n = 1 << u;
        t |= l[u], e &= ~n;
      }
    return Kt = t, Yu(), a;
  }
  function i0(l, t) {
    x = null, S.H = Ie, t === ie || t === Vu ? (t = As(), ul = 3) : t === Rc ? (t = As(), ul = 4) : ul = t === ci ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, et = t, w === null && (rl = 1, un(
      l,
      mt(t, l.current)
    ));
  }
  function f0() {
    var l = tt.current;
    return l === null ? !0 : (W & 4194048) === W ? vt === null : (W & 62914560) === W || (W & 536870912) !== 0 ? l === vt : !1;
  }
  function s0() {
    var l = S.H;
    return S.H = Ie, l === null ? Ie : l;
  }
  function m0() {
    var l = S.A;
    return S.A = Py, l;
  }
  function rn() {
    rl = 4, fa || (W & 4194048) !== W && tt.current !== null || (he = !0), (sa & 134217727) === 0 && (Xa & 134217727) === 0 || yl === null || ya(
      yl,
      W,
      ut,
      !1
    );
  }
  function Ui(l, t, a) {
    var e = al;
    al |= 2;
    var u = s0(), n = m0();
    (yl !== l || W !== t) && (hn = null, Se(l, t)), t = !1;
    var c = rl;
    l: do
      try {
        if (ul !== 0 && w !== null) {
          var i = w, f = et;
          switch (ul) {
            case 8:
              Di(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              tt.current === null && (t = !0);
              var v = ul;
              if (ul = 0, et = null, be(l, i, f, v), a && he) {
                c = 0;
                break l;
              }
              break;
            default:
              v = ul, ul = 0, et = null, be(l, i, f, v);
          }
        }
        ad(), c = rl;
        break;
      } catch (r) {
        i0(l, r);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Bt = Na = null, al = e, S.H = u, S.A = n, w === null && (yl = null, W = 0, Yu()), c;
  }
  function ad() {
    for (; w !== null; ) o0(w);
  }
  function ed(l, t) {
    var a = al;
    al |= 2;
    var e = s0(), u = m0();
    yl !== l || W !== t ? (hn = null, vn = Fl() + 500, Se(l, t)) : he = Oe(
      l,
      t
    );
    l: do
      try {
        if (ul !== 0 && w !== null) {
          t = w;
          var n = et;
          t: switch (ul) {
            case 1:
              ul = 0, et = null, be(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (zs(n)) {
                ul = 0, et = null, y0(t);
                break;
              }
              t = function() {
                ul !== 2 && ul !== 9 || yl !== l || (ul = 7), Ot(l);
              }, n.then(t, t);
              break l;
            case 3:
              ul = 7;
              break l;
            case 4:
              ul = 5;
              break l;
            case 7:
              zs(n) ? (ul = 0, et = null, y0(t)) : (ul = 0, et = null, be(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (w.tag) {
                case 26:
                  c = w.memoizedState;
                case 5:
                case 27:
                  var i = w;
                  if (c ? k0(c) : i.stateNode.complete) {
                    ul = 0, et = null;
                    var f = i.sibling;
                    if (f !== null) w = f;
                    else {
                      var v = i.return;
                      v !== null ? (w = v, Sn(v)) : w = null;
                    }
                    break t;
                  }
              }
              ul = 0, et = null, be(l, t, n, 5);
              break;
            case 6:
              ul = 0, et = null, be(l, t, n, 6);
              break;
            case 8:
              Di(), rl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        ud();
        break;
      } catch (r) {
        i0(l, r);
      }
    while (!0);
    return Bt = Na = null, S.H = e, S.A = u, al = a, w !== null ? 0 : (yl = null, W = 0, Yu(), rl);
  }
  function ud() {
    for (; w !== null && !Oo(); )
      o0(w);
  }
  function o0(l) {
    var t = Bm(l.alternate, l, Kt);
    l.memoizedProps = l.pendingProps, t === null ? Sn(l) : w = t;
  }
  function y0(l) {
    var t = l, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Um(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          W
        );
        break;
      case 11:
        t = Um(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          W
        );
        break;
      case 5:
        Vc(t);
      default:
        Gm(a, t), t = w = ms(t, Kt), t = Bm(a, t, Kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Sn(l) : w = t;
  }
  function be(l, t, a, e) {
    Bt = Na = null, Vc(t), fe = null, Ve = 0;
    var u = t.return;
    try {
      if (Jy(
        l,
        u,
        t,
        a,
        W
      )) {
        rl = 1, un(
          l,
          mt(a, l.current)
        ), w = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw w = u, n;
      rl = 1, un(
        l,
        mt(a, l.current)
      ), w = null;
      return;
    }
    t.flags & 32768 ? (I || e === 1 ? l = !0 : he || (W & 536870912) !== 0 ? l = !1 : (fa = l = !0, (e === 2 || e === 9 || e === 3 || e === 6) && (e = tt.current, e !== null && e.tag === 13 && (e.flags |= 16384))), d0(t, l)) : Sn(t);
  }
  function Sn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        d0(
          t,
          fa
        );
        return;
      }
      l = t.return;
      var a = Wy(
        t.alternate,
        t,
        Kt
      );
      if (a !== null) {
        w = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        w = t;
        return;
      }
      w = t = l;
    } while (t !== null);
    rl === 0 && (rl = 5);
  }
  function d0(l, t) {
    do {
      var a = Fy(l.alternate, l);
      if (a !== null) {
        a.flags &= 32767, w = a;
        return;
      }
      if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
        w = l;
        return;
      }
      w = l = a;
    } while (l !== null);
    rl = 6, w = null;
  }
  function v0(l, t, a, e, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do
      bn();
    while (_l !== 0);
    if ((al & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= rc, Go(
        l,
        a,
        n,
        c,
        i,
        f
      ), l === yl && (w = yl = null, W = 0), re = t, oa = l, Jt = a, pi = n, _i = u, e0 = e, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, fd(Eu, function() {
        return b0(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), e = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || e) {
        e = S.T, S.T = null, u = _.p, _.p = 2, c = al, al |= 4;
        try {
          ky(l, t, a);
        } finally {
          al = c, _.p = u, S.T = e;
        }
      }
      _l = 1, h0(), g0(), r0();
    }
  }
  function h0() {
    if (_l === 1) {
      _l = 0;
      var l = oa, t = re, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = S.T, S.T = null;
        var e = _.p;
        _.p = 2;
        var u = al;
        al |= 4;
        try {
          Wm(t, l);
          var n = Zi, c = ts(l.containerInfo), i = n.focusedElem, f = n.selectionRange;
          if (c !== i && i && i.ownerDocument && ls(
            i.ownerDocument.documentElement,
            i
          )) {
            if (f !== null && yc(i)) {
              var v = f.start, r = f.end;
              if (r === void 0 && (r = v), "selectionStart" in i)
                i.selectionStart = v, i.selectionEnd = Math.min(
                  r,
                  i.value.length
                );
              else {
                var z = i.ownerDocument || document, h = z && z.defaultView || window;
                if (h.getSelection) {
                  var g = h.getSelection(), U = i.textContent.length, G = Math.min(f.start, U), sl = f.end === void 0 ? G : Math.min(f.end, U);
                  !g.extend && G > sl && (c = sl, sl = G, G = c);
                  var y = Pf(
                    i,
                    G
                  ), s = Pf(
                    i,
                    sl
                  );
                  if (y && s && (g.rangeCount !== 1 || g.anchorNode !== y.node || g.anchorOffset !== y.offset || g.focusNode !== s.node || g.focusOffset !== s.offset)) {
                    var d = z.createRange();
                    d.setStart(y.node, y.offset), g.removeAllRanges(), G > sl ? (g.addRange(d), g.extend(s.node, s.offset)) : (d.setEnd(s.node, s.offset), g.addRange(d));
                  }
                }
              }
            }
            for (z = [], g = i; g = g.parentNode; )
              g.nodeType === 1 && z.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < z.length; i++) {
              var E = z[i];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Hn = !!ji, Zi = ji = null;
        } finally {
          al = u, _.p = e, S.T = a;
        }
      }
      l.current = t, _l = 2;
    }
  }
  function g0() {
    if (_l === 2) {
      _l = 0;
      var l = oa, t = re, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = S.T, S.T = null;
        var e = _.p;
        _.p = 2;
        var u = al;
        al |= 4;
        try {
          Vm(l, t.alternate, t);
        } finally {
          al = u, _.p = e, S.T = a;
        }
      }
      _l = 3;
    }
  }
  function r0() {
    if (_l === 4 || _l === 3) {
      _l = 0, Do();
      var l = oa, t = re, a = Jt, e = e0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? _l = 5 : (_l = 0, re = oa = null, S0(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ma = null), wn(a), t = t.stateNode, kl && typeof kl.onCommitFiberRoot == "function")
        try {
          kl.onCommitFiberRoot(
            _e,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (e !== null) {
        t = S.T, u = _.p, _.p = 2, S.T = null;
        try {
          for (var n = l.onRecoverableError, c = 0; c < e.length; c++) {
            var i = e[c];
            n(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          S.T = t, _.p = u;
        }
      }
      (Jt & 3) !== 0 && bn(), Ot(l), u = l.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? l === Oi ? iu++ : (iu = 0, Oi = l) : iu = 0, fu(0);
    }
  }
  function S0(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Le(t)));
  }
  function bn() {
    return h0(), g0(), r0(), b0();
  }
  function b0() {
    if (_l !== 5) return !1;
    var l = oa, t = pi;
    pi = 0;
    var a = wn(Jt), e = S.T, u = _.p;
    try {
      _.p = 32 > a ? 32 : a, S.T = null, a = _i, _i = null;
      var n = oa, c = Jt;
      if (_l = 0, re = oa = null, Jt = 0, (al & 6) !== 0) throw Error(o(331));
      var i = al;
      if (al |= 4, l0(n.current), km(
        n,
        n.current,
        c,
        a
      ), al = i, fu(0, !1), kl && typeof kl.onPostCommitFiberRoot == "function")
        try {
          kl.onPostCommitFiberRoot(_e, n);
        } catch {
        }
      return !0;
    } finally {
      _.p = u, S.T = e, S0(l, t);
    }
  }
  function E0(l, t, a) {
    t = mt(a, t), t = ni(l.stateNode, t, 2), l = ua(l, t, 2), l !== null && (De(l, 2), Ot(l));
  }
  function nl(l, t, a) {
    if (l.tag === 3)
      E0(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          E0(
            t,
            l,
            a
          );
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof e.componentDidCatch == "function" && (ma === null || !ma.has(e))) {
            l = mt(a, l), a = zm(2), e = ua(t, a, 2), e !== null && (Tm(
              a,
              e,
              t,
              l
            ), De(e, 2), Ot(e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ni(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new ld();
      var u = /* @__PURE__ */ new Set();
      e.set(t, u);
    } else
      u = e.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), e.set(t, u));
    u.has(a) || (Ti = !0, u.add(a), l = nd.bind(null, l, t, a), t.then(l, l));
  }
  function nd(l, t, a) {
    var e = l.pingCache;
    e !== null && e.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, yl === l && (W & a) === a && (rl === 4 || rl === 3 && (W & 62914560) === W && 300 > Fl() - dn ? (al & 2) === 0 && Se(l, 0) : Ai |= a, ge === W && (ge = 0)), Ot(l);
  }
  function z0(l, t) {
    t === 0 && (t = hf()), l = Oa(l, t), l !== null && (De(l, t), Ot(l));
  }
  function cd(l) {
    var t = l.memoizedState, a = 0;
    t !== null && (a = t.retryLane), z0(l, a);
  }
  function id(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode, u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    e !== null && e.delete(t), z0(l, a);
  }
  function fd(l, t) {
    return xn(l, t);
  }
  var En = null, Ee = null, Hi = !1, zn = !1, Ri = !1, da = 0;
  function Ot(l) {
    l !== Ee && l.next === null && (Ee === null ? En = Ee = l : Ee = Ee.next = l), zn = !0, Hi || (Hi = !0, md());
  }
  function fu(l, t) {
    if (!Ri && zn) {
      Ri = !0;
      do
        for (var a = !1, e = En; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = e.suspendedLanes, i = e.pingedLanes;
              n = (1 << 31 - Il(42 | l) + 1) - 1, n &= u & ~(c & ~i), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = !0, p0(e, n));
          } else
            n = W, n = Mu(
              e,
              e === yl ? n : 0,
              e.cancelPendingCommit !== null || e.timeoutHandle !== -1
            ), (n & 3) === 0 || Oe(e, n) || (a = !0, p0(e, n));
          e = e.next;
        }
      while (a);
      Ri = !1;
    }
  }
  function sd() {
    T0();
  }
  function T0() {
    zn = Hi = !1;
    var l = 0;
    da !== 0 && Ed() && (l = da);
    for (var t = Fl(), a = null, e = En; e !== null; ) {
      var u = e.next, n = A0(e, t);
      n === 0 ? (e.next = null, a === null ? En = u : a.next = u, u === null && (Ee = a)) : (a = e, (l !== 0 || (n & 3) !== 0) && (zn = !0)), e = u;
    }
    _l !== 0 && _l !== 5 || fu(l), da !== 0 && (da = 0);
  }
  function A0(l, t) {
    for (var a = l.suspendedLanes, e = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - Il(n), i = 1 << c, f = u[c];
      f === -1 ? ((i & a) === 0 || (i & e) !== 0) && (u[c] = Yo(i, t)) : f <= t && (l.expiredLanes |= i), n &= ~i;
    }
    if (t = yl, a = W, a = Mu(
      l,
      l === t ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e = l.callbackNode, a === 0 || l === t && (ul === 2 || ul === 9) || l.cancelPendingCommit !== null)
      return e !== null && e !== null && Vn(e), l.callbackNode = null, l.callbackPriority = 0;
    if ((a & 3) === 0 || Oe(l, a)) {
      if (t = a & -a, t === l.callbackPriority) return t;
      switch (e !== null && Vn(e), wn(a)) {
        case 2:
        case 8:
          a = df;
          break;
        case 32:
          a = Eu;
          break;
        case 268435456:
          a = vf;
          break;
        default:
          a = Eu;
      }
      return e = M0.bind(null, l), a = xn(a, e), l.callbackPriority = t, l.callbackNode = a, t;
    }
    return e !== null && e !== null && Vn(e), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function M0(l, t) {
    if (_l !== 0 && _l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var a = l.callbackNode;
    if (bn() && l.callbackNode !== a)
      return null;
    var e = W;
    return e = Mu(
      l,
      l === yl ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e === 0 ? null : (n0(l, e, t), A0(l, Fl()), l.callbackNode != null && l.callbackNode === a ? M0.bind(null, l) : null);
  }
  function p0(l, t) {
    if (bn()) return null;
    n0(l, t, !0);
  }
  function md() {
    Td(function() {
      (al & 6) !== 0 ? xn(
        yf,
        sd
      ) : T0();
    });
  }
  function Ci() {
    if (da === 0) {
      var l = ne;
      l === 0 && (l = zu, zu <<= 1, (zu & 261888) === 0 && (zu = 256)), da = l;
    }
    return da;
  }
  function _0(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Du("" + l);
  }
  function O0(l, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
  }
  function od(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = _0(
        (u[Ll] || null).action
      ), c = e.submitter;
      c && (t = (t = c[Ll] || null) ? _0(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var i = new Ru(
        "action",
        "action",
        null,
        e,
        u
      );
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (e.defaultPrevented) {
                if (da !== 0) {
                  var f = c ? O0(u, c) : new FormData(u);
                  Pc(
                    a,
                    {
                      pending: !0,
                      data: f,
                      method: u.method,
                      action: n
                    },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" && (i.preventDefault(), f = c ? O0(u, c) : new FormData(u), Pc(
                  a,
                  {
                    pending: !0,
                    data: f,
                    method: u.method,
                    action: n
                  },
                  n,
                  f
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var qi = 0; qi < gc.length; qi++) {
    var Bi = gc[qi], yd = Bi.toLowerCase(), dd = Bi[0].toUpperCase() + Bi.slice(1);
    St(
      yd,
      "on" + dd
    );
  }
  St(us, "onAnimationEnd"), St(ns, "onAnimationIteration"), St(cs, "onAnimationStart"), St("dblclick", "onDoubleClick"), St("focusin", "onFocus"), St("focusout", "onBlur"), St(Uy, "onTransitionRun"), St(Ny, "onTransitionStart"), St(Hy, "onTransitionCancel"), St(is, "onTransitionEnd"), Ka("onMouseEnter", ["mouseout", "mouseover"]), Ka("onMouseLeave", ["mouseout", "mouseover"]), Ka("onPointerEnter", ["pointerout", "pointerover"]), Ka("onPointerLeave", ["pointerout", "pointerover"]), Aa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Aa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Aa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Aa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var su = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vd = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(su)
  );
  function D0(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a], u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = e.length - 1; 0 <= c; c--) {
            var i = e[c], f = i.instance, v = i.currentTarget;
            if (i = i.listener, f !== n && u.isPropagationStopped())
              break l;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (r) {
              Bu(r);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (c = 0; c < e.length; c++) {
            if (i = e[c], f = i.instance, v = i.currentTarget, i = i.listener, f !== n && u.isPropagationStopped())
              break l;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (r) {
              Bu(r);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function $(l, t) {
    var a = t[$n];
    a === void 0 && (a = t[$n] = /* @__PURE__ */ new Set());
    var e = l + "__bubble";
    a.has(e) || (U0(t, l, 2, !1), a.add(e));
  }
  function Yi(l, t, a) {
    var e = 0;
    t && (e |= 4), U0(
      a,
      l,
      e,
      t
    );
  }
  var Tn = "_reactListening" + Math.random().toString(36).slice(2);
  function Gi(l) {
    if (!l[Tn]) {
      l[Tn] = !0, Tf.forEach(function(a) {
        a !== "selectionchange" && (vd.has(a) || Yi(a, !1, l), Yi(a, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Tn] || (t[Tn] = !0, Yi("selectionchange", !1, t));
    }
  }
  function U0(l, t, a, e) {
    switch (uo(t)) {
      case 2:
        var u = Ld;
        break;
      case 8:
        u = xd;
        break;
      default:
        u = Ii;
    }
    a = u.bind(
      null,
      t,
      a,
      l
    ), u = void 0, !ec || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), e ? u !== void 0 ? l.addEventListener(t, a, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, a, !0) : u !== void 0 ? l.addEventListener(t, a, {
      passive: u
    }) : l.addEventListener(t, a, !1);
  }
  function Qi(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (; ; ) {
        if (e === null) return;
        var c = e.tag;
        if (c === 3 || c === 4) {
          var i = e.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = e.return; c !== null; ) {
              var f = c.tag;
              if ((f === 3 || f === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (c = La(i), c === null) return;
            if (f = c.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              e = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        e = e.return;
      }
    qf(function() {
      var v = n, r = tc(a), z = [];
      l: {
        var h = fs.get(l);
        if (h !== void 0) {
          var g = Ru, U = l;
          switch (l) {
            case "keypress":
              if (Nu(a) === 0) break l;
            case "keydown":
            case "keyup":
              g = iy;
              break;
            case "focusin":
              U = "focus", g = ic;
              break;
            case "focusout":
              U = "blur", g = ic;
              break;
            case "beforeblur":
            case "afterblur":
              g = ic;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Gf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = Wo;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = my;
              break;
            case us:
            case ns:
            case cs:
              g = Io;
              break;
            case is:
              g = yy;
              break;
            case "scroll":
            case "scrollend":
              g = wo;
              break;
            case "wheel":
              g = vy;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = ly;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Xf;
              break;
            case "toggle":
            case "beforetoggle":
              g = gy;
          }
          var G = (t & 4) !== 0, sl = !G && (l === "scroll" || l === "scrollend"), y = G ? h !== null ? h + "Capture" : null : h;
          G = [];
          for (var s = v, d; s !== null; ) {
            var E = s;
            if (d = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || d === null || y === null || (E = He(s, y), E != null && G.push(
              mu(s, E, d)
            )), sl) break;
            s = s.return;
          }
          0 < G.length && (h = new g(
            h,
            U,
            null,
            a,
            r
          ), z.push({ event: h, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (h = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", h && a !== lc && (U = a.relatedTarget || a.fromElement) && (La(U) || U[Za]))
            break l;
          if ((g || h) && (h = r.window === r ? r : (h = r.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (U = a.relatedTarget || a.toElement, g = v, U = U ? La(U) : null, U !== null && (sl = Z(U), G = U.tag, U !== sl || G !== 5 && G !== 27 && G !== 6) && (U = null)) : (g = null, U = v), g !== U)) {
            if (G = Gf, E = "onMouseLeave", y = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (G = Xf, E = "onPointerLeave", y = "onPointerEnter", s = "pointer"), sl = g == null ? h : Ne(g), d = U == null ? h : Ne(U), h = new G(
              E,
              s + "leave",
              g,
              a,
              r
            ), h.target = sl, h.relatedTarget = d, E = null, La(r) === v && (G = new G(
              y,
              s + "enter",
              U,
              a,
              r
            ), G.target = d, G.relatedTarget = sl, E = G), sl = E, g && U)
              t: {
                for (G = hd, y = g, s = U, d = 0, E = y; E; E = G(E))
                  d++;
                E = 0;
                for (var Y = s; Y; Y = G(Y))
                  E++;
                for (; 0 < d - E; )
                  y = G(y), d--;
                for (; 0 < E - d; )
                  s = G(s), E--;
                for (; d--; ) {
                  if (y === s || s !== null && y === s.alternate) {
                    G = y;
                    break t;
                  }
                  y = G(y), s = G(s);
                }
                G = null;
              }
            else G = null;
            g !== null && N0(
              z,
              h,
              g,
              G,
              !1
            ), U !== null && sl !== null && N0(
              z,
              sl,
              U,
              G,
              !0
            );
          }
        }
        l: {
          if (h = v ? Ne(v) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file")
            var ll = wf;
          else if (Kf(h))
            if ($f)
              ll = _y;
            else {
              ll = My;
              var R = Ay;
            }
          else
            g = h.nodeName, !g || g.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? v && Pn(v.elementType) && (ll = wf) : ll = py;
          if (ll && (ll = ll(l, v))) {
            Jf(
              z,
              ll,
              a,
              r
            );
            break l;
          }
          R && R(l, h, v), l === "focusout" && v && h.type === "number" && v.memoizedProps.value != null && In(h, "number", h.value);
        }
        switch (R = v ? Ne(v) : window, l) {
          case "focusin":
            (Kf(R) || R.contentEditable === "true") && (ka = R, dc = v, Xe = null);
            break;
          case "focusout":
            Xe = dc = ka = null;
            break;
          case "mousedown":
            vc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vc = !1, as(z, a, r);
            break;
          case "selectionchange":
            if (Dy) break;
          case "keydown":
          case "keyup":
            as(z, a, r);
        }
        var V;
        if (sc)
          l: {
            switch (l) {
              case "compositionstart":
                var F = "onCompositionStart";
                break l;
              case "compositionend":
                F = "onCompositionEnd";
                break l;
              case "compositionupdate":
                F = "onCompositionUpdate";
                break l;
            }
            F = void 0;
          }
        else
          Fa ? xf(l, a) && (F = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && (F = "onCompositionStart");
        F && (jf && a.locale !== "ko" && (Fa || F !== "onCompositionStart" ? F === "onCompositionEnd" && Fa && (V = Bf()) : (kt = r, uc = "value" in kt ? kt.value : kt.textContent, Fa = !0)), R = An(v, F), 0 < R.length && (F = new Qf(
          F,
          l,
          null,
          a,
          r
        ), z.push({ event: F, listeners: R }), V ? F.data = V : (V = Vf(a), V !== null && (F.data = V)))), (V = Sy ? by(l, a) : Ey(l, a)) && (F = An(v, "onBeforeInput"), 0 < F.length && (R = new Qf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          r
        ), z.push({
          event: R,
          listeners: F
        }), R.data = V)), od(
          z,
          l,
          v,
          a,
          r
        );
      }
      D0(z, t);
    });
  }
  function mu(l, t, a) {
    return {
      instance: l,
      listener: t,
      currentTarget: a
    };
  }
  function An(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = He(l, a), u != null && e.unshift(
        mu(l, u, n)
      ), u = He(l, t), u != null && e.push(
        mu(l, u, n)
      )), l.tag === 3) return e;
      l = l.return;
    }
    return [];
  }
  function hd(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function N0(l, t, a, e, u) {
    for (var n = t._reactName, c = []; a !== null && a !== e; ) {
      var i = a, f = i.alternate, v = i.stateNode;
      if (i = i.tag, f !== null && f === e) break;
      i !== 5 && i !== 26 && i !== 27 || v === null || (f = v, u ? (v = He(a, n), v != null && c.unshift(
        mu(a, v, f)
      )) : u || (v = He(a, n), v != null && c.push(
        mu(a, v, f)
      ))), a = a.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var gd = /\r\n?/g, rd = /\u0000|\uFFFD/g;
  function H0(l) {
    return (typeof l == "string" ? l : "" + l).replace(gd, `
`).replace(rd, "");
  }
  function R0(l, t) {
    return t = H0(t), H0(l) === t;
  }
  function fl(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string" ? t === "body" || t === "textarea" && e === "" || wa(l, e) : (typeof e == "number" || typeof e == "bigint") && t !== "body" && wa(l, "" + e);
        break;
      case "className":
        _u(l, "class", e);
        break;
      case "tabIndex":
        _u(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        _u(l, a, e);
        break;
      case "style":
        Rf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          _u(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Du("" + e), l.setAttribute(a, e);
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (a === "formAction" ? (t !== "input" && fl(l, t, "name", u.name, u, null), fl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), fl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), fl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (fl(l, t, "encType", u.encType, u, null), fl(l, t, "method", u.method, u, null), fl(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Du("" + e), l.setAttribute(a, e);
        break;
      case "onClick":
        e != null && (l.onclick = Ht);
        break;
      case "onScroll":
        e != null && $("scroll", l);
        break;
      case "onScrollEnd":
        e != null && $("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(o(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
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
        if (e == null || typeof e == "function" || typeof e == "boolean" || typeof e == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        a = Du("" + e), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "" + e) : l.removeAttribute(a);
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
        e && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0 ? l.setAttribute(a, "") : e !== !1 && e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null && typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e) ? l.removeAttribute(a) : l.setAttribute(a, e);
        break;
      case "popover":
        $("beforetoggle", l), $("toggle", l), pu(l, "popover", e);
        break;
      case "xlinkActuate":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          e
        );
        break;
      case "xlinkArcrole":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          e
        );
        break;
      case "xlinkRole":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          e
        );
        break;
      case "xlinkShow":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          e
        );
        break;
      case "xlinkTitle":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          e
        );
        break;
      case "xlinkType":
        Nt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          e
        );
        break;
      case "xmlBase":
        Nt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          e
        );
        break;
      case "xmlLang":
        Nt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          e
        );
        break;
      case "xmlSpace":
        Nt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          e
        );
        break;
      case "is":
        pu(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Ko.get(a) || a, pu(l, a, e));
    }
  }
  function Xi(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        Rf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(o(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string" ? wa(l, e) : (typeof e == "number" || typeof e == "bigint") && wa(l, "" + e);
        break;
      case "onScroll":
        e != null && $("scroll", l);
        break;
      case "onScrollEnd":
        e != null && $("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = Ht);
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
        if (!Af.hasOwnProperty(a))
          l: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), t = a.slice(2, u ? a.length - 7 : void 0), n = l[Ll] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof e == "function")) {
              typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, e, u);
              break l;
            }
            a in l ? l[a] = e : e === !0 ? l.setAttribute(a, "") : pu(l, a, e);
          }
    }
  }
  function ql(l, t, a) {
    switch (t) {
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
        $("error", l), $("load", l);
        var e = !1, u = !1, n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var c = a[n];
            if (c != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  fl(l, t, n, c, a, null);
              }
          }
        u && fl(l, t, "srcSet", a.srcSet, a, null), e && fl(l, t, "src", a.src, a, null);
        return;
      case "input":
        $("invalid", l);
        var i = n = c = u = null, f = null, v = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var r = a[e];
            if (r != null)
              switch (e) {
                case "name":
                  u = r;
                  break;
                case "type":
                  c = r;
                  break;
                case "checked":
                  f = r;
                  break;
                case "defaultChecked":
                  v = r;
                  break;
                case "value":
                  n = r;
                  break;
                case "defaultValue":
                  i = r;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (r != null)
                    throw Error(o(137, t));
                  break;
                default:
                  fl(l, t, e, r, a, null);
              }
          }
        Df(
          l,
          n,
          i,
          f,
          v,
          c,
          u,
          !1
        );
        return;
      case "select":
        $("invalid", l), e = c = n = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (i = a[u], i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                e = i;
              default:
                fl(l, t, u, i, a, null);
            }
        t = n, a = c, l.multiple = !!e, t != null ? Ja(l, !!e, t, !1) : a != null && Ja(l, !!e, a, !0);
        return;
      case "textarea":
        $("invalid", l), n = u = e = null;
        for (c in a)
          if (a.hasOwnProperty(c) && (i = a[c], i != null))
            switch (c) {
              case "value":
                e = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                fl(l, t, c, i, a, null);
            }
        Nf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          a.hasOwnProperty(f) && (e = a[f], e != null) && (f === "selected" ? l.selected = e && typeof e != "function" && typeof e != "symbol" : fl(l, t, f, e, a, null));
        return;
      case "dialog":
        $("beforetoggle", l), $("toggle", l), $("cancel", l), $("close", l);
        break;
      case "iframe":
      case "object":
        $("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < su.length; e++)
          $(su[e], l);
        break;
      case "image":
        $("error", l), $("load", l);
        break;
      case "details":
        $("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        $("error", l), $("load", l);
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
        for (v in a)
          if (a.hasOwnProperty(v) && (e = a[v], e != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                fl(l, t, v, e, a, null);
            }
        return;
      default:
        if (Pn(t)) {
          for (r in a)
            a.hasOwnProperty(r) && (e = a[r], e !== void 0 && Xi(
              l,
              t,
              r,
              e,
              a,
              void 0
            ));
          return;
        }
    }
    for (i in a)
      a.hasOwnProperty(i) && (e = a[i], e != null && fl(l, t, i, e, a, null));
  }
  function Sd(l, t, a, e) {
    switch (t) {
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
        var u = null, n = null, c = null, i = null, f = null, v = null, r = null;
        for (g in a) {
          var z = a[g];
          if (a.hasOwnProperty(g) && z != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = z;
              default:
                e.hasOwnProperty(g) || fl(l, t, g, null, e, z);
            }
        }
        for (var h in e) {
          var g = e[h];
          if (z = a[h], e.hasOwnProperty(h) && (g != null || z != null))
            switch (h) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                v = g;
                break;
              case "defaultChecked":
                r = g;
                break;
              case "value":
                c = g;
                break;
              case "defaultValue":
                i = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(o(137, t));
                break;
              default:
                g !== z && fl(
                  l,
                  t,
                  h,
                  g,
                  e,
                  z
                );
            }
        }
        kn(
          l,
          c,
          i,
          f,
          v,
          r,
          n,
          u
        );
        return;
      case "select":
        g = c = i = h = null;
        for (n in a)
          if (f = a[n], a.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = f;
              default:
                e.hasOwnProperty(n) || fl(
                  l,
                  t,
                  n,
                  null,
                  e,
                  f
                );
            }
        for (u in e)
          if (n = e[u], f = a[u], e.hasOwnProperty(u) && (n != null || f != null))
            switch (u) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && fl(
                  l,
                  t,
                  u,
                  n,
                  e,
                  f
                );
            }
        t = i, a = c, e = g, h != null ? Ja(l, !!a, h, !1) : !!e != !!a && (t != null ? Ja(l, !!a, t, !0) : Ja(l, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        g = h = null;
        for (i in a)
          if (u = a[i], a.hasOwnProperty(i) && u != null && !e.hasOwnProperty(i))
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                fl(l, t, i, null, e, u);
            }
        for (c in e)
          if (u = e[c], n = a[c], e.hasOwnProperty(c) && (u != null || n != null))
            switch (c) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && fl(l, t, c, u, e, n);
            }
        Uf(l, h, g);
        return;
      case "option":
        for (var U in a)
          h = a[U], a.hasOwnProperty(U) && h != null && !e.hasOwnProperty(U) && (U === "selected" ? l.selected = !1 : fl(
            l,
            t,
            U,
            null,
            e,
            h
          ));
        for (f in e)
          h = e[f], g = a[f], e.hasOwnProperty(f) && h !== g && (h != null || g != null) && (f === "selected" ? l.selected = h && typeof h != "function" && typeof h != "symbol" : fl(
            l,
            t,
            f,
            h,
            e,
            g
          ));
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
        for (var G in a)
          h = a[G], a.hasOwnProperty(G) && h != null && !e.hasOwnProperty(G) && fl(l, t, G, null, e, h);
        for (v in e)
          if (h = e[v], g = a[v], e.hasOwnProperty(v) && h !== g && (h != null || g != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(o(137, t));
                break;
              default:
                fl(
                  l,
                  t,
                  v,
                  h,
                  e,
                  g
                );
            }
        return;
      default:
        if (Pn(t)) {
          for (var sl in a)
            h = a[sl], a.hasOwnProperty(sl) && h !== void 0 && !e.hasOwnProperty(sl) && Xi(
              l,
              t,
              sl,
              void 0,
              e,
              h
            );
          for (r in e)
            h = e[r], g = a[r], !e.hasOwnProperty(r) || h === g || h === void 0 && g === void 0 || Xi(
              l,
              t,
              r,
              h,
              e,
              g
            );
          return;
        }
    }
    for (var y in a)
      h = a[y], a.hasOwnProperty(y) && h != null && !e.hasOwnProperty(y) && fl(l, t, y, null, e, h);
    for (z in e)
      h = e[z], g = a[z], !e.hasOwnProperty(z) || h === g || h == null && g == null || fl(l, t, z, h, e, g);
  }
  function C0(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function bd() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0; e < a.length; e++) {
        var u = a[e], n = u.transferSize, c = u.initiatorType, i = u.duration;
        if (n && i && C0(c)) {
          for (c = 0, i = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e], v = f.startTime;
            if (v > i) break;
            var r = f.transferSize, z = f.initiatorType;
            r && C0(z) && (f = f.responseEnd, c += r * (f < i ? 1 : (i - v) / (f - v)));
          }
          if (--e, t += 8 * (n + c) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var ji = null, Zi = null;
  function Mn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function q0(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function B0(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Li(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var xi = null;
  function Ed() {
    var l = window.event;
    return l && l.type === "popstate" ? l === xi ? !1 : (xi = l, !0) : (xi = null, !1);
  }
  var Y0 = typeof setTimeout == "function" ? setTimeout : void 0, zd = typeof clearTimeout == "function" ? clearTimeout : void 0, G0 = typeof Promise == "function" ? Promise : void 0, Td = typeof queueMicrotask == "function" ? queueMicrotask : typeof G0 < "u" ? function(l) {
    return G0.resolve(null).then(l).catch(Ad);
  } : Y0;
  function Ad(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function va(l) {
    return l === "head";
  }
  function Q0(l, t) {
    var a = t, e = 0;
    do {
      var u = a.nextSibling;
      if (l.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (e === 0) {
            l.removeChild(u), Me(t);
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          e++;
        else if (a === "html")
          ou(l.ownerDocument.documentElement);
        else if (a === "head") {
          a = l.ownerDocument.head, ou(a);
          for (var n = a.firstChild; n; ) {
            var c = n.nextSibling, i = n.nodeName;
            n[Ue] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = c;
          }
        } else
          a === "body" && ou(l.ownerDocument.body);
      a = u;
    } while (a);
    Me(t);
  }
  function X0(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), e && e.nodeType === 8)
        if (a = e.data, a === "/$") {
          if (l === 0) break;
          l--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || l++;
      a = e;
    } while (a);
  }
  function Vi(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vi(a), Wn(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function Md(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (e) {
        if (!l[Ue])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = ht(l.nextSibling), l === null) break;
    }
    return null;
  }
  function pd(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = ht(l.nextSibling), l === null)) return null;
    return l;
  }
  function j0(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = ht(l.nextSibling), l === null)) return null;
    return l;
  }
  function Ki(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Ji(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function _d(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var e = function() {
        t(), a.removeEventListener("DOMContentLoaded", e);
      };
      a.addEventListener("DOMContentLoaded", e), l._reactRetry = e;
    }
  }
  function ht(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var wi = null;
  function Z0(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return ht(l.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function L0(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function x0(l, t, a) {
    switch (t = Mn(a), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function ou(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Wn(l);
  }
  var gt = /* @__PURE__ */ new Map(), V0 = /* @__PURE__ */ new Set();
  function pn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var wt = _.d;
  _.d = {
    f: Od,
    r: Dd,
    D: Ud,
    C: Nd,
    L: Hd,
    m: Rd,
    X: qd,
    S: Cd,
    M: Bd
  };
  function Od() {
    var l = wt.f(), t = gn();
    return l || t;
  }
  function Dd(l) {
    var t = xa(l);
    t !== null && t.tag === 5 && t.type === "form" ? im(t) : wt.r(l);
  }
  var ze = typeof document > "u" ? null : document;
  function K0(l, t, a) {
    var e = ze;
    if (e && typeof t == "string" && t) {
      var u = ft(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), V0.has(u) || (V0.add(u), l = { rel: l, crossOrigin: a, href: t }, e.querySelector(u) === null && (t = e.createElement("link"), ql(t, "link", l), Ol(t), e.head.appendChild(t)));
    }
  }
  function Ud(l) {
    wt.D(l), K0("dns-prefetch", l, null);
  }
  function Nd(l, t) {
    wt.C(l, t), K0("preconnect", l, t);
  }
  function Hd(l, t, a) {
    wt.L(l, t, a);
    var e = ze;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + ft(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + ft(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + ft(
        a.imageSizes
      ) + '"]')) : u += '[href="' + ft(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Te(l);
          break;
        case "script":
          n = Ae(l);
      }
      gt.has(n) || (l = D(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : l,
          as: t
        },
        a
      ), gt.set(n, l), e.querySelector(u) !== null || t === "style" && e.querySelector(yu(n)) || t === "script" && e.querySelector(du(n)) || (t = e.createElement("link"), ql(t, "link", l), Ol(t), e.head.appendChild(t)));
    }
  }
  function Rd(l, t) {
    wt.m(l, t);
    var a = ze;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + ft(e) + '"][href="' + ft(l) + '"]', n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ae(l);
      }
      if (!gt.has(n) && (l = D({ rel: "modulepreload", href: l }, t), gt.set(n, l), a.querySelector(u) === null)) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(du(n)))
              return;
        }
        e = a.createElement("link"), ql(e, "link", l), Ol(e), a.head.appendChild(e);
      }
    }
  }
  function Cd(l, t, a) {
    wt.S(l, t, a);
    var e = ze;
    if (e && l) {
      var u = Va(e).hoistableStyles, n = Te(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = e.querySelector(
          yu(n)
        ))
          i.loading = 5;
        else {
          l = D(
            { rel: "stylesheet", href: l, "data-precedence": t },
            a
          ), (a = gt.get(n)) && $i(l, a);
          var f = c = e.createElement("link");
          Ol(f), ql(f, "link", l), f._p = new Promise(function(v, r) {
            f.onload = v, f.onerror = r;
          }), f.addEventListener("load", function() {
            i.loading |= 1;
          }), f.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, _n(c, t, e);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: i
        }, u.set(n, c);
      }
    }
  }
  function qd(l, t) {
    wt.X(l, t);
    var a = ze;
    if (a && l) {
      var e = Va(a).hoistableScripts, u = Ae(l), n = e.get(u);
      n || (n = a.querySelector(du(u)), n || (l = D({ src: l, async: !0 }, t), (t = gt.get(u)) && Wi(l, t), n = a.createElement("script"), Ol(n), ql(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function Bd(l, t) {
    wt.M(l, t);
    var a = ze;
    if (a && l) {
      var e = Va(a).hoistableScripts, u = Ae(l), n = e.get(u);
      n || (n = a.querySelector(du(u)), n || (l = D({ src: l, async: !0, type: "module" }, t), (t = gt.get(u)) && Wi(l, t), n = a.createElement("script"), Ol(n), ql(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function J0(l, t, a, e) {
    var u = (u = J.current) ? pn(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Te(a.href), a = Va(
          u
        ).hoistableStyles, e = a.get(t), e || (e = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          l = Te(a.href);
          var n = Va(
            u
          ).hoistableStyles, c = n.get(l);
          if (c || (u = u.ownerDocument || u, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, c), (n = u.querySelector(
            yu(l)
          )) && !n._p && (c.instance = n, c.state.loading = 5), gt.has(l) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, gt.set(l, a), n || Yd(
            u,
            l,
            a,
            c.state
          ))), t && e === null)
            throw Error(o(528, ""));
          return c;
        }
        if (t && e !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ae(a), a = Va(
          u
        ).hoistableScripts, e = a.get(t), e || (e = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function Te(l) {
    return 'href="' + ft(l) + '"';
  }
  function yu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function w0(l) {
    return D({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Yd(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? e.loading = 1 : (t = l.createElement("link"), e.preload = t, t.addEventListener("load", function() {
      return e.loading |= 1;
    }), t.addEventListener("error", function() {
      return e.loading |= 2;
    }), ql(t, "link", a), Ol(t), l.head.appendChild(t));
  }
  function Ae(l) {
    return '[src="' + ft(l) + '"]';
  }
  function du(l) {
    return "script[async]" + l;
  }
  function $0(l, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var e = l.querySelector(
            'style[data-href~="' + ft(a.href) + '"]'
          );
          if (e)
            return t.instance = e, Ol(e), e;
          var u = D({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return e = (l.ownerDocument || l).createElement(
            "style"
          ), Ol(e), ql(e, "style", u), _n(e, a.precedence, l), t.instance = e;
        case "stylesheet":
          u = Te(a.href);
          var n = l.querySelector(
            yu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ol(n), n;
          e = w0(a), (u = gt.get(u)) && $i(e, u), n = (l.ownerDocument || l).createElement("link"), Ol(n);
          var c = n;
          return c._p = new Promise(function(i, f) {
            c.onload = i, c.onerror = f;
          }), ql(n, "link", e), t.state.loading |= 4, _n(n, a.precedence, l), t.instance = n;
        case "script":
          return n = Ae(a.src), (u = l.querySelector(
            du(n)
          )) ? (t.instance = u, Ol(u), u) : (e = a, (u = gt.get(n)) && (e = D({}, a), Wi(e, u)), l = l.ownerDocument || l, u = l.createElement("script"), Ol(u), ql(u, "link", e), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (e = t.instance, t.state.loading |= 4, _n(e, a.precedence, l));
    return t.instance;
  }
  function _n(l, t, a) {
    for (var e = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = e.length ? e[e.length - 1] : null, n = u, c = 0; c < e.length; c++) {
      var i = e[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
  }
  function $i(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Wi(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var On = null;
  function W0(l, t, a) {
    if (On === null) {
      var e = /* @__PURE__ */ new Map(), u = On = /* @__PURE__ */ new Map();
      u.set(a, e);
    } else
      u = On, e = u.get(a), e || (e = /* @__PURE__ */ new Map(), u.set(a, e));
    if (e.has(l)) return e;
    for (e.set(l, null), a = a.getElementsByTagName(l), u = 0; u < a.length; u++) {
      var n = a[u];
      if (!(n[Ue] || n[Nl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = e.get(c);
        i ? i.push(n) : e.set(c, [n]);
      }
    }
    return e;
  }
  function F0(l, t, a) {
    l = l.ownerDocument || l, l.head.insertBefore(
      a,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Gd(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function k0(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Qd(l, t, a, e) {
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = Te(e.href), n = t.querySelector(
          yu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Dn.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = n, Ol(n);
          return;
        }
        n = t.ownerDocument || t, e = w0(e), (u = gt.get(u)) && $i(e, u), n = n.createElement("link"), Ol(n);
        var c = n;
        c._p = new Promise(function(i, f) {
          c.onload = i, c.onerror = f;
        }), ql(n, "link", e), a.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = Dn.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Fi = 0;
  function Xd(l, t) {
    return l.stylesheets && l.count === 0 && Nn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(a) {
      var e = setTimeout(function() {
        if (l.stylesheets && Nn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Fi === 0 && (Fi = 62500 * bd());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Nn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Fi ? 50 : 800) + t
      );
      return l.unsuspend = a, function() {
        l.unsuspend = null, clearTimeout(e), clearTimeout(u);
      };
    } : null;
  }
  function Dn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Nn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Un = null;
  function Nn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Un = /* @__PURE__ */ new Map(), t.forEach(jd, l), Un = null, Dn.call(l));
  }
  function jd(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Un.get(l);
      if (a) var e = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Un.set(l, a);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), e = c);
        }
        e && a.set(null, e);
      }
      u = t.instance, c = u.getAttribute("data-precedence"), n = a.get(c) || e, n === e && a.set(null, u), a.set(c, u), this.count++, e = Dn.bind(this), u.addEventListener("load", e), u.addEventListener("error", e), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var vu = {
    $$typeof: Bl,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function Zd(l, t, a, e, u, n, c, i, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kn(0), this.hiddenUpdates = Kn(null), this.identifierPrefix = e, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function I0(l, t, a, e, u, n, c, i, f, v, r, z) {
    return l = new Zd(
      l,
      t,
      a,
      c,
      f,
      v,
      r,
      z,
      i
    ), t = 1, n === !0 && (t |= 24), n = lt(3, null, null, t), l.current = n, n.stateNode = l, t = Uc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: e,
      isDehydrated: a,
      cache: t
    }, Cc(n), l;
  }
  function P0(l) {
    return l ? (l = le, l) : le;
  }
  function lo(l, t, a, e, u, n) {
    u = P0(u), e.context === null ? e.context = u : e.pendingContext = u, e = ea(t), e.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (e.callback = n), a = ua(l, e, t), a !== null && ($l(a, l, t), Je(a, l, t));
  }
  function to(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ki(l, t) {
    to(l, t), (l = l.alternate) && to(l, t);
  }
  function ao(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Oa(l, 67108864);
      t !== null && $l(t, l, 67108864), ki(l, 67108864);
    }
  }
  function eo(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = nt();
      t = Jn(t);
      var a = Oa(l, t);
      a !== null && $l(a, l, t), ki(l, t);
    }
  }
  var Hn = !0;
  function Ld(l, t, a, e) {
    var u = S.T;
    S.T = null;
    var n = _.p;
    try {
      _.p = 2, Ii(l, t, a, e);
    } finally {
      _.p = n, S.T = u;
    }
  }
  function xd(l, t, a, e) {
    var u = S.T;
    S.T = null;
    var n = _.p;
    try {
      _.p = 8, Ii(l, t, a, e);
    } finally {
      _.p = n, S.T = u;
    }
  }
  function Ii(l, t, a, e) {
    if (Hn) {
      var u = Pi(e);
      if (u === null)
        Qi(
          l,
          t,
          e,
          Rn,
          a
        ), no(l, e);
      else if (Kd(
        u,
        l,
        t,
        a,
        e
      ))
        e.stopPropagation();
      else if (no(l, e), t & 4 && -1 < Vd.indexOf(l)) {
        for (; u !== null; ) {
          var n = xa(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var c = Ta(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var f = 1 << 31 - Il(c);
                      i.entanglements[1] |= f, c &= ~f;
                    }
                    Ot(n), (al & 6) === 0 && (vn = Fl() + 500, fu(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = Oa(n, 2), i !== null && $l(i, n, 2), gn(), ki(n, 2);
            }
          if (n = Pi(e), n === null && Qi(
            l,
            t,
            e,
            Rn,
            a
          ), n === u) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else
        Qi(
          l,
          t,
          e,
          null,
          a
        );
    }
  }
  function Pi(l) {
    return l = tc(l), lf(l);
  }
  var Rn = null;
  function lf(l) {
    if (Rn = null, l = La(l), l !== null) {
      var t = Z(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (l = X(t), l !== null) return l;
          l = null;
        } else if (a === 31) {
          if (l = P(t), l !== null) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Rn = l, null;
  }
  function uo(l) {
    switch (l) {
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
        switch (Uo()) {
          case yf:
            return 2;
          case df:
            return 8;
          case Eu:
          case No:
            return 32;
          case vf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tf = !1, ha = null, ga = null, ra = null, hu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map(), Sa = [], Vd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function no(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ha = null;
        break;
      case "dragenter":
      case "dragleave":
        ga = null;
        break;
      case "mouseover":
      case "mouseout":
        ra = null;
        break;
      case "pointerover":
      case "pointerout":
        hu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gu.delete(t.pointerId);
    }
  }
  function ru(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: e,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = xa(t), t !== null && ao(t)), l) : (l.eventSystemFlags |= e, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function Kd(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return ha = ru(
          ha,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "dragenter":
        return ga = ru(
          ga,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "mouseover":
        return ra = ru(
          ra,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return hu.set(
          n,
          ru(
            hu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, gu.set(
          n,
          ru(
            gu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
    }
    return !1;
  }
  function co(l) {
    var t = La(l.target);
    if (t !== null) {
      var a = Z(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = X(a), t !== null) {
            l.blockedOn = t, Ef(l.priority, function() {
              eo(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = P(a), t !== null) {
            l.blockedOn = t, Ef(l.priority, function() {
              eo(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Cn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = Pi(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(
          a.type,
          a
        );
        lc = e, a.target.dispatchEvent(e), lc = null;
      } else
        return t = xa(a), t !== null && ao(t), l.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function io(l, t, a) {
    Cn(l) && a.delete(t);
  }
  function Jd() {
    tf = !1, ha !== null && Cn(ha) && (ha = null), ga !== null && Cn(ga) && (ga = null), ra !== null && Cn(ra) && (ra = null), hu.forEach(io), gu.forEach(io);
  }
  function qn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, tf || (tf = !0, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      Jd
    )));
  }
  var Bn = null;
  function fo(l) {
    Bn !== l && (Bn = l, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      function() {
        Bn === l && (Bn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t], e = l[t + 1], u = l[t + 2];
          if (typeof e != "function") {
            if (lf(e || a) === null)
              continue;
            break;
          }
          var n = xa(a);
          n !== null && (l.splice(t, 3), t -= 3, Pc(
            n,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: e
            },
            e,
            u
          ));
        }
      }
    ));
  }
  function Me(l) {
    function t(f) {
      return qn(f, l);
    }
    ha !== null && qn(ha, l), ga !== null && qn(ga, l), ra !== null && qn(ra, l), hu.forEach(t), gu.forEach(t);
    for (var a = 0; a < Sa.length; a++) {
      var e = Sa[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < Sa.length && (a = Sa[0], a.blockedOn === null); )
      co(a), a.blockedOn === null && Sa.shift();
    if (a = (l.ownerDocument || l).$$reactFormReplay, a != null)
      for (e = 0; e < a.length; e += 3) {
        var u = a[e], n = a[e + 1], c = u[Ll] || null;
        if (typeof n == "function")
          c || fo(a);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, c = n[Ll] || null)
              i = c.formAction;
            else if (lf(u) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? a[e + 1] = i : (a.splice(e, 3), e -= 3), fo(a);
        }
      }
  }
  function so() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(c) {
            return u = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), e || setTimeout(a, 20);
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var e = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        e = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function af(l) {
    this._internalRoot = l;
  }
  Yn.prototype.render = af.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, e = nt();
    lo(a, e, l, t, null, null);
  }, Yn.prototype.unmount = af.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      lo(l.current, 2, null, l, null, null), gn(), t[Za] = null;
    }
  };
  function Yn(l) {
    this._internalRoot = l;
  }
  Yn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = bf();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < Sa.length && t !== 0 && t < Sa[a].priority; a++) ;
      Sa.splice(a, 0, l), a === 0 && co(l);
    }
  };
  var mo = B.version;
  if (mo !== "19.2.8")
    throw Error(
      o(
        527,
        mo,
        "19.2.8"
      )
    );
  _.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = A(t), l = l !== null ? C(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var wd = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gn.isDisabled && Gn.supportsFiber)
      try {
        _e = Gn.inject(
          wd
        ), kl = Gn;
      } catch {
      }
  }
  return Su.createRoot = function(l, t) {
    if (!K(l)) throw Error(o(299));
    var a = !1, e = "", u = rm, n = Sm, c = bm;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (e = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = I0(
      l,
      1,
      !1,
      null,
      null,
      a,
      e,
      null,
      u,
      n,
      c,
      so
    ), l[Za] = t.current, Gi(l), new af(t);
  }, Su.hydrateRoot = function(l, t, a) {
    if (!K(l)) throw Error(o(299));
    var e = !1, u = "", n = rm, c = Sm, i = bm, f = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (i = a.onRecoverableError), a.formState !== void 0 && (f = a.formState)), t = I0(
      l,
      1,
      !0,
      t,
      a ?? null,
      e,
      u,
      f,
      n,
      c,
      i,
      so
    ), t.context = P0(null), a = t.current, e = nt(), e = Jn(e), u = ea(e), u.callback = null, ua(a, u, e), a = e, t.current.lanes = a, De(t, a), Ot(t), l[Za] = t.current, Gi(l), new Yn(t);
  }, Su.version = "19.2.8", Su;
}
var bo;
function ev() {
  if (bo) return uf.exports;
  bo = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (B) {
        console.error(B);
      }
  }
  return b(), uf.exports = av(), uf.exports;
}
var Qn = ev();
const Eo = () => {
  const b = /(?:Chrome|CriOS)\//.test(navigator.userAgent) && !/(?:Edg|OPR|SamsungBrowser)\//.test(navigator.userAgent), B = navigator.connection, N = !navigator.deviceMemory || navigator.deviceMemory >= 4, o = !B?.saveData && B?.effectiveType !== "2g";
  return b && N && o && CSS.supports("backdrop-filter", "blur(1px)") && !matchMedia("(prefers-reduced-transparency: reduce)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches && !matchMedia("(prefers-contrast: more)").matches;
};
function uv() {
  const [b, B] = M.useState(Eo), [N, o] = M.useState(null), [K, Z] = M.useState(() => document.getElementById("dock")?.style.display !== "none");
  return M.useEffect(() => {
    const X = matchMedia("(prefers-reduced-transparency: reduce)"), P = () => B(Eo());
    return X.addEventListener?.("change", P), () => X.removeEventListener?.("change", P);
  }, []), M.useEffect(() => {
    const X = document.getElementById("dock");
    if (!X) return;
    const P = () => Z(getComputedStyle(X).display !== "none"), p = new MutationObserver(P);
    return p.observe(X, { attributes: !0, attributeFilter: ["style", "class"] }), P(), () => p.disconnect();
  }, []), M.useEffect(() => {
    if (!b || !K) return;
    let X = !0;
    return import("./liquid-jKBKPmLA.js").then((P) => {
      X && o(() => P.default);
    }).catch(() => {
    }), () => {
      X = !1;
    };
  }, [b, K]), !b || !K || !N ? null : /* @__PURE__ */ M.createElement(
    N,
    {
      className: "statsgym-liquid-dock",
      style: { position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%", pointerEvents: "none" },
      padding: "0",
      displacementScale: 26,
      blurAmount: 0.042,
      saturation: 116,
      aberrationIntensity: 0.55,
      elasticity: 0.1,
      cornerRadius: 22,
      mode: "standard",
      overLight: !1
    },
    /* @__PURE__ */ M.createElement("div", { "aria-hidden": "true", style: { width: "100%", height: "100%" } })
  );
}
function zo() {
  const b = document.getElementById("dock");
  if (!b || b.dataset.liquidMounted) return;
  b.dataset.liquidMounted = "true";
  const B = document.createElement("div");
  B.className = "statsgym-liquid-dock-host", B.setAttribute("aria-hidden", "true"), b.prepend(B), Qn.createRoot(B).render(/* @__PURE__ */ M.createElement(uv, null));
}
const nv = ["GAM", "GAF", "GR"], cv = {
  GAM: { id: 2677368, initials: "AM", name: "Anthony MANSARD", club: "OLYMPIQUE ANTIBES JUAN LES PINS GYMNASTIQUE…", tone: "blue" },
  GAF: { id: 2716113, initials: "EC", name: "Elena COLAS", club: "AVOINE BEAUMONT GYMNASTIQUE", tone: "purple" },
  GR: { id: 2344697, initials: "HK", name: "Hélène KARBANOV", club: "CALAIS GRS", tone: "pink" }
};
function iv({ active: b }) {
  const B = M.useRef(null);
  return M.useEffect(() => {
    if (!b || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const N = B.current, o = N?.getContext("2d");
    if (!o) return;
    let K, Z = 0, X = 0, P = [];
    const p = () => {
      const C = Math.min(window.devicePixelRatio || 1, 2);
      Z = window.innerWidth, X = window.innerHeight, N.width = Z * C, N.height = X * C, N.style.width = `${Z}px`, N.style.height = `${X}px`, o.setTransform(C, 0, 0, C, 0, 0);
      const D = Math.max(32, Math.min(76, Math.round(Z * X / 18e3)));
      P = Array.from({ length: D }, () => ({ x: Math.random() * Z, y: Math.random() * X, vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24, r: 1 + Math.random() * 1.5 }));
    }, A = () => {
      o.clearRect(0, 0, Z, X), P.forEach((C) => {
        C.x += C.vx, C.y += C.vy, (C.x < 0 || C.x > Z) && (C.vx *= -1), (C.y < 0 || C.y > X) && (C.vy *= -1);
      });
      for (let C = 0; C < P.length; C += 1) {
        const D = P[C];
        o.fillStyle = "rgba(125, 211, 252, .68)", o.beginPath(), o.arc(D.x, D.y, D.r, 0, Math.PI * 2), o.fill();
        for (let q = C + 1; q < P.length; q += 1) {
          const ml = P[q], pl = Math.hypot(D.x - ml.x, D.y - ml.y);
          pl < 150 && (o.strokeStyle = `rgba(96, 165, 250, ${0.34 * (1 - pl / 150)})`, o.lineWidth = 1, o.beginPath(), o.moveTo(D.x, D.y), o.lineTo(ml.x, ml.y), o.stroke());
        }
      }
      K = requestAnimationFrame(A);
    };
    return p(), A(), window.addEventListener("resize", p), () => {
      cancelAnimationFrame(K), window.removeEventListener("resize", p);
    };
  }, [b]), /* @__PURE__ */ M.createElement("div", { className: `statsgym-network-background ${b ? "is-active" : ""}`, "aria-hidden": "true" }, /* @__PURE__ */ M.createElement("canvas", { ref: B }));
}
function fv() {
  const [b, B] = M.useState("GAM"), [N, o] = M.useState(!1), [K, Z] = M.useState(null), [X, P] = M.useState(""), p = cv[b], A = async (D) => {
    if (!K) {
      Z(D), P("");
      try {
        if (!window.StatsGymLegacy?.openDemoProfile) throw new Error("Navigation indisponible");
        await window.StatsGymLegacy.openDemoProfile({ discipline: b, athleteId: p.id, tab: D });
      } catch (q) {
        console.error("Impossible d’ouvrir la démo StatsGym :", q), P("Impossible d’ouvrir cette fiche. Réessaie.");
      } finally {
        Z(null);
      }
    }
  }, C = !!K;
  return /* @__PURE__ */ M.createElement("main", { className: `statsgym-search-home ${N ? "network-on" : ""}`, "aria-label": "Bienvenue sur StatsGym" }, /* @__PURE__ */ M.createElement(iv, { active: N }), /* @__PURE__ */ M.createElement("section", { className: "statsgym-welcome-content" }, /* @__PURE__ */ M.createElement("header", { className: "statsgym-welcome-heading" }, /* @__PURE__ */ M.createElement("h1", null, "StatsGym"), /* @__PURE__ */ M.createElement("h2", null, "Toute une carrière, ", /* @__PURE__ */ M.createElement("span", null, "réunie."))), /* @__PURE__ */ M.createElement("section", { className: "statsgym-demo-card statsgym-glass-card", "aria-label": "Démo interactive" }, /* @__PURE__ */ M.createElement("div", { className: "statsgym-react-segment", role: "tablist", "aria-label": "Discipline de démonstration" }, nv.map((D) => /* @__PURE__ */ M.createElement("button", { key: D, type: "button", role: "tab", "aria-selected": D === b, disabled: C, onClick: () => {
    B(D), P("");
  } }, D))), /* @__PURE__ */ M.createElement("button", { className: "statsgym-demo-athlete", type: "button", "aria-label": `Ouvrir la démo de ${p.name}`, "aria-busy": K === "apercu", disabled: C, onClick: () => A("apercu") }, /* @__PURE__ */ M.createElement("span", { className: `statsgym-demo-avatar ${p.tone}` }, p.initials), /* @__PURE__ */ M.createElement("span", null, /* @__PURE__ */ M.createElement("strong", null, p.name), /* @__PURE__ */ M.createElement("small", null, p.club)), /* @__PURE__ */ M.createElement("span", { className: K === "apercu" ? "statsgym-loading-indicator" : "", "aria-hidden": "true" }, K === "apercu" ? "" : "›"))), /* @__PURE__ */ M.createElement("button", { className: "statsgym-access-card statsgym-glass-card", type: "button", "aria-busy": K === "classement", disabled: C, onClick: () => A("classement") }, /* @__PURE__ */ M.createElement("strong", null, "Accède à tes propres statistiques"), /* @__PURE__ */ M.createElement("span", { className: "statsgym-access-copy" }, "Cette démo présente la carrière de 3 gymnastes.", /* @__PURE__ */ M.createElement("b", null, "Pour demander l’accès à tes propres données, et nous aider à créer l’outil idéal…"), /* @__PURE__ */ M.createElement("em", null, "ça se passe juste ici 👇")), /* @__PURE__ */ M.createElement("span", { className: "statsgym-access-action" }, K === "classement" ? /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("span", { className: "statsgym-loading-indicator", "aria-hidden": "true" }), " Ouverture du questionnaire…") : /* @__PURE__ */ M.createElement(M.Fragment, null, "💬 Je demande l’accès à mes statistiques ", /* @__PURE__ */ M.createElement("i", { "aria-hidden": "true" }, "→")))), X && /* @__PURE__ */ M.createElement("p", { className: "statsgym-home-status", role: "alert" }, X)), /* @__PURE__ */ M.createElement("p", { className: "statsgym-welcome-footer" }, "Tous tes résultats, réunis"), /* @__PURE__ */ M.createElement("div", { className: "statsgym-background-choice", role: "group", "aria-label": "Comparer les fonds" }, /* @__PURE__ */ M.createElement("button", { type: "button", className: N ? "" : "active", "aria-pressed": !N, onClick: () => o(!1) }, "Original"), /* @__PURE__ */ M.createElement("button", { type: "button", className: N ? "active" : "", "aria-pressed": N, onClick: () => o(!0) }, "Réseau")));
}
function To() {
  const b = document.getElementById("screen-search");
  if (!b || b.dataset.reactMounted) return;
  b.dataset.reactMounted = "true", b.classList.add("react-search-active");
  const B = document.createElement("div");
  B.className = "statsgym-search-root", b.append(B), Qn.createRoot(B).render(/* @__PURE__ */ M.createElement(fv, null));
}
function Ao(b) {
  return b.length ? b.reduce((B, N) => B + N, 0) / b.length : null;
}
function sv({ rows: b, showKpis: B }) {
  if (!b.length) return null;
  const N = b[0], o = [...new Set(b.map((q) => q.saison))].sort(), K = new Set(b.map((q) => q.comp_id)).size, Z = b.map((q) => q.nf).filter(Number.isFinite), X = b.flatMap((q) => q.agres || []).map((q) => q.ne).filter(Number.isFinite), P = /* @__PURE__ */ new Map();
  b.flatMap((q) => q.agres || []).filter((q) => Number.isFinite(q.ne)).forEach((q) => {
    const ml = P.get(q.agres) || [];
    ml.push(q.ne), P.set(q.agres, ml);
  });
  const p = [...P].map(([q, ml]) => ({ name: q, value: Ao(ml) })).sort((q, ml) => ml.value - q.value), A = `${N.prenom?.[0] || ""}${N.nom?.[0] || ""}`, C = [...b].reverse().find((q) => q.club)?.club || "Club non renseigné", D = [
    ["Meilleure NF", Math.max(...Z).toFixed(2), "meilleure note enregistrée"],
    ["NE moyenne", Ao(X)?.toFixed(2) || "—", "tous agrès confondus"],
    ["Agrès fort", p[0]?.name || "—", p[0] ? `NE moy. ${p[0].value.toFixed(2)}` : ""],
    ["À travailler", p.at(-1)?.name || "—", p.at(-1) ? `NE moy. ${p.at(-1).value.toFixed(2)}` : ""]
  ];
  return /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("header", { className: "statsgym-react-profile-header" }, /* @__PURE__ */ M.createElement("button", { type: "button", className: "statsgym-profile-back", onClick: () => window.goToSearch(), "aria-label": "Retour à la recherche" }, "‹"), /* @__PURE__ */ M.createElement("span", { className: "statsgym-profile-avatar" }, A), /* @__PURE__ */ M.createElement("span", { className: "statsgym-profile-identity" }, /* @__PURE__ */ M.createElement("strong", null, N.prenom, " ", N.nom), /* @__PURE__ */ M.createElement("small", null, C)), /* @__PURE__ */ M.createElement("span", { className: "statsgym-profile-stat" }, /* @__PURE__ */ M.createElement("b", null, K), /* @__PURE__ */ M.createElement("small", null, "Compét.")), /* @__PURE__ */ M.createElement("span", { className: "statsgym-profile-stat" }, /* @__PURE__ */ M.createElement("b", null, o.length), /* @__PURE__ */ M.createElement("small", null, "Saisons"))), B && /* @__PURE__ */ M.createElement("section", { className: "statsgym-react-kpis", "aria-label": "Repères sportifs" }, D.map(([q, ml, pl], Ul) => /* @__PURE__ */ M.createElement("article", { key: q, className: `statsgym-react-kpi kpi-${Ul}` }, /* @__PURE__ */ M.createElement("small", null, q), /* @__PURE__ */ M.createElement("strong", null, ml), /* @__PURE__ */ M.createElement("span", null, pl)))));
}
function mv() {
  const [b, B] = M.useState(() => window.StatsGymLegacy?.rows?.() || []), [N, o] = M.useState(() => document.querySelector(".dock-btn.active")?.dataset.tab || "apercu");
  return M.useEffect(() => {
    const K = (Z) => B(Z.detail.rows);
    return window.addEventListener("statsgym:profile-loaded", K), () => window.removeEventListener("statsgym:profile-loaded", K);
  }, []), M.useEffect(() => {
    const K = document.getElementById("dock");
    if (!K) return;
    const Z = () => o(K.querySelector(".dock-btn.active")?.dataset.tab || "apercu"), X = new MutationObserver(Z);
    return X.observe(K, { subtree: !0, attributes: !0, attributeFilter: ["class"] }), () => X.disconnect();
  }, []), /* @__PURE__ */ M.createElement(sv, { rows: b, showKpis: N === "apercu" });
}
function Mo() {
  const b = document.getElementById("screen-profile");
  if (!b || b.dataset.reactProfileMounted) return;
  b.dataset.reactProfileMounted = "true", b.classList.add("react-profile-active");
  const B = document.createElement("div");
  B.className = "statsgym-profile-root", b.prepend(B), Qn.createRoot(B).render(/* @__PURE__ */ M.createElement(mv, null));
}
function ov(b) {
  const B = /* @__PURE__ */ new Map();
  return b.forEach((N) => {
    const o = `${N.comp_id ?? ""}-${N.date}-${N.competition}`, K = B.get(o) || [];
    K.push(N), B.set(o, K);
  }), [...B.values()].sort((N, o) => o[0].date.localeCompare(N[0].date));
}
function yv({ rows: b }) {
  const B = ov(b);
  return /* @__PURE__ */ M.createElement("section", { className: "statsgym-react-competitions", "aria-label": "Historique des compétitions" }, /* @__PURE__ */ M.createElement("p", { className: "statsgym-react-section-label" }, "Compétitions"), B.map((N) => {
    const o = N.reduce((Z, X) => (X.nf || 0) > (Z.nf || 0) ? X : Z, N[0]), K = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(/* @__PURE__ */ new Date(`${o.date}T12:00:00`));
    return /* @__PURE__ */ M.createElement("details", { className: "statsgym-react-competition", key: `${o.comp_id}-${o.date}` }, /* @__PURE__ */ M.createElement("summary", null, /* @__PURE__ */ M.createElement("span", { className: "statsgym-competition-main" }, /* @__PURE__ */ M.createElement("strong", null, o.competition), /* @__PURE__ */ M.createElement("small", null, K, o.lieu ? ` · ${o.lieu}` : "")), /* @__PURE__ */ M.createElement("span", { className: "statsgym-competition-score" }, /* @__PURE__ */ M.createElement("b", null, Number.isFinite(o.nf) ? o.nf.toFixed(2) : "—"), /* @__PURE__ */ M.createElement("small", null, Number.isFinite(o.rang) ? `${o.rang}e place` : o.niveau)), /* @__PURE__ */ M.createElement("span", { className: "statsgym-competition-chevron", "aria-hidden": "true" }, "⌄")), /* @__PURE__ */ M.createElement("div", { className: "statsgym-competition-detail" }, N.map((Z, X) => /* @__PURE__ */ M.createElement("div", { className: "statsgym-competition-result", key: `${Z.comp_id}-${X}` }, /* @__PURE__ */ M.createElement("span", null, Z.phase || Z.categorie || Z.type), /* @__PURE__ */ M.createElement("b", null, Number.isFinite(Z.nf) ? Z.nf.toFixed(2) : "—"), /* @__PURE__ */ M.createElement("small", null, Number.isFinite(Z.rang) ? `${Z.rang}e` : "—")))));
  }));
}
function dv() {
  const [b, B] = M.useState(() => window.StatsGymLegacy?.rows?.() || []);
  return M.useEffect(() => {
    const N = (o) => B(o.detail.rows);
    return window.addEventListener("statsgym:profile-loaded", N), () => window.removeEventListener("statsgym:profile-loaded", N);
  }, []), /* @__PURE__ */ M.createElement(yv, { rows: b });
}
function po() {
  const b = document.getElementById("tab-competitions");
  if (!b || b.dataset.reactCompetitionsMounted) return;
  b.dataset.reactCompetitionsMounted = "true", b.classList.add("react-competitions-active");
  const B = document.createElement("div");
  B.className = "statsgym-competitions-root", b.prepend(B), Qn.createRoot(B).render(/* @__PURE__ */ M.createElement(dv, null));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  zo(), To(), Mo(), po();
}, { once: !0 }) : (zo(), To(), Mo(), po());
export {
  kd as r
};
