const getCommentsCountQuery = model => model.relatedQuery('comments').count().as('commentCount');

const getReactionsQuery = model => isLike => {
  const col = isLike ? 'likeCount' : 'dislikeCount';

  return model.relatedQuery('postReactions')
    .count()
    .where({ isLike })
    .as(col);
};

const getWhereUserIdQuery = userId => builder => {
  if (userId) {
    builder.where({ userId });
  }
};

export { getCommentsCountQuery, getReactionsQuery, getWhereUserIdQuery };
