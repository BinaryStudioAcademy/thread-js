import { config } from '../../../config/config.js';
import { ApiPath, AuthApiPath } from '../../../../enums/enums.js';

const WHITE_ROUTES = [
  `${config.ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
  `${config.ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
];

export { WHITE_ROUTES };
