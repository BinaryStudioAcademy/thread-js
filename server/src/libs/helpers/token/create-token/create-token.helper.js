import jwt from 'jsonwebtoken';
import { config } from '../../../packages/config/config.js';

const createToken = data => {
  return jwt.sign(data, config.ENV.JWT.SECRET, {
    expiresIn: config.ENV.JWT.EXPIRES_IN
  });
};

export { createToken };
