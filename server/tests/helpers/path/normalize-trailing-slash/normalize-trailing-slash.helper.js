const normalizeTrailingSlash = path => {
  return path.slice(-1) === '/' ? path.slice(0, -1) : path;
};

export { normalizeTrailingSlash };
