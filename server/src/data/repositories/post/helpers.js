const getCommentsCountQuery = model => model.relatedQuery('comments').count().as('commentCount');

const getReactionsQuery = model => isLike => {
  const col = isLike ? 'likeCount' : 'dislikeCount';

  return model.relatedQuery('postReactions')
    .count()
    .where('is_like', isLike)
    .as(col);
};

const getWhereUserIdQuery = userId => builder => {
  if (userId) {
    builder.where('user_id', userId);
  }
};

export { getCommentsCountQuery, getReactionsQuery, getWhereUserIdQuery };
