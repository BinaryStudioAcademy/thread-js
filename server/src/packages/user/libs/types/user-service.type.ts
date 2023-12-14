import { type User, type UserWithImageRelation } from './types.js';

type UserService = {
  getById(_id: number): Promise<User | null>;
  getByIdWithImage(_id: number): Promise<UserWithImageRelation | null>;
};

export { type UserService };
