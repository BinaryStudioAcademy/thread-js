import { type JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { config } from '~/libs/packages/config/config.js';

const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, config.ENV.JWT.SECRET);
};

export { verifyToken };
