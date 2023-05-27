import { knexSnakeCaseMappers } from 'objection';
import { ENV } from './src/libs/enums/enums.js';

const {
  DATABASE: database,
  USERNAME: username,
  PASSWORD: password,
  HOST: host,
  PORT: port,
  CLIENT: client,
  DEBUG: debug
} = ENV.DB;

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
