module.exports = (orm, DataTypes) => {
    const PostReaction = orm.define('PostReaction', {
        isLike: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    PostReaction.associate = function (models) {
        // associations can be defined here
    };

    return PostReaction;
};
