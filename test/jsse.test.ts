import {
  __version__,
  arange,
  arrmax,
  arrmin,
  chunk,
  nbytes,
  objinfo,
  sort_keys_replacer,
} from '../src';

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
describe('version', () => {
  it('sorted', async () => {
    const pkg_json = require('../package.json');
    expect(pkg_json.version).toEqual(__version__);
  });
});
