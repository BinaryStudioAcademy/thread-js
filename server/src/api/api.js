import { WHITE_ROUTES } from '../common/constants/api.constants.js';
import { ApiPath } from '../common/enums/enums.js';
import { authorization as authorizationPlugin } from '../plugins/plugins.js';
import { initAuth } from './auth/auth.api.js';
import { initComment } from './comment/comment.api.js';
import { initImage } from './image/image.api.js';
import { initPost } from './post/post.api.js';

// register all routes
const initApi = (
  fastify,
  { services: { auth, user, comment, post, image } },
  done
) => {
  fastify.setValidatorCompiler(({ schema }) => {
    return data => schema.validate(data);
  });

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
