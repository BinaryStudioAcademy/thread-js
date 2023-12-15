import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/packages/http/libs/enums/enums.js';

import { AuthApiPath } from './libs/enums/enums.js';

class Auth {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  login(payload) {
    return this._http.load(
      `${this._apiPath}${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload)
      }
    );
  }

  registration(payload) {
    return this._http.load(
      `${this._apiPath}${ApiPath.AUTH}${AuthApiPath.REGISTER}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload)
      }
    );
  }

  getCurrentUser() {
    return this._http.load(
      `${this._apiPath}${ApiPath.AUTH}${AuthApiPath.USER}`,
      {
        method: HttpMethod.GET
      }
    );
  }
}

export { Auth };
