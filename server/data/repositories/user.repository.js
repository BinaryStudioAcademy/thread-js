import bcrypt from 'bcrypt';
import { UserModel } from '../models/index';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository {
    addUser({ email, username, password }) {
        return bcrypt.hash(password, 10).then(hash => ({
            email,
            username,
            password: hash
        })).then(user => this.create(user));
    }

    getByEmail(email) {
        return this.model.findOne({ where: { email } });
    }

    getByUsername(username) {
        return this.model.findOne({ where: { username } });
    }
}

export default new UserRepository(UserModel);
