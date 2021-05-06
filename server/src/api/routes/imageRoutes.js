import { Router } from 'express';
import * as imageService from '../services/imageService';
import { image as imageMiddleware } from '../../middlewares/middlewares';

const router = Router();

router
  .post('/', imageMiddleware, (req, res, next) => imageService.upload(req.file)
    .then(image => res.send(image))
    .catch(next));

export default router;
