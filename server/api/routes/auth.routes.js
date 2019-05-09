import { Router } from 'express';
import { login, register } from '../services/auth.service';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';

const router = Router();

router
    .post('/login', authenticationMiddleware, (req, res, next) => login(req.user)
        .then(data => res.send(data))
        .catch(next))
    .post('/register', registrationMiddleware, (req, res, next) => register(req.user)
        .then(data => res.send(data))
        .catch(next));

export default router;
