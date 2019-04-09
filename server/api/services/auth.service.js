import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../../config/jwt.config';
import userRepository from '../../data/repositories/user.repository';

export default {
    login: ({ id }) => jwt.sign({ id }, secret, { expiresIn }),
    register: async (user) => {
        const { id } = await userRepository.addUser(user);
        return jwt.sign({ id }, secret, { expiresIn });
    }
};
