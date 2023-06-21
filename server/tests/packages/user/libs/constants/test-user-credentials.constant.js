import { faker } from '@faker-js/faker';

import { UserPayloadKey } from '#packages/user/user.js';

const USERS_COUNT = 2;

const TEST_USERS_CREDENTIALS = Array.from({ length: USERS_COUNT }, () => {
  return {
    [UserPayloadKey.USERNAME]: faker.person.firstName(),
    [UserPayloadKey.EMAIL]: faker.internet.email(),
    [UserPayloadKey.PASSWORD]: faker.internet.password()
  };
});

export { TEST_USERS_CREDENTIALS };
