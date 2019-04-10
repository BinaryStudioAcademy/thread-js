import userRepository from '../../data/repositories/user.repository';

export default {
    getAll: () => userRepository.getAll(),
    getById: uid => userRepository.getById(uid)
};
