import { DatabaseTableName } from '#libs/packages/database/database.js';

import { TEST_COMMENTS } from '../../libs/constants/constants.js';

const getRandomIndex = length => Math.floor(Math.random() * length);

const setupTestComments = async ({ handlers: { select, insert } }) => {
  const testUsers = await select({
    table: DatabaseTableName.USERS
  });
  const testPosts = await select({
    table: DatabaseTableName.POSTS
  });
  const commentsToInsert = TEST_COMMENTS.map(comment => ({
    ...comment,
    userId: testUsers[getRandomIndex(testUsers.length)].id,
    postId: testPosts[getRandomIndex(testPosts.length)].id
  }));

  await insert({
    table: DatabaseTableName.COMMENTS,
    data: commentsToInsert
  });
};

export { setupTestComments };
