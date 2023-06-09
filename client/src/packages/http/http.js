import { storage } from 'packages/storage/storage';

import { Http } from './http-api';

const http = new Http({
  storage
});

export { http };
