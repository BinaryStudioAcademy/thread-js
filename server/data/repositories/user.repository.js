const { UserModel } = require('../models/index');
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {}

module.exports = new UserRepository(UserModel);
