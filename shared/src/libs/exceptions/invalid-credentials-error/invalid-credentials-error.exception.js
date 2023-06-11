import { ExceptionMessage,ExceptionName } from '../../enums/enums.js';

class InvalidCredentialsError extends Error {
  constructor(message = ExceptionMessage.INCORRECT_EMAIL) {
    super(message);
    this.name = ExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
