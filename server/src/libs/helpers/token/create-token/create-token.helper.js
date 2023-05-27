import jwt from 'jsonwebtoken';
import { ENV } from '../../../enums/enums.js';

const createToken = data => {
  return jwt.sign(data, ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRES_IN });
};

export { createToken };
