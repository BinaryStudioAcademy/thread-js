import { Model, snakeCaseMappers } from 'objection';

class Abstract extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBetweenUppercaseLetters: true });
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
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

export default Abstract;
