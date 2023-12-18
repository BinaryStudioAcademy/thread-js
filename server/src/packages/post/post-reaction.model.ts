import { Model, type QueryBuilder, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/packages/database/database.js';
import { UserModel } from '~/packages/user/user.js';

import { PostModel } from './post.js';

class PostReactionModel extends AbstractModel {
  public isLike!: boolean;

  public postId!: number;

  public userId!: number;

  public static get tableName(): typeof DatabaseTableName.POST_REACTIONS {
    return DatabaseTableName.POST_REACTIONS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      post: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: `${DatabaseTableName.POST_REACTIONS}.postId`,
          to: `${DatabaseTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: (query: QueryBuilder<UserModel>): QueryBuilder<UserModel> => {
          return query.select('id', 'username');
        },
        join: {
          from: `${DatabaseTableName.POST_REACTIONS}.userId`,
          to: `${DatabaseTableName.USERS}.id`
        }
      }
    };
  }
}

export { PostReactionModel };
