export const buildUrl = (
  baseUrl: string,
  params: Record<string, string | number>
) => {
  const url = new URL(baseUrl);

  for (let param in params) {
    url.searchParams.set(param, `${params[param]}`);
  }

  return url.href;
};
