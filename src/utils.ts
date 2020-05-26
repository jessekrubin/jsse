export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
export const keep_keys = (obj: any, keys: string[]) => {
  return Object.keys(obj).reduce(function (r: Record<any, any>, e) {
    if (keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};
export const keep_vals = (obj: Record<any, any>, vals: any[]) => {
  return Object.keys(obj).reduce(function (r: Record<string, any>, e) {
    if (vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_keys = (obj: Record<any, any>, keys: string[]) => {
  return Object.keys(obj).reduce(function (r: Record<string, any>, e) {
    if (!keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_vals = (obj: any, vals: any[]) => {
  return Object.keys(obj).reduce(function (r: Record<string, any>, e) {
    if (!vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_falsey_vals = (obj: any) => {
  return Object.keys(obj).reduce(function (r: Record<any, any>, e) {
    if (obj[e]) r[e] = obj[e];
    return r;
  }, {});
};

export const zip = (arr: any[], ...arrs: any[]) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

// array o objects + a key to grame from object => object/dict using given key
export const objectify = (arr: any[], key: string | number) => {
  return arr.reduce((obj, item) => {
    return Object.assign(obj, {[item[key]]: item});
  }, {});
};

// export function* range(start: number, end: number | undefined, step = 1) {
//   if (end === undefined) [end, start] = [start, 0];
//   for (let n = start; n < end; n += step) yield n;
// }

export function arange(
  start: number,
  end: number | undefined = undefined,
  step = 1,
): number[] {
  if (end === undefined) [end, start] = [start, 0];
  let l = [];
  for (let n = start; n < end; n += step) l.push(n);
  return l;
}

export function arrmin<T>(arr: T[]): T {
  return arr.reduce(function (p, v) {
    return p < v ? p : v;
  });
}

export function arrmax<T>(arr: T[]): T {
  return arr.reduce(function (p, v) {
    return p > v ? p : v;
  });
}
