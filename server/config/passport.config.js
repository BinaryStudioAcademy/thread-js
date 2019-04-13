import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from './jwt.config';
import userRepository from '../data/repositories/user.repository';
import cryptoHelper from '../helpers/crypto.helper';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await userRepository.getByEmail(email);

            if (!user) {
                return done({ status: 401, message: 'Incorrect email.' }, false);
            }

            const isValid = await cryptoHelper.compare(password, user.password);
            return isValid
                ? done(null, user)
                : done({ status: 401, message: 'Passwords do not match.' }, null, false);
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    'register',
    new LocalStrategy(
        { passReqToCallback: true },
        async ({ body: { email } }, username, password, done) => {
            try {
                const userByEmail = await userRepository.getByEmail(email);
                if (userByEmail) {
                    return done({ status: 401, message: 'Email is already taken.' }, false);
                }

                const userByUsername = await userRepository.getByUsername(username);
                if (userByUsername) {
                    return done({ status: 401, message: 'Username is already taken.' }, false);
                }

                return done(null, { email, username, password });
            } catch (err) {
                return done(err);
            }
        }
    )
);


passport.use(new JwtStrategy(options, async ({ id }, done) => {
    try {
        const user = await userRepository.getById(id);
        return user
            ? done(null, user)
            : done({ status: 401, message: 'Token is invalid.' }, false);
    } catch (err) {
        return done(err);
    }
}));
