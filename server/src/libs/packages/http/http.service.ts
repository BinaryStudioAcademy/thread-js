import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from 'axios';

import { HttpMethod } from '~/libs/packages/http/http.js';

import { type HttpLoadOptions, type HttpService } from './libs/types/types.js';

class Http implements HttpService {
  #instance: AxiosInstance;

  public constructor() {
    this.#instance = axios.create({
      timeout: 5000
    });
  }

  public load<T, K>(url: string, options?: HttpLoadOptions<T>): Promise<K> {
    const { method = HttpMethod.GET, data, headers } = options ?? {};

    return this.#instance
      .request<T, K>({
        url,
        method,
        headers,
        data
      })
      .then(void this.#getData)
      .catch(void this.#catchError);
  }

  #getData<T>(response: AxiosResponse<T>): AxiosResponse<T>['data'] {
    return response.data;
  }

  #catchError<T = unknown>(error: AxiosError): never {
    const { response } = error;
    const { data } = response as AxiosResponse<T>;

    throw new Error((data as Error).toString());
  }
}

export { Http };
