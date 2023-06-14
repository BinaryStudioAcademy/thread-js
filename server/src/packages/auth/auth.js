import { AuthService } from './auth.service.js';

import { userRepository } from '#packages/user/user.js';

const authService = new AuthService({
  userRepository
});

export { authService };
export { initAuthApi } from './auth.api.js';
