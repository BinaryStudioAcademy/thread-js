import sequelize from 'sequelize';
import orm from '../db/connection';

import User from './user';
import Post from './post';
import PostReaction from './post-reaction';
import Comment from './comment';
import Image from './image';

export const UserModel = User(orm, sequelize);
export const PostModel = Post(orm, sequelize);
export const PostReactionModel = PostReaction(orm, sequelize);
export const CommentModel = Comment(orm, sequelize);
export const ImageModel = Image(orm, sequelize);
