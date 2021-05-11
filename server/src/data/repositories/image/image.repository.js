import { Abstract } from '../abstract/abstract.repository';

class Image extends Abstract {
  constructor({ imageModel }) {
    super(imageModel);
  }
}

export { Image };
