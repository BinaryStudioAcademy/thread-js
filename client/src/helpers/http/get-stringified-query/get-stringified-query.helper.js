import { stringify } from 'query-string';

const getStringifiedQuery = query => stringify(query);

export { getStringifiedQuery };
