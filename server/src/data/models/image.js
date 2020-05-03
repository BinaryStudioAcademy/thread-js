export default (orm, DataTypes) => {
  const Image = orm.define('image', {
    link: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deleteHash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Image;
};
