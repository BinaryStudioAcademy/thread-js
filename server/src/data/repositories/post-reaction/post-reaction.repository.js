import { PostReactionModel, PostModel } from '../../models';
import { Abstract } from '../abstract/abstract.repository';

class PostReaction extends Abstract {
  getPostReaction(userId, postId) {
    return this.model.findOne({
      group: ['postReaction.id', 'post.id'],
      where: { userId, postId },
      include: [
        {
          model: PostModel,
          attributes: ['id', 'userId']
        }
      ]
    });
  }
}

export default new PostReaction(PostReactionModel);
