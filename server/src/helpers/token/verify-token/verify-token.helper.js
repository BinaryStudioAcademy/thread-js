import jwt from 'jsonwebtoken';
import { ENV } from '../../../common/enums/enums.js';

const verifyToken = token => jwt.verify(token, ENV.JWT.SECRET);

export { verifyToken };
