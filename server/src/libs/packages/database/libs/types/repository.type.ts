type Repository<T> = {
  getById(_id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(_payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  updateById(_id: number, _payload: Partial<T>): Promise<T>;
  deleteById(_id: number): Promise<number>;
};

export { type Repository };
