import fp from 'fastify-plugin';

import { ControllerHook } from '#libs/packages/controller/controller.js';

const socketInjector = fp((fastify, { io }, done) => {
  fastify.decorateRequest('io', null);

  fastify.addHook(ControllerHook.PRE_HANDLER, (request, _reply, hookDone) => {
    request.io = io;
    hookDone();
  });

  done();
});

export { socketInjector };
