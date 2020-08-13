export const hasArrayBuffer = typeof ArrayBuffer === 'function';
export const haskey = (obj: any, key: string) => {
  return obj.hasOwnProperty(key);
};
