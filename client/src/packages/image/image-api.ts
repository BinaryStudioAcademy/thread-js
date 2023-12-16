import { ApiPath } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { type HttpApi } from '../http/http.js';
import { ImagePayloadKey } from './libs/enums/enums.js';
import {
  type ImageApi,
  type UploadImageResponseDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
};

class Image implements ImageApi {
  #apiPath: string;

  #httpApi: HttpApi;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public uploadImage(image: File): Promise<UploadImageResponseDto> {
    const formData = new FormData();

    formData.append(ImagePayloadKey.IMAGE, image);

    return this.#httpApi.load(`${this.#apiPath}${ApiPath.IMAGES}`, {
      method: HttpMethod.POST,
      payload: formData
    });
  }
}

export { Image };
