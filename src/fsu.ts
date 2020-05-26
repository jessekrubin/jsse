// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import {promises as fs} from 'fs';

import path from 'path';
// This must run inside a function marked `async`:

export const lstring = async (filepath: string, encoding = 'utf8'): Promise<string> => {
  // @ts-ignore
  return String(await fs.readFile(filepath, encoding));
};

export const sstring = async (filepath: string, str: string) => {
  await fs.writeFile(filepath, str);
};

export const ljson = async (filepath: string): Promise<JSON> => {
  return JSON.parse(await lstring(filepath));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sjson = async (filepath: string, data: any, sort_keys: boolean = false, indent: number | undefined = undefined) => {
  const replacer = (sort_keys && typeof data === 'object') ? Object.keys(data)
    .sort() : null;
  await sstring(filepath, JSON.stringify(data, replacer, indent));
};

export const mkdir = async (dirpath: string, exist_ok = false) => {
  try {
    await fs.mkdir(dirpath, {recursive: true});
  } catch (err) {
    if (err.code === 'EEXIST') {
      if (!exist_ok) {
        throw new Error(`!!!mkdir error: ${dirpath} exists--add 'exist_ok'=true`);
      }
    } else {
      throw err;
    }
  }
};

export const cpfile = async (src: string, dest: string) => {
  try {
    await fs.copyFile(src, dest);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const exists = async (pathstr: string) => {
  try {
    await fs.access(pathstr);
    return true;
  } catch (error) {
    return false;
  }
};

const isdir = async (source: string) => {
  try {
    const stats = await fs.lstat(source);
    return stats.isDirectory();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const isfile = async (source: string) => {
  try {
    const stats = await fs.lstat(source);
    return stats.isFile();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const islink = async (source: string): Promise<boolean> => {
  try {
    const stats = await fs.lstat(source);
    return stats.isSymbolicLink();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fdtype = async (source: string) => {
  try {
    const stats = await fs.lstat(source);
    if (stats.isFile()) {
      return 'f';
    }
    if (stats.isDirectory()) {
      return 'd';
    }
    if (stats.isSymbolicLink()) {
      return 'l';
    }
    return '?';
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
  const destExists = await exists(dest);
  if (destExists) {
    throw Error(`!!!mv error: dest (${dest}) DOES exist`);
  }
  await fs.rename(src, dest);
};

export const ls = async (dirpath: string, abs = true): Promise<string[]> => {
  try {
    const diritems = await fs.readdir(dirpath);
    if (abs) {
      return diritems.map(el => path.join(dirpath, el));
    }
    return diritems;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function* walk_gen(dirpath: string): AsyncIterableIterator<string> {
  const thingy = await ls(dirpath);
  for await (const el of thingy) {
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

export const range = (end: number, start = 0): number[] => {
  return new Array(end - start).fill(undefined).map((_, i) => i + start);
};
