import { ENV } from 'libs/enums/enums';
import { http } from 'packages/http/http';
import { Image } from './image-api.js';

const image = new Image({
  apiPath: ENV.API_PATH,
  http
});

export { image };
