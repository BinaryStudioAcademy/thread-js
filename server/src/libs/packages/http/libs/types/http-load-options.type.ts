import { type RawAxiosRequestHeaders } from 'axios';

import { type ValueOf } from '~/libs/types/types.js';

import { type HttpMethod } from '../enums/enums.js';

type HttpLoadOptions<T> = {
  method: ValueOf<typeof HttpMethod>;
  data: T;
  headers: RawAxiosRequestHeaders;
};

export { type HttpLoadOptions };
