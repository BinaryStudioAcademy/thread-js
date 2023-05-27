import { ExitCode } from './libs/enums/enums.js';
import { serverApp } from './libs/packages/server-application/server-application.js';

(async () => {
  try {
    await serverApp.start();
  } catch (err) {
    serverApp.log.error(err);
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
