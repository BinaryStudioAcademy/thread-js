import { type FastifyRequest } from 'fastify';
import { type File } from 'fastify-multer/lib/interfaces.js';

import { upload } from '~/libs/middlewares/middlewares.js';
import {
  Controller,
  ControllerHook
} from '~/libs/packages/controller/controller.js';
import { HttpMethod } from '~/libs/packages/http/http.js';

import { ImagePayloadKey, ImagesApiPath } from './libs/enums/enums.js';
import {
  type ImageController,
  type ImageService,
  type UploadImageResponseDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  imageService: ImageService;
};

class Image extends Controller implements ImageController {
  #imageService: ImageService;

  public constructor({ apiPath, imageService }: Constructor) {
    super({ apiPath });
    this.#imageService = imageService;

    this.addRoute({
      method: HttpMethod.POST,
      url: ImagesApiPath.ROOT,
      [ControllerHook.PRE_HANDLER]: upload.single(ImagePayloadKey.IMAGE),
      [ControllerHook.HANDLER]: this.upload
    });
  }

  public upload = (
    request: FastifyRequest
  ): Promise<UploadImageResponseDto> => {
    return this.#imageService.upload(request.file as File);
  };
}

export { Image };
