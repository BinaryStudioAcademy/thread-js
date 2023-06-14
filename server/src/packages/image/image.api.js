import {
  ControllerHook,
  ImagesApiPath,
  HttpMethod
} from '#libs/enums/enums.js';
import { upload } from '#libs/middlewares/middlewares.js';

const initImageApi = (fastify, opts, done) => {
  const { imageService } = opts.services;
  fastify.register(upload.contentParser);

  fastify.route({
    method: HttpMethod.POST,
    url: ImagesApiPath.ROOT,
    [ControllerHook.PRE_HANDLER]: upload.single('image'),
    [ControllerHook.HANDLER]: req => imageService.upload(req.file)
  });

  done();
};

export { initImageApi };
