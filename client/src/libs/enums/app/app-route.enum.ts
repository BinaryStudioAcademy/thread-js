const AppRoute = {
  ROOT: '/',
  ANY: '*',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  SHARE_$POSTHASH: '/share/:postHash'
} as const;

export { AppRoute };
