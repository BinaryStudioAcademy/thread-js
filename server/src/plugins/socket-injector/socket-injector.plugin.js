import fp from 'fastify-plugin';
import { ControllerHook } from '../../common/enums/enums';

const socketInjector = fp((fastify, { io }, done) => {
  fastify.decorateRequest('io', null);

  fastify.addHook(ControllerHook.PRE_HANDLER, (req, _reply, done) => {
    req.io = io;
    done();
  });

  done();
});

export { socketInjector };
