import { Abstract } from '../abstract/abstract.repository';

class Comment extends Abstract {
  constructor({ commentModel }) {
    super(commentModel);
  }

  getCommentById(id) {
    return this.model.query()
      .findById(id)
      .withGraphFetched('[user.image]');
  }
}

export { Comment };
