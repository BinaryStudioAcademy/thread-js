import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    API_PATH: string;
    PORT: number;
    HOST: string;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    DATABASE: string;
    TEST_DATABASE: string;
    USERNAME: string;
    PASSWORD: string;
    HOST: string;
    PORT: number;
    POOL_MIN: number;
    POOL_MAX: number;
    CLIENT: string;
    DEBUG: boolean;
  };
  JWT: {
    SECRET: string;
    EXPIRES_IN: string;
  };
  GYAZO: {
    ACCESS_KEY: string;
    UPLOAD_API_URL: string;
    FILE_SIZE: number;
  };
};

export { type EnvironmentSchema };
