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
  http
});

const comment = new Comment({
  http
});

const post = new Post({
  http
});

const image = new Image({
  http
});

export { http, storage, auth, comment, post, image };
