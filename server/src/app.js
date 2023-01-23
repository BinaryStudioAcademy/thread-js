import qs from 'qs';
import { ExitCode } from './common/enums/enums.js';
import { App } from './server.js';

(async () => {
  const appInstance = new App({
    prefixAvoidTrailingSlash: true,
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    },
    querystringParser: str => qs.parse(str, { comma: true })
  });

  try {
    await appInstance.start();
  } catch (err) {
    appInstance.log.error(err);
    process.exit(ExitCode.ERROR);
  }
})();

process.on('unhandledRejection', error => {
  console.error(error);
});

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});
