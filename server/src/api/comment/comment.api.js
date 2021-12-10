import { CommentsApiPath } from '../../common/enums/enums';

const initComment = (router, opts, done) => {
  const { comment: commentService } = opts.services;

  router
    .get(CommentsApiPath.$ID, req => commentService.getCommentById(req.params.id))
    .post(CommentsApiPath.ROOT, req => commentService.create(req.user.id, req.body));

  done();
};

export { initComment };
