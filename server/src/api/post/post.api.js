import { PostsApiPath } from '../../common/enums/enums';

const initPost = (router, opts, done) => {
  const { post: postService } = opts.services;

  router
    .get(PostsApiPath.ROOT, req => postService.getPosts(req.query))
    .get(PostsApiPath.$ID, req => postService.getPostById(req.params.id))
    .post(PostsApiPath.ROOT, async req => {
      const post = await postService.create(req.user.id, req.body);
      req.io.emit('new_post', post); // notify all users that a new post was created
      return post;
    })
    .put(PostsApiPath.REACT, async req => {
      const reaction = await postService.setReaction(req.user.id, req.body);

      if (reaction.post && reaction.post.userId !== req.user.id) {
        // notify a user if someone (not himself) liked his post
        req.io.to(reaction.post.userId).emit('like', 'Your post was liked!');
      }
      return reaction;
    });

  done();
};

export { initPost };
