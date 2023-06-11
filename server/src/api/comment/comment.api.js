import {
  CommentsApiPath,
  ControllerHook,
  HttpCode,
  HttpMethod
} from '../../common/enums/enums.js';

const initComment = (fastify, options, done) => {
  const { comment: commentService } = options.services;

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

export { initComment };
