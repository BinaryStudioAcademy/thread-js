import { Model } from 'objection';

import { DbTableName as DatabaseTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Post as PostModel } from '../post/post.model.js';
import { User as UserModel } from '../user/user.model.js';

class Comment extends AbstractModel {
  static get tableName() {
    return DatabaseTableName.COMMENTS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['body', 'userId', 'postId'],
      properties: {
        ...baseSchema.properties,
        body: { type: 'string' },
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
          from: `${DatabaseTableName.COMMENTS}.postId`,
          to: `${DatabaseTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username', 'imageId'),
        join: {
          from: `${DatabaseTableName.COMMENTS}.userId`,
          to: `${DatabaseTableName.USERS}.id`
        }
      }
    };
  }
}

export { Comment };
