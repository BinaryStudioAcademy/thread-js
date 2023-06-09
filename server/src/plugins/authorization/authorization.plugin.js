import fp from 'fastify-plugin';

import {
  ControllerHook,
  ExceptionMessage,
  HttpCode
} from '../../common/enums/enums.js';
import { InvalidCredentialsError } from '../../exceptions/exceptions.js';

const authorization = fp(async (fastify, { routesWhiteList, services }) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const isWhiteRoute = routesWhiteList.includes(
        request.routerPath
      );

      if (isWhiteRoute) {
        return;
      }

      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { user, auth } = services;
      const { id } = await auth.verifyToken(token);

      const authorizedUser = await user.getUserById(id);
      if (!authorizedUser) {
        throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
      }

      request.user = authorizedUser;
    } catch (error) {
      reply.code(HttpCode.UNAUTHORIZED).send(error);
    }
  });
});

export { authorization };
