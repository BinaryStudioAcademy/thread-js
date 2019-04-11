import postRepository from '../../data/repositories/post.repository';

export default {
    getPosts: () => postRepository.getPosts()
};
