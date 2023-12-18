import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { encryptSync } from '~/packages/auth/auth.js';

import { type GetCrudHandlersFunction } from '../../../../libs/packages/database/libs/types/types.js';
import { TEST_USERS_CREDENTIALS } from '../../libs/constants/constants.js';

const hash = (password: string): string => encryptSync(password);

const setupTestUsers = async ({
  handlers: { insert }
}: Record<
  'handlers',
  Pick<ReturnType<GetCrudHandlersFunction>, 'insert'>
>): Promise<void> => {
  const usersToInsert = TEST_USERS_CREDENTIALS.map(
    ({ password, ...credentials }) => ({
      ...credentials,
      password: hash(password)
    })
  );

  await insert({
    table: DatabaseTableName.USERS,
    data: usersToInsert
  });
};

export { setupTestUsers };
