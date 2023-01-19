const normalizeTrailingSlash = url => (url.slice(-1) === '/' ? url.slice(0, -1) : url);

export { normalizeTrailingSlash };
