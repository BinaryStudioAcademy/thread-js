import { ControllerHook, HttpMethod,ImagesApiPath } from '../../common/enums/enums.js';
import { upload } from '../../middlewares/middlewares.js';

const initImage = (fastify, options, done) => {
  const { image: imageService } = options.services;
  fastify.register(upload.contentParser);

  fastify.route({
    method: HttpMethod.POST,
    url: ImagesApiPath.ROOT,
    [ControllerHook.PRE_HANDLER]: upload.single('image'),
    [ControllerHook.HANDLER]: request => imageService.upload(request.file)
  });

  done();
};

export { initImage };
