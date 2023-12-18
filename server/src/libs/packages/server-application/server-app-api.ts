import { type Controller } from '../controller/controller.js';
import { type ServerApi } from './libs/types/types.js';

type Constructor = {
  controllers: Controller[];
};

class ServerAppApi implements ServerApi {
  #controllers: Controller[];

  public constructor({ controllers }: Constructor) {
    this.#controllers = controllers;
  }

  public get controllers(): Controller[] {
    return this.#controllers;
  }
}

export { ServerAppApi };
