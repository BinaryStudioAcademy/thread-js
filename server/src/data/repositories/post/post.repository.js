import { Abstract } from '../abstract/abstract.repository';
import { getCommentsCountQuery, getReactionsQuery, getWhereUserIdQuery } from './helpers';

class Post extends Abstract {
  constructor({ postModel }) {
    super(postModel);
  }

  getPosts(filter) {
    const {
      from: offset,
      count: limit,
      userId
    } = filter;

    return this.model.query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where(getWhereUserIdQuery(userId))
      .withGraphFetched('[image, user.image]')
      .orderBy('createdAt', 'desc')
      .page(offset, limit);
  }

  getPostById(id) {
    return this.model.query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where({ id })
      .withGraphFetched('[comments.user.image, user.image, image]')
      .first();
  }
}

export { Post };
