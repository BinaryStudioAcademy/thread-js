import { AuthApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';
import { getErrorStatusCode } from '../../helpers/http/get-status-code.helper.js';

const initAuth = (fastify, opts, done) => {
  const { auth: authService, user: userService } = opts.services;

  // user added to the request (req.user) in auth plugin, authorization.plugin.js
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.LOGIN,
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
