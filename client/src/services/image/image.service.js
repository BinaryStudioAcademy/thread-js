import { ApiPath, HttpMethod, ImagePayloadKey } from '../../common/enums/enums';

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
