const { usersSeed, userImagesSeed } = require('../seed-data/users.seed');
const { postsSeed, postImagesSeed } = require('../seed-data/posts.seed');
const commentsSeed = require('../seed-data/comments.seed');
const postReactionsSeed = require('../seed-data/post-reactions.seed');

const randomIndex = length => Math.floor(Math.random() * length);

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const options = {
                type: Sequelize.QueryTypes.SELECT
            };

            // Add images.
            await queryInterface.bulkInsert('Images', userImagesSeed.concat(postImagesSeed), {});

            const userImagesQuery = `SELECT id FROM "Images" WHERE path IN (${userImagesSeed.map(x => `'${x.path}'`).join(',')});`;
            const userImages = await queryInterface.sequelize.query(userImagesQuery, options);

            const postImagesQuery = `SELECT id FROM "Images" WHERE path IN (${postImagesSeed.map(x => `'${x.path}'`).join(',')});`;
            const postImages = await queryInterface.sequelize.query(postImagesQuery, options);

            // Add users.
            const usersMappedSeed = usersSeed.map((user, i) => ({
                ...user,
                imageId: userImages[i] ? userImages[i].id : null
            }));
            await queryInterface.bulkInsert('Users', usersMappedSeed, {});
            const users = await queryInterface.sequelize.query('SELECT id FROM "Users";', options);

            // Add posts.
            const postsMappedSeed = postsSeed.map((post, i) => ({
                ...post,
                userId: users[randomIndex(users.length)].id,
                imageId: postImages[i] ? postImages[i].id : null
            }));
            await queryInterface.bulkInsert('Posts', postsMappedSeed, {});
            const posts = await queryInterface.sequelize.query('SELECT id FROM "Posts";', options);

            // Add comments.
            const commentsMappedSeed = commentsSeed.map(comment => ({
                ...comment,
                userId: users[randomIndex(users.length)].id,
                postId: posts[randomIndex(posts.length)].id
            }));
            await queryInterface.bulkInsert('Comments', commentsMappedSeed, {});

            // Add post reactions.
            const postReactionsMappedSeed = postReactionsSeed.map(reaction => ({
                ...reaction,
                userId: users[randomIndex(users.length)].id,
                postId: posts[randomIndex(posts.length)].id
            }));
            await queryInterface.bulkInsert('PostReactions', postReactionsMappedSeed, {});
        } catch (err) {
            console.log(`Seeding error: ${err}`);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.bulkDelete('PostReactions', null, {});
            await queryInterface.bulkDelete('Comments', null, {});
            await queryInterface.bulkDelete('Posts', null, {});
            await queryInterface.bulkDelete('Users', null, {});
            await queryInterface.bulkDelete('Images', null, {});
        } catch (err) {
            console.log(`Seeding error: ${err}`);
        }
    }
};
