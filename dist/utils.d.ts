export declare function sleep(ms: number): Promise<unknown>;
export declare const sum: (a: number, b: number) => number;
export declare const keep_keys: (obj: Record<any, any>, keys: string[]) => Record<any, any>;
export declare const keep_vals: (obj: Record<any, any>, vals: any[]) => Record<string, any>;
export declare const filter_keys: (obj: Record<any, any>, keys: string[]) => Record<string, any>;
export declare const filter_vals: (obj: Record<any, any>, vals: any[]) => Record<string, any>;
export declare const filter_falsey_vals: (obj: Record<any, any>) => Record<any, any>;
export declare const zip: (arr: any[], ...arrs: any[]) => any[];
export declare const objectify: (arr: any[], key: string | number) => any;
export declare function arange(start: number, end?: number | undefined, step?: number): number[];
export declare const items: (obj: any) => [string, unknown][];
export declare function arrmin<T>(arr: T[]): T;
export declare function arrmax<T>(arr: T[]): T;
export declare const chunk: (array: any[], size: number) => any[];
export declare function map_async<T, U>(array: T[], cb: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
export declare function filter_async<T>(array: T[], cb: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]>;
export declare function objkeys<O extends object>(obj: O): Array<keyof O>;
export declare function jsoncp<T>(data: T): T;
export declare function usort<T>(array: T[]): T[];
