import Joi from 'joi';

import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule
} from '../../../user/user.js';

const login = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE
    }),
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'any.required': UserValidationMessage.PASSWORD_REQUIRE,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH
    })
});

export { login };
