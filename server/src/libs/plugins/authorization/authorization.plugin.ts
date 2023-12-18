/* eslint-disable @typescript-eslint/require-await */
import fp from 'fastify-plugin';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { InvalidCredentialsError } from '~/libs/exceptions/exceptions.js';
import { ControllerHook } from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpHeader } from '~/libs/packages/http/http.js';
import { type AuthService } from '~/packages/auth/auth.js';
import { type UserService } from '~/packages/user/user.js';

type Options = {
  routesWhiteList: string[];
  services: {
    userService: UserService;
    authService: AuthService;
  };
};

const authorization = fp<Options>(
  async (fastify, { routesWhiteList, services }): Promise<void> => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
      try {
        const isWhiteRoute = routesWhiteList.includes(request.routerPath);

        if (isWhiteRoute) {
          return;
        }

        const [, token] =
          (request.headers[HttpHeader.AUTHORIZATION] as string).split(' ') ??
          [];
        const { userService, authService } = services;
        const { id } = await authService.verifyToken<Record<'id', number>>(
          token as string
        );

        const authorizedUser = await userService.getById(id);

        if (!authorizedUser) {
          throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
        }

        request.user = authorizedUser;
      } catch (error) {
        void reply.code(HttpCode.UNAUTHORIZED).send(error);
      }
    });
  }
);

export { authorization };
