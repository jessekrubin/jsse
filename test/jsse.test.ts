import {
  arange,
  arrmax,
  arrmin,
  ljson,
  lstring,
  sjson,
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

  it('JSON-IO TEST DICT: sjson and ljson', async () => {
    const anobject = { one: 1, two: 2, three: 3 };
    const filepath = 'somefile.txt';
    await sjson(filepath, anobject);
    const loaded_stringy = await ljson(filepath);
    return expect(loaded_stringy).toEqual(anobject);
  });
});
