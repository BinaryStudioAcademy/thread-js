import passport from 'passport';

export default passport.authenticate('login', { session: false });
