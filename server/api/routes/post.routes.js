import { Router } from 'express';
import postService from '../services/post.service';

const router = Router();

router
    .get('/', async (req, res, next) => {
        try {
            const posts = await postService.getPosts();
            res.send(posts);
        } catch (err) {
            next(err);
        }
    });

export default router;
