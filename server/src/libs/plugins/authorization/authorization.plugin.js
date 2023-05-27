import fp from 'fastify-plugin';
import {
  ExceptionMessage,
  ControllerHook,
  HttpCode
} from '../../enums/enums.js';
import { InvalidCredentialsError } from '../../exceptions/exceptions.js';

const authorization = fp(async (fastify, { routesWhiteList, services }) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const isWhiteRoute = routesWhiteList.some(
        route => route === request.routerPath
      );

      if (isWhiteRoute) {
        return;
      }

      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { userService, authService } = services;
      const { id } = await authService.verifyToken(token);

      const authorizedUser = await userService.getUserById(id);
      if (!authorizedUser) {
        throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
      }

      request.user = authorizedUser;
    } catch (err) {
      reply.code(HttpCode.UNAUTHORIZED).send(err);
    }
  });
});

export { authorization };
