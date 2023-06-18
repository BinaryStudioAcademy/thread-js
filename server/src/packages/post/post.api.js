import {
  ControllerHook,
  NotificationSocketEvent,
  PostsApiPath,
  SocketNamespace
} from '#libs/enums/enums.js';
import { HttpCode, HttpMethod } from '#libs/packages/http/http.js';

const initPostApi = (fastify, options, done) => {
  const { postService } = options.services;

  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: request => postService.getPosts(request.query)
  });
  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.$ID,
    [ControllerHook.HANDLER]: request => postService.getById(request.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (request, response) => {
      const post = await postService.create(request.user.id, request.body);

      request.io
        .of(SocketNamespace.NOTIFICATION)
        .emit(NotificationSocketEvent.NEW_POST, post); // notify all users that a new post was created
      return response.status(HttpCode.CREATED).send(post);
    }
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: PostsApiPath.REACT,
    [ControllerHook.HANDLER]: async request => {
      const reaction = await postService.setReaction(
        request.user.id,
        request.body
      );

      if (reaction.post && reaction.post.userId !== request.user.id) {
        // notify a user if someone (not himself) liked his post
        request.io
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
