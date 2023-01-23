import {
  HttpMethod,
  AuthApiPath,
  ControllerHook
} from '../../common/enums/enums.js';
import { getErrorStatusCode } from '../../helpers/helpers.js';
import {
  login as loginValidationSchema,
  registration as registrationValidationSchema
} from '../../validation-schemas/validation-schemas.js';
import { Controller } from '../abstract/abstract.controller.js';

class Auth extends Controller {
  #authService;

  #userService;

  constructor({ app, apiPath, authService, userService }) {
    super({
      app,
      apiPath
    });
    this.#authService = authService;
    this.#userService = userService;
  }

  initRoutes = () => {
    [
      {
        method: HttpMethod.POST,
        url: AuthApiPath.LOGIN,
        schema: {
          body: loginValidationSchema
        },
        [ControllerHook.HANDLER]: this.login
      },
      {
        method: HttpMethod.POST,
        url: AuthApiPath.REGISTER,
        schema: {
          body: registrationValidationSchema
        },
        [ControllerHook.HANDLER]: this.register
      },
      {
        method: HttpMethod.GET,
        url: AuthApiPath.USER,
        [ControllerHook.HANDLER]: this.getUser
      }
    ].forEach(this.route);
  };

  login = async (req, res) => {
    try {
      const user = await this.#authService.verifyLoginCredentials(req.body);
      return await this.#authService.login(user);
    } catch (err) {
      return res.status(getErrorStatusCode(err)).send(err);
    }
  };

  register = async (req, res) => {
    try {
      return await this.#authService.register(req.body);
    } catch (err) {
      return res.status(getErrorStatusCode(err)).send(err);
    }
  };

  getUser = async req => this.#userService.getUserById(req.user.id);
}

export { Auth };
