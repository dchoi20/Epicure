module.exports = function(sequelize, DataTypes) {
  const Submission = sequelize.define("Submission", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 240],
      },
    },
  });

  Submission.associate = function(models) {
    Submission.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Submission;
};
