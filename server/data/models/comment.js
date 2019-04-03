module.exports = (orm, DataTypes) => {
    const Comment = orm.define('Comment', {
        body: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Comment.associate = function (models) {
        // associations can be defined here
    };

    return Comment;
};
