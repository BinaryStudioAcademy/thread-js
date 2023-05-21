import queryString from 'query-string';

const getStringifiedQuery = query => queryString.stringify(query);

export { getStringifiedQuery };
