import { PostReactionModel } from '../models/index';
import BaseRepository from './base.repository';

class PostReactionRepository extends BaseRepository {
    getPostReaction(userId, postId) {
        return this.model.findOne({ where: { userId, postId } });
    }
}

export default new PostReactionRepository(PostReactionModel);
