import { Router } from 'express';
import { auth as authService, user as userService } from '../services/services';
import {
  authentication as authenticationMiddleware,
  registration as registrationMiddleware,
  jwt as jwtMiddleware
} from '../middlewares/middlewares';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user)
    .then(data => res.send(data))
    .catch(next))
  .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id)
    .then(data => res.send(data))
    .catch(next));

export default router;
