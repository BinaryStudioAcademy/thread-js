import { serverApp } from './libs/packages/server-application/server-application.js';

try {
  await serverApp.start();
} catch (error) {
  serverApp.log.error(error);
}
