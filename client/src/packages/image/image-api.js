import { ApiPath } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';
import { ImagePayloadKey } from './libs/enums/enums.js';

class Image {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  uploadImage(image) {
    const formData = new FormData();

    formData.append(ImagePayloadKey.IMAGE, image);

    return this._http.load(`${this._apiPath}${ApiPath.IMAGES}`, {
      method: HttpMethod.POST,
      payload: formData
    });
  }
}

export { Image };
