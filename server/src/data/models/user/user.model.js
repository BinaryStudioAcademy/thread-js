import { Model } from 'objection';

import { DbTableName } from '../../../common/enums/enums';
import BaseModel from '../base/base.model';
import ImageModel from '../image/image.model';

class User extends BaseModel {
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
          from: `${DbTableName.USERS}.image_id`,
          to: `${DbTableName.IMAGES}.id`
        }
      }
    };
  }
}

export default User;
