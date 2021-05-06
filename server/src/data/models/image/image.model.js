import { DataTypes } from 'sequelize';

const init = orm => {
  const Image = orm.define(
    'image',
    {
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
    },
    {}
  );

  return Image;
};

export { init };
