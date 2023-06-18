import { knexSnakeCaseMappers } from 'objection';

import { AppEnvironment } from '#libs/enums/enums.js';

import { config } from './src/libs/packages/config/config.js';

const {
  DATABASE: database,
  TEST_DATABASE: testDatabase,
  USERNAME: username,
  PASSWORD: password,
  HOST: host,
  PORT: port,
  CLIENT: client,
  DEBUG: debug
} = config.ENV.DB;

const DEFAULT_ENV_CONFIG = {
  client,
  connection: {
    user: username,
    port,
    host,
    database,
    password
  },
  migrations: {
    directory: './src/db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  },
  debug,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
};

const knexConfig = {
  [AppEnvironment.DEVELOPMENT]: DEFAULT_ENV_CONFIG,
  [AppEnvironment.PRODUCTION]: DEFAULT_ENV_CONFIG,
  [AppEnvironment.TEST]: {
    ...DEFAULT_ENV_CONFIG,
    connection: {
      ...DEFAULT_ENV_CONFIG.connection,
      database: testDatabase
    }
  }
};

export default knexConfig;
