const getBearerAuthHeader = accessToken => {
  return `Bearer ${accessToken}`;
};

export { getBearerAuthHeader };
