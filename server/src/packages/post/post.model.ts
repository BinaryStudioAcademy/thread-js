import { Model, type QueryBuilder, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/packages/database/database.js';
import { CommentModel } from '~/packages/comment/comment.js';
import { ImageModel } from '~/packages/image/image.js';
import { UserModel } from '~/packages/user/user.js';

import { PostReactionModel } from './post.js';

class PostModel extends AbstractModel {
  public body!: string;

  public imageId!: number | null;

  public userId!: number;

  public static get tableName(): typeof DatabaseTableName.POSTS {
    return DatabaseTableName.POSTS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: `${DatabaseTableName.POSTS}.id`,
          to: `${DatabaseTableName.COMMENTS}.postId`
        }
      },
      image: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        filter: (query: QueryBuilder<ImageModel>): QueryBuilder<ImageModel> => {
          return query.select('id', 'link');
        },
        join: {
          from: `${DatabaseTableName.POSTS}.imageId`,
          to: `${DatabaseTableName.IMAGES}.id`
        }
      },
      postReactions: {
        relation: Model.HasManyRelation,
        modelClass: PostReactionModel,
        join: {
          from: `${DatabaseTableName.POSTS}.id`,
          to: `${DatabaseTableName.POST_REACTIONS}.postId`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: (query: QueryBuilder<UserModel>): QueryBuilder<UserModel> => {
          return query.select('id', 'username', 'imageId');
        },
        join: {
          from: `${DatabaseTableName.POSTS}.userId`,
          to: `${DatabaseTableName.USERS}.id`
        }
      }
    };
  }
}

export { PostModel };
