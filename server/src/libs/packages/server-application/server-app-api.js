import { WHITE_ROUTES } from './libs/constants/constants.js';
import { ApiPath } from '#libs/enums/enums.js';
import { authorization as authorizationPlugin } from '#libs/plugins/plugins.js';
import { initAuthApi } from '#packages/auth/auth.js';
import { initCommentApi } from '#packages/comment/comment.js';
import { initImageApi } from '#packages/image/image.js';
import { initPostApi } from '#packages/post/post.js';

// register all routes
const initApi = (
  fastify,
  {
    services: {
      authService,
      userService,
      commentService,
      postService,
      imageService
    }
  },
  done
) => {
  fastify.setValidatorCompiler(({ schema }) => {
    return data => schema.validate(data);
  });

  fastify.register(authorizationPlugin, {
    services: {
      userService,
      authService
    },
    routesWhiteList: WHITE_ROUTES
  });

  fastify.register(initAuthApi, {
    services: {
      authService,
      userService
    },
    prefix: ApiPath.AUTH
  });
  fastify.register(initPostApi, {
    services: {
      postService
    },
    prefix: ApiPath.POSTS
  });
  fastify.register(initCommentApi, {
    services: {
      commentService
    },
    prefix: ApiPath.COMMENTS
  });
  fastify.register(initImageApi, {
    services: {
      imageService
    },
    prefix: ApiPath.IMAGES
  });

  done();
};

export { initApi };
