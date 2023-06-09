import { ApiPath, ContentType } from 'libs/enums/enums';
import { HttpMethod } from 'packages/http/libs/enums/enums';

import { CommentsApiPath } from './libs/enums/enums';

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
