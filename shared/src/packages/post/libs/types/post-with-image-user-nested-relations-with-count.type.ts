import { UserWithImageRelation } from '~/packages/user/user.js';
import { Post } from './post.type.js';
import { Image } from '~/packages/image/image.js';

type PostWithImageUserNestedRelationsWithCount = Post &
  Record<'image', Image> &
  Record<'user', UserWithImageRelation> & {
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
  };

export { type PostWithImageUserNestedRelationsWithCount };
