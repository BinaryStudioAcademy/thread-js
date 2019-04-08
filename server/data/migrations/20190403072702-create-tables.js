export default {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
        .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
            queryInterface.createTable('Users', {
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
                isActive: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }, { transaction }),
            queryInterface.createTable('Posts', {
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
                isActive: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }, { transaction }),
            queryInterface.createTable('Comments', {
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
                isActive: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }, { transaction }),
            queryInterface.createTable('PostReactions', {
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
            queryInterface.createTable('Images', {
                id: {
                    allowNull: false,
                    autoIncrement: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                path: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                isActive: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }, { transaction })
        ]))),

    down: queryInterface => queryInterface.sequelize.transaction(transaction => Promise.all([
        queryInterface.dropTable('Users', { transaction }),
        queryInterface.dropTable('Posts', { transaction }),
        queryInterface.dropTable('Comments', { transaction }),
        queryInterface.dropTable('PostReactions', { transaction }),
        queryInterface.dropTable('Images', { transaction })
    ]))
};
