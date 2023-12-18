import { AbstractRepository } from '~/libs/packages/database/database.js';

import {
  type User as TUser,
  type UserRepository,
  type UserWithImageRelation,
  type UserWithPassword
} from './libs/types/types.js';
import { type User as UserModel } from './user.model.js';

type Constructor = Record<'userModel', typeof UserModel>;

class User
  extends AbstractRepository<typeof UserModel, TUser | UserWithPassword>
  implements UserRepository
{
  public constructor({ userModel }: Constructor) {
    super(userModel);
  }

  public async getByEmailWithPassword(
    email: string
  ): Promise<UserWithPassword | null> {
    const user = await this.model
      .query()
      .findOne({ email })
      .castTo<UserWithPassword | undefined>();

    return user ?? null;
  }

  public async getByEmail(email: string): Promise<TUser | null> {
    const user = await this.model
      .query()
      .modify('withoutPassword')
      .findOne({ email });

    return user ?? null;
  }

  public async getByUsername(username: string): Promise<TUser | null> {
    const user = await this.model
      .query()
      .modify('withoutPassword')
      .select()
      .findOne({ username });

    return user ?? null;
  }

  public async getByIdWithImage(
    id: number
  ): Promise<UserWithImageRelation | null> {
    const user = await this.model
      .query()
      .modify('withoutPassword')
      .findById(id)
      .withGraphFetched('[image]')
      .castTo<UserWithImageRelation>();

    return user ?? null;
  }
}

export { User };
