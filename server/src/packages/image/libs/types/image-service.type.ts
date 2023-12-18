import { type File } from 'fastify-multer/lib/interfaces.js';

import { type Image } from './types.js';

type ImageService = {
  upload(_file: File): Promise<Image>;
};

export { type ImageService };
