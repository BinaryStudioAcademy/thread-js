import jwt from 'jsonwebtoken';
import { ENV } from '../../../common/enums/enums.js';

const createToken = data => jwt.sign(data, ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRES_IN });

export { createToken };
