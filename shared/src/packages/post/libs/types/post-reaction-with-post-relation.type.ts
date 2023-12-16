import { type Post } from '~/packages/post/post.js';

import { type PostReaction } from './post-reaction.type.js';

type PostReactionWithPostRelation = PostReaction & Record<'post', Post>;

export { type PostReactionWithPostRelation };
