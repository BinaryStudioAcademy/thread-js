import { getDiff } from '~/libs/helpers/helpers.js';
import { type CommentWithUserNestedRelations } from '~/packages/comment/comment.js';

const getSortedComments = (
  comments: CommentWithUserNestedRelations[]
): CommentWithUserNestedRelations[] => {
  return [...comments].sort((a, b) => getDiff(a.createdAt, b.createdAt));
};

export { getSortedComments };
