import { AbstractRepository } from '~/libs/packages/database/database.js';

import {
  getCommentsCountQuery,
  getReactionsQuery,
  getWhereUserIdQuery
} from './libs/helpers/helpers.js';
import {
  type Post as TPost,
  type PostFilter,
  type PostRepository,
  type PostWithCommentImageUserNestedRelationsWithCount,
  type PostWithImageUserNestedRelationsWithCount
} from './libs/types/types.js';
import { type PostModel } from './post.model.js';

type Constructor = Record<'postModel', typeof PostModel>;

class Post
  extends AbstractRepository<
    typeof PostModel,
    TPost | PostWithCommentImageUserNestedRelationsWithCount
  >
  implements PostRepository
{
  public constructor({ postModel }: Constructor) {
    super(postModel);
  }

  public getByFilter(
    filter: PostFilter
  ): Promise<PostWithImageUserNestedRelationsWithCount[]> {
    const { from: offset, count: limit, userId } = filter;

    return this.model
      .query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where(getWhereUserIdQuery(userId))
      .withGraphFetched('[image, user.image]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .castTo<PostWithImageUserNestedRelationsWithCount[]>()
      .execute();
  }

  public async getById(
    id: number
  ): Promise<PostWithCommentImageUserNestedRelationsWithCount | null> {
    const post = await this.model
      .query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .findOne({ id })
      .withGraphFetched('[comments.user.image, user.image, image]')
      .castTo<PostWithCommentImageUserNestedRelationsWithCount>();

    return post ?? null;
  }
}

export { Post };
