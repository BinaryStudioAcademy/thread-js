import jwt from 'jsonwebtoken';

import { config } from '~/libs/packages/config/config.js';

const createToken = <T extends object>(data: T): string => {
  return jwt.sign(data, config.ENV.JWT.SECRET, {
    expiresIn: config.ENV.JWT.EXPIRES_IN
  });
};

export { createToken };
