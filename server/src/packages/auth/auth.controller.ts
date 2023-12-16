import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type ApiPath } from '~/libs/enums/enums.js';
import {
  Controller,
  ControllerHook
} from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type UserAuthResponse, type UserService } from '../user/user.js';
import { getErrorStatusCode } from './helpers/helpers.js';
import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthController,
  type AuthService,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserWithImageRelation
} from './libs/types/types.js';
import {
  loginValidationSchema,
  registrationValidationSchema
} from './libs/validation-schemas/validation-schemas.js';

type Constructor = {
  apiPath: ValueOf<typeof ApiPath>;
  authService: AuthService;
  userService: UserService;
};

class Auth extends Controller implements AuthController {
  #authService: AuthService;

  #userService: UserService;

  public constructor({ apiPath, authService, userService }: Constructor) {
    super({ apiPath });
    this.#authService = authService;
    this.#userService = userService;

    this.addRoute({
      method: HttpMethod.POST,
      url: AuthApiPath.LOGIN,
      schema: {
        body: loginValidationSchema
      },
      [ControllerHook.HANDLER]: this.login
    });
    this.addRoute({
      method: HttpMethod.POST,
      url: AuthApiPath.REGISTER,
      schema: {
        body: registrationValidationSchema
      },
      [ControllerHook.HANDLER]: this.register
    });
    this.addRoute({
      method: HttpMethod.GET,
      url: AuthApiPath.USER,
      [ControllerHook.HANDLER]: this.getUser
    });
  }

  public login = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<UserLoginResponseDto> => {
    try {
      const user = await this.#authService.verifyLoginCredentials(
        request.body as UserLoginRequestDto
      );

      return await this.#authService.login(user);
    } catch (error) {
      return await reply.status(getErrorStatusCode(error as Error)).send(error);
    }
  };

  public register = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<UserLoginResponseDto> => {
    try {
      const createdUser = await this.#authService.register(
        request.body as UserRegisterRequestDto
      );

      return await reply.status(HttpCode.CREATED).send(createdUser);
    } catch (error) {
      return await reply.status(getErrorStatusCode(error as Error)).send(error);
    }
  };

  public getUser = (
    request: FastifyRequest
  ): Promise<UserWithImageRelation | null> => {
    return this.#userService.getByIdWithImage(
      (request.user as UserAuthResponse).id
    );
  };
}

export { Auth };
