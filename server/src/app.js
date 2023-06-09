import qs from 'qs';

import { App } from './server.js';

const appInstance = new App({
  prefixAvoidTrailingSlash: true,
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  },
  querystringParser: string_ => qs.parse(string_, { comma: true })
});

try {
  await appInstance.start();
} catch (error) {
  appInstance.log.error(error);
}
