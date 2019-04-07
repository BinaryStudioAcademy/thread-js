const userRepository = require('../../data/repositories/user.repository');
const BaseService = require('./base.service');

class UserService extends BaseService {
    addUser(user) {
        return this.repository.addUser(user);
    }
}

module.exports = new UserService(userRepository);
