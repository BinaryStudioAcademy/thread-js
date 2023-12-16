import { type Image } from '~/packages/image/image.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';

import { type Post } from './post.type.js';

type PostWithImageUserNestedRelationsWithCount = Post &
  Record<'image', Image> &
  Record<'user', UserWithImageRelation> & {
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
  };

export { type PostWithImageUserNestedRelationsWithCount };
