import postRepository from '../../data/repositories/post.repository';
import postReactionRepository from '../../data/repositories/post-reaction.repository';

export default {
    getPosts: () => postRepository.getPosts(),
    getPostById: id => postRepository.getPostById(id),
    create: (userId, { imageId, post }) => postRepository.create({
        ...post,
        imageId,
        userId
    }),
    setReaction: async (userId, { postId, isLike = true }) => {
        const reaction = await postReactionRepository.getPostReaction(userId, postId);

        if (reaction) {
            await postReactionRepository.deleteById(reaction.id);
        } else {
            await postReactionRepository.create({ userId, postId, isLike });
        }
    }
};
