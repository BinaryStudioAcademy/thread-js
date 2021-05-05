import { HttpMethod, ContentType } from 'src/common/enums/enums';

class Post {
  constructor({ http }) {
    this._http = http;
  }

  getAllPosts(filter) {
    return this._http.load('/api/posts', {
      method: HttpMethod.GET,
      query: filter
    });
  }

  getPost(id) {
    return this._http.load(`/api/posts/${id}`, {
      method: HttpMethod.GET
    });
  }

  addPost(payload) {
    return this._http.load('/api/posts', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }

  likePost(postId) {
    return this._http.load('/api/posts/react', {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        postId,
        isLike: true
      })
    });
  }
}

export { Post };
