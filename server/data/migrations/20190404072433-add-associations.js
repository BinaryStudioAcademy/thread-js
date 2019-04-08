export default {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(transaction => Promise.all([
        queryInterface.addColumn('Users', 'imageId', {
            type: Sequelize.UUID,
            references: {
                model: 'Images',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('Posts', 'imageId', {
            type: Sequelize.UUID,
            references: {
                model: 'Images',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('Posts', 'userId', {
            type: Sequelize.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('PostReactions', 'userId', {
            type: Sequelize.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('PostReactions', 'postId', {
            type: Sequelize.UUID,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('Comments', 'userId', {
            type: Sequelize.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction }),
        queryInterface.addColumn('Comments', 'postId', {
            type: Sequelize.UUID,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }, { transaction })
    ])),

    down: queryInterface => queryInterface.sequelize.transaction(transaction => Promise.all([
        queryInterface.removeColumn('Users', 'imageId', { transaction }),
        queryInterface.removeColumn('Posts', 'imageId', { transaction }),
        queryInterface.removeColumn('Posts', 'userId', { transaction }),
        queryInterface.removeColumn('PostReactions', 'userId', { transaction }),
        queryInterface.removeColumn('PostReactions', 'postId', { transaction }),
        queryInterface.removeColumn('Comments', 'userId', { transaction }),
        queryInterface.removeColumn('Comments', 'postId', { transaction })
    ]))
};
