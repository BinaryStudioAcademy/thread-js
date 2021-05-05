import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({
  storage: localStorage
});

const http = new Http({
  storage
});

export { http, storage };
