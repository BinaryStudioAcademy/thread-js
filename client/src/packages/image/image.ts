import { ENV } from '~/libs/enums/enums.js';
import { httpApi } from '~/packages/http/http.js';

import { Image as ImageApi } from './image-api.js';

const imageApi = new ImageApi({
  apiPath: ENV.API_PATH,
  httpApi
});

export { imageApi };
export { type Image, type ImageApi } from './libs/types/types.js';
