import { Post } from './post.type.js';

type CreatePostRequestDto = Pick<Post, 'body' | 'imageId'>;

export { type CreatePostRequestDto };
