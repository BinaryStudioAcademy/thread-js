module.exports = (orm, DataTypes) => {
    const Post = orm.define('Post', {
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

    Post.associate = function (models) {
        // associations can be defined here
    };

    return Post;
};
