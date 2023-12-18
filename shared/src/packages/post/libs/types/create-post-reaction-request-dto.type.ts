import { type PostReaction } from './post-reaction.type.js';

type CreatePostReactionRequestDto = Pick<PostReaction, 'postId' | 'isLike'>;

export { type CreatePostReactionRequestDto };
