import { PostModel } from '../models/index';
import BaseRepository from './base.repository';

class PostRepository extends BaseRepository {}

export default new PostRepository(PostModel);
