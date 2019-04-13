import postRepository from '../../data/repositories/post.repository';

export default {
    getPosts: () => postRepository.getPosts(),
    getPostById: id => postRepository.getPostById(id),
    create: (userId, post) => postRepository.create({
        ...post,
        userId
    })
};
