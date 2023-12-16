import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { type User } from '~/packages/user/user.js';

import { type GetCrudHandlersFunction } from '../../../../libs/packages/database/libs/types/types.js';
import { TEST_POSTS } from '../../libs/constants/constants.js';

const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const setupTestPosts = async ({
  handlers: { select, insert }
}: Record<
  'handlers',
  Pick<ReturnType<GetCrudHandlersFunction>, 'select' | 'insert'>
>): Promise<void> => {
  const testUsers = (await select<User>({
    table: DatabaseTableName.USERS
  })) as User[];

  const postsToInsert = TEST_POSTS.map(post => ({
    ...post,
    userId: (testUsers[getRandomIndex(testUsers.length)] as User).id
  }));

  await insert({
    table: DatabaseTableName.POSTS,
    data: postsToInsert
  });
};

export { setupTestPosts };
