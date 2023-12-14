import { faker } from '@faker-js/faker';

import { PostPayloadKey } from '~/packages/post/post.js';

const POSTS_COUNT = 5;

const TEST_POSTS = Array.from({ length: POSTS_COUNT }, () => ({
  [PostPayloadKey.BODY]: faker.lorem.paragraph()
}));

export { TEST_POSTS };
