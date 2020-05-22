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
  args: RequestInit = { method: 'get' }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, { method: 'get', ...args }));
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
 * @param args
 */
export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(path, {
      method: 'post',
      body: JSON.stringify(body),
      ...args,
    })
  );
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(path, {
      method: 'put',
      body: JSON.stringify(body),
      ...args,
    })
  );
}
