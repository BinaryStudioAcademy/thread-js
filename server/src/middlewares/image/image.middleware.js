import multer from 'fastify-multer';
import { ENV } from '../../common/enums/enums.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: ENV.GYAZO.FILE_SIZE
  }
});

export { upload };
