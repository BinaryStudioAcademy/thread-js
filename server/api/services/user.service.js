import userRepository from '../../data/repositories/user.repository';
import BaseService from './base.service';

class UserService extends BaseService {
    addUser(user) {
        return this.repository.addUser(user);
    }
}

export default new UserService(userRepository);
