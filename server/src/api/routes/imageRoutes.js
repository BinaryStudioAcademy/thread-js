import { Router } from 'express';
import * as imageService from '../services/imageService';
import imageMiddleware from '../middlewares/imageMiddleware';

const router = Router();

router
  .post('/', imageMiddleware, (req, res, next) => imageService.upload(req.file)
    .then(image => res.send(image))
    .catch(next));

export default router;
