const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBasePath(path: string) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("#")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}` || normalizedPath;
}
