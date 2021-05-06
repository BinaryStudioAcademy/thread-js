import {
  user as userRepository,
  comment as commentRepository,
  image as imageRepository,
  post as postRepository,
  postReaction as postReactionRepository
} from '../data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Comment } from './comment/comment.service';
import { Http } from './http/http.service';
import { Image } from './image/image.service';
import { Post } from './post/post.service';
import { User } from './user/user.service';

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
