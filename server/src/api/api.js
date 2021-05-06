import { initAuth } from './auth/auth.api';
import { initPost } from './post/post.api';
import { initComment } from './comment/comment.api';
import { initImage } from './image/image.api';

// register all routes
const initApi = app => {
  app.use('/api/auth', initAuth);
  app.use('/api/posts', initPost);
  app.use('/api/comments', initComment);
  app.use('/api/images', initImage);
};

export { initApi };
