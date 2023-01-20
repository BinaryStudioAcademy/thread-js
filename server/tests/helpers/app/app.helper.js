/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, beforeAll } from '@jest/globals';

import { buildServer } from '../../../src/server.js';

const buildApp = () => {
  const { app } = buildServer({
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
