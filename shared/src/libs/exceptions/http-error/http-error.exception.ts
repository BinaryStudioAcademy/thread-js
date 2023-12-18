import { type ValueOf } from '~/libs/types/types.js';

import { ExceptionName } from '../../enums/enums.js';
import { HttpCode } from '../../packages/http/http.js';

const DEFAULT_MESSAGE = 'Network Error';

type Constructor = {
  status: ValueOf<typeof HttpCode>;
  message: string;
};

class HttpError extends Error {
  public status: ValueOf<typeof HttpCode>;

  public constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE
  }: Partial<Constructor> = {}) {
    super(message);
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HttpError };
