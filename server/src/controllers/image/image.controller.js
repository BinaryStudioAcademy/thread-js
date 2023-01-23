import {
  HttpMethod,
  ImagesApiPath,
  ControllerHook
} from '../../common/enums/enums.js';
import { upload } from '../../middlewares/middlewares.js';
import { Controller } from '../abstract/abstract.controller.js';

class Image extends Controller {
  #imageService;

  constructor({ app, apiPath, imageService }) {
    super({
      app,
      apiPath
    });
    this.#imageService = imageService;
  }

  initRoutes = () => {
    [
      {
        method: HttpMethod.POST,
        url: ImagesApiPath.ROOT,
        [ControllerHook.PRE_HANDLER]: upload.single('image'),
        [ControllerHook.HANDLER]: this.upload
      }
    ].forEach(this.route);
  };

  upload = req => this.#imageService.upload(req.file);
}

export { Image };
