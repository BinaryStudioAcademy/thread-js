import * as LibraryKnex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ConfigPackage } from '../config/config.js';
import { type DatabasePackage } from './libs/types/types.js';

/**
 * @description Type 'typeof import("PATH_TO_PROJECT/node_modules/knex/types/index")' has no call signatures. Issue: https://github.com/knex/knex/issues/5358
 */
const { knex: Knex } = LibraryKnex.default;

type Constructor = {
  config: ConfigPackage;
};

class Database implements DatabasePackage {
  #config: ConfigPackage;

  #knex!: LibraryKnex.Knex;

  public constructor({ config }: Constructor) {
    this.#config = config;
  }

  public get knex(): LibraryKnex.Knex {
    return this.#knex;
  }

  public connect(): void {
    const knex = Knex(this.environmentConfig);
    Model.knex(knex);

    this.#knex = knex;
  }

  public get environmentsConfig(): Record<
    ValueOf<typeof AppEnvironment>,
    LibraryKnex.Knex.Config
  > {
    const { TEST_DATABASE: testDatabase } = this.#config.ENV.DB;

    return {
      [AppEnvironment.DEVELOPMENT]: this.initialConfig,
      [AppEnvironment.PRODUCTION]: this.initialConfig,
      [AppEnvironment.TEST]: {
        ...this.initialConfig,
        connection: {
          ...(this.initialConfig
            .connection as LibraryKnex.Knex.StaticConnectionConfig),
          database: testDatabase
        }
      }
    };
  }

  public get initialConfig(): LibraryKnex.Knex.Config {
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

  public get environmentConfig(): LibraryKnex.Knex.Config {
    return this.environmentsConfig[this.#config.ENV.APP.ENVIRONMENT];
  }
}

export { Database };
