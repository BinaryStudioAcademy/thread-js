import { HttpMethod, ContentType } from 'common/enums/enums';

class Comment {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getComment(id) {
    return this._http.load(`${this._apiPath}/comments/${id}`, {
      method: HttpMethod.GET
    });
  }

  addComment(payload) {
    return this._http.load(`${this._apiPath}/comments`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }
}

export { Comment };
