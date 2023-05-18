import { ENV } from 'libs/enums/enums';
import { http } from 'packages/http/http';
import { Comment } from './comment-api';

const comment = new Comment({
  apiPath: ENV.API_PATH,
  http
});

export { comment };
