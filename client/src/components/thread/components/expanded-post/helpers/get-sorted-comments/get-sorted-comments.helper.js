import { getDiff } from 'src/helpers/helpers';

const getSortedComments = comments => comments.slice().sort((a, b) => getDiff(a.createdAt, b.createdAt));

export { getSortedComments };
