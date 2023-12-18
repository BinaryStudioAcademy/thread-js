import { type HttpLoadOptions } from './http-load-options.type.js';

type HttpService = {
  load<T, K>(_url: string, _options?: HttpLoadOptions<T>): Promise<K>;
};

export { type HttpService };
