import { Router } from 'express';
import { getPosts, getPostById, create, setReaction } from '../services/post.service';

const router = Router();

router
    .get('/', (req, res, next) => getPosts(req.query.from, req.query.count)
        .then(posts => res.send(posts))
        .catch(next))
    .get('/:id', (req, res, next) => getPostById(req.params.id)
        .then(post => res.send(post))
        .catch(next))
    .post('/', (req, res, next) => create(req.user.id, req.body)
        .then(post => res.send(post))
        .catch(next))
    .put('/react', (req, res, next) => setReaction(req.user.id, req.body)
        .then(reaction => res.send(reaction))
        .catch(next));

export default router;
