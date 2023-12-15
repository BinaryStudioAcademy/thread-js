import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { CommentsApiPath } from './libs/enums/enums.js';

class Comment {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getComment(id) {
    return this._http.load(
      `${this._apiPath}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET
      }
    );
  }

  addComment(payload) {
    return this._http.load(`${this._apiPath}${ApiPath.COMMENTS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }
}

export { Comment };
