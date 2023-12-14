import {
  type User as TUser,
  type UserService,
  type UserWithImageRelation
} from './libs/types/types.js';
import { type User as UserRepository } from './user.repository.js';

type Constructor = Record<'userRepository', UserRepository>;

class User implements UserService {
  #userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public getById(id: number): Promise<TUser | null> {
    return this.#userRepository.getById(id);
  }

  public async getByIdWithImage(
    id: number
  ): Promise<UserWithImageRelation | null> {
    return await this.#userRepository.getByIdWithImage(id);
  }
}

export { User };
