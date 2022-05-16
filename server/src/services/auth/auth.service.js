import { ExceptionMessage } from '../../common/enums/enums.js';
import { InvalidCredentialsError } from '../../exceptions/exceptions.js';
import {
  createToken,
  cryptCompare,
  encrypt,
  verifyToken
} from '../../helpers/helpers.js';

class Auth {
  constructor({ userRepository }) {
    this._userRepository = userRepository;

    this.register = this.register.bind(this);
  }

  async verifyLoginCredentials({ email, password }) {
    const user = await this._userRepository.getByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError(ExceptionMessage.INCORRECT_EMAIL);
    }

    const isEqualPassword = await cryptCompare(password, user.password);
    if (!isEqualPassword) {
      throw new InvalidCredentialsError(ExceptionMessage.PASSWORDS_NOT_MATCH);
    }

    return user;
  }

  async login({ id }) {
    return {
      token: createToken({ id }),
      user: await this._userRepository.getUserById(id)
    };
  }

  async register({ password, ...userData }) {
    const { email, username } = userData;

    const userByEmail = await this._userRepository.getByEmail(email);
    if (userByEmail) {
      throw new InvalidCredentialsError(ExceptionMessage.EMAIL_ALREADY_EXISTS);
    }

    const userByUsername = await this._userRepository.getByUsername(username);
    if (userByUsername) {
      throw new InvalidCredentialsError(
        ExceptionMessage.USERNAME_ALREADY_EXISTS
      );
    }

    const newUser = await this._userRepository.addUser({
      ...userData,
      password: await encrypt(password)
    });

    return this.login(newUser);
  }

  async verifyToken(token) {
    return verifyToken(token);
  }
}

export { Auth };
