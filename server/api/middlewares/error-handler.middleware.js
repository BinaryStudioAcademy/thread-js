export default (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    } else {
        const { status = 500, message = '' } = err;
        res.status(status).send({ status, message });
    }
};
