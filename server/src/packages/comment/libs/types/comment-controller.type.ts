import { type FastifyReply, type FastifyRequest } from 'fastify';

import {
  type Comment,
  type CommentWithUserNestedRelations,
  type CreateCommentRequestDto
} from './types.js';

type CommentController = {
  getById(
    _request: FastifyRequest<Record<'Params', Record<'id', number>>>
  ): Promise<CommentWithUserNestedRelations | null>;
  create(
    _request: FastifyRequest<Record<'Body', CreateCommentRequestDto>>,
    _reply: FastifyReply
  ): Promise<Comment>;
};

export { type CommentController };
