import { type File } from 'fastify-multer/lib/interfaces.js';
import FormData from 'form-data';

import { type ConfigPackage } from '~/libs/packages/config/config.js';
import { HttpMethod } from '~/libs/packages/http/http.js';
import { type HttpService } from '~/libs/packages/http/http.js';

import {
  type Image as TImage,
  type ImageRepository,
  type ImageService
} from './libs/types/types.js';

type Constructor = {
  config: ConfigPackage;
  httpService: HttpService;
  imageRepository: ImageRepository;
};

class Image implements ImageService {
  #config: ConfigPackage;

  #httpService: HttpService;

  #imageRepository: ImageRepository;

  public constructor({ config, httpService, imageRepository }: Constructor) {
    this.#config = config;
    this.#imageRepository = imageRepository;
    this.#httpService = httpService;
  }

  public async upload(file: File): Promise<TImage> {
    const formData = new FormData();

    formData.append('imagedata', file.buffer, {
      filename: file.originalname,
      knownLength: file.size as number
    });
    formData.append('access_token', this.#config.ENV.GYAZO.ACCESS_KEY);

    const response = await this.#httpService.load<
      FormData,
      Record<'url', string>
    >(this.#config.ENV.GYAZO.UPLOAD_API_URL, {
      method: HttpMethod.POST,
      data: formData,
      headers: formData.getHeaders()
    });

    return await this.#imageRepository.create({ link: response.url });
  }
}

export { Image };
