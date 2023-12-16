import { ApiPath } from '~/libs/enums/enums.js';
import { userRepository, userService } from '~/packages/user/user.js';

import { Auth as AuthController } from './auth.controller.js';
import { Auth as AuthService } from './auth.service.js';

const authService = new AuthService({
  userRepository
});
const authController = new AuthController({
  apiPath: ApiPath.AUTH,
  authService,
  userService
});

export { authController, authService };
export {
  createToken,
  cryptCompare,
  encrypt,
  encryptSync,
  getErrorStatusCode,
  verifyToken
} from './helpers/helpers.js';
export { AuthApiPath } from './libs/enums/enums.js';
export {
  type AuthService,
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from './libs/types/types.js';
