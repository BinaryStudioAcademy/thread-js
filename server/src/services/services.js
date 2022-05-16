import {
  user as userRepository,
  comment as commentRepository,
  image as imageRepository,
  post as postRepository,
  postReaction as postReactionRepository
} from '../data/repositories/repositories.js';
import { Auth } from './auth/auth.service.js';
import { Comment } from './comment/comment.service.js';
import { Http } from './http/http.service.js';
import { Image } from './image/image.service.js';
import { Post } from './post/post.service.js';
import { User } from './user/user.service.js';

const http = new Http();

const auth = new Auth({
  userRepository
});

const comment = new Comment({
  commentRepository
});

const image = new Image({
  http,
  imageRepository
});

const post = new Post({
  postRepository,
  postReactionRepository
});

const user = new User({
  userRepository
});

export { auth, comment, image, post, user };
