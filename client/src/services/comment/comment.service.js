import { HttpMethod, ContentType } from 'common/enums/enums';

class Comment {
  constructor({ http }) {
    this._http = http;
  }

  getComment(id) {
    return this._http.load(`/api/comments/${id}`, {
      method: HttpMethod.GET
    });
  }

  addComment(payload) {
    return this._http.load('/api/comments', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }
}

export { Comment };
