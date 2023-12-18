import { type UploadImageResponseDto } from './types.js';

type ImageApi = {
  uploadImage(image: File): Promise<UploadImageResponseDto>;
};

export { type ImageApi };
