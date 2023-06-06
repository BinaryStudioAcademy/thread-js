import { ImageModel } from './image.model.js';
import { ImageRepository } from './image.repository.js';
import { ImageService } from './image.service.js';
import { config } from '../../libs/packages/config/config.js';
import { httpService } from '../../libs/packages/http/http.js';

const imageRepository = new ImageRepository({
  imageModel: ImageModel
});
const imageService = new ImageService({
  config,
  httpService,
  imageRepository
});

export { ImageModel, imageRepository, imageService };
export { initImageApi } from './image.api.js';
