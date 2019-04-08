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
}

export default new UserRepository(UserModel);
