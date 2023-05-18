import { Storage } from './storage-api';

const storage = new Storage({
  storage: localStorage
});

export { storage };
