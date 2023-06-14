import qs from 'qs';
import { ServerApp } from './server-app.js';
import { config } from '#libs/packages/config/config.js';

const serverApp = new ServerApp({
  config,
  options: {
    prefixAvoidTrailingSlash: true,
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  },
  querystringParser: str => qs.parse(str, { comma: true })
});

export { ServerApp, serverApp };
export { ExitCode } from './libs/enums/enums.js';
