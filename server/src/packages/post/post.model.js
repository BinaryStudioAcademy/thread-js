import { Model } from 'objection';

import {
  AbstractModel,
  DbTableName
} from '../../libs/packages/database/database.js';
import { CommentModel } from '../comment/comment.js';
import { ImageModel } from '../image/image.js';
import { PostReactionModel } from './post.js';
import { UserModel } from '../user/user.js';

class PostModel extends AbstractModel {
  static get tableName() {
    return DbTableName.POSTS;
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
          from: `${DbTableName.POSTS}.id`,
          to: `${DbTableName.COMMENTS}.postId`
        }
      },
      image: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DbTableName.POSTS}.imageId`,
          filter: query => query.select('id', 'link'),
          to: `${DbTableName.IMAGES}.id`
        }
      },
      postReactions: {
        relation: Model.HasManyRelation,
        modelClass: PostReactionModel,
        join: {
          from: `${DbTableName.POSTS}.id`,
          to: `${DbTableName.POST_REACTIONS}.postId`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username', 'imageId'),
        join: {
          from: `${DbTableName.POSTS}.userId`,
          to: `${DbTableName.USERS}.id`
        }
      }
    };
  }
}

export { PostModel };
