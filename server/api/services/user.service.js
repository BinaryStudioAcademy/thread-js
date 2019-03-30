const userRepository = require('../../data/repositories/user.repository');

class UserService {
    getAll() {
        return userRepository.getAll();
    }

    getById(id) {
        return userRepository.getById(id);
    }

    addUser(user) {
        return userRepository.addUser(user);
    }
}

module.exports = new UserService();
