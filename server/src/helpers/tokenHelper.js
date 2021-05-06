import jwt from 'jsonwebtoken';
import { ENV } from '../common/enums/enums';

export const createToken = data => jwt.sign(data, ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRES_IN });
