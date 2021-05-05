import { HttpMethod, ContentType } from 'src/common/enums/enums';

class Auth {
  constructor({ http }) {
    this._http = http;
  }

  login(payload) {
    return this._http.load('/api/auth/login', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload)
    });
  }

  registration(payload) {
    return this._http.load('/api/auth/register', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload)
    });
  }

  getCurrentUser() {
    return this._http.load('/api/auth/user', {
      method: HttpMethod.GET
    });
  }
}

export { Auth };
