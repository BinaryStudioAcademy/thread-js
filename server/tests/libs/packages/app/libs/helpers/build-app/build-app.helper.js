import { afterAll, beforeAll } from '@jest/globals';
import pg from 'pg';

import { config } from '#libs/packages/config/config.js';
import {
  ServerApp,
  serverAppApi
} from '#libs/packages/server-application/server-application.js';

import { clearDatabase } from '../../../../database/database.js';

const buildApp = () => {
  const serverApp = new ServerApp({
    config,
    options: {
      logger: false
    },
    api: serverAppApi
  });

  beforeAll(async () => {
    const PG_TIMESTAMPTZ_OID = 1184;
    pg.types.setTypeParser(PG_TIMESTAMPTZ_OID, value => {
      return new Date(value).toISOString();
    });

    await serverApp.initialize();
    await getApp().ready();
  });

  afterAll(async () => {
    await getApp().close();

    await clearDatabase(getKnex);
    await getKnex().destroy();
  });

  const getApp = () => serverApp.app;
  const getKnex = () => serverApp.knex;

  return { getApp, getKnex };
};

export { buildApp };
