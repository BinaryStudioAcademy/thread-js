import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwtConfig';

export default {
  createToken: data => jwt.sign(data, secret, { expiresIn })
};
