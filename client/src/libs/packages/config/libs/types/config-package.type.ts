import { type Configurable } from 'shared/dist/libs/packages/config/config.js';

import { type EnvironmentSchema } from './environment-schema.type.js';

type ConfigPackage = Configurable<EnvironmentSchema>;

export { type ConfigPackage };
