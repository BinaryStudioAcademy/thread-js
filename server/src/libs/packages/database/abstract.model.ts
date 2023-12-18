import { Model } from 'objection';

class Abstract extends Model {
  public id!: number;

  public createdAt!: string;

  public updatedAt!: string;

  public $beforeInsert(): void {
    const date = new Date().toISOString();
    this.createdAt = date;
    this.updatedAt = date;
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export { Abstract };
