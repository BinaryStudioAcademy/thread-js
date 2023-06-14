import { AbstractRepository } from '#libs/packages/database/database.js';

class CommentRepository extends AbstractRepository {
  constructor({ commentModel }) {
    super(commentModel);
  }

  getCommentById(id) {
    return this.model.query().findById(id).withGraphFetched('[user.image]');
  }
}

export { CommentRepository };
