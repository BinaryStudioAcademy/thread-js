import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { type GetCrudHandlersFunction } from '../../types/types.js';
import { getCrudHandlers } from '../get-crud-handlers/get-crud-handlers.js';

const clearDatabase = async (
  getKnex: Parameters<GetCrudHandlersFunction>[0]
): Promise<void> => {
  const { remove } = getCrudHandlers(getKnex);

  const tables = [
    DatabaseTableName.COMMENTS,
    DatabaseTableName.POSTS,
    DatabaseTableName.USERS
  ];

  for (const table of tables) {
    await remove({ table });
  }
};

export { clearDatabase };
