import { PostsApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initPost = (fastify, opts, done) => {
  const { post: postService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: req => postService.getPosts(req.query)
  });
  fastify.route({
    method: HttpMethod.GET,
    url: PostsApiPath.$ID,
    [ControllerHook.HANDLER]: req => postService.getPostById(req.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: PostsApiPath.ROOT,
    [ControllerHook.HANDLER]: async req => {
      const post = await postService.create(req.user.id, req.body);
      req.io.emit('new_post', post); // notify all users that a new post was created
      return post;
    }
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: PostsApiPath.REACT,
    [ControllerHook.HANDLER]: async req => {
      const reaction = await postService.setReaction(req.user.id, req.body);

      if (reaction.post && reaction.post.userId !== req.user.id) {
        // notify a user if someone (not himself) liked his post
        req.io.to(reaction.post.userId).emit('like', 'Your post was liked!');
      }
      return reaction;
    }
  });

  done();
};

export { initPost };
