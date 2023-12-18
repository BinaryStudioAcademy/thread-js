import { AbstractRepository } from '~/libs/packages/database/database.js';

import { type ImageModel } from './image.model.js';
import {
  type Image as TImage,
  type ImageRepository
} from './libs/types/types.js';

type Constructor = Record<'imageModel', typeof ImageModel>;

class Image
  extends AbstractRepository<typeof ImageModel, TImage>
  implements ImageRepository
{
  public constructor({ imageModel }: Constructor) {
    super(imageModel);
  }
}

export { Image };
