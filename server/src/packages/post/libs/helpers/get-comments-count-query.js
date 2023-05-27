const getCommentsCountQuery = model => {
  return model.relatedQuery('comments').count().as('commentCount');
};

export { getCommentsCountQuery };
