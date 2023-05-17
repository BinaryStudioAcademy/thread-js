import { storage } from 'packages/storage/storage.js';
import { Http } from './http-api.js';

const http = new Http({
  storage
});

export { http };
