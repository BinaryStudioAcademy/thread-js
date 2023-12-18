/* eslint-disable @typescript-eslint/require-await */
import fp from 'fastify-plugin';
import { type Server as SocketServer } from 'socket.io';

import { ControllerHook } from '~/libs/packages/controller/controller.js';

type Options = {
  io: SocketServer;
};

const socketInjector = fp<Options>(async (fastify, { io }): Promise<void> => {
  fastify.decorateRequest('io', null);

  fastify.addHook(ControllerHook.PRE_HANDLER, async (request, _reply) => {
    request.io = io;
  });
});

export { socketInjector };
