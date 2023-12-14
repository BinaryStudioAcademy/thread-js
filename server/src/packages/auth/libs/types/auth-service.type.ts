import {
  type User,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './types.js';

type AuthService = {
  verifyLoginCredentials(_user: UserLoginRequestDto): Promise<User>;
  login(_user: User): Promise<UserLoginResponseDto>;
  register(_user: UserRegisterRequestDto): Promise<UserRegisterResponseDto>;
  verifyToken<T>(_token: string): Promise<T>;
};

export { type AuthService };
