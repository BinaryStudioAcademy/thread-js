import qs from 'qs';
import { ENV, ExitCode } from './common/enums/enums.js';
import { buildServer } from './server.js';

(async () => {
  const { app, socketServer } = await buildServer({
    logger: {
      prettyPrint: {
        ignore: 'pid,hostname'
      }
    },
    querystringParser: str => qs.parse(str, { comma: true })
  });

  try {
    await app.listen(ENV.APP.PORT);
    await socketServer.listen(ENV.APP.SOCKET_PORT);
  } catch (err) {
    app.log.error(err);
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
