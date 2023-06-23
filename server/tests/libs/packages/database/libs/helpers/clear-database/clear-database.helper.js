import { DatabaseTableName } from '#libs/packages/database/database.js';

import { getCrudHandlers } from '../get-crud-handlers/get-crud-handlers.js';

const clearDatabase = async getKnex => {
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
