import postRepository from '../../data/repositories/post.repository';
import postReactionRepository from '../../data/repositories/post-reaction.repository';

export default {
    getPosts: (from, count) => postRepository.getPosts(from, count),
    getPostById: id => postRepository.getPostById(id),
    create: (userId, post) => postRepository.create({
        ...post,
        userId
    }),
    setReaction: async (userId, { postId, isLike = true }) => {
        const reaction = await postReactionRepository.getPostReaction(userId, postId);

        if (reaction) {
            const result = reaction.isLike === isLike
                ? await postReactionRepository.deleteById(reaction.id)
                : await postReactionRepository.updateById(reaction.id, { isLike });

            return Number.isInteger(result) ? null : result;
        }

        return postReactionRepository.create({ userId, postId, isLike });
    }
};
