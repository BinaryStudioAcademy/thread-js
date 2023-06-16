import { AbstractRepository } from '#libs/packages/database/database.js';

class UserRepository extends AbstractRepository {
  constructor({ userModel }) {
    super(userModel);
  }

  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.query().select().where({ email }).first();
  }

  getByUsername(username) {
    return this.model.query().select().where({ username }).first();
  }

  getUserById(id) {
    return this.model
      .query()
      .select('id', 'createdAt', 'email', 'updatedAt', 'username')
      .where({ id })
      .withGraphFetched('[image]')
      .first();
  }
}

export { UserRepository };
