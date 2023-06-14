/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, beforeAll } from '@jest/globals';

import { config } from '#libs/packages/config/config.js';
import { ServerApp } from '#libs/packages/server-application/server-application.js';

const buildApp = () => {
  const { app } = new ServerApp({
    config,
    options: {
      logger: false
    }
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
