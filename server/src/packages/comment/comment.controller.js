import {
  Controller,
  ControllerHook
} from '#libs/packages/controller/controller.js';
import { HttpCode, HttpMethod } from '#libs/packages/http/http.js';

import { CommentsApiPath } from './libs/enums/enums.js';

class CommentController extends Controller {
  #commentService;

  constructor({ apiPath, commentService }) {
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

  getById = async request => this.#commentService.getById(request.params.id);

  create = async (request, reply) => {
    const comment = await this.#commentService.create(
      request.user.id,
      request.body
    );

    return reply.status(HttpCode.CREATED).send(comment);
  };
}

export { CommentController };
