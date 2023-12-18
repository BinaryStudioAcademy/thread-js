import { type PostReactionWithPostRelation } from './post-reaction-with-post-relation.type.js';

type CreatePostReactionResponseDto =
  | Record<string, never>
  | PostReactionWithPostRelation;

export { type CreatePostReactionResponseDto };
