import {
  AbstractModel,
  DbTableName
} from '#libs/packages/database/database.js';

class ImageModel extends AbstractModel {
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

export { ImageModel };
