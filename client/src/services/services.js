import { ENV } from 'common/enums/enums.js';
import { Auth } from './auth/auth.service.js';
import { Comment } from './comment/comment.service.js';
import { Http } from './http/http.service.js';
import { Image } from './image/image.service.js';
import { Post } from './post/post.service.js';
import { Storage } from './storage/storage.service.js';

const storage = new Storage({
  storage: localStorage
});

const http = new Http({
  storage
});

const auth = new Auth({
  apiPath: ENV.API_PATH,
  http
});

const comment = new Comment({
  apiPath: ENV.API_PATH,
  http
});

const post = new Post({
  apiPath: ENV.API_PATH,
  http
});

const image = new Image({
  apiPath: ENV.API_PATH,
  http
});

export { http, storage, auth, comment, post, image };
