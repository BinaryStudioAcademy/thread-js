import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { httpService } from '~/libs/packages/http/http.js';

import { Image as ImageController } from './image.controller.js';
import { ImageModel } from './image.model.js';
import { Image as ImageRepository } from './image.repository.js';
import { Image as ImageService } from './image.service.js';

const imageRepository = new ImageRepository({
  imageModel: ImageModel
});
const imageService = new ImageService({
  config,
  httpService,
  imageRepository
});
const imageController = new ImageController({
  apiPath: ApiPath.IMAGES,
  imageService
});

export { imageController, imageRepository, imageService };
export { ImageModel } from './image.model.js';
export { ImagePayloadKey, ImagesApiPath } from './libs/enums/enums.js';
export {
  type Image,
  type ImageController,
  type ImageRepository,
  type ImageService
} from './libs/types/types.js';
