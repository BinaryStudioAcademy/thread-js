import { DataTypes } from 'sequelize';

const init = orm => {
  const PostReaction = orm.define(
    'postReaction',
    {
      isLike: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return PostReaction;
};

export { init };
