import { type Configurable } from 'shared/dist/libs/packages/config/config.js';

import { type EnvironmentSchema } from './types.js';

type ConfigPackage = Configurable<EnvironmentSchema>;

export { type ConfigPackage };
