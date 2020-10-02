export const __version__ = '0.2.0';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const sort_keys_replacer = (
  _key: any,
  value: { [x: string]: any } | any[] | any
) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce((sorted: { [x: string]: any }, key: string) => {
          sorted[key] = value[key];
          return sorted;
        }, {})
    : value;

export const dumps = (
  data: any,
  opts: {
    sort_keys?: boolean;
    indent?: number | undefined;
  } = {}
) => {
  const { sort_keys = false, indent = undefined } = opts;
  const replacer = sort_keys && typeof data === 'object' ? sort_keys_replacer : null;
  return JSON.stringify(
    data,
    // @ts-ignore
    replacer,
    indent
  );
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
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
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
  if (end === undefined) [end, start] = [start, 0];
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

export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((arr: any[], item, idx: number) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
}

export function map_async<T, U>(
  array: T[],
  cb: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(cb));
}

export async function filter_async<T>(
  array: T[],
  cb: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const filterMap = await map_async(array, cb);
  return array.filter((_value, index) => filterMap[index]);
}

export function objkeys<O extends object>(obj: O): Array<keyof O> {
  return Object.keys(obj) as Array<keyof O>;
}

export function jsoncp<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function unique<T>(array: T[]): T[] {
  const s = new Set(array);
  return Array.from(s);
}

export function usort<T>(array: T[]): T[] {
  return unique(array).sort();
}

export function pathjoin(parts: string[], sep: string = '/') {
  const separator = sep || '/';
  parts = parts.map((part, index) => {
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

export function fmt_nbytes(bytes: number) {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';
  else return (bytes / 1073741824).toFixed(3) + ' GiB';
}

export function objtype(obj: any): string {
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

export function nbytes(obj: any): number {
  let bytes = 0;

  function _nbytes(obj: any): number {
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
          const objcls = Object.prototype.toString.call(obj).slice(8, -1);
          if (objcls === 'Object' || objcls === 'Array') {
            for (const key in obj) {
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

export function objinfo(obj: any) {
  const size = nbytes(obj);
  return {
    size,
    size_str: fmt_nbytes(size),
    obj_type: objtype(obj),
  };
}

export const hasArrayBuffer = typeof ArrayBuffer === 'function';

export const haskey = function(obj: any, key: string): boolean {
  const keyParts = key.split('.');

  return (
    !!obj &&
    (keyParts.length > 1
      ? haskey(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : Object.hasOwnProperty.call(obj, key))
  );
};

export const isnan = (num: string | number) => {
  return Number.isNaN(Number(num));
};

export const isfin = (num: string | number) => {
  return Number.isFinite(Number(num));
};

export const isinf = (num: string | number) => {
  return !Number.isFinite(Number(num));
};

export const isint = (num: string | number) => {
  return Number.isInteger(Number(num));
};

export const isfloat = (num: string | number) => {
  return !isint(num);
};

export const isempty = (obj: any) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

const { toString } = Object.prototype;

export function isArrayBuffer(obj: any) {
  return (
    hasArrayBuffer &&
    (obj instanceof ArrayBuffer || toString.call(obj) === '[object ArrayBuffer]')
  );
}

export const camel2snake = (str: string) => {
  return (
    str[0].toLowerCase() +
    str.slice(1, str.length).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  );
};

export const pascal2camel = (str: string) => {
  return str[0].toLowerCase() + str.slice(1, str.length);
};

export const snake2camel = (str: string): string =>
  str.toLowerCase().replace(/([-_][a-z])/g, (group) =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
