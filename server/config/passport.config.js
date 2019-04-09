import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { secret } from './jwt.config';
import userRepository from '../data/repositories/user.repository';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await userRepository.getByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? done(null, user) : done(null, false, { message: 'Passwords do not match.' });
    } catch (err) {
        return done(err);
    }
}));

passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true }, async ({ body: { email } }, username, password, done) => {
        try {
            const userByEmail = await userRepository.getByEmail(email);
            if (userByEmail) {
                return done(null, false, { message: 'Email is already taken.' });
            }

            const userByUsername = await userRepository.getByUsername(username);
            if (userByUsername) {
                return done(null, false, { message: 'Username is already taken.' });
            }

            return done(null, { email, username, password });
        } catch (err) {
            return done(err);
        }
    })
);


passport.use(new JwtStrategy(options, async ({ id }, done) => {
    try {
        const user = await userRepository.getById(id);
        return user ? done(null, user) : done(null, false, { message: 'Token is invalid.' });
    } catch (err) {
        return done(err);
    }
}));
