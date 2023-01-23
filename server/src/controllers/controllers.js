import { ApiPath } from '../common/enums/enums.js';
import { Auth } from './auth/auth.controller.js';
import { Post } from './post/post.controller.js';
import { Image } from './image/image.controller.js';
import { Comment } from './comment/comment.controller.js';

const initControllers = async (app, { services }) => {
  const {
    auth: authService,
    user: userService,
    post: postService,
    image: imageService,
    comment: commentService
  } = services;

  app.setValidatorCompiler(({ schema }) => {
    return data => schema.validate(data);
  });

  [
    new Auth({
      app,
      apiPath: ApiPath.AUTH,
      authService,
      userService
    }),
    new Post({
      app,
      apiPath: ApiPath.POSTS,
      postService
    }),
    new Image({
      app,
      apiPath: ApiPath.IMAGES,
      imageService
    }),
    new Comment({
      app,
      apiPath: ApiPath.COMMENTS,
      commentService
    })
  ].forEach(({ initRoutes }) => initRoutes());
};

export { initControllers };
