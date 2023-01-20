import { it, describe, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
  ENV,
  ApiPath,
  HttpCode,
  AuthApiPath,
  UserPayloadKey,
  UserValidationRule,
  UserValidationMessage
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.AUTH} routes`, () => {
  const app = buildApp();

  describe(`${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER} endpoints`, () => {
    it(
      `should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.USERNAME} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({});

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.USERNAME_REQUIRE);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.USERNAME} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.USERNAME]: faker.random.alpha(
              UserValidationRule.USERNAME_MIN_LENGTH - 1
            ),
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.PASSWORD]: faker.internet.password()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.USERNAME_MIN_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.USERNAME} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.USERNAME]: faker.random.alpha(
              UserValidationRule.USERNAME_MAX_LENGTH + 2
            ),
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.PASSWORD]: faker.internet.password()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.USERNAME_MAX_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.USERNAME]: faker.name.firstName(),
            [UserPayloadKey.PASSWORD]: faker.internet.password()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRE);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.name.firstName(),
            [UserPayloadKey.USERNAME]: faker.name.firstName(),
            [UserPayloadKey.PASSWORD]: faker.internet.password()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.EMAIL_WRONG);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.USERNAME]: faker.name.firstName()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_REQUIRE);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.USERNAME]: faker.name.firstName(),
            [UserPayloadKey.PASSWORD]: faker.internet.password(
              UserValidationRule.PASSWORD_MIN_LENGTH - 2
            )
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_MIN_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.USERNAME]: faker.name.firstName(),
            [UserPayloadKey.PASSWORD]: faker.internet.password(
              UserValidationRule.PASSWORD_MAX_LENGTH + 2
            )
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_MAX_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.CREATED} and create a new user`,
      async () => {
        const testUser = {
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        };

        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body(testUser);

        expect(response.statusCode).toBe(HttpCode.CREATED);
        expect(response.json()).toEqual(expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
          })
        }));
      }
    );
  });

  describe(`${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN} endpoints`, () => {
    it(
      `should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({});

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRE);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({ [UserPayloadKey.EMAIL]: faker.name.fullName() });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.EMAIL_WRONG);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email()
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_REQUIRE);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.PASSWORD]: faker.internet.password(
              UserValidationRule.PASSWORD_MIN_LENGTH - 2
            )
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_MIN_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`,
      async () => {
        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({
            [UserPayloadKey.EMAIL]: faker.internet.email(),
            [UserPayloadKey.PASSWORD]: faker.internet.password(
              UserValidationRule.PASSWORD_MAX_LENGTH + 2
            )
          });

        expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(response.json().message).toBe(UserValidationMessage.PASSWORD_MAX_LENGTH);
      }
    );

    it(
      `should return ${HttpCode.OK} with auth result`,
      async () => {
        const testUser = {
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        };

        await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body(testUser);

        const response = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.LOGIN}`
          )
          .body({
            [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL],
            [UserPayloadKey.PASSWORD]: testUser[UserPayloadKey.PASSWORD]
          });

        expect(response.statusCode).toBe(HttpCode.OK);
        expect(response.json()).toEqual(expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
          })
        }));
      }
    );
  });

  describe(`${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.USER} endpoints`, () => {
    it(
      `should return ${HttpCode.OK} with auth user`,
      async () => {
        const testUser = {
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        };

        const registerResponse = await app.inject()
          .post(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
          )
          .body(testUser);

        const response = await app.inject()
          .get(
            `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.USER}`
          )
          .headers({ authorization: `Bearer ${registerResponse.json().token}` });

        expect(response.statusCode).toBe(HttpCode.OK);
        expect(response.json()).toEqual(expect.objectContaining({
          [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
          [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
        }));
      }
    );
  });
});
