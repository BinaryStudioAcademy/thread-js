import { Router } from 'express';
import authService from '../services/auth.service';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';

const router = Router();

router
    .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user)
        .then(token => res.send(token))
        .catch(next))
    .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user)
        .then(token => res.send(token))
        .catch(next));

export default router;
