import { Router } from 'express';
import { upload } from '../services/image.service';
import imageMiddleware from '../middlewares/image.middleware';

const router = Router();

router
    .post('/', imageMiddleware, (req, res, next) => upload(req.file)
        .then(image => res.send(image))
        .catch(next));

export default router;
