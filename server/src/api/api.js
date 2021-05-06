import { ApiPath } from '../common/enums/enums';
import { auth, user, comment, post, image } from '../services/services';
import { initAuth } from './auth/auth.api';
import { initPost } from './post/post.api';
import { initComment } from './comment/comment.api';
import { initImage } from './image/image.api';

// register all routes
const initApi = Router => {
  const apiRouter = Router();

  apiRouter.use(
    ApiPath.AUTH,
    initAuth(Router, {
      auth,
      user
    })
  );
  apiRouter.use(
    ApiPath.POSTS,
    initPost(Router, {
      post
    })
  );
  apiRouter.use(
    ApiPath.COMMENTS,
    initComment(Router, {
      comment
    })
  );
  apiRouter.use(
    ApiPath.IMAGES,
    initImage(Router, {
      image
    })
  );

  return apiRouter;
};

export { initApi };
