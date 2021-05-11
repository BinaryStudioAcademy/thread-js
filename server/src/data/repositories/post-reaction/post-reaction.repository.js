import { Abstract } from '../abstract/abstract.repository';

class PostReaction extends Abstract {
  constructor({ postReactionModel, postModel }) {
    super(postReactionModel);
    this._postModel = postModel;
  }

  getPostReaction(userId, postId) {
    return this.model.findOne({
      group: ['postReaction.id', 'post.id'],
      where: { userId, postId },
      include: [
        {
          model: this._postModel,
          attributes: ['id', 'userId']
        }
      ]
    });
  }
}

export { PostReaction };
