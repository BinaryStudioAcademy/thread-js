/* eslint-disable @typescript-eslint/no-floating-promises */
import { type QueryBuilder } from 'objection';

import { type PostModel } from '../../post.model.js';

const getWhereUserIdQuery = (userId: number | undefined) => {
  return (builder: QueryBuilder<PostModel>): void => {
    if (userId) {
      builder.where({ userId });
    }
  };
};

export { getWhereUserIdQuery };
