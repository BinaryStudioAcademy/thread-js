import { encrypt, createToken } from '../../helpers/helpers';

class Auth {
  constructor({ userRepository }) {
    this._userRepository = userRepository;

    this.register = this.register.bind(this);
  }

  async login({ id }) {
    return {
      token: createToken({ id }),
      user: await this._userRepository.getUserById(id)
    };
  }

  async register({ password, ...userData }) {
    const newUser = await this._userRepository.addUser({
      ...userData,
      password: await encrypt(password)
    });

    return this.login(newUser);
  }
}

export { Auth };
