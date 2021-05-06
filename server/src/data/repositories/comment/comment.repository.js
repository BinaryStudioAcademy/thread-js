import { CommentModel, UserModel, ImageModel } from '../../models';
import { Abstract } from '../abstract/abstract.repository';

class Comment extends Abstract {
  getCommentById(id) {
    return this.model.findOne({
      group: ['comment.id', 'user.id', 'user->image.id'],
      where: { id },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'username'],
          include: {
            model: ImageModel,
            attributes: ['id', 'link']
          }
        }
      ]
    });
  }
}

export default new Comment(CommentModel);
