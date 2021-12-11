import { DataTypes } from 'sequelize';

const init = orm => {
  const Post = orm.define(
    'post',
    {
      body: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Post;
};

export { init };
