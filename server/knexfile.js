import { knexSnakeCaseMappers } from 'objection';
import { config } from './src/libs/packages/config/config.js';

const {
  DATABASE: database,
  USERNAME: username,
  PASSWORD: password,
  HOST: host,
  PORT: port,
  CLIENT: client,
  DEBUG: debug
} = config.ENV.DB;

const knexConfig = {
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

export default knexConfig;
