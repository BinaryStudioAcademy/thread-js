import { ImageModel } from '../models';
import { Abstract } from './abstract.repository';

class Image extends Abstract {}

export default new Image(ImageModel);
