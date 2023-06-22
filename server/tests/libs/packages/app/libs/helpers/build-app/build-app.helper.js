import { afterAll, beforeAll } from '@jest/globals';
import pg from 'pg';

import { config } from '#libs/packages/config/config.js';
import { ServerApp } from '#libs/packages/server-application/server-application.js';

import { clearDatabase } from '../../../../database/database.js';

const buildApp = () => {
  const { app, knex } = new ServerApp({
    config,
    options: {
      logger: false
    }
  });

  beforeAll(async () => {
    const PG_TIMESTAMPTZ_OID = 1184;
    pg.types.setTypeParser(PG_TIMESTAMPTZ_OID, value => {
      return new Date(value).toISOString();
    });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();

    await clearDatabase(knex);
    await knex.destroy();
  });

  return { app, knex };
};

export { buildApp };
