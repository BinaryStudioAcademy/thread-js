export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.addColumn('users', 'imageId', {
        type: Sequelize.UUID,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('posts', 'imageId', {
        type: Sequelize.UUID,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('posts', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('postReactions', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('postReactions', 'postId', {
        type: Sequelize.UUID,
        references: {
          model: 'posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('comments', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('comments', 'postId', {
        type: Sequelize.UUID,
        references: {
          model: 'posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, { transaction })
    ])),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.removeColumn('users', 'imageId', { transaction }),
      queryInterface.removeColumn('posts', 'imageId', { transaction }),
      queryInterface.removeColumn('posts', 'userId', { transaction }),
      queryInterface.removeColumn('postReactions', 'userId', { transaction }),
      queryInterface.removeColumn('postReactions', 'postId', { transaction }),
      queryInterface.removeColumn('comments', 'userId', { transaction }),
      queryInterface.removeColumn('comments', 'postId', { transaction })
    ]))
};
