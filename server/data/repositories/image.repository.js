import { ImageModel } from '../models/index';
import BaseRepository from './base.repository';

class ImageRepository extends BaseRepository {}

export default new ImageRepository(ImageModel);
