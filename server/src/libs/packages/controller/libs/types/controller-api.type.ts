import { type ControllerRoute } from './controller-route.type.js';

type ControllerApi = {
  addRoute(_route: ControllerRoute): void;
};

export { type ControllerApi };
