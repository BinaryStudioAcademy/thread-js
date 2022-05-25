import { HttpCode, ExceptionName } from '../../common/enums/enums.js';

const DEFAULT_MESSAGE = 'Network Error';

class HttpError extends Error {
  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE
  } = {}) {
    super(message);
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HttpError };
