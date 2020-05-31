interface HttpResponse<T> extends Response {
    bodyJSON?: T;
}
export declare function http<T>(request: RequestInfo): Promise<HttpResponse<T>>;
export declare function get<T>(path: string, args?: RequestInit): Promise<HttpResponse<T>>;
/**
 *
 *
 *
 * __EXAMPLE__
 * const response = await post<{ id: number }>(
 *   "https://something.com/path",
 *   { title: "my post", body: "some content" }
 * );
 *
 * @param path
 * @param body
 * @param args
 */
export declare function post<T>(path: string, body: any, args?: RequestInit): Promise<HttpResponse<T>>;
export declare function put<T>(path: string, body: any, args?: RequestInit): Promise<HttpResponse<T>>;
export {};
