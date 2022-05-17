import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Post as PostModel } from '../post/post.model.js';
import { User as UserModel } from '../user/user.model.js';

class PostReaction extends AbstractModel {
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

export { PostReaction };
