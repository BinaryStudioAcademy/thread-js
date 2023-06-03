import { ENV } from '~/libs/enums/enums.js';
import { http } from '~/packages/http/http.js';
import { Comment } from './comment-api.js';

const comment = new Comment({
  apiPath: ENV.API_PATH,
  http
});

export { comment };
