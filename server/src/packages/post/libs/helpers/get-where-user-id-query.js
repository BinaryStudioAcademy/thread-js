const getWhereUserIdQuery = userId => builder => {
  if (userId) {
    builder.where({ userId });
  }
};

export { getWhereUserIdQuery };
