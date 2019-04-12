export default (orm, DataTypes) => {
    const Image = orm.define('image', {
        path: {
            allowNull: false,
            type: DataTypes.STRING
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    return Image;
};
