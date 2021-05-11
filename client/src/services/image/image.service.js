import { HttpMethod } from 'src/common/enums/enums';

class Image {
  constructor({ http }) {
    this._http = http;
  }

  uploadImage(image) {
    const formData = new FormData();

    formData.append('image', image);

    return this._http.load('/api/images', {
      method: HttpMethod.POST,
      payload: formData
    });
  }
}

export { Image };
