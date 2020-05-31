import {
  arange,
  arrmax,
  arrmin,
  chunk,
  ljson,
  lstr,
  sstr,
  lstring,
  sjson,
  snake2camel,
  camel2snake,
  pascal2camel,
  sort_keys_replacer,
  sstring,
  sum,
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

describe('fs-utils', () => {
  it('STRING-IO TEST: sstring and lstring', async () => {
    const stringy = 'this is a string\nand it has two lines';
    const filepath = 'somefile.txt';
    await sstring(filepath, stringy);
    const loaded_stringy = await lstring(filepath);
    return expect(loaded_stringy).toEqual(stringy);
  });
  it('STRING-IO TEST: sstr and lstr', async () => {
    const stringy = 'this is a string\nand it has two lines';
    const filepath = 'somefile.txt';
    await sstr(filepath, stringy);
    const loaded_stringy = await lstr(filepath);
    return expect(loaded_stringy).toEqual(stringy);
  });

  it('JSON-IO TEST DICT: sjson and ljson', async () => {
    const anobject = { one: 1, two: 2, three: 3 };
    const filepath = 'somefile.txt';
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

describe('strutils', () => {
  const snake_str = 'this_is_a_string';
  const camel_str = 'thisIsAString';
  const pascal_str = 'ThisIsAString';
  it('snake2camel', () => {
    return expect(snake2camel(snake_str)).toEqual(camel_str);
  });
  it('camel2snake', () => {
    return expect(camel2snake(camel_str)).toEqual(snake_str);
  });
  it('pascal2camel', () => {
    return expect(pascal2camel(pascal_str)).toEqual(camel_str);
  });
});
// console.log(JSON.stringify({
//   c: 1,
//   a: {d: 0, c: 1, e: {a: 0, 1: 4}},
// }, sort_keys_replacer));
