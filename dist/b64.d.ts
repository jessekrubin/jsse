declare global {
    namespace NodeJS {
        interface Global {
            btoa: any;
            atob: any;
        }
    }
}
export declare function b64decode(b64Encoded: any): string;
export declare function b64encode(str: string): string;
