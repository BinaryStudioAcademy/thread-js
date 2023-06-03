import { ENV } from '~/libs/enums/enums.js';
import { http } from '~/packages/http/http.js';
import { Auth } from './auth-api.js';

const auth = new Auth({
  apiPath: ENV.API_PATH,
  http
});

export { auth };
