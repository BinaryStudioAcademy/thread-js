import { type Model, type QueryBuilder } from 'objection';

import { type PostModel } from '../../post.model.js';

const getCommentsCountQuery = (
  model: typeof PostModel
): QueryBuilder<Model> => {
  return model.relatedQuery('comments').count().as('commentCount');
};

export { getCommentsCountQuery };
