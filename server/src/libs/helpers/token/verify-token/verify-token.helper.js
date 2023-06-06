import jwt from 'jsonwebtoken';
import { config } from '../../../packages/config/config.js';

const verifyToken = token => jwt.verify(token, config.ENV.JWT.SECRET);

export { verifyToken };
