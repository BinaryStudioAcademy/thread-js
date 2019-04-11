import { Router } from 'express';
import authService from '../services/auth.service';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';

const router = Router();

router
    .post('/login', authenticationMiddleware, async (req, res, next) => {
        try {
            const token = await authService.login(req.user);
            res.send(token);
        } catch (err) {
            next(err);
        }
    })
    .post('/register', registrationMiddleware, async (req, res, next) => {
        try {
            const token = await authService.register(req.user);
            res.send(token);
        } catch (err) {
            next(err);
        }
    });

export default router;
