import fp from 'fastify-plugin';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { InvalidCredentialsError } from '#libs/exceptions/exceptions.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';
import { HttpCode } from '#libs/packages/http/http.js';

const authorization = fp(async (fastify, { routesWhiteList, services }) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const isWhiteRoute = routesWhiteList.includes(request.routerPath);

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
    } catch (error) {
      reply.code(HttpCode.UNAUTHORIZED).send(error);
    }
  });
});

export { authorization };
