module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => Promise.all([
            queryInterface.createTable('Users', {
                id: {
                    allowNull: false,
                    autoIncrement: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4
                },
                email: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                username: {
                    allowNull: false,
                    type: Sequelize.STRING
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
                    defaultValue: Sequelize.UUIDV4
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
                    defaultValue: Sequelize.UUIDV4
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
                    defaultValue: Sequelize.UUIDV4
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
                    defaultValue: Sequelize.UUIDV4
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
        ]));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => Promise.all([
            queryInterface.dropTable('Users', { transaction }),
            queryInterface.dropTable('Posts', { transaction }),
            queryInterface.dropTable('Comments', { transaction }),
            queryInterface.dropTable('PostReactions', { transaction }),
            queryInterface.dropTable('Images', { transaction })
        ]));
    }
};
