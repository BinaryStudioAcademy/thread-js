import postRepository from '../../data/repositories/post.repository';

export default {
    getAll: () => postRepository.getAll()
};
