import {
  AuthApiPath,
  ControllerHook,
  HttpMethod
} from '../../common/enums/enums.js';
import { getErrorStatusCode } from '../../helpers/helpers.js';
import {
  login as loginValidationSchema,
  registration as registrationValidationSchema
} from '../../validation-schemas/validation-schemas.js';

const initAuth = (fastify, opts, done) => {
  const { auth: authService, user: userService } = opts.services;

  // user added to the request (req.user) in auth plugin, authorization.plugin.js
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.LOGIN,
    schema: {
      body: loginValidationSchema
    },
    async [ControllerHook.HANDLER](req, res) {
      try {
        const user = await authService.verifyLoginCredentials(req.body);
        return await authService.login(user);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.REGISTER,
    schema: {
      body: registrationValidationSchema
    },
    async [ControllerHook.HANDLER](req, res) {
      try {
        return await authService.register(req.body);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    }
  });
  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.USER,
    [ControllerHook.HANDLER]: async req => userService.getUserById(req.user.id)
  });

  done();
};

export { initAuth };
