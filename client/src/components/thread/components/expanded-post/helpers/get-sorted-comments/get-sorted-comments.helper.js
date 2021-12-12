import { getDiff } from 'helpers/helpers';

const getSortedComments = comments => comments.slice().sort((a, b) => getDiff(a.createdAt, b.createdAt));

export { getSortedComments };
