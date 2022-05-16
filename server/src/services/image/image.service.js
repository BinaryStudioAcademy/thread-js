import FormData from 'form-data';
import { ENV, HttpMethod } from '../../common/enums/enums.js';

class Image {
  constructor({ http, imageRepository }) {
    this._imageRepository = imageRepository;
    this._http = http;
  }

  async upload(file) {
    const formData = new FormData();

    formData.append('imagedata', file.buffer, {
      filename: file.originalname,
      knownLength: file.size
    });
    formData.append('access_token', ENV.GYAZO.ACCESS_KEY);

    const res = await this._http.load(ENV.GYAZO.UPLOAD_API_URL, {
      method: HttpMethod.POST,
      data: formData,
      headers: formData.getHeaders()
    });

    return this._imageRepository.create({ link: res.url });
  }
}

export { Image };
