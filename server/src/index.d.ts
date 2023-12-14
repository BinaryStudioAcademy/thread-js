import { type File } from 'fastify-multer/lib/interfaces.js';
import { type Server as SocketServer } from 'socket.io';

import { type UserAuthResponse } from '~/packages/user/user.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserAuthResponse;
    file?: File;
    io: SocketServer;
  }
}
