import { type FastifyReply, type FastifyRequest } from 'fastify';

import {
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostsByFilterResponseDto,
  type Post,
  type PostWithCommentImageUserNestedRelationsWithCount
} from './types.js';

type PostController = {
  getByFilter(_request: FastifyRequest): Promise<GetPostsByFilterResponseDto>;
  getById(
    _request: FastifyRequest
  ): Promise<PostWithCommentImageUserNestedRelationsWithCount | null>;
  create(
    _request: FastifyRequest<Record<'Body', CreatePostRequestDto>>,
    _reply: FastifyReply
  ): Promise<Post>;
  react(_request: FastifyRequest): Promise<CreatePostReactionResponseDto>;
};

export { type PostController };
