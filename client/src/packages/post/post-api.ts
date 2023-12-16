import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { type HttpApi } from '../http/http.js';
import { PostsApiPath } from './libs/enums/enums.js';
import {
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostByIdResponseDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post as TPost,
  type PostApi
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
};

class Post implements PostApi {
  #apiPath: string;

  #httpApi: HttpApi;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public getByFilter(
    filter: GetPostsByFilterRequestDto
  ): Promise<GetPostsByFilterResponseDto> {
    return this.#httpApi.load(`${this.#apiPath}${ApiPath.POSTS}`, {
      method: HttpMethod.GET,
      query: filter
    });
  }

  public getById(id: number): Promise<GetPostByIdResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.POSTS}${PostsApiPath.ROOT}${id}`,
      { method: HttpMethod.GET }
    );
  }

  public create(payload: CreatePostRequestDto): Promise<TPost> {
    return this.#httpApi.load(`${this.#apiPath}${ApiPath.POSTS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }

  public likePost(postId: number): Promise<CreatePostReactionResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.POSTS}${PostsApiPath.REACT}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ postId, isLike: true })
      }
    );
  }
}

export { Post };
