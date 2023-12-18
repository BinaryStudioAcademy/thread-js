import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { type HttpApi } from '../http/http.js';
import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthApi,
  type UserAuthResponse,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
};

class Auth implements AuthApi {
  #apiPath: string;

  #httpApi: HttpApi;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public login(payload: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload)
      }
    );
  }

  public registration(
    payload: UserRegisterRequestDto
  ): Promise<UserRegisterResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.REGISTER}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload)
      }
    );
  }

  public getCurrentUser(): Promise<UserAuthResponse> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.USER}`,
      {
        method: HttpMethod.GET
      }
    );
  }
}

export { Auth };
