import BaseModel from '../base/base.model';

class Image extends BaseModel {
  static get tableName() {
    return 'images';
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema();

    return {
      type: baseSchema.type,
      required: baseSchema.required.concat(['link']),
      properties: {
        ...baseSchema.properties,
        link: { type: 'string' }
      }
    };
  }
}

export default Image;
