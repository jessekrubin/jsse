export declare enum FdType {
    File = "f",
    Dir = "d",
    Link = "l",
    Unknown = "u"
}
export declare const lstring: (filepath: string, encoding?: string) => Promise<string>;
export declare const sstring: (filepath: string, str: string) => Promise<void>;
export declare const lstr: (filepath: string, encoding?: string) => Promise<string>;
export declare const sstr: (filepath: string, str: string) => Promise<void>;
export declare const ljson: (filepath: string) => Promise<JSON>;
export declare function objkeys<O extends object>(obj: O): Array<keyof O>;
export declare const sort_keys_replacer: (_key: any, value: any) => any;
export declare const sjson: (filepath: string, data: any, sort_keys?: boolean, indent?: number | undefined) => Promise<void>;
export declare const mkdir: (dirpath: string, exist_ok?: boolean) => Promise<void>;
export declare const cpfile: (src: string, dest: string) => Promise<void>;
export declare const exists: (pathstr: string) => Promise<boolean>;
export declare const isfile: (source: string) => Promise<boolean>;
export declare const islink: (source: string) => Promise<boolean>;
export declare const fdtype: (source: string) => Promise<FdType>;
export declare const mv: (src: string, dest: string) => Promise<void>;
export declare const ls: (dirpath: string, abs?: boolean) => Promise<string[]>;
export declare const lsdirs: (dirpath: string, abs?: boolean) => Promise<string[]>;
export declare const lsfiles: (dirpath: string, abs?: boolean) => Promise<string[]>;
export declare function list_async_gen<T>(ag: AsyncIterableIterator<T>): Promise<T[]>;
export declare function walk_gen(dirpath: string): AsyncIterableIterator<string>;
export declare const walk_list: (dirpath: string) => Promise<string[]>;
export declare function files_gen(dirpath: string): AsyncGenerator<string, void, unknown>;
export declare function files_list(dirpath: string): Promise<string[]>;
export declare function dirs_gen(dirpath: string): AsyncGenerator<string, void, unknown>;
export declare function dirs_list(dirpath: string): Promise<string[]>;
export declare const pwd: () => string;
