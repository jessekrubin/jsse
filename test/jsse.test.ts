import {
  arange,
  arrmax,
  arrmin,
  chunk,
  // dirs_gen,
  // dirs_list,
  // files_gen,
  // files_list,
  ljson,
  lstring,
  pwd,
  sjson,
  sort_keys_replacer,
  nbytes,
  sstring,
  sum,
  walk_gen,
  walk_list,
  objinfo,
} from '../src';

describe('sum', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
describe('arange', () => {
  it('one arg', () => {
    expect(arange(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it('2 args (start stop)', () => {
    expect(arange(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
describe('arrmax arrmin', () => {
  it('arrmax numbers', async () => {
    return expect(arrmax([1, 3, 45, 56])).toEqual(56);
  });
  it('arrmax strings', async () => {
    return expect(arrmax(['a', 'b', 'zebra'])).toEqual('zebra');
  });

  it('arrmin numbers', async () => {
    return expect(arrmin([1, 3, 45, 56])).toEqual(1);
  });

  it('arrmin strings', async () => {
    return expect(arrmin(['a', 'b', 'zebra'])).toEqual('a');
  });
});

describe('object info ArrayBuffer', () => {
  const buffer = new ArrayBuffer(8);
  const { size, size_str, obj_type } = objinfo(buffer);

  it('objtype', async () => {
    return expect(obj_type).toEqual('ArrayBuffer');
  });
  it('size', async () => {
    return expect(size).toEqual(8);
  });
  it('sizestr', async () => {
    // return expect(obj_type).toEqual('Array');
    return expect(size_str).toEqual('8 bytes');
  });
});
describe('object info', () => {
  const { size, size_str, obj_type } = objinfo(['a', 'b', 'zebra']);
  it('objtype', async () => {
    return expect(obj_type).toEqual('Array');
  });
  it('size', async () => {
    return expect(size).toEqual(14);
  });
  it('sizestr', async () => {
    // return expect(obj_type).toEqual('Array');
    return expect(size_str).toEqual('14 bytes');
  });
});
describe('size of object', () => {
  it('uno', async () => {
    return expect(nbytes(['a', 'b', 'zebra'])).toEqual(14);
  });
});

describe('fs-utils', () => {
  it('STRING-IO TEST: sstring and lstring', async () => {
    const stringy = 'this is a string\nand it has two lines';
    const filepath = 'somefile.txt';
    await sstring(filepath, stringy);
    const loaded_stringy = await lstring(filepath);
    return expect(loaded_stringy).toEqual(stringy);
  });

  it('JSON-IO TEST DICT: sjson and ljson', async () => {
    const anobject = { one: 1, two: 2, three: 3 };
    const filepath = 'somefile.json';
    await sjson(filepath, anobject);
    const loaded_stringy = await ljson(filepath);
    return expect(loaded_stringy).toEqual(anobject);
  });
});

describe('chunks', () => {
  it('chunk', () => {
    return expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
describe('stringify', () => {
  it('sorted', () => {
    const input_obj = {
      c: 1,
      a: { d: 0, c: 1, e: { a: 0, 1: 4 } },
    };
    const exp = '{"a":{"c":1,"d":0,"e":{"1":4,"a":0}},"c":1}';
    const sorted_str = JSON.stringify(input_obj, sort_keys_replacer);
    // console.log(
    //   input_obj,
    //   sorted_str,
    //   exp,
    // );
    return expect(sorted_str).toEqual(exp);
  });
});

// console.log(JSON.stringify({
//   c: 1,
//   a: {d: 0, c: 1, e: {a: 0, 1: 4}},
// }, sort_keys_replacer));

describe('fs_gens', () => {
  const tdirpath = pwd() + '/docs';

  it('walk_gen and walk_list', async () => {
    // let h = 0
    let l = [];
    for await (let el of await walk_gen(tdirpath)) {
      // console.log(el);
      l.push(el);
      // h += 1
    }
    const wlist = await walk_list(tdirpath);
    return expect(l.sort()).toEqual(wlist.sort());
  });

  // it('files_gen and files_list', async () => {
  //   const l = [];
  //   for await (let el of await files_gen(tdirpath)) {
  //     l.push(el);
  //   }
  //   const flist = await files_list(tdirpath);
  //   return expect(l.sort()).toEqual(flist.sort());
  // });
  //
  // it('dirs_gen and dirs_list', async () => {
  //   const l = [];
  //   for await (let el of await dirs_gen(tdirpath)) {
  //     l.push(el);
  //   }
  //   const dlist = await dirs_list(tdirpath);
  //   return expect(l.sort()).toEqual(dlist.sort());
  // });
});
