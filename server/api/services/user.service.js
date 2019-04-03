const userRepository = require('../../data/repositories/user.repository');

class UserService {
    getAll() {
        return userRepository.getAll();
    }

    getById(uid) {
        return userRepository.getById(uid);
    }
}

module.exports = new UserService();
