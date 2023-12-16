import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type HttpMethod } from '../enums/enums.js';

type HttpOptions = {
  method: ValueOf<typeof HttpMethod>;
  payload: BodyInit | null;
  headers: Headers;
  hasAuth: boolean;
  query: Record<string, unknown>;
  contentType: ValueOf<typeof ContentType>;
};

export { type HttpOptions };
