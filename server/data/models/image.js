module.exports = (orm, DataTypes) => {
    const Image = orm.define('Image', {
        path: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Image.associate = ({ User, Post }) => {
        Image.hasOne(User);
        Image.hasOne(Post);
    };

    return Image;
};
