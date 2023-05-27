const getReactionsQuery = model => isLike => {
  const col = isLike ? 'likeCount' : 'dislikeCount';

  return model.relatedQuery('postReactions').count().where({ isLike }).as(col);
};

export { getReactionsQuery };
