import { PostReactionModel, PostModel } from '../models/index';
import BaseRepository from './baseRepository';

class PostReactionRepository extends BaseRepository {
  getPostReaction(userId, postId) {
    return this.model.findOne({
      group: [
        'postReaction.id',
        'post.id'
      ],
      where: { userId, postId },
      include: [{
        model: PostModel,
        attributes: ['id', 'userId']
      }]
    });
  }
}

export default new PostReactionRepository(PostReactionModel);
