import { sequelize } from '../../db/connection';
import { Abstract } from '../abstract/abstract.repository';

const likeCase = bool => `CASE WHEN "postReactions"."isLike" = ${bool} THEN 1 ELSE 0 END`;

class Post extends Abstract {
  constructor({
    postModel,
    commentModel,
    userModel,
    imageModel,
    postReactionModel
  }) {
    super(postModel);
    this._commentModel = commentModel;
    this._userModel = userModel;
    this._imageModel = imageModel;
    this._postReactionModel = postReactionModel;
  }

  async getPosts(filter) {
    const {
      from: offset,
      count: limit,
      userId
    } = filter;

    const where = {};
    if (userId) {
      Object.assign(where, { userId });
    }

    return this.model.findAll({
      where,
      attributes: {
        include: [
          [sequelize.literal(`
                        (SELECT COUNT(*)
                        FROM "comments" as "comment"
                        WHERE "post"."id" = "comment"."postId")`), 'commentCount'],
          [sequelize.fn('SUM', sequelize.literal(likeCase(true))), 'likeCount'],
          [sequelize.fn('SUM', sequelize.literal(likeCase(false))), 'dislikeCount']
        ]
      },
      include: [{
        model: this._imageModel,
        attributes: ['id', 'link']
      }, {
        model: this._userModel,
        attributes: ['id', 'username'],
        include: {
          model: this._imageModel,
          attributes: ['id', 'link']
        }
      }, {
        model: this._postReactionModel,
        attributes: [],
        duplicating: false
      }],
      group: [
        'post.id',
        'image.id',
        'user.id',
        'user->image.id'
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit
    });
  }

  getPostById(id) {
    return this.model.findOne({
      group: [
        'post.id',
        'comments.id',
        'comments->user.id',
        'comments->user->image.id',
        'user.id',
        'user->image.id',
        'image.id'
      ],
      where: { id },
      attributes: {
        include: [
          [sequelize.literal(`
                        (SELECT COUNT(*)
                        FROM "comments" as "comment"
                        WHERE "post"."id" = "comment"."postId")`), 'commentCount'],
          [sequelize.fn('SUM', sequelize.literal(likeCase(true))), 'likeCount'],
          [sequelize.fn('SUM', sequelize.literal(likeCase(false))), 'dislikeCount']
        ]
      },
      include: [{
        model: this._commentModel,
        include: {
          model: this._userModel,
          attributes: ['id', 'username'],
          include: {
            model: this._imageModel,
            attributes: ['id', 'link']
          }
        }
      }, {
        model: this._userModel,
        attributes: ['id', 'username'],
        include: {
          model: this._imageModel,
          attributes: ['id', 'link']
        }
      }, {
        model: this._imageModel,
        attributes: ['id', 'link']
      }, {
        model: this._postReactionModel,
        attributes: []
      }]
    });
  }
}

export { Post };
