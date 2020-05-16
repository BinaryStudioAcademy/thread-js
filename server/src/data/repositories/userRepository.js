import { UserModel, ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

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

  getUserById(id) {
    return this.model.findOne({
      group: [
        'user.id',
        'image.id'
      ],
      where: { id },
      include: {
        model: ImageModel,
        attributes: ['id', 'link']
      }
    });
  }
}

export default new UserRepository(UserModel);
