import { type Repository } from '~/libs/packages/database/database.js';

import {
  type User,
  type UserWithImageRelation,
  type UserWithPassword
} from './types.js';

type UserRepository = Pick<Repository<User | UserWithPassword>, 'create'> & {
  getByEmail(_email: string): Promise<User | null>;

  getByEmailWithPassword(_email: string): Promise<UserWithPassword | null>;

  getByUsername(_username: string): Promise<User | null>;

  getByIdWithImage(_id: number): Promise<UserWithImageRelation | null>;
};

export { type UserRepository };
