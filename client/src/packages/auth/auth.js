import { ENV } from 'libs/enums/enums';
import { http } from 'packages/http/http';
import { Auth } from './auth-api';

const auth = new Auth({
  apiPath: ENV.API_PATH,
  http
});

export { auth };
