import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums';
import AbstractModel from '../abstract/abstract.model';
import CommentModel from '../comment/comment.model';
import ImageModel from '../image/image.model';
import PostReactionModel from '../post-reaction/post-reaction.model';
import UserModel from '../user/user.model';

class Post extends AbstractModel {
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

export default Post;
