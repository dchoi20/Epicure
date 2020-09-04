module.exports = function(sequelize, DataTypes) {
  const Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 240],
      },
    },
  });

  Restaurant.associate = function(models) {
    Restaurant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Restaurant;
};
