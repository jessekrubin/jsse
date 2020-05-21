export declare const sum: (a: number, b: number) => number;
export declare const keep_keys: (obj: any, keys: string[]) => Record<any, any>;
export declare const keep_vals: (obj: any, vals: any[]) => Record<string, any>;
export declare const filter_keys: (obj: any, keys: string[]) => Record<string, any>;
export declare const filter_vals: (obj: any, vals: any[]) => Record<string, any>;
export declare const zip: (arr: any[], ...arrs: any[]) => any[];
export declare const objectify: (arr: any[], key: string | number) => any;
