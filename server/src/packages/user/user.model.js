import { Model } from 'objection';

import {
  AbstractModel,
  DbTableName
} from '../../libs/packages/database/database.js';
import { ImageModel } from '../image/image.js';

class UserModel extends AbstractModel {
  static get tableName() {
    return DbTableName.USERS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['email', 'username', 'password'],
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
          from: `${DbTableName.USERS}.imageId`,
          to: `${DbTableName.IMAGES}.id`
        }
      }
    };
  }
}

export { UserModel };
