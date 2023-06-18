import { faker } from '@faker-js/faker';

import { CommentPayloadKey } from '#libs/enums/enums.js';

const COMMENTS_COUNT = 5;

const TEST_COMMENTS = Array.from({ length: COMMENTS_COUNT }, () => ({
  [CommentPayloadKey.BODY]: faker.lorem.paragraph()
}));

export { TEST_COMMENTS };
