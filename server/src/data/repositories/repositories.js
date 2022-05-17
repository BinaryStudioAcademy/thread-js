import {
  Comment as CommentModel,
  User as UserModel,
  Image as ImageModel,
  Post as PostModel,
  PostReaction as PostReactionModel
} from '../models/models.js';
import { Comment } from './comment/comment.repository.js';
import { Image } from './image/image.repository.js';
import { PostReaction } from './post-reaction/post-reaction.repository.js';
import { Post } from './post/post.repository.js';
import { User } from './user/user.repository.js';

const comment = new Comment({
  commentModel: CommentModel
});

const image = new Image({
  imageModel: ImageModel
});

const postReaction = new PostReaction({
  postReactionModel: PostReactionModel
});

const post = new Post({
  postModel: PostModel
});

const user = new User({
  userModel: UserModel
});

export { comment, image, postReaction, post, user };
