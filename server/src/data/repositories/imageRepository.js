import { ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

class ImageRepository extends BaseRepository {}

export default new ImageRepository(ImageModel);
