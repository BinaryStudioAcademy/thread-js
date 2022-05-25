import { ApiPath, HttpMethod } from 'common/enums/enums';

class Image {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  uploadImage(image) {
    const formData = new FormData();

    formData.append('image', image);

    return this._http.load(`${this._apiPath}${ApiPath.IMAGES}`, {
      method: HttpMethod.POST,
      payload: formData
    });
  }
}

export { Image };
