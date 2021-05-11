import passport from 'passport';

const authentication = passport.authenticate('login', { session: false });

export { authentication };
