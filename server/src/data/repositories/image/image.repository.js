import { Abstract } from '../abstract/abstract.repository.js';

class Image extends Abstract {
  constructor({ imageModel }) {
    super(imageModel);
  }
}

export { Image };
