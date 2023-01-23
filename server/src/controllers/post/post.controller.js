import {
  HttpMethod,
  PostsApiPath,
  ControllerHook,
  SocketNamespace,
  NotificationSocketEvent
} from '../../common/enums/enums.js';
import { Controller } from '../abstract/abstract.controller.js';

class Post extends Controller {
  #postService;

  constructor({ app, apiPath, postService }) {
    super({
      app,
      apiPath
    });
    this.#postService = postService;
  }

  initRoutes = () => {
    [
      {
        method: HttpMethod.GET,
        url: PostsApiPath.ROOT,
        [ControllerHook.HANDLER]: this.getOnes
      },
      {
        method: HttpMethod.GET,
        url: PostsApiPath.$ID,
        [ControllerHook.HANDLER]: this.getById
      },
      {
        method: HttpMethod.POST,
        url: PostsApiPath.ROOT,
        [ControllerHook.HANDLER]: this.create
      },
      {
        method: HttpMethod.PUT,
        url: PostsApiPath.REACT,
        [ControllerHook.HANDLER]: this.react
      }
    ].forEach(this.route);
  };

  getOnes = req => this.#postService.getPosts(req.query);

  getById = req => this.#postService.getById(req.params.id);

  create = async req => {
    const post = await this.#postService.create(req.user.id, req.body);

    req.io
      .of(SocketNamespace.NOTIFICATION)
      .emit(NotificationSocketEvent.NEW_POST, post); // notify all users that a new post was created
    return post;
  };

  react = async req => {
    const reaction = await this.#postService.setReaction(req.user.id, req.body);

    if (reaction.post && reaction.post.userId !== req.user.id) {
      // notify a user if someone (not himself) liked his post
      req.io
        .of(SocketNamespace.NOTIFICATION)
        .to(`${reaction.post.userId}`)
        .emit(NotificationSocketEvent.LIKE_POST);
    }
    return reaction;
  };
}

export { Post };
