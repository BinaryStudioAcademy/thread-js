import { ENV } from 'libs/enums/enums';
import { http } from 'packages/http/http';
import { Post } from './post-api';

const post = new Post({
  apiPath: ENV.API_PATH,
  http
});

export { post };
