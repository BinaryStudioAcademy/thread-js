import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums.js';
import AbstractModel from '../abstract/abstract.model.js';
import PostModel from '../post/post.model.js';
import UserModel from '../user/user.model.js';

class Comment extends AbstractModel {
  static get tableName() {
    return DbTableName.COMMENTS;
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
          from: `${DbTableName.COMMENTS}.postId`,
          to: `${DbTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username', 'imageId'),
        join: {
          from: `${DbTableName.COMMENTS}.userId`,
          to: `${DbTableName.USERS}.id`
        }
      }
    };
  }
}

export default Comment;
