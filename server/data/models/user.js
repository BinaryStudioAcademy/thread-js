module.exports = (orm, DataTypes) => {
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

    User.associate = function (models) {
        User.belongsTo(models.Image);
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
        User.hasMany(models.PostReaction);
    };

    return User;
};
