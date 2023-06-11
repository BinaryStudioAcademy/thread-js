import { Model } from 'objection';

import { DbTableName as DatabaseTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Comment as CommentModel } from '../comment/comment.model.js';
import { Image as ImageModel } from '../image/image.model.js';
import { PostReaction as PostReactionModel } from '../post-reaction/post-reaction.model.js';
import { User as UserModel } from '../user/user.model.js';

class Post extends AbstractModel {
  static get tableName() {
    return DatabaseTableName.POSTS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['body', 'userId'],
      properties: {
        ...baseSchema.properties,
        body: { type: 'string' },
        imageId: { type: ['integer', 'null'] },
        userId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
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
        join: {
          from: `${DatabaseTableName.POSTS}.imageId`,
          filter: query => query.select('id', 'link'),
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
        filter: query => query.select('id', 'username', 'imageId'),
        join: {
          from: `${DatabaseTableName.POSTS}.userId`,
          to: `${DatabaseTableName.USERS}.id`
        }
      }
    };
  }
}

export { Post };
