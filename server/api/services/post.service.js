import postRepository from '../../data/repositories/post.repository';

export default {
    getPosts: () => postRepository.getPosts(),
    getPostById: id => postRepository.getPostById(id),
    create: (userId, { imageId, post }) => postRepository.create({
        ...post,
        imageId,
        userId
    })
};
