class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    return await this._userRepository.getUserById(id);
  }
}

export { UserService };
