export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
export const keep_keys = (obj: Record<any, any>, keys: string[]) => {
  return Object.keys(obj).reduce(function(r: Record<any, any>, e) {
    if (keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};
export const keep_vals = (obj: Record<any, any>, vals: any[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_keys = (obj: Record<any, any>, keys: string[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (!keys.includes(e)) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_vals = (obj: Record<any, any>, vals: any[]) => {
  return Object.keys(obj).reduce(function(r: Record<string, any>, e) {
    if (!vals.includes(obj[e])) r[e] = obj[e];
    return r;
  }, {});
};

export const filter_falsey_vals = (obj: Record<any, any>) => {
  return Object.keys(obj).reduce(function(r: Record<any, any>, e) {
    if (obj[e]) r[e] = obj[e];
    return r;
  }, {});
};

export const zip = (arr: any[], ...arrs: any[]) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [ ...a, arr[i] ], [ val ]));
};

// array o objects + a key to grame from object => object/dict using given key
export const objectify = (arr: any[], key: string | number) => {
  return arr.reduce((obj, item) => {
    return Object.assign(obj, { [item[key]]: item });
  }, {});
};

// export function* range(start: number, end: number | undefined, step = 1) {
//   if (end === undefined) [end, start] = [start, 0];
//   for (let n = start; n < end; n += step) yield n;
// }
export function arange(
  start: number,
  end: number | undefined = undefined,
  step = 1
): number[] {
  if (end === undefined) [ end, start ] = [ start, 0 ];
  let l = [];
  for (let n = start; n < end; n += step) l.push(n);
  return l;
}


export const items = (obj: any) => {
  return Object.entries(obj);
};

export function arrmin<T>(arr: T[]): T {
  return arr.reduce(function(p, v) {
    return p < v ? p : v;
  });
}

export function arrmax<T>(arr: T[]): T {
  return arr.reduce(function(p, v) {
    return p > v ? p : v;
  });
}

export const chunk = (array: any[], size: number) => {
  return array.reduce((arr: any[], item, idx: number) => {
    return idx % size === 0
      ? [ ...arr, [ item ] ]
      : [ ...arr.slice(0, -1), [ ...arr.slice(-1)[0], item ] ];
  }, []);
};

export function map_async<T, U>(array: T[], cb: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
  return Promise.all(array.map(cb));
}

export async function filter_async<T>(array: T[], cb: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]> {
  const filterMap = await map_async(array, cb);
  return array.filter((_value, index) => filterMap[index]);
}

export function objkeys<O extends object>(obj: O): Array<keyof O> {
  return Object.keys(obj) as Array<keyof O>;
}

export function jsoncp<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
