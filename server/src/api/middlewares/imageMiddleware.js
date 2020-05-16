import multer from 'multer';
import { fileSize } from '../../config/imgurConfig';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize
  }
});

export default upload.single('image');
