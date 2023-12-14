import {
  type FastifyReply,
  type FastifyRequest,
  type preHandlerHookHandler
} from 'fastify';

import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema, type ValueOf } from '~/libs/types/types.js';

type ControllerRoute = {
  url: string;
  method: ValueOf<typeof HttpMethod>;
  preHandler?: preHandlerHookHandler;
  handler: (_request: FastifyRequest, _reply: FastifyReply) => Promise<unknown>;
  schema?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ControllerRoute };
