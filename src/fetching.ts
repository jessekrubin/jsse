interface HttpResponse<T> extends Response {
  bodyJSON?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    // may error if there is no body or if it can't be parsed
    response.bodyJSON = await response.json();
  } catch (ex) {}
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  opts: RequestInit = { method: 'get' }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, { method: 'get', ...opts }));
}

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
 * @param opts
 */
export async function post<T>(
  path: string,
  body: any,
  opts: RequestInit = { method: 'post', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(path, {
      method: 'post',
      body: JSON.stringify(body),
      ...opts,
    })
  );
}

export async function put<T>(
  path: string,
  body: any,
  opts: RequestInit = { method: 'put', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(path, {
      method: 'put',
      body: JSON.stringify(body),
      ...opts,
    })
  );
}
