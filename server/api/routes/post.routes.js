import { Router } from 'express';
import postService from '../services/post.service';

const router = Router();

router
    .get('/', (req, res, next) => postService.getPosts(req.query.from, req.query.count)
        .then(posts => res.send(posts))
        .catch(next))
    .get('/:id', (req, res, next) => postService.getPostById(req.params.id)
        .then(post => res.send(post))
        .catch(next))
    .post('/', (req, res, next) => postService.create(req.user.id, req.body)
        .then(post => res.send(post))
        .catch(next))
    .put('/react', (req, res, next) => postService.setReaction(req.user.id, req.body)
        .then(reaction => res.send(reaction))
        .catch(next));

export default router;
