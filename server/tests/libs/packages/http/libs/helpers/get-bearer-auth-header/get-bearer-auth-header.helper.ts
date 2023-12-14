const getBearerAuthHeader = (accessToken: string): string => {
  return `Bearer ${accessToken}`;
};

export { getBearerAuthHeader };
