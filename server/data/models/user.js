export default (orm, DataTypes) => {
    const User = orm.define('User', {
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    User.associate = ({ Image, Post, Comment, PostReaction }) => {
        User.belongsTo(Image);
        User.hasMany(Post);
        User.hasMany(Comment);
        User.hasMany(PostReaction);
    };

    return User;
};
