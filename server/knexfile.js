import { knexSnakeCaseMappers } from 'objection';
import { ENV } from './src/common/enums/enums.js';

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
    directory: './src/data/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './src/data/seeds'
  },
  debug,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
};

export default knexConfig;
