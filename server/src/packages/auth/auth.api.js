import { AuthApiPath, ControllerHook } from '#libs/enums/enums.js';
import { getErrorStatusCode } from '#libs/helpers/helpers.js';
import { HttpCode, HttpMethod } from '#libs/packages/http/http.js';

import {
  loginValidationSchema,
  registrationValidationSchema
} from './libs/validation-schemas/validation-schemas.js';

const initAuthApi = (fastify, options, done) => {
  const { authService, userService } = options.services;

  // user added to the request (req.user) in auth plugin, authorization.plugin.js
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.LOGIN,
    schema: {
      body: loginValidationSchema
    },
    async [ControllerHook.HANDLER](request, response) {
      try {
        const user = await authService.verifyLoginCredentials(request.body);
        return await authService.login(user);
      } catch (error) {
        return response.status(getErrorStatusCode(error)).send(error);
      }
    }
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.REGISTER,
    schema: {
      body: registrationValidationSchema
    },
    async [ControllerHook.HANDLER](request, response) {
      try {
        const createdUser = await authService.register(request.body);

        return response.status(HttpCode.CREATED).send(createdUser);
      } catch (error) {
        return response.status(getErrorStatusCode(error)).send(error);
      }
    }
  });
  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.USER,
    [ControllerHook.HANDLER]: async request =>
      userService.getUserById(request.user.id)
  });

  done();
};

export { initAuthApi };
