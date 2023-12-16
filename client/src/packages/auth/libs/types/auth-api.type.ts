import {
  type UserAuthResponse,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './types.js';

type AuthApi = {
  login(payload: UserLoginRequestDto): Promise<UserLoginResponseDto>;

  registration(
    payload: UserRegisterRequestDto
  ): Promise<UserRegisterResponseDto>;

  getCurrentUser(): Promise<UserAuthResponse>;
};

export { type AuthApi };
