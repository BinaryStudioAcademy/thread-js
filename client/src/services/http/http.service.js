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
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError);
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

  async _checkStatus(response) {
    if (!response.ok) {
      const parsedException = await response.json();

      throw new Error(parsedException?.message ?? response.statusText);
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
