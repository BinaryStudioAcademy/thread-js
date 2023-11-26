/* eslint-disable unicorn/no-array-reduce */
const pipe = (...fns) => {
  return parameters => {
    return fns.reduce(
      (previousResult, callback) => callback(previousResult),
      parameters
    );
  };
};

export { pipe };
