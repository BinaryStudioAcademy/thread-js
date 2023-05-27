import { AbstractRepository } from '../../libs/packages/database/database.js';

class ImageRepository extends AbstractRepository {
  constructor({ imageModel }) {
    super(imageModel);
  }
}

export { ImageRepository };
