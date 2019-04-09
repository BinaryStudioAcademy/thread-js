import { UserModel } from '../models/index';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository {
    addUser(user) {
        return this.create(user);
    }

    getByEmail(email) {
        return this.model.findOne({ where: { email } });
    }

    getByUsername(username) {
        return this.model.findOne({ where: { username } });
    }
}

export default new UserRepository(UserModel);
