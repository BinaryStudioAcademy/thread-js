import { DataTypes } from 'sequelize';

const init = orm => {
  const Comment = orm.define(
    'comment',
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

  return Comment;
};

export { init };
