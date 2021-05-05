import { StorageKey, HttpHeader, HttpMethod } from 'src/common/enums/enums';

class Http {
  constructor({ storage }) {
    this._storage = storage;
  }

  load(url, options = {}) {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = true,
      contentType
    } = options;
    const headers = this._getHeaders({
      hasAuth,
      contentType
    });

    return fetch(url, {
      method,
      headers,
      body: payload
    })
      .then(Http.checkStatus)
      .then(Http.parseJSON)
      .catch(Http.throwError);
  }

  _getHeaders({ hasAuth, contentType }) {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this._storage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  _checkStatus(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }

  _parseJSON(response) {
    return response.json();
  }

  _throwError(err) {
    throw err;
  }
}

export { Http };
