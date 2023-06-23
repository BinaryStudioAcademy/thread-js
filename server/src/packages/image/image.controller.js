import { upload } from '#libs/middlewares/middlewares.js';
import {
  Controller,
  ControllerHook
} from '#libs/packages/controller/controller.js';
import { HttpMethod } from '#libs/packages/http/http.js';

import { ImagesApiPath } from './libs/enums/enums.js';

class ImageController extends Controller {
  #imageService;

  constructor({ apiPath, imageService }) {
    super({ apiPath });
    this.#imageService = imageService;

    this.addRoute({
      method: HttpMethod.POST,
      url: ImagesApiPath.ROOT,
      [ControllerHook.PRE_HANDLER]: upload.single('image'),
      [ControllerHook.HANDLER]: this.upload
    });
  }

  upload = request => this.#imageService.upload(request.file);
}

export { ImageController };
