import { CommentModel, UserModel, ImageModel } from '../models/index';
import BaseRepository from './base.repository';

class CommentRepository extends BaseRepository {
  getCommentById(id) {
    return this.model.findOne({
      group: [
        'comment.id',
        'user.id',
        'user->image.id'
      ],
      where: { id },
      include: [{
        model: UserModel,
        attributes: ['id', 'username'],
        include: {
          model: ImageModel,
          attributes: ['id', 'link']
        }
      }]
    });
  }
}

export default new CommentRepository(CommentModel);
