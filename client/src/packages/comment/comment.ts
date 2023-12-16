import { ENV } from '~/libs/enums/enums.js';
import { httpApi } from '~/packages/http/http.js';

import { Comment as CommentApi } from './comment-api.js';

const commentApi = new CommentApi({
  apiPath: ENV.API_PATH,
  httpApi
});

export { commentApi };
export { CommentPayloadKey } from './libs/enums/enums.js';
export {
  type CommentApi,
  type CommentWithUserNestedRelations,
  type CreateCommentRequestDto
} from './libs/types/types.js';
