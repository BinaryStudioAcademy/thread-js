import { DbTableName } from '../../../common/enums/enums';
import AbstractModel from '../abstract/abstract.model';

class Image extends AbstractModel {
  static get tableName() {
    return DbTableName.IMAGES;
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

export default Image;
