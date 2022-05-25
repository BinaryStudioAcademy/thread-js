import Joi from 'joi';
import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule
} from '../../common/enums/enums.js';

const registration = Joi.object({
  [UserPayloadKey.USERNAME]: Joi.string()
    .trim()
    .min(UserValidationRule.USERNAME_MIN_LENGTH)
    .max(UserValidationRule.USERNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.USERNAME_REQUIRE,
      'string.min': UserValidationMessage.USERNAME_MIN_LENGTH,
      'string.max': UserValidationMessage.USERNAME_MAX_LENGTH
    }),
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE
    }),
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH
    })
});

export { registration };
