const ExceptionMessage = {
  UNKNOWN_ERROR: 'Unknown error occurred.',
  EMAIL_ALREADY_EXISTS: 'Email is already taken.',
  INCORRECT_EMAIL: 'Incorrect email.',
  INVALID_TOKEN: 'Token is invalid.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  USERNAME_ALREADY_EXISTS: 'Username is already taken.',
  USER_WITH_EMAIL_NOT_FOUND: 'User with this email not found.'
} as const;

export { ExceptionMessage };
