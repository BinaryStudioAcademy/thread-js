import jwtMiddleware from './jwt.middleware';

const authorizationMiddleware = (routesWhiteList = []) => (req, res, next) => (
    routesWhiteList.some(route => route === req.path)
        ? next()
        : jwtMiddleware(req, res, next)
);

export default authorizationMiddleware;
