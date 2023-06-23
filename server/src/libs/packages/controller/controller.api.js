import { getJoinedNormalizedPath } from '#libs/packages/path/path.js';

class Controller {
  #apiPath;

  #routes = [];

  get routes() {
    return this.#routes;
  }

  constructor({ apiPath }) {
    this.#apiPath = apiPath;
  }

  addRoute = ({ url, ...options }) => {
    this.#routes.push({
      url: getJoinedNormalizedPath([this.#apiPath, url]),
      ...options
    });
  };
}

export { Controller };
