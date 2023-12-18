import { type Abstract as AbstractModel } from './abstract.model.js';
import { type Repository } from './libs/types/types.js';

class Abstract<T extends typeof AbstractModel, K> implements Repository<K> {
  #model: T;

  public constructor(model: T) {
    this.#model = model;
  }

  public get model(): T {
    return this.#model;
  }

  public getAll(): Promise<K[]> {
    return this.#model.query().castTo<K[]>().execute();
  }

  public getById(id: number): Promise<K | null> {
    const result = this.#model.query().findById(id).castTo<K>().execute();

    return result ?? null;
  }

  public create(data: Omit<K, 'id' | 'createdAt' | 'updatedAt'>): Promise<K> {
    return this.#model
      .query()
      .insert(data)
      .returning('*')
      .castTo<K>()
      .execute();
  }

  public updateById(id: number, data: Partial<K>): Promise<K> {
    return this.#model
      .query()
      .patchAndFetchById(id, data)
      .castTo<K>()
      .execute();
  }

  public deleteById(id: number): Promise<number> {
    return this.#model.query().deleteById(id).execute();
  }
}

export { Abstract };
