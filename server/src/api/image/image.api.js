import { image as imageMiddleware } from '../../middlewares/middlewares';

const initImage = (Router, services) => {
  const { image: imageService } = services;
  const router = Router();

  router.post('/', imageMiddleware, (req, res, next) => imageService
    .upload(req.file)
    .then(image => res.send(image))
    .catch(next));

  return router;
};

export { initImage };
