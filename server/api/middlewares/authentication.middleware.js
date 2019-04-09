import passport from 'passport';

const authenticationMiddleware = (routesWhiteList = []) => (req, res, next) => (
    routesWhiteList.some(route => route === req.path)
        ? next()
        : passport.authenticate('jwt', { session: false })(req, res, next)
);

export default authenticationMiddleware;
