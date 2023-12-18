import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';

import {
  type ConfigPackage,
  type EnvironmentSchema
} from './libs/types/types.js';

class Config implements ConfigPackage {
  #ENV: EnvironmentSchema;

  public constructor() {
    config();

    this.#envSchema.load({});
    this.#envSchema.validate({ allowed: 'strict' });
    this.#ENV = this.#envSchema.getProperties();
  }

  public get ENV(): EnvironmentSchema {
    return this.#ENV;
  }

  get #envSchema(): LibraryConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        API_PATH: '/api',
        HOST: {
          doc: 'Host for incoming connections',
          format: String,
          env: 'APP_HOST',
          default: null
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'APP_PORT',
          default: null
        },
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null
        }
      },
      JWT: {
        SECRET: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'SECRET_KEY',
          default: null
        },
        EXPIRES_IN: '24h'
      },
      DB: {
        DATABASE: {
          doc: 'Database name',
          format: String,
          env: 'DB_NAME',
          default: null
        },
        TEST_DATABASE: {
          doc: 'Test database name',
          format: String,
          env: 'TEST_DB_NAME',
          default: null
        },
        USERNAME: {
          doc: 'Database connection username',
          format: String,
          env: 'DB_USERNAME',
          default: null
        },
        PASSWORD: {
          doc: 'Database connection password',
          format: String,
          env: 'DB_PASSWORD',
          default: null
        },
        HOST: {
          doc: 'Database connection host',
          format: String,
          env: 'DB_HOST',
          default: null
        },
        PORT: {
          doc: 'Database connection port',
          format: Number,
          env: 'DB_PORT',
          default: null
        },
        CLIENT: {
          doc: 'Database connection client',
          format: String,
          env: 'DB_CLIENT',
          default: null
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null
        },
        DEBUG: {
          doc: 'Debug mode',
          format: Boolean,
          default: false
        }
      },
      GYAZO: {
        ACCESS_KEY: {
          doc: 'Gyazo access key',
          format: String,
          env: 'GYAZO_ACCESS_TOKEN',
          default: null
        },
        UPLOAD_API_URL: {
          doc: 'Gyazo upload api url',
          format: String,
          env: 'GYAZO_UPLOAD_API_URL',
          default: null
        },
        FILE_SIZE: 10_000_000
      }
    });
  }
}

export { Config };
