import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository({
  userModel: UserModel
});
const userService = new UserService({
  userRepository
});

export { userRepository, userService };
export {
  UserPayloadKey,
  UsersApiPath,
  UserValidationMessage,
  UserValidationRule
} from './libs/enums/enums.js';
export { UserModel } from './user.model.js';
