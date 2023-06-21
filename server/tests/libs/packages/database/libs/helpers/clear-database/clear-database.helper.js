import { DatabaseTableName } from '#libs/packages/database/database.js';

import { getCrudHandlers } from '../get-crud-handlers/get-crud-handlers.js';

const clearDatabase = async knex => {
  const { remove } = getCrudHandlers(knex);

  const tables = [
    DatabaseTableName.COMMENTS,
    DatabaseTableName.POSTS,
    DatabaseTableName.USERS
  ];

  for (const table of tables) {
    await remove({
      table
    });
  }
};

export { clearDatabase };
