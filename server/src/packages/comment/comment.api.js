import {
  HttpCode,
  CommentsApiPath,
  ControllerHook,
  HttpMethod
} from '#libs/enums/enums.js';

const initCommentApi = (fastify, opts, done) => {
  const { commentService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => commentService.getById(req.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: CommentsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (req, res) => {
      const comment = await commentService.create(req.user.id, req.body);

      return res.status(HttpCode.CREATED).send(comment);
    }
  });

  done();
};

export { initCommentApi };
