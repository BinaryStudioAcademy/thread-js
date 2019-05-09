import jwtMiddleware from './jwt.middleware';

export default (routesWhiteList = []) => (req, res, next) => (
    routesWhiteList.some(route => route === req.path)
        ? next()
        : jwtMiddleware(req, res, next)
);
