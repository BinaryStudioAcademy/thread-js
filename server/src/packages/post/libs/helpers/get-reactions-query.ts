import { type Model, type QueryBuilder } from 'objection';

import { type PostModel } from '../../post.model.js';

const getReactionsQuery =
  (model: typeof PostModel) =>
  (isLike: boolean): QueryBuilder<Model> => {
    const col = isLike ? 'likeCount' : 'dislikeCount';

    return model
      .relatedQuery('postReactions')
      .count()
      .where({ isLike })
      .as(col);
  };

export { getReactionsQuery };
