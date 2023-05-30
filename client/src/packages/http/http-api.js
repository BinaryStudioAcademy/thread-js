import { StorageKey } from 'libs/enums/enums';
import { getStringifiedQuery } from 'libs/helpers/helpers';

import { HttpHeader, HttpMethod } from './libs/enums/enums';
import { HttpError } from './libs/exceptions/exceptions';

class Http {
  constructor({ storage }) {
    this._storage = storage;
  }

  load(url, options = {}) {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = true,
      contentType,
      query
    } = options;
    const headers = this._getHeaders({
      hasAuth,
      contentType
    });

    return fetch(this._getUrl(url, query), {
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
      const parsedException = await response.json().catch(() => ({
        message: response.statusText
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message
      });
    }

    return response;
  }

  _getUrl(url, query) {
    if (query) {
      return `${url}?${getStringifiedQuery(query)}`;
    }
    return url;
  }

  _parseJSON(response) {
    return response.json();
  }

  _throwError(error) {
    throw error;
  }
}

export { Http };
