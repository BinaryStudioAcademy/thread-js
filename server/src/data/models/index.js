import { sequelize as orm } from '../db/connection';
import associate from '../db/associations';
import { init as initUserModel } from './user/user.model';
import { init as initPostModel } from './post/post.model';
import { init as initPostReactionModel } from './post-reaction/post-reaction.model';
import { init as initCommentModel } from './comment/comment.model';
import { init as initImageModel } from './image/image.model';

const User = initUserModel(orm);
const Post = initPostModel(orm);
const PostReaction = initPostReactionModel(orm);
const Comment = initCommentModel(orm);
const Image = initImageModel(orm);

associate({
  User,
  Post,
  PostReaction,
  Comment,
  Image
});

export {
  User as UserModel,
  Post as PostModel,
  PostReaction as PostReactionModel,
  Comment as CommentModel,
  Image as ImageModel
};
