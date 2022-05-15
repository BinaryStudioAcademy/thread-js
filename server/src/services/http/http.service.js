import axios from 'axios';
import { HttpMethod } from '../../common/enums/enums.js';

class Http {
  constructor() {
    this._instance = axios.create({
      timeout: 5000
    });
  }

  load(url, options = {}) {
    const { method = HttpMethod.GET, data, headers } = options;

    return this._instance
      .request({
        url,
        method,
        headers,
        data
      })
      .then(this._getData)
      .catch(this._catchError);
  }

  _getData(response) {
    return response.data;
  }

  _catchError(err) {
    const { response } = err;
    const { data } = response;

    throw new Error(data.toString());
  }
}

export { Http };
