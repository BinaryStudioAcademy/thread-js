import {
  type FastifyReply,
  type FastifyRequest,
  type preHandlerHookHandler,
  type RouteGenericInterface
} from 'fastify';

import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema, type ValueOf } from '~/libs/types/types.js';

type ControllerRoute = {
  url: string;
  method: ValueOf<typeof HttpMethod>;
  preHandler?: preHandlerHookHandler;
  handler: <T extends RouteGenericInterface>(
    _request: FastifyRequest<T>,
    _reply: FastifyReply
  ) => Promise<unknown>;
  schema?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ControllerRoute };
