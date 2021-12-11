import { Model, snakeCaseMappers } from 'objection';

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBetweenUppercaseLetters: true });
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'createdAt', 'updatedAt'],
      properties: {
        id: { type: 'integer' },
        createdAt: { type: 'date' },
        updatedAt: { type: 'date' }
      }
    };
  }

  $beforeInsert() {
    const date = new Date().toISOString();
    this.createdAt = date;
    this.updatedAt = date;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default BaseModel;
