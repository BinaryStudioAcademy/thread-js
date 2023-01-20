import { CommentsApiPath, ControllerHook, HttpCode, HttpMethod } from '../../common/enums/enums.js';

const initComment = (fastify, opts, done) => {
  const { comment: commentService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => commentService.getCommentById(req.params.id)
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

export { initComment };
