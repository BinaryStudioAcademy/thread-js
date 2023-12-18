import { type HttpOptions } from './http-options.type.js';

type HttpApi = {
  load<T>(url: string, options: Partial<HttpOptions>): Promise<T> | never;
};

export { type HttpApi };
