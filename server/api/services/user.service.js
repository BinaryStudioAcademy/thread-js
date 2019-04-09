import bcrypt from 'bcrypt';
import userRepository from '../../data/repositories/user.repository';

export default {
    getAll: () => userRepository.getAll(),
    getById: uid => userRepository.getById(uid),
    addUser: async ({ password, ...user }) => {
        const hash = await bcrypt.hash(password, 10);
        return userRepository.addUser({ ...user, password: hash });
    }
};
