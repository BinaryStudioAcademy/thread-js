const userRepository = require('../../data/repositories/user.repository');
const BaseService = require('./base.service');

class UserService extends BaseService {}

module.exports = new UserService(userRepository);
