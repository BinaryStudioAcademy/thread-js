import { DatabaseTableName } from '#libs/packages/database/database.js';

import { TEST_POSTS } from '../../libs/constants/constants.js';

const getRandomIndex = length => Math.floor(Math.random() * length);

const setupTestPosts = async ({ handlers: { select, insert } }) => {
  const testUsers = await select({
    table: DatabaseTableName.USERS
  });
  const postsToInsert = TEST_POSTS.map(post => ({
    ...post,
    userId: testUsers[getRandomIndex(testUsers.length)].id
  }));

  await insert({
    table: DatabaseTableName.POSTS,
    data: postsToInsert
  });
};

export { setupTestPosts };
