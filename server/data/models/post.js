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

    Post.associate = ({ Image, User, PostReaction, Comment }) => {
        Post.belongsTo(Image);
        Post.belongsTo(User);
        Post.hasMany(PostReaction);
        Post.hasMany(Comment);
    };

    return Post;
};
