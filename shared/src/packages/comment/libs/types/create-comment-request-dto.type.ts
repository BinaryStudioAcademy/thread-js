import { type Comment } from './comment.type.js';

type CreateCommentRequestDto = Pick<Comment, 'body' | 'postId'>;

export { type CreateCommentRequestDto };
