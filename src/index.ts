export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const keep_keys = (obj: any, keys: string[]) => {
  return Object.keys(obj).reduce(function(r: Record<any, any>, e) {
    if (keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};

export const keep_vals = (obj: any, vals: any[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_keys = (obj: any, keys: string[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (!keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_vals = (obj: any, vals: any[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (!vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const zip = (arr: any[], ...arrs: any[]) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

// array o objects + a key to grame from object => object/dict using given key
export const objectify = (arr: any[], key: string | number) => {
  return arr.reduce((obj, item) => {
    return Object.assign(obj, { [item[key]]: item });
  }, {});
};
