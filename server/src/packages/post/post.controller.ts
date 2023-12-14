import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type ApiPath } from '~/libs/enums/enums.js';
import {
  Controller,
  ControllerHook
} from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import {
  NotificationSocketEvent,
  SocketNamespace
} from '~/libs/packages/socket/socket.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type UserAuthResponse } from '../user/user.js';
import { PostsApiPath } from './libs/enums/enums.js';
import {
  type CreatePostReactionRequestDto,
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post as TPost,
  type PostController,
  type PostService,
  type PostWithCommentImageUserNestedRelationsWithCount
} from './libs/types/types.js';

type Constructor = {
  apiPath: ValueOf<typeof ApiPath>;
  postService: PostService;
};

class Post extends Controller implements PostController {
  #postService: PostService;

  public constructor({ apiPath, postService }: Constructor) {
    super({ apiPath });
    this.#postService = postService;

    this.addRoute({
      method: HttpMethod.GET,
      url: PostsApiPath.ROOT,
      [ControllerHook.HANDLER]: this.getByFilter
    });
    this.addRoute({
      method: HttpMethod.GET,
      url: PostsApiPath.$ID,
      [ControllerHook.HANDLER]: this.getById
    });
    this.addRoute({
      method: HttpMethod.POST,
      url: PostsApiPath.ROOT,
      [ControllerHook.HANDLER]: this.create
    });
    this.addRoute({
      method: HttpMethod.PUT,
      url: PostsApiPath.REACT,
      [ControllerHook.HANDLER]: this.react
    });
  }

  public getByFilter = (
    request: FastifyRequest<Record<'Querystring', GetPostsByFilterRequestDto>>
  ): Promise<GetPostsByFilterResponseDto> => {
    return this.#postService.getByFilter(request.query);
  };

  public getById = (
    request: FastifyRequest<Record<'Params', Record<'id', number>>>
  ): Promise<PostWithCommentImageUserNestedRelationsWithCount | null> => {
    return this.#postService.getById(request.params.id);
  };

  public create = async (
    request: FastifyRequest<Record<'Body', CreatePostRequestDto>>,
    reply: FastifyReply
  ): Promise<TPost> => {
    const post = await this.#postService.create(
      (request.user as UserAuthResponse).id,
      request.body
    );

    request.io
      .of(SocketNamespace.NOTIFICATION)
      .emit(NotificationSocketEvent.NEW_POST, post); // notify all users that a new post was created

    return await reply.status(HttpCode.CREATED).send(post);
  };

  public react = async (
    request: FastifyRequest<Record<'Body', CreatePostReactionRequestDto>>
  ): Promise<CreatePostReactionResponseDto> => {
    const authUserId = (request.user as UserAuthResponse).id;
    const reaction = await this.#postService.setReaction(
      authUserId,
      request.body
    );

    if (reaction.post && reaction.post.userId !== authUserId) {
      // notify a user if someone (not himself) liked his post
      request.io
        .of(SocketNamespace.NOTIFICATION)
        .to(`${reaction.post.userId}`)
        .emit(NotificationSocketEvent.LIKE_POST);
    }

    return reaction;
  };
}

export { Post };
