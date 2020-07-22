import { promises as fsp } from 'fs';
import path from 'path';
import { filter_async } from './utils';

export enum FdType {
  File = 'f',
  Dir = 'd',
  Link = 'l',
  Unknown = 'u',
}

export const lstring = async (
  filepath: string,
  encoding = 'utf8'
): Promise<string> => {
  // @ts-ignore
  return String(await fsp.readFile(filepath, encoding));
};

export const sstring = async (filepath: string, str: string) => {
  await fsp.writeFile(filepath, str);
};

export const lstr = lstring;
export const sstr = sstring;

export const ljson = async (filepath: string): Promise<JSON> => {
  return JSON.parse(await lstring(filepath));
};

export const sort_keys_replacer = (
  _key: any,
  value: { [x: string]: any } | any[] | any
) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce((sorted, key: string) => {
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
  const replacer =
    sort_keys && typeof data === 'object' ? sort_keys_replacer : null;
  return JSON.stringify(
    data,
    // @ts-ignore
    replacer,
    indent
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sjson = async (
  filepath: string,
  data: any,
  opts: {
    sort_keys?: boolean;
    indent?: number | undefined;
  } = {}
) => {
  const { sort_keys = false, indent = undefined } = opts;
  const replacer =
    sort_keys && typeof data === 'object' ? sort_keys_replacer : null;
  await sstring(
    filepath,
    JSON.stringify(
      data,
      // @ts-ignore
      replacer,
      indent
    )
  );
};

export const mkdir = async (dirpath: string, exist_ok = false) => {
  try {
    await fsp.mkdir(dirpath, { recursive: true });
  } catch (err) {
    if (err.code === 'EEXIST') {
      if (!exist_ok) {
        throw new Error(
          `!!!mkdir error: ${dirpath} exists--add 'exist_ok'=true`
        );
      }
    } else {
      throw err;
    }
  }
};

export const cpfile = async (src: string, dest: string) => {
  try {
    await fsp.copyFile(src, dest);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const exists = async (pathstr: string) => {
  try {
    await fsp.access(pathstr);
    return true;
  } catch (error) {
    return false;
  }
};

export const isdir = async (source: string) => {
  try {
    const stats = await fsp.lstat(source);
    return stats.isDirectory();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const isfile = async (source: string) => {
  try {
    const stats = await fsp.lstat(source);
    return stats.isFile();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const islink = async (source: string): Promise<boolean> => {
  try {
    const stats = await fsp.lstat(source);
    return stats.isSymbolicLink();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fdtype = async (source: string): Promise<FdType> => {
  try {
    const stats = await fsp.lstat(source);
    if (stats.isFile()) {
      return FdType.File;
    }
    if (stats.isDirectory()) {
      return FdType.Dir;
    }
    if (stats.isSymbolicLink()) {
      return FdType.Link;
    }
    return FdType.Unknown;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const mv = async (src: string, dest: string) => {
  const srcExists = await exists(src);
  if (!srcExists) {
    throw Error(`!!!mv error: src (${src}) DOES NOT exist`);
  }
  const dest_exists = await exists(dest);
  if (dest_exists) {
    throw Error(`!!!mv error: dest (${dest}) DOES exist`);
  }
  await fsp.rename(src, dest);
};

export const ls = async (dirpath: string, abs = true): Promise<string[]> => {
  try {
    const diritems = await fsp.readdir(dirpath);
    return abs ? diritems.map((el) => path.join(dirpath, el)) : diritems;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const lsdirs = async (dirpath: string, abs: boolean = true) => {
  const items = await ls(dirpath, abs);
  return await filter_async(items, isdir);
};

export const lsfiles = async (dirpath: string, abs: boolean = true) => {
  const items = await ls(dirpath, abs);
  return await filter_async(items, isfile);
};

// export async function list_async_gen<T>(ag: AsyncIterableIterator<T>): Promise<T[]> {
//   const items = [];
//   for await (const el of await ag) {
//     items.push(el);
//   }
//   return items;
// }

export async function* walk_gen(
  dirpath: string
): AsyncIterableIterator<string> {
  const items = await ls(dirpath);
  for await (const el of items) {
    const isd = await isdir(el);
    yield el;
    if (isd) {
      for await (const p of walk_gen(el)) {
        yield p;
      }
    }
  }
}

export const walk_list = async (dirpath: string) => {
  const arr: string[] = [];
  for await (const el of await walk_gen(dirpath)) {
    arr.push(el);
  }
  return arr;
};

export const pwd = () => {
  return process.cwd();
};
