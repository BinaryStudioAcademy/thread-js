import { ContentType, StorageKey } from '~/libs/enums/enums.js';
import { getStringifiedQuery } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type StorageApi } from '../storage/storage.js';
import { type HttpCode } from './libs/enums/enums.js';
import { HttpHeader, HttpMethod } from './libs/enums/enums.js';
import { HttpError } from './libs/exceptions/exceptions.js';
import { type HttpApi, type HttpOptions } from './libs/types/types.js';

type Constructor = {
  storageApi: StorageApi;
};

class Http implements HttpApi {
  #storageApi: StorageApi;

  public constructor({ storageApi }: Constructor) {
    this.#storageApi = storageApi;
  }

  public async load<T>(
    url: string,
    options: Partial<HttpOptions> = {}
  ): Promise<T> | never {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = true,
      contentType = ContentType.JSON,
      query
    } = options;
    const headers = this.#getHeaders({
      hasAuth,
      contentType
    });

    return await fetch(this.#getUrl(url, query), {
      method,
      headers,
      body: payload
    })
      .then(this.#checkStatus)
      .then<T>(this.#parseJSON)
      .catch(this.#throwError);
  }

  #getHeaders({
    hasAuth,
    contentType
  }: Pick<HttpOptions, 'hasAuth' | 'contentType'>): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storageApi.get(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  #checkStatus = async (response: Response): Promise<Response> => {
    if (!response.ok) {
      const parsedException = (await response.json().catch(() => ({
        message: response.statusText
      }))) as Record<'message', string>;

      throw new HttpError({
        status: response.status as ValueOf<typeof HttpCode>,
        message: parsedException?.message
      });
    }

    return response;
  };

  #getUrl = <T extends Record<string, unknown>>(
    url: string,
    query: T | undefined
  ): string => {
    if (query) {
      return `${url}?${getStringifiedQuery(query)}`;
    }

    return url;
  };

  #parseJSON = <T>(response: Response): Promise<T> => {
    return response.json() as Promise<T>;
  };

  #throwError = (error: Error): never => {
    throw error;
  };
}

export { Http };
