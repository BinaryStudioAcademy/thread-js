const normalizeTrailingSlash = path => (path.slice(-1) === '/' ? path.slice(0, -1) : path);

export { normalizeTrailingSlash };
