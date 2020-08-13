import { hasArrayBuffer } from './has';

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
    [ Object, Array ].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

const { toString } = Object.prototype;
export default function isArrayBuffer(obj: any) {
  return hasArrayBuffer && (obj instanceof ArrayBuffer || toString.call(obj) === '[object ArrayBuffer]');
}
