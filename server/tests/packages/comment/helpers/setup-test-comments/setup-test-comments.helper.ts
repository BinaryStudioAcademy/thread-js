import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { type Post } from '~/packages/post/post.js';
import { type User } from '~/packages/user/user.js';

import { type GetCrudHandlersFunction } from '../../../../libs/packages/database/libs/types/types.js';
import { TEST_COMMENTS } from '../../libs/constants/constants.js';

const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const setupTestComments = async ({
  handlers: { select, insert }
}: Record<
  'handlers',
  Pick<ReturnType<GetCrudHandlersFunction>, 'select' | 'insert'>
>): Promise<void> => {
  const testUsers = (await select<User>({
    table: DatabaseTableName.USERS
  })) as User[];

  const testPosts = (await select<Post>({
    table: DatabaseTableName.POSTS
  })) as Post[];

  const commentsToInsert = TEST_COMMENTS.map(comment => ({
    ...comment,
    userId: (testUsers[getRandomIndex(testUsers.length)] as User).id,
    postId: (testPosts[getRandomIndex(testPosts.length)] as Post).id
  }));

  await insert({
    table: DatabaseTableName.COMMENTS,
    data: commentsToInsert
  });
};

export { setupTestComments };
