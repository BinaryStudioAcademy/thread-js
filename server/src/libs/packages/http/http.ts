import { Http as HttpService } from './http.service.js';

const httpService = new HttpService();

export { httpService };
export { HttpCode, HttpHeader, HttpMethod } from './libs/enums/enums.js';
export { type HttpService } from './libs/types/types.js';
