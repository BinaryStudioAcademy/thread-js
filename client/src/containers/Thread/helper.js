export function getFilteredPosts(args) {
    const { postsType, posts, currentUserId } = args;
    switch (postsType) {
        case 'mine':
            return posts.filter(post => post.userId === currentUserId);
        case 'all':
        default:
            return posts;
    }
}
