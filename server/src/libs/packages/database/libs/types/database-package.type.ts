import { type Knex } from 'knex';

import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type DatabasePackage = {
  environmentsConfig: Record<ValueOf<typeof AppEnvironment>, Knex.Config>;
  initialConfig: Knex.Config;
  knex: Knex;
  connect(): void;
};

export { type DatabasePackage };
