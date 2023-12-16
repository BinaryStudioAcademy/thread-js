import { ENV } from '~/libs/enums/enums.js';
import { httpApi } from '~/packages/http/http.js';

import { Post as PostApi } from './post-api.js';

const postApi = new PostApi({
  apiPath: ENV.API_PATH,
  httpApi
});

export { postApi };
export { PostPayloadKey } from './libs/enums/enums.js';
export {
  type CreatePostReactionRequestDto,
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostByIdResponseDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post,
  type PostApi,
  type PostWithCommentImageUserNestedRelationsWithCount,
  type PostWithImageUserNestedRelationsWithCount
} from './libs/types/types.js';
