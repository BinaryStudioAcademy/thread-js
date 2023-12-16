import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type ApiPath } from '~/libs/enums/enums.js';
import {
  Controller,
  ControllerHook
} from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type UserAuthResponse } from '../user/user.js';
import { CommentsApiPath } from './libs/enums/enums.js';
import {
  type Comment as TComment,
  type CommentController,
  type CommentService,
  type CommentWithUserNestedRelations,
  type CreateCommentRequestDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: ValueOf<typeof ApiPath>;
  commentService: CommentService;
};

class Comment extends Controller implements CommentController {
  #commentService: CommentService;

  public constructor({ apiPath, commentService }: Constructor) {
    super({ apiPath });
    this.#commentService = commentService;

    this.addRoute({
      method: HttpMethod.GET,
      url: CommentsApiPath.$ID,
      [ControllerHook.HANDLER]: this.getById
    });
    this.addRoute({
      method: HttpMethod.POST,
      url: CommentsApiPath.ROOT,
      [ControllerHook.HANDLER]: this.create
    });
  }

  public getById = async (
    request: FastifyRequest
  ): Promise<CommentWithUserNestedRelations | null> => {
    return await this.#commentService.getById(
      (request.params as Record<'id', number>).id
    );
  };

  public create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TComment> => {
    const comment = await this.#commentService.create(
      (request.user as UserAuthResponse).id,
      request.body as CreateCommentRequestDto
    );

    return await reply.status(HttpCode.CREATED).send(comment);
  };
}

export { Comment };
