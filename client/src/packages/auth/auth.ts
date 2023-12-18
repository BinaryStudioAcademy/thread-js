import { ENV } from '~/libs/enums/enums.js';
import { httpApi } from '~/packages/http/http.js';

import { Auth as AuthApi } from './auth-api.js';

const authApi = new AuthApi({
  apiPath: ENV.API_PATH,
  httpApi
});

export { authApi };
export {
  type AuthApi,
  type UserAuthResponse,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './libs/types/types.js';
