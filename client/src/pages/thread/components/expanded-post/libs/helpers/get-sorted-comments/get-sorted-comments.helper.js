import { getDiff } from '~/libs/helpers/helpers.js';

const getSortedComments = comments => comments.slice().sort((a, b) => getDiff(a.createdAt, b.createdAt));

export { getSortedComments };
