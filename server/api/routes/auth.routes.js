import { Router } from 'express';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';
import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
    .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user) // user added to the request in the login strategy, see passport config
        .then(data => res.send(data))
        .catch(next))
    .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user) // user added to the request in the register strategy, see passport config
        .then(data => res.send(data))
        .catch(next))
    .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id) // user added to the request in the jwt strategy, see passport config
        .then(data => res.send(data))
        .catch(next));

export default router;
