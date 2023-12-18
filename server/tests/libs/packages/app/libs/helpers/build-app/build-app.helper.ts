import { afterAll, beforeAll } from '@jest/globals';
import { type FastifyInstance } from 'fastify';
import { type Knex } from 'knex';
import pg from 'pg';

import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import {
  ServerApp,
  serverAppApi
} from '~/libs/packages/server-application/server-application.js';

import { clearDatabase } from '../../../../database/database.js';

type BuildApp = () => {
  getApp: () => FastifyInstance;
  getKnex: () => Knex;
};

const buildApp: BuildApp = () => {
  const serverApp = new ServerApp({
    config,
    options: {
      logger: false
    },
    api: serverAppApi,
    database
  });

  beforeAll(async () => {
    const PG_TIMESTAMPTZ_OID = 1184;
    pg.types.setTypeParser(PG_TIMESTAMPTZ_OID, (value: string) => {
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

  const getApp = (): FastifyInstance => serverApp.app;
  const getKnex = (): Knex => serverApp.database.knex;

  return { getApp, getKnex };
};

export { buildApp };
