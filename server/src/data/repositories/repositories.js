import {
  CommentModel,
  UserModel,
  ImageModel,
  PostModel,
  PostReactionModel
} from '../models';
import { Comment } from './comment/comment.repository';
import { Image } from './image/image.repository';
import { PostReaction } from './post-reaction/post-reaction.repository';
import { Post } from './post/post.repository';
import { User } from './user/user.repository';

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
