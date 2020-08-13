'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = _interopDefault(require('path'));

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol !== "undefined") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

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
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously implement a generic for loop
function _for(test, update, body) {
	var stage;
	for (;;) {
		var shouldContinue = test();
		if (_isSettledPact(shouldContinue)) {
			shouldContinue = shouldContinue.v;
		}
		if (!shouldContinue) {
			return result;
		}
		if (shouldContinue.then) {
			stage = 0;
			break;
		}
		var result = body();
		if (result && result.then) {
			if (_isSettledPact(result)) {
				result = result.s;
			} else {
				stage = 1;
				break;
			}
		}
		if (update) {
			var updateValue = update();
			if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
				stage = 2;
				break;
			}
		}
	}
	var pact = new _Pact();
	var reject = _settle.bind(null, pact, 2);
	(stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
	return pact;
	function _resumeAfterBody(value) {
		result = value;
		do {
			if (update) {
				updateValue = update();
				if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
					updateValue.then(_resumeAfterUpdate).then(void 0, reject);
					return;
				}
			}
			shouldContinue = test();
			if (!shouldContinue || (_isSettledPact(shouldContinue) && !shouldContinue.v)) {
				_settle(pact, 1, result);
				return;
			}
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
				return;
			}
			result = body();
			if (_isSettledPact(result)) {
				result = result.v;
			}
		} while (!result || !result.then);
		result.then(_resumeAfterBody).then(void 0, reject);
	}
	function _resumeAfterTest(shouldContinue) {
		if (shouldContinue) {
			result = body();
			if (result && result.then) {
				result.then(_resumeAfterBody).then(void 0, reject);
			} else {
				_resumeAfterBody(result);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
	function _resumeAfterUpdate() {
		if (shouldContinue = test()) {
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
			} else {
				_resumeAfterTest(shouldContinue);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
}

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

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
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
function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
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
var filter_falsey_vals = function filter_falsey_vals(obj) {
  return Object.keys(obj).reduce(function (r, e) {
    if (obj[e]) r[e] = obj[e];
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

(function (FdType) {
  FdType["File"] = "f";
  FdType["Dir"] = "d";
  FdType["Link"] = "l";
  FdType["Unknown"] = "u";
})(exports.FdType || (exports.FdType = {}));

var lstring = function lstring(filepath, encoding) {
  if (encoding === void 0) {
    encoding = 'utf8';
  }

  try {
    var _String2 = String;
    // @ts-ignore
    return Promise.resolve(fs.promises.readFile(filepath, encoding)).then(_String2);
  } catch (e) {
    return Promise.reject(e);
  }
};
var sstring = function sstring(filepath, str) {
  try {
    return Promise.resolve(fs.promises.writeFile(filepath, str)).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
var lstr = lstring;
var sstr = sstring;
var ljson = function ljson(filepath) {
  try {
    return Promise.resolve(lstring(filepath)).then(JSON.parse);
  } catch (e) {
    return Promise.reject(e);
  }
};
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
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var sjson = function sjson(filepath, data, opts) {
  if (opts === void 0) {
    opts = {};
  }

  try {
    var _opts2 = opts,
        _opts2$sort_keys = _opts2.sort_keys,
        sort_keys = _opts2$sort_keys === void 0 ? false : _opts2$sort_keys,
        _opts2$indent = _opts2.indent,
        indent = _opts2$indent === void 0 ? undefined : _opts2$indent;
    var replacer = sort_keys && typeof data === 'object' ? sort_keys_replacer : null;
    return Promise.resolve(sstring(filepath, JSON.stringify(data, // @ts-ignore
    replacer, indent))).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
var mkdir = function mkdir(dirpath, exist_ok) {
  if (exist_ok === void 0) {
    exist_ok = false;
  }

  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.mkdir(dirpath, {
        recursive: true
      })).then(function () {});
    }, function (err) {
      if (err.code === 'EEXIST') {
        if (!exist_ok) {
          throw new Error("!!!mkdir error: " + dirpath + " exists--add 'exist_ok'=true");
        }
      } else {
        throw err;
      }
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var cpfile = function cpfile(src, dest) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.copyFile(src, dest)).then(function () {});
    }, function (error) {
      console.log(error);
      throw error;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var exists = function exists(pathstr) {
  return Promise.resolve(_catch(function () {
    return Promise.resolve(fs.promises.access(pathstr)).then(function () {
      return true;
    });
  }, function () {
    return false;
  }));
};
var isdir = function isdir(source) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.lstat(source)).then(function (stats) {
        return stats.isDirectory();
      });
    }, function (e) {
      console.log(e);
      throw e;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var isfile = function isfile(source) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.lstat(source)).then(function (stats) {
        return stats.isFile();
      });
    }, function (e) {
      console.log(e);
      throw e;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var islink = function islink(source) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.lstat(source)).then(function (stats) {
        return stats.isSymbolicLink();
      });
    }, function (e) {
      console.log(e);
      throw e;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var fdtype = function fdtype(source) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.lstat(source)).then(function (stats) {
        if (stats.isFile()) {
          return exports.FdType.File;
        }

        return stats.isDirectory() ? exports.FdType.Dir : stats.isSymbolicLink() ? exports.FdType.Link : exports.FdType.Unknown;
      });
    }, function (e) {
      console.log(e);
      throw e;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var mv = function mv(src, dest) {
  try {
    return Promise.resolve(exists(src)).then(function (srcExists) {
      if (!srcExists) {
        throw Error("!!!mv error: src (" + src + ") DOES NOT exist");
      }

      return Promise.resolve(exists(dest)).then(function (dest_exists) {
        if (dest_exists) {
          throw Error("!!!mv error: dest (" + dest + ") DOES exist");
        }

        return Promise.resolve(fs.promises.rename(src, dest)).then(function () {});
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var ls = function ls(dirpath, abs) {
  if (abs === void 0) {
    abs = true;
  }

  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fs.promises.readdir(dirpath)).then(function (diritems) {
        return abs ? diritems.map(function (el) {
          return path.join(dirpath, el);
        }) : diritems;
      });
    }, function (err) {
      console.log(err);
      throw err;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var lsdirs = function lsdirs(dirpath, abs) {
  if (abs === void 0) {
    abs = true;
  }

  try {
    return Promise.resolve(ls(dirpath, abs)).then(function (items) {
      return Promise.resolve(filter_async(items, isdir));
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var lsfiles = function lsfiles(dirpath, abs) {
  if (abs === void 0) {
    abs = true;
  }

  try {
    return Promise.resolve(ls(dirpath, abs)).then(function (items) {
      return Promise.resolve(filter_async(items, isfile));
    });
  } catch (e) {
    return Promise.reject(e);
  }
}; // export async function list_async_gen<T>(ag: AsyncIterableIterator<T>): Promise<T[]> {
//   const items = [];
//   for await (const el of await ag) {
//     items.push(el);
//   }
//   return items;
// }

function walk_gen(_x) {
  return _walk_gen.apply(this, arguments);
}

function _walk_gen() {
  _walk_gen = _wrapAsyncGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dirpath) {
    var items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, el, isd, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value2, p;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _awaitAsyncGenerator(ls(dirpath));

          case 2:
            items = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 5;
            _iterator = _asyncIterator(items);

          case 7:
            _context.next = 9;
            return _awaitAsyncGenerator(_iterator.next());

          case 9:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 13;
            return _awaitAsyncGenerator(_step.value);

          case 13:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 59;
              break;
            }

            el = _value;
            _context.next = 18;
            return _awaitAsyncGenerator(isdir(el));

          case 18:
            isd = _context.sent;
            _context.next = 21;
            return el;

          case 21:
            if (!isd) {
              _context.next = 56;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _context.prev = 24;
            _iterator2 = _asyncIterator(walk_gen(el));

          case 26:
            _context.next = 28;
            return _awaitAsyncGenerator(_iterator2.next());

          case 28:
            _step2 = _context.sent;
            _iteratorNormalCompletion2 = _step2.done;
            _context.next = 32;
            return _awaitAsyncGenerator(_step2.value);

          case 32:
            _value2 = _context.sent;

            if (_iteratorNormalCompletion2) {
              _context.next = 40;
              break;
            }

            p = _value2;
            _context.next = 37;
            return p;

          case 37:
            _iteratorNormalCompletion2 = true;
            _context.next = 26;
            break;

          case 40:
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t0 = _context["catch"](24);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 46:
            _context.prev = 46;
            _context.prev = 47;

            if (!(!_iteratorNormalCompletion2 && _iterator2["return"] != null)) {
              _context.next = 51;
              break;
            }

            _context.next = 51;
            return _awaitAsyncGenerator(_iterator2["return"]());

          case 51:
            _context.prev = 51;

            if (!_didIteratorError2) {
              _context.next = 54;
              break;
            }

            throw _iteratorError2;

          case 54:
            return _context.finish(51);

          case 55:
            return _context.finish(46);

          case 56:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 59:
            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t1 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 65:
            _context.prev = 65;
            _context.prev = 66;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 70;
              break;
            }

            _context.next = 70;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 70:
            _context.prev = 70;

            if (!_didIteratorError) {
              _context.next = 73;
              break;
            }

            throw _iteratorError;

          case 73:
            return _context.finish(70);

          case 74:
            return _context.finish(65);

          case 75:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 61, 65, 75], [24, 42, 46, 56], [47,, 51, 55], [66,, 70, 74]]);
  }));
  return _walk_gen.apply(this, arguments);
}

var walk_list = function walk_list(dirpath) {
  try {
    var _exit2 = false;
    var arr = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;

    var _iteratorError3;

    var _temp6 = _finallyRethrows(function () {
      return _catch(function () {
        var _asyncIterator2 = _asyncIterator;
        return Promise.resolve(walk_gen(dirpath)).then(function (_walk_gen2) {
          var _iterator3 = _asyncIterator2(_walk_gen2),
              _step3,
              _value3;

          var _temp = _for(function () {
            return !!Promise.resolve(_iterator3.next()).then(function (_iterator3$next) {
              var _iteratorNormalComple = _iteratorNormalCompletion3 = _step3.done,
                  _step4 = _step3 = _iterator3$next;

              return Promise.resolve(_step3.value).then(function (_step3$value) {
                return _value3 = _step3$value, !_iteratorNormalCompletion3;
              });
            });
          }, function () {
            return !!(_iteratorNormalCompletion3 = true);
          }, function () {
            var el = _value3;
            arr.push(el);
          });

          if (_temp && _temp.then) return _temp.then(function () {});
        });
      }, function (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      });
    }, function (_wasThrown, _result3) {
      function _temp4(_result4) {
        if (_exit2) return _result4;
        if (_wasThrown) throw _result3;
        return _result3;
      }

      var _temp3 = _finallyRethrows(function () {
        var _temp2 = function () {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            return Promise.resolve(_iterator3["return"]()).then(function () {});
          }
        }();

        if (_temp2 && _temp2.then) return _temp2.then(function () {});
      }, function (_wasThrown2, _result4) {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }

        if (_wasThrown2) throw _result4;
        return _result4;
      });

      return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
    });

    return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function (_result3) {
      return _exit2 ? _result3 : arr;
    }) : _exit2 ? _temp6 : arr);
  } catch (e) {
    return Promise.reject(e);
  }
};
var pwd = function pwd() {
  return process.cwd();
};

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

var hasArrayBuffer = typeof ArrayBuffer === 'function';
var haskey = function haskey(obj, key) {
  return obj.hasOwnProperty(key);
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

exports.arange = arange;
exports.arrmax = arrmax;
exports.arrmin = arrmin;
exports.b64decode = b64decode;
exports.b64encode = b64encode;
exports.camel2snake = camel2snake;
exports.chunk = chunk;
exports.cpfile = cpfile;
exports.dumps = dumps;
exports.exists = exists;
exports.fdtype = fdtype;
exports.filter_async = filter_async;
exports.filter_falsey_vals = filter_falsey_vals;
exports.filter_keys = filter_keys;
exports.filter_vals = filter_vals;
exports.fmt_nbytes = fmt_nbytes;
exports.get = get;
exports.hasArrayBuffer = hasArrayBuffer;
exports.haskey = haskey;
exports.http = http;
exports.isdir = isdir;
exports.isempty = isempty;
exports.isfile = isfile;
exports.isfin = isfin;
exports.isfloat = isfloat;
exports.isinf = isinf;
exports.isint = isint;
exports.islink = islink;
exports.isnan = isnan;
exports.items = items;
exports.jsoncp = jsoncp;
exports.keep_keys = keep_keys;
exports.keep_vals = keep_vals;
exports.ljson = ljson;
exports.ls = ls;
exports.lsdirs = lsdirs;
exports.lsfiles = lsfiles;
exports.lstr = lstr;
exports.lstring = lstring;
exports.map_async = map_async;
exports.mkdir = mkdir;
exports.mv = mv;
exports.nbytes = nbytes;
exports.objectify = objectify;
exports.objinfo = objinfo;
exports.objkeys = objkeys;
exports.objtype = objtype;
exports.pascal2camel = pascal2camel;
exports.pathjoin = pathjoin;
exports.post = post;
exports.put = put;
exports.pwd = pwd;
exports.sjson = sjson;
exports.sleep = sleep;
exports.snake2camel = snake2camel;
exports.sort_keys_replacer = sort_keys_replacer;
exports.sstr = sstr;
exports.sstring = sstring;
exports.sum = sum;
exports.unique = unique;
exports.usort = usort;
exports.walk_gen = walk_gen;
exports.walk_list = walk_list;
exports.zip = zip;
//# sourceMappingURL=jsse.cjs.development.js.map
