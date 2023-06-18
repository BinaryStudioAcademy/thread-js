import { CommentsApiPath, ControllerHook } from '#libs/enums/enums.js';
import { HttpCode, HttpMethod } from '#libs/packages/http/http.js';

const initCommentApi = (fastify, options, done) => {
  const { commentService } = options.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: async request =>
      commentService.getById(request.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: CommentsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (request, response) => {
      const comment = await commentService.create(
        request.user.id,
        request.body
      );

      return response.status(HttpCode.CREATED).send(comment);
    }
  });

  done();
};

export { initCommentApi };
