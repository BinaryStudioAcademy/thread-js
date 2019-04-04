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

    Image.associate = function (models) {
        Image.hasOne(models.User);
        Image.hasOne(models.Post);
    };

    return Image;
};
