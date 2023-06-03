import { ENV } from '~/libs/enums/enums.js';
import { http } from '~/packages/http/http.js';
import { Image } from './image-api.js';

const image = new Image({
  apiPath: ENV.API_PATH,
  http
});

export { image };
