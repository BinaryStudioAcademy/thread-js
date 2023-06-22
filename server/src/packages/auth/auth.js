import { userRepository } from '#packages/user/user.js';

import { AuthService } from './auth.service.js';

const authService = new AuthService({
  userRepository
});

export { authService };
export { initAuthApi } from './auth.api.js';
export {
  createToken,
  cryptCompare,
  encrypt,
  encryptSync,
  getErrorStatusCode,
  verifyToken
} from './helpers/helpers.js';
export { AuthApiPath } from './libs/enums/enums.js';
