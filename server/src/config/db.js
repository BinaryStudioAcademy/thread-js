import { ENV } from '../common/enums/enums';

const {
  DATABASE: database,
  USERNAME: username,
  PASSWORD: password,
  HOST: host,
  PORT: port,
  DIALECT: dialect,
  LOGGING: logging
} = ENV.DB;

export { database, username, password, host, port, dialect, logging };
