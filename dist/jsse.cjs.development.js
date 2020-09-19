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

var put = function put(path, body, opts) {
  try {
    if (opts === undefined) opts = {
      method: 'put',
      body: JSON.stringify(body)
    };
    return Promise.resolve(http(new Request(path, _extends({
      method: 'put',
      body: JSON.stringify(body)
    }, opts))));
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
 * @param opts
 */
var post = function post(path, body, opts) {
  try {
    if (opts === undefined) opts = {
      method: 'post',
      body: JSON.stringify(body)
    };
    return Promise.resolve(http(new Request(path, _extends({
      method: 'post',
      body: JSON.stringify(body)
    }, opts))));
  } catch (e) {
    return Promise.reject(e);
  }
};
var get = function get(path, opts) {
  if (opts === void 0) {
    opts = {
      method: 'get'
    };
  }

  try {
    return Promise.resolve(http(new Request(path, _extends({
      method: 'get'
    }, opts))));
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

var filter_async = function filter_async(array, cb) {
  try {
    return Promise.resolve(map_async(array, cb)).then(function (filterMap) {
      return array.filter(function (_value, index) {
        return filterMap[index];
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var __version__ = "0.2.0";
function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
var sort_keys_replacer = function sort_keys_replacer(_key, value) {
  return value instanceof Object && !(value instanceof Array) ? Object.keys(value).sort().reduce(function (sorted, key) {
    sorted[key] = value[key];
    return sorted;
  }, {}) : value;
};
var dumps = function dumps(data, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts,
      _opts$sort_keys = _opts.sort_keys,
      sort_keys = _opts$sort_keys === void 0 ? false : _opts$sort_keys,
      _opts$indent = _opts.indent,
      indent = _opts$indent === void 0 ? undefined : _opts$indent;
  var replacer = sort_keys && typeof data === 'object' ? sort_keys_replacer : null;
  return JSON.stringify(data, // @ts-ignore
  replacer, indent);
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
var filter_falsey_vals = function filter_falsey_vals(obj) {
  return Object.keys(obj).reduce(function (r, e) {
    if (obj[e]) r[e] = obj[e];
    return r;
  }, {});
};
var zip = function zip(arr) {
  for (var _len = arguments.length, arrs = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
    arrs[_key2 - 1] = arguments[_key2];
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
}; // export function* range(start: number, end: number | undefined, step = 1) {
//   if (end === undefined) [end, start] = [start, 0];
//   for (let n = start; n < end; n += step) yield n;
// }

function arange(start, end, step) {
  if (end === void 0) {
    end = undefined;
  }

  if (step === void 0) {
    step = 1;
  }

  if (end === undefined) {
    var _ref = [start, 0];
    end = _ref[0];
    start = _ref[1];
  }

  var l = [];

  for (var n = start; n < end; n += step) {
    l.push(n);
  }

  return l;
}
var items = function items(obj) {
  return Object.entries(obj);
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
function chunk(array, size) {
  return array.reduce(function (arr, item, idx) {
    return idx % size === 0 ? [].concat(arr, [[item]]) : [].concat(arr.slice(0, -1), [[].concat(arr.slice(-1)[0], [item])]);
  }, []);
}
function map_async(array, cb) {
  return Promise.all(array.map(cb));
}
function objkeys(obj) {
  return Object.keys(obj);
}
function jsoncp(data) {
  return JSON.parse(JSON.stringify(data));
}
function unique(array) {
  var s = new Set(array);
  return Array.from(s);
}
function usort(array) {
  return unique(array).sort();
}
function pathjoin(parts, sep) {
  if (sep === void 0) {
    sep = '/';
  }

  var separator = sep || '/';
  parts = parts.map(function (part, index) {
    if (index) {
      part = part.replace(new RegExp('^' + separator), '');
    }

    if (index !== parts.length - 1) {
      part = part.replace(new RegExp(separator + '$'), '');
    }

    return part;
  });
  return parts.join(separator);
}
function fmt_nbytes(bytes) {
  if (bytes < 1024) return bytes + ' bytes';else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';else return (bytes / 1073741824).toFixed(3) + ' GiB';
}
function objtype(obj) {
  if (obj === null) {
    return 'null';
  }

  if (obj === undefined) {
    return 'undefined';
  }

  switch (typeof obj) {
    case 'number':
      return 'number';

    case 'string':
      return 'string';

    case 'boolean':
      return 'boolean';

    case 'object':
      return Object.prototype.toString.call(obj).slice(8, -1);
  }

  throw Error('Cannot determine obj_type ' + String(obj));
}
function nbytes(obj) {
  var bytes = 0;

  function _nbytes(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8;
          break;

        case 'string':
          bytes += obj.length * 2;
          break;

        case 'boolean':
          bytes += 4;
          break;

        case 'object':
          var objcls = Object.prototype.toString.call(obj).slice(8, -1);

          if (objcls === 'Object' || objcls === 'Array') {
            for (var key in obj) {
              if (!obj.hasOwnProperty(key)) continue;

              _nbytes(obj[key]);
            }
          } else if (objcls === 'ArrayBuffer') {
            bytes += obj.byteLength;
            break;
          } else bytes += obj.toString().length * 2;

          break;
      }
    }

    return bytes;
  }
  return _nbytes(obj);
}
function objinfo(obj) {
  var size = nbytes(obj);
  return {
    size: size,
    size_str: fmt_nbytes(size),
    obj_type: objtype(obj)
  };
}
var hasArrayBuffer = typeof ArrayBuffer === 'function';
var haskey = function haskey(obj, key) {
  var keyParts = key.split('.');
  return !!obj && (keyParts.length > 1 ? haskey(obj[key.split('.')[0]], keyParts.slice(1).join('.')) : Object.hasOwnProperty.call(obj, key));
};
var isnan = function isnan(num) {
  return Number.isNaN(Number(num));
};
var isfin = function isfin(num) {
  return Number.isFinite(Number(num));
};
var isinf = function isinf(num) {
  return !Number.isFinite(Number(num));
};
var isint = function isint(num) {
  return Number.isInteger(Number(num));
};
var isfloat = function isfloat(num) {
  return !isint(num);
};
var isempty = function isempty(obj) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};
var toString = Object.prototype.toString;
function isArrayBuffer(obj) {
  return hasArrayBuffer && (obj instanceof ArrayBuffer || toString.call(obj) === '[object ArrayBuffer]');
}
var camel2snake = function camel2snake(str) {
  return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, function (letter) {
    return "_" + letter.toLowerCase();
  });
};
var pascal2camel = function pascal2camel(str) {
  return str[0].toLowerCase() + str.slice(1, str.length);
};
var snake2camel = function snake2camel(str) {
  return str.toLowerCase().replace(/([-_][a-z])/g, function (group) {
    return group.toUpperCase().replace('-', '').replace('_', '');
  });
};

exports.__version__ = __version__;
exports.arange = arange;
exports.arrmax = arrmax;
exports.arrmin = arrmin;
exports.b64decode = b64decode;
exports.b64encode = b64encode;
exports.camel2snake = camel2snake;
exports.chunk = chunk;
exports.dumps = dumps;
exports.filter_async = filter_async;
exports.filter_falsey_vals = filter_falsey_vals;
exports.filter_keys = filter_keys;
exports.filter_vals = filter_vals;
exports.fmt_nbytes = fmt_nbytes;
exports.get = get;
exports.hasArrayBuffer = hasArrayBuffer;
exports.haskey = haskey;
exports.http = http;
exports.isArrayBuffer = isArrayBuffer;
exports.isempty = isempty;
exports.isfin = isfin;
exports.isfloat = isfloat;
exports.isinf = isinf;
exports.isint = isint;
exports.isnan = isnan;
exports.items = items;
exports.jsoncp = jsoncp;
exports.keep_keys = keep_keys;
exports.keep_vals = keep_vals;
exports.map_async = map_async;
exports.nbytes = nbytes;
exports.objectify = objectify;
exports.objinfo = objinfo;
exports.objkeys = objkeys;
exports.objtype = objtype;
exports.pascal2camel = pascal2camel;
exports.pathjoin = pathjoin;
exports.post = post;
exports.put = put;
exports.sleep = sleep;
exports.snake2camel = snake2camel;
exports.sort_keys_replacer = sort_keys_replacer;
exports.unique = unique;
exports.usort = usort;
exports.zip = zip;
//# sourceMappingURL=jsse.cjs.development.js.map
