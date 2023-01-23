import { joinPath, normalizeTrailingSlash } from '../../helpers/helpers.js';

class Controller {
  #app;

  #apiPath;

  constructor({ app, apiPath }) {
    this.#app = app;
    this.#apiPath = apiPath;
  }

  route = ({ url, ...options }) => {
    this.#app.route({
      url: normalizeTrailingSlash(joinPath(this.#apiPath, url)),
      ...options
    });
  };

  initRoutes() {}
}

export { Controller };
