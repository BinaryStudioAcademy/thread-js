import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { AppEnvironment } from '#libs/enums/enums.js';

class Database {
  #config;

  #knex;

  constructor({ config }) {
    this.#config = config;
  }

  get knex() {
    return this.#knex;
  }

  connect() {
    const knex = Knex(this.environmentConfig);
    Model.knex(knex);

    this.#knex = knex;
  }

  get environmentsConfig() {
    const { TEST_DATABASE: testDatabase } = this.#config.ENV.DB;

    return {
      [AppEnvironment.DEVELOPMENT]: this.initialConfig,
      [AppEnvironment.PRODUCTION]: this.initialConfig,
      [AppEnvironment.TEST]: {
        ...this.initialConfig,
        connection: {
          ...this.initialConfig.connection,
          database: testDatabase
        }
      }
    };
  }

  get initialConfig() {
    const {
      DATABASE: database,
      USERNAME: username,
      PASSWORD: password,
      HOST: host,
      PORT: port,
      CLIENT: client,
      DEBUG: debug
    } = this.#config.ENV.DB;

    return {
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
  }

  get environmentConfig() {
    return this.environmentsConfig[this.#config.ENV.APP.ENVIRONMENT];
  }
}

export { Database };
