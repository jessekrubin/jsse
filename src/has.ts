export const hasArrayBuffer = typeof ArrayBuffer === 'function';

export const haskey = function (obj: any, key: string): boolean {
  const keyParts = key.split('.');

  return !!obj && (
    keyParts.length > 1
      ? haskey(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : Object.hasOwnProperty.call(obj, key)
  );
};
