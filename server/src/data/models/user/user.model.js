import { Model } from 'objection';

import { DbTableName as DatabaseTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Image as ImageModel } from '../image/image.model.js';

class User extends AbstractModel {
  static get tableName() {
    return DatabaseTableName.USERS;
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
          from: `${DatabaseTableName.USERS}.imageId`,
          to: `${DatabaseTableName.IMAGES}.id`
        }
      }
    };
  }
}

export { User };
