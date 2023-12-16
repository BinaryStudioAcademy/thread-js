import { storageApi } from '~/packages/storage/storage.js';

import { Http as HttpApi } from './http-api.js';

const httpApi = new HttpApi({
  storageApi
});

export { httpApi };
export { type HttpApi, type HttpOptions } from './libs/types/types.js';
