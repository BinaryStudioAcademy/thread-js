import { type FastifyRequest } from 'fastify';

import { type UploadImageResponseDto } from './types.js';

type ImageController = {
  upload: (_request: FastifyRequest) => Promise<UploadImageResponseDto>;
};

export { type ImageController };
