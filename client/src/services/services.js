import { ENV } from 'common/enums/enums';
import { Auth } from './auth/auth.service';
import { Comment } from './comment/comment.service';
import { Http } from './http/http.service';
import { Image } from './image/image.service';
import { Post } from './post/post.service';
import { Storage } from './storage/storage.service';

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
