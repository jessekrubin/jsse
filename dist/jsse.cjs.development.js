'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.filter_keys = filter_keys;
exports.filter_vals = filter_vals;
exports.keep_keys = keep_keys;
exports.keep_vals = keep_vals;
exports.objectify = objectify;
exports.sum = sum;
exports.zip = zip;
//# sourceMappingURL=jsse.cjs.development.js.map
