import qs from 'qs';
import { ServerApp } from './server-app.js';

const serverApp = new ServerApp({
  prefixAvoidTrailingSlash: true,
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  },
  querystringParser: str => qs.parse(str, { comma: true })
});

export { ServerApp, serverApp };
