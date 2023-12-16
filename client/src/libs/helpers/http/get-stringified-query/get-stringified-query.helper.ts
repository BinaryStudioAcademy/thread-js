import queryString from 'query-string';

const getStringifiedQuery = <T extends Record<string, unknown>>(
  query: T
): string => {
  return queryString.stringify(query);
};

export { getStringifiedQuery };
