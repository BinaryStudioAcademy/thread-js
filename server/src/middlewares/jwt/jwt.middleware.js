import passport from 'passport';

const jwt = passport.authenticate('jwt', { session: false });

export { jwt };
