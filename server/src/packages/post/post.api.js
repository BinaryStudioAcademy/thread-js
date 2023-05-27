import {
  HttpCode,
  HttpMethod,
  PostsApiPath,
  ControllerHook,
  SocketNamespace,
  NotificationSocketEvent
} from '../../libs/enums/enums.js';

const initPostApi = (fastify, opts, done) => {
  const { postService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: req => postService.getPosts(req.query)
  });
  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.$ID,
    [ControllerHook.HANDLER]: req => postService.getById(req.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (req, res) => {
      const post = await postService.create(req.user.id, req.body);

      req.io
        .of(SocketNamespace.NOTIFICATION)
        .emit(NotificationSocketEvent.NEW_POST, post); // notify all users that a new post was created
      return res.status(HttpCode.CREATED).send(post);
    }
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: PostsApiPath.REACT,
    [ControllerHook.HANDLER]: async req => {
      const reaction = await postService.setReaction(req.user.id, req.body);

      if (reaction.post && reaction.post.userId !== req.user.id) {
        // notify a user if someone (not himself) liked his post
        req.io
          .of(SocketNamespace.NOTIFICATION)
          .to(`${reaction.post.userId}`)
          .emit(NotificationSocketEvent.LIKE_POST);
      }
      return reaction;
    }
  });

  done();
};

export { initPostApi };
