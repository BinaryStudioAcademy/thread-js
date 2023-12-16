import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { type HttpApi } from '../http/http.js';
import { CommentsApiPath } from './libs/enums/enums.js';
import {
  type Comment as TComment,
  type CommentApi,
  type CreateCommentRequestDto,
  type GetCommentByIdResponseDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
};

class Comment implements CommentApi {
  #apiPath: string;

  #httpApi: HttpApi;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public getComment(id: number): Promise<GetCommentByIdResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET
      }
    );
  }

  public addComment(payload: CreateCommentRequestDto): Promise<TComment> {
    return this.#httpApi.load(`${this.#apiPath}${ApiPath.COMMENTS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }
}

export { Comment };
