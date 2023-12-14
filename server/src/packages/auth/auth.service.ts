import { ExceptionMessage } from '~/libs/enums/enums.js';
import { InvalidCredentialsError } from '~/libs/exceptions/exceptions.js';
import {
  createToken,
  cryptCompare,
  encrypt,
  verifyToken
} from '~/packages/auth/helpers/helpers.js';

import { type UserRepository, type UserWithPassword } from '../user/user.js';
import {
  type AuthService,
  type User,
  type UserAuthResponse,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './libs/types/types.js';

type Constructor = {
  userRepository: UserRepository;
};

class Auth implements AuthService {
  #userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public async verifyLoginCredentials({
    email,
    password
  }: UserLoginRequestDto): Promise<User> | never {
    const user = await this.#userRepository.getByEmailWithPassword(email);

    if (user === null) {
      throw new InvalidCredentialsError(ExceptionMessage.INCORRECT_EMAIL);
    }

    const isEqualPassword = await cryptCompare(password, user.password);

    if (!isEqualPassword) {
      throw new InvalidCredentialsError(ExceptionMessage.PASSWORDS_NOT_MATCH);
    }

    return user;
  }

  public async login({ id }: User): Promise<UserLoginResponseDto> {
    return {
      token: createToken({ id }),
      user: (await this.#userRepository.getByIdWithImage(
        id
      )) as UserAuthResponse
    };
  }

  public register = async ({
    password,
    ...userData
  }: UserRegisterRequestDto): Promise<UserRegisterResponseDto> => {
    const { email, username } = userData;

    const userByEmail = await this.#userRepository.getByEmail(email);

    if (userByEmail) {
      throw new InvalidCredentialsError(ExceptionMessage.EMAIL_ALREADY_EXISTS);
    }

    const userByUsername = await this.#userRepository.getByUsername(username);

    if (userByUsername) {
      throw new InvalidCredentialsError(
        ExceptionMessage.USERNAME_ALREADY_EXISTS
      );
    }

    const newUser = await this.#userRepository.create({
      ...userData,
      password: await encrypt(password)
    } as Omit<UserWithPassword, 'id' | 'createdAt' | 'updatedAt'>);

    return await this.login(newUser);
  };

  public verifyToken<T>(token: string): T {
    return verifyToken(token) as T;
  }
}

export { Auth };
