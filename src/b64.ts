global.Buffer = global.Buffer || require('buffer').Buffer;

declare global {
  namespace NodeJS {
    interface Global {
      btoa: any;
      atob: any;
    }
  }
}

export function b64decode(b64Encoded: any) {
  return new Buffer(b64Encoded, 'base64').toString('binary');
}

export function b64encode(str: string) {
  return new Buffer(str, 'binary').toString('base64');
}

if (typeof btoa === 'undefined') {
  global.btoa = b64encode;
}

if (typeof atob === 'undefined') {
  global.atob = b64decode;
}
