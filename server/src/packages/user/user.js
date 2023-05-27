import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository({
  userModel: UserModel
});
const userService = new UserService({
  userRepository
});

export { UserModel, userRepository, userService };
