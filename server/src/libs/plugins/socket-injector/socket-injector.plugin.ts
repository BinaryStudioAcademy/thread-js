/* eslint-disable @typescript-eslint/require-await */
import { type FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { type Server as SocketServer } from 'socket.io';

import { ControllerHook } from '~/libs/packages/controller/controller.js';

type Options = {
  io: SocketServer;
};

const socketInjector: FastifyPluginAsync<Options> = fp<Options>(
  async (fastify, { io }): Promise<void> => {
    fastify.decorateRequest('io', null);

    fastify.addHook(ControllerHook.PRE_HANDLER, (request, _reply, hookDone) => {
      request.io = io;
      hookDone();
    });
  }
);

export { socketInjector };
