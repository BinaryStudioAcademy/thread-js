import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { AuthApiPath } from '~/packages/auth/auth.js';

const WHITE_ROUTES = [
  `${config.ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
  `${config.ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
];

export { WHITE_ROUTES };
