import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums';
import BaseModel from '../base/base.model';
import PostModel from '../post/post.model';
import UserModel from '../user/user.model';

class PostReaction extends BaseModel {
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
          from: `${DbTableName.POST_REACTIONS}.post_id`,
          to: `${DbTableName.POSTS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'user_id'),
        join: {
          from: `${DbTableName.POST_REACTIONS}.user_id`,
          to: `${DbTableName.USERS}.id`
        }
      }
    };
  }
}

export default PostReaction;
