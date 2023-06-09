import { DbTableName as DatabaseTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';

class Image extends AbstractModel {
  static get tableName() {
    return DatabaseTableName.IMAGES;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['link'],
      properties: {
        ...baseSchema.properties,
        link: { type: 'string' }
      }
    };
  }
}

export { Image };
