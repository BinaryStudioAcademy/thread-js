import {
  HttpCode,
  HttpMethod,
  ControllerHook,
  CommentsApiPath
} from '../../common/enums/enums.js';
import { Controller } from '../abstract/abstract.controller.js';

class Comment extends Controller {
  #commentService;

  constructor({ app, apiPath, commentService }) {
    super({
      app,
      apiPath
    });
    this.#commentService = commentService;
  }

  initRoutes = () => {
    [
      {
        method: HttpMethod.GET,
        url: CommentsApiPath.$ID,
        [ControllerHook.HANDLER]: this.getById
      },
      {
        method: HttpMethod.POST,
        url: CommentsApiPath.ROOT,
        [ControllerHook.HANDLER]: this.create
      }
    ].forEach(this.route);
  };

  getById = async req => this.#commentService.getById(req.params.id);

  create = async (req, res) => {
    const comment = await this.#commentService.create(req.user.id, req.body);

    return res.status(HttpCode.CREATED).send(comment);
  };
}

export { Comment };
