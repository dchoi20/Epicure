module.exports = function(sequelize, DataTypes) {
  const Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  Restaurant.associate = function(models) {
    Restaurant.belongsTo(models.User);
  };
  return Restaurant;
};
