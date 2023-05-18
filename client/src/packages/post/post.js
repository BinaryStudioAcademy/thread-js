import { ENV } from 'libs/enums/enums.js';
import { http } from 'packages/http/http';
import { Post } from './post-api.js';

const post = new Post({
  apiPath: ENV.API_PATH,
  http
});

export { post };
