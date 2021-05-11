import { Abstract } from '../abstract/abstract.repository';

class Comment extends Abstract {
  constructor({ commentModel, userModel, imageModel }) {
    super(commentModel);
    this._userModel = userModel;
    this._imageModel = imageModel;
  }

  getCommentById(id) {
    return this.model.findOne({
      group: ['comment.id', 'user.id', 'user->image.id'],
      where: { id },
      include: [
        {
          model: this._userModel,
          attributes: ['id', 'username'],
          include: {
            model: this._imageModel,
            attributes: ['id', 'link']
          }
        }
      ]
    });
  }
}

export { Comment };
