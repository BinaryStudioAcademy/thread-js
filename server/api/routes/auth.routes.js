import passport from 'passport';
import { Router } from 'express';
import authService from '../services/auth.service';

const router = Router();

router
    .post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
        const token = await authService.login(req.user);
        res.send(token);
    })
    .post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
        const token = await authService.register(req.user);
        res.send(token);
    });

export default router;
