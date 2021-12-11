import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums';
import BaseModel from '../base/base.model';
import PostModel from '../post/post.model';
import UserModel from '../user/user.model';

class Comment extends BaseModel {
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
          from: `${DbTableName.COMMENTS}.post_id`,
          to: `${DbTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username', 'image_id'),
        join: {
          from: `${DbTableName.COMMENTS}.user_id`,
          to: `${DbTableName.USERS}.id`
        }
      }
    };
  }
}

export default Comment;
