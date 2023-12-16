import { type UserAuthResponse } from './user-auth-response.type.js';

type UserLoginResponseDto = {
  user: UserAuthResponse;
  token: string;
};

export { type UserLoginResponseDto };
