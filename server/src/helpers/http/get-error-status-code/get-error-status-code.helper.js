import { HttpCode, ExceptionName } from '../../../common/enums/enums.js';

const getErrorStatusCode = err => {
  const hasNameProp = Object.prototype.hasOwnProperty.call(err, 'name');
  if (!hasNameProp) {
    return HttpCode.INTERNAL_SERVER_ERROR;
  }

  switch (err.name) {
    case ExceptionName.INVALID_CREDENTIALS: {
      return HttpCode.UNAUTHORIZED;
    }
    default: {
      return HttpCode.INTERNAL_SERVER_ERROR;
    }
  }
};

export { getErrorStatusCode };
