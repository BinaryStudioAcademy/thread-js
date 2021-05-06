import multer from 'multer';
import { ENV } from '../../common/enums/enums';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: ENV.IMGUR.FILE_SIZE
  }
});

export default upload.single('image');
