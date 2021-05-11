const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) { // http://expressjs.com/en/guide/error-handling.html
    next(err);
  } else {
    const { status = 500, message = '' } = err;
    res.status(status).send({ status, message });
  }
};

export { errorHandler };
