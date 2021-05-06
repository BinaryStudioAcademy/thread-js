import { AuthApiPath } from '../../common/enums/enums';
import {
  authentication as authenticationMiddleware,
  registration as registrationMiddleware,
  jwt as jwtMiddleware
} from '../../middlewares/middlewares';

const initAuth = (Router, services) => {
  const { auth: authService, user: userService } = services;
  const router = Router();

  // user added to the request (req.user) in a strategy, see passport config
  router
    .post(AuthApiPath.LOGIN, authenticationMiddleware, (req, res, next) => authService
      .login(req.user)
      .then(data => res.send(data))
      .catch(next))
    .post(AuthApiPath.REGISTER, registrationMiddleware, (req, res, next) => authService
      .register(req.user)
      .then(data => res.send(data))
      .catch(next))
    .get(AuthApiPath.USER, jwtMiddleware, (req, res, next) => userService
      .getUserById(req.user.id)
      .then(data => res.send(data))
      .catch(next));

  return router;
};

export { initAuth };
