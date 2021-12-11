import { WHITE_ROUTES } from '../common/constants/api.constants';
import { ApiPath } from '../common/enums/enums';
import { authorization as authorizationPlugin } from '../plugins/plugins';
import { initAuth } from './auth/auth.api';
import { initComment } from './comment/comment.api';
import { initImage } from './image/image.api';
import { initPost } from './post/post.api';

// register all routes
const initApi = (
  fastify,
  { services: { auth, user, comment, post, image } },
  done
) => {
  fastify.register(authorizationPlugin, {
    services: {
      user,
      auth
    },
    routesWhiteList: WHITE_ROUTES
  });

  fastify.register(initAuth, {
    services: {
      auth,
      user
    },
    prefix: ApiPath.AUTH
  });
  fastify.register(initPost, {
    services: {
      post
    },
    prefix: ApiPath.POSTS
  });
  fastify.register(initComment, {
    services: {
      comment
    },
    prefix: ApiPath.COMMENTS
  });
  fastify.register(initImage, {
    services: {
      image
    },
    prefix: ApiPath.IMAGES
  });

  done();
};

export { initApi };
