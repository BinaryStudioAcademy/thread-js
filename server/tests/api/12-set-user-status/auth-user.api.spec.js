import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
  ENV,
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  UsersApiPath,
  UserPayloadKey
} from '../../../src/common/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '../../../src/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(joinPath(
  ENV.APP.API_PATH,
  ApiPath.USERS
))} and ${normalizeTrailingSlash(joinPath(
  ENV.APP.API_PATH,
  ApiPath.AUTH
))} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMain;

  const registerEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.AUTH,
    AuthApiPath.REGISTER
  ));

  const userEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.POSTS,
    UsersApiPath.$ID
  ));

  beforeAll(async () => {
    const testMainUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const testMinorUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerMainUserResponse = await app.inject()
      .post(registerEndpoint)
      .body(testMainUser);

    const registerMinorUserResponse = await app.inject()
      .post(registerEndpoint)
      .body(testMinorUser);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;
    userMain = registerMainUserResponse.json().user;
  });

  const authUserEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.AUTH,
    AuthApiPath.USER
  ));

  describe(
    `${userEndpoint} (${HttpMethod.PUT}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with user's status`,
        async () => {
          const updatedMainUser = {
            ...userMain,
            [UserPayloadKey.STATUS]: faker.lorem.words()
          };
          const response = await app.inject()
            .put(userEndpoint.replace(
              ':id',
              userMain.id
            ))
            .headers({ authorization: `Bearer ${tokenMainUser}` })
            .body(updatedMainUser);

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual(expect.objectContaining({
            id: userMain.id,
            [UserPayloadKey.STATUS]: updatedMainUser[UserPayloadKey.STATUS]
          }));
        }
      );

      it(
        `should return ${HttpCode.FORBIDDEN} with attempt to update user by not own one`,
        async () => {
          const updatedMainUser = {
            ...userMain,
            [UserPayloadKey.STATUS]: faker.lorem.words()
          };

          const updateUserResponse = await app.inject()
            .put(userEndpoint.replace(
              ':id',
              userMain.id
            ))
            .headers({ authorization: `Bearer ${tokenMinorUser}` })
            .body(updatedMainUser);

          const getUserResponse = await app.inject()
            .get(userEndpoint.replace(
              ':id',
              userMain.id
            ))
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          expect(updateUserResponse.statusCode).toBe(HttpCode.FORBIDDEN);
          expect(getUserResponse.json()).toEqual(userMain);
        }
      );
    }
  );

  describe(`${authUserEndpoint} endpoints`, () => {
    it(
      `should return ${HttpCode.OK} with auth user`,
      async () => {
        const response = await app.inject()
          .get(authUserEndpoint)
          .headers({ authorization: `Bearer ${tokenMainUser}` });

        expect(response.statusCode).toBe(HttpCode.OK);
        expect(response.json()).toEqual(expect.objectContaining(userMain));
        expect(response.json()).toHaveProperty('status');
      }
    );
  });
});
