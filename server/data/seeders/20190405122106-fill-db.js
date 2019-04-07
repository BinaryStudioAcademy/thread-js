imagesSeed = require('../seed-data/images.seed');
usersSeed = require('../seed-data/users.seed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      try {
        await queryInterface.bulkInsert('Images', imagesSeed, {});
        const images = await queryInterface.sequelize.query('SELECT id FROM "Images";', { type: queryInterface.sequelize.QueryTypes.SELECT });

        usersSeed = usersSeed.map((user, i) => ({ ...user, imageId: images[i].id }));
        const a = await queryInterface.bulkInsert('Users', usersSeed, {});
        const users = await queryInterface.sequelize.query('SELECT id FROM "Users";', { type: queryInterface.sequelize.QueryTypes.SELECT });

        console.log(a);
      } catch (err) {
        console.log(err);
      }
  },

  down: async (queryInterface, Sequelize) => {
      try {
          await queryInterface.bulkDelete('Users', null, {});
          await queryInterface.bulkDelete('Images', null, {});
      } catch (err) {
          console.log(err);
      }
  }
};
