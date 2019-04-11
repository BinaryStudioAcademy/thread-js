import sequelize from '../db/connection';
import { PostModel } from '../models/index';
import BaseRepository from './base.repository';
import getPostsQuery from '../queries/post.query';

class PostRepository extends BaseRepository {
    getPosts() {
        return sequelize.query(getPostsQuery, { type: sequelize.QueryTypes.SELECT });
    }
}

export default new PostRepository(PostModel);
