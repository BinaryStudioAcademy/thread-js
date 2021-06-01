import multer from 'multer';
import { ENV } from '../../common/enums/enums';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: ENV.GYAZO.FILE_SIZE
  }
});

const image = upload.single('image');

export { image };
