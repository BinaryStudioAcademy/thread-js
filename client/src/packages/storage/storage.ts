import { Storage } from './storage-api.js';

const storage = new Storage({
  storage: localStorage
});

export { storage };
