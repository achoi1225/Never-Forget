"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      as: "task",
      foreignKey: "createdBy",
    });

    User.hasMany(models.List, { foreignKey: "userId" });
  };
  return User;
};
