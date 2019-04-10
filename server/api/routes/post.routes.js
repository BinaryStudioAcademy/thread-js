import { Router } from 'express';
import postService from '../services/post.service';

const router = Router();

router
    .get('/', async (req, res) => {
        const token = await postService.getAll();
        res.send(token);
    });

export default router;
