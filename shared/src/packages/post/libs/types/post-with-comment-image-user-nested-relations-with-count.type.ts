import { CommentWithUserNestedRelations } from '~/packages/comment/comment.js';
import { PostWithImageUserNestedRelationsWithCount } from './post-with-image-user-nested-relations-with-count.type.js';

type PostWithCommentImageUserNestedRelationsWithCount =
  PostWithImageUserNestedRelationsWithCount &
    Record<'comments', CommentWithUserNestedRelations[]>;

export { type PostWithCommentImageUserNestedRelationsWithCount };
