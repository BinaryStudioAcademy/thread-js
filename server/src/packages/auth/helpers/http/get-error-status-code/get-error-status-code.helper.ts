import { ExceptionName } from '~/libs/enums/enums.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

const getErrorStatusCode = (error: Error): ValueOf<typeof HttpCode> => {
  const hasNameProperty = 'name' in error;

  if (!hasNameProperty) {
    return HttpCode.INTERNAL_SERVER_ERROR;
  }

  if (error.name === ExceptionName.INVALID_CREDENTIALS) {
    return HttpCode.UNAUTHORIZED;
  }

  return HttpCode.INTERNAL_SERVER_ERROR;
};

export { getErrorStatusCode };
