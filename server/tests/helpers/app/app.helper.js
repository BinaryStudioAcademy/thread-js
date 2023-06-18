/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, beforeAll } from '@jest/globals';

import { config } from '#libs/packages/config/config.js';
import { ServerApp } from '#libs/packages/server-application/server-application.js';

const buildApp = () => {
  const { app, knex } = new ServerApp({
    config,
    options: {
      logger: false
    }
  });

  beforeAll(async () => {
    await knex.migrate.latest();

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await knex.migrate.rollback(undefined, true);
  });

  return { app, knex };
};

export { buildApp };
