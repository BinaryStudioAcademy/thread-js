import { Model } from 'objection';

import BaseModel from '../base/base.model';
import ImageModel from '../image/image.model';
import UserModel from '../user/user.model';

class Post extends BaseModel {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema();

    return {
      type: baseSchema.type,
      required: baseSchema.required.concat(['body', 'imageId', 'userId']),
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
      image: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        join: {
          from: 'posts.image_id',
          filter: query => query.select('id', 'link'),
          to: 'images.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username'),
        join: {
          from: 'posts.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default Post;
