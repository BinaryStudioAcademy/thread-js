import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    PORT: number;
    HOST: string;
  };
  API: {
    SERVER: string;
    SOCKET_SERVER: string;
    PATH: string;
    SOCKET_PATH: string;
  };
};

export { type EnvironmentSchema };
