import { AuthApiPath } from '../../common/enums/enums';
import { getErrorStatusCode } from '../../helpers/http/get-status-code.helper';

const initAuth = (router, opts, done) => {
  const { auth: authService, user: userService } = opts.services;

  // user added to the request (req.user) in auth plugin, authorization.plugin.js
  router
    .post(AuthApiPath.LOGIN, async (req, res) => {
      try {
        const user = await authService.verifyLoginCredentials(req.body);
        return await authService.login(user);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    })
    .post(AuthApiPath.REGISTER, async (req, res) => {
      try {
        return await authService.register(req.body);
      } catch (err) {
        return res.status(getErrorStatusCode(err)).send(err);
      }
    })
    .get(AuthApiPath.USER, req => userService.getUserById(req.user.id));

  done();
};

export { initAuth };
