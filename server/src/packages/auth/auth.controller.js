import {
  Controller,
  ControllerHook
} from '#libs/packages/controller/controller.js';
import { HttpCode, HttpMethod } from '#libs/packages/http/http.js';

import { getErrorStatusCode } from './helpers/helpers.js';
import { AuthApiPath } from './libs/enums/enums.js';
import {
  loginValidationSchema,
  registrationValidationSchema
} from './libs/validation-schemas/validation-schemas.js';

class AuthController extends Controller {
  #authService;

  #userService;

  constructor({ apiPath, authService, userService }) {
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

  login = async (request, reply) => {
    try {
      const user = await this.#authService.verifyLoginCredentials(request.body);
      return await this.#authService.login(user);
    } catch (error) {
      return reply.status(getErrorStatusCode(error)).send(error);
    }
  };

  register = async (request, reply) => {
    try {
      const createdUser = await this.#authService.register(request.body);

      return reply.status(HttpCode.CREATED).send(createdUser);
    } catch (error) {
      return reply.status(getErrorStatusCode(error)).send(error);
    }
  };

  getUser = async request => this.#userService.getUserById(request.user.id);
}

export { AuthController };
