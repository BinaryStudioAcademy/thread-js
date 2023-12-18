import { Model, type QueryBuilder, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/packages/database/database.js';
import { PostModel } from '~/packages/post/post.js';
import { UserModel } from '~/packages/user/user.js';

class CommentModel extends AbstractModel {
  public body!: string;

  public postId!: number;

  public userId!: number;

  public static get tableName(): typeof DatabaseTableName.COMMENTS {
    return DatabaseTableName.COMMENTS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      post: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: `${DatabaseTableName.COMMENTS}.postId`,
          to: `${DatabaseTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: (query: QueryBuilder<UserModel>): QueryBuilder<UserModel> => {
          return query.select('id', 'username', 'imageId');
        },
        join: {
          from: `${DatabaseTableName.COMMENTS}.userId`,
          to: `${DatabaseTableName.USERS}.id`
        }
      }
    };
  }
}

export { CommentModel };
