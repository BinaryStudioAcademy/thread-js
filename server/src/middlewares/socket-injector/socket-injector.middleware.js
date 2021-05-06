const socketInjector = io => (req, _res, next) => {
  req.io = io;
  next();
};

export { socketInjector };
