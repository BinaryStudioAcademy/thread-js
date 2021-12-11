// import { sequelize } from '../../db/connection';
import { Abstract } from '../abstract/abstract.repository';

const getReactionSelectQuery = bool => `
  (SELECT COUNT(*)
  FROM "post_reactions" as "reaction"
  WHERE "post"."id" = "reaction"."post_id" AND "reaction"."is_like" = ${bool})
`;
const getCommentCountQuery = () => `
  (SELECT COUNT(*)
  FROM "comments" as "comment"
  WHERE "post"."id" = "comment"."post_id") as commentCount
`;

class Post extends Abstract {
  constructor({
    postModel// ,
    // commentModel,
    // userModel,
    // imageModel,
    // postReactionModel
  }) {
    super(postModel);
    // this._commentModel = commentModel;
    // this._userModel = userModel;
    // this._imageModel = imageModel;
    // this._postReactionModel = postReactionModel;
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

    return this.model.query()
      .select(
        'posts.*',
        `${getCommentCountQuery()}`,
        `${getReactionSelectQuery(true)} as likeCount`,
        `${getReactionSelectQuery(false)} as dislikeCount`
      )
      .where(where)
      .withGraphFetched(['image, user.image, postReaction'])
      .orderBy('createdAt', 'desc')
      .page(offset, limit);
    /*
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
    }); */
  }

  getPostById(id) {
    return this.model.query()
      .select(
        'posts.*',
        `${getCommentCountQuery()}`,
        `${getReactionSelectQuery(true)} as likeCount`,
        `${getReactionSelectQuery(false)} as dislikeCount`
      )
      .where({ id })
      .withGraphFetched(['comment.user.image, user.image, image, postReaction']);

    /* return this.model.findOne({
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
    }); */
  }
}

export { Post };
