import { PostsApiPath } from '../../common/enums/enums';

const initPost = (Router, services) => {
  const { post: postService } = services;
  const router = Router();

  router
    .get(PostsApiPath.ROOT, (req, res, next) => postService
      .getPosts(req.query)
      .then(posts => res.send(posts))
      .catch(next))
    .get(PostsApiPath.$ID, (req, res, next) => postService
      .getPostById(req.params.id)
      .then(post => res.send(post))
      .catch(next))
    .post(PostsApiPath.ROOT, (req, res, next) => postService
      .create(req.user.id, req.body)
      .then(post => {
        req.io.emit('new_post', post); // notify all users that a new post was created
        return res.send(post);
      })
      .catch(next))
    .put(PostsApiPath.REACT, (req, res, next) => postService
      .setReaction(req.user.id, req.body)
      .then(reaction => {
        if (reaction.post && reaction.post.userId !== req.user.id) {
          // notify a user if someone (not himself) liked his post
          req.io
            .to(reaction.post.userId)
            .emit('like', 'Your post was liked!');
        }
        return res.send(reaction);
      })
      .catch(next));

  return router;
};

export { initPost };
