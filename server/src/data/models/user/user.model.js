import { Model } from 'objection';

import BaseModel from '../base/base.model';
import ImageModel from '../image/image.model';

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema();

    return {
      type: baseSchema.type,
      required: baseSchema.required.concat(['email', 'username', 'password', 'imageId']),
      properties: {
        ...baseSchema.properties,
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        imageId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        filter: query => query.select('id', 'link'),
        join: {
          from: 'users.image_id',
          to: 'images.id'
        }
      }
    };
  }
}

export default User;
