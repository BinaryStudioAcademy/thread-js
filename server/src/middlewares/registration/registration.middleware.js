import passport from 'passport';

const registration = passport.authenticate('register', { session: false });

export { registration };
