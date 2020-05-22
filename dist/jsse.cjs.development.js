'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var put = function put(path, body, args) {
  try {
    if (args === undefined) args = {
      method: 'put',
      body: JSON.stringify(body)
    };
    return Promise.resolve(http(new Request(path, _extends({
      method: 'put',
      body: JSON.stringify(body)
    }, args))));
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 *
 *
 *
 * __EXAMPLE__
 * const response = await post<{ id: number }>(
 *   "https://something.com/path",
 *   { title: "my post", body: "some content" }
 * );
 *
 * @param path
 * @param body
 * @param args
 */
var post = function post(path, body, args) {
  try {
    if (args === undefined) args = {
      method: 'post',
      body: JSON.stringify(body)
    };
    return Promise.resolve(http(new Request(path, _extends({
      method: 'post',
      body: JSON.stringify(body)
    }, args))));
  } catch (e) {
    return Promise.reject(e);
  }
};
var get = function get(path, args) {
  if (args === void 0) {
    args = {
      method: 'get'
    };
  }

  try {
    return Promise.resolve(http(new Request(path, _extends({
      method: 'get'
    }, args))));
  } catch (e) {
    return Promise.reject(e);
  }
};
var http = function http(request) {
  try {
    return Promise.resolve(fetch(request)).then(function (response) {
      function _temp2() {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response;
      }

      var _temp = _catch(function () {
        // may error if there is no body or if it can't be parsed
        // response.bodyJSON = await response.json();
        return Promise.resolve(response.json()).then(function (_response$json) {
          response.bodyJSON = _response$json;
        });
      }, function () {});

      return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var fetching = {
  __proto__: null,
  put: put,
  post: post,
  get: get,
  http: http
};

global.Buffer = global.Buffer || /*#__PURE__*/require('buffer').Buffer;
function b64decode(b64Encoded) {
  return new Buffer(b64Encoded, 'base64').toString('binary');
}
function b64encode(str) {
  return new Buffer(str, 'binary').toString('base64');
}

if (typeof btoa === 'undefined') {
  global.btoa = b64encode;
}

if (typeof atob === 'undefined') {
  global.atob = b64decode;
}

var sum = function sum(a, b) {
  {
    console.log('boop');
  }

  return a + b;
};
var keep_keys = function keep_keys(obj, keys) {
  return Object.keys(obj).reduce(function (r, e) {
    if (keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};
var keep_vals = function keep_vals(obj, vals) {
  return Object.keys(obj).reduce(function (r, e) {
    if (vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};
var filter_keys = function filter_keys(obj, keys) {
  return Object.keys(obj).reduce(function (r, e) {
    if (!keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};
var filter_vals = function filter_vals(obj, vals) {
  return Object.keys(obj).reduce(function (r, e) {
    if (!vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};
var zip = function zip(arr) {
  for (var _len = arguments.length, arrs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrs[_key - 1] = arguments[_key];
  }

  return arr.map(function (val, i) {
    return arrs.reduce(function (a, arr) {
      return [].concat(a, [arr[i]]);
    }, [val]);
  });
}; // array o objects + a key to grame from object => object/dict using given key

var objectify = function objectify(arr, key) {
  return arr.reduce(function (obj, item) {
    var _Object$assign;

    return Object.assign(obj, (_Object$assign = {}, _Object$assign[item[key]] = item, _Object$assign));
  }, {});
};
var range = function range(end, start) {
  if (start === void 0) {
    start = 0;
  }

  return new Array(end - start).fill(undefined).map(function (_, i) {
    return i + start;
  });
};
function arrmin(arr) {
  return arr.reduce(function (p, v) {
    return p < v ? p : v;
  });
}
function arrmax(arr) {
  return arr.reduce(function (p, v) {
    return p > v ? p : v;
  });
}

exports.arrmax = arrmax;
exports.arrmin = arrmin;
exports.b64decode = b64decode;
exports.b64encode = b64encode;
exports.fetching = fetching;
exports.filter_keys = filter_keys;
exports.filter_vals = filter_vals;
exports.keep_keys = keep_keys;
exports.keep_vals = keep_vals;
exports.objectify = objectify;
exports.range = range;
exports.sum = sum;
exports.zip = zip;
//# sourceMappingURL=jsse.cjs.development.js.map
