import { User as UserModel } from './user.model.js';
import { User as UserRepository } from './user.repository.js';
import { User as UserService } from './user.service.js';

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
export {
  type User,
  type UserAuthResponse,
  type UserRepository,
  type UserService,
  type UserWithPassword
} from './libs/types/types.js';
export { User as UserModel } from './user.model.js';
