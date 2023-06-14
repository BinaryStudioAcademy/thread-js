import FormData from 'form-data';
import { HttpMethod } from '#libs/enums/enums.js';

class ImageService {
  constructor({ config, httpService, imageRepository }) {
    this._config = config;
    this._imageRepository = imageRepository;
    this._httpService = httpService;
  }

  async upload(file) {
    const formData = new FormData();

    formData.append('imagedata', file.buffer, {
      filename: file.originalname,
      knownLength: file.size
    });
    formData.append('access_token', this._config.ENV.GYAZO.ACCESS_KEY);

    const res = await this._httpService.load(
      this._config.ENV.GYAZO.UPLOAD_API_URL,
      {
        method: HttpMethod.POST,
        data: formData,
        headers: formData.getHeaders()
      }
    );

    return this._imageRepository.create({ link: res.url });
  }
}

export { ImageService };
