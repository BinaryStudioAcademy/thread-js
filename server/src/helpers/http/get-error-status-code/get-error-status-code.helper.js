import { ExceptionName, HttpCode } from '../../../common/enums/enums.js';

const getErrorStatusCode = error => {
  const hasNameProperty = Object.prototype.hasOwnProperty.call(error, 'name');
  if (!hasNameProperty) {
    return HttpCode.INTERNAL_SERVER_ERROR;
  }

  if (error.name === ExceptionName.INVALID_CREDENTIALS) {
    return HttpCode.UNAUTHORIZED;
  }

  return HttpCode.INTERNAL_SERVER_ERROR;
};

export { getErrorStatusCode };
