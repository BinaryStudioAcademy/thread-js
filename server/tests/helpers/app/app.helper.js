/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, beforeAll } from '@jest/globals';

import { ServerApp } from '../../../src/libs/packages/server-application/server-application.js';

const buildApp = () => {
  const { app } = new ServerApp({
    logger: false
  });

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  return app;
};

export { buildApp };
