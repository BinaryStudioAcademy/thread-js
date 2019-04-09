import passport from 'passport';

export default passport.authenticate('register', { session: false });
