(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
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
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
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
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
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
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
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
      return 1;
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
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
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
}, Nd = {
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
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
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
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "site-nav", role: "banner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-nav__inner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "site-nav__mark", href: "#/page-1", "aria-label": "Tsukimi-tei home", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "site-nav__kanji", children: "月見亭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "site-nav__romaji", children: "Tsukimi‑tei" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-nav__kicker", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "site-nav__season", children: "晩秋 · Late Autumn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "site-nav__sep", "aria-hidden": "true", children: "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "site-nav__est", children: "Est. 令和元年 / 2019" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "site-nav__links", "aria-label": "Primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "一" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "Counter" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "二" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "Course" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "三" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "Sake" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "四" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "The Chef" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "五" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "Reservations" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#/page-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: "六" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl", children: "Visit" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "site-nav__rule", "aria-hidden": "true" })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "site-footer", role: "contentinfo", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__inner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "site-footer__seal", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 64 64", xmlns: "http://www.w3.org/2000/svg", style: { color: "var(--fg)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "30", fill: "none", stroke: "currentColor", "stroke-width": "1.2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "22", fill: "none", stroke: "currentColor", "stroke-width": "0.8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "38", "text-anchor": "middle", "font-family": "serif", "font-size": "18", fill: "currentColor", children: "月" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__col site-footer__col--mark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "site-footer__name", children: "月見亭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "site-footer__sub", children: "Tsukimi-tei — Kappō & Sake" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "site-footer__line", children: "Seven seats. One counter." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "3-14-7 Yanaka",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Taitō-ku, Tōkyō 110-0001"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nippori Stn. — 6 min on foot" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Hours" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Seatings 17:30 & 20:30",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Reservations 14:00–16:00"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Closed Sundays & 2nd Tuesdays" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "03‑3823‑XXXX" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "counter@tsukimi-tei.jp" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "site-footer__nav", "aria-label": "Footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-1", children: "Counter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-2", children: "Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-3", children: "Sake" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-4", children: "The Chef" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-5", children: "Reservations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-6", children: "Visit" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "site-footer__meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 令和六年 / 2024 Tsukimi-tei. All rights reserved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "site-footer__attr", children: "Kamon & wagara motifs adapted from Wikimedia sources under CC BY-SA; historical designs in the public domain." })
    ] })
  ] }) });
}
function Page1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .tsukimi-home {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), system-ui, sans-serif;
          min-height: 100vh;
          line-height: 1.8;
        }

        .tsukimi-home .bg-asanoha {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          pointer-events: none;
          color: var(--ornament);
          z-index: 0;
        }
        .tsukimi-home .bg-asanoha svg {
          width: 100%;
          height: 100%;
        }

        .tsukimi-home .hero {
          position: relative;
          padding: 9rem 0 7rem;
          overflow: hidden;
        }

        .tsukimi-home .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
          gap: 4rem;
          align-items: start;
        }

        .tsukimi-home .hero-left {
          padding-top: 1rem;
        }

        .tsukimi-home .vertical-title {
          writing-mode: vertical-rl;
          font-family: var(--font-display), serif;
          font-size: clamp(4rem, 8vw, 7.5rem);
          line-height: 1.05;
          letter-spacing: 0.15em;
          color: var(--primary);
          font-weight: 400;
          margin: 0;
          height: 9em;
        }

        .tsukimi-home .romaji {
          margin-top: 2.5rem;
          font-family: var(--font-display), serif;
          font-size: 1.05rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .tsukimi-home .romaji-sub {
          margin-top: 0.75rem;
          font-size: 0.78rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--primary);
          opacity: 0.65;
        }

        .tsukimi-home .hero-right {
          position: relative;
          min-height: 32rem;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 1.5rem;
        }

        .tsukimi-home .seal {
          color: var(--primary);
          opacity: 0.92;
        }

        .tsukimi-home .seal-wrap {
          position: relative;
          margin-right: 2rem;
        }

        .tsukimi-home .seal-caption {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 1.5rem;
          font-family: var(--font-display), serif;
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--primary);
          opacity: 0.55;
          writing-mode: horizontal-tb;
        }

        .tsukimi-home .manifesto {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 4rem;
        }

        .tsukimi-home .manifesto-text {
          grid-column: 1;
          max-width: 22rem;
          font-family: var(--font-display), serif;
          font-size: 1.15rem;
          line-height: 1.9;
          color: var(--primary);
        }

        .tsukimi-home .manifesto-text .line {
          display: block;
        }

        .tsukimi-home .season-row {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-top: 2.5rem;
          font-size: 0.78rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .tsukimi-home .cinnabar-dot {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
        }

        .tsukimi-home .divider {
          max-width: 1280px;
          margin: 6rem auto 4rem;
          padding: 0 3rem;
          color: var(--ornament);
          opacity: 0.5;
        }

        .tsukimi-home .divider svg {
          width: 100%;
          height: 24px;
          display: block;
        }

        .tsukimi-home .tonight {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem 7rem;
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 4rem;
        }

        .tsukimi-home .tonight-card {
          grid-column: 1;
          border-top: 1px solid var(--primary);
          padding-top: 2rem;
        }

        .tsukimi-home .label {
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--primary);
          opacity: 0.6;
        }

        .tsukimi-home .tonight-date {
          margin-top: 1rem;
          font-family: var(--font-display), serif;
          font-size: 1.7rem;
          color: var(--primary);
          line-height: 1.3;
        }

        .tsukimi-home .tonight-date small {
          display: block;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          opacity: 0.7;
          letter-spacing: 0.05em;
        }

        .tsukimi-home .price-row {
          margin-top: 2.5rem;
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .tsukimi-home .price {
          font-family: var(--font-display), serif;
          font-size: 2.4rem;
          color: var(--primary);
          letter-spacing: 0.05em;
        }

        .tsukimi-home .price-meta {
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary);
          opacity: 0.7;
        }

        .tsukimi-home .reserve {
          margin-top: 3rem;
          display: inline-block;
          font-family: var(--font-display), serif;
          font-size: 0.9rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--primary);
          text-decoration: none;
          border-bottom: 1px solid var(--primary);
          padding-bottom: 0.4rem;
        }

        .tsukimi-home .reserve:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .tsukimi-home .tonight-aside {
          grid-column: 2;
          align-self: end;
          display: flex;
          justify-content: flex-end;
          gap: 2.5rem;
          align-items: flex-end;
        }

        .tsukimi-home .aside-block {
          max-width: 16rem;
          font-size: 0.88rem;
          line-height: 1.85;
          color: var(--primary);
        }

        .tsukimi-home .aside-block h4 {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin: 0 0 0.9rem;
          opacity: 0.6;
        }

        .tsukimi-home .ume-mark {
          color: var(--primary);
          opacity: 0.85;
          margin-top: 1rem;
        }

        @media (max-width: 860px) {
          .tsukimi-home .hero-grid,
          .tsukimi-home .manifesto,
          .tsukimi-home .tonight {
            grid-template-columns: 1fr;
            padding: 0 1.5rem;
          }
          .tsukimi-home .hero-right {
            min-height: 18rem;
            justify-content: flex-start;
          }
          .tsukimi-home .seal-wrap { margin-right: 0; }
          .tsukimi-home .tonight-aside {
            grid-column: 1;
            justify-content: flex-start;
            margin-top: 3rem;
          }
          .tsukimi-home .vertical-title {
            font-size: 4.5rem;
            height: 8em;
          }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tsukimi-home", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hero", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-asanoha", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "vertical-title", children: "月見亭" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "romaji", children: "Tsukimi — tei" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "romaji-sub", children: "Kappō Counter · Yanaka, Tokyo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seal-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:cc": "http://creativecommons.org/ns#",
                "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xmlns:svg": "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.1",
                width: "688",
                height: "688",
                id: "svg2",
                "xml:space": "preserve",
                className: "seal",
                width: 180,
                height: 180,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "metadata",
                    {
                      id: "metadata8",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "cc:Work",
                        {
                          "rdf:about": "",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "dc:type",
                              {
                                "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                          ]
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "defs",
                    {
                      id: "defs6"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                      id: "g10",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            width: "550.40002",
                            height: "550.40002",
                            x: "-104.42356",
                            y: "-780.81769",
                            transform: "scale(1,-1)",
                            id: "rect5733"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "g",
                          {
                            transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                            id: "g5609",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                                  id: "path14"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                                  id: "path24"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                                  id: "path32"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 281.64,154.04064 z",
                                  id: "path34"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                                  id: "path40"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                                  id: "path44"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                                  id: "path52"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                                  id: "path58"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 190.2,177.80064 z",
                                  id: "path62"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                                  id: "path66"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                                  id: "path70"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                                  id: "path84"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                                  id: "path92"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                                  id: "path98"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                                  id: "path102"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                                  id: "path108"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                                  id: "path120"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                                  id: "path124"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                                  id: "path126"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                                  id: "path142"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                                  id: "path146"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                                  id: "path150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                                  id: "path162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                                  id: "path166"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 148.32,504.6816 z",
                                  id: "path170"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                                  id: "path172"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                                  id: "path176"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                                  id: "path180"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                                  id: "path192"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 327.96,155.60064 z",
                                  id: "path196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                                  id: "path202"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                                  id: "path208"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                                  id: "path218"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                                  id: "path228"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                                  id: "path244"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                                  id: "path246"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                                  id: "path262"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                                  id: "path264"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                                  id: "path266"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                                  id: "path278"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                                  id: "path286"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                                  id: "path306"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                                  id: "path310"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                                  id: "path320"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                                  id: "path324"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                                  id: "path346"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                                  id: "path350"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                                  id: "path360"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                                  id: "path368"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                                  id: "path376"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                                  id: "path384"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                                  id: "path388"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                                  id: "path402"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                                  id: "path410"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                                  id: "path416"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                                  id: "path424"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                                  id: "path432"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                                  id: "path434"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                                  id: "path442"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                                  id: "path452"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                                  id: "path456"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 381.6,241.8816 z",
                                  id: "path462"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                                  id: "path478"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                                  id: "path482"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                                  id: "path490"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 440.76,420.8016 z",
                                  id: "path492"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                                  id: "path498"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                                  id: "path506"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                                  id: "path518"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                                  id: "path542"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                                  id: "path566"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                                  id: "path576"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                                  id: "path592"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                                  id: "path596"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 345.48,186.92064 z",
                                  id: "path604"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                                  id: "path606"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                                  id: "path612"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 223.32,164.72064 z",
                                  id: "path656"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                                  id: "path658"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                                  id: "path664"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                                  id: "path676"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                                  id: "path700"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 321.72,530.7216 z",
                                  id: "path740"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 328.68,525.6816 z",
                                  id: "path762"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 332.52,558.4416 z",
                                  id: "path798"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.28,544.1616 z",
                                  id: "path806"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 307.56,557.7216 z",
                                  id: "path838"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.16,559.5216 z",
                                  id: "path858"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 308.52,569.7216 z",
                                  id: "path866"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                                  transform: "matrix(0.8,0,0,-0.8,0,842)",
                                  id: "path876"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 318.48,556.5216 z",
                                  id: "path882"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                                  id: "path892"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                                  id: "path904"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                                  id: "path912"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                                  id: "path920"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                                  id: "path942"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                                  id: "path946"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path948"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path950"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path956"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                                  id: "path960"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 185.28,429.3216 z",
                                  id: "path976"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 183.24,377.9616 z",
                                  id: "path984"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                                  id: "path986"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                                  id: "path998"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                                  id: "path1016"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                                  id: "path1030"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                                  id: "path1038"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                                  id: "path1044"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                                  id: "path1080"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 215.28,311.8416 z",
                                  id: "path1100"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                                  id: "path1118"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                                  id: "path1130"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                                  id: "path1136"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                                  id: "path1150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                                  id: "path1162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                                  id: "path1164"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path1182"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 390.96,287.8416 z",
                                  id: "path1196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                                  id: "path1198"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                                  id: "path1214"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                                  id: "path1220"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seal-caption", children: "Est. Heisei 21 — 2009" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "manifesto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "manifesto-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line", children: "Seven seats." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line", children: "One counter." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line", children: "The season decided this morning at Toyosu." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "season-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cinnabar-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Late Autumn · 晩秋 · 2024" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "tonight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tonight-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: "This Evening" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tonight-date", children: [
            "金曜日 · Friday, 8 November",
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Seatings at 18:00 and 20:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "price-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: "¥18,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price-meta", children: "Eight courses · omakase only" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "reserve", href: "#/page-5", children: "Reserve a seat →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ume-mark", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "xmlns:svg": "http://www.w3.org/2000/svg",
              xmlns: "http://www.w3.org/2000/svg",
              version: "1.0",
              width: "688",
              height: "688",
              id: "svg2652",
              width: 28,
              height: 28,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "defs",
                  {
                    id: "defs2654"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    id: "layer1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "688",
                          height: "688",
                          x: "0",
                          y: "0",
                          id: "rect5371"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                          id: "path9114"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tonight-aside", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aside-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "The Counter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hinoki, single plank, 4.2 metres. Chef Hideo Takagi works from a charcoal hearth set into the third seat's sightline. No menu is printed; courses are named as they are placed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aside-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Sake" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A rotating list of thirty-two bottles drawn from sixteen prefectures — Niigata to Saga — poured by Mariko Endō, kikisake-shi." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
function Page2() {
  const courses = [
    {
      n: "一",
      ja: "先付",
      romaji: "Sakizuke",
      en: "Opening morsel",
      note: "Kaki shiratama — Saijō persimmon, silken tofu, white miso veil."
    },
    {
      n: "二",
      ja: "椀物",
      romaji: "Wanmono",
      en: "Clear soup",
      note: "Matsutake dobin-mushi — teapot broth of pine mushroom, hamo, sudachi."
    },
    {
      n: "三",
      ja: "向附",
      romaji: "Mukōzuke",
      en: "Sliced raw",
      note: "Akami zuke from Misaki — soy-cured tuna, fresh wasabi, nori shoyu."
    },
    {
      n: "四",
      ja: "焼物",
      romaji: "Yakimono",
      en: "Charcoal grill",
      note: "Sawara on hōba leaf — Spanish mackerel over binchōtan, magnolia smoke."
    },
    {
      n: "五",
      ja: "炊合せ",
      romaji: "Takiawase",
      en: "Simmered together",
      note: "Kabocha and shungiku — pumpkin in dashi, garland chrysanthemum."
    },
    {
      n: "六",
      ja: "強肴",
      romaji: "Shiizakana",
      en: "Insistent dish",
      note: "Duck tsumire — minced Aomori duck, burdock, yuzu kosho."
    },
    {
      n: "七",
      ja: "御飯",
      romaji: "Gohan",
      en: "Rice course",
      note: "Shinmai with ikura — first-harvest Niigata rice, salmon roe, hojiso."
    },
    {
      n: "八",
      ja: "水物",
      romaji: "Mizumono",
      en: "Sweet finish",
      note: "Warabi-mochi — bracken starch, kuromitsu, kinako from Tanba."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .page2 {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .page2 main {
          position: relative;
          padding: 0 0 8rem;
        }

        .p2-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        .p2-bg-pattern svg {
          width: 100%;
          height: 100%;
        }

        .p2-hero {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          padding: 6rem 6rem 4rem;
          position: relative;
          z-index: 1;
        }

        .p2-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 1.5rem;
        }

        .p2-eyebrow {
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .p2-fortnight {
          font-family: var(--font-display), serif;
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text);
        }

        .p2-fortnight .accent {
          color: var(--accent);
        }

        .p2-hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .p2-title {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 6.5rem);
          line-height: 1;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .p2-title .ja {
          display: block;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          margin-top: 1rem;
          color: var(--text-emphasis);
          letter-spacing: 0.1em;
        }

        .p2-divider {
          width: 100%;
          height: 24px;
          opacity: 0.45;
          margin: 0;
          color: var(--ornament);
        }
        .p2-divider svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .p2-section-head {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          padding: 4rem 6rem 2rem;
          position: relative;
          z-index: 1;
        }

        .p2-seal {
          color: var(--ornament);
          opacity: 0.85;
        }
        .p2-seal svg {
          display: block;
        }

        .p2-section-head h2 {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: 2rem;
          margin: 0;
          line-height: 1.4;
        }

        .p2-section-head p {
          font-size: 0.95rem;
          line-height: 1.8;
          max-width: 38ch;
          margin: 1rem 0 0;
          color: var(--text);
        }

        .p2-courses {
          padding: 2rem 6rem 4rem;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
        }

        .p2-courses-rule {
          border-right: 1px solid var(--ornament);
          opacity: 0.15;
        }

        .p2-courses-list {
          display: flex;
          flex-direction: column;
          padding-left: 4rem;
        }

        .p2-course {
          display: grid;
          grid-template-columns: 4rem 1fr;
          gap: 2rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(12, 12, 12, 0.12);
          align-items: baseline;
        }

        .p2-course:last-child {
          border-bottom: none;
        }

        .p2-course-num {
          font-family: var(--font-display), serif;
          font-size: 1.6rem;
          color: var(--text-emphasis);
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .p2-course-body {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .p2-course-titles {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 1.2rem;
        }

        .p2-course-ja {
          font-family: var(--font-display), serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--text);
          letter-spacing: 0.08em;
        }

        .p2-course-romaji {
          font-family: var(--font-display), serif;
          font-style: italic;
          font-size: 1.05rem;
          color: var(--text-emphasis);
          letter-spacing: 0.08em;
        }

        .p2-course-en {
          font-size: 0.78rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.55;
        }

        .p2-course-note {
          font-size: 0.98rem;
          line-height: 1.8;
          max-width: 52ch;
          margin-top: 0.4rem;
          color: var(--text);
        }

        .p2-coda {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          padding: 5rem 6rem 2rem;
          position: relative;
          z-index: 1;
        }

        .p2-coda-text {
          font-family: var(--font-display), serif;
          font-size: 1.1rem;
          line-height: 1.9;
          max-width: 52ch;
        }

        .p2-coda-text .accent {
          color: var(--accent);
          font-style: italic;
        }

        .p2-coda-aside {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-end;
          text-align: right;
        }

        .p2-price {
          font-family: var(--font-display), serif;
          font-size: 2.4rem;
          color: var(--text);
          line-height: 1;
        }

        .p2-price-note {
          font-size: 0.78rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          opacity: 0.7;
        }

        .p2-cta {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.9rem 1.8rem;
          border: 1px solid var(--primary);
          color: var(--primary);
          text-decoration: none;
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: background 0.3s, color 0.3s;
        }

        .p2-cta:hover {
          background: var(--primary);
          color: var(--bg);
        }

        @media (max-width: 860px) {
          .p2-hero, .p2-section-head, .p2-courses, .p2-coda {
            grid-template-columns: 1fr;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            gap: 2rem;
          }
          .p2-courses-rule { display: none; }
          .p2-courses-list { padding-left: 0; }
          .p2-coda-aside { align-items: flex-start; text-align: left; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-bg-pattern", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p2-hero", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-hero-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-eyebrow", children: "Omakase · Autumn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-fortnight", children: [
            "Fortnight of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "Oct 28 — Nov 10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "霜降の頃 · Frost-descent",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Eight courses, served once nightly at 18:30."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-hero-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "p2-title", children: [
          "The Course",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ja", children: "献立" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-divider", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p2-section-head", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "xmlns:dc": "http://purl.org/dc/elements/1.1/",
            "xmlns:cc": "http://creativecommons.org/ns#",
            "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "xmlns:svg": "http://www.w3.org/2000/svg",
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "688",
            height: "688",
            id: "svg2",
            "xml:space": "preserve",
            className: "p2-seal",
            width: 96,
            height: 96,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "metadata",
                {
                  id: "metadata8",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "cc:Work",
                    {
                      "rdf:about": "",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "dc:type",
                          {
                            "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                      ]
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "defs",
                {
                  id: "defs6"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                  id: "g10",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        width: "550.40002",
                        height: "550.40002",
                        x: "-104.42356",
                        y: "-780.81769",
                        transform: "scale(1,-1)",
                        id: "rect5733"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "g",
                      {
                        transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                        id: "g5609",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                              id: "path14"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                              id: "path24"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                              id: "path32"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 281.64,154.04064 z",
                              id: "path34"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                              id: "path40"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                              id: "path44"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                              id: "path52"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                              id: "path58"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 190.2,177.80064 z",
                              id: "path62"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                              id: "path66"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                              id: "path70"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                              id: "path84"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                              id: "path92"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                              id: "path98"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                              id: "path102"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                              id: "path108"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                              id: "path120"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                              id: "path124"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                              id: "path126"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                              id: "path142"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                              id: "path146"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                              id: "path150"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                              id: "path162"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                              id: "path166"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 148.32,504.6816 z",
                              id: "path170"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                              id: "path172"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                              id: "path176"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                              id: "path180"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                              id: "path192"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 327.96,155.60064 z",
                              id: "path196"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                              id: "path202"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                              id: "path208"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                              id: "path218"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                              id: "path228"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                              id: "path244"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                              id: "path246"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                              id: "path262"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                              id: "path264"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                              id: "path266"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                              id: "path278"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                              id: "path286"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                              id: "path306"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                              id: "path310"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                              id: "path320"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                              id: "path324"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                              id: "path346"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                              id: "path350"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                              id: "path360"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                              id: "path368"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                              id: "path376"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                              id: "path384"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                              id: "path388"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                              id: "path402"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                              id: "path410"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                              id: "path416"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                              id: "path424"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                              id: "path432"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                              id: "path434"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                              id: "path442"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                              id: "path452"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                              id: "path456"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 381.6,241.8816 z",
                              id: "path462"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                              id: "path478"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                              id: "path482"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                              id: "path490"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 440.76,420.8016 z",
                              id: "path492"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                              id: "path498"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                              id: "path506"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                              id: "path518"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                              id: "path542"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                              id: "path566"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                              id: "path576"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                              id: "path592"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                              id: "path596"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 345.48,186.92064 z",
                              id: "path604"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                              id: "path606"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                              id: "path612"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 223.32,164.72064 z",
                              id: "path656"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                              id: "path658"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                              id: "path664"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                              id: "path676"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                              id: "path700"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 321.72,530.7216 z",
                              id: "path740"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 328.68,525.6816 z",
                              id: "path762"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 332.52,558.4416 z",
                              id: "path798"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 317.28,544.1616 z",
                              id: "path806"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 307.56,557.7216 z",
                              id: "path838"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 317.16,559.5216 z",
                              id: "path858"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 308.52,569.7216 z",
                              id: "path866"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                              transform: "matrix(0.8,0,0,-0.8,0,842)",
                              id: "path876"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 318.48,556.5216 z",
                              id: "path882"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                              id: "path892"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                              id: "path904"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                              id: "path912"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                              id: "path920"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                              id: "path942"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                              id: "path946"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path948"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path950"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path956"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                              id: "path960"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 185.28,429.3216 z",
                              id: "path976"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 183.24,377.9616 z",
                              id: "path984"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                              id: "path986"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                              id: "path998"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                              id: "path1016"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                              id: "path1030"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                              id: "path1038"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                              id: "path1044"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                              id: "path1080"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 215.28,311.8416 z",
                              id: "path1100"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                              id: "path1118"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                              id: "path1130"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                              id: "path1136"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                              id: "path1150"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                              id: "path1162"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                              id: "path1164"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path1182"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 390.96,287.8416 z",
                              id: "path1196"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                              id: "path1198"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                              id: "path1214"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                              id: "path1220"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "A single progression, written each fortnight by Chef Naoki Mori." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The kappō counter seats seven. Each guest receives the same eight dishes in the same order, plated within arm's reach. There is no à la carte; there are no photographs. What follows is the menu for the current fortnight, transcribed below as it is written on the cedar board behind the counter." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p2-courses", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-courses-rule", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "p2-courses-list", children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p2-course", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-course-num", children: c.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-course-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-course-titles", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p2-course-ja", children: c.ja }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p2-course-romaji", children: c.romaji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p2-course-en", children: c.en })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p2-course-note", children: c.note })
          ] })
        ] }, c.romaji)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-divider", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p2-coda", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-coda-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "xmlns:svg": "http://www.w3.org/2000/svg",
              xmlns: "http://www.w3.org/2000/svg",
              version: "1.0",
              width: "688",
              height: "688",
              id: "svg2652",
              width: 28,
              height: 28,
              style: { verticalAlign: "middle", marginRight: "0.6rem", color: "var(--ornament)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "defs",
                  {
                    id: "defs2654"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    id: "layer1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "688",
                          height: "688",
                          x: "0",
                          y: "0",
                          id: "rect5371"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                          id: "path9114"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          "Pairing of sake from sixteen prefectures is offered alongside the course — six pours, chosen the morning of service. Substitutions for shellfish, dairy, and alcohol are accommodated with",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "forty-eight hours' notice" }),
          ". The menu changes on the first and fifteenth of each month, in keeping with the old Edo calendar."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p2-coda-aside", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-price-note", children: "Per guest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-price", children: "¥24,000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p2-price-note", children: "Pairing ¥9,500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "p2-cta", href: "#/page-3", children: "Reserve a seat" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Page3() {
  const sakeList = [
    {
      region: "Tōhoku — North",
      entries: [
        { kanji: "十四代", romaji: "Jūyondai Honmaru", prefecture: "Yamagata", rice: "Yamada-Nishiki", polish: "50%", price90: "¥3,800", price180: "¥7,200", highlight: true },
        { kanji: "飛露喜", romaji: "Hiroki Junmai Daiginjō", prefecture: "Fukushima", rice: "Yamada-Nishiki", polish: "40%", price90: "¥4,200", price180: "¥8,000", highlight: true },
        { kanji: "田酒", romaji: "Den-shu Tokubetsu Junmai", prefecture: "Aomori", rice: "Hanafubuki", polish: "55%", price90: "¥1,900", price180: "¥3,600" },
        { kanji: "新政 No.6", romaji: "Aramasa No. 6 X-type", prefecture: "Akita", rice: "Akita Komachi", polish: "—", price90: "¥2,400", price180: "¥4,600" },
        { kanji: "伯楽星", romaji: "Hakurakusei Junmai Ginjō", prefecture: "Miyagi", rice: "Kura-no-Hana", polish: "55%", price90: "¥1,800", price180: "¥3,400" }
      ]
    },
    {
      region: "Kantō & Kōshin'etsu",
      entries: [
        { kanji: "寫樂", romaji: "Sharaku Junmai Ginjō", prefecture: "Tochigi", rice: "Yumesasara", polish: "50%", price90: "¥2,200", price180: "¥4,200" },
        { kanji: "〆張鶴", romaji: "Shimeharitsuru Jun", prefecture: "Niigata", rice: "Gohyakumangoku", polish: "60%", price90: "¥1,700", price180: "¥3,200" },
        { kanji: "真澄", romaji: "Masumi Karakuchi-Kiippon", prefecture: "Nagano", rice: "Hitogokochi", polish: "60%", price90: "¥1,600", price180: "¥3,000" }
      ]
    },
    {
      region: "Hokuriku — Sea of Japan",
      entries: [
        { kanji: "黒龍 石田屋", romaji: "Kokuryū Ishidaya", prefecture: "Fukui", rice: "Yamada-Nishiki", polish: "35%", price90: "¥5,800", price180: "¥11,000", highlight: true },
        { kanji: "満寿泉", romaji: "Masuizumi Junmai Daiginjō", prefecture: "Toyama", rice: "Yamada-Nishiki", polish: "50%", price90: "¥2,600", price180: "¥5,000" },
        { kanji: "天狗舞", romaji: "Tengumai Yamahai Junmai", prefecture: "Ishikawa", rice: "Gohyakumangoku", polish: "60%", price90: "¥1,800", price180: "¥3,400" }
      ]
    },
    {
      region: "Kansai — Old Capitals",
      entries: [
        { kanji: "玉川", romaji: "Tamagawa Yamahai Junmai", prefecture: "Kyōto", rice: "Iwai", polish: "66%", price90: "¥1,900", price180: "¥3,600" },
        { kanji: "秋鹿", romaji: "Akishika Yamahai Junmai", prefecture: "Ōsaka", rice: "Yamada-Nishiki", polish: "70%", price90: "¥1,700", price180: "¥3,200" },
        { kanji: "不老泉", romaji: "Furōsen Kimoto Junmai", prefecture: "Shiga", rice: "Tamasakae", polish: "60%", price90: "¥1,800", price180: "¥3,400" }
      ]
    },
    {
      region: "Chūgoku & Shikoku",
      entries: [
        { kanji: "雨後の月", romaji: "Ugo-no-Tsuki Junmai Ginjō", prefecture: "Hiroshima", rice: "Hattan-Nishiki", polish: "50%", price90: "¥2,000", price180: "¥3,800" },
        { kanji: "酔鯨", romaji: "Suigei Tokubetsu Junmai", prefecture: "Kōchi", rice: "Matsuyama-Mitsui", polish: "55%", price90: "¥1,700", price180: "¥3,200" }
      ]
    },
    {
      region: "Kyūshū — South",
      entries: [
        { kanji: "鍋島", romaji: "Nabeshima Junmai Daiginjō", prefecture: "Saga", rice: "Yamada-Nishiki", polish: "45%", price90: "¥3,200", price180: "¥6,000" },
        { kanji: "東一", romaji: "Azumaichi Junmai Ginjō", prefecture: "Saga", rice: "Yamada-Nishiki", polish: "55%", price90: "¥1,900", price180: "¥3,600" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .sake-page {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .sake-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.07;
          z-index: 0;
        }
        .sake-bg svg { width: 100%; height: 100%; }

        .sake-main {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
        }

        /* HERO — asymmetric, weight on right third */
        .sake-hero {
          display: grid;
          grid-template-columns: 1fr 1fr 1.1fr;
          gap: 2rem;
          padding: 4rem 0 6rem;
          align-items: end;
        }
        .sake-hero__empty { grid-column: 1 / 2; }
        .sake-hero__rule {
          grid-column: 2 / 3;
          border-top: 1px solid var(--ornament);
          padding-top: 1.5rem;
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }
        .sake-hero__title {
          grid-column: 3 / 4;
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          line-height: 1.15;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .sake-hero__title .kanji {
          display: block;
          font-size: 0.55em;
          color: var(--text-emphasis);
          margin-bottom: 0.6rem;
          letter-spacing: 0.15em;
        }
        .sake-hero__title .accent {
          color: var(--accent);
        }

        /* Vertical column intro */
        .sake-intro {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr;
          gap: 3rem;
          padding: 3rem 0 5rem;
          border-top: 1px solid var(--ornament);
        }
        .sake-intro__seal {
          grid-column: 1 / 2;
          padding-top: 1rem;
        }
        .sake-intro__seal .seal-svg {
          color: var(--ornament);
        }
        .sake-intro__seal .seal-label {
          font-family: var(--font-display), serif;
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          margin-top: 1rem;
          color: var(--text-emphasis);
        }
        .sake-intro__col {
          grid-column: 3 / 4;
          font-size: 0.95rem;
          line-height: 1.8;
          max-width: 32ch;
        }
        .sake-intro__col p { margin: 0 0 1.4rem; }
        .sake-intro__col .lead {
          font-family: var(--font-display), serif;
          font-size: 1.15rem;
          line-height: 1.7;
        }

        /* Region sections */
        .sake-region {
          display: grid;
          grid-template-columns: 0.9fr 0.1fr 2fr;
          gap: 2rem;
          padding: 3.5rem 0;
          border-top: 1px solid var(--ornament);
          position: relative;
        }
        .sake-region__divider {
          position: absolute;
          top: -10px;
          left: 0;
          width: 80px;
          height: 20px;
          color: var(--ornament);
          opacity: 0.5;
        }
        .sake-region__head {
          grid-column: 1 / 2;
          padding-top: 0.5rem;
        }
        .sake-region__num {
          font-family: var(--font-display), serif;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          color: var(--text-emphasis);
          margin-bottom: 0.8rem;
        }
        .sake-region__title {
          font-family: var(--font-display), serif;
          font-size: 1.7rem;
          font-weight: 400;
          margin: 0;
          line-height: 1.3;
        }
        .sake-region__list {
          grid-column: 3 / 4;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sake-entry {
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.6fr 0.8fr;
          gap: 1.5rem;
          padding: 1.4rem 0;
          border-bottom: 1px dotted rgba(12,12,12,0.25);
          align-items: baseline;
          line-height: 1.8;
        }
        .sake-entry:last-child { border-bottom: none; }
        .sake-entry__name { display: flex; flex-direction: column; }
        .sake-entry__kanji {
          font-family: var(--font-display), serif;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
        }
        .sake-entry__romaji {
          font-size: 0.85rem;
          color: var(--text-emphasis);
          font-style: italic;
          margin-top: 0.2rem;
        }
        .sake-entry__pref {
          font-family: var(--font-display), serif;
          font-size: 0.95rem;
        }
        .sake-entry__rice {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text-emphasis);
        }
        .sake-entry__price {
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-size: 0.9rem;
        }
        .sake-entry__price small {
          display: block;
          color: var(--text-emphasis);
          font-size: 0.75rem;
          margin-top: 0.2rem;
        }
        .sake-entry--highlight .sake-entry__kanji::before {
          content: '※ ';
          color: var(--accent);
        }
        .sake-entry--highlight .sake-entry__pref {
          color: var(--accent);
        }

        /* Chef's note — pulled to left third, emptiness on right */
        .sake-note {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1.6fr;
          gap: 2rem;
          padding: 6rem 0 3rem;
          border-top: 1px solid var(--ornament);
          margin-top: 3rem;
          align-items: start;
        }
        .sake-note__seal {
          grid-column: 1 / 2;
        }
        .sake-note__body {
          grid-column: 2 / 3;
          font-family: var(--font-display), serif;
          font-size: 1.15rem;
          line-height: 1.9;
        }
        .sake-note__body .label {
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          margin-bottom: 1.5rem;
          font-family: var(--font-body), sans-serif;
        }
        .sake-note__body .accent { color: var(--accent); }

        /* Footer page nav */
        .sake-pagenav {
          display: flex;
          justify-content: space-between;
          padding: 4rem 0 0;
          margin-top: 4rem;
          border-top: 1px solid var(--ornament);
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .sake-pagenav a { color: var(--text); text-decoration: none; }
        .sake-pagenav a:hover { color: var(--accent); }

        @media (max-width: 880px) {
          .sake-hero { grid-template-columns: 1fr; }
          .sake-hero__empty, .sake-hero__rule, .sake-hero__title { grid-column: 1; }
          .sake-intro { grid-template-columns: 1fr; }
          .sake-intro__seal, .sake-intro__col { grid-column: 1; }
          .sake-region { grid-template-columns: 1fr; }
          .sake-region__head, .sake-region__list { grid-column: 1; }
          .sake-entry { grid-template-columns: 1fr 1fr; gap: 0.5rem 1rem; }
          .sake-entry__rice, .sake-entry__price { grid-column: span 1; }
          .sake-note { grid-template-columns: 1fr; }
          .sake-note__seal, .sake-note__body { grid-column: 1; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sake-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "sake-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sake-hero", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sake-hero__empty", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sake-hero__rule", children: "No. 03 — Drinks Menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "sake-hero__title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kanji", children: "酒 ・ 十六県" }),
            "Sake from ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "Sixteen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Prefectures"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "sake-intro", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-intro__seal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:cc": "http://creativecommons.org/ns#",
                "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xmlns:svg": "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.1",
                width: "688",
                height: "688",
                id: "svg2",
                "xml:space": "preserve",
                className: "seal-svg",
                width: 110,
                height: 110,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "metadata",
                    {
                      id: "metadata8",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "cc:Work",
                        {
                          "rdf:about": "",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "dc:type",
                              {
                                "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                          ]
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "defs",
                    {
                      id: "defs6"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                      id: "g10",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            width: "550.40002",
                            height: "550.40002",
                            x: "-104.42356",
                            y: "-780.81769",
                            transform: "scale(1,-1)",
                            id: "rect5733"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "g",
                          {
                            transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                            id: "g5609",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                                  id: "path14"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                                  id: "path24"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                                  id: "path32"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 281.64,154.04064 z",
                                  id: "path34"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                                  id: "path40"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                                  id: "path44"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                                  id: "path52"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                                  id: "path58"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 190.2,177.80064 z",
                                  id: "path62"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                                  id: "path66"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                                  id: "path70"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                                  id: "path84"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                                  id: "path92"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                                  id: "path98"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                                  id: "path102"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                                  id: "path108"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                                  id: "path120"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                                  id: "path124"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                                  id: "path126"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                                  id: "path142"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                                  id: "path146"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                                  id: "path150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                                  id: "path162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                                  id: "path166"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 148.32,504.6816 z",
                                  id: "path170"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                                  id: "path172"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                                  id: "path176"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                                  id: "path180"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                                  id: "path192"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 327.96,155.60064 z",
                                  id: "path196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                                  id: "path202"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                                  id: "path208"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                                  id: "path218"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                                  id: "path228"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                                  id: "path244"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                                  id: "path246"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                                  id: "path262"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                                  id: "path264"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                                  id: "path266"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                                  id: "path278"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                                  id: "path286"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                                  id: "path306"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                                  id: "path310"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                                  id: "path320"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                                  id: "path324"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                                  id: "path346"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                                  id: "path350"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                                  id: "path360"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                                  id: "path368"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                                  id: "path376"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                                  id: "path384"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                                  id: "path388"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                                  id: "path402"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                                  id: "path410"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                                  id: "path416"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                                  id: "path424"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                                  id: "path432"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                                  id: "path434"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                                  id: "path442"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                                  id: "path452"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                                  id: "path456"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 381.6,241.8816 z",
                                  id: "path462"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                                  id: "path478"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                                  id: "path482"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                                  id: "path490"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 440.76,420.8016 z",
                                  id: "path492"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                                  id: "path498"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                                  id: "path506"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                                  id: "path518"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                                  id: "path542"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                                  id: "path566"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                                  id: "path576"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                                  id: "path592"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                                  id: "path596"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 345.48,186.92064 z",
                                  id: "path604"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                                  id: "path606"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                                  id: "path612"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 223.32,164.72064 z",
                                  id: "path656"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                                  id: "path658"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                                  id: "path664"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                                  id: "path676"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                                  id: "path700"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 321.72,530.7216 z",
                                  id: "path740"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 328.68,525.6816 z",
                                  id: "path762"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 332.52,558.4416 z",
                                  id: "path798"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.28,544.1616 z",
                                  id: "path806"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 307.56,557.7216 z",
                                  id: "path838"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.16,559.5216 z",
                                  id: "path858"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 308.52,569.7216 z",
                                  id: "path866"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                                  transform: "matrix(0.8,0,0,-0.8,0,842)",
                                  id: "path876"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 318.48,556.5216 z",
                                  id: "path882"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                                  id: "path892"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                                  id: "path904"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                                  id: "path912"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                                  id: "path920"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                                  id: "path942"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                                  id: "path946"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path948"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path950"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path956"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                                  id: "path960"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 185.28,429.3216 z",
                                  id: "path976"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 183.24,377.9616 z",
                                  id: "path984"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                                  id: "path986"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                                  id: "path998"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                                  id: "path1016"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                                  id: "path1030"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                                  id: "path1038"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                                  id: "path1044"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                                  id: "path1080"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 215.28,311.8416 z",
                                  id: "path1100"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                                  id: "path1118"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                                  id: "path1130"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                                  id: "path1136"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                                  id: "path1150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                                  id: "path1162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                                  id: "path1164"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path1182"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 390.96,287.8416 z",
                                  id: "path1196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                                  id: "path1198"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                                  id: "path1214"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                                  id: "path1220"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seal-label", children: "月見亭 印" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-intro__col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: "Our list traces a quiet line down the islands — north from the snow-country breweries of Yamagata to the warm-water rice of Kōchi and Saga." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Sixteen prefectures. Forty-odd labels in rotation, of which twenty-two appear below. Pours are offered at ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "90 ml" }),
              " ",
              "(half-guinomi) or ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "180 ml" }),
              " (one gō), poured at cellar temperature unless otherwise noted."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Mark of season — ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--accent)" }, children: "※" }),
              " — indicates a bottle the kitchen recommends pairing with this month's kaiseki."
            ] })
          ] })
        ] }),
        sakeList.map((region, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "sake-region", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", className: "sake-region__divider", width: 80, height: 20, style: { color: "var(--fg)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-region__head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-region__num", children: [
              "Region · ",
              String(i + 1).padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sake-region__title", children: region.region })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "sake-region__list", children: region.entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: `sake-entry ${e.highlight ? "sake-entry--highlight" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-entry__name", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sake-entry__kanji", children: e.kanji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sake-entry__romaji", children: e.romaji })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sake-entry__pref", children: e.prefecture }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-entry__rice", children: [
                  e.rice,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { opacity: 0.7 }, children: [
                    "seimaibuai ",
                    e.polish
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-entry__price", children: [
                  e.price90,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                    e.price180,
                    " / gō"
                  ] })
                ] })
              ]
            },
            e.romaji
          )) })
        ] }, region.region)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "sake-note", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sake-note__seal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "xmlns:svg": "http://www.w3.org/2000/svg",
              xmlns: "http://www.w3.org/2000/svg",
              version: "1.0",
              width: "688",
              height: "688",
              id: "svg2652",
              width: 70,
              height: 70,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "defs",
                  {
                    id: "defs2654"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    id: "layer1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "688",
                          height: "688",
                          x: "0",
                          y: "0",
                          id: "rect5371"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                          id: "path9114"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sake-note__body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: "Chef's Note — Wanmono Course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "For the soup course — usually a clear dashi of ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "matsutake" }),
              " in autumn or ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "hamaguri" }),
              " in spring — chef Sōzō prefers a gently warmed ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "junmai" }),
              ", drawn to",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " 42 °C" }),
              " (",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "nuru-kan" }),
              "), never hotter."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Heat lifts the rice's quiet sweetness without scattering its grain; a Yamahai or kimoto from Akishika or Tengumai answers the broth more honestly than any chilled daiginjō. Ask the counter — we will pour a small cup alongside." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "sake-pagenav", "aria-label": "Page navigation", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-2", children: "← Menu & Kaiseki" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-4", children: "The Counter →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
function Page4() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .p4-root {
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          font-family: var(--font-body), serif;
          line-height: 1.8;
          overflow-x: hidden;
        }
        .p4-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
          position: relative;
        }
        .p4-hero {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr;
          gap: 0;
          padding: 8rem 0 6rem;
          position: relative;
          min-height: 70vh;
        }
        .p4-hero-pattern {
          position: absolute;
          top: 0;
          right: -3rem;
          width: 40%;
          height: 100%;
          opacity: 0.07;
          pointer-events: none;
          overflow: hidden;
        }
        .p4-hero-pattern svg {
          width: 100%;
          height: 100%;
        }
        .p4-eyebrow {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.6em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          writing-mode: vertical-rl;
          margin-top: 2rem;
        }
        .p4-hero-title {
          grid-column: 2 / 3;
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          line-height: 1.25;
          margin: 0;
          color: var(--primary);
        }
        .p4-hero-title .accent {
          color: var(--accent);
          font-style: normal;
        }
        .p4-hero-kana {
          display: block;
          font-size: 0.9rem;
          letter-spacing: 0.4em;
          color: var(--text-emphasis);
          margin-top: 1.5rem;
          font-family: var(--font-display), serif;
        }

        .p4-section {
          position: relative;
          padding: 5rem 0;
        }
        .p4-divider {
          width: 100%;
          height: 28px;
          opacity: 0.45;
          color: var(--ornament);
          overflow: hidden;
          margin: 2rem 0;
        }
        .p4-divider svg {
          width: 100%;
          height: 100%;
        }

        .p4-bio {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .p4-bio-meta {
          grid-column: 1 / 2;
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          line-height: 2;
        }
        .p4-bio-meta dt {
          color: var(--text-emphasis);
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          margin-top: 1.5rem;
        }
        .p4-bio-meta dd {
          margin: 0.3rem 0 0;
          color: var(--primary);
        }
        .p4-bio-prose {
          grid-column: 2 / 4;
          max-width: 40ch;
          font-size: 1.02rem;
        }
        .p4-bio-prose p {
          margin: 0 0 1.6rem;
        }
        .p4-bio-prose .lead::first-letter {
          font-family: var(--font-display), serif;
          font-size: 3.2rem;
          float: left;
          line-height: 1;
          padding: 0.4rem 0.6rem 0 0;
          color: var(--text-emphasis);
        }

        .p4-counter {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 6rem;
          align-items: end;
          padding: 5rem 0;
        }
        .p4-counter-text {
          grid-column: 1 / 2;
        }
        .p4-counter-text h2 {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: 2.2rem;
          line-height: 1.4;
          margin: 0 0 2rem;
        }
        .p4-counter-text p {
          max-width: 38ch;
          margin: 0 0 1.4rem;
        }
        .p4-counter-seal {
          grid-column: 2 / 3;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }
        .p4-counter-seal svg {
          color: var(--primary);
        }
        .p4-counter-seal-label {
          font-family: var(--font-display), serif;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .p4-philosophy {
          display: grid;
          grid-template-columns: 1fr 3fr 2fr;
          gap: 0;
          padding: 6rem 0;
          position: relative;
        }
        .p4-philosophy-bg {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          pointer-events: none;
          overflow: hidden;
        }
        .p4-philosophy-bg svg {
          width: 200%;
          height: 100%;
        }
        .p4-philosophy h2 {
          grid-column: 2 / 3;
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: 2rem;
          line-height: 1.5;
          margin: 0 0 2.5rem;
          position: relative;
        }
        .p4-philosophy h2 .ume {
          display: inline-block;
          width: 18px;
          height: 18px;
          color: var(--accent);
          vertical-align: middle;
          margin: 0 0.6rem 0.3rem 0;
        }
        .p4-philosophy h2 .ume svg {
          width: 100%;
          height: 100%;
        }
        .p4-philosophy-body {
          grid-column: 2 / 3;
          max-width: 42ch;
        }
        .p4-philosophy-body p {
          margin: 0 0 1.5rem;
        }
        .p4-philosophy-body .shun {
          color: var(--accent);
          font-family: var(--font-display), serif;
          font-style: italic;
        }

        .p4-closing {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr;
          align-items: center;
          padding: 8rem 0 10rem;
          min-height: 70vh;
          position: relative;
        }
        .p4-closing-rule {
          grid-column: 1 / 2;
          height: 1px;
          background: var(--ornament);
          opacity: 0.25;
        }
        .p4-closing-vertical {
          grid-column: 2 / 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .p4-kanji-column {
          font-family: var(--font-display), serif;
          writing-mode: vertical-rl;
          font-size: clamp(2.6rem, 5vw, 4rem);
          letter-spacing: 0.6rem;
          line-height: 1.2;
          color: var(--primary);
        }
        .p4-kanji-column .seal-mark {
          color: var(--accent);
        }
        .p4-closing-translation {
          font-family: var(--font-display), serif;
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-align: center;
          color: var(--text-emphasis);
          max-width: 22ch;
          line-height: 1.7;
        }
        .p4-closing-translation em {
          color: var(--accent);
          font-style: normal;
        }

        @media (max-width: 880px) {
          .p4-main { padding: 0 1.5rem; }
          .p4-hero { grid-template-columns: 1fr; padding: 5rem 0 3rem; }
          .p4-hero-title { grid-column: 1; }
          .p4-eyebrow { writing-mode: horizontal-tb; margin: 0 0 1.5rem; }
          .p4-bio, .p4-counter, .p4-philosophy, .p4-closing {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .p4-bio-prose, .p4-counter-text, .p4-philosophy h2, .p4-philosophy-body { grid-column: 1; }
          .p4-counter-seal { align-items: flex-start; }
          .p4-closing-vertical { grid-column: 1; }
          .p4-closing-rule { display: none; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-root", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "p4-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p4-hero", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-hero-pattern", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "xmlns:svg": "http://www.w3.org/2000/svg", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", version: "1.1", width: "700", height: "700", id: "svg2", viewBox: "0 0 700 700", style: { color: "var(--fg)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Seigaiha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 1,210 V 100 A 98,98 0 0 1 100,1 98,98 0 0 1 199,100 V 210" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 175,210 V 100 A 75,75 0 0 0 100,25 75,75 0 0 0 25,100 V 210" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(200,0)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(400,0)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(600,0)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,100)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,200)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,300)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,400)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,500)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,600)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-eyebrow", children: "Hito · 人" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "p4-hero-title", children: [
            "At the counter,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "one cook, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "accent", children: "seven guests," }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "and the season between us.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p4-hero-kana", children: "板場 — いわさき そうた" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-divider", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p4-section p4-bio", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "p4-bio-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Chef" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Iwasaki Sōta 岩崎 颯太" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Born" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "1981 · Nara Prefecture" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Trained" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Kyōtō Kitchō, 2007 – 2018" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Opened Tsukimi-tei" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "March 2019" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "House" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
              "Machiya, built 1923",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Yanaka 3-chōme, Taitō-ku"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-bio-prose", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: "Iwasaki Sōta spent eleven years inside the kitchens of Kyōtō Kitchō — three at the prep block, four on grill, four more at the counter under the late Tokuoka Kunio's most exacting deshi. He left the day after Setsubun in 2018, took a slow train east, and signed the lease on a derelict two-storey machiya off Yanaka Ginza four months later." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The building had been a tatami-maker's workshop since the year after the Great Kantō earthquake. He kept the soot-blackened ceiling beams, the kawara tiles, and the well in the side garden. Everything else was taken back to bare cedar." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tsukimi-tei opened on the third of March, 2019, with seven seats and no second seating." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-divider", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p4-section p4-counter", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-counter-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "The counter is one piece of cypress, milled from a single Yoshino log felled in winter 2017." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Four metres, ten centimetres long. No joinery, no finish beyond a weekly rub of camellia oil. The grain runs unbroken from the soup-station at the kitchen end to the warm corner where the last guest of the evening sits closest to the hearth." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The wood was selected by Yoshida Kōzō of the Kawakami forestry cooperative and air-dried for fourteen months in Higashi-Yoshino before milling. Each guest, over the course of an evening, places their hands on the same tree." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-counter-seal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:cc": "http://creativecommons.org/ns#",
                "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xmlns:svg": "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.1",
                width: "688",
                height: "688",
                id: "svg2",
                "xml:space": "preserve",
                className: "seal",
                width: 140,
                height: 140,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "metadata",
                    {
                      id: "metadata8",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "cc:Work",
                        {
                          "rdf:about": "",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "dc:type",
                              {
                                "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                          ]
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "defs",
                    {
                      id: "defs6"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                      id: "g10",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            width: "550.40002",
                            height: "550.40002",
                            x: "-104.42356",
                            y: "-780.81769",
                            transform: "scale(1,-1)",
                            id: "rect5733"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "g",
                          {
                            transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                            id: "g5609",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                                  id: "path14"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                                  id: "path24"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                                  id: "path32"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 281.64,154.04064 z",
                                  id: "path34"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                                  id: "path40"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                                  id: "path44"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                                  id: "path52"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                                  id: "path58"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 190.2,177.80064 z",
                                  id: "path62"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                                  id: "path66"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                                  id: "path70"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                                  id: "path84"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                                  id: "path92"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                                  id: "path98"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                                  id: "path102"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                                  id: "path108"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                                  id: "path120"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                                  id: "path124"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                                  id: "path126"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                                  id: "path142"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                                  id: "path146"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                                  id: "path150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                                  id: "path162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                                  id: "path166"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 148.32,504.6816 z",
                                  id: "path170"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                                  id: "path172"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                                  id: "path176"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                                  id: "path180"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                                  id: "path192"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 327.96,155.60064 z",
                                  id: "path196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                                  id: "path202"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                                  id: "path208"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                                  id: "path218"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                                  id: "path228"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                                  id: "path244"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                                  id: "path246"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                                  id: "path262"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                                  id: "path264"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                                  id: "path266"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                                  id: "path278"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                                  id: "path286"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                                  id: "path306"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                                  id: "path310"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                                  id: "path320"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                                  id: "path324"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                                  id: "path346"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                                  id: "path350"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                                  id: "path360"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                                  id: "path368"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                                  id: "path376"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                                  id: "path384"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                                  id: "path388"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                                  id: "path402"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                                  id: "path410"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                                  id: "path416"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                                  id: "path424"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                                  id: "path432"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                                  id: "path434"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                                  id: "path442"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                                  id: "path452"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                                  id: "path456"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 381.6,241.8816 z",
                                  id: "path462"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                                  id: "path478"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                                  id: "path482"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                                  id: "path490"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 440.76,420.8016 z",
                                  id: "path492"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                                  id: "path498"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                                  id: "path506"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                                  id: "path518"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                                  id: "path542"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                                  id: "path566"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                                  id: "path576"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                                  id: "path592"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                                  id: "path596"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 345.48,186.92064 z",
                                  id: "path604"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                                  id: "path606"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                                  id: "path612"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 223.32,164.72064 z",
                                  id: "path656"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                                  id: "path658"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                                  id: "path664"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                                  id: "path676"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                                  id: "path700"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 321.72,530.7216 z",
                                  id: "path740"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 328.68,525.6816 z",
                                  id: "path762"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 332.52,558.4416 z",
                                  id: "path798"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.28,544.1616 z",
                                  id: "path806"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 307.56,557.7216 z",
                                  id: "path838"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 317.16,559.5216 z",
                                  id: "path858"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 308.52,569.7216 z",
                                  id: "path866"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                                  transform: "matrix(0.8,0,0,-0.8,0,842)",
                                  id: "path876"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 318.48,556.5216 z",
                                  id: "path882"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                                  id: "path892"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                                  id: "path904"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                                  id: "path912"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                                  id: "path920"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                                  id: "path942"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                                  id: "path946"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path948"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path950"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path956"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                                  id: "path960"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 185.28,429.3216 z",
                                  id: "path976"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 183.24,377.9616 z",
                                  id: "path984"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                                  id: "path986"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                                  id: "path998"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                                  id: "path1016"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                                  id: "path1030"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                                  id: "path1038"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                                  id: "path1044"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                                  id: "path1080"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 215.28,311.8416 z",
                                  id: "path1100"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                                  id: "path1118"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                                  id: "path1130"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                                  id: "path1136"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                                  id: "path1150"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                                  id: "path1162"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                                  id: "path1164"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                  id: "path1182"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 390.96,287.8416 z",
                                  id: "path1196"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                                  id: "path1198"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                                  id: "path1214"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                                  id: "path1220"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p4-counter-seal-label", children: "Tsuru-no-maru · house seal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p4-section p4-philosophy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-philosophy-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", style: { color: "var(--fg)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ume", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                "xmlns:svg": "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.0",
                width: "688",
                height: "688",
                id: "svg2652",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "defs",
                    {
                      id: "defs2654"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      id: "layer1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            width: "688",
                            height: "688",
                            x: "0",
                            y: "0",
                            id: "rect5371"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                            id: "path9114"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ) }),
            "On ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shun", children: "shun" }),
            ", and the discipline of leaving things alone."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-philosophy-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Shun — the few days, sometimes only hours, when an ingredient is at its peak — is the spine of the menu. A bamboo shoot dug at dawn in Kyōtanabe is on the counter by six. Hamo from Awaji is travelled only when the rains have warmed the Inland Sea. Matsutake comes from one forester in Iwate, and only when he writes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The cooking itself inherits the restraint of the Edo-period shōjin tradition: clear dashi struck from Rishiri kombu and Makurazaki katsuobushi, salt from the Noto coast, soy aged three winters in Kasaoka. Almost nothing is added. Almost nothing is taken away. Heat, salt, time, and an attentive eye are, on most evenings, all that is required of the kitchen." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The sake list draws from sixteen prefectures and is rewritten each season by hand. There is no wine." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p4-closing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p4-closing-rule", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-closing-vertical", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p4-kanji-column", lang: "ja", children: [
              "一期",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "seal-mark", children: "・" }),
              "一会"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "p4-closing-translation", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Ichi-go ichi-e" }),
              " — one meeting, once in a lifetime. The evening will not return; we cook as if it were the only one."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
function Page5() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-root", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .page5-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .page5-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4vw;
          position: relative;
        }

        .page5-hero {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
          padding: 8rem 0 6rem;
          position: relative;
          min-height: 70vh;
        }

        .page5-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>");
          pointer-events: none;
        }

        .page5-hero-bg {
          position: absolute;
          right: -8%;
          top: 4rem;
          opacity: 0.08;
          width: 520px;
          height: 520px;
          z-index: 0;
          pointer-events: none;
        }

        .page5-hero-bg svg {
          width: 100%;
          height: 100%;
        }

        .page5-eyebrow {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          writing-mode: vertical-rl;
          padding-top: 1rem;
          align-self: start;
          height: 14rem;
        }

        .page5-eyebrow .kanji {
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .page5-title-block {
          position: relative;
          z-index: 1;
          padding-left: 3rem;
          border-left: 1px solid var(--ornament);
        }

        .page5-title {
          font-family: var(--font-display), serif;
          font-size: clamp(2.6rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.2;
          margin: 0 0 2rem;
          color: var(--primary);
          letter-spacing: 0.02em;
        }

        .page5-title .accent-mark {
          color: var(--accent);
          display: inline-block;
          margin-left: 0.4rem;
          font-size: 0.6em;
          vertical-align: top;
        }

        .page5-subtitle {
          font-family: var(--font-display), serif;
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 32rem;
          color: var(--text);
          margin: 0;
        }

        .page5-divider {
          margin: 4rem 0;
          display: flex;
          align-items: center;
          gap: 2rem;
          opacity: 0.55;
        }

        .page5-divider .line {
          flex: 1;
          height: 1px;
          background: var(--ornament);
        }

        .page5-divider svg {
          flex-shrink: 0;
        }

        .page5-instructions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: 4rem 0 6rem;
          position: relative;
        }

        .page5-instructions-empty {
          /* deliberate emptiness, left third */
        }

        .page5-instructions-body {
          grid-column: 2 / 4;
          padding-left: 4rem;
          border-left: 1px solid rgba(12, 12, 12, 0.15);
          max-width: 38rem;
        }

        .page5-instructions-body p {
          font-family: var(--font-display), serif;
          font-size: 1.05rem;
          line-height: 1.95;
          margin: 0 0 1.8rem;
        }

        .page5-instructions-body .lead {
          font-size: 1.25rem;
          line-height: 1.85;
          color: var(--text-emphasis);
          margin-bottom: 2.5rem;
        }

        .page5-instructions-body .telephone {
          display: block;
          font-family: var(--font-display), serif;
          font-size: 2rem;
          letter-spacing: 0.04em;
          color: var(--primary);
          margin: 0.4rem 0 0.2rem;
        }

        .page5-instructions-body .telephone-window {
          display: block;
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .page5-instructions-body em.season {
          color: var(--accent);
          font-style: normal;
          font-weight: 500;
        }

        .page5-particulars {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
          padding: 6rem 0 4rem;
          position: relative;
          background: var(--surface);
        }

        .page5-particulars-pattern {
          position: absolute;
          left: -4%;
          top: 0;
          width: 360px;
          height: 100%;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }

        .page5-particulars-pattern svg {
          width: 100%;
          height: 100%;
        }

        .page5-particulars-head {
          padding-right: 3rem;
          position: relative;
          z-index: 1;
        }

        .page5-particulars-head h2 {
          font-family: var(--font-display), serif;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          color: var(--text-emphasis);
        }

        .page5-particulars-head .kanji-side {
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: var(--accent);
          display: block;
          margin-bottom: 1rem;
        }

        .page5-particulars-list {
          position: relative;
          z-index: 1;
          padding-left: 3rem;
          border-left: 1px solid var(--ornament);
        }

        .page5-particulars-list dl {
          display: grid;
          grid-template-columns: 11rem 1fr;
          gap: 1.4rem 2rem;
          margin: 0;
        }

        .page5-particulars-list dt {
          font-family: var(--font-display), serif;
          font-size: 0.82rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          padding-top: 0.3rem;
        }

        .page5-particulars-list dd {
          font-family: var(--font-display), serif;
          font-size: 1rem;
          line-height: 1.85;
          margin: 0;
          color: var(--primary);
        }

        .page5-seal {
          margin: 6rem 0 4rem;
          display: flex;
          justify-content: flex-end;
          padding-right: 8%;
        }

        .page5-seal-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }

        .page5-seal svg {
          color: var(--primary);
        }

        .page5-seal .seal-caption {
          font-family: var(--font-display), serif;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .page5-coda {
          display: grid;
          grid-template-columns: 2fr 1fr;
          padding: 4rem 0 8rem;
          gap: 4rem;
        }

        .page5-coda-text {
          max-width: 30rem;
        }

        .page5-coda-text p {
          font-family: var(--font-display), serif;
          font-size: 1rem;
          line-height: 1.95;
          color: var(--text);
          margin: 0 0 1.4rem;
        }

        .page5-coda-meta {
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          line-height: 1.9;
          color: var(--text-emphasis);
          letter-spacing: 0.05em;
          align-self: end;
          text-align: right;
        }

        .page5-coda-meta a {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid var(--accent);
        }

        @media (max-width: 880px) {
          .page5-hero { grid-template-columns: 1fr; padding: 5rem 0 3rem; }
          .page5-eyebrow { writing-mode: horizontal-tb; height: auto; padding-bottom: 1.5rem; }
          .page5-title-block { padding-left: 0; border-left: none; border-top: 1px solid var(--ornament); padding-top: 2rem; }
          .page5-instructions { grid-template-columns: 1fr; }
          .page5-instructions-body { grid-column: 1; padding-left: 0; border-left: none; }
          .page5-particulars { grid-template-columns: 1fr; padding: 4rem 0; }
          .page5-particulars-list { padding-left: 0; border-left: none; margin-top: 2rem; }
          .page5-particulars-list dl { grid-template-columns: 1fr; gap: 0.4rem 0; }
          .page5-particulars-list dd { margin-bottom: 1.2rem; }
          .page5-coda { grid-template-columns: 1fr; }
          .page5-coda-meta { text-align: left; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "page5-main", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "page5-hero", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page5-hero-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "xmlns:svg": "http://www.w3.org/2000/svg", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", version: "1.1", width: "700", height: "700", id: "svg2", viewBox: "0 0 700 700", width: 520, height: 520, style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Seigaiha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 1,210 V 100 A 98,98 0 0 1 100,1 98,98 0 0 1 199,100 V 210" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 175,210 V 100 A 75,75 0 0 0 100,25 75,75 0 0 0 25,100 V 210" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(200,0)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(400,0)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(600,0)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,100)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,200)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,300)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,400)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,500)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,600)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-eyebrow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kanji", children: "予約" }),
          "Reservations · 月見亭"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-title-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "page5-title", children: [
            "By telephone,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "between two",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "and four",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent-mark", children: "·" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "page5-subtitle", children: "Seven seats. Two seatings nightly. The booking is a small ceremony of its own — please call the house directly, in the quiet hours of the afternoon." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-divider", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", width: 120, height: 28, style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "page5-instructions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page5-instructions-empty", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-instructions-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: "Tsukimi-tei accepts reservations by voice only. We keep no online ledger; the master, Ogawa-san, takes the book in hand each afternoon and writes guests in by name." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "season", children: "Two seatings" }),
            " are offered each evening — the early at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "17:30" }),
            " and the late at",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " 20:30" }),
            ". The counter holds seven; on most nights both seatings are filled within the week."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Telephone reservations are received between",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " 14:00 and 16:00" }),
            ", in the gap between the morning market and evening preparation. Outside these hours the line is left to ring."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "telephone", children: "03-3823-4781" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "telephone-window", children: "14:00 – 16:00 · Japan Standard Time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "A deposit of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "¥10,000 per seat" }),
            " is requested upon booking, sent by furikomi within two weeks of the reservation being entered. The deposit is refundable in full up to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "season", children: "seventy-two hours" }),
            " before the seating, and applied to the bill on the night."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "The house is closed on ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sundays" }),
            " and on the",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " second Tuesday" }),
            " of each month. Out of regard for the quietness of the room, children under twelve are not seated at the counter."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Should you wish to mark a particular occasion — a birthday, the first viewing of cherry, the harvest moon — please say so on the telephone. Ogawa-san will place a small flourish in the menu." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "page5-particulars", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page5-particulars-pattern", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", width: 360, height: 720, style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-particulars-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kanji-side", children: "細目" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
            "The particulars,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "for the record."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page5-particulars-list", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Telephone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "03-3823-4781",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Calls received 14:00 – 16:00 only"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Seatings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "17:30 (early) · 20:30 (late)",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Counter of seven seats"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "One omakase kaiseki, ¥28,000 per guest",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Sake pairing of seven, ¥9,000"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Deposit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "¥10,000 per seat, by furikomi",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Refundable up to 72 hours prior"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Closures" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "Sundays",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Second Tuesday of each month",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "New Year, 29 December – 5 January"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "2-7-12 Yanaka, Taitō-ku, Tōkyō 110-0001",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Three minutes on foot from Sendagi station, exit 2"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Children" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Guests under twelve are respectfully not seated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Attire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            "No code; a quiet jacket is welcome.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Strong fragrance discouraged."
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page5-seal", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-seal-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "xmlns:dc": "http://purl.org/dc/elements/1.1/",
            "xmlns:cc": "http://creativecommons.org/ns#",
            "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "xmlns:svg": "http://www.w3.org/2000/svg",
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "688",
            height: "688",
            id: "svg2",
            "xml:space": "preserve",
            className: "seal",
            width: 110,
            height: 110,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "metadata",
                {
                  id: "metadata8",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "cc:Work",
                    {
                      "rdf:about": "",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "dc:type",
                          {
                            "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                      ]
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "defs",
                {
                  id: "defs6"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                  id: "g10",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        width: "550.40002",
                        height: "550.40002",
                        x: "-104.42356",
                        y: "-780.81769",
                        transform: "scale(1,-1)",
                        id: "rect5733"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "g",
                      {
                        transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                        id: "g5609",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                              id: "path14"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                              id: "path24"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                              id: "path32"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 281.64,154.04064 z",
                              id: "path34"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                              id: "path40"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                              id: "path44"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                              id: "path52"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                              id: "path58"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 190.2,177.80064 z",
                              id: "path62"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                              id: "path66"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                              id: "path70"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                              id: "path84"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                              id: "path92"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                              id: "path98"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                              id: "path102"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                              id: "path108"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                              id: "path120"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                              id: "path124"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                              id: "path126"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                              id: "path142"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                              id: "path146"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                              id: "path150"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                              id: "path162"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                              id: "path166"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 148.32,504.6816 z",
                              id: "path170"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                              id: "path172"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                              id: "path176"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                              id: "path180"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                              id: "path192"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 327.96,155.60064 z",
                              id: "path196"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                              id: "path202"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                              id: "path208"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                              id: "path218"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                              id: "path228"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                              id: "path244"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                              id: "path246"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                              id: "path262"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                              id: "path264"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                              id: "path266"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                              id: "path278"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                              id: "path286"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                              id: "path306"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                              id: "path310"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                              id: "path320"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                              id: "path324"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                              id: "path346"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                              id: "path350"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                              id: "path360"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                              id: "path368"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                              id: "path376"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                              id: "path384"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                              id: "path388"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                              id: "path402"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                              id: "path410"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                              id: "path416"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                              id: "path424"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                              id: "path432"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                              id: "path434"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                              id: "path442"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                              id: "path452"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                              id: "path456"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 381.6,241.8816 z",
                              id: "path462"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                              id: "path478"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                              id: "path482"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                              id: "path490"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 440.76,420.8016 z",
                              id: "path492"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                              id: "path498"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                              id: "path506"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                              id: "path518"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                              id: "path542"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                              id: "path566"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                              id: "path576"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                              id: "path592"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                              id: "path596"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 345.48,186.92064 z",
                              id: "path604"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                              id: "path606"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                              id: "path612"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 223.32,164.72064 z",
                              id: "path656"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                              id: "path658"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                              id: "path664"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                              id: "path676"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                              id: "path700"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 321.72,530.7216 z",
                              id: "path740"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 328.68,525.6816 z",
                              id: "path762"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 332.52,558.4416 z",
                              id: "path798"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 317.28,544.1616 z",
                              id: "path806"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 307.56,557.7216 z",
                              id: "path838"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 317.16,559.5216 z",
                              id: "path858"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 308.52,569.7216 z",
                              id: "path866"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                              transform: "matrix(0.8,0,0,-0.8,0,842)",
                              id: "path876"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 318.48,556.5216 z",
                              id: "path882"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                              id: "path892"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                              id: "path904"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                              id: "path912"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                              id: "path920"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                              id: "path942"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                              id: "path946"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path948"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path950"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path956"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                              id: "path960"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 185.28,429.3216 z",
                              id: "path976"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 183.24,377.9616 z",
                              id: "path984"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                              id: "path986"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                              id: "path998"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                              id: "path1016"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                              id: "path1030"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                              id: "path1038"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                              id: "path1044"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                              id: "path1080"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 215.28,311.8416 z",
                              id: "path1100"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                              id: "path1118"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                              id: "path1130"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                              id: "path1136"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                              id: "path1150"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                              id: "path1162"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                              id: "path1164"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                              id: "path1182"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M 390.96,287.8416 z",
                              id: "path1196"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                              id: "path1198"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                              id: "path1214"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                              id: "path1220"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "seal-caption", children: "小川 · Ogawa" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "page5-coda", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page5-coda-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We understand that an afternoon telephone call, in a language not one's own, asks something of the guest. If English is preferred, please ask for Mariko, who answers the line on Mondays, Wednesdays and Fridays." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The room is small, and we keep it so on purpose. Thank you for the patience the booking requires; the evening, we hope, will repay it." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "page5-coda-meta", children: [
          "Tsukimi-tei 月見亭",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Yanaka, Tōkyō",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-1", children: "return to the entrance →" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Page6() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page6-root", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .page6-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), serif;
          min-height: 100vh;
          line-height: 1.8;
        }
        .page6-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2.5rem;
          position: relative;
        }
        .page6-asanoha {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        .page6-asanoha svg {
          width: 100%;
          height: 100%;
        }

        /* Hero — visit */
        .visit-hero {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 0;
          padding: 6rem 0 5rem;
          position: relative;
          z-index: 1;
        }
        .visit-hero-left {
          padding-right: 3rem;
          border-right: 1px solid rgba(12,12,12,0.15);
        }
        .visit-eyebrow {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          margin: 0 0 2rem;
          writing-mode: horizontal-tb;
        }
        .visit-eyebrow .accent {
          color: var(--accent);
          margin-right: 0.6rem;
        }
        .visit-title {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: clamp(2.4rem, 4.4vw, 3.8rem);
          line-height: 1.25;
          margin: 0 0 2.5rem;
          color: var(--primary);
        }
        .visit-title .kanji {
          display: block;
          font-size: 0.78em;
          margin-top: 0.6rem;
          color: var(--secondary);
        }
        .visit-lede {
          font-size: 0.95rem;
          max-width: 28ch;
          color: var(--text);
        }
        .visit-hero-right {
          position: relative;
          min-height: 420px;
        }
        .visit-hero-right .seal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: var(--primary);
          opacity: 0.92;
        }
        .visit-noren {
          position: absolute;
          left: 8%;
          top: 0;
          bottom: 0;
          width: 38%;
          background: var(--secondary);
          opacity: 0.92;
        }
        .visit-noren::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background: rgba(245,239,222,0.35);
        }
        .visit-noren-mark {
          position: absolute;
          left: 50%;
          top: 38%;
          transform: translate(-50%, -50%);
          color: var(--bg);
        }

        /* Section: address ladder */
        .section-divider {
          position: relative;
          z-index: 1;
          padding: 1.5rem 0;
          color: var(--ornament);
          opacity: 0.5;
        }
        .section-divider svg {
          width: 100%;
          height: 14px;
        }

        .address-block {
          display: grid;
          grid-template-columns: 4fr 8fr;
          gap: 4rem;
          padding: 5rem 0;
          position: relative;
          z-index: 1;
        }
        .address-block .left-label {
          font-family: var(--font-display), serif;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          padding-top: 0.5rem;
        }
        .address-block .left-label .accent {
          color: var(--accent);
          margin-right: 0.6rem;
        }
        .address-block-content {
          max-width: 46ch;
        }
        .address-line {
          font-family: var(--font-display), serif;
          font-size: 1.7rem;
          line-height: 1.55;
          margin: 0 0 1.4rem;
          color: var(--primary);
        }
        .address-romaji {
          font-size: 0.92rem;
          color: var(--secondary);
          margin: 0 0 2.4rem;
        }
        .address-notes {
          font-size: 0.95rem;
          color: var(--text);
          margin: 0;
        }

        /* Transit + landmark column */
        .transit-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 4rem;
          padding: 4rem 0 6rem;
          position: relative;
          z-index: 1;
        }
        .transit-grid .empty-third {
          /* deliberate emptiness */
        }
        .transit-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0 0;
          max-width: 38ch;
          margin-left: auto;
        }
        .transit-list li {
          padding: 1.4rem 0;
          border-bottom: 1px solid rgba(12,12,12,0.12);
          display: grid;
          grid-template-columns: 3rem 1fr;
          gap: 1rem;
          align-items: baseline;
        }
        .transit-list li:last-child { border-bottom: none; }
        .transit-num {
          font-family: var(--font-display), serif;
          font-size: 1.1rem;
          color: var(--accent);
        }
        .transit-text strong {
          display: block;
          font-family: var(--font-display), serif;
          font-weight: 500;
          font-size: 1.05rem;
          margin-bottom: 0.3rem;
          color: var(--primary);
        }
        .transit-text span {
          font-size: 0.9rem;
          color: var(--text);
        }
        .transit-heading {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          margin: 0;
        }
        .transit-heading .accent { color: var(--accent); margin-right: 0.6rem; }

        /* Hours */
        .hours-section {
          padding: 5rem 0;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 0;
        }
        .hours-bg {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 55%;
          opacity: 0.07;
          z-index: 0;
          overflow: hidden;
        }
        .hours-bg svg { width: 200%; height: 100%; }
        .hours-content {
          position: relative;
          z-index: 1;
          padding-right: 3rem;
        }
        .hours-content h2 {
          font-family: var(--font-display), serif;
          font-weight: 400;
          font-size: 2.2rem;
          margin: 1.5rem 0 2.5rem;
          color: var(--primary);
        }
        .hours-table {
          width: 100%;
          max-width: 40ch;
          border-collapse: collapse;
        }
        .hours-table tr {
          border-bottom: 1px solid rgba(12,12,12,0.12);
        }
        .hours-table td {
          padding: 1rem 0;
          font-size: 0.95rem;
          vertical-align: baseline;
        }
        .hours-table td:first-child {
          font-family: var(--font-display), serif;
          width: 12ch;
          color: var(--text-emphasis);
        }
        .hours-table td.closed {
          color: var(--accent);
          font-style: italic;
        }
        .hours-side {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 1rem;
        }
        .hours-side .ume {
          color: var(--primary);
          opacity: 0.7;
        }

        /* Courtesy */
        .courtesy {
          padding: 6rem 0 7rem;
          display: grid;
          grid-template-columns: 4fr 8fr;
          gap: 4rem;
          position: relative;
          z-index: 1;
        }
        .courtesy-mark {
          padding-top: 0.4rem;
        }
        .courtesy-mark .accent-bar {
          width: 28px;
          height: 2px;
          background: var(--accent);
          margin-bottom: 1.5rem;
        }
        .courtesy-mark p {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          margin: 0;
        }
        .courtesy-body {
          max-width: 52ch;
        }
        .courtesy-body p {
          font-size: 1.02rem;
          margin: 0 0 1.6rem;
          color: var(--text);
        }
        .courtesy-body .lead {
          font-family: var(--font-display), serif;
          font-size: 1.5rem;
          line-height: 1.55;
          color: var(--primary);
          margin-bottom: 2rem;
        }
        .courtesy-sign {
          margin-top: 3rem;
          font-family: var(--font-display), serif;
          font-size: 0.9rem;
          color: var(--secondary);
          letter-spacing: 0.15em;
        }

        /* Footer-adjacent contact */
        .contact-band {
          border-top: 1px solid rgba(12,12,12,0.18);
          border-bottom: 1px solid rgba(12,12,12,0.18);
          padding: 3rem 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          position: relative;
          z-index: 1;
        }
        .contact-cell h3 {
          font-family: var(--font-display), serif;
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          margin: 0 0 1rem;
        }
        .contact-cell h3 .accent { color: var(--accent); margin-right: 0.5rem; }
        .contact-cell p {
          margin: 0 0 0.4rem;
          font-size: 0.95rem;
        }
        .contact-cell a {
          color: var(--primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(12,12,12,0.3);
        }

        @media (max-width: 880px) {
          .visit-hero, .address-block, .transit-grid, .hours-section, .courtesy {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .visit-hero-left { border-right: none; padding-right: 0; }
          .visit-hero-right { min-height: 320px; }
          .contact-band { grid-template-columns: 1fr; gap: 2rem; }
          .hours-content { padding-right: 0; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "page6-main", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page6-asanoha", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", x: "0", y: "0", width: "503", height: "501", viewBox: "0 0 503 501", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("symbol", { id: "grid", viewBox: "-50.5 -50.5 101 101", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "0", y2: "-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "0", y1: "50", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "-50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0", y1: "-15", x2: "50", y2: "-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "50", y1: "15", x2: "50", y2: "-50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "100.5", x2: "500.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "200.5", x2: "500.5", y2: "200.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "400.5", x2: "500.5", y2: "400.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "100.5", y1: "35.5", x2: "100.5", y2: "100.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st1", x1: "0.5", y1: "300.5", x2: "500.5", y2: "300.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", id: "XMLID_1_", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 50.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 150.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 250.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 50.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 151 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 251.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 352 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 -1 452.5 450.5048)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 50.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 151 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 251.5 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 352 350.5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#grid", width: "101", height: "101", x: "-50.5", y: "-50.5", transform: "matrix(1 0 0 1 452.5 350.5)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "visit-hero", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "visit-hero-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "visit-eyebrow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "Visit · 訪"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "visit-title", children: [
            "Yanaka, Taitō-ku",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kanji", children: "谷中、台東区" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "visit-lede", children: "A seven-seat counter behind an indigo noren, six minutes on foot from Nippori station. There is no English signage. Look for the paulownia." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "visit-hero-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "visit-noren", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "visit-noren-mark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "xmlns:svg": "http://www.w3.org/2000/svg",
              xmlns: "http://www.w3.org/2000/svg",
              version: "1.0",
              width: "688",
              height: "688",
              id: "svg2652",
              width: 88,
              height: 88,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "defs",
                  {
                    id: "defs2654"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    id: "layer1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "688",
                          height: "688",
                          x: "0",
                          y: "0",
                          id: "rect5371"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                          id: "path9114"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "xmlns:dc": "http://purl.org/dc/elements/1.1/",
              "xmlns:cc": "http://creativecommons.org/ns#",
              "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
              "xmlns:svg": "http://www.w3.org/2000/svg",
              xmlns: "http://www.w3.org/2000/svg",
              version: "1.1",
              width: "688",
              height: "688",
              id: "svg2",
              "xml:space": "preserve",
              className: "seal",
              width: 132,
              height: 132,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "metadata",
                  {
                    id: "metadata8",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("rdf:RDF", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "cc:Work",
                      {
                        "rdf:about": "",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("dc:format", { children: "image/svg+xml" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "dc:type",
                            {
                              "rdf:resource": "http://purl.org/dc/dcmitype/StillImage"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("dc:title", {})
                        ]
                      }
                    ) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "defs",
                  {
                    id: "defs6"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    transform: "matrix(1.25,0,0,-1.25,130.52945,976.02211)",
                    id: "g10",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "550.40002",
                          height: "550.40002",
                          x: "-104.42356",
                          y: "-780.81769",
                          transform: "scale(1,-1)",
                          id: "rect5733"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "g",
                        {
                          transform: "matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)",
                          id: "g5609",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z",
                                id: "path14"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z",
                                id: "path24"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z",
                                id: "path32"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 281.64,154.04064 z",
                                id: "path34"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z",
                                id: "path40"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z",
                                id: "path44"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z",
                                id: "path52"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z",
                                id: "path58"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 190.2,177.80064 z",
                                id: "path62"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z",
                                id: "path66"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z",
                                id: "path70"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z",
                                id: "path84"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z",
                                id: "path92"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z",
                                id: "path98"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z",
                                id: "path102"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z",
                                id: "path108"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z",
                                id: "path120"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z",
                                id: "path124"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z",
                                id: "path126"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z",
                                id: "path142"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z",
                                id: "path146"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z",
                                id: "path150"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z",
                                id: "path162"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z",
                                id: "path166"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 148.32,504.6816 z",
                                id: "path170"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z",
                                id: "path172"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z",
                                id: "path176"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z",
                                id: "path180"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z",
                                id: "path192"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 327.96,155.60064 z",
                                id: "path196"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z",
                                id: "path202"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z",
                                id: "path208"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z",
                                id: "path218"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z",
                                id: "path228"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z",
                                id: "path244"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z",
                                id: "path246"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z",
                                id: "path262"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z",
                                id: "path264"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z",
                                id: "path266"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z",
                                id: "path278"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z",
                                id: "path286"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z",
                                id: "path306"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z",
                                id: "path310"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z",
                                id: "path320"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z",
                                id: "path324"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z",
                                id: "path346"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z",
                                id: "path350"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z",
                                id: "path360"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z",
                                id: "path368"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z",
                                id: "path376"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z",
                                id: "path384"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z",
                                id: "path388"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z",
                                id: "path402"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z",
                                id: "path410"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z",
                                id: "path416"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z",
                                id: "path424"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z",
                                id: "path432"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z",
                                id: "path434"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z",
                                id: "path442"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z",
                                id: "path452"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z",
                                id: "path456"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 381.6,241.8816 z",
                                id: "path462"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z",
                                id: "path478"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z",
                                id: "path482"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z",
                                id: "path490"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 440.76,420.8016 z",
                                id: "path492"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z",
                                id: "path498"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z",
                                id: "path506"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z",
                                id: "path518"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z",
                                id: "path542"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z",
                                id: "path566"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z",
                                id: "path576"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z",
                                id: "path592"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z",
                                id: "path596"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 345.48,186.92064 z",
                                id: "path604"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z",
                                id: "path606"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z",
                                id: "path612"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 223.32,164.72064 z",
                                id: "path656"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z",
                                id: "path658"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z",
                                id: "path664"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z",
                                id: "path676"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z",
                                id: "path700"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 321.72,530.7216 z",
                                id: "path740"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 328.68,525.6816 z",
                                id: "path762"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 332.52,558.4416 z",
                                id: "path798"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 317.28,544.1616 z",
                                id: "path806"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 307.56,557.7216 z",
                                id: "path838"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 317.16,559.5216 z",
                                id: "path858"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 308.52,569.7216 z",
                                id: "path866"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z",
                                transform: "matrix(0.8,0,0,-0.8,0,842)",
                                id: "path876"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 318.48,556.5216 z",
                                id: "path882"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z",
                                id: "path892"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z",
                                id: "path904"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z",
                                id: "path912"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z",
                                id: "path920"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z",
                                id: "path942"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z",
                                id: "path946"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                id: "path948"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                id: "path950"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                id: "path956"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z",
                                id: "path960"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 185.28,429.3216 z",
                                id: "path976"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 183.24,377.9616 z",
                                id: "path984"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z",
                                id: "path986"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z",
                                id: "path998"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z",
                                id: "path1016"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z",
                                id: "path1030"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z",
                                id: "path1038"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z",
                                id: "path1044"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z",
                                id: "path1080"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 215.28,311.8416 z",
                                id: "path1100"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z",
                                id: "path1118"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z",
                                id: "path1130"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z",
                                id: "path1136"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z",
                                id: "path1150"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z",
                                id: "path1162"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z",
                                id: "path1164"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z",
                                id: "path1182"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 390.96,287.8416 z",
                                id: "path1196"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z",
                                id: "path1198"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z",
                                id: "path1214"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z",
                                id: "path1220"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "address-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "left-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "○" }),
          "Address · 所在"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "address-block-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "address-line", children: [
            "東京都台東区谷中三丁目十四番七号",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "〒110‑0001"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "address-romaji", children: "3‑14‑7 Yanaka, Taitō‑ku, Tōkyō 110‑0001" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "address-notes", children: "The shop occupies the ground floor of a two-storey wooden machiya set back from the lane. A single paulownia tree stands at the entrance; the noren is hung from the eaves at sundown and taken in when the last guest is seated." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "transit-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-third", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "transit-heading", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "From the station"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "transit-list", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transit-num", children: "一" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "transit-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nippori Station, West Exit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JR Yamanote, Keihin-Tōhoku, Jōban, Keisei lines." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transit-num", children: "二" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "transit-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cross to Gotenzaka" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Walk west two minutes along the temple wall." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transit-num", children: "三" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "transit-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Descend Yūyake Dandan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "The stone stairs above Yanaka Ginza shōtengai." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transit-num", children: "四" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "transit-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Right at the second alley" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Past the rice merchant, beneath the paulownia." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transit-num", children: "五" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "transit-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Six minutes total · 月見亭" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Indigo noren, slide the cedar door to the left." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hours-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hours-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "xmlns:svg": "http://www.w3.org/2000/svg", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", version: "1.1", width: "700", height: "700", id: "svg2", viewBox: "0 0 700 700", style: { color: "var(--fg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Seigaiha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 1,210 V 100 A 98,98 0 0 1 100,1 98,98 0 0 1 199,100 V 210" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 175,210 V 100 A 75,75 0 0 0 100,25 75,75 0 0 0 25,100 V 210" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "C4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(200,0)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(400,0)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C1", transform: "translate(600,0)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,100)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,200)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,300)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,400)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(-100,500)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("use", { "xlink:href": "#C4", transform: "translate(0,600)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hours-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "transit-heading", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "Hours · 営業"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Two seatings, six evenings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "hours-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Tuesday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:30 · 20:30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Wednesday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:30 · 20:30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Thursday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:30 · 20:30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Friday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:30 · 20:30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Saturday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:00 · 20:00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Sunday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "17:00 · 20:00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Monday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "closed", children: "休 · closed" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hours-side", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "xmlns:svg": "http://www.w3.org/2000/svg",
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.0",
            width: "688",
            height: "688",
            id: "svg2652",
            className: "ume",
            width: 96,
            height: 96,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "defs",
                {
                  id: "defs2654"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  id: "layer1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        width: "688",
                        height: "688",
                        x: "0",
                        y: "0",
                        id: "rect5371"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M 226.13364,612.57579 C 207.8052,610.64503 189.07085,603.27797 174.07991,592.10629 C 168.2372,587.75214 158.29322,577.8608 153.78698,571.9208 C 132.5626,543.94339 126.61588,507.85248 137.79008,474.83496 C 141.25861,464.58614 146.78359,453.9662 152.97675,445.64361 C 157.16039,440.02149 167.66572,429.43802 173.42393,425.04434 C 201.20575,403.84602 237.50693,397.85655 270.50977,409.02578 C 286.664,414.49289 299.71221,422.76016 311.9042,435.25303 C 323.67395,447.31324 331.05394,459.27791 336.31895,474.83496 C 346.30781,504.35006 342.79857,535.57031 326.40165,563.06499 C 318.72451,575.93817 304.73233,589.92909 291.82929,597.63424 C 271.43302,609.81403 248.79421,614.96291 226.13364,612.57579 z M 439.98488,612.57579 C 421.65644,610.64503 402.9221,603.27797 387.93116,592.10629 C 382.08845,587.75214 372.14446,577.8608 367.63822,571.9208 C 346.41385,543.94339 340.46712,507.85248 351.64132,474.83496 C 355.10985,464.58614 360.63483,453.9662 366.828,445.64361 C 371.01163,440.02149 381.51696,429.43802 387.27517,425.04434 C 415.05699,403.84602 451.35818,397.85655 484.36101,409.02578 C 500.51524,414.49289 513.56346,422.76016 525.75544,435.25303 C 537.52519,447.31324 544.90518,459.27791 550.17019,474.83496 C 560.15906,504.35006 556.64982,535.57031 540.25289,563.06499 C 532.57575,575.93817 518.58357,589.92909 505.68054,597.63424 C 485.28426,609.81403 462.64546,614.96291 439.98488,612.57579 z M 333.09971,445.5755 C 326.99741,441.05835 322.03757,437.0118 322.07785,436.58317 C 322.11812,436.15453 324.00614,430.04755 326.27344,423.01211 C 328.54074,415.97667 330.40195,409.82984 330.40946,409.35249 C 330.41825,408.79313 330.90894,408.61682 331.78974,408.85653 C 336.91594,410.25168 345.03197,410.75398 350.25232,409.9992 C 353.2886,409.5602 356.20013,409.03704 356.72239,408.83663 C 357.45739,408.55458 358.66391,411.56003 362.06214,422.13803 C 364.47674,429.65422 366.56921,436.1094 366.71207,436.48287 C 366.91109,437.00314 349.02239,450.85215 344.9585,453.32397 C 344.51333,453.59474 339.56703,450.36286 333.09971,445.5755 z M 314.11227,432.13619 C 306.25374,424.11659 298.14048,418.10026 288.08287,412.83429 L 281.67525,409.47937 L 286.09629,406.26424 C 288.52786,404.49592 294.0499,400.4269 298.36748,397.22196 C 303.55068,393.3745 306.30718,391.69547 306.4812,392.2798 C 307.38291,395.30755 319.74689,404.66661 325.48873,406.66778 C 326.68341,407.08415 327.53314,407.75863 327.37703,408.16662 C 327.22092,408.57461 325.12543,415.03369 322.72039,422.52012 C 320.31535,430.00655 318.2756,436.13182 318.18762,436.13182 C 318.09963,436.13182 316.26572,434.33378 314.11227,432.13619 z M 365.69749,421.91999 C 363.16716,414.06854 361.15694,407.62326 361.23033,407.59713 C 361.30371,407.57101 363.62965,406.42384 366.3991,405.04786 C 371.95469,402.28759 379.49079,396.42732 381.29054,393.46788 L 382.44784,391.56484 L 394.69181,400.52347 L 406.93578,409.48211 L 400.48175,412.86132 C 391.30586,417.66564 384.77492,422.37347 377.03638,429.76189 L 370.29807,436.19534 L 365.69749,421.91999 z M 159.87911,409.8763 C 141.55067,407.94553 122.81632,400.57848 107.82539,389.4068 C 101.98268,385.05265 92.038692,375.16131 87.532453,369.22131 C 66.308078,341.2439 60.361354,305.15299 71.535554,272.13546 C 75.004083,261.88664 80.529061,251.26671 86.722226,242.94411 C 90.905865,237.322 101.4112,226.73853 107.1694,222.34485 C 127.75958,206.63396 154.14627,198.87562 179.1638,201.17674 C 189.54676,202.13177 195.42739,203.33865 204.25524,206.32629 C 220.40947,211.7934 233.45769,220.06067 245.64967,232.55353 C 257.41942,244.61375 264.79941,256.57842 270.06442,272.13546 C 280.05329,301.65056 276.54405,332.87082 260.14712,360.3655 C 252.46998,373.23868 238.4778,387.2296 225.57477,394.93475 C 205.17849,407.11454 182.53968,412.26341 159.87911,409.8763 z M 506.23941,409.8763 C 487.91097,407.94553 469.17662,400.57848 454.18568,389.4068 C 448.34297,385.05265 438.39899,375.16131 433.89275,369.22131 C 412.66837,341.2439 406.72165,305.15299 417.89585,272.13546 C 421.36438,261.88664 426.88936,251.26671 433.08252,242.94411 C 437.26616,237.322 447.77149,226.73853 453.5297,222.34485 C 474.11988,206.63396 500.50657,198.87562 525.5241,201.17674 C 535.90705,202.13177 541.78769,203.33865 550.61554,206.32629 C 566.76977,211.7934 579.81798,220.06067 592.00997,232.55353 C 603.77972,244.61375 611.15971,256.57842 616.42472,272.13546 C 626.4136,301.65056 622.90434,332.87082 606.50742,360.3655 C 598.83028,373.23868 584.8381,387.2296 571.93506,394.93475 C 551.53879,407.11454 528.89998,412.26341 506.23941,409.8763 z M 268.15715,398.34455 C 262.05485,393.8274 257.09274,389.78085 257.13022,389.35222 C 257.16771,388.92358 259.02238,382.8904 261.25171,375.94516 L 265.30504,363.31744 L 280.33093,363.31744 L 295.35682,363.31744 L 295.75661,366.43337 C 296.75664,374.22758 299.55735,382.58539 302.60198,386.86118 L 303.90698,388.69388 L 292.35247,397.16119 C 285.99749,401.8182 280.45018,405.83753 280.0251,406.09302 C 279.57107,406.36591 274.67503,403.16933 268.15715,398.34455 z M 337.42028,405.976 C 320.59281,403.47665 306.16279,391.05567 300.82957,374.47969 C 298.54115,367.36718 298.54115,355.33179 300.82957,348.21927 C 305.39337,334.03469 316.66535,322.76272 330.84992,318.19891 C 337.96244,315.9105 349.99783,315.9105 357.11035,318.19891 C 371.29492,322.76272 382.5669,334.03469 387.1307,348.21927 C 388.46092,352.35367 388.71703,354.47349 388.71703,361.34948 C 388.71703,368.22547 388.46092,370.34529 387.1307,374.47969 C 382.57727,388.63201 371.11073,400.11532 357.26766,404.38638 C 351.87523,406.05013 342.80849,406.77631 337.42028,405.976 z M 396.92579,397.62232 L 384.71401,388.68724 L 386.01664,386.85786 C 389.05892,382.58537 391.85993,374.22514 392.85964,366.43337 L 393.25943,363.31744 L 408.27879,363.31744 L 423.29815,363.31744 L 427.32825,375.8997 C 429.54481,382.81995 431.48345,388.80799 431.63636,389.20646 C 431.8485,389.75928 414.15576,403.50512 409.90118,406.09295 C 409.45622,406.36359 404.04167,402.82884 396.92579,397.62232 z M 268.02631,354.50884 C 273.04989,344.52009 276.23138,334.54383 278.53343,321.56141 L 279.36557,316.86856 L 291.64153,325.75743 L 303.91749,334.6463 L 302.60724,336.48638 C 299.65373,340.6342 296.80802,348.88222 295.79112,356.24225 L 295.36383,359.33483 L 280.3873,359.52217 L 265.41076,359.70952 L 268.02631,354.50884 z M 392.82864,356.26559 C 391.80759,348.88029 388.96624,340.63942 386.00902,336.48638 L 384.69876,334.6463 L 396.97472,325.75914 C 403.7265,320.8712 409.31228,316.92903 409.38756,316.99877 C 409.46284,317.0685 409.8559,319.32711 410.26103,322.0179 C 411.91853,333.02667 415.51082,344.4202 420.36087,354.0511 C 421.6465,356.60403 422.69838,358.84776 422.69838,359.03716 C 422.69838,359.22656 416.07462,359.38152 407.9789,359.38152 L 393.25943,359.38152 L 392.82864,356.26559 z M 294.07723,322.92243 C 287.42898,318.04206 282.02018,313.69568 282.05767,313.2638 C 282.09515,312.83192 283.94982,306.79609 286.17915,299.85085 L 290.23248,287.22313 L 304.28557,287.22313 L 318.33866,287.22313 L 322.92901,301.46672 C 325.4537,309.30069 327.45931,315.73168 327.38593,315.75781 C 327.31255,315.78393 324.9866,316.93111 322.21716,318.30709 C 316.65941,321.06842 309.12528,326.92793 307.32398,329.88993 L 306.16493,331.79582 L 294.07723,322.92243 z M 382.02729,330.93379 C 382.02729,328.56931 368.96178,318.72054 363.12752,316.68717 C 361.93285,316.27079 361.08312,315.59632 361.23922,315.18833 C 361.39533,314.78034 363.49082,308.32126 365.89587,300.83483 L 370.26867,287.22313 L 384.31969,287.22313 L 398.37071,287.22313 L 402.4008,299.8054 C 404.61736,306.72564 406.55662,312.71526 406.71026,313.11566 C 406.86391,313.51606 401.76919,317.66923 395.38865,322.34491 C 381.62025,332.43446 382.02729,332.17281 382.02729,330.93379 z M 330.29493,312.66796 C 325.8914,298.77937 322.39483,286.94226 322.62717,286.70991 C 322.78591,286.55118 325.51511,286.81431 328.69207,287.29465 C 336.19383,288.42889 353.31585,288.4268 360.24099,287.29081 C 363.23139,286.80027 365.81041,286.53124 365.97215,286.69298 C 366.13389,286.85472 365.11589,290.67424 363.70993,295.18081 C 362.30397,299.68738 360.38824,305.88391 359.45275,308.95089 L 357.75187,314.52721 L 352.99795,313.69292 C 345.8921,312.44588 337.51981,312.74932 332.16818,314.44786 C 331.25536,314.73758 330.81995,314.32387 330.29493,312.66796 z M 333.05926,283.9271 C 314.73082,281.99634 295.99647,274.62928 281.00554,263.4576 C 275.16282,259.10345 265.21884,249.21211 260.7126,243.27211 C 239.48823,215.2947 233.5415,179.20379 244.7157,146.18627 C 248.18423,135.93744 253.70921,125.31751 259.90237,116.99491 C 264.08601,111.3728 274.59134,100.78933 280.34955,96.395647 C 308.13137,75.197328 344.43255,69.207858 377.43539,80.377088 C 393.58962,85.844198 406.63783,94.111468 418.82982,106.60433 C 430.59957,118.66455 437.97956,130.62922 443.24457,146.18627 C 453.23344,175.70137 449.7242,206.92162 433.32727,234.4163 C 425.65013,247.28948 411.65795,261.2804 398.75492,268.98555 C 378.35864,281.16534 355.71983,286.31422 333.05926,283.9271 z",
                        id: "path9114"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0", y: "0", width: "600", height: "600", viewBox: "0 0 600 600", style: { color: "var(--fg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { type: "text/css", children: `
	.st0{fill:none;stroke:#000;stroke-width:2;}
` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 \n	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 \n	501,201.2 550.3,250.5 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "600,0 400.8,200.3 351,150.5 501.5,0 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 \n	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 \n	250,452.3 299.2,501.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { className: "st0", points: "-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 \n	49.7,252 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86.2", y: "284.6", transform: "matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)", className: "st0", width: "70.5", height: "290.4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { className: "st0", points: "399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600.4", y1: "400", x2: "398.7", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "99.4", y1: "0", x2: "0.4", y2: "101.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "600", y1: "502.4", x2: "499.6", y2: "600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "43.7", y1: "557.4", x2: "0.4", y2: "600.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { className: "st0", x1: "149.7", y1: "552.5", x2: "99", y2: "600.7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "courtesy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "courtesy-mark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accent-bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A note · 一筆" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "courtesy-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: "The kaiseki begins the moment the first guest is seated. We ask, with respect, that you arrive within ten minutes of your seating time." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Each course is timed against the next — the suimono is ladled when the sashimi knife is set down, the rice is lifted from the kamado as the yakimono leaves the grill. Late arrivals shorten the meal not for themselves alone but for the six others at the counter." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If the trains delay you, please telephone before the hour and we will hold what we can. The lane is narrow and a taxi cannot reach the door; budget the full six minutes from Nippori on foot, and a few more in the rain." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cancellations are received without charge until 18:00 on the previous day. Thereafter the seat fee of ¥8,000 applies, as the day's market purchase has already been made in your name." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "courtesy-sign", children: "— 主人 板倉 宗一郎 / Sōichirō Itakura, proprietor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "contact-band", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-cell", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "Reservations"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+81338210000", children: "+81 (0)3 3821 0000" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Daily, 14:00–17:00 JST" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-cell", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "Correspondence"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:counter@tsukimi-tei.jp", children: "counter@tsukimi-tei.jp" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Replies within 48 hours" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-cell", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "◆" }),
            "Continue"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-1", children: "Tsukimi-tei · home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/page-3", children: "This month's kaiseki" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const ROUTES = {
  "/page-1": /* @__PURE__ */ jsxRuntimeExports.jsx(Page1, {}),
  "/page-2": /* @__PURE__ */ jsxRuntimeExports.jsx(Page2, {}),
  "/page-3": /* @__PURE__ */ jsxRuntimeExports.jsx(Page3, {}),
  "/page-4": /* @__PURE__ */ jsxRuntimeExports.jsx(Page4, {}),
  "/page-5": /* @__PURE__ */ jsxRuntimeExports.jsx(Page5, {}),
  "/page-6": /* @__PURE__ */ jsxRuntimeExports.jsx(Page6, {})
};
function getRoute() {
  const h = (typeof window !== "undefined" ? window.location.hash : "") || "#/page-1";
  return h.replace(/^#/, "") || "/page-1";
}
function App() {
  const [route, setRoute] = reactExports.useState(getRoute());
  reactExports.useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return ROUTES[route] || ROUTES["/page-1"];
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
