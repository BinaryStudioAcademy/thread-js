import qs from 'qs';

import { config } from '#libs/packages/config/config.js';

import { ServerApp } from './server-app.js';

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
  querystringParser: string => qs.parse(string, { comma: true })
});

export { serverApp };
export { ExitCode } from './libs/enums/enums.js';
export { ServerApp } from './server-app.js';
