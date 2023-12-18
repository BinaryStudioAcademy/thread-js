import { joinPath } from '~/libs/packages/path/path.js';

import {
  type ControllerApi,
  type ControllerRoute
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
};

class Controller implements ControllerApi {
  #apiPath: string;

  #routes: ControllerRoute[] = [];

  public get routes(): ControllerRoute[] {
    return this.#routes;
  }

  public constructor({ apiPath }: Constructor) {
    this.#apiPath = apiPath;
  }

  public addRoute = ({ url, ...options }: ControllerRoute): void => {
    this.#routes.push({
      url: joinPath([this.#apiPath, url]),
      ...options
    });
  };
}

export { Controller };
