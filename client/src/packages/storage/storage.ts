import { Storage as StorageApi } from './storage-api.js';

const storageApi = new StorageApi({
  storage: localStorage
});

export { storageApi };
export { type StorageApi } from './libs/types/types.js';
