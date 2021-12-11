import { ControllerHook, ImagesApiPath } from '../../common/enums/enums';
import { upload } from '../../middlewares/middlewares';

const initImage = (router, opts, done) => {
  const { image: imageService } = opts.services;
  router.register(upload.contentParser);

  router.post(ImagesApiPath.ROOT, { [ControllerHook.PRE_HANDLER]: upload.single('image') }, req => imageService
    .upload(req.file));

  done();
};

export { initImage };
