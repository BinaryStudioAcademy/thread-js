import { UserWithImageRelation } from '~/packages/user/user.js';
import { Comment } from './comment.type.js';

type CommentWithUserNestedRelations = Comment &
  Record<'user', UserWithImageRelation>;

export { type CommentWithUserNestedRelations };
