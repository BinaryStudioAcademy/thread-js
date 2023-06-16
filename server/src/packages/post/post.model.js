import { Model } from 'objection';

import {
  AbstractModel,
  DbTableName as DatabaseTableName
} from '#libs/packages/database/database.js';
import { CommentModel } from '#packages/comment/comment.js';
import { ImageModel } from '#packages/image/image.js';
import { UserModel } from '#packages/user/user.js';

import { PostReactionModel } from './post.js';

class PostModel extends AbstractModel {
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

export { PostModel };
