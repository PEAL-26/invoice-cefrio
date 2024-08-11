export function getAllParams<T = unknown>(url: string): T {
  const { searchParams } = new URL(url);

  let params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params as T;
}
