import { auth, user, comment, post, image } from '../services/services';
import { initAuth } from './auth/auth.api';
import { initPost } from './post/post.api';
import { initComment } from './comment/comment.api';
import { initImage } from './image/image.api';

// register all routes
const initApi = Router => {
  const apiRouter = Router();

  apiRouter.use(
    '/auth',
    initAuth(Router, {
      auth,
      user
    })
  );
  apiRouter.use(
    '/posts',
    initPost(Router, {
      post
    })
  );
  apiRouter.use(
    '/comments',
    initComment(Router, {
      comment
    })
  );
  apiRouter.use(
    '/images',
    initImage(Router, {
      image
    })
  );

  return apiRouter;
};

export { initApi };
