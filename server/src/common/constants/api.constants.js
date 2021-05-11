import { ApiPath, AuthApiPath } from '../enums/enums';

const WHITE_ROUTES = [
  `${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
  `${ApiPath.AUTH}${AuthApiPath.REGISTER}`
];

export { WHITE_ROUTES };
