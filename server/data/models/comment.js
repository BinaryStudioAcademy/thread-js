export default (orm, DataTypes) => {
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

    Comment.associate = ({ User, Post }) => {
        Comment.belongsTo(User);
        Comment.belongsTo(Post);
    };

    return Comment;
};
