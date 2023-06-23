class ServerAppApi {
  #controllers;

  constructor({ controllers }) {
    this.#controllers = controllers;
  }

  get controllers() {
    return this.#controllers;
  }
}

export { ServerAppApi };
