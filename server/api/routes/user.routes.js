import { Router } from 'express';
import userService from '../services/user.service';

const router = Router();

router
    .get('/', async (req, res) => {
        const users = await userService.getAll();
        res.send(users);
    })
    .get('/:uid', async (req, res) => {
        const user = await userService.getById(req.params.uid);
        res.send(user);
    })
    .post('/', async (req, res) => {
        const user = userService.addUser(req.body);
        res.send(user);
    });

export default router;
