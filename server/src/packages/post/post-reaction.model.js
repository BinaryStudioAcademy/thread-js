import { Model } from 'objection';

import { DbTableName } from '../../libs/enums/enums.js';
import { AbstractModel } from '../../libs/packages/database/database.js';
import { PostModel } from './post.js';
import { UserModel } from '../user/user.js';

class PostReactionModel extends AbstractModel {
  static get tableName() {
    return DbTableName.POST_REACTIONS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['isLike', 'userId', 'postId'],
      properties: {
        ...baseSchema.properties,
        isLike: { type: 'boolean' },
        postId: { type: ['integer', 'null'] },
        userId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: `${DbTableName.POST_REACTIONS}.postId`,
          to: `${DbTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'userId'),
        join: {
          from: `${DbTableName.POST_REACTIONS}.userId`,
          to: `${DbTableName.USERS}.id`
        }
      }
    };
  }
}

export { PostReactionModel };
