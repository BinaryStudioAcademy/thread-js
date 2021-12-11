import { Abstract } from '../abstract/abstract.repository';

class User extends Abstract {
  constructor({ userModel }) {
    super(userModel);
    // this._imageModel = imageModel;
  }

  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.query().select().where({ email });
    // return this.model.findOne({ where: { email } });
  }

  getByUsername(username) {
    return this.model.query().select().where({ username });
    // return this.model.findOne({ where: { username } });
  }

  getUserById(id) {
    return this.model.query()
      .select('id', 'createdAt', 'email', 'updatedAt', 'username')
      .where({ id })
      .withGraphFetched('[image]');
    /* return this.model.findOne({
      group: ['user.id', 'image.id'],
      attributes: ['id', 'createdAt', 'email', 'updatedAt', 'username'],
      where: { id },
      include: {
        model: this._imageModel,
        attributes: ['id', 'link']
      }
    }); */
  }
}

export { User };
