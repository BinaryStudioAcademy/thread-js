export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('posts', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        body: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('comments', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        body: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('postReactions', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        isLike: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('images', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        link: {
          allowNull: false,
          type: Sequelize.STRING
        },
        deleteHash: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction })
    ]))),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.dropTable('users', { transaction }),
      queryInterface.dropTable('posts', { transaction }),
      queryInterface.dropTable('comments', { transaction }),
      queryInterface.dropTable('postReactions', { transaction }),
      queryInterface.dropTable('images', { transaction })
    ]))
};
