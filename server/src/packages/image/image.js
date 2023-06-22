import { config } from '#libs/packages/config/config.js';
import { httpService } from '#libs/packages/http/http.js';

import { ImageModel } from './image.model.js';
import { ImageRepository } from './image.repository.js';
import { ImageService } from './image.service.js';

const imageRepository = new ImageRepository({
  imageModel: ImageModel
});
const imageService = new ImageService({
  config,
  httpService,
  imageRepository
});

export { imageRepository, imageService };
export { initImageApi } from './image.api.js';
export { ImageModel } from './image.model.js';
export { ImagePayloadKey, ImagesApiPath } from './libs/enums/enums.js';
