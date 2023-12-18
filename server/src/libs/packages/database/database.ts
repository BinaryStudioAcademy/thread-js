import { config } from '~/libs/packages/config/config.js';

import { Database } from './database.package.js';

const database = new Database({ config });

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { Abstract as AbstractRepository } from './abstract.repository.js';
export { DatabaseTableName } from './libs/enums/enums.js';
export { type DatabasePackage, type Repository } from './libs/types/types.js';
