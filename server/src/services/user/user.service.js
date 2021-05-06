class User {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(userId) {
    const {
      id,
      username,
      email,
      imageId,
      image
    } = await this._userRepository.getUserById(userId);

    return { id, username, email, imageId, image };
  }
}

export { User };
